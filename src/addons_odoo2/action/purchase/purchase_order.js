export default {
  act_res_partner_2_purchase_order: {
    _odoo_model: 'ir.actions.act_window',
    name: 'RFQs and Purchases',
    res_model: 'purchase.order',
    context: {
      todo_ctx: "{'search_default_partner_id': active_id, 'default_partner_id': active_id}"
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  purchase_order_calendar: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    type: 'otherview',
    arch: {}
  },

  purchase_order_pivot: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    type: 'otherview',
    arch: {}
  },

  purchase_order_graph: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    type: 'otherview',
    arch: {}
  },

  purchase_order_form: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    type: 'form',
    arch: {
      sheet: {
        _header: {
          _button_action_rfq_send: {
            _attr: {
              name: 'action_rfq_send',
              string: 'Send by Email',
              context: {
                send_rfq: true
              },
              class: 'oe_highlight',
              type: 'object'
            }
          },
          _button_print_quotation: {
            _attr: {
              name: 'print_quotation',
              string: 'Print RFQ',
              groups: 'base.group_user',
              class: 'oe_highlight',
              type: 'object'
            }
          },
          _button_button_confirm: {
            _attr: {
              name: 'button_confirm',
              string: 'Confirm Order',
              context: {
                validate_analytic: true
              },
              class: 'oe_highlight',
              type: 'object'
            }
          },
          _button_button_approve: {
            _attr: {
              name: 'button_approve',
              string: 'Approve Order',
              groups: 'purchase.group_purchase_manager',
              class: 'oe_highlight',
              type: 'object'
            }
          },
          _button_action_create_invoice: {
            _attr: {
              name: 'action_create_invoice',
              string: 'Create Bill',
              invisible: ['|', ['state', 'not in', ('purchase', 'done')], ['invoice_status', 'in', ('no', 'invoiced')]],
              context: {
                create_bill: true
              },
              class: 'oe_highlight',
              type: 'object'
            }
          },
          _button_action_rfq_send_341: {
            _attr: {
              name: 'action_rfq_send',
              string: 'Re-Send by Email',
              context: {
                send_rfq: true
              },
              type: 'object'
            }
          },
          _button_print_quotation_155: {
            _attr: {
              name: 'print_quotation',
              string: 'Print RFQ',
              groups: 'base.group_user',
              type: 'object'
            }
          },
          _button_button_confirm_924: {
            _attr: {
              name: 'button_confirm',
              string: 'Confirm Order',
              context: {
                validate_analytic: true
              },
              type: 'object'
            }
          },
          _button_action_rfq_send_756: {
            _attr: {
              name: 'action_rfq_send',
              string: 'Send PO by Email',
              context: {
                send_rfq: false
              },
              type: 'object'
            }
          },
          _button_confirm_reminder_mail: {
            _attr: {
              name: 'confirm_reminder_mail',
              string: 'Confirm Receipt Date',
              groups: 'base.group_no_one',
              invisible: ['|', '|', ['state', 'not in', ('purchase', 'done')], ['mail_reminder_confirmed', '=', true], ['date_planned', '=', false]],
              type: 'object'
            }
          },
          _button_action_create_invoice_806: {
            _attr: {
              name: 'action_create_invoice',
              string: 'Create Bill',
              invisible: ['|', '|', ['state', 'not in', ('purchase', 'done')], ['invoice_status', 'not in', ('no', 'invoiced')], ['order_line', '=', []]],
              context: {
                create_bill: true
              },
              type: 'object'
            }
          },
          _button_button_draft: {
            _attr: {
              name: 'button_draft',
              string: 'Set to Draft',
              type: 'object'
            }
          },
          _button_button_cancel: {
            _attr: {
              name: 'button_cancel',
              string: 'Cancel',
              type: 'object'
            }
          },
          _button_button_done: {
            _attr: {
              name: 'button_done',
              string: 'Lock',
              type: 'object'
            }
          },
          _button_button_unlock: {
            _attr: {
              name: 'button_unlock',
              string: 'Unlock',
              groups: 'purchase.group_purchase_manager',
              type: 'object'
            }
          },
          state: {
            widget: 'statusbar'
          }
        },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_action_view_invoice: {
            _attr: {
              name: 'action_view_invoice',
              invisible: ['|', ['invoice_count', '=', 0], ['state', 'in', ('draft', 'sent', 'to approve')]],
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-pencil-square-o'
            },
            invoice_count: {
              string: 'Vendor Bills',
              widget: 'statinfo'
            },
            invoice_ids: {
              invisible: '1'
            }
          }
        },
        _div_title: {
          _attr: {
            class: 'oe_title'
          },
          _span: {
            _attr: {
              invisible: [['state', 'not in', ('draft', 'sent')]],
              class: 'o_form_label',
              text: 'Request for Quotation'
            }
          },
          _span_866: {
            _attr: {
              invisible: [['state', 'in', ('draft', 'sent')]],
              class: 'o_form_label',
              text: 'Purchase Order'
            }
          },
          _h1: {
            _attr: {
              class: 'd-flex'
            },
            priority: {
              widget: 'priority',
              class: 'me-3'
            },
            name: {}
          }
        },
        _group: {
          _group: {
            partner_id: {
              widget: 'res_partner_many2one',
              context: {
                res_partner_search_mode: 'supplier',
                show_vat: true
              },
              placeholder: 'Name, TIN, Email, or Reference'
            },
            partner_ref: {},
            currency_id: {
              groups: 'base.group_multi_currency',
              force_save: '1'
            },
            id: {
              invisible: '1'
            },
            company_id: {
              invisible: '1'
            },
            _field_currency_id_314: {
              currency_id: {
                groups: '!base.group_multi_currency',
                invisible: '1'
              }
            }
          },
          _group_719: {
            date_order: {
              invisible: [['state', 'in', ('purchase', 'done')]]
            },
            _label_date_approve: {
              for: 'date_approve',
              invisible: [['state', 'not in', ('purchase', 'done')]]
            },
            _div_date_approve: {
              _attr: {
                name: 'date_approve',
                invisible: [['state', 'not in', ('purchase', 'done')]],
                class: 'o_row'
              },
              date_approve: {},
              mail_reception_confirmed: {
                invisible: '1'
              },
              _span: {
                _attr: {
                  invisible: [['mail_reception_confirmed', '=', false]],
                  class: 'text-muted',
                  text: '(confirmed by vendor)'
                }
              }
            },
            _label_date_planned: {
              for: 'date_planned'
            },
            _div_date_planned_div: {
              _attr: {
                name: 'date_planned_div',
                class: 'o_row'
              },
              date_planned: {
                readonly: [['state', 'not in', ('draft', 'sent', 'to approve', 'purchase')]]
              },
              mail_reminder_confirmed: {
                invisible: '1'
              },
              _span: {
                _attr: {
                  invisible: [['mail_reminder_confirmed', '=', false]],
                  class: 'text-muted',
                  text: '(confirmed by vendor)'
                }
              }
            },
            _label_receipt_reminder_email: {
              for: 'receipt_reminder_email',
              groups: 'purchase.group_send_reminder',
              class: 'd-none'
            },
            _div_reminder: {
              _attr: {
                name: 'reminder',
                groups: 'purchase.group_send_reminder',
                class: 'o_row',
                title: 'Automatically send a confirmation email to the vendor X days before the expected receipt date, asking him to confirm the exact date.'
              },
              receipt_reminder_email: {},
              _span: 'Ask confirmation',
              _div: {
                _attr: {
                  invisible: [['receipt_reminder_email', '=', false]],
                  class: 'o_row oe_inline'
                },
                reminder_date_before_receipt: {},
                _widget_toaster_button: {
                  _attr: {
                    name: 'toaster_button',
                    invisible: [['id', '=', false]],
                    title: 'Preview the reminder email by sending it to yourself.'
                  }
                }
              }
            }
          }
        },
        _notebook: {
          _page_products: {
            _attr: {
              name: 'products',
              string: 'Products'
            },
            tax_country_id: {
              invisible: '1'
            },
            order_line: {
              widget: 'section_and_note_one2many',
              readonly: [['state', 'in', ('done', 'cancel')]],
              context: {
                default_state: 'draft'
              },
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: {
                        string: 'Purchase Order Lines'
                      },
                      _control: {
                        _create_add_product_control: {
                          _attr: {
                            name: 'add_product_control',
                            string: 'Add a product'
                          }
                        },
                        _create_add_section_control: {
                          _attr: {
                            name: 'add_section_control',
                            string: 'Add a section',
                            context: {
                              default_display_type: 'line_section'
                            }
                          }
                        },
                        _create_add_note_control: {
                          _attr: {
                            name: 'add_note_control',
                            string: 'Add a note',
                            context: {
                              default_display_type: 'line_note'
                            }
                          }
                        }
                      },
                      display_type: {
                        invisible: '1'
                      },
                      currency_id: {
                        invisible: '1'
                      },
                      state: {
                        invisible: '1'
                      },
                      product_type: {
                        invisible: '1'
                      },
                      product_uom: {
                        groups: '!uom.group_uom',
                        invisible: '1'
                      },
                      product_uom_category_id: {
                        invisible: '1'
                      },
                      invoice_lines: {
                        invisible: '1'
                      },
                      sequence: {
                        widget: 'handle'
                      },
                      product_id: {
                        domain: {
                          todo_ctx: "[('purchase_ok', '=', True), '|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]"
                        },
                        readonly: [['state', 'in', ('purchase', 'to approve', 'done', 'cancel')]],
                        required: [['display_type', '=', false]],
                        context: {
                          todo_ctx: "{'partner_id':parent.partner_id, 'quantity':product_qty,'uom':product_uom, 'company_id': parent.company_id}"
                        },
                        force_save: '1'
                      },
                      name: {
                        widget: 'section_and_note_text'
                      },
                      date_planned: {
                        required: [['display_type', '=', false]],
                        force_save: '1'
                      },
                      analytic_distribution: {
                        widget: 'analytic_distribution',
                        groups: 'analytic.group_analytic_accounting',
                        product_field: 'product_id',
                        business_domain: 'purchase_order'
                      },
                      product_qty: {},
                      qty_received_manual: {
                        invisible: '1'
                      },
                      qty_received_method: {
                        invisible: '1'
                      },
                      qty_received: {
                        string: 'Received',
                        column_invisible: [['parent.state', 'not in', ('purchase', 'done')]],
                        readonly: [['qty_received_method', '!=', 'manual']]
                      },
                      qty_invoiced: {
                        string: 'Billed',
                        column_invisible: [['parent.state', 'not in', ('purchase', 'done')]]
                      },
                      _field_product_uom_383: {
                        product_uom: {
                          string: 'UoM',
                          groups: 'uom.group_uom',
                          readonly: [['state', 'in', ('purchase', 'done', 'cancel')]],
                          required: [['display_type', '=', false]],
                          force_save: '1'
                        }
                      },
                      product_packaging_qty: {
                        groups: 'product.group_stock_packaging',
                        invisible: ['|', ['product_id', '=', false], ['product_packaging_id', '=', false]]
                      },
                      product_packaging_id: {
                        groups: 'product.group_stock_packaging',
                        invisible: [['product_id', '=', false]],
                        context: {
                          todo_ctx: "{'default_product_id': product_id, 'tree_view_ref':'product.product_packaging_tree_view', 'form_view_ref':'product.product_packaging_form_view'}"
                        }
                      },
                      price_unit: {
                        readonly: [['qty_invoiced', '!=', 0]]
                      },
                      _button_action_purchase_history: {
                        _attr: {
                          name: 'action_purchase_history',
                          invisible: [['id', '=', false]],
                          title: 'Purchase History',
                          type: 'object',
                          icon: 'fa-history'
                        }
                      },
                      taxes_id: {
                        widget: 'many2many_tags',
                        domain: {
                          todo_ctx: "[('type_tax_use','=','purchase'), ('company_id', '=', parent.company_id), ('country_id', '=', parent.tax_country_id)]"
                        },
                        context: {
                          default_type_tax_use: 'purchase',
                          search_view_ref: 'account.account_tax_view_search'
                        },
                        no_create: true
                      },
                      price_subtotal: {
                        widget: 'monetary'
                      },
                      price_total: {
                        invisible: '1'
                      },
                      price_tax: {
                        invisible: '1'
                      }
                    }
                  }
                },
                form: {
                  arch: {
                    sheet: {
                      _attr: {
                        string: 'Purchase Order Line'
                      },
                      state: {
                        invisible: '1'
                      },
                      display_type: {
                        invisible: '1'
                      },
                      _group: {
                        _attr: {
                          invisible: [['display_type', '!=', false]]
                        },
                        _group: {
                          product_uom_category_id: {
                            invisible: '1'
                          },
                          product_id: {
                            widget: 'many2one_barcode',
                            domain: {
                              todo_ctx: "[('purchase_ok', '=', True), '|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]"
                            },
                            context: {
                              todo_ctx: "{'partner_id': parent.partner_id}"
                            }
                          },
                          _label_product_qty: {
                            for: 'product_qty'
                          },
                          _div: {
                            _attr: {
                              class: 'o_row'
                            },
                            product_qty: {},
                            product_uom: {
                              groups: 'uom.group_uom',
                              required: [['display_type', '=', false]]
                            }
                          },
                          qty_received_method: {
                            invisible: '1'
                          },
                          qty_received: {
                            string: 'Received Quantity',
                            invisible: [['parent.state', 'not in', ('purchase', 'done')]],
                            readonly: [['qty_received_method', '!=', 'manual']]
                          },
                          qty_invoiced: {
                            string: 'Billed Quantity',
                            invisible: [['parent.state', 'not in', ('purchase', 'done')]]
                          },
                          product_packaging_id: {
                            groups: 'product.group_stock_packaging',
                            invisible: [['product_id', '=', false]],
                            context: {
                              todo_ctx: "{'default_product_id': product_id, 'tree_view_ref':'product.product_packaging_tree_view', 'form_view_ref':'product.product_packaging_form_view'}"
                            }
                          },
                          price_unit: {},
                          taxes_id: {
                            widget: 'many2many_tags',
                            domain: {
                              todo_ctx: "[('type_tax_use', '=', 'purchase'), ('company_id', '=', parent.company_id), ('country_id', '=', parent.tax_country_id)]"
                            },
                            no_create: true
                          }
                        },
                        _group_600: {
                          date_planned: {
                            widget: 'date',
                            required: [['display_type', '=', false]]
                          },
                          analytic_distribution: {
                            widget: 'analytic_distribution',
                            groups: 'analytic.group_analytic_accounting',
                            product_field: 'product_id',
                            business_domain: 'purchase_order'
                          }
                        },
                        _group_919: {
                          _notebook: {
                            _page_notes: {
                              _attr: {
                                name: 'notes',
                                string: 'Notes'
                              },
                              name: {}
                            },
                            _page_invoices_incoming_shiptments: {
                              _attr: {
                                name: 'invoices_incoming_shiptments',
                                string: 'Invoices and Incoming Shipments'
                              },
                              invoice_lines: {}
                            }
                          }
                        }
                      },
                      _label_name: {
                        for: 'name',
                        string: 'Section Name (eg. Products, Services)',
                        invisible: [['display_type', '!=', 'line_section']]
                      },
                      _label_name_597: {
                        for: 'name',
                        string: 'Note',
                        invisible: [['display_type', '!=', 'line_note']]
                      },
                      name: {
                        invisible: [['display_type', '=', false]]
                      }
                    }
                  }
                },
                kanban: {
                  arch: {
                    sheet: {
                      _attr: {
                        class: 'o_kanban_mobile'
                      },
                      name: {},
                      product_id: {},
                      product_qty: {},
                      product_uom: {
                        groups: 'uom.group_uom'
                      },
                      price_subtotal: {},
                      price_tax: {
                        invisible: '1'
                      },
                      price_total: {
                        invisible: '1'
                      },
                      price_unit: {},
                      display_type: {},
                      taxes_id: {
                        invisible: '1'
                      },
                      _templates: {
                        _t: {
                          _div: {
                            _t: {
                              _div: {
                                _attr: {
                                  class: 'row'
                                },
                                _div: {
                                  _attr: {
                                    class: 'col-8'
                                  },
                                  _strong: {
                                    _span: {}
                                  }
                                },
                                _div_321: {
                                  _attr: {
                                    class: 'col-4'
                                  },
                                  _strong: {
                                    _span: {
                                      _attr: {
                                        class: 'float-end text-end'
                                      }
                                    }
                                  }
                                }
                              },
                              _div_888: {
                                _attr: {
                                  class: 'row'
                                },
                                _div: {
                                  _attr: {
                                    class: 'col-12 text-muted'
                                  },
                                  _span: {
                                    _attr: {
                                      text: 'Quantity:'
                                    },
                                    _t: {},
                                    _t_777: {
                                      _attr: {
                                        groups: 'uom.group_uom'
                                      }
                                    }
                                  }
                                }
                              },
                              _div_752: {
                                _attr: {
                                  class: 'row'
                                },
                                _div: {
                                  _attr: {
                                    class: 'col-12 text-muted'
                                  },
                                  _span: {
                                    _attr: {
                                      text: 'Unit Price:'
                                    },
                                    _t: {}
                                  }
                                }
                              }
                            },
                            _div: {
                              _attr: {
                                class: 'row'
                              },
                              _div: {
                                _attr: {
                                  class: 'col-12'
                                },
                                _span: {}
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            _group: {
              _group: {
                notes: {
                  placeholder: 'Define your terms and conditions ...'
                }
              },
              _group_509: {
                _attr: {
                  class: 'oe_subtotal_footer oe_right'
                },
                tax_totals: {
                  widget: 'account-tax-totals-field'
                }
              }
            },
            _div: {
              _attr: {
                class: 'clearfix'
              }
            }
          },
          _page_purchase_delivery_invoice: {
            _attr: {
              name: 'purchase_delivery_invoice',
              string: 'Other Information'
            },
            _group: {
              _group_other_info: {
                _attr: {
                  name: 'other_info'
                },
                user_id: {
                  widget: 'many2one_avatar_user',
                  domain: [['share', '=', false]]
                },
                company_id: {
                  groups: 'base.group_multi_company',
                  no_create: true
                },
                origin: {}
              },
              _group_invoice_info: {
                _attr: {
                  name: 'invoice_info'
                },
                invoice_status: {
                  invisible: [['state', 'in', ('draft', 'sent', 'to approve', 'cancel')]]
                },
                payment_term_id: {
                  readonly: ['|', ['invoice_status', '=', 'invoiced'], ['state', '=', 'done']],
                  no_create: true
                },
                fiscal_position_id: {
                  readonly: ['|', ['invoice_status', '=', 'invoiced'], ['state', '=', 'done']],
                  no_create: true
                }
              }
            }
          }
        }
      }
    }
  },

  view_purchase_order_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    type: 'search',
    arch: {
      name: {
        string: 'Order'
      },
      partner_id: {},
      user_id: {},
      product_id: {},
      origin: {},
      _filter_my_purchases: {
        _attr: {
          name: 'my_purchases',
          string: 'My Purchases',
          domain: {
            todo_ctx: "[('user_id', '=', uid)]"
          }
        }
      },
      _filter_starred: {
        _attr: {
          name: 'starred',
          string: 'Starred',
          domain: [['priority', '=', '1']]
        }
      },
      _separator: {},
      _filter_draft: {
        _attr: {
          name: 'draft',
          string: 'RFQs',
          domain: [['state', 'in', ('draft', 'sent', 'to approve')]]
        }
      },
      _separator_286: {},
      _filter_approved: {
        _attr: {
          name: 'approved',
          string: 'Purchase Orders',
          domain: [['state', 'in', ('purchase', 'done')]]
        }
      },
      _filter_to_approve: {
        _attr: {
          name: 'to_approve',
          string: 'To Approve',
          domain: [['state', '=', 'to approve']]
        }
      },
      _separator_744: {},
      _filter_order_date: {
        _attr: {
          name: 'order_date',
          string: 'Order Date'
        }
      },
      _filter_draft_rfqs: {
        _attr: {
          name: 'draft_rfqs',
          string: 'Draft RFQs',
          domain: [['state', '=', 'draft']]
        }
      },
      _filter_waiting_rfqs: {
        _attr: {
          name: 'waiting_rfqs',
          string: 'Waiting RFQs',
          domain: {
            todo_ctx: "[('state', '=', 'sent'), ('date_order', '>=', datetime.datetime.now())]"
          }
        }
      },
      _filter_late_rfqs: {
        _attr: {
          name: 'late_rfqs',
          string: 'Late RFQs',
          domain: {
            todo_ctx: "[('state', 'in', ['draft', 'sent', 'to approve']),('date_order', '<', datetime.datetime.now())]"
          }
        }
      },
      _separator_568: {},
      _filter_activities_overdue: {
        _attr: {
          name: 'activities_overdue',
          string: 'Late Activities',
          invisible: '1',
          domain: {
            todo_ctx: "[('my_activity_date_deadline', '<', context_today().strftime('%Y-%m-%d'))]"
          }
        }
      },
      _filter_activities_today: {
        _attr: {
          name: 'activities_today',
          string: 'Today Activities',
          invisible: '1',
          domain: {
            todo_ctx: "[('my_activity_date_deadline', '=', context_today().strftime('%Y-%m-%d'))]"
          }
        }
      },
      _filter_activities_upcoming_all: {
        _attr: {
          name: 'activities_upcoming_all',
          string: 'Future Activities',
          invisible: '1',
          domain: {
            todo_ctx: "[('my_activity_date_deadline', '>', context_today().strftime('%Y-%m-%d'))]"
          }
        }
      },
      _separator_354: {},
      _filter_activities_exception: {
        _attr: {
          name: 'activities_exception',
          string: 'Warnings',
          domain: [['activity_exception_decoration', '!=', false]]
        }
      },
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_vendor: {
          _attr: {
            name: 'vendor',
            string: 'Vendor',
            domain: [],
            context: {
              group_by: 'partner_id'
            }
          }
        },
        _filter_representative: {
          _attr: {
            name: 'representative',
            string: 'Purchase Representative',
            domain: [],
            context: {
              group_by: 'user_id'
            }
          }
        },
        _filter_order_date: {
          _attr: {
            name: 'order_date',
            string: 'Order Date',
            domain: [],
            context: {
              group_by: 'date_order'
            }
          }
        }
      }
    }
  },

  purchase_order_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    type: 'search',
    arch: {
      name: {
        string: 'Order'
      },
      partner_id: {},
      user_id: {},
      product_id: {},
      _filter_my_Orders: {
        _attr: {
          name: 'my_Orders',
          string: 'My Orders',
          domain: {
            todo_ctx: "[('user_id', '=', uid)]"
          }
        }
      },
      _filter_starred: {
        _attr: {
          name: 'starred',
          string: 'Starred',
          domain: [['priority', '=', '1']]
        }
      },
      _separator: {},
      _filter_unconfirmed: {
        _attr: {
          name: 'unconfirmed',
          string: 'Not Acknowledged',
          domain: [['mail_reception_confirmed', '=', false], ['state', '=', 'purchase']]
        }
      },
      _filter_not_invoiced: {
        _attr: {
          name: 'not_invoiced',
          string: 'Waiting Bills',
          domain: [['invoice_status', '=', 'to invoice']]
        }
      },
      _filter_invoiced: {
        _attr: {
          name: 'invoiced',
          string: 'Bills Received',
          domain: [['invoice_status', '=', 'invoiced']]
        }
      },
      _separator_730: {},
      _filter_order_date: {
        _attr: {
          name: 'order_date',
          string: 'Order Date'
        }
      },
      _separator_465: {},
      _filter_activities_overdue: {
        _attr: {
          name: 'activities_overdue',
          string: 'Late Activities',
          invisible: '1',
          domain: {
            todo_ctx: "[('my_activity_date_deadline', '<', context_today().strftime('%Y-%m-%d'))]"
          }
        }
      },
      _filter_activities_today: {
        _attr: {
          name: 'activities_today',
          string: 'Today Activities',
          invisible: '1',
          domain: {
            todo_ctx: "[('my_activity_date_deadline', '=', context_today().strftime('%Y-%m-%d'))]"
          }
        }
      },
      _filter_activities_upcoming_all: {
        _attr: {
          name: 'activities_upcoming_all',
          string: 'Future Activities',
          invisible: '1',
          domain: {
            todo_ctx: "[('my_activity_date_deadline', '>', context_today().strftime('%Y-%m-%d'))]"
          }
        }
      },
      _separator_906: {},
      _filter_activities_exception: {
        _attr: {
          name: 'activities_exception',
          string: 'Warnings',
          domain: [['activity_exception_decoration', '!=', false]]
        }
      },
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_vendor: {
          _attr: {
            name: 'vendor',
            string: 'Vendor',
            domain: [],
            context: {
              group_by: 'partner_id'
            }
          }
        },
        _filter_representative: {
          _attr: {
            name: 'representative',
            string: 'Purchase Representative',
            domain: [],
            context: {
              group_by: 'user_id'
            }
          }
        },
        _filter_order_date: {
          _attr: {
            name: 'order_date',
            string: 'Order Date',
            domain: [],
            context: {
              group_by: 'date_order'
            }
          }
        }
      }
    }
  },

  view_purchase_order_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    type: 'otherview',
    arch: {}
  },

  purchase_order_view_kanban_without_dashboard: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    inherit_id: 'purchase.view_purchase_order_kanban',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//kanban',
            position: 'attributes'
          },
          _attribute_js_class: {
            _attr: {
              name: 'js_class'
            }
          }
        }
      }
    }
  },

  purchase_order_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    type: 'tree',
    arch: {
      sheet: {
        priority: {
          widget: 'priority'
        },
        partner_ref: {},
        name: {
          string: 'Reference'
        },
        date_order: {
          invisible: "not context.get['quotation_only', False]"
        },
        date_approve: {
          invisible: "context.get['quotation_only', False]"
        },
        partner_id: {},
        company_id: {
          groups: 'base.group_multi_company',
          no_create: true
        },
        user_id: {},
        origin: {},
        amount_untaxed: {
          string: 'Untaxed',
          widget: 'monetary'
        },
        amount_total: {
          widget: 'monetary'
        },
        currency_id: {
          invisible: '1'
        },
        state: {},
        date_planned: {
          invisible: "context.get['quotation_only', False]"
        },
        invoice_status: {
          invisible: "context.get['quotation_only', False]"
        },
        activity_exception_decoration: {
          widget: 'activity_exception'
        }
      }
    }
  },

  purchase_order_kpis_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    type: 'tree',
    arch: {
      sheet: {
        _header: {
          _button_action_create_invoice: {
            _attr: {
              name: 'action_create_invoice',
              string: 'Create Bills',
              type: 'object'
            }
          }
        },
        priority: {
          widget: 'priority'
        },
        partner_ref: {},
        name: {
          string: 'Reference'
        },
        date_approve: {
          invisible: "context.get['quotation_only', False]"
        },
        partner_id: {},
        company_id: {
          groups: 'base.group_multi_company',
          no_create: true
        },
        date_planned: {
          invisible: "context.get['quotation_only', False]"
        },
        user_id: {
          widget: 'many2one_avatar_user'
        },
        date_order: {
          widget: 'remaining_days',
          invisible: ['|', '|', ['state', '=', 'purchase'], ['state', '=', 'done'], ['state', '=', 'cancel']]
        },
        activity_ids: {
          widget: 'list_activity'
        },
        origin: {},
        amount_untaxed: {
          string: 'Untaxed',
          widget: 'monetary'
        },
        amount_total: {
          widget: 'monetary'
        },
        currency_id: {
          invisible: '1'
        },
        state: {
          widget: 'badge'
        },
        invoice_status: {}
      }
    }
  },

  purchase_order_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    type: 'tree',
    arch: {
      sheet: {
        _header: {
          _button_action_create_invoice: {
            _attr: {
              name: 'action_create_invoice',
              string: 'Create Bills',
              type: 'object'
            }
          }
        },
        priority: {
          widget: 'priority'
        },
        partner_ref: {},
        name: {
          string: 'Reference'
        },
        date_approve: {
          widget: 'date',
          invisible: "context.get['quotation_only', False]"
        },
        partner_id: {},
        company_id: {
          groups: 'base.group_multi_company',
          no_create: true
        },
        user_id: {
          widget: 'many2one_avatar_user'
        },
        date_order: {
          invisible: "not context.get['quotation_only', False]"
        },
        activity_ids: {
          widget: 'list_activity'
        },
        origin: {},
        amount_untaxed: {
          string: 'Untaxed',
          widget: 'monetary'
        },
        amount_total: {
          widget: 'monetary'
        },
        currency_id: {
          invisible: '1'
        },
        state: {
          invisible: '1'
        },
        invoice_status: {
          widget: 'badge'
        },
        date_planned: {
          invisible: "context.get['quotation_only', False]"
        }
      }
    }
  },

  purchase_order_view_activity: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    type: 'otherview',
    arch: {}
  },

  purchase_rfq: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Requests for Quotation',
    type: 'ir.actions.act_window',
    search_view_id: 'view_purchase_order_filter',
    res_model: 'purchase.order',
    domain: '[]',
    context: {
      quotation_only: true
    },
    views: {
      tree: 'purchase_order_kpis_tree',
      form: '=======todo=========='
    }
  },

  purchase_form_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Purchase Orders',
    type: 'ir.actions.act_window',
    search_view_id: 'purchase_order_view_search',
    res_model: 'purchase.order',
    domain: "[['state','in',['purchase', 'done']]]",
    context: {},
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_purchase_batch_bills: {
    _odoo_model: 'ir.actions.server',
    model_id: 'purchase.model_purchase_order',
    model: 'purchase_order'
  },

  action_purchase_send_reminder: {
    _odoo_model: 'ir.actions.server',
    model_id: 'purchase.model_purchase_order',
    model: 'purchase_order'
  },

  action_rfq_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Requests for Quotation',
    search_view_id: 'view_purchase_order_filter',
    res_model: 'purchase.order',
    views: {
      tree: 'purchase.purchase_order_form',
      form: '=======todo=========='
    }
  }
}

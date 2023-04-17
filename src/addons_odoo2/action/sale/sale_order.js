export default {
  sale_order_view_activity: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    type: 'otherview',
    arch: {}
  },

  view_sale_order_calendar: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    type: 'otherview',
    arch: {}
  },

  view_sale_order_graph: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    type: 'otherview',
    arch: {}
  },

  view_sale_order_pivot: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    type: 'otherview',
    arch: {}
  },

  view_sale_order_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    type: 'otherview',
    arch: {}
  },

  view_order_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    type: 'tree',
    arch: {
      sheet: {
        message_needaction: {
          invisible: '1'
        },
        name: {
          string: 'Number'
        },
        date_order: {
          string: 'Order Date',
          widget: 'date'
        },
        commitment_date: {},
        expected_date: {},
        partner_id: {},
        user_id: {
          widget: 'many2one_avatar_user'
        },
        activity_ids: {
          widget: 'list_activity'
        },
        team_id: {},
        company_id: {
          groups: 'base.group_multi_company'
        },
        amount_untaxed: {
          widget: 'monetary'
        },
        amount_tax: {
          widget: 'monetary'
        },
        amount_total: {
          widget: 'monetary'
        },
        currency_id: {
          invisible: '1'
        },
        invoice_status: {
          widget: 'badge'
        },
        tag_ids: {
          widget: 'many2many_tags',
          color_field: 'color'
        },
        state: {
          invisible: '1'
        }
      }
    }
  },

  view_quotation_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    type: 'tree',
    arch: {
      sheet: {
        name: {
          string: 'Number'
        },
        create_date: {
          string: 'Creation Date',
          widget: 'date'
        },
        commitment_date: {
          widget: 'date'
        },
        expected_date: {
          widget: 'date'
        },
        partner_id: {},
        user_id: {
          widget: 'many2one_avatar_user'
        },
        activity_ids: {
          widget: 'list_activity'
        },
        team_id: {},
        tag_ids: {
          widget: 'many2many_tags',
          color_field: 'color'
        },
        company_id: {
          groups: 'base.group_multi_company'
        },
        amount_untaxed: {
          widget: 'monetary'
        },
        amount_tax: {
          widget: 'monetary'
        },
        amount_total: {
          widget: 'monetary'
        },
        state: {
          widget: 'badge'
        },
        invoice_status: {},
        message_needaction: {
          invisible: '1'
        },
        currency_id: {
          invisible: '1'
        }
      }
    }
  },

  view_quotation_tree_with_onboarding: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    inherit_id: 'view_quotation_tree',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//tree',
            position: 'attributes'
          },
          _attribute_banner_route: {
            _attr: {
              name: 'banner_route',
              text: '/sales/sale_quotation_onboarding_panel'
            }
          }
        }
      }
    }
  },

  view_order_form: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    type: 'form',
    arch: {
      sheet: {
        _header: {
          authorized_transaction_ids: {
            invisible: '1'
          },
          _button_payment_action_capture: {
            _attr: {
              name: 'payment_action_capture',
              string: 'Capture Transaction',
              attrs: {
                invisible: "[('authorized_transaction_ids', '=', [])]"
              },
              class: 'oe_highlight',
              type: 'object'
            }
          },
          _button_payment_action_void: {
            _attr: {
              name: 'payment_action_void',
              string: 'Void Transaction',
              attrs: {
                invisible: "[('authorized_transaction_ids', '=', [])]"
              },
              type: 'object'
            }
          },
          _button_sale__action_view_sale_advance_payment_inv: {
            _attr: {
              name: 'sale.action_view_sale_advance_payment_inv',
              string: 'Create Invoice',
              attrs: {
                invisible: "[('invoice_status', '!=', 'to invoice')]"
              },
              class: 'btn-primary',
              type: 'action'
            }
          },
          _button_sale__action_view_sale_advance_payment_inv_786: {
            _attr: {
              name: 'sale.action_view_sale_advance_payment_inv',
              string: 'Create Invoice',
              attrs: {
                invisible: "['|', ('invoice_status', '!=', 'no'), ('state', '!=', 'sale')]"
              },
              context: {
                default_advance_payment_method: 'percentage'
              },
              type: 'action'
            }
          },
          _button_action_quotation_send: {
            _attr: {
              name: 'action_quotation_send',
              string: 'Send by Email',
              context: {
                validate_analytic: true
              },
              class: 'btn-primary',
              type: 'object'
            }
          },
          _button_action_quotation_send_598: {
            _attr: {
              name: 'action_quotation_send',
              string: 'Send PRO-FORMA Invoice',
              groups: 'sale.group_proforma_sales',
              attrs: {
                invisible: "['|', ('state', '!=', 'draft'), ('invoice_count', '>=', 1)]"
              },
              context: {
                proforma: true,
                validate_analytic: true
              },
              class: 'btn-primary',
              type: 'object'
            }
          },
          _button_action_confirm: {
            _attr: {
              name: 'action_confirm',
              string: 'Confirm',
              attrs: {
                invisible: "[('state', 'not in', ['sent'])]"
              },
              context: {
                validate_analytic: true
              },
              class: 'btn-primary',
              type: 'object'
            }
          },
          _button_action_confirm_404: {
            _attr: {
              name: 'action_confirm',
              string: 'Confirm',
              attrs: {
                invisible: "[('state', 'not in', ['draft'])]"
              },
              context: {
                validate_analytic: true
              },
              type: 'object'
            }
          },
          _button_action_quotation_send_115: {
            _attr: {
              name: 'action_quotation_send',
              string: 'Send PRO-FORMA Invoice',
              groups: 'sale.group_proforma_sales',
              attrs: {
                invisible: "['|', ('state', '=', 'draft'), ('invoice_count', '>=', 1)]"
              },
              context: {
                proforma: true,
                validate_analytic: true
              },
              type: 'object'
            }
          },
          _button_action_quotation_send_842: {
            _attr: {
              name: 'action_quotation_send',
              string: 'Send by Email',
              context: {
                validate_analytic: true
              },
              type: 'object'
            }
          },
          _button_action_cancel: {
            _attr: {
              name: 'action_cancel',
              string: 'Cancel',
              attrs: {
                invisible: "['|', ('state', 'not in', ['draft', 'sent', 'sale']), ('id', '=', False)]"
              },
              type: 'object'
            }
          },
          _button_action_draft: {
            _attr: {
              name: 'action_draft',
              string: 'Set to Quotation',
              type: 'object'
            }
          },
          state: {
            widget: 'statusbar'
          }
        },
        _div: {
          _attr: {
            groups: 'account.group_account_invoice,account.group_account_readonly',
            attrs: {
              invisible: "[('partner_credit_warning', '=', '')]"
            },
            class: 'alert alert-warning mb-0'
          },
          partner_credit_warning: {}
        },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_action_view_invoice: {
            _attr: {
              name: 'action_view_invoice',
              attrs: {
                invisible: "[('invoice_count', '=', 0)]"
              },
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-pencil-square-o'
            },
            invoice_count: {
              string: 'Invoices',
              widget: 'statinfo'
            }
          },
          _button_action_preview_sale_order: {
            _attr: {
              name: 'action_preview_sale_order',
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-globe icon'
            },
            _div: {
              _attr: {
                class: 'o_field_widget o_stat_info'
              },
              _span: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Customer'
                }
              },
              _span_856: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Preview'
                }
              }
            }
          }
        },
        _div_title: {
          _attr: {
            class: 'oe_title'
          },
          _h1: {
            name: {}
          }
        },
        _group_sale_header: {
          _attr: {
            name: 'sale_header'
          },
          _group_partner_details: {
            _attr: {
              name: 'partner_details'
            },
            partner_id: {
              widget: 'res_partner_many2one',
              context: {
                res_partner_search_mode: 'customer',
                show_address: 1,
                show_vat: true
              },
              always_reload: true
            },
            partner_invoice_id: {
              groups: 'account.group_delivery_invoice_address',
              context: {
                default_type: 'invoice'
              },
              always_reload: true
            },
            partner_shipping_id: {
              groups: 'account.group_delivery_invoice_address',
              context: {
                default_type: 'delivery'
              },
              always_reload: true
            }
          },
          _group_order_details: {
            _attr: {
              name: 'order_details'
            },
            validity_date: {
              attrs: {
                invisible: "[('state', 'in', ['sale', 'done'])]"
              }
            },
            _div: {
              _attr: {
                groups: 'base.group_no_one',
                attrs: {
                  invisible: "[('state', 'in', ['sale', 'done', 'cancel'])]"
                },
                class: 'o_td_label'
              },
              _label_date_order: {
                for: 'date_order',
                string: 'Quotation Date'
              }
            },
            date_order: {
              groups: 'base.group_no_one',
              attrs: {
                invisible: "[('state', 'in', ['sale', 'done', 'cancel'])]"
              }
            },
            _div_986: {
              _attr: {
                attrs: {
                  invisible: "[('state', 'in', ['draft', 'sent'])]"
                },
                class: 'o_td_label'
              },
              _label_date_order: {
                for: 'date_order',
                string: 'Order Date'
              }
            },
            _field_date_order_840: {
              date_order: {
                attrs: {
                  invisible: "[('state', 'in', ['draft', 'sent'])]"
                }
              }
            },
            show_update_pricelist: {
              invisible: '1'
            },
            _label_pricelist_id: {
              for: 'pricelist_id',
              groups: 'product.group_product_pricelist'
            },
            _div_396: {
              _attr: {
                groups: 'product.group_product_pricelist',
                class: 'o_row'
              },
              pricelist_id: {
                no_open: true,
                no_create: true
              },
              _button_action_update_prices: {
                _attr: {
                  name: 'action_update_prices',
                  string: ' Update Prices',
                  attrs: {
                    invisible: "['|', ('show_update_pricelist', '=', False), ('state', 'in', ['sale', 'done', 'cancel'])]"
                  },
                  class: 'btn-link mb-1 px-0',
                  type: 'object',
                  icon: 'fa-refresh'
                }
              }
            },
            company_id: {
              invisible: '1'
            },
            currency_id: {
              invisible: '1'
            },
            pricelist_id: {
              groups: '!product.group_product_pricelist',
              invisible: '1'
            },
            tax_country_id: {
              invisible: '1'
            },
            payment_term_id: {
              no_open: true,
              no_create: true
            }
          }
        },
        _notebook: {
          _page_order_lines: {
            _attr: {
              name: 'order_lines',
              string: 'Order Lines'
            },
            order_line: {
              widget: 'section_and_note_one2many',
              attrs: {
                readonly: "[('state', 'in', ('done', 'cancel'))]"
              },
              views: {
                form: {
                  arch: {
                    sheet: {
                      display_type: {
                        invisible: '1'
                      },
                      sequence: {
                        invisible: '1'
                      },
                      product_uom_category_id: {
                        invisible: '1'
                      },
                      _group: {
                        _group: {
                          _attr: {
                            attrs: {
                              invisible: "[('display_type', '!=', False)]"
                            }
                          },
                          product_updatable: {
                            invisible: '1'
                          },
                          product_id: {
                            widget: 'many2one_barcode',
                            domain: {
                              todo_ctx: "[('sale_ok', '=', True), '|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]"
                            },
                            attrs: {
                              readonly: "[('product_updatable', '=', False)]",
                              required: "[('display_type', '=', False)]"
                            },
                            context: {
                              todo_ctx: "{'partner_id':parent.partner_id, 'quantity':product_uom_qty, 'pricelist':parent.pricelist_id, 'uom':product_uom, 'company_id': parent.company_id}"
                            },
                            force_save: '1'
                          },
                          product_type: {
                            invisible: '1'
                          },
                          invoice_status: {
                            invisible: '1'
                          },
                          qty_to_invoice: {
                            invisible: '1'
                          },
                          qty_delivered_method: {
                            invisible: '1'
                          },
                          price_total: {
                            invisible: '1'
                          },
                          price_tax: {
                            invisible: '1'
                          },
                          price_subtotal: {
                            invisible: '1'
                          },
                          product_uom_readonly: {
                            invisible: '1'
                          },
                          _label_product_uom_qty: {
                            for: 'product_uom_qty'
                          },
                          _div_ordered_qty: {
                            _attr: {
                              name: 'ordered_qty',
                              class: 'o_row'
                            },
                            product_uom_qty: {
                              context: {
                                todo_ctx: "{'partner_id':parent.partner_id, 'quantity':product_uom_qty, 'pricelist':parent.pricelist_id, 'uom':product_uom, 'uom_qty_change':True, 'company_id': parent.company_id}"
                              }
                            },
                            product_uom: {
                              groups: '!uom.group_uom',
                              invisible: '1'
                            },
                            _field_product_uom_669: {
                              product_uom: {
                                groups: 'uom.group_uom',
                                attrs: {
                                  readonly: "[('product_uom_readonly', '=', True)]",
                                  required: "[('display_type', '=', False)]"
                                },
                                class: 'oe_no_button',
                                force_save: '1'
                              }
                            }
                          },
                          _label_qty_delivered: {
                            for: 'qty_delivered',
                            string: 'Delivered',
                            attrs: {
                              invisible: "[('parent.state', 'not in', ['sale', 'done'])]"
                            }
                          },
                          _div_delivered_qty: {
                            _attr: {
                              name: 'delivered_qty',
                              attrs: {
                                invisible: "[('parent.state', 'not in', ['sale', 'done'])]"
                              }
                            },
                            qty_delivered: {
                              attrs: {
                                readonly: "[('qty_delivered_method', '!=', 'manual')]"
                              }
                            }
                          },
                          _label_qty_invoiced: {
                            for: 'qty_invoiced',
                            string: 'Invoiced',
                            attrs: {
                              invisible: "[('parent.state', 'not in', ['sale', 'done'])]"
                            }
                          },
                          _div_invoiced_qty: {
                            _attr: {
                              name: 'invoiced_qty',
                              attrs: {
                                invisible: "[('parent.state', 'not in', ['sale', 'done'])]"
                              }
                            },
                            qty_invoiced: {
                              attrs: {
                                invisible: "[('parent.state', 'not in', ['sale', 'done'])]"
                              }
                            }
                          },
                          product_packaging_id: {
                            groups: 'product.group_stock_packaging',
                            attrs: {
                              invisible: "[('product_id', '=', False)]"
                            },
                            context: {
                              todo_ctx: "{'default_product_id': product_id, 'tree_view_ref':'product.product_packaging_tree_view', 'form_view_ref':'product.product_packaging_form_view'}"
                            }
                          },
                          price_unit: {},
                          tax_id: {
                            widget: 'many2many_tags',
                            domain: {
                              todo_ctx: "[('type_tax_use','=','sale'), ('company_id','=',parent.company_id), ('country_id', '=', parent.tax_country_id)]"
                            },
                            attrs: {
                              readonly: "[('qty_invoiced', '>', 0)]"
                            },
                            context: {
                              search_view_ref: 'account.account_tax_view_search'
                            },
                            no_create: true
                          },
                          _label_discount: {
                            for: 'discount',
                            groups: 'product.group_discount_per_so_line'
                          },
                          _div_discount: {
                            _attr: {
                              name: 'discount',
                              groups: 'product.group_discount_per_so_line'
                            },
                            discount: {
                              class: 'oe_inline'
                            }
                          },
                          sequence: {
                            invisible: '1'
                          }
                        },
                        _group_766: {
                          _attr: {
                            attrs: {
                              invisible: "[('display_type', '!=', False)]"
                            }
                          },
                          _label_customer_lead: {
                            for: 'customer_lead'
                          },
                          _div_lead: {
                            _attr: {
                              name: 'lead'
                            },
                            customer_lead: {
                              class: 'oe_inline'
                            }
                          },
                          analytic_distribution: {
                            widget: 'analytic_distribution',
                            groups: 'analytic.group_analytic_accounting',
                            product_field: 'product_id',
                            business_domain: 'sale_order'
                          }
                        }
                      },
                      _label_name: {
                        for: 'name',
                        string: 'Description',
                        attrs: {
                          invisible: "[('display_type', '!=', False)]"
                        }
                      },
                      _label_name_594: {
                        for: 'name',
                        string: 'Section Name (eg. Products, Services)',
                        attrs: {
                          invisible: "[('display_type', '!=', 'line_section')]"
                        }
                      },
                      _label_name_706: {
                        for: 'name',
                        string: 'Note',
                        attrs: {
                          invisible: "[('display_type', '!=', 'line_note')]"
                        }
                      },
                      name: {},
                      _div_invoice_lines: {
                        _attr: {
                          name: 'invoice_lines',
                          groups: 'base.group_no_one',
                          attrs: {
                            invisible: "[('display_type', '!=', False)]"
                          }
                        },
                        _label_invoice_lines: {
                          for: 'invoice_lines'
                        },
                        invoice_lines: {}
                      },
                      state: {
                        invisible: '1'
                      },
                      company_id: {
                        invisible: '1'
                      }
                    }
                  }
                },
                tree: {
                  arch: {
                    sheet: {
                      _attr: {
                        string: 'Sales Order Lines'
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
                      sequence: {
                        widget: 'handle'
                      },
                      display_type: {
                        invisible: '1'
                      },
                      product_uom_category_id: {
                        invisible: '1'
                      },
                      product_type: {
                        invisible: '1'
                      },
                      product_updatable: {
                        invisible: '1'
                      },
                      product_id: {
                        widget: 'sol_product_many2one',
                        domain: {
                          todo_ctx: "[('sale_ok', '=', True), '|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]"
                        },
                        attrs: {
                          readonly: "[('product_updatable', '=', False)]",
                          required: "[('display_type', '=', False)]"
                        },
                        context: {
                          todo_ctx: "{                                         'partner_id': parent.partner_id,                                         'quantity': product_uom_qty,                                         'pricelist': parent.pricelist_id,                                         'uom':product_uom,                                         'company_id': parent.company_id,                                         'default_lst_price': price_unit,                                         'default_description_sale': name                                     }"
                        },
                        force_save: '1',
                        no_open: true
                      },
                      product_template_id: {
                        string: 'Product',
                        widget: 'sol_product_many2one',
                        invisible: '1',
                        domain: {
                          todo_ctx: "[('sale_ok', '=', True), '|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]"
                        },
                        attrs: {
                          readonly: "[('product_updatable', '=', False)]",
                          required: "[('display_type', '=', False)]"
                        },
                        context: {
                          todo_ctx: "{                                         'partner_id': parent.partner_id,                                         'quantity': product_uom_qty,                                         'pricelist': parent.pricelist_id,                                         'uom':product_uom,                                         'company_id': parent.company_id,                                         'default_list_price': price_unit,                                         'default_description_sale': name                                     }"
                        },
                        no_open: true
                      },
                      name: {
                        widget: 'section_and_note_text'
                      },
                      analytic_distribution: {
                        widget: 'analytic_distribution',
                        groups: 'analytic.group_analytic_accounting',
                        product_field: 'product_id',
                        business_domain: 'sale_order'
                      },
                      product_uom_qty: {
                        context: {
                          todo_ctx: "{                                         'partner_id': parent.partner_id,                                         'quantity': product_uom_qty,                                         'pricelist': parent.pricelist_id,                                         'uom': product_uom,                                         'company_id': parent.company_id                                     }"
                        }
                      },
                      qty_delivered: {
                        string: 'Delivered',
                        attrs: {
                          column_invisible: "[('parent.state', 'not in', ['sale', 'done'])]",
                          readonly: "[('qty_delivered_method', '!=', 'manual')]"
                        }
                      },
                      qty_delivered_method: {
                        invisible: '1'
                      },
                      qty_invoiced: {
                        string: 'Invoiced',
                        attrs: {
                          column_invisible: "[('parent.state', 'not in', ['sale', 'done'])]"
                        }
                      },
                      qty_to_invoice: {
                        invisible: '1'
                      },
                      product_uom_readonly: {
                        invisible: '1'
                      },
                      product_uom: {
                        groups: '!uom.group_uom',
                        invisible: '1'
                      },
                      _field_product_uom_192: {
                        product_uom: {
                          string: 'UoM',
                          groups: 'uom.group_uom',
                          attrs: {
                            readonly: "[('product_uom_readonly', '=', True)]",
                            required: "[('display_type', '=', False)]"
                          },
                          context: {
                            todo_ctx: "{'company_id': parent.company_id}"
                          },
                          force_save: '1',
                          no_open: true
                        }
                      },
                      customer_lead: {
                        attrs: {
                          readonly: "[('parent.state', 'not in', ['draft', 'sent', 'sale'])]"
                        }
                      },
                      product_packaging_qty: {
                        groups: 'product.group_stock_packaging',
                        attrs: {
                          invisible: "['|', ('product_id', '=', False), ('product_packaging_id', '=', False)]"
                        }
                      },
                      product_packaging_id: {
                        groups: 'product.group_stock_packaging',
                        attrs: {
                          invisible: "[('product_id', '=', False)]"
                        },
                        context: {
                          todo_ctx: "{'default_product_id': product_id, 'tree_view_ref':'product.product_packaging_tree_view', 'form_view_ref':'product.product_packaging_form_view'}"
                        }
                      },
                      price_unit: {
                        attrs: {
                          readonly: "[('qty_invoiced', '>', 0)]"
                        }
                      },
                      tax_id: {
                        widget: 'many2many_tags',
                        domain: {
                          todo_ctx: "[('type_tax_use','=','sale'),('company_id','=',parent.company_id), ('country_id', '=', parent.tax_country_id)]"
                        },
                        attrs: {
                          readonly: "[('qty_invoiced', '>', 0)]"
                        },
                        context: {
                          active_test: true
                        },
                        no_create: true
                      },
                      discount: {
                        string: 'Disc.%',
                        widget: 'sol_discount',
                        groups: 'product.group_discount_per_so_line'
                      },
                      is_downpayment: {
                        invisible: '1'
                      },
                      price_subtotal: {
                        widget: 'monetary',
                        groups: 'account.group_show_line_subtotals_tax_excluded',
                        attrs: {
                          invisible: "[('is_downpayment', '=', True)]"
                        }
                      },
                      price_total: {
                        widget: 'monetary',
                        groups: 'account.group_show_line_subtotals_tax_included',
                        attrs: {
                          invisible: "[('is_downpayment', '=', True)]"
                        }
                      },
                      state: {
                        invisible: '1'
                      },
                      invoice_status: {
                        invisible: '1'
                      },
                      currency_id: {
                        invisible: '1'
                      },
                      price_tax: {
                        invisible: '1'
                      },
                      company_id: {
                        invisible: '1'
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
                      product_uom_qty: {},
                      product_uom: {},
                      price_subtotal: {},
                      price_total: {},
                      price_tax: {
                        invisible: '1'
                      },
                      _field_price_total_669: {
                        price_total: {
                          invisible: '1'
                        }
                      },
                      price_unit: {},
                      display_type: {},
                      tax_id: {
                        invisible: '1'
                      },
                      company_id: {
                        invisible: '1'
                      },
                      _templates: {
                        _t: {
                          _div: {
                            _t: {
                              _div: {
                                _attr: {
                                  class: 'row g-0'
                                },
                                _div: {
                                  _attr: {
                                    class: 'col-2 pe-3'
                                  },
                                  _img: {}
                                },
                                _div_386: {
                                  _attr: {
                                    class: 'col-10'
                                  },
                                  _div: {
                                    _attr: {
                                      class: 'row'
                                    },
                                    _div: {
                                      _attr: {
                                        class: 'col'
                                      },
                                      _strong: {}
                                    },
                                    _div_773: {
                                      _attr: {
                                        class: 'col-auto'
                                      },
                                      _t: {
                                        _attr: {
                                          groups: 'account.group_show_line_subtotals_tax_excluded'
                                        }
                                      },
                                      _t_426: {
                                        _attr: {
                                          groups: 'account.group_show_line_subtotals_tax_included'
                                        }
                                      },
                                      _strong: {
                                        _attr: {
                                          class: 'float-end text-end'
                                        }
                                      }
                                    }
                                  },
                                  _div_278: {
                                    _attr: {
                                      class: 'row'
                                    },
                                    _div: {
                                      _attr: {
                                        class: 'col-12 text-muted',
                                        text: 'Quantity:'
                                      },
                                      _t: {},
                                      _t_856: {}
                                    }
                                  },
                                  _div_721: {
                                    _attr: {
                                      class: 'row'
                                    },
                                    _div: {
                                      _attr: {
                                        class: 'col-12 text-muted',
                                        text: 'Unit Price:'
                                      },
                                      _t: {}
                                    }
                                  }
                                }
                              }
                            },
                            _t_798: {
                              _div: {
                                _attr: {
                                  class: 'row'
                                },
                                _div: {
                                  _attr: {
                                    class: 'col-12'
                                  },
                                  _t: {}
                                }
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
            _group_note_group: {
              _attr: {
                name: 'note_group',
                class: 'mt-2 mt-md-0'
              },
              _group: {
                note: {
                  placeholder: 'Terms and conditions...'
                }
              },
              _group_sale_total: {
                _attr: {
                  name: 'sale_total',
                  class: 'oe_subtotal_footer oe_right'
                },
                tax_totals: {
                  widget: 'account-tax-totals-field'
                }
              },
              _div: {
                _attr: {
                  class: 'clearfix'
                }
              }
            }
          },
          _page_other_information: {
            _attr: {
              name: 'other_information',
              string: 'Other Info'
            },
            _group: {
              _group_sales_person: {
                _attr: {
                  name: 'sales_person',
                  string: 'Sales'
                },
                user_id: {
                  widget: 'many2one_avatar_user'
                },
                team_id: {
                  no_create: true
                },
                company_id: {
                  groups: 'base.group_multi_company',
                  no_create: true
                },
                _label_require_signature: {
                  for: 'require_signature',
                  string: 'Online confirmation'
                },
                _div: {
                  require_signature: {
                    class: 'oe_inline'
                  },
                  _span: 'Signature',
                  require_payment: {
                    class: 'oe_inline ms-3'
                  },
                  _span_153: 'Payment'
                },
                reference: {
                  attrs: {
                    invisible: "[('reference', '=', False)]"
                  }
                },
                client_order_ref: {},
                tag_ids: {
                  widget: 'many2many_tags',
                  color_field: 'color',
                  no_create_edit: true
                }
              },
              _group_sale_info: {
                _attr: {
                  name: 'sale_info',
                  string: 'Invoicing and Payments'
                },
                show_update_fpos: {
                  invisible: '1'
                },
                _label_fiscal_position_id: {
                  for: 'fiscal_position_id'
                },
                _div: {
                  _attr: {
                    class: 'o_row'
                  },
                  fiscal_position_id: {
                    no_create: true
                  },
                  _button_action_update_taxes: {
                    _attr: {
                      name: 'action_update_taxes',
                      string: ' Update Taxes',
                      attrs: {
                        invisible: "['|', ('show_update_fpos', '=', False), ('state', 'in', ['sale', 'done', 'cancel'])]"
                      },
                      class: 'btn-link mb-1 px-0',
                      type: 'object',
                      icon: 'fa-refresh'
                    }
                  }
                },
                partner_invoice_id: {
                  invisible: '1'
                },
                analytic_account_id: {
                  groups: 'analytic.group_analytic_accounting',
                  attrs: {
                    readonly: "[('invoice_count', '!=', 0), ('state', '=', 'sale')]"
                  },
                  context: {
                    todo_ctx: "{'default_partner_id':partner_invoice_id, 'default_name':name}"
                  },
                  force_save: '1'
                },
                invoice_status: {
                  groups: 'base.group_no_one'
                },
                _field_invoice_status_855: {
                  invoice_status: {
                    groups: '!base.group_no_one',
                    invisible: '1'
                  }
                }
              }
            },
            _group_393: {
              _group_sale_shipping: {
                _attr: {
                  name: 'sale_shipping'
                },
                _label_commitment_date: {
                  for: 'commitment_date',
                  string: 'Delivery Date'
                },
                _div_commitment_date_div: {
                  _attr: {
                    name: 'commitment_date_div',
                    class: 'o_row'
                  },
                  commitment_date: {},
                  _span_expected_date_span: {
                    _attr: {
                      name: 'expected_date_span',
                      class: 'text-muted',
                      text: 'Expected:'
                    },
                    expected_date: {
                      widget: 'date',
                      class: 'oe_inline'
                    }
                  }
                }
              },
              _group_sale_reporting: {
                _attr: {
                  name: 'sale_reporting',
                  string: 'Tracking'
                },
                _group_technical: {
                  _attr: {
                    name: 'technical',
                    class: 'mb-0'
                  },
                  origin: {}
                },
                _group_utm_link: {
                  _attr: {
                    name: 'utm_link',
                    class: 'mt-0'
                  },
                  campaign_id: {
                    create_name_field: 'title',
                    always_reload: true
                  },
                  medium_id: {},
                  source_id: {}
                }
              }
            }
          },
          _page_customer_signature: {
            _attr: {
              name: 'customer_signature',
              string: 'Customer Signature',
              groups: 'base.group_no_one',
              attrs: {
                invisible: "[('require_signature', '=', False), ('signed_by', '=', False), ('signature', '=', False), ('signed_on', '=', False)]"
              }
            },
            _group: {
              signed_by: {},
              signed_on: {},
              signature: {
                widget: 'image'
              }
            }
          }
        }
      }
    }
  },

  view_sales_order_auto_done_setting: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    inherit_id: 'sale.view_order_form',
    arch: {
      sheet: {
        _button_action_draft: {
          _attr: {
            name: 'action_draft'
          },
          _t: {
            _attr: {
              groups: 'sale.group_auto_done_setting'
            },
            _button_action_done: {
              _attr: {
                name: 'action_done',
                string: 'Lock',
                groups: 'sales_team.group_sale_manager',
                type: 'object'
              }
            },
            _button_action_unlock: {
              _attr: {
                name: 'action_unlock',
                string: 'Unlock',
                groups: 'sales_team.group_sale_manager',
                type: 'object'
              }
            }
          }
        }
      }
    }
  },

  view_sales_order_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    type: 'search',
    arch: {
      name: {
        string: 'Order'
      },
      partner_id: {},
      user_id: {},
      team_id: {
        string: 'Sales Team'
      },
      order_line: {
        string: 'Product'
      },
      analytic_account_id: {
        groups: 'analytic.group_analytic_accounting'
      },
      _filter_my_sale_orders_filter: {
        _attr: {
          name: 'my_sale_orders_filter',
          string: 'My Orders',
          domain: {
            todo_ctx: "[('user_id', '=', uid)]"
          }
        }
      },
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
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_salesperson: {
          _attr: {
            name: 'salesperson',
            string: 'Salesperson',
            domain: [],
            context: {
              group_by: 'user_id'
            }
          }
        },
        _filter_customer: {
          _attr: {
            name: 'customer',
            string: 'Customer',
            domain: [],
            context: {
              group_by: 'partner_id'
            }
          }
        },
        _filter_order_month: {
          _attr: {
            name: 'order_month',
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

  sale_order_view_search_inherit_quotation: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    inherit_id: 'sale.view_sales_order_filter',
    arch: {
      sheet: {
        _filter_my_sale_orders_filter: {
          _attr: {
            name: 'my_sale_orders_filter'
          },
          campaign_id: {},
          _separator: {},
          _filter_my_quotation: {
            _attr: {
              name: 'my_quotation',
              string: 'My Quotations',
              domain: {
                todo_ctx: "[('user_id', '=', uid)]"
              }
            }
          },
          _separator_625: {},
          _filter_draft: {
            _attr: {
              name: 'draft',
              string: 'Quotations',
              domain: "[('state', 'in', ('draft', 'sent'))]"
            }
          },
          _filter_sales: {
            _attr: {
              name: 'sales',
              string: 'Sales Orders',
              domain: "[('state', 'in', ('sale', 'done'))]"
            }
          },
          _separator_539: {},
          _filter_filter_create_date: {
            _attr: {
              name: 'filter_create_date',
              string: 'Create Date'
            }
          }
        }
      }
    }
  },

  sale_order_view_search_inherit_sale: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    inherit_id: 'sale.view_sales_order_filter',
    arch: {
      sheet: {
        _filter_my_sale_orders_filter: {
          _attr: {
            name: 'my_sale_orders_filter'
          },
          _separator: {},
          _filter_to_invoice: {
            _attr: {
              name: 'to_invoice',
              string: 'To Invoice',
              domain: "[('invoice_status', '=', 'to invoice')]"
            }
          },
          _filter_upselling: {
            _attr: {
              name: 'upselling',
              string: 'To Upsell',
              domain: "[('invoice_status', '=', 'upselling')]"
            }
          },
          _separator_429: {},
          _filter_order_date: {
            _attr: {
              name: 'order_date',
              string: 'Order Date'
            }
          }
        }
      }
    }
  },

  action_orders: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Sales Orders',
    type: 'ir.actions.act_window',
    search_view_id: 'sale_order_view_search_inherit_sale',
    res_model: 'sale.order',
    domain: "[('state', 'not in', ('draft', 'sent', 'cancel'))]",
    context: {},
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  sale_order_action_view_order_tree: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'tree',
    view_id: 'sale.view_order_tree',
    act_window_id: 'action_orders'
  },

  sale_order_action_view_order_kanban: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'kanban',
    view_id: 'sale.view_sale_order_kanban',
    act_window_id: 'action_orders'
  },

  sale_order_action_view_order_form: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'form',
    view_id: 'sale.view_order_form',
    act_window_id: 'action_orders'
  },

  sale_order_action_view_order_calendar: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'calendar',
    view_id: 'sale.view_sale_order_calendar',
    act_window_id: 'action_orders'
  },

  sale_order_action_view_order_pivot: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'pivot',
    view_id: 'sale.view_sale_order_pivot',
    act_window_id: 'action_orders'
  },

  sale_order_action_view_order_graph: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'graph',
    view_id: 'sale.view_sale_order_graph',
    act_window_id: 'action_orders'
  },

  action_quotations_with_onboarding: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Quotations',
    type: 'ir.actions.act_window',
    search_view_id: 'sale_order_view_search_inherit_quotation',
    res_model: 'sale.order',
    context: {
      search_default_my_quotation: 1
    },
    views: {
      tree: 'view_quotation_tree_with_onboarding',
      form: '=======todo=========='
    }
  },

  action_quotations: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Quotations',
    type: 'ir.actions.act_window',
    search_view_id: 'sale_order_view_search_inherit_quotation',
    res_model: 'sale.order',
    context: {
      search_default_my_quotation: 1
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  sale_order_action_view_quotation_tree: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'tree',
    view_id: 'sale.view_quotation_tree',
    act_window_id: 'action_quotations'
  },

  sale_order_action_view_quotation_kanban: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'kanban',
    view_id: 'sale.view_sale_order_kanban',
    act_window_id: 'action_quotations'
  },

  sale_order_action_view_quotation_form: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'form',
    view_id: 'sale.view_order_form',
    act_window_id: 'action_quotations'
  },

  sale_order_action_view_quotation_calendar: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'calendar',
    view_id: 'sale.view_sale_order_calendar',
    act_window_id: 'action_quotations'
  },

  sale_order_action_view_quotation_pivot: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'pivot',
    view_id: 'sale.view_sale_order_pivot',
    act_window_id: 'action_quotations'
  },

  sale_order_action_view_quotation_graph: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'graph',
    view_id: 'sale.view_sale_order_graph',
    act_window_id: 'action_quotations'
  },

  action_orders_to_invoice: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Orders to Invoice',
    type: 'ir.actions.act_window',
    search_view_id: 'view_sales_order_filter',
    res_model: 'sale.order',
    domain: "[('invoice_status','=','to invoice')]",
    context: {
      create: false
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_orders_upselling: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Orders to Upsell',
    type: 'ir.actions.act_window',
    search_view_id: 'view_sales_order_filter',
    res_model: 'sale.order',
    domain: "[('invoice_status','=','upselling')]",
    context: {
      create: false
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

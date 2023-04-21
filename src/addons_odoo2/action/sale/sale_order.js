export default {
  act_res_partner_2_sale_order: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Quotations and Sales',
    res_model: 'sale.order',
    search_view_id: 'tooooooodoooooo',
    context: { todo_ctx: "{'default_partner_id': active_id}" },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_quotations_salesteams: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Quotations',
    type: 'ir.actions.act_window',
    res_model: 'sale.order',
    search_view_id: 'sale.sale_order_view_search_inherit_quotation',
    domain: '[]',
    context: { todo_ctx: "{\n                'search_default_team_id': [active_id],\n                'default_team_id': active_id,\n                'show_address': 1,\n            }\n        " },
    views: {
      tree: 'sale.view_quotation_tree',
      form: '=======todo=========='
    }
  },

  action_quotation_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'New Quotation',
    type: 'ir.actions.act_window',
    res_model: 'sale.order',
    search_view_id: 'sale_order_view_search_inherit_quotation',
    context: { todo_ctx: "{\n                'search_default_team_id': [active_id],\n                'default_team_id': active_id,\n                'default_user_id': uid,\n        }\n        " },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_orders_salesteams: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Sales Orders',
    type: 'ir.actions.act_window',
    res_model: 'sale.order',
    search_view_id: 'sale.sale_order_view_search_inherit_sale',
    domain: "[['state','not in',['draft','sent','cancel']]]",
    context: { todo_ctx: "{\n                'search_default_team_id': [active_id],\n                'default_team_id': active_id,\n            }\n        " },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_orders_to_invoice_salesteams: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Sales Orders',
    type: 'ir.actions.act_window',
    res_model: 'sale.order',
    search_view_id: 'sale.sale_order_view_search_inherit_sale',
    domain: "[['invoice_status','=','to invoice']]",
    context: { todo_ctx: "{\n                'search_default_team_id': [active_id],\n                'default_team_id': active_id,\n            }\n        " },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

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
        message_needaction: { invisible: '1' },
        name: {
          string: 'Number',
          readonly: '1'
        },
        date_order: {
          string: 'Order Date',
          widget: 'date',
          optional: 'show'
        },
        commitment_date: { optional: 'hide' },
        expected_date: { optional: 'hide' },
        partner_id: { readonly: '1' },
        user_id: {
          widget: 'many2one_avatar_user',
          optional: 'show'
        },
        activity_ids: {
          widget: 'list_activity',
          optional: 'show'
        },
        team_id: { optional: 'hide' },
        company_id: {
          groups: 'base.group_multi_company',
          readonly: '1',
          optional: 'show'
        },
        amount_untaxed: {
          widget: 'monetary',
          optional: 'hide'
        },
        amount_tax: {
          widget: 'monetary',
          optional: 'hide'
        },
        amount_total: {
          widget: 'monetary',
          optional: 'show'
        },
        currency_id: { invisible: '1' },
        invoice_status: {
          widget: 'badge',
          optional: 'show'
        },
        tag_ids: {
          widget: 'many2many_tags',
          optional: 'hide',
          color_field: 'color'
        },
        state: { invisible: '1' }
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
          string: 'Number',
          readonly: '1'
        },
        create_date: {
          string: 'Creation Date',
          widget: 'date',
          optional: 'show'
        },
        commitment_date: {
          widget: 'date',
          optional: 'hide'
        },
        expected_date: {
          widget: 'date',
          optional: 'hide'
        },
        partner_id: { readonly: '1' },
        user_id: {
          widget: 'many2one_avatar_user',
          optional: 'show'
        },
        activity_ids: {
          widget: 'list_activity',
          optional: 'show'
        },
        team_id: { optional: 'hide' },
        tag_ids: {
          widget: 'many2many_tags',
          optional: 'hide',
          color_field: 'color'
        },
        company_id: {
          groups: 'base.group_multi_company',
          readonly: '1',
          optional: 'show'
        },
        amount_untaxed: {
          widget: 'monetary',
          optional: 'hide'
        },
        amount_tax: {
          widget: 'monetary',
          optional: 'hide'
        },
        amount_total: {
          widget: 'monetary',
          optional: 'show'
        },
        state: {
          widget: 'badge',
          optional: 'show'
        },
        invoice_status: { optional: 'hide' },
        message_needaction: { invisible: '1' },
        currency_id: { invisible: '1' }
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
              text: '/sales/sale_quotation_onboarding_panel',
              banner_route: '/sales/sale_quotation_onboarding_panel'
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
      header: {
        authorized_transaction_ids: { invisible: '1' },
        _button_payment_action_capture: {
          _attr: {
            name: 'payment_action_capture',
            type: 'object',
            string: 'Capture Transaction',
            invisible: [['authorized_transaction_ids', '=', []]],
            class: 'oe_highlight'
          }
        },
        _button_payment_action_void: {
          _attr: {
            name: 'payment_action_void',
            type: 'object',
            string: 'Void Transaction',
            invisible: [['authorized_transaction_ids', '=', []]]
          }
        },
        _button_sale__action_view_sale_advance_payment_inv: {
          _attr: {
            name: 'sale.action_view_sale_advance_payment_inv',
            type: 'action',
            string: 'Create Invoice',
            invisible: [['invoice_status', '!=', 'to invoice']],
            class: 'btn-primary'
          }
        },
        _button_sale__action_view_sale_advance_payment_inv_189: {
          _attr: {
            name: 'sale.action_view_sale_advance_payment_inv',
            type: 'action',
            string: 'Create Invoice',
            invisible: ['|', ['invoice_status', '!=', 'no'], ['state', '!=', 'sale']],
            context: { default_advance_payment_method: 'percentage' }
          }
        },
        _button_action_quotation_send: {
          _attr: {
            name: 'action_quotation_send',
            type: 'object',
            string: 'Send by Email',
            states: 'draft',
            context: { validate_analytic: true },
            class: 'btn-primary'
          }
        },
        _button_action_quotation_send_290: {
          _attr: {
            name: 'action_quotation_send',
            type: 'object',
            string: 'Send PRO-FORMA Invoice',
            groups: 'sale.group_proforma_sales',
            invisible: ['|', ['state', '!=', 'draft'], ['invoice_count', '>=', 1]],
            context: {
              proforma: true,
              validate_analytic: true
            },
            class: 'btn-primary'
          }
        },
        _button_action_confirm: {
          _attr: {
            name: 'action_confirm',
            type: 'object',
            string: 'Confirm',
            invisible: [['state', 'not in', ['sent']]],
            context: { validate_analytic: true },
            class: 'btn-primary'
          }
        },
        _button_action_confirm_324: {
          _attr: {
            name: 'action_confirm',
            type: 'object',
            string: 'Confirm',
            invisible: [['state', 'not in', ['draft']]],
            context: { validate_analytic: true }
          }
        },
        _button_action_quotation_send_865: {
          _attr: {
            name: 'action_quotation_send',
            type: 'object',
            string: 'Send PRO-FORMA Invoice',
            groups: 'sale.group_proforma_sales',
            invisible: ['|', ['state', '=', 'draft'], ['invoice_count', '>=', 1]],
            context: {
              proforma: true,
              validate_analytic: true
            }
          }
        },
        _button_action_quotation_send_534: {
          _attr: {
            name: 'action_quotation_send',
            type: 'object',
            string: 'Send by Email',
            states: 'sent,sale',
            context: { validate_analytic: true }
          }
        },
        _button_action_cancel: {
          _attr: {
            name: 'action_cancel',
            type: 'object',
            string: 'Cancel',
            invisible: ['|', ['state', 'not in', ['draft', 'sent', 'sale']], ['id', '=', false]]
          }
        },
        _button_action_draft: {
          _attr: {
            name: 'action_draft',
            type: 'object',
            string: 'Set to Quotation',
            states: 'cancel'
          }
        },
        state: {
          widget: 'statusbar',
          statusbar_visible: 'draft,sent,sale'
        }
      },
      sheet: {
        _div: {
          _attr: {
            groups: 'account.group_account_invoice,account.group_account_readonly',
            invisible: [['partner_credit_warning', '=', '']],
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
              type: 'object',
              icon: 'fa-pencil-square-o',
              invisible: [['invoice_count', '=', 0]],
              class: 'oe_stat_button'
            },
            invoice_count: {
              string: 'Invoices',
              widget: 'statinfo'
            }
          },
          _button_action_preview_sale_order: {
            _attr: {
              name: 'action_preview_sale_order',
              type: 'object',
              icon: 'fa-globe icon',
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_field_widget o_stat_info' },
              _span: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Customer'
                }
              },
              _span_334: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Preview'
                }
              }
            }
          }
        },
        _div_title: {
          _attr: { class: 'oe_title' },
          _h1: {
            name: { readonly: '1' }
          }
        },
        _group_sale_header: {
          _attr: { name: 'sale_header' },
          _group_partner_details: {
            _attr: { name: 'partner_details' },
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
              context: { default_type: 'invoice' },
              always_reload: true
            },
            partner_shipping_id: {
              groups: 'account.group_delivery_invoice_address',
              context: { default_type: 'delivery' },
              always_reload: true
            }
          },
          _group_order_details: {
            _attr: { name: 'order_details' },
            validity_date: { invisible: [['state', 'in', ['sale', 'done']]] },
            _div: {
              _attr: {
                groups: 'base.group_no_one',
                invisible: [['state', 'in', ['sale', 'done', 'cancel']]],
                class: 'o_td_label'
              },
              _label_date_order: {
                for: 'date_order',
                string: 'Quotation Date'
              }
            },
            date_order: {
              groups: 'base.group_no_one',
              invisible: [['state', 'in', ['sale', 'done', 'cancel']]]
            },
            _div_552: {
              _attr: {
                invisible: [['state', 'in', ['draft', 'sent']]],
                class: 'o_td_label'
              },
              _label_date_order: {
                for: 'date_order',
                string: 'Order Date'
              }
            },
            _field_date_order_121: {
              date_order: { invisible: [['state', 'in', ['draft', 'sent']]] }
            },
            show_update_pricelist: { invisible: '1' },
            _label_pricelist_id: {
              for: 'pricelist_id',
              groups: 'product.group_product_pricelist'
            },
            _div_182: {
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
                  type: 'object',
                  string: ' Update Prices',
                  icon: 'fa-refresh',
                  help: 'Recompute all prices based on this pricelist',
                  invisible: ['|', ['show_update_pricelist', '=', false], ['state', 'in', ['sale', 'done', 'cancel']]],
                  class: 'btn-link mb-1 px-0'
                }
              }
            },
            company_id: { invisible: '1' },
            currency_id: { invisible: '1' },
            pricelist_id: {
              groups: '!product.group_product_pricelist',
              invisible: '1'
            },
            tax_country_id: { invisible: '1' },
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
              readonly: [['state', 'in', ('done', 'cancel')]],
              views: {
                form: {
                  arch: {
                    sheet: {
                      display_type: { invisible: '1' },
                      sequence: { invisible: '1' },
                      product_uom_category_id: { invisible: '1' },
                      _group: {
                        _group: {
                          _attr: { invisible: [['display_type', '!=', false]] },
                          product_updatable: { invisible: '1' },
                          product_id: {
                            widget: 'many2one_barcode',
                            domain: { todo_ctx: "[('sale_ok', '=', True), '|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]" },
                            readonly: [['product_updatable', '=', false]],
                            required: [['display_type', '=', false]],
                            context: { todo_ctx: "{'partner_id':parent.partner_id, 'quantity':product_uom_qty, 'pricelist':parent.pricelist_id, 'uom':product_uom, 'company_id': parent.company_id}" },
                            force_save: '1'
                          },
                          product_type: { invisible: '1' },
                          invoice_status: { invisible: '1' },
                          qty_to_invoice: { invisible: '1' },
                          qty_delivered_method: { invisible: '1' },
                          price_total: { invisible: '1' },
                          price_tax: { invisible: '1' },
                          price_subtotal: { invisible: '1' },
                          product_uom_readonly: { invisible: '1' },
                          _label_product_uom_qty: { for: 'product_uom_qty' },
                          _div_ordered_qty: {
                            _attr: {
                              name: 'ordered_qty',
                              class: 'o_row'
                            },
                            product_uom_qty: {
                              context: { todo_ctx: "{'partner_id':parent.partner_id, 'quantity':product_uom_qty, 'pricelist':parent.pricelist_id, 'uom':product_uom, 'uom_qty_change':True, 'company_id': parent.company_id}" }
                            },
                            product_uom: {
                              groups: '!uom.group_uom',
                              invisible: '1'
                            },
                            _field_product_uom_400: {
                              product_uom: {
                                groups: 'uom.group_uom',
                                readonly: [['product_uom_readonly', '=', true]],
                                required: [['display_type', '=', false]],
                                class: 'oe_no_button',
                                force_save: '1'
                              }
                            }
                          },
                          _label_qty_delivered: {
                            for: 'qty_delivered',
                            string: 'Delivered',
                            invisible: [['parent.state', 'not in', ['sale', 'done']]]
                          },
                          _div_delivered_qty: {
                            _attr: {
                              name: 'delivered_qty',
                              invisible: [['parent.state', 'not in', ['sale', 'done']]]
                            },
                            qty_delivered: { readonly: [['qty_delivered_method', '!=', 'manual']] }
                          },
                          _label_qty_invoiced: {
                            for: 'qty_invoiced',
                            string: 'Invoiced',
                            invisible: [['parent.state', 'not in', ['sale', 'done']]]
                          },
                          _div_invoiced_qty: {
                            _attr: {
                              name: 'invoiced_qty',
                              invisible: [['parent.state', 'not in', ['sale', 'done']]]
                            },
                            qty_invoiced: { invisible: [['parent.state', 'not in', ['sale', 'done']]] }
                          },
                          product_packaging_id: {
                            groups: 'product.group_stock_packaging',
                            invisible: [['product_id', '=', false]],
                            context: { todo_ctx: "{'default_product_id': product_id, 'tree_view_ref':'product.product_packaging_tree_view', 'form_view_ref':'product.product_packaging_form_view'}" }
                          },
                          price_unit: {},
                          tax_id: {
                            widget: 'many2many_tags',
                            domain: { todo_ctx: "[('type_tax_use','=','sale'), ('company_id','=',parent.company_id), ('country_id', '=', parent.tax_country_id)]" },
                            readonly: [['qty_invoiced', '>', 0]],
                            context: { search_view_ref: 'account.account_tax_view_search' },
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
                            discount: { class: 'oe_inline' }
                          },
                          sequence: { invisible: '1' }
                        },
                        _group_884: {
                          _attr: { invisible: [['display_type', '!=', false]] },
                          _label_customer_lead: { for: 'customer_lead' },
                          _div_lead: {
                            _attr: { name: 'lead' },
                            customer_lead: { class: 'oe_inline' }
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
                        invisible: [['display_type', '!=', false]]
                      },
                      _label_name_569: {
                        for: 'name',
                        string: 'Section Name (eg. Products, Services)',
                        invisible: [['display_type', '!=', 'line_section']]
                      },
                      _label_name_760: {
                        for: 'name',
                        string: 'Note',
                        invisible: [['display_type', '!=', 'line_note']]
                      },
                      name: {},
                      _div_invoice_lines: {
                        _attr: {
                          name: 'invoice_lines',
                          groups: 'base.group_no_one',
                          invisible: [['display_type', '!=', false]]
                        },
                        _label_invoice_lines: { for: 'invoice_lines' },
                        invoice_lines: {}
                      },
                      state: { invisible: '1' },
                      company_id: { invisible: '1' }
                    }
                  }
                },
                tree: {
                  arch: {
                    sheet: {
                      _attr: { string: 'Sales Order Lines' },
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
                            context: { default_display_type: 'line_section' }
                          }
                        },
                        _create_add_note_control: {
                          _attr: {
                            name: 'add_note_control',
                            string: 'Add a note',
                            context: { default_display_type: 'line_note' }
                          }
                        }
                      },
                      sequence: { widget: 'handle' },
                      display_type: { invisible: '1' },
                      product_uom_category_id: { invisible: '1' },
                      product_type: { invisible: '1' },
                      product_updatable: { invisible: '1' },
                      product_id: {
                        widget: 'sol_product_many2one',
                        domain: { todo_ctx: "[('sale_ok', '=', True), '|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]" },
                        readonly: [['product_updatable', '=', false]],
                        required: [['display_type', '=', false]],
                        context: { todo_ctx: "{                                         'partner_id': parent.partner_id,                                         'quantity': product_uom_qty,                                         'pricelist': parent.pricelist_id,                                         'uom':product_uom,                                         'company_id': parent.company_id,                                         'default_lst_price': price_unit,                                         'default_description_sale': name                                     }" },
                        force_save: '1',
                        no_open: true
                      },
                      product_template_id: {
                        string: 'Product',
                        widget: 'sol_product_many2one',
                        invisible: '1',
                        domain: { todo_ctx: "[('sale_ok', '=', True), '|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]" },
                        readonly: [['product_updatable', '=', false]],
                        required: [['display_type', '=', false]],
                        context: { todo_ctx: "{                                         'partner_id': parent.partner_id,                                         'quantity': product_uom_qty,                                         'pricelist': parent.pricelist_id,                                         'uom':product_uom,                                         'company_id': parent.company_id,                                         'default_list_price': price_unit,                                         'default_description_sale': name                                     }" },
                        no_open: true
                      },
                      name: {
                        widget: 'section_and_note_text',
                        optional: 'show'
                      },
                      analytic_distribution: {
                        widget: 'analytic_distribution',
                        groups: 'analytic.group_analytic_accounting',
                        optional: 'hide',
                        product_field: 'product_id',
                        business_domain: 'sale_order'
                      },
                      product_uom_qty: {
                        context: { todo_ctx: "{                                         'partner_id': parent.partner_id,                                         'quantity': product_uom_qty,                                         'pricelist': parent.pricelist_id,                                         'uom': product_uom,                                         'company_id': parent.company_id                                     }" }
                      },
                      qty_delivered: {
                        string: 'Delivered',
                        column_invisible: [['parent.state', 'not in', ['sale', 'done']]],
                        readonly: [['qty_delivered_method', '!=', 'manual']],
                        optional: 'show'
                      },
                      qty_delivered_method: { invisible: '1' },
                      qty_invoiced: {
                        string: 'Invoiced',
                        column_invisible: [['parent.state', 'not in', ['sale', 'done']]],
                        optional: 'show'
                      },
                      qty_to_invoice: { invisible: '1' },
                      product_uom_readonly: { invisible: '1' },
                      product_uom: {
                        groups: '!uom.group_uom',
                        invisible: '1'
                      },
                      _field_product_uom_656: {
                        product_uom: {
                          string: 'UoM',
                          groups: 'uom.group_uom',
                          readonly: [['product_uom_readonly', '=', true]],
                          required: [['display_type', '=', false]],
                          context: { todo_ctx: "{'company_id': parent.company_id}" },
                          optional: 'show',
                          force_save: '1',
                          no_open: true
                        }
                      },
                      customer_lead: {
                        readonly: [['parent.state', 'not in', ['draft', 'sent', 'sale']]],
                        optional: 'hide'
                      },
                      product_packaging_qty: {
                        groups: 'product.group_stock_packaging',
                        invisible: ['|', ['product_id', '=', false], ['product_packaging_id', '=', false]],
                        optional: 'show'
                      },
                      product_packaging_id: {
                        groups: 'product.group_stock_packaging',
                        invisible: [['product_id', '=', false]],
                        context: { todo_ctx: "{'default_product_id': product_id, 'tree_view_ref':'product.product_packaging_tree_view', 'form_view_ref':'product.product_packaging_form_view'}" },
                        optional: 'show'
                      },
                      price_unit: { readonly: [['qty_invoiced', '>', 0]] },
                      tax_id: {
                        widget: 'many2many_tags',
                        domain: { todo_ctx: "[('type_tax_use','=','sale'),('company_id','=',parent.company_id), ('country_id', '=', parent.tax_country_id)]" },
                        readonly: [['qty_invoiced', '>', 0]],
                        context: { active_test: true },
                        optional: 'show',
                        no_create: true
                      },
                      discount: {
                        string: 'Disc.%',
                        widget: 'sol_discount',
                        groups: 'product.group_discount_per_so_line',
                        optional: 'show'
                      },
                      is_downpayment: { invisible: '1' },
                      price_subtotal: {
                        widget: 'monetary',
                        groups: 'account.group_show_line_subtotals_tax_excluded',
                        invisible: [['is_downpayment', '=', true]]
                      },
                      price_total: {
                        widget: 'monetary',
                        groups: 'account.group_show_line_subtotals_tax_included',
                        invisible: [['is_downpayment', '=', true]]
                      },
                      state: { invisible: '1' },
                      invoice_status: { invisible: '1' },
                      currency_id: { invisible: '1' },
                      price_tax: { invisible: '1' },
                      company_id: { invisible: '1' }
                    }
                  }
                },
                kanban: {
                  arch: {
                    sheet: {
                      _attr: { class: 'o_kanban_mobile' },
                      name: {},
                      product_id: {},
                      product_uom_qty: {},
                      product_uom: {},
                      price_subtotal: {},
                      price_total: {},
                      price_tax: { invisible: '1' },
                      _field_price_total_490: {
                        price_total: { invisible: '1' }
                      },
                      price_unit: {},
                      display_type: {},
                      tax_id: { invisible: '1' },
                      company_id: { invisible: '1' },
                      _templates: {
                        _t: {
                          _div: {
                            _t: {
                              _div: {
                                _attr: { class: 'row g-0' },
                                _div: {
                                  _attr: { class: 'col-2 pe-3' },
                                  _img: {}
                                },
                                _div_787: {
                                  _attr: { class: 'col-10' },
                                  _div: {
                                    _attr: { class: 'row' },
                                    _div: {
                                      _attr: { class: 'col' },
                                      _strong: {}
                                    },
                                    _div_250: {
                                      _attr: { class: 'col-auto' },
                                      _t: {
                                        _attr: { groups: 'account.group_show_line_subtotals_tax_excluded' }
                                      },
                                      _t_609: {
                                        _attr: { groups: 'account.group_show_line_subtotals_tax_included' }
                                      },
                                      _strong: {
                                        _attr: { class: 'float-end text-end' }
                                      }
                                    }
                                  },
                                  _div_449: {
                                    _attr: { class: 'row' },
                                    _div: {
                                      _attr: {
                                        class: 'col-12 text-muted',
                                        text: 'Quantity:'
                                      },
                                      _t: {},
                                      _t_594: {}
                                    }
                                  },
                                  _div_607: {
                                    _attr: { class: 'row' },
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
                            _t_617: {
                              _div: {
                                _attr: { class: 'row' },
                                _div: {
                                  _attr: { class: 'col-12' },
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
                note: { placeholder: 'Terms and conditions...' }
              },
              _group_sale_total: {
                _attr: {
                  name: 'sale_total',
                  class: 'oe_subtotal_footer oe_right'
                },
                tax_totals: {
                  widget: 'account-tax-totals-field',
                  readonly: '1'
                }
              },
              _div: {
                _attr: { class: 'clearfix' }
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
                user_id: { widget: 'many2one_avatar_user' },
                team_id: { no_create: true },
                company_id: {
                  groups: 'base.group_multi_company',
                  no_create: true
                },
                _label_require_signature: {
                  for: 'require_signature',
                  string: 'Online confirmation'
                },
                _div: {
                  require_signature: { class: 'oe_inline' },
                  _span: 'Signature',
                  require_payment: { class: 'oe_inline ms-3' },
                  _span_201: 'Payment'
                },
                reference: {
                  invisible: [['reference', '=', false]],
                  readonly: '1'
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
                show_update_fpos: { invisible: '1' },
                _label_fiscal_position_id: { for: 'fiscal_position_id' },
                _div: {
                  _attr: { class: 'o_row' },
                  fiscal_position_id: { no_create: true },
                  _button_action_update_taxes: {
                    _attr: {
                      name: 'action_update_taxes',
                      type: 'object',
                      string: ' Update Taxes',
                      icon: 'fa-refresh',
                      help: 'Recompute all taxes based on this fiscal position',
                      invisible: ['|', ['show_update_fpos', '=', false], ['state', 'in', ['sale', 'done', 'cancel']]],
                      class: 'btn-link mb-1 px-0'
                    }
                  }
                },
                partner_invoice_id: { invisible: '1' },
                analytic_account_id: {
                  groups: 'analytic.group_analytic_accounting',
                  readonly: [['invoice_count', '!=', 0], ['state', '=', 'sale']],
                  context: { todo_ctx: "{'default_partner_id':partner_invoice_id, 'default_name':name}" },
                  force_save: '1'
                },
                invoice_status: {
                  groups: 'base.group_no_one',
                  states: 'sale,done'
                },
                _field_invoice_status_355: {
                  invoice_status: {
                    groups: '!base.group_no_one',
                    invisible: '1'
                  }
                }
              }
            },
            _group_682: {
              _group_sale_shipping: {
                _attr: { name: 'sale_shipping' },
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
              invisible: [['require_signature', '=', false], ['signed_by', '=', false], ['signature', '=', false], ['signed_on', '=', false]]
            },
            _group: {
              signed_by: {},
              signed_on: {},
              signature: { widget: 'image' }
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
            name: 'action_draft',
            position: 'after'
          },
          _t: {
            _attr: { groups: 'sale.group_auto_done_setting' },
            _button_action_done: {
              _attr: {
                name: 'action_done',
                type: 'object',
                string: 'Lock',
                help: 'If the sale is locked, you can not modify it anymore. However, you will still be able to invoice or deliver.',
                groups: 'sales_team.group_sale_manager',
                states: 'sale'
              }
            },
            _button_action_unlock: {
              _attr: {
                name: 'action_unlock',
                type: 'object',
                string: 'Unlock',
                groups: 'sales_team.group_sale_manager',
                states: 'done'
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
        string: 'Order',
        filter_domain: { todo_ctx: "['|', '|', ('name', 'ilike', self), ('client_order_ref', 'ilike', self), ('partner_id', 'child_of', self)]" }
      },
      partner_id: { operator: 'child_of' },
      user_id: {},
      team_id: { string: 'Sales Team' },
      order_line: {
        string: 'Product',
        filter_domain: { todo_ctx: "[('order_line.product_id', 'ilike', self)]" }
      },
      analytic_account_id: { groups: 'analytic.group_analytic_accounting' },
      _filter_my_sale_orders_filter: {
        _attr: {
          name: 'my_sale_orders_filter',
          string: 'My Orders',
          domain: { todo_ctx: "[('user_id', '=', uid)]" }
        }
      },
      _filter_activities_overdue: {
        _attr: {
          name: 'activities_overdue',
          string: 'Late Activities',
          help: 'Show all records which has next action date is before today',
          invisible: '1',
          domain: { todo_ctx: "[('my_activity_date_deadline', '<', context_today().strftime('%Y-%m-%d'))]" }
        }
      },
      _filter_activities_today: {
        _attr: {
          name: 'activities_today',
          string: 'Today Activities',
          invisible: '1',
          domain: { todo_ctx: "[('my_activity_date_deadline', '=', context_today().strftime('%Y-%m-%d'))]" }
        }
      },
      _filter_activities_upcoming_all: {
        _attr: {
          name: 'activities_upcoming_all',
          string: 'Future Activities',
          invisible: '1',
          domain: { todo_ctx: "[('my_activity_date_deadline', '>', context_today().strftime('%Y-%m-%d'))]" }
        }
      },
      _group: {
        _attr: { string: 'Group By' },
        _filter_salesperson: {
          _attr: {
            name: 'salesperson',
            string: 'Salesperson',
            domain: [],
            context: { group_by: 'user_id' }
          }
        },
        _filter_customer: {
          _attr: {
            name: 'customer',
            string: 'Customer',
            domain: [],
            context: { group_by: 'partner_id' }
          }
        },
        _filter_order_month: {
          _attr: {
            name: 'order_month',
            string: 'Order Date',
            domain: [],
            context: { group_by: 'date_order' }
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
            name: 'my_sale_orders_filter',
            position: 'replace'
          },
          campaign_id: {},
          _separator: {},
          _filter_my_quotation: {
            _attr: {
              name: 'my_quotation',
              string: 'My Quotations',
              domain: { todo_ctx: "[('user_id', '=', uid)]" }
            }
          },
          _separator_910: {},
          _filter_draft: {
            _attr: {
              name: 'draft',
              string: 'Quotations',
              domain: [['state', 'in', ('draft', 'sent')]]
            }
          },
          _filter_sales: {
            _attr: {
              name: 'sales',
              string: 'Sales Orders',
              domain: [['state', 'in', ('sale', 'done')]]
            }
          },
          _separator_858: {},
          _filter_filter_create_date: {
            _attr: {
              name: 'filter_create_date',
              string: 'Create Date',
              date: 'create_date'
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
            name: 'my_sale_orders_filter',
            position: 'after'
          },
          _separator: {},
          _filter_to_invoice: {
            _attr: {
              name: 'to_invoice',
              string: 'To Invoice',
              domain: [['invoice_status', '=', 'to invoice']]
            }
          },
          _filter_upselling: {
            _attr: {
              name: 'upselling',
              string: 'To Upsell',
              domain: [['invoice_status', '=', 'upselling']]
            }
          },
          _separator_369: {},
          _filter_order_date: {
            _attr: {
              name: 'order_date',
              string: 'Order Date',
              date: 'date_order'
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
    res_model: 'sale.order',
    search_view_id: 'sale_order_view_search_inherit_sale',
    domain: "[['state', 'not in', ['draft', 'sent', 'cancel']]]",
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
    res_model: 'sale.order',
    search_view_id: 'sale_order_view_search_inherit_quotation',
    context: { search_default_my_quotation: 1 },
    views: {
      tree: 'view_quotation_tree_with_onboarding',
      form: '=======todo=========='
    }
  },

  action_quotations: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Quotations',
    type: 'ir.actions.act_window',
    res_model: 'sale.order',
    search_view_id: 'sale_order_view_search_inherit_quotation',
    context: { search_default_my_quotation: 1 },
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
    res_model: 'sale.order',
    search_view_id: 'view_sales_order_filter',
    domain: "[['invoice_status','=','to invoice']]",
    context: { create: false },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  action_orders_upselling: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Orders to Upsell',
    type: 'ir.actions.act_window',
    res_model: 'sale.order',
    search_view_id: 'view_sales_order_filter',
    domain: "[['invoice_status','=','upselling']]",
    context: { create: false },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  model_sale_order_action_quotation_sent: {
    _odoo_model: 'ir.actions.server',
    model_id: 'sale.model_sale_order',
    model: 'sale_order'
  },

  model_sale_order_action_share: {
    _odoo_model: 'ir.actions.server',
    model_id: 'sale.model_sale_order',
    model: 'sale_order'
  }
}

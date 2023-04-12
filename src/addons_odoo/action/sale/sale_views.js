const order_line_form_sheet = {
  display_type: { invisible: '1' },
  sequence: { invisible: '1' },
  product_uom_category_id: { invisible: '1' },

  _group: {
    _group_product: {
      _attr: {
        invisible({ record }) {
          // 'invisible': [('display_type', '!=', False)]
          const { display_type } = record
          return display_type
        }
      },

      product_updatable: { invisible: '1' },
      product_id: { widget: 'many2one_barcode' },

      product_type: { invisible: '1' },
      invoice_status: { invisible: '1' },
      qty_to_invoice: { invisible: '1' },
      qty_delivered_method: { invisible: '1' },
      price_total: { invisible: '1' },
      price_tax: { invisible: '1' },
      price_subtotal: { invisible: '1' },
      product_uom_readonly: { invisible: '1' },
      product_uom_qty: {},
      product_uom: {},

      qty_delivered: {
        invisible({ record }) {
          // 'invisible': [('parent.state', 'not in', ['sale', 'done'])]
          const { parent: prt } = record
          return !['sale', 'done'].includes(prt.state)
        }
      },

      qty_invoiced: {
        invisible({ record }) {
          // 'invisible': [('parent.state', 'not in', ['sale', 'done'])]
          const { parent: prt } = record
          return !['sale', 'done'].includes(prt.state)
        }
      },
      product_packaging_id: {},
      price_unit: {},
      tax_id: { widget: 'many2many_tags' },
      discount: {},
      sequence: { invisible: '1' }
    },
    _group_lead: {
      _attr: {
        invisible: ({ record }) => {
          // 'invisible': [('display_type', '!=', False)]
          const { display_type } = record
          return display_type
        }
      },

      customer_lead: {
        // widget  天
      },
      analytic_distribution: { widget: 'analytic_distribution' }
    }
  },

  _field_name: {
    _label_Description: {
      for: 'name',
      string: 'Description',
      invisible({ record }) {
        // 'invisible': [('display_type', '!=', False)]
        const { display_type } = record
        return !display_type
      }
    },

    _label_Section: {
      for: 'name',
      string: 'Section Name (eg. Products, Services)',
      invisible({ record }) {
        // 'invisible': [('display_type', '!=', 'line_section')]}"/>
        const { display_type } = record
        return display_type !== 'line_section'
      }
    },

    _label_Note: {
      for: 'name',
      string: 'Note',
      invisible({ record }) {
        // string="Note"
        //  'invisible': [('display_type', '!=', 'line_note')]
        const { display_type } = record
        return display_type !== 'line_note'
      }
    },

    name: { widget: 'text' }
  },

  state: { invisible: '1' },
  company_id: { invisible: '1' },

  _div_invoice_lines: {
    _attr: {
      groups: 'base.group_no_one',
      invisible: ({ record }) => {
        // 'invisible': [('display_type', '!=', False)]
        const { display_type } = record
        return display_type
      }
    },

    invoice_lines: {}
  }
}

const view_order_form_sheet = {
  state: { invisible: '1' },

  _div_warning: {
    _attr: {
      groups: 'account.group_account_invoice,account.group_account_readonly',
      invisible: ({ record }) => {
        // 'invisible': [('partner_credit_warning', '=', '')]
        const { partner_credit_warning } = record
        return !partner_credit_warning
      }
    },
    partner_credit_warning: {}
  },

  _div_button_box: {
    // // button_box 需要 定义 button, 而非 field
    // // 因此 form 需要支持:
    // // _group  这种格式的是 tag
    // // _group 的 下一级:
    // //   field 是 字段
    // //   _span 是属性   // 需要区分 属性和还是 子节点
    // //   _button 是字段
    // //   _html 是纯文本
    // // field 的下一级:
    // //   常规 field 的定义
    // _span: 2,
    // invoice_count: {
    //   widget: 'statinfo',
    //   string: 'Invoices',
    //   button_click: { name: 'action_view_invoice', type: 'object' },
    //   invisible: ({ record }) => {
    //     // 'invisible': [('invoice_count', '=', 0)]
    //     const { invoice_count } = record
    //     return !invoice_count
    //   }
    // }
    // // action_preview_sale_order 预览
  },

  _div_title: { _h1: { name: { readonly: '1' } } },

  _group_sale_header: {
    _group_partner_details: {
      partner_id: { widget: 'res_partner_many2one' },
      partner_invoice_id: {},
      partner_shipping_id: {}
    },

    _group_order_details: {
      validity_date: {
        invisible: ({ record }) => {
          // 'invisible': [('state', 'in', ['sale', 'done'])]
          const { state } = record
          return ['sale', 'done'].includes(state)
        }
      },

      _field_date_order_Quotation: {
        _attr: {
          groups: 'base.group_no_one',
          invisible: ({ record }) => {
            // 'invisible':
            // [('state', 'in', ['sale', 'done', 'cancel'])]
            const { state } = record
            return ['sale', 'done', 'cancel'].includes(state)
          }
        },
        date_order: {}
      },

      _field_date_order: {
        _attr: {
          invisible: ({ record }) => {
            // 'invisible': [('state', 'in', ['draft', 'sent'])]
            const { state } = record
            return ['draft', 'sent'].includes(state)
          }
        },
        date_order: {}
      },

      show_update_pricelist: { invisible: 1 },
      _field_pricelist_id: {
        _attr: { groups: 'product.group_product_pricelist' },
        _label: { for: 'pricelist_id' },

        _div_row: {
          pricelist_id: {},
          _button: {
            _attr: {
              name: 'action_update_prices',
              type: 'object',
              string: ' Update Prices',
              help: 'Recompute all prices based on this pricelist',
              confirm:
                'This will update all unit prices based on the currently set pricelist.',

              invisible: ({ record }) => {
                //'invisible':
                // ['|', ('show_update_pricelist', '=', False),
                // ('state', 'in', ['sale', 'done', 'cancel'])]}"/>
                const { show_update_pricelist, state } = record
                return (
                  !show_update_pricelist ||
                  ['sale', 'done', 'cancel'].includes(state)
                )
              }
            }
          }
        }
      },
      pricelist_id: {},

      company_id: { invisible: 1 },
      currency_id: { invisible: 1 },
      // pricelist_id: { invisible: 1 },
      tax_country_id: { invisible: 1 },
      payment_term_id: {}
    }
  },

  _notebook: {
    _page_order_lines: {
      _attr: { string: 'Order Lines', name: 'order_lines' },
      order_line: {
        widget: 'x2many_tree',
        views: {
          tree: {
            arch: {
              sheet: {
                sequence: { widget: 'handle' },
                display_type: { invisible: 1 },
                product_uom_category_id: { invisible: 1 },
                product_type: { invisible: 1 },
                currency_id: { invisible: 1 },
                product_updatable: { invisible: 1 },
                product_id: { widget: 'sol_product_many2one' },
                product_template_id: { invisible: '1' },
                name: { widget: 'section_and_note_text', optional: 'show' },
                analytic_distribution: {
                  widget: 'analytic_distribution',
                  optional: 'hide'
                },
                product_uom_qty: {
                  // widget: ''
                  // 查看库存?
                },
                qty_delivered: {
                  optional: 'show',
                  invisible: ({ record }) => {
                    // 'column_invisible': [('parent.state', 'not in', ['sale', 'done'])],
                    const { parent: prt } = record
                    return !['sale', 'done'].includes(prt.state)
                  }
                },
                qty_delivered_method: { invisible: 1 },
                qty_invoiced: {
                  optional: 'show',
                  invisible: ({ record }) => {
                    // 'column_invisible': [('parent.state', 'not in', ['sale', 'done'])],
                    const { parent: prt } = record
                    return !['sale', 'done'].includes(prt.state)
                  }
                },
                qty_to_invoice: { invisible: '1' },
                product_uom_readonly: { invisible: '1' },
                // product_uom: { invisible: '1' },
                product_uom: {
                  optional: 'show'
                },
                customer_lead: { optional: 'hide' },
                product_packaging_qty: {
                  optional: 'show',
                  invisible: ({ record }) => {
                    // 'invisible': ['|', ('product_id', '=', False),
                    // ('product_packaging_id', '=', False)]
                    const { product_id, product_packaging_id } = record
                    return !product_id || !product_packaging_id
                  }
                },
                product_packaging_id: {
                  optional: 'show',
                  // context="{'default_product_id': product_id, 'tree_view_ref':'product.product_packaging_tree_view', 'form_view_ref':'product.product_packaging_form_view'}
                  invisible: ({ record }) => {
                    // 'invisible': [('product_id', '=', False)]}"
                    const { product_id } = record
                    return !product_id
                  }
                },
                price_unit: {},
                tax_id: { widget: 'many2many_tags' },
                discount: {
                  widget: 'sol_discount',
                  optional: 'show'
                },
                is_downpayment: { invisible: '1' },
                price_subtotal: {
                  widget: 'monetary',
                  invisible: ({ record }) => {
                    // 'invisible': [('is_downpayment', '=', True)]
                    const { is_downpayment } = record
                    return is_downpayment
                  }
                },
                price_total: {
                  widget: 'monetary',
                  invisible: ({ record }) => {
                    // 'invisible': [('is_downpayment', '=', True)]
                    const { is_downpayment } = record
                    return is_downpayment
                  }
                },
                state: { invisible: '1' },
                invoice_status: { invisible: '1' },
                // currency_id: { invisible: '1' },
                price_tax: { invisible: '1' },
                company_id: { invisible: '1' }
              }
            }
          },

          form: {
            arch: { sheet: { ...order_line_form_sheet } }
          }
        }
      },
      _group_note_group: {
        _group: {
          note: {
            nolabel: '1',
            placeholder: 'Terms and conditions...'
          }
        },
        _group_sale_total: {
          tax_totals: {
            readonly: '1',
            nolabel: '1',
            widget: 'account-tax-totals-field'
          }
        },

        _div: {}
      }
    },
    _page_other_information: {
      _attr: { string: 'Other Info', name: 'other_information' },
      _group: {
        _group_sales_person: {
          user_id: { widget: 'many2one_avatar_user' },
          team_id: {},
          company_id: {},
          require_signature: {},
          require_payment: {},
          reference: {
            readonly: '1',
            invisible: ({ record }) => {
              // 'invisible': [('reference', '=', False)]
              const { reference } = record
              return !reference
            }
          },
          client_order_ref: {},
          tag_ids: { widget: 'many2many_tags' }
        },
        _group_sale_info: {
          show_update_fpos: { invisible: '1' },
          _field_fiscal_position_id: {
            _label: { for: 'fiscal_position_id' },
            _div_row: {
              fiscal_position_id: {},
              _button: {
                _attr: {
                  name: 'action_update_taxes',
                  type: 'object',
                  string: ' Update Taxes',
                  help: 'Recompute all taxes based on this fiscal position',
                  icon: 'fa-refresh',
                  confirm:
                    'This will update all taxes based on the currently selected fiscal position.',

                  invisible: ({ record }) => {
                    // 'invisible':
                    // ['|', ('show_update_fpos', '=', False),
                    // ('state', 'in', ['sale', 'done','cancel'])]
                    const { show_update_fpos, state } = record
                    return (
                      !show_update_fpos ||
                      ['sale', 'done', 'cancel'].includes(state)
                    )
                  }
                }
              }
            }
          },

          partner_invoice_id: { invisible: '1' },
          analytic_account_id: {},
          invoice_status: {
            invisible: ({ record }) => {
              // states="sale,done"
              const { state } = record
              return !['sale', 'done'].includes(state)
            }
          }
        }
      },
      _group_2: {
        _group_sale_shipping: {
          commitment_date: {},
          expected_date: { widget: 'date' }
        },

        _group_technical: {
          origin: {}
        },

        _group_utm_link: {
          campaign_id: {},
          medium_id: {},
          source_id: {}
        }
      }
    },

    _page_customer_signature: {
      _attr: {
        groups: 'base.group_no_one',
        string: 'Customer Signature',
        name: 'customer_signature',
        invisible: ({ record }) => {
          // 'invisible': [('require_signature', '=', False),
          // ('signed_by', '=', False), ('signature', '=', False),
          // ('signed_on', '=', False)]
          const { require_signature, signed_by, signature, signed_on } = record
          return !require_signature && !signed_by && !signature && !signed_on
        }
      },
      _group_customer_signature: {
        signed_by: {},
        signed_on: {},
        signature: { widget: 'image' }
      }
    }
  }
}

export default {
  view_order_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    type: 'tree',
    arch: {
      sheet: {
        message_needaction: { invisible: '1' },
        name: {},
        create_date: { widget: 'date' },
        date_order: { widget: 'date' },
        commitment_date: { optional: 'hide' },
        expected_date: { optional: 'hide' },
        partner_id: {},
        user_id: { optional: 'show', widget: 'many2one_avatar_user' },
        team_id: { optional: 'hide' },
        company_id: { optional: 'show' },
        amount_untaxed: { widget: 'monetary', optional: 'hide' },
        amount_tax: { widget: 'monetary', optional: 'hide' },
        amount_total: { widget: 'monetary', optional: 'show' },
        currency_id: { invisible: '1' },
        invoice_status: {
          widget: 'badge'
          // decoration-success="invoice_status == 'invoiced'"
          // decoration-info="invoice_status == 'to invoice'"
          // decoration-warning="invoice_status == 'upselling'"
        },
        tag_ids: { widget: 'many2many_tags', optional: 'hide' },
        state: { invisible: '1' }
      }
    }
  },

  view_order_form: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    type: 'form',
    toolbar: {
      action: {
        // 在数据库中 找到 所有绑定到该模型的 action
        // select * from ir_actions where binding_model_id = ?
        // model_account_move
        //
        //
        // action_invoice_order_generate_link
      },
      print: {
        // odoo 原生是 report kanban
        // 需要 前端自定义
      }
    },

    arch: {
      header: {
        buttons: {
          action_view_sale_advance_payment_inv: {
            name: 'action_view_sale_advance_payment_inv',
            string: 'Create Invoice',
            type: 'action',
            btn_type: 'primary',
            invisible: ({ record }) => {
              // 'invisible':
              // [('invoice_status', '!=', 'to invoice')]
              const { invoice_status } = record
              return invoice_status !== 'to invoice'
            }
          },
          action_view_sale_advance_payment_inv2: {
            name: 'action_view_sale_advance_payment_inv',
            string: 'Create Invoice',
            type: 'action',
            context: { default_advance_payment_method: 'percentage' },
            invisible: ({ record }) => {
              // 'invisible': ['|',('invoice_status', '!=', 'no'),
              //  ('state', '!=', 'sale')]
              const { invoice_status, state } = record
              return invoice_status !== 'no' || state !== 'sale'
            }
          },
          action_quotation_send: {
            name: 'action_quotation_send',
            string: 'Send by Email',
            type: 'object',
            btn_type: 'primary',
            invisible: ({ record }) => {
              // states: 'draft',
              const { state } = record
              return state !== 'draft'
            }
          },
          action_quotation_send2: {
            name: 'action_quotation_send',
            string: 'Send PRO-FORMA Invoice',
            type: 'object',
            groups: 'sale.group_proforma_sales',
            btn_type: 'primary',
            invisible: ({ record }) => {
              // 'invisible': ['|', ('state', '!=', 'draft'),
              // ('invoice_count','&gt;=',1)]
              const { state, invoice_count } = record
              return state !== 'draft' || invoice_count >= 1
            },
            // context="{'proforma': True, 'validate_analytic': True}
            context: { proforma: true, validate_analytic: true }
          },
          action_confirm: {
            name: 'action_confirm',
            string: 'Confirm',
            type: 'object',
            btn_type: 'primary',
            context: { validate_analytic: true },
            invisible: ({ record }) => {
              // 'invisible': [('state', 'not in', ['sent'])]
              const { state } = record
              return state !== 'sent'
            }
          },
          action_confirm2: {
            name: 'action_confirm',
            string: 'Confirm',
            type: 'object',
            context: { validate_analytic: true },
            invisible: ({ record }) => {
              // 'invisible': [('state', 'not in', ['draft'])]
              const { state } = record
              return state !== 'draft'
            }
          },
          action_quotation_send22: {
            name: 'action_quotation_send',
            string: 'Send PRO-FORMA Invoice',
            type: 'object',
            groups: 'sale.group_proforma_sales',
            invisible: ({ record }) => {
              // 'invisible': ['|', ('state', '=', 'draft'),
              // ('invoice_count','&gt;=',1)]}"
              const { state, invoice_count } = record
              return state === 'draft' || invoice_count >= 1
            },
            // context="{'proforma': True, 'validate_analytic': True}"/>
            context: { proforma: true, validate_analytic: true }
          },
          action_quotation_send23: {
            name: 'action_quotation_send',
            string: 'Send by Email',
            type: 'object',
            // context="{'validate_analytic': True}"
            context: { validate_analytic: true },
            invisible: ({ record }) => {
              // states="sent,sale"
              const { state } = record
              return !['sent', 'sale'].includes(state)
            }
          },
          action_cancel: {
            name: 'action_cancel',
            string: 'Cancel',
            type: 'object',
            invisible: ({ record }) => {
              // 'invisible': ['|',
              // ('state', 'not in', ['draft', 'sent','sale']),
              // ('id', '=', False)]
              const { id: res_id, state } = record
              return !['draft', 'sent', 'sale'].includes(state) || !res_id
            }
          },
          action_draft: {
            name: 'action_draft',
            string: 'Set to Quotation',
            type: 'object',
            invisible: ({ record }) => {
              // states: 'cancel',
              const { state } = record
              return state !== 'cancel'
            }
          }
        },

        fields: {
          state: { widget: 'statusbar', statusbar_visible: 'draft,sent,sale' }
        }
      },

      sheet: { ...view_order_form_sheet }
    }
  },

  view_sales_order_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'sale.order',
    type: 'search',
    arch: {
      fields: {
        name: {
          string: 'Order',
          filter_domain: self => {
            // filter_domain="['|', '|',
            // ('name', 'ilike', self),
            // ('client_order_ref', 'ilike', self),
            // ('partner_id', 'child_of', self)]"
            return [
              '|',
              '|',
              ['name', 'ilike', self],
              ['client_order_ref', 'ilike', self],
              ['partner_id', 'child_of', self]
            ]
          }
        },
        partner_id: { operator: 'child_of' },
        user_id: {},
        team_id: {},
        order_line: {
          string: '产品',
          filter_domain: self => {
            // filter_domain="[('order_line.product_id', 'ilike', self)]
            return [['order_line.product_id', 'ilike', self]]
          }
        },
        analytic_account_id: {},
        campaign_id: {}
      },

      filters: {
        group_me: {
          my_sale_orders_filter: {
            string: 'My Orders',
            domain: ({ env }) => {
              const uid = env.uid
              return [['user_id', '=', uid]]
            }
          }
        },
        group_state: {
          draft: {
            string: 'Quotations',
            // domain="[('state','in',('draft', 'sent'))]
            domain: [['state', 'in', ['draft', 'sent']]]
          },
          sales: {
            string: 'Sales Orders',
            // domain="[('state','in',('sale','done'))]
            domain: [['state', 'in', ['sale', 'done']]]
          }
        },

        group_invoice: {
          to_invoice: {
            string: 'To Invoice',
            // domain="[('invoice_status','=','to invoice')]
            domain: [['invoice_status', '=', 'to invoice']]
          },
          upselling: {
            string: 'To Upsell',
            // domain="[('invoice_status','=','upselling')]
            domain: [['invoice_status', '=', 'upselling']]
          }
        },
        group_date: {
          filter_create_date: { string: 'Create Date', date: 'create_date' },
          order_date: { string: 'Order Date', date: 'date_order' }
        }
      }
    }
  },

  action_orders: {
    _odoo_model: 'ir.actions',
    name: 'Sales Orders',
    type: 'ir.actions.act_window',
    res_model: 'sale.order',
    search_view_id: 'view_sales_order_filter',
    // search_view_id: 'sale_order_view_search_inherit_sale',
    domain: [['state', 'not in', ['draft', 'sent', 'cancel']]],
    context: {},
    views: {
      tree: 'view_order_tree',
      form: 'view_order_form'
    }
  },

  action_quotations_with_onboarding: {
    _odoo_model: 'ir.actions',
    name: 'Quotations',
    type: 'ir.actions.act_window',
    res_model: 'sale.order',
    search_view_id: 'view_sales_order_filter',
    domain: [],
    context: { search_default_my_sale_orders_filter: 1 },
    views: {
      tree: 'view_order_tree',
      form: 'view_order_form'
    }
  }
}

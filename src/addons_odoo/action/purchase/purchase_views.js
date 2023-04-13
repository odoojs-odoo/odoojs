const date_tools = {
  get one_day() {
    return 1000 * 60 * 60 * 24
  },
  format(date) {
    const year = date.getFullYear().toString().padStart(4, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const today_str = `${year}-${month}-${day}`
    return today_str
  },
  increase(date, num = 1) {
    return this.format(new Date(new Date(date).getTime() + this.one_day * num))
  },

  get today() {
    const today = new Date()
    return this.format(today)
  }
}

const order_line = {
  widget: 'x2many_tree',

  views: {
    tree: {
      arch: {
        sheet: {
          display_type: { invisible: 1 },
          currency_id: { invisible: 1 },
          state: { invisible: 1 },
          product_type: { invisible: 1 },
          // product_uom: { invisible: 1 },
          product_uom_category_id: { invisible: 1 },
          invoice_lines: { invisible: 1 },
          sequence: { widget: 'handle' },
          product_id: {},

          name: { widget: 'section_and_note_text' },
          date_planned: { optional: 'hide', force_save: '1' },
          analytic_distribution: {
            widget: 'analytic_distribution',
            optional: 'hide'
          },

          product_qty: {},
          qty_received_manual: { invisible: 1 },
          qty_received_method: { invisible: 1 },
          qty_received: {
            string: 'Received',
            optional: 'show',
            invisible: ({ record }) => {
              //  "{'column_invisible':
              // [('parent.state', 'not in', ('purchase', 'done'))],
              const { parent: prt } = record
              return !['purchase', 'done'].includes(prt.state)
            }
          },
          qty_invoiced: {
            string: 'Billed',
            optional: 'show',
            invisible: ({ record }) => {
              //'column_invisible': [('parent.state', 'not in',
              // ('purchase', 'done'))]

              const { parent: prt } = record
              return !['purchase', 'done'].includes(prt.state)
            }
          },
          product_uom: { force_save: '1', optional: 'show' },

          product_packaging_qty: {
            optional: 'show',
            invisible: ({ record }) => {
              // invisible':
              // ['|', ('product_id', '=', False),
              // ('product_packaging_id', '=', False)]}"
              const { product_id, product_packaging_id } = record
              return !product_id || !product_packaging_id
            }
          },
          product_packaging_id: {
            optional: 'show',
            invisible: ({ record }) => {
              //'invisible': [('product_id', '=', False)]}"
              const { product_id } = record
              return !product_id
            }
          },
          price_unit: {},
          // <button name="action_purchase_history" type="object" icon="fa-history" title="Purchase History" attrs="{'invisible': [('id', '=', False)]}"/>

          taxes_id: { widget: 'many2many_tags', optional: 'show' },
          price_subtotal: { widget: 'monetary' },
          price_total: { invisible: 1 },
          price_tax: { invisible: 1 }
        }
      }
    },

    form: {
      arch: {
        sheet: {
          state: { invisible: 1 },
          display_type: { invisible: 1 },
          sequence: {},
          _group: {
            _attr: {
              invisible: ({ record }) => {
                //'invisible':[('display_type', '!=', False)]
                const { display_type } = record
                return display_type
              }
            },
            _group: {
              product_uom_category_id: { invisible: 1 },

              product_id: {},

              _field_product_qty: {
                _label: { for: 'product_qty' },
                _div: {
                  product_qty: {},
                  product_uom: {}
                }
              },
              qty_received_method: { invisible: 1 },
              qty_received: {
                invisible: ({ record }) => {
                  //'invisible': [('parent.state', 'not in', ('purchase', 'done'))],
                  const { parent: prt } = record
                  return ['purchase', 'done'].includes(prt.state)
                }
              },
              qty_invoiced: {
                invisible: ({ record }) => {
                  //'invisible': [('parent.state', 'not in', ('purchase', 'done'))],
                  const { parent: prt } = record
                  return ['purchase', 'done'].includes(prt.state)
                }
              },
              product_packaging_id: {
                invisible: ({ record }) => {
                  // invisible': [('product_id', '=', False)]     const { parent: prt } = record
                  const { product_id } = record
                  return !product_id
                }
              },

              price_unit: {},
              taxes_id: { widget: 'many2many_tags' }
            },
            _group_2: {
              date_planned: { widget: 'date' },
              analytic_distribution: { widget: 'analytic_distribution' }
            }
          },

          _notebook: {
            _attr: {
              invisible: ({ record }) => {
                //'invisible':[('display_type', '!=', False)]
                const { display_type } = record
                return display_type
              }
            },
            _page_notes: {
              _attr: { string: 'Notes', name: 'notes' },
              name: {}
            },
            _page_invoices_incoming_shiptments: {
              _attr: {
                string: 'Invoices and Incoming Shipments',
                name: 'invoices_incoming_shiptments'
              },
              invoice_lines: {}
            }
          },

          _label_line_section: {
            for: 'name',
            string: 'Section Name (eg. Products, Services)',
            invisible({ record }) {
              // 'invisible': [('display_type', '!=', 'line_section')]
              const { display_type } = record
              return display_type !== 'line_section'
            }
          },

          _label_line_note: {
            for: 'name',
            string: 'Note',
            invisible({ record }) {
              // 'invisible': [('display_type', '!=', 'line_note')]
              const { display_type } = record
              return display_type !== 'line_note'
            }
          },

          name: {
            invisible({ record }) {
              // 'invisible': [('display_type', '=', False)]
              const { display_type } = record
              return !display_type
            }
          }
        }
      }
    }
  }
}

export default {
  product_normal_action_puchased: {
    _odoo_model: 'ir.actions',
    name: '产品',
    type: 'ir.actions.act_window',
    res_model: 'product.template',
    search_view_id: 'product.product_template_search_view',
    domain: [],
    context: {
      search_default_filter_to_purchase: 1,
      purchase_product_template: 1
    }
  },

  purchase_order_form: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
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
          action_rfq_send: {
            name: 'action_rfq_send',
            string: 'Send by Email',
            type: 'object',
            context: { send_rfq: true },
            // states: 'draft',
            btn_type: 'primary',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'draft'
            }
          },
          print_quotation: {
            groups: 'base.group_user',
            name: 'print_quotation',
            string: 'Print RFQ',
            type: 'object',
            context: { send_rfq: true },
            // states: 'draft',
            btn_type: 'primary',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'draft'
            }
          },
          button_confirm: {
            name: 'button_confirm',
            string: 'Confirm Order',
            type: 'object',
            // states: 'sent',
            btn_type: 'primary',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'sent'
            }
          },
          button_approve: {
            groups: 'purchase.group_purchase_manager',
            name: 'button_approve',
            string: 'Approve Order',
            type: 'object',
            // states: 'to approve',
            btn_type: 'primary',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'to approve'
            }
          },
          action_create_invoice: {
            name: 'action_create_invoice',
            string: 'Create Bill',
            type: 'object',
            btn_type: 'primary',
            context: { create_bill: true },
            invisible: ({ record }) => {
              const { state, invoice_status } = record
              return (
                !['purchase', 'done'].includes(state) ||
                ['no', 'invoiced'].includes(invoice_status)
              )
            }
          },
          action_rfq_send2: {
            name: 'action_rfq_send',
            string: 'Re-Send by Email',
            type: 'object',
            context: { send_rfq: true },
            // states: 'sent',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'sent'
            }
          },
          print_quotation2: {
            groups: 'base.group_user',
            name: 'print_quotation',
            string: 'Print RFQ',
            type: 'object',
            context: { send_rfq: true },
            // states: 'sent',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'sent'
            }
          },
          button_confirm2: {
            name: 'button_confirm',
            string: 'Confirm Order',
            type: 'object',
            // states: 'draft',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'draft'
            }
          },
          action_rfq_send22: {
            name: 'action_rfq_send',
            string: 'Send PO by Email',
            type: 'object',
            context: { send_rfq: false },
            // states: 'purchase',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'purchase'
            }
          },
          confirm_reminder_mail: {
            groups: 'base.group_no_one',
            name: 'confirm_reminder_mail',
            string: 'Confirm Receipt Date',
            type: 'object',
            invisible: ({ record }) => {
              const { state, mail_reminder_confirmed, date_planned } = record
              return (
                !['purchase', 'done'].includes(state) ||
                mail_reminder_confirmed ||
                !date_planned
              )
            }
          },
          action_create_invoice2: {
            name: 'action_create_invoice',
            string: 'Create Bill',
            type: 'object',
            context: { create_bill: true },
            invisible: ({ record }) => {
              const { state, invoice_status, order_line = [] } = record
              return (
                !['purchase', 'done'].includes(state) ||
                !['no', 'invoiced'].includes(invoice_status) ||
                !order_line.length
              )
            }
          },
          button_draft: {
            name: 'button_draft',
            string: 'Set to Draft',
            type: 'object',
            // states: 'cancel',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'cancel'
            }
          },
          button_cancel: {
            name: 'button_cancel',
            string: 'Cancel',
            type: 'object',
            // states: 'draft,to approve,sent,purchase',
            invisible: ({ record }) => {
              const { state } = record
              return !['draft', 'to approve', 'sent', 'purchase'].includes(
                state
              )
            }
          },
          button_done: {
            name: 'button_done',
            string: 'Lock',
            type: 'object',
            // states: 'purchase',
            invisible: ({ record }) => {
              const { state } = record
              return !['purchase'].includes(state)
            }
          },
          button_unlock: {
            groups: 'purchase.group_purchase_manager',
            name: 'button_unlock',
            string: 'Unlock',
            type: 'object',
            // states: 'done',
            invisible: ({ record }) => {
              const { state } = record
              return !['done'].includes(state)
            }
          }
        },

        fields: {
          state: {
            widget: 'statusbar',
            statusbar_visible: 'draft,sent,purchase'
          }
        }
      },

      sheet: {
        //

        state: { invisible: 1 },
        _div_button_box: {
          _button_action_view_invoice: {
            _attr: {
              string: 'Vendor Bills',
              type: 'object',
              name: 'action_view_invoice',
              icon: 'fa-pencil-square-o',
              invisible({ record }) {
                //  'invisible':['|',
                // ('invoice_count', '=', 0),
                // ('state', 'in', ('draft','sent','to approve'))]
                const { invoice_count, state } = record
                return (
                  !invoice_count ||
                  ['draft', 'sent', 'to approve'].includes(state)
                )
              }
            },
            invoice_count: { widget: 'statinfo' },
            invoice_ids: { invisible: '1' }
          }
        },

        _div_title: {
          _h1: {
            _span: {
              _attr: {
                text: 'Request for Quotation',
                invisible({ record }) {
                  //  'invisible': [('state','not in',('draft','sent'))]
                  const { state } = record
                  return !['draft', 'sent'].includes(state)
                }
              }
            },

            _span_2: {
              _attr: {
                text: 'Purchase Order',
                invisible({ record }) {
                  // 'invisible': [('state','in',('draft','sent'))]
                  const { state } = record
                  return ['draft', 'sent'].includes(state)
                }
              }
            },

            priority: { widget: 'priority' },
            name: { readonly: '1' }
          }
        },

        _group: {
          _group: {
            partner_id: { widget: 'res_partner_many2one' },
            partner_ref: {},
            currency_id: {
              groups: 'base.group_multi_currency',
              force_save: '1'
            },
            company_id: { invisible: '1' }
            // currency_id: {
            //   invisible: '1',
            //   groups: '!base.group_multi_currency'
            // }
          },

          _group_2: {
            date_order: {
              invisible({ record }) {
                // 'invisible': [('state','in',('purchase','done'))]
                const { state } = record
                return ['purchase', 'done'].includes(state)
              }
            },

            _field_date_approve: {
              _attr: {
                invisible({ record }) {
                  // 'invisible': [('state','not in',('purchase','done'))]
                  const { state } = record
                  return !['purchase', 'done'].includes(state)
                }
              },
              _label: { for: 'date_approve' },

              _div: {
                date_approve: {},
                mail_reception_confirmed: { invisible: '1' },
                _span: {
                  _attr: {
                    invisible({ record }) {
                      // 'invisible': [('mail_reception_confirmed','=', False)]
                      const { mail_reception_confirmed } = record
                      return !mail_reception_confirmed
                    },
                    text: '(confirmed by vendor)'
                  }
                }
              }
            },

            _field_date_planned: {
              _label: { for: 'date_planned' },

              _div: {
                date_planned: {
                  readonly({ record }) {
                    // 'readonly': [('state', 'not in',
                    // ('draft', 'sent', 'to approve', 'purchase'))]
                    const { state } = record
                    return ![
                      'draft',
                      'sent',
                      'to approve',
                      'purchase'
                    ].includes(state)
                  }
                },
                mail_reminder_confirmed: { invisible: '1' },
                _span: {
                  _attr: {
                    invisible({ record }) {
                      // 'invisible':
                      // [('mail_reminder_confirmed', '=', False)]
                      const { mail_reminder_confirmed } = record
                      return !mail_reminder_confirmed
                    },
                    text: '(confirmed by vendor)'
                  }
                }
              }
            },

            _field_receipt_reminder_email: {
              _attr: { groups: 'purchase.group_send_reminder' },
              receipt_reminder_email: {},
              _span: 'Ask confirmation',
              _div: {
                _attr: {
                  invisible({ record }) {
                    // 'invisible': [('receipt_reminder_email', '=', False)]
                    const { receipt_reminder_email } = record
                    return !receipt_reminder_email
                  }
                },
                reminder_date_before_receipt: {},
                _span: ' day(s) before',
                _widget: {
                  _attr: {
                    name: 'toaster_button',
                    button_name: 'send_reminder_preview',
                    title:
                      'Preview the reminder email by sending it to yourself.',
                    invisible({ record }) {
                      //'invisible': [('id', '=', False)]
                      const { id: res_id } = record
                      return !res_id
                    }
                  }
                }
              }
            }
          }
        },

        _notebook: {
          _page_products: {
            _attr: { string: 'Products', name: 'products' },
            tax_country_id: { invisible: '1' },
            order_line: order_line,

            _group: {
              _group: {
                notes: {}
              },

              _group_2: {
                tax_totals: {
                  widget: 'account-tax-totals-field',
                  nolabel: '1',
                  readonly: '1'
                }
              }
            }
          },

          _page_purchase_delivery_invoice: {
            _attr: {
              string: 'Other Information',
              name: 'purchase_delivery_invoice'
            },

            _group: {
              _group_other_info: {
                user_id: { widget: 'many2one_avatar_user' },
                company_id: {},
                origin: {}
              },

              _group_invoice_info: {
                invoice_status: {
                  invisible({ record }) {
                    // 'invisible': [('state', 'in',
                    // ('draft', 'sent', 'to approve', 'cancel'))]
                    const { state } = record
                    return ['draft', 'sent', 'to approve', 'cancel'].includes(
                      state
                    )
                  }
                },
                payment_term_id: {},
                fiscal_position_id: {}
              }
            }
          }
        }
      }
    }
  },

  purchase_order_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    type: 'tree',
    arch: {
      sheet: {
        priority: { optional: 'show', widget: 'priority' },
        partner_ref: { optional: 'hide' },
        name: { string: 'Reference' },
        date_approve: {
          widget: 'date',
          optional: 'show',
          invisible({ context }) {
            // invisible="context.get('quotation_only', False)"
            return context.quotation_only
          }
        },
        partner_id: {},
        company_id: { optional: 'show' },

        user_id: { widget: 'many2one_avatar_user', optional: 'show' },
        date_order: {
          optional: 'show',
          invisible({ context }) {
            // invisible="not context.get('quotation_only', False)"
            return !context.quotation_only
          }
        },
        origin: { optional: 'show' },
        amount_untaxed: {
          sum: 'Total Untaxed amount',
          string: 'Untaxed',
          widget: 'monetary',
          optional: 'hide'
        },
        amount_total: {
          sum: 'Total amount',
          widget: 'monetary',
          optional: 'show'
        },
        currency_id: { invisible: '1' },
        state: { invisible: '1' },
        invoice_status: {
          widget: 'badge',
          optional: 'show'
          // decoration-success="invoice_status == 'invoiced'"
          // decoration-info="invoice_status == 'to invoice'" optional="show"
        },
        date_planned: {
          optional: 'show',
          invisible({ context }) {
            // invisible="context.get('quotation_only', False)"
            return context.quotation_only
          }
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
        priority: { optional: 'show', widget: 'priority' },
        partner_ref: { optional: 'hide' },
        name: { string: 'Reference' },
        date_approve: {
          widget: 'date',
          optional: 'show',
          invisible({ context }) {
            // invisible="context.get('quotation_only', False)"
            return context.quotation_only
          }
        },
        partner_id: {},
        company_id: { optional: 'show' },
        date_planned: {
          optional: 'show',
          invisible({ context }) {
            // invisible="context.get('quotation_only', False)"
            return context.quotation_only
          }
        },
        user_id: { widget: 'many2one_avatar_user', optional: 'show' },
        date_order: {
          optional: 'show',
          invisible({ context }) {
            // invisible="not context.get('quotation_only', False)"
            return !context.quotation_only
          }
        },
        origin: { optional: 'show' },
        amount_untaxed: {
          sum: 'Total Untaxed amount',
          string: 'Untaxed',
          widget: 'monetary',
          optional: 'hide'
        },
        amount_total: {
          sum: 'Total amount',
          widget: 'monetary',
          optional: 'show'
        },
        currency_id: { invisible: '1' },
        state: { invisible: '1' },
        invoice_status: {
          widget: 'badge',
          optional: 'show'
          // decoration-success="invoice_status == 'invoiced'"
          // decoration-info="invoice_status == 'to invoice'" optional="show"
        }
      }
    }
  },

  view_purchase_order_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    type: 'search',
    arch: {
      fields: {
        name: {
          string: 'Order',
          filter_domain: self => {
            return [
              '|',
              '|',
              ['name', 'ilike', self],
              ['partner_ref', 'ilike', self],
              ['partner_id', 'child_of', self]
            ]
          }
        },
        partner_id: { operator: 'child_of' },
        user_id: {},
        product_id: {},
        origin: {}
      },

      filters: {
        group_me: {
          my_purchases: {
            string: 'My Purchases',
            domain: ({ env }) => {
              const uid = env.uid
              return [['user_id', '=', uid]]
            }
          },
          starred: { string: 'Starred', domain: [['priority', '=', '1']] }
        },
        group_state_rfq: {
          draft: {
            string: 'RFQs',
            domain: [['state', 'in', ['draft', 'sent', 'to approve']]]
          }
        },
        group_state: {
          approved: {
            string: 'Purchase Orders',
            domain: [['state', 'in', ['purchase', 'done']]]
          },
          to_approve: {
            string: 'To Approve',
            domain: [['state', 'in', ['to approve']]]
          }
        },
        group_type: {
          order_date: { string: 'Order Date', date: 'date_order' },
          draft_rfqs: {
            string: 'Draft RFQs',
            domain: [['state', '=', 'draft']]
          },

          waiting_rfqs: {
            string: 'Waiting RFQs',
            domain: () => {
              const today = date_tools.today
              return [
                ['state', '=', 'sent'],
                ['date_order', '>=', today]
              ]
            }
          },
          late_rfqs: {
            string: 'Late RFQs',
            domain: () => {
              const today = date_tools.today
              return [
                ['state', 'in', ['draft', 'sent', 'to approve']],
                ['date_order', '<', today]
              ]
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
      fields: {
        name: {
          string: 'Order',
          filter_domain: self => {
            return [
              '|',
              '|',
              ['name', 'ilike', self],
              ['partner_ref', 'ilike', self],
              ['partner_id', 'child_of', self]
            ]
          }
        },
        partner_id: { operator: 'child_of' },
        user_id: {},
        product_id: {}
      },

      filters: {
        group_me: {
          my_purchases: {
            string: 'My Orders',
            domain: ({ env }) => {
              const uid = env.uid
              return [['user_id', '=', uid]]
            }
          },
          starred: { string: 'Starred', domain: [['priority', '=', '1']] }
        },
        group_state: {
          unconfirmed: {
            string: 'Not Acknowledged',
            domain: [
              ['mail_reception_confirmed', '=', false],
              ['state', '=', 'purchase']
            ]
          },
          not_invoiced: {
            string: 'Waiting Bills',
            domain: [['invoice_status', '=', 'to invoice']]
          },
          invoiced: {
            string: 'Bills Received',
            domain: [['invoice_status', '=', 'invoiced']]
          }
        },
        group_date: {
          order_date: { string: 'Order Date', date: 'date_order' }
        }
      }
    }
  },

  purchase_rfq: {
    _odoo_model: 'ir.actions',
    name: 'Requests for Quotation',
    type: 'ir.actions.act_window',
    res_model: 'purchase.order',
    search_view_id: 'view_purchase_order_filter',
    domain: [],
    context: { quotation_only: true },
    views: {
      tree: 'purchase_order_kpis_tree',
      form: 'purchase_order_form'
    }
  },

  purchase_form_action: {
    _odoo_model: 'ir.actions',
    name: 'Purchase Orders',
    type: 'ir.actions.act_window',
    res_model: 'purchase.order',
    search_view_id: 'purchase_order_view_search',
    domain: [['state', 'in', ['purchase', 'done']]],
    context: {},
    views: {
      tree: 'purchase_order_view_tree',
      form: 'purchase_order_form'
    }
  }
}

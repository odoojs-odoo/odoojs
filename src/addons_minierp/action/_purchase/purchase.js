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
  purchase_order_form: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    type: 'form',
    toolbar: {
      action: {},
      print: {}
    },

    arch: {
      header: {
        buttons: {
          button_confirm: {
            name: 'button_confirm',
            type: 'object',
            string: 'Confirm Order',
            btn_type: 'primary',
            invisible: ({ record }) => {
              // states: 'sent',
              const { state } = record
              return state !== 'sent'
            }
          },
          button_approve: {
            groups: 'purchase.group_purchase_manager',
            name: 'button_approve',
            type: 'object',
            string: 'Approve Order',
            btn_type: 'primary',
            invisible: ({ record }) => {
              // states: 'to approve',
              const { state } = record
              return state !== 'to approve'
            }
          },
          action_create_invoice: {
            name: 'action_create_invoice',
            type: 'object',
            string: 'Create Bill',
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

          button_confirm2: {
            name: 'button_confirm',
            type: 'object',
            string: 'Confirm Order',
            invisible: ({ record }) => {
              // states: 'draft',
              const { state } = record
              return state !== 'draft'
            }
          },

          action_create_invoice2: {
            name: 'action_create_invoice',
            type: 'object',
            string: 'Create Bill',
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
            type: 'object',
            string: 'Set to Draft',
            invisible: ({ record }) => {
              // states: 'cancel',
              const { state } = record
              return state !== 'cancel'
            }
          },
          button_cancel: {
            name: 'button_cancel',
            type: 'object',
            string: 'Cancel',
            invisible: ({ record }) => {
              // states: 'draft,to approve,sent,purchase',
              const { state } = record
              return !['draft', 'to approve', 'sent', 'purchase'].includes(
                state
              )
            }
          },
          button_done: {
            name: 'button_done',
            type: 'object',
            string: 'Lock',
            invisible: ({ record }) => {
              // states: 'purchase',
              const { state } = record
              return !['purchase'].includes(state)
            }
          },
          button_unlock: {
            groups: 'purchase.group_purchase_manager',
            name: 'button_unlock',
            type: 'object',
            string: 'Unlock',
            invisible: ({ record }) => {
              // states: 'done',
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
        state: { invisible: 1 },
        _div_button_box: {
          _button_action_view_invoice: {
            _attr: {
              name: 'action_view_invoice',
              type: 'object',
              icon: 'fa-pencil-square-o',
              invisible({ record }) {
                const { invoice_count, state } = record
                return (
                  !invoice_count ||
                  ['draft', 'sent', 'to approve'].includes(state)
                )
              }
            },
            invoice_count: { widget: 'statinfo', string: 'Vendor Bills' },
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

            // priority: { widget: 'priority' },
            name: { readonly: '1' }
          }
        },

        _group: {
          _group: {
            partner_id: { widget: 'res_partner_many2one' },
            partner_ref: {},
            // currency_id: {
            //   groups: 'base.group_multi_currency',
            //   force_save: '1'
            // },
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

            date_approve: {
              invisible({ record }) {
                // 'invisible': [('state','not in',('purchase','done'))]
                const { state } = record
                return !['purchase', 'done'].includes(state)
              }
            },

            date_planned: {
              readonly({ record }) {
                // 'readonly': [('state', 'not in',
                // ('draft', 'sent', 'to approve', 'purchase'))]
                const { state } = record
                return !['draft', 'sent', 'to approve', 'purchase'].includes(
                  state
                )
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
            name: 'my_purchases',
            string: 'My Purchases',
            domain: ({ env }) => {
              const uid = env.uid
              return [['user_id', '=', uid]]
            }
          }
        },
        group_state_rfq: {
          draft: {
            name: 'draft',
            string: 'RFQs',
            domain: [['state', 'in', ['draft', 'sent', 'to approve']]]
          }
        },
        group_state: {
          approved: {
            name: 'approved',
            string: 'Purchase Orders',
            domain: [['state', 'in', ['purchase', 'done']]]
          },
          to_approve: {
            name: 'to_approve',
            string: 'To Approve',
            domain: [['state', 'in', ['to approve']]]
          }
        },
        group_type: {
          order_date: {
            name: 'order_date',
            string: 'Order Date',
            date: 'date_order'
          },
          draft_rfqs: {
            name: 'draft_rfqs',
            string: 'Draft RFQs',
            domain: [['state', '=', 'draft']]
          },

          waiting_rfqs: {
            name: 'waiting_rfqs',
            string: 'Waiting RFQs',
            domain: ({ env }) => {
              const today = env.date_tools.today
              return [
                ['state', '=', 'sent'],
                ['date_order', '>=', today]
              ]
            }
          },
          late_rfqs: {
            name: 'late_rfqs',
            string: 'Late RFQs',
            domain: ({ env }) => {
              const today = env.date_tools.today
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
            name: 'my_Orders',
            string: 'My Orders',
            domain: ({ env }) => {
              const uid = env.uid
              return [['user_id', '=', uid]]
            }
          }
        },
        group_state: {
          unconfirmed: {
            name: 'unconfirmed',
            string: 'Not Acknowledged',
            domain: [
              ['mail_reception_confirmed', '=', false],
              ['state', '=', 'purchase']
            ]
          },
          not_invoiced: {
            name: 'not_invoiced',
            string: 'Waiting Bills',
            domain: [['invoice_status', '=', 'to invoice']]
          },
          invoiced: {
            name: 'invoiced',
            string: 'Bills Received',
            domain: [['invoice_status', '=', 'invoiced']]
          }
        },
        group_date: {
          order_date: {
            name: 'order_date',
            string: 'Order Date',
            date: 'date_order'
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
        // priority: { optional: 'show', widget: 'priority' },
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

  purchase_order_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'purchase.order',
    type: 'tree',
    arch: {
      sheet: {
        // priority: { optional: 'show', widget: 'priority' },
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

  purchase_rfq: {
    _odoo_model: 'ir.actions.act_window',
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
    _odoo_model: 'ir.actions.act_window',
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

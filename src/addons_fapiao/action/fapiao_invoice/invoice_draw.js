export default {
  view_invoice_draw_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.invoice.draw',
    type: 'tree',

    fields: {
      type: {},
      name: {},
      state: {},
      fapiao_status: {},

      //   company_id: {},
      //   user_id: {},
      //   api_draw_id: {},
      invoice_type: {},
      time_fapiao: {},
      date_fapiao: {},

      invoice_code: {},
      invoice_number: {},
      check_code: {},
      amount_total: {},
      //   amount_untaxed: {},
      //   amount_tax: {},
      //   company_partner_id: {},
      partner_id: {}
    }
  },

  view_invoice_draw_form: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.invoice.draw',
    type: 'form',

    toolbar: {
      action: {},
      print: {}
    },

    arch: {
      header: {
        buttons: {
          action_confirm: {
            name: 'action_confirm',
            string: 'Confirm',
            type: 'object',
            // btn_type: 'primary',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'draft'
            }
          },
          action_cancel: {
            name: 'action_cancel',
            string: 'Cancel',
            type: 'object',
            // btn_type: 'primary',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'draft' || state !== 'confirmed'
            }
          },
          action_draft: {
            name: 'action_draft',
            string: 'Set Draft',
            type: 'object',
            // btn_type: 'primary',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'cancel'
            }
          },

          action_reset: {
            name: 'action_reset',
            string: 'Reset',
            type: 'object'
          },
          action_request: {
            name: 'action_request',
            string: 'Draw',
            type: 'object',
            // btn_type: 'primary',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'confirmed'
            }
          },
          action_query: {
            name: 'action_query',
            string: 'Read',
            type: 'object',
            invisible: ({ record }) => {
              const { state, fapiao_status } = record
              return (
                state !== 'doing' ||
                !['doing', 'signing', 'being_invalid'].includes(fapiao_status)
              )
            }
          },
          action_invalid: {
            name: 'action_invalid',
            string: 'Invalid',
            type: 'object',
            invisible: ({ record }) => {
              const { state, fapiao_status } = record
              return state !== 'done' || !['done'].includes(fapiao_status)
            }
          },
          action_print: {
            name: 'action_print',
            string: 'Print',
            type: 'object',
            invisible: ({ record }) => {
              const { state, fapiao_status } = record
              return state !== 'done' || !['done'].includes(fapiao_status)
            }
          },
          action_to_paper: {
            name: 'action_to_paper',
            string: 'Topaper',
            type: 'object',
            // btn_type: 'primary',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'done'
            }
          }
        },

        fields: {
          state: {
            widget: 'statusbar',
            statusbar_visible: 'draft,confirmed,done'
          }
        }
      },
      sheet: {
        state: { invisible: 1 },
        _group: {
          _group_name: {
            name: { invisible: 1 },
            company_id: {},
            //   tin: {}
            user_id: {},
            time_fapiao: {},
            fapiao_status: {},
            draw_serial_num: {}
          },
          _group_check: {
            nuonuo_serial_num: {},
            nuonuo_api_status: {},
            nuonuo_api_status_msg: {},
            nuonuo_api_fail_cause: {}
          },

          _group_type: {
            type: {},
            invoice_type: {},
            taxmachine_code: {}
          },

          _group_code: {
            invoice_code: {},
            invoice_number: {},
            date_fapiao: {},
            check_code: {}
          },

          _group_buyer: {
            partner_id: { label: '购买方', string: '' },
            partner_tin: { string: '', readonly: 1 },
            partner_address_phone: { string: '', readonly: 1 },
            partner_bank_account: { string: '', readonly: 1 }
          },

          _group_comp: {}
        },

        input_line_ids: {
          string: '',
          widget: 'x2many_tree',
          views: {
            tree: {
              fields: {
                //   line_type: {},
                row_number: { string: 'No' },
                //   ref_row_number: {},
                //   name: {},
                vat_product_id: {},
                product_id: {},
                product_spec: {},
                product_uom: {},
                // tax_id: {},
                quantity: {},
                // price_unit: {},
                price_untax: {},
                // amount_total: {},
                amount_untaxed: {},
                tax_ratio: {},
                amount_tax: {},
                // amount_discount: {},
                amount_untaxed_discount: {},
                amount_tax_discount: {}
              }
            },
            form: {
              arch: {
                sheet: {
                  _group: {
                    _group_number: {
                      sequence: {},
                      row_number: {},
                      row_number_discount: {}
                    },

                    _group_product: {
                      //   name: {},
                      vat_product_id: {},
                      vat_product_code: {},
                      product_id: {},
                      product_spec: {},
                      product_uom: {},
                      tax_id: {},
                      quantity: {},
                      price_unit: {},
                      price_untax: {},
                      amount_total: {},
                      amount_untaxed: {},
                      tax_ratio: {},
                      amount_tax: {},
                      amount_discount: {},
                      amount_untaxed_discount: {},
                      amount_tax_discount: {}
                    }
                  }
                }
              }
            }
          }
        },

        _group_2: {
          _group_amount_cn: {
            cn_amount_total: {}
          },

          _group_amount: {
            amount_total: {},
            amount_untaxed: {},
            amount_tax: {}
          },
          _group_saler: {
            company_name: { label: '销售方', string: '', readonly: 1 },
            company_tin: { string: '', readonly: 1 },
            company_address_phone: { string: '', readonly: 1 },
            company_bank_account: { string: '', readonly: 1 }
          },

          _group_note: {
            payee_name: {},
            checker_name: {},
            drawer_name: {},
            note: {}
          }
        }
      }
    }
  },

  action_invoice_draw: {
    _odoo_model: 'ir.actions',
    name: 'Invoice Draw ',
    type: 'ir.actions.act_window',
    res_model: 'fp.invoice.draw',
    domain: [],
    context: {},
    views: {
      tree: 'view_invoice_draw_tree',
      form: 'view_invoice_draw_form'
    }
  }
}

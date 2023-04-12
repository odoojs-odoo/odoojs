export default {
  view_bill_check_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.bill.check',
    type: 'tree',
    arch: {
      sheet: {
        type: {},
        name: {},
        state: {},
        fapiao_status: {},
        check_time: {},
        company_id: { invisible: 1 },
        user_id: { invisible: 1 },
        api_check_id: { invisible: 1 },
        invoice_type: {},
        date_fapiao: {},
        invoice_code: {},
        invoice_number: {},
        check_code: {},
        amount_total: {},
        amount_untaxed: { invisible: 1 },
        amount_tax: { invisible: 1 },
        company_partner_id: { invisible: 1 },
        buyer_id: {},
        partner_id: {}
      }
    }
  },

  view_bill_check_form: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.bill.check',
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
            string: 'Check',
            type: 'object',
            // btn_type: 'primary',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'confirmed'
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
            check_time: {}
          },

          _group_check: {
            zncspt_api_check_result_info: {},
            zncspt_api_check_result: {},
            zncspt_api_check_count: {},
            zncspt_api_check_date: {},
            zncspt_api_list_flag: {}
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
            _b_buyer: '购买方',
            buyer_name: { nolabel: 1 },
            buyer_tin: { nolabel: 1 },
            buyer_address_phone: { nolabel: 1 },
            buyer_bank_account: { nolabel: 1 }
          },

          _group_comp: {
            _b_company: '报销单位',
            company_name: { nolabel: 1 },
            company_tin: { nolabel: 1 },
            company_address_phone: { nolabel: 1 },
            company_bank_account: { nolabel: 1 }
          }
        },
        line_ids: {
          string: '',
          widget: 'x2many_tree',
          views: {
            tree: {
              arch: {
                sheet: {
                  line_type: { invisible: 1 },
                  row_number: { string: 'No' },
                  ref_row_number: { invisible: 1 },
                  name: { invisible: 1 },
                  vat_product_name: {},
                  product_name: {},
                  product_spec: {},
                  product_uom: {},
                  quantity: {},
                  price_untax: {},
                  price_unit: { invisible: 1 },
                  amount_untaxed: {},
                  tax_ratio: {},
                  amount_tax: {},
                  amount_total: { invisible: 1 }
                }
              }
            },
            form: {
              arch: {
                sheet: {
                  _group: {
                    _group_number: {
                      line_type: {},
                      row_number: {},
                      ref_row_number: {},
                      sequence: {},
                      row_number_check: {}
                    },

                    _group_product: {
                      name: { invisible: 1 },
                      vat_product_id: { invisible: 1 },
                      vat_product_code: {},
                      vat_product_name: {},
                      product_id: { invisible: 1 },
                      product_name: {},
                      product_spec: {},
                      product_uom: {},
                      quantity: {},
                      price_untax: {},
                      price_unit: { invisible: 1 },
                      amount_untaxed: {},
                      tax_ratio: {},
                      amount_tax: {},
                      amount_total: { invisible: 1 }
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
            _b_partner: '销售方',
            partner_name: { label: 1 },
            partner_tin: { label: 1 },
            partner_address_phone: { label: 1 },
            partner_bank_account: { label: 1 }
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

  action_bill_check: {
    _odoo_model: 'ir.actions',
    name: 'Bill Check ',
    type: 'ir.actions.act_window',
    res_model: 'fp.bill.check',
    domain: [],
    context: {},
    views: {
      tree: 'view_bill_check_tree',
      form: 'view_bill_check_form'
    }
  }
}

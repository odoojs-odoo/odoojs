export default {
  view_bill_check_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.bill.check',
    type: 'tree',

    fields: {
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
        buttons: [
          {
            name: 'action_confirm',
            string: 'Confirm',
            type: 'object',
            // btn_type: 'primary',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'draft'
            }
          },
          {
            name: 'action_cancel',
            string: 'Cancel',
            type: 'object',
            // btn_type: 'primary',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'draft' || state !== 'confirmed'
            }
          },
          {
            name: 'action_draft',
            string: 'Set Draft',
            type: 'object',
            // btn_type: 'primary',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'cancel'
            }
          },
          {
            name: 'action_reset',
            string: 'Reset',
            type: 'object'
          },
          {
            name: 'action_request',
            string: 'Check',
            type: 'object',
            // btn_type: 'primary',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'confirmed'
            }
          },
          {
            name: 'action_to_paper',
            string: 'Topaper',
            type: 'object',
            // btn_type: 'primary',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'done'
            }
          }
        ],
        fields: {
          state: {
            widget: 'statusbar',
            statusbar_visible: 'draft,confirmed,done'
          }
        }
      },
      sheet: {
        _title: {
          state: { invisible: 1 },
          display_name: {}
        },

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
          buyer_name: { label: '购买方', string: '', readonly: 1 },
          buyer_tin: { string: '', readonly: 1 },
          buyer_address_phone: { string: '', readonly: 1 },
          buyer_bank_account: { string: '', readonly: 1 }
        },

        _group_comp: {
          company_name: { label: '报销单位', string: '', readonly: 1 },
          company_tin: { string: '', readonly: 1 },
          company_address_phone: { string: '', readonly: 1 },
          company_bank_account: { string: '', readonly: 1 }
        },

        _group_lines: {
          _span: 2,
          line_ids: {
            string: '',
            widget: 'x2many_tree',
            views: {
              tree: {
                fields: {
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
              },
              form: {
                arch: {
                  sheet: {
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

        _group_amount_cn: {
          cn_amount_total: {}
        },

        _group_amount: {
          amount_total: {},
          amount_untaxed: {},
          amount_tax: {}
        },

        _group_saler: {
          partner_name: { label: '销售方', string: '', readonly: 1 },
          partner_tin: { string: '', readonly: 1 },
          partner_address_phone: { string: '', readonly: 1 },
          partner_bank_account: { string: '', readonly: 1 }
        },

        _group_note: {
          payee_name: {},
          checker_name: {},
          drawer_name: {},
          note: {}
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

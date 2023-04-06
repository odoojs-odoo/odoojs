export default {
  view_bill_ocr_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.bill.ocr',
    type: 'tree',

    fields: {
      type: {},
      name: {},
      state: {},
      ocr_time: {},
      //   company_id: {},
      //   user_id: {},
      attachment_id: {},
      //   api_ocr_id: {},
      invoice_type: {},
      date_fapiao: {},
      invoice_code: {},
      invoice_number: {},
      amount_total: {},
      //   amount_untaxed: {},
      //   amount_tax: {},
      //   company_partner_id: {},
      partner_id: {}
    }
  },

  view_bill_ocr_form: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.bill.ocr',
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
            string: 'OCR',
            type: 'object',
            // btn_type: 'primary',
            invisible: ({ record }) => {
              const { state } = record
              return state !== 'confirmed'
            }
          },
          action_to_check: {
            name: 'action_to_check',
            string: 'ToCheck',
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
            ocr_time: {},
            attachment_id: { widget: 'attachment' }
          },
          _group_ocr: {
            glority_api_qrcode: {},
            glority_api_company_seal: {},
            glority_api_kind: {},
            glority_api_service_name: {},
            glority_api_province: {},
            glority_api_city: {}
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
    }
  },

  action_bill_ocr: {
    _odoo_model: 'ir.actions',
    name: 'Bill OCR ',
    type: 'ir.actions.act_window',
    res_model: 'fp.bill.ocr',
    domain: [],
    context: {},
    views: {
      tree: 'view_bill_ocr_tree',
      form: 'view_bill_ocr_form'
    }
  }
}

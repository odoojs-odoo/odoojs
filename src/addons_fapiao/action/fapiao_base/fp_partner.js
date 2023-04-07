export default {
  view_partner_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.partner',
    type: 'tree',
    priority: 2,
    fields: {
      //   draw_company_id: {},
      name: {},
      shortname: {},
      fapiao_name: {},
      code: {},
      tin: {},
      address_phone: {},
      bank_account: {}
    }
  },

  view_partner_form: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.partner',
    type: 'form',

    arch: {
      sheet: {
        _group: {
          _group_name: {
            name: {},
            shortname: {},
            fapiao_name: {},
            code: {},
            tin: {}
          },

          _group_flag: {
            be_company: { invisible: 1 },
            draw_company_id: {
              invisible({ record }) {
                const { be_company } = record
                return !be_company
              }
            },
            be_customer: {
              invisible({ record }) {
                const { be_company } = record
                return be_company
              }
            },
            be_supplier: {
              invisible({ record }) {
                const { be_company } = record
                return be_company
              }
            }
          },

          _group_address: {
            address_phone: {
              invisible({ record }) {
                const { address_phone2 } = record
                return address_phone2
              }
            },
            address: {
              invisible({ record }) {
                const { address_phone2 } = record
                return address_phone2
              }
            },
            phone: {
              invisible({ record }) {
                const { address_phone2 } = record
                return address_phone2
              }
            },
            address_phone2: {
              invisible({ record }) {
                const { address, phone } = record
                return address && phone
              }
            }
          },
          _group_bank: {
            bank_account: {
              invisible({ record }) {
                const { bank_account2 } = record
                return bank_account2
              }
            },
            bank_name: {
              invisible({ record }) {
                const { bank_account2 } = record
                return bank_account2
              }
            },
            acc_number: {
              invisible({ record }) {
                const { bank_account2 } = record
                return bank_account2
              }
            },

            bank_account2: {
              invisible({ record }) {
                const { bank_name, acc_number } = record
                return bank_name && acc_number
              }
            }
          }
        }
      }
    }
  },

  action_partner: {
    _odoo_model: 'ir.actions',
    name: '开票伙伴',
    type: 'ir.actions.act_window',
    res_model: 'fp.partner',
    // search_view_id: '',
    domain: [['be_company', '=', false]],
    context: {
      default_be_company: false
    },
    views: {
      tree: 'view_partner_tree',
      form: 'view_partner_form'
    }
  },

  action_partner_company: {
    _odoo_model: 'ir.actions',
    name: '开票公司',
    type: 'ir.actions.act_window',
    res_model: 'fp.partner',
    // search_view_id: '',
    domain: [['be_company', '=', true]],
    context: {
      default_be_company: true
    },
    views: {
      tree: 'view_partner_tree',
      form: 'view_partner_form'
    }
  }
}

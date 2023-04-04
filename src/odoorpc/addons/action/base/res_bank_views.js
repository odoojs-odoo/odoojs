// ok

export default {
  view_res_bank_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.bank',
    type: 'form',
    buttons: { create: true, edit: true, delete: true },

    arch: {
      header: { buttons: {}, fields: {} },
      sheet: {
        _widget: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible({ record }) {
              // invisible': [('active', '=', True)]
              const { active } = record
              return active
            }
          }
        },

        _group_bank_details: {
          name: {},
          bic: {}
        },

        _group: {
          _group_address_details: {
            _label: { _attr: { for: 'street', string: 'Bank Address' } },
            street: { nolabel: 1, placeholder: 'Street...' },
            street2: { nolabel: 1, placeholder: 'Street 2...' },
            city: { nolabel: 1, placeholder: 'City' },
            state: { nolabel: 1, placeholder: 'State' },
            zip: { nolabel: 1, placeholder: 'ZIP' },
            country: { nolabel: 1, placeholder: 'Country' }
          },
          _group_communication_details: {
            phone: {},
            email: { widget: 'email' },
            active: { invisible: '1' }
          }
        }
      }
    }
  },
  view_res_bank_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.bank',
    type: 'tree',
    fields: {
      name: {},
      bic: {},
      country: {}
    }
  },

  res_bank_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.bank',
    type: 'search',
    arch: {
      fields: {
        name: {}
      },

      filters: {
        group_active: {
          inactive: {
            string: { en_US: 'Archived', zh_CN: '已归档', zh_HK: '已歸檔' },
            domain: [['active', '=', false]]
          }
        }
      }
    }
  },

  action_res_bank_form: {
    _odoo_model: 'ir.actions',
    name: '银行',
    type: 'ir.actions.act_window',
    res_model: 'res.bank',
    search_view_id: 'res_bank_view_search',
    domain: [],
    context: {},
    views: {
      tree: 'view_res_bank_tree',
      form: 'view_res_bank_form'
    }
  },

  view_partner_bank_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.bank',
    type: 'form',
    arch: {
      header: { buttons: {}, fields: {} },
      sheet: {
        _widget: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible({ record }) {
              // invisible': [('active', '=', True)]
              const { active } = record
              return active
            }
          }
        },

        _group: {
          _group_name: {
            sequence: { invisible: '1' },
            acc_type: { invisible: '1' },
            acc_number: {},
            company_id: { groups: 'base.group_multi_company' },
            partner_id: {},
            acc_holder_name: {}
          },

          _group_bank: {
            bank_id: {},
            currency_id: { groups: 'base.group_multi_currency' },
            allow_out_payment: { widget: 'boolean_toggle' },
            active: { invisible: '1' }
          }
        }
      }
    }
  },

  view_partner_bank_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.bank',
    type: 'tree',
    fields: {
      sequence: { widget: 'handle' },
      acc_number: {},
      bank_name: {},
      company_id: { groups: 'base.group_multi_company' },
      partner_id: {},
      acc_holder_name: { invisible: '1' },
      allow_out_payment: { widget: 'boolean_toggle' }
    }
  },

  view_partner_bank_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.bank',
    type: 'search',
    arch: {
      fields: {
        bank_name: {
          _default: 1,
          string: { en_US: 'Bank Name', zh_CN: '銀行名稱', zh_HK: '銀行名稱' },

          filter_domain: self => {
            return [
              '|',
              ['bank_name', 'ilike', self],
              ['acc_number', 'ilike', self]
            ]
          }
        },
        company_id: {
          string: { en_US: 'Company', zh_CN: '公司', zh_HK: '公司' }
        },
        partner_id: {
          string: { en_US: 'Partner', zh_CN: '參與人', zh_HK: '參與人' }
        }
      },
      filters: {
        group_active: {
          inactive: {
            string: '已归档',
            domain: [['active', '=', false]]
          }
        }
      }
    }
  },

  action_res_partner_bank_account_form: {
    _odoo_model: 'ir.actions',
    name: '银行账号',
    type: 'ir.actions.act_window',
    res_model: 'res.partner.bank',
    domain: [],
    context: {},
    views: {
      tree: 'view_partner_bank_tree',
      form: 'view_partner_bank_form'
    }
  }
}

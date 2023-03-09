// ok

export default {
  view_res_bank_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.bank',
    type: 'form',
    buttons: { create: true, edit: true, delete: true },

    arch: {
      header: {
        buttons: [],
        fields: {}
      },
      sheet: {
        _title: {
          display_name: {}
        },

        _group_bank_details: {
          _span: 2,
          name: {},
          bic: {}
        },

        _group_address_details: {
          street: { placeholder: 'Street...' },
          street2: {},
          city: {},
          state: {},
          zip: {},
          country: {}
        },

        _group_communication_details: {
          phone: {},
          email: {},
          active: {}
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
            string: '已归档',
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
    context: {}
  },

  view_partner_bank_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.bank',
    type: 'form',
    fields: {
      display_name: {},
      sequence: {},
      acc_type: {},
      acc_number: {},
      partner_id: {},
      company_id: {},
      bank_id: {},
      acc_holder_name: {},
      active: {}
    }
  },

  view_partner_bank_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.bank',
    type: 'tree',
    fields: {
      sequence: {},
      acc_number: {},
      bank_name: {},
      company_id: {},
      partner_id: {},
      acc_holder_name: {}
    }
  },

  view_partner_bank_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner.bank',
    type: 'search',
    arch: {
      fields: {
        bank_name: {
          filter_domain:
            "['|', ('bank_name','ilike',self), ('acc_number','ilike',self)]"
        },
        company_id: {},
        partner_id: {}
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
    context: {}
  }
}

export default {
  view_company_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.company',
    inherit_id: 'base.view_company_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='country_id']",
            position: 'after'
          },
          country_code: {
            invisible: '1'
          },
          account_enabled_tax_country_ids: {
            invisible: '1'
          }
        },
        _xpath_701: {
          _attr: {
            expr: '//sheet',
            position: 'after'
          },
          _div: {
            _attr: {
              class: 'oe_chatter'
            },
            message_follower_ids: {
              groups: 'base.group_user'
            },
            message_ids: {}
          }
        }
      }
    }
  },

  res_company_view_form_terms: {
    _odoo_model: 'ir.ui.view',
    model: 'res.company',
    type: 'form',
    arch: {
      sheet: {
        invoice_terms_html: {
          class: 'oe_account_terms'
        },
        _footer: {
          _button: {
            _attr: {
              string: 'Save',
              class: 'btn-primary'
            }
          },
          _button_473: {
            _attr: {
              string: 'Discard',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  },

  action_check_hash_integrity: {
    _odoo_model: 'ir.actions.server',
    type: 'ir.actions.server',
    model_id: 'account.model_res_company',
    model: 'res_company'
  },

  account_invoice_onboarding_sale_tax_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.company',
    type: 'form',
    arch: {
      sheet: {
        _div: {
          _attr: {
            class: 'mb16',
            text: 'Choose a default sales tax for your products.'
          }
        },
        _label_account_sale_tax_id: {
          for: 'account_sale_tax_id',
          string: 'Sales Tax'
        },
        account_sale_tax_id: {},
        _footer: {
          _button_action_save_onboarding_sale_tax: {
            _attr: {
              name: 'action_save_onboarding_sale_tax',
              type: 'object',
              string: 'Apply',
              class: 'btn btn-primary'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  },

  action_open_account_onboarding_sale_tax: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Sales tax',
    type: 'ir.actions.act_window',
    res_model: 'res.company',
    views: {
      tree: 'account_invoice_onboarding_sale_tax_form',
      form: '=======todo=========='
    }
  },

  action_new_bank_setting: {
    _odoo_model: 'ir.actions.server',
    model_id: 'model_res_company',
    model: 'res_company'
  }
}

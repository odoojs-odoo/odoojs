export default {
  base_onboarding_company_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.company',
    inherit_id: 'base.view_company_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//group[@name='social_media']",
            position: 'replace'
          }
        },
        _form: {
          _footer: {
            _button_action_save_onboarding_company_step: {
              _attr: {
                name: 'action_save_onboarding_company_step',
                string: 'Apply',
                class: 'btn btn-primary',
                type: 'object'
              }
            },
            _button: {
              _attr: {
                string: 'Cancel'
              }
            }
          }
        }
      }
    }
  },

  action_open_base_onboarding_company: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Set your company data',
    type: 'ir.actions.act_window',
    res_model: 'res.company',
    views: {
      tree: 'base_onboarding_company_form',
      form: '=======todo=========='
    }
  }
}

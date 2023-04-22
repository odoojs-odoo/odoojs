export default {
  crm_lead_pls_update_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lead.pls.update',
    type: 'form',
    arch: {
      sheet: {
        _p: 'The success rate is computed based on the stage, but you can add more fields in the statistical analysis.',
        _p_533: {
          pls_fields: {
            widget: 'many2many_tags',
            placeholder: 'Extra fields...'
          }
        },
        _p_647: {
          _attr: { text: 'Consider leads created as of the:' },
          pls_start_date: {}
        },
        _footer: {
          _button_action_update_crm_lead_probabilities: {
            _attr: {
              name: 'action_update_crm_lead_probabilities',
              type: 'object',
              string: 'Confirm',
              class: 'btn-primary'
            }
          },
          _button: {
            _attr: { string: 'Cancel' }
          }
        }
      }
    }
  },

  crm_lead_pls_update_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Update Probabilities',
    res_model: 'crm.lead.pls.update',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: 'crm_lead_pls_update_view_form',
      form: '=======todo=========='
    }
  }
}

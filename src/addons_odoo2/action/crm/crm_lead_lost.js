export default {
  crm_lead_lost_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lead.lost',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          lost_reason_id: { no_create_edit: true }
        },
        lost_feedback: { placeholder: 'What went wrong ?' },
        _footer: {
          _button_action_lost_reason_apply: {
            _attr: {
              name: 'action_lost_reason_apply',
              type: 'object',
              string: 'Submit',
              class: 'btn-primary'
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

  crm_lead_lost_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Lost Reason',
    type: 'ir.actions.act_window',
    res_model: 'crm.lead.lost',
    search_view_id: 'tooooooodoooooo',
    context: { dialog_size: 'medium' },
    views: {
      tree: 'crm_lead_lost_view_form',
      form: '=======todo=========='
    }
  }
}

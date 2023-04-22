export default {
  merge_opportunity_form: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.merge.opportunity',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          _attr: { string: 'Assign opportunities to' },
          user_id: { class: 'oe_inline' },
          team_id: { class: 'oe_inline' }
        },
        _group_286: {
          _attr: { string: 'Select Leads/Opportunities' },
          opportunity_ids: {
            views: {
              tree: {
                arch: {
                  sheet: {
                    create_date: {},
                    name: {},
                    type: {},
                    contact_name: {},
                    email_from: { optional: 'hide' },
                    phone: {
                      class: 'o_force_ltr',
                      optional: 'hide'
                    },
                    stage_id: {},
                    user_id: {},
                    team_id: {}
                  }
                }
              }
            }
          }
        },
        _footer: {
          _button_action_merge: {
            _attr: {
              name: 'action_merge',
              type: 'object',
              string: 'Merge',
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

  action_merge_opportunities: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Merge',
    res_model: 'crm.merge.opportunity',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

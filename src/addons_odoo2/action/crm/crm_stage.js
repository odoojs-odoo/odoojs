export default {
  crm_lead_stage_search: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.stage',
    type: 'search',
    arch: {
      name: {},
      sequence: {},
      is_won: {},
      team_id: {}
    }
  },

  crm_stage_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.stage',
    type: 'tree',
    arch: {
      sheet: {
        sequence: { widget: 'handle' },
        name: { readonly: '1' },
        is_won: {},
        team_id: {}
      }
    }
  },

  crm_stage_form: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.stage',
    type: 'form',
    arch: {
      sheet: {
        _div_title: {
          _attr: { class: 'oe_title' },
          _label_name: { for: 'name' },
          _h1: {
            name: { placeholder: 'e.g. Negotiation' }
          }
        },
        _group: {
          _group: {
            is_won: {},
            fold: {},
            team_id: {
              invisible: [['team_count', '<=', 1]],
              no_open: true,
              no_create: true
            }
          },
          team_count: { invisible: '1' }
        },
        _separator: {
          _attr: { string: 'Requirements' }
        },
        requirements: { placeholder: 'Give your team the requirements to move an opportunity to this stage.' }
      }
    }
  },

  crm_stage_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Stages',
    res_model: 'crm.stage',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: 'crm.crm_stage_tree',
      form: '=======todo=========='
    }
  }
}

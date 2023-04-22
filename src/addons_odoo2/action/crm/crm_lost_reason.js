export default {
  crm_lost_reason_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lost.reason',
    type: 'search',
    arch: {
      name: {},
      _filter_archived: {
        _attr: {
          name: 'archived',
          string: 'Include archived',
          domain: ['|', ['active', '=', true], ['active', '=', false]]
        }
      },
      _separator: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      }
    }
  },

  crm_lost_reason_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lost.reason',
    type: 'form',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_action_lost_leads: {
            _attr: {
              name: 'action_lost_leads',
              type: 'object',
              icon: 'fa-star',
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_stat_info' },
              leads_count: { class: 'o_stat_value' },
              _span: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Leads'
                }
              }
            }
          }
        },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible: [['active', '=', true]]
          }
        },
        _div_title: {
          _attr: { class: 'oe_title' },
          _div: {
            _label_name: { for: 'name' }
          },
          _h1: {
            _attr: { class: 'mb32' },
            name: {
              class: 'mb16',
              placeholder: 'e.g. Too expensive'
            }
          },
          active: { invisible: '1' }
        }
      }
    }
  },

  crm_lost_reason_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.lost.reason',
    type: 'tree',
    arch: {
      sheet: {
        name: {}
      }
    }
  },

  crm_lost_reason_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Lost Reasons',
    res_model: 'crm.lost.reason',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

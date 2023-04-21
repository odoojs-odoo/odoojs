export default {
  view_utm_campaign_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'utm.campaign',
    type: 'search',
    arch: {
      title: { string: 'Campaigns' },
      tag_ids: {},
      user_id: {},
      is_auto_campaign: {},
      _group: {
        _attr: { string: 'Group By' },
        _filter_group_stage_id: {
          _attr: {
            name: 'group_stage_id',
            string: 'Stage',
            context: { group_by: 'stage_id' }
          }
        },
        _filter_group_user_id: {
          _attr: {
            name: 'group_user_id',
            string: 'Responsible',
            context: { group_by: 'user_id' }
          }
        }
      }
    }
  },

  utm_campaign_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'utm.campaign',
    type: 'form',
    arch: {
      header: {
        stage_id: {
          widget: 'statusbar',
          clickable: '1'
        }
      },
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box d-flex justify-content-end'
          }
        },
        _group: {
          title: {
            string: 'Campaign Name',
            class: 'text-break',
            placeholder: 'e.g. Black Friday'
          },
          name: { invisible: '1' },
          user_id: { domain: [['share', '=', false]] },
          tag_ids: {
            widget: 'many2many_tags',
            color_field: 'color',
            no_create_edit: true
          }
        },
        _notebook: {}
      }
    }
  },

  utm_campaign_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'utm.campaign',
    type: 'tree',
    arch: {
      sheet: {
        title: { readonly: '1' },
        name: { invisible: '1' },
        user_id: {},
        stage_id: {},
        tag_ids: {
          widget: 'many2many_tags',
          color_field: 'color'
        }
      }
    }
  },

  utm_campaign_view_form_quick_create: {
    _odoo_model: 'ir.ui.view',
    model: 'utm.campaign',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: { invisible: '1' },
          title: {
            string: 'Campaign Name',
            class: 'o_text_overflow',
            placeholder: 'e.g. Black Friday'
          },
          user_id: { domain: [['share', '=', false]] },
          tag_ids: {
            widget: 'many2many_tags',
            color_field: 'color',
            no_create_edit: true
          }
        }
      }
    }
  },

  utm_campaign_view_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'utm.campaign',
    type: 'otherview',
    arch: {}
  },

  utm_campaign_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Campaigns',
    res_model: 'utm.campaign',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

export default {
  crm_team_member_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team.member',
    type: 'search',
    arch: {
      user_id: {},
      crm_team_id: {},
      _separator: {},
      _filter_archived: {
        _attr: {
          name: 'archived',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      },
      _group: {
        _attr: { string: 'Group By' },
        _filter_groupby_crm_team_id: {
          _attr: {
            name: 'groupby_crm_team_id',
            string: 'Sales Team',
            context: { group_by: 'crm_team_id' }
          }
        }
      }
    }
  },

  crm_team_member_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team.member',
    type: 'tree',
    arch: {
      sheet: {
        crm_team_id: {},
        user_id: {}
      }
    }
  },

  crm_team_member_view_tree_from_team: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team.member',
    inherit_id: 'sales_team.crm_team_member_view_tree',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='crm_team_id']",
            position: 'replace'
          }
        }
      }
    }
  },

  crm_team_member_view_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team.member',
    type: 'otherview',
    arch: {}
  },

  crm_team_member_view_kanban_from_team: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team.member',
    inherit_id: 'sales_team.crm_team_member_view_kanban',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='crm_team_id']",
            position: 'replace'
          }
        }
      }
    }
  },

  crm_team_member_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team.member',
    type: 'form',
    arch: {
      sheet: {
        active: { invisible: '1' },
        company_id: { invisible: '1' },
        is_membership_multi: { invisible: '1' },
        member_warning: { invisible: '1' },
        user_in_teams_ids: { invisible: '1' },
        user_company_ids: { invisible: '1' },
        _div: {
          _attr: {
            invisible: [['member_warning', '=', false]],
            class: 'alert alert-info text-center'
          },
          member_warning: {}
        },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            title: 'Archived',
            bg_color: 'bg-danger',
            invisible: [['active', '=', true]]
          }
        },
        image_1920: {
          widget: 'image',
          invisible: [['user_id', '=', false]],
          class: 'oe_avatar',
          preview_image: 'image_128'
        },
        _div_title: {
          _attr: { class: 'oe_title' },
          _label_user_id: {
            for: 'user_id',
            class: 'oe_edit_only'
          },
          _h1: {
            _attr: { class: 'd-flex' },
            user_id: {
              class: 'flex-grow-1',
              no_quick_create: true
            }
          }
        },
        _group_member_partner_info: {
          _attr: { name: 'member_partner_info' },
          _group_group_owner: {
            _attr: { name: 'group_owner' },
            crm_team_id: {}
          },
          _group_group_user: {
            _attr: { name: 'group_user' },
            company_id: {
              groups: 'base.group_multi_company',
              invisible: [['user_id', '=', false]]
            },
            email: { invisible: [['user_id', '=', false]] },
            mobile: { invisible: [['user_id', '=', false]] },
            phone: { invisible: [['user_id', '=', false]] }
          }
        }
      }
    }
  },

  crm_team_member_view_form_from_team: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team.member',
    inherit_id: 'sales_team.crm_team_member_view_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//group[@name='group_owner']",
            position: 'replace'
          }
        }
      }
    }
  },

  crm_team_member_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Team Members',
    res_model: 'crm.team.member',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

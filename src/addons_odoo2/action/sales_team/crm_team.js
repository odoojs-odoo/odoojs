export default {
  crm_team_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team',
    type: 'search',
    arch: {
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      },
      name: {},
      user_id: {},
      member_ids: {},
      _group: {
        _attr: { string: 'Group By...' },
        _filter_team_leader: {
          _attr: {
            name: 'team_leader',
            string: 'Team Leader',
            domain: [],
            context: { group_by: 'user_id' }
          }
        }
      }
    }
  },

  crm_team_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team',
    type: 'form',
    arch: {
      sheet: {
        _div: {
          _attr: {
            invisible: ['|', ['is_membership_multi', '=', true], ['member_warning', '=', false]],
            class: 'alert alert-info text-center'
          },
          member_warning: {}
        },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
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
          _label_name: {
            for: 'name',
            string: 'Sales Team'
          },
          _h1: {
            name: {
              class: 'text-break',
              placeholder: 'e.g. North America'
            }
          },
          _div_options_active: {
            _attr: { name: 'options_active' }
          }
        },
        _group: {
          _group_left: {
            _attr: {
              name: 'left',
              string: 'Team Details'
            },
            active: { invisible: '1' },
            sequence: { invisible: '1' },
            is_membership_multi: { invisible: '1' },
            user_id: {
              widget: 'many2one_avatar_user',
              domain: [['share', '=', false]]
            },
            company_id: {
              groups: 'base.group_multi_company',
              no_create: true
            },
            currency_id: { invisible: '1' },
            member_company_ids: { invisible: '1' }
          },
          _group_right: {
            _attr: { name: 'right' }
          }
        },
        _notebook: {
          _page_members_users: {
            _attr: {
              name: 'members_users',
              string: 'Members'
            },
            member_ids: {
              class: 'w-100',
              views: {
                kanban: {
                  arch: {
                    sheet: {
                      id: {},
                      name: {},
                      email: {},
                      avatar_128: {},
                      _templates: {
                        _t: {
                          _div: {
                            _attr: { class: 'oe_kanban_card oe_kanban_global_click' },
                            _div: {
                              _attr: { class: 'o_kanban_card_content d-flex' },
                              _div: {
                                _img: {
                                  _attr: { class: 'o_kanban_image o_image_64_cover' }
                                }
                              },
                              _div_968: {
                                _attr: { class: 'oe_kanban_details d-flex flex-column ms-3' },
                                _strong: {
                                  _attr: { class: 'o_kanban_record_title oe_partner_heading' },
                                  name: {}
                                },
                                _div: {
                                  _attr: { class: 'd-flex align-items-baseline text-break' },
                                  _i: {
                                    _attr: {
                                      title: 'Email',
                                      class: 'fa fa-envelope me-1'
                                    }
                                  },
                                  email: {}
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            crm_team_member_ids: {
              invisible: ['|', ['is_membership_multi', '=', true], ['is_membership_multi', '=', false]],
              context: { todo_ctx: "{                                     'kanban_view_ref': 'sales_team.crm_team_member_view_kanban_from_team',                                     'form_view_ref': 'sales_team.crm_team_member_view_form_from_team',                                     'tree_view_ref': 'sales_team.crm_team_member_view_tree_from_team',                                     'default_crm_team_id': active_id,                                 }" },
              class: 'w-100'
            }
          }
        }
      }
    }
  },

  crm_team_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team',
    type: 'tree',
    arch: {
      sheet: {
        sequence: { widget: 'handle' },
        name: { readonly: '1' },
        active: { invisible: '1' },
        user_id: {
          widget: 'many2one_avatar_user',
          domain: [['share', '=', false]]
        },
        company_id: { groups: 'base.group_multi_company' }
      }
    }
  },

  crm_team_view_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team',
    type: 'otherview',
    arch: {}
  },

  crm_team_view_kanban_dashboard: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.team',
    type: 'otherview',
    arch: {}
  },

  crm_team_action_sales: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Sales Teams',
    res_model: 'crm.team',
    search_view_id: 'tooooooodoooooo',
    context: { in_sales_app: true },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  crm_team_action_pipeline: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Teams',
    res_model: 'crm.team',
    search_view_id: 'tooooooodoooooo',
    context: {},
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  crm_team_action_config: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Sales Teams',
    res_model: 'crm.team',
    search_view_id: 'tooooooodoooooo',
    context: {},
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

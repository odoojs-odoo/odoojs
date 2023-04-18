export default {
  mail_channel_view_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.channel',
    type: 'otherview',
    arch: {}
  },

  mail_channel_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.channel',
    type: 'form',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          }
        },
        avatar_128: {
          invisible: '1'
        },
        image_128: {
          widget: 'image',
          class: 'oe_avatar',
          size: [90, 90],
          preview_image: 'avatar_128'
        },
        _div_title: {
          _attr: {
            class: 'oe_title'
          },
          _label_name: {
            for: 'name',
            string: 'Group Name'
          },
          _h1: {
            _attr: {
              text: '#'
            },
            name: {
              class: 'oe_inline',
              placeholder: 'e.g. support'
            }
          }
        },
        _group: {
          _attr: {
            class: 'o_label_nowrap'
          },
          active: {
            invisible: '1'
          },
          description: {
            placeholder: 'Topics discussed in this group...'
          }
        },
        _notebook: {
          _page_privacy: {
            _attr: {
              name: 'privacy',
              string: 'Privacy'
            },
            _group: {
              _attr: {
                class: 'o_label_nowrap'
              },
              group_public_id: {
                invisible: [['channel_type', '!=', 'channel']]
              },
              group_ids: {
                string: 'Auto Subscribe Groups',
                widget: 'many2many_tags',
                invisible: [['channel_type', '!=', 'channel']]
              }
            }
          },
          _page_members: {
            _attr: {
              name: 'members',
              string: 'Members'
            },
            channel_type: {
              invisible: '1'
            },
            channel_member_ids: {
              readonly: [['channel_type', '=', 'chat']],
              context: {
                active_test: false
              },
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: {
                        string: 'Members'
                      },
                      partner_id: {
                        readonly: [['id', '!=', false]]
                      },
                      partner_email: {}
                    }
                  }
                }
              }
            }
          },
          _page_mail_channel_integrations: {
            _attr: {
              name: 'mail_channel_integrations',
              string: 'Integrations',
              invisible: '1'
            }
          }
        }
      }
    }
  },

  mail_channel_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.channel',
    type: 'tree',
    arch: {
      sheet: {
        name: {}
      }
    }
  },

  mail_channel_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.channel',
    type: 'search',
    arch: {
      name: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      }
    }
  },

  mail_channel_action_view: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Join a group',
    search_view_id: 'mail_channel_view_search',
    res_model: 'mail.channel',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

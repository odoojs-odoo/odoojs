export default {
  digest_digest_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'digest.digest',
    type: 'tree',
    arch: {
      sheet: {
        name: { string: 'Title' },
        periodicity: {},
        next_run_date: { groups: 'base.group_no_one' },
        company_id: { groups: 'base.group_multi_company' },
        state: {
          widget: 'badge',
          groups: 'base.group_no_one'
        }
      }
    }
  },

  digest_digest_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'digest.digest',
    type: 'form',
    arch: {
      header: {
        _button_action_send_manual: {
          _attr: {
            name: 'action_send_manual',
            type: 'object',
            string: 'Send Now',
            groups: 'base.group_system',
            invisible: [['state', '=', 'deactivated']],
            class: 'oe_highlight'
          }
        },
        _button_action_deactivate: {
          _attr: {
            name: 'action_deactivate',
            type: 'object',
            string: 'Deactivate',
            groups: 'base.group_system',
            invisible: [['state', '=', 'deactivated']]
          }
        },
        _button_action_activate: {
          _attr: {
            name: 'action_activate',
            type: 'object',
            string: 'Activate',
            groups: 'base.group_system',
            invisible: [['state', '=', 'activated']],
            class: 'oe_highlight'
          }
        },
        state: {
          widget: 'statusbar',
          statusbar_visible: '0'
        }
      },
      sheet: {
        is_subscribed: { invisible: '1' },
        _div_title: {
          _attr: { class: 'oe_title' },
          _label_name: {
            for: 'name',
            string: 'Digest Title'
          },
          _h1: {
            name: { placeholder: 'e.g. Your Weekly Digest' }
          }
        },
        _group: {
          _group: {
            periodicity: {
              widget: 'radio',
              options: "{'horizontal': true}"
            },
            company_id: {
              invisible: '1',
              no_create: true
            }
          },
          _group_631: {
            next_run_date: { groups: 'base.group_system' }
          }
        },
        _notebook: {
          _page_kpis: {
            _attr: {
              name: 'kpis',
              string: 'KPIs'
            },
            _group_kpis: {
              _attr: { name: 'kpis' },
              _group_kpi_general: {
                _attr: {
                  name: 'kpi_general',
                  string: 'General',
                  groups: 'base.group_system'
                },
                kpi_res_users_connected: {},
                kpi_mail_message_total: {}
              },
              _group_kpi_sales: {
                _attr: { name: 'kpi_sales' }
              },
              _group_custom: {
                _attr: {
                  name: 'custom',
                  string: 'Custom',
                  groups: 'base.group_system'
                },
                _div: {
                  _p: {
                    _attr: { text: 'Want to add your own KPIs?' },
                    _br: {},
                    _a: {
                      _attr: { text: 'Check our Documentation' },
                      _i: {
                        _attr: { class: 'fa fa-arrow-right' }
                      }
                    }
                  }
                }
              }
            }
          },
          _page_recipients: {
            _attr: {
              name: 'recipients',
              string: 'Recipients',
              groups: 'base.group_system'
            },
            user_ids: {
              no_create: true,
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: { string: 'Recipients' },
                      name: {},
                      email: { string: 'Email Address' }
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

  digest_digest_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'digest.digest',
    type: 'search',
    arch: {
      name: {},
      user_ids: {},
      _filter_filter_activated: {
        _attr: {
          name: 'filter_activated',
          string: 'Activated',
          domain: [['state', '=', 'activated']]
        }
      },
      _filter_filter_deactivated: {
        _attr: {
          name: 'filter_deactivated',
          string: 'Deactivated',
          domain: [['state', '=', 'deactivated']]
        }
      },
      _group: {
        _attr: { string: 'Group by' },
        _filter_periodicity: {
          _attr: {
            name: 'periodicity',
            string: 'Periodicity',
            context: { group_by: 'periodicity' }
          }
        }
      }
    }
  },

  digest_digest_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Digest Emails',
    res_model: 'digest.digest',
    search_view_id: 'digest_digest_view_search',
    context: { search_default_filter_activated: 1 },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

export default {
  sms_template_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'sms.template',
    type: 'form',
    arch: {
      header: {
        template_fs: { invisible: '1' },
        _button_sms_template_reset_action: {
          _attr: {
            name: 'sms_template_reset_action',
            type: 'action',
            string: 'Reset Template',
            groups: 'base.group_system',
            invisible: [['template_fs', '=', false]]
          }
        }
      },
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          sidebar_action_id: { invisible: '1' },
          _button_action_create_sidebar_action: {
            _attr: {
              name: 'action_create_sidebar_action',
              type: 'object',
              icon: 'fa-plus',
              help: 'Add a contextual action on the related model to open a sms composer with this template',
              groups: 'base.group_no_one',
              invisible: [['sidebar_action_id', '!=', false]],
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_field_widget o_stat_info' },
              _span: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Add'
                }
              },
              _span_153: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Context Action'
                }
              }
            }
          },
          _button_action_unlink_sidebar_action: {
            _attr: {
              name: 'action_unlink_sidebar_action',
              type: 'object',
              icon: 'fa-minus',
              help: 'Remove the contextual action of the related model',
              groups: 'base.group_no_one',
              invisible: [['sidebar_action_id', '=', false]],
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_field_widget o_stat_info' },
              _span: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Remove'
                }
              },
              _span_198: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Context Action'
                }
              }
            }
          },
          _button_sms_template_preview_action: {
            _attr: {
              name: 'sms_template_preview_action',
              type: 'action',
              string: 'Preview',
              icon: 'fa-search-plus',
              class: 'oe_stat_button'
            }
          }
        },
        _div_title: {
          _attr: { class: 'oe_title' },
          _label_name: {
            for: 'name',
            string: 'SMS Template'
          },
          _h1: {
            name: {
              required: '1',
              placeholder: 'e.g. Calendar Reminder'
            }
          },
          _group: {
            model_id: {
              required: '1',
              placeholder: 'e.g. Contact',
              no_create: true
            },
            model: { invisible: '1' },
            lang: {
              groups: 'base.group_no_one',
              placeholder: 'e.g. en_US or {{ object.partner_id.lang }}'
            }
          }
        },
        _notebook: {
          _page_content: {
            _attr: {
              name: 'content',
              string: 'Content'
            },
            _group: {
              body: { widget: 'sms_widget' }
            }
          }
        }
      }
    }
  },

  sms_template_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'sms.template',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        model_id: {}
      }
    }
  },

  sms_template_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'sms.template',
    type: 'search',
    arch: {
      name: {},
      model_id: {}
    }
  },

  sms_template_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Templates',
    res_model: 'sms.template',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

export default {
  mail_activity_type_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.activity.type',
    type: 'form',
    arch: {
      sheet: {
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
            class: 'oe_edit_only'
          },
          _h1: {
            name: { placeholder: 'e.g. Schedule a meeting' }
          }
        },
        _group: {
          _group_activity_details: {
            _attr: {
              name: 'activity_details',
              string: 'Activity Settings'
            },
            active: { invisible: '1' },
            category: {},
            default_user_id: {
              domain: [['share', '=', false]],
              no_create: true
            },
            res_model: { groups: 'base.group_no_one' },
            _field_res_model_580: {
              res_model: { invisible: '1' }
            },
            res_model_change: { invisible: '1' },
            initial_res_model: { invisible: '1' },
            summary: { placeholder: 'e.g. "Discuss proposal"' },
            icon: { groups: 'base.group_no_one' },
            decoration_type: { groups: 'base.group_no_one' }
          },
          _group_activity_planning: {
            _attr: {
              name: 'activity_planning',
              string: 'Next Activity'
            },
            chaining_type: { invisible: [['category', '=', 'upload_file']] },
            triggered_next_type_id: {
              required: ['&', ['chaining_type', '=', 'trigger'], ['category', '!=', 'upload_file']],
              invisible: ['&', ['chaining_type', '=', 'suggest'], ['category', '!=', 'upload_file']],
              context: { todo_ctx: "{'default_res_model': res_model}" },
              no_open: true
            },
            suggested_next_type_ids: {
              widget: 'many2many_tags',
              invisible: ['|', ['chaining_type', '=', 'trigger'], ['category', '=', 'upload_file']],
              context: { todo_ctx: "{'default_res_model': res_model}" }
            },
            mail_template_ids: {
              widget: 'many2many_tags',
              domain: { todo_ctx: "[('model_id.model', '=', res_model)]" },
              invisible: [['res_model', '=', false]],
              context: { todo_ctx: "{'default_model': res_model}" }
            },
            _label_delay_count: { for: 'delay_count' },
            _div: {
              delay_count: { class: 'oe_inline pe-1 o_input_3ch' },
              delay_unit: { class: 'oe_inline ps-1 pe-2' },
              delay_from: { class: 'oe_inline' }
            }
          }
        },
        _label_default_note: {
          for: 'default_note',
          class: 'fw-bold'
        },
        default_note: {
          class: 'oe-bordered-editor',
          placeholder: 'e.g. "Go over the offer and discuss details"'
        },
        _p: {
          _attr: {
            invisible: [['res_model_change', '=', false]],
            class: 'alert alert-info',
            text: 'Modifying the model can have an impact on existing activities using this activity type, be careful.'
          }
        }
      }
    }
  },

  mail_activity_type_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.activity.type',
    type: 'search',
    arch: {
      name: {},
      _filter_archived: {
        _attr: {
          name: 'archived',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      }
    }
  },

  mail_activity_type_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.activity.type',
    type: 'tree',
    arch: {
      sheet: {
        sequence: { widget: 'handle' },
        name: {},
        summary: {},
        delay_label: {
          string: 'Planned in',
          class: 'text-end'
        },
        delay_from: { string: 'Type' },
        res_model: { groups: 'base.group_no_one' },
        icon: { groups: 'base.group_no_one' }
      }
    }
  },

  mail_activity_type_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Activity Types',
    res_model: 'mail.activity.type',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

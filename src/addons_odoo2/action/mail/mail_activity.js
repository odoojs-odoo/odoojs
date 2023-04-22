export default {
  mail_activity_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Activities',
    res_model: 'mail.activity',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  mail_activity_view_form_popup: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.activity',
    type: 'form',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            invisible: '1',
            class: 'oe_button_box'
          },
          _button_action_open_document: {
            _attr: {
              name: 'action_open_document',
              type: 'object',
              string: 'Open Document',
              icon: 'fa-file-text-o',
              invisible: ['|', ['res_model', '=', false], ['res_id', '=', 0]],
              class: 'oe_link'
            }
          }
        },
        _group: {
          _attr: { invisible: '1' },
          activity_category: { invisible: '1' },
          res_model: { invisible: '1' },
          res_model_id: { invisible: '1' },
          res_id: { invisible: '1' },
          chaining_type: { invisible: '1' },
          previous_activity_type_id: {},
          has_recommended_activities: {}
        },
        _group_235: {
          _attr: { invisible: [['has_recommended_activities', '=', false]] },
          recommended_activity_type_id: {
            string: 'Recommended Activities',
            widget: 'selection_badge',
            domain: { todo_ctx: "[('previous_type_ids', '=', previous_activity_type_id)]" }
          }
        },
        _group_531: {
          _group: {
            activity_type_id: {
              required: '1',
              no_create: true,
              no_open: true
            },
            summary: { placeholder: 'e.g. Discuss proposal' }
          },
          _group_612: {
            date_deadline: {},
            user_id: {}
          }
        },
        note: {
          class: 'oe-bordered-editor',
          placeholder: 'Log a note...'
        },
        _footer: {
          id: { invisible: '1' },
          _button_action_close_dialog: {
            _attr: {
              name: 'action_close_dialog',
              type: 'object',
              string: 'Schedule',
              invisible: [['id', '!=', false]],
              class: 'btn-primary'
            }
          },
          _button_action_close_dialog_999: {
            _attr: {
              name: 'action_close_dialog',
              type: 'object',
              string: 'Save',
              invisible: [['id', '=', false]],
              class: 'btn-primary'
            }
          },
          _button_action_done: {
            _attr: {
              name: 'action_done',
              type: 'object',
              string: 'Mark as Done',
              invisible: [['chaining_type', '=', 'trigger']],
              context: { mail_activity_quick_update: true },
              class: 'btn-secondary'
            }
          },
          _button_action_done_schedule_next: {
            _attr: {
              name: 'action_done_schedule_next',
              type: 'object',
              string: 'Done & Schedule Next',
              invisible: [['chaining_type', '=', 'trigger']],
              context: { mail_activity_quick_update: true },
              class: 'btn-secondary'
            }
          },
          _button_action_done_schedule_next_382: {
            _attr: {
              name: 'action_done_schedule_next',
              type: 'object',
              string: 'Done & Launch Next',
              invisible: [['chaining_type', '=', 'suggest']],
              context: { mail_activity_quick_update: true },
              class: 'btn-secondary'
            }
          },
          _button: {
            _attr: {
              string: 'Discard',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  },

  mail_activity_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.activity',
    inherit_id: 'mail.mail_activity_view_form_popup',
    arch: {
      sheet: {
        activity_type_id: {
          position: 'before',
          __todo__before: {
            res_name: {
              string: 'Document',
              readonly: '1'
            }
          }
        },
        _footer: {
          _attr: { position: 'replace' }
        },
        _xpath: {
          _attr: {
            expr: "//div[hasclass('oe_button_box')]",
            position: 'attributes'
          },
          _attribute_invisible: {
            _attr: {
              name: 'invisible',
              text: '0',
              invisible: '0'
            }
          }
        }
      }
    }
  },

  mail_activity_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.activity',
    type: 'search',
    arch: {
      res_model: {},
      summary: {},
      activity_type_id: {},
      _filter_activities_overdue: {
        _attr: {
          name: 'activities_overdue',
          string: 'Late Activities',
          help: 'Show all records which has next action date is before today',
          invisible: '1',
          domain: { todo_ctx: "[('date_deadline', '<', context_today().strftime('%Y-%m-%d'))]" }
        }
      },
      _filter_activities_today: {
        _attr: {
          name: 'activities_today',
          string: 'Today Activities',
          invisible: '1',
          domain: { todo_ctx: "[('date_deadline', '=', context_today().strftime('%Y-%m-%d'))]" }
        }
      },
      _filter_activities_upcoming_all: {
        _attr: {
          name: 'activities_upcoming_all',
          string: 'Future Activities',
          invisible: '1',
          domain: { todo_ctx: "[('date_deadline', '>', context_today().strftime('%Y-%m-%d'))                         ]" }
        }
      },
      _group: {
        _attr: { string: 'Group By' },
        _filter_date_deadline: {
          _attr: {
            name: 'date_deadline',
            string: 'Deadline',
            context: { group_by: 'date_deadline' }
          }
        },
        _filter_createdby: {
          _attr: {
            name: 'createdby',
            string: 'Created By',
            context: { group_by: 'create_uid' }
          }
        },
        _filter_activittype: {
          _attr: {
            name: 'activittype',
            string: 'Activity Type',
            context: { group_by: 'activity_type_id' }
          }
        }
      }
    }
  },

  mail_activity_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.activity',
    type: 'tree',
    arch: {
      sheet: {
        res_name: {},
        activity_type_id: {},
        summary: {},
        date_deadline: {}
      }
    }
  },

  mail_activity_action_view_tree: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'tree',
    act_window_id: 'mail.mail_activity_action'
  },

  mail_activity_action_view_form: {
    _odoo_model: 'ir.actions.act_window.view',
    view_mode: 'form',
    view_id: 'mail.mail_activity_view_form',
    act_window_id: 'mail.mail_activity_action'
  },

  mail_activity_view_calendar: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.activity',
    type: 'otherview',
    arch: {}
  }
}

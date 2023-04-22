export default {
  view_note_note_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'note.note',
    type: 'otherview',
    arch: {}
  },

  view_note_note_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'note.note',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        open: {},
        stage_id: {},
        tag_ids: {
          widget: 'many2many_tags',
          color_field: 'color'
        },
        activity_ids: {
          widget: 'list_activity',
          optional: 'show'
        }
      }
    }
  },

  view_note_note_form: {
    _odoo_model: 'ir.ui.view',
    model: 'note.note',
    type: 'form',
    arch: {
      header: {
        tag_ids: {
          widget: 'many2many_tags',
          placeholder: 'Tags',
          color_field: 'color'
        },
        company_id: { groups: 'base.group_multi_company' },
        stage_id: {
          widget: 'statusbar',
          domain: { todo_ctx: "[('user_id','=',uid)]" },
          clickable: '1'
        }
      },
      sheet: {
        memo: {
          class: 'oe_memo',
          options: "{'resizable': false, 'collaborative': true}"
        }
      }
    }
  },

  view_note_note_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'note.note',
    type: 'search',
    arch: {
      memo: { string: 'Note' },
      tag_ids: {},
      _filter_open_true: {
        _attr: {
          name: 'open_true',
          string: 'Active',
          domain: [['open', '=', true]]
        }
      },
      _filter_open_false: {
        _attr: {
          name: 'open_false',
          string: 'Archive',
          domain: [['open', '=', false]]
        }
      },
      _filter_activities_overdue: {
        _attr: {
          name: 'activities_overdue',
          string: 'Late Activities',
          help: 'Show all records which has next action date is before today',
          invisible: '1',
          domain: { todo_ctx: "[('my_activity_date_deadline', '<', context_today().strftime('%Y-%m-%d'))]" }
        }
      },
      _filter_activities_today: {
        _attr: {
          name: 'activities_today',
          string: 'Today Activities',
          invisible: '1',
          domain: { todo_ctx: "[('my_activity_date_deadline', '=', context_today().strftime('%Y-%m-%d'))]" }
        }
      },
      _filter_activities_upcoming_all: {
        _attr: {
          name: 'activities_upcoming_all',
          string: 'Future Activities',
          invisible: '1',
          domain: { todo_ctx: "[('my_activity_date_deadline', '>', context_today().strftime('%Y-%m-%d'))                         ]" }
        }
      },
      _group: {
        _attr: { string: 'Group By' },
        _filter_stage: {
          _attr: {
            name: 'stage',
            string: 'Stage',
            help: 'By sticky note Category',
            context: { group_by: 'stage_id' }
          }
        }
      }
    }
  },

  action_note_note: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Notes',
    res_model: 'note.note',
    search_view_id: 'view_note_note_filter',
    context: {},
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

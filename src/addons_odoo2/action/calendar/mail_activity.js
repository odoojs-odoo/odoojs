export default {
  mail_activity_view_form_popup: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.activity',
    inherit_id: 'mail.mail_activity_view_form_popup',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='date_deadline']",
            position: 'attributes'
          },
          _attribute_attrs: {
            _attr: {
              name: 'attrs',
              text: "{'invisible': [('activity_category', '=', 'meeting')]}",
              attrs: "{'invisible': [('activity_category', '=', 'meeting')]}"
            }
          }
        },
        _xpath_293: {
          _attr: {
            expr: "//field[@name='user_id']",
            position: 'attributes'
          },
          _attribute_attrs: {
            _attr: {
              name: 'attrs',
              text: "{'invisible': [('activity_category', '=', 'meeting')]}",
              attrs: "{'invisible': [('activity_category', '=', 'meeting')]}"
            }
          }
        },
        _xpath_177: {
          _attr: {
            expr: "//button[@id='mail_activity_schedule']",
            position: 'attributes'
          },
          _attribute_attrs: {
            _attr: {
              name: 'attrs',
              text: "{'invisible': ['|', ('activity_category', 'in', ['meeting', 'phonecall']), ('id', '!=', False)]}",
              attrs: "{'invisible': ['|', ('activity_category', 'in', ['meeting', 'phonecall']), ('id', '!=', False)]}"
            }
          }
        },
        _xpath_896: {
          _attr: {
            expr: "//button[@id='mail_activity_save']",
            position: 'attributes'
          },
          _attribute_attrs: {
            _attr: {
              name: 'attrs',
              text: "{'invisible': [('activity_category', '!=', 'phonecall'), ('id', '=', False)]}",
              attrs: "{'invisible': [('activity_category', '!=', 'phonecall'), ('id', '=', False)]}"
            }
          }
        },
        _xpath_171: {
          _attr: {
            expr: "//button[@name='action_done']",
            position: 'attributes'
          },
          _attribute_attrs: {
            _attr: {
              name: 'attrs',
              text: "{'invisible': ['|', ('activity_category', '=', 'meeting'), ('chaining_type', '=', 'trigger')]}",
              attrs: "{'invisible': ['|', ('activity_category', '=', 'meeting'), ('chaining_type', '=', 'trigger')]}"
            }
          }
        },
        _xpath_994: {
          _attr: {
            expr: "//field[@name='note']",
            position: 'attributes'
          },
          _attribute_attrs: {
            _attr: {
              name: 'attrs',
              text: "{'invisible': [('activity_category', '=', 'meeting')]}",
              attrs: "{'invisible': [('activity_category', '=', 'meeting')]}"
            }
          }
        },
        _xpath_265: {
          _attr: {
            expr: "//button[@name='action_close_dialog']",
            position: 'before'
          },
          calendar_event_id: { invisible: '1' },
          _button_action_create_calendar_event: {
            _attr: {
              name: 'action_create_calendar_event',
              type: 'object',
              string: 'Open Calendar',
              invisible: ['|', ['activity_category', 'not in', ['meeting', 'phonecall']], ['calendar_event_id', '!=', false]],
              class: 'btn-primary'
            }
          }
        }
      }
    }
  }
}

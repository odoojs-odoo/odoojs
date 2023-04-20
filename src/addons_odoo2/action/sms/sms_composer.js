export default {
  res_partner_act_window_sms_composer_multi: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Send SMS Text Message',
    res_model: 'sms.composer',
    search_view_id: 'tooooooodoooooo',
    context: {
      todo_ctx: "{\n            'default_composition_mode': 'mass',\n            'default_mass_keep_log': True,\n            'default_res_ids': active_ids\n        }"
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  res_partner_act_window_sms_composer_single: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Send SMS Text Message',
    res_model: 'sms.composer',
    search_view_id: 'tooooooodoooooo',
    context: {
      todo_ctx: "{\n            'default_composition_mode': 'comment',\n            'default_res_id': active_id,\n        }"
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  sms_composer_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'sms.composer',
    type: 'form',
    arch: {
      sheet: {
        _div: {
          _attr: {
            invisible: ['|', '|', ['res_model_description', '=', false], ['comment_single_recipient', '=', false], ['recipient_single_valid', '=', true]],
            class: 'alert alert-danger text-center mb-0'
          },
          _p: {
            _attr: {
              class: 'my-0'
            },
            _strong: 'Invalid number:',
            _span: 'make sure to set a country on the',
            _span_507: {
              res_model_description: {}
            },
            _span_610: 'or to specify the country code.'
          }
        },
        _div_469: {
          _attr: {
            invisible: ['|', ['comment_single_recipient', '=', true], ['recipient_invalid_count', '=', 0]],
            class: 'alert alert-info text-center mb-0'
          },
          _p: {
            _attr: {
              class: 'my-0'
            },
            recipient_invalid_count: {
              class: 'oe_inline fw-bold'
            },
            res_ids_count: {
              class: 'oe_inline fw-bold'
            }
          }
        },
        _footer: {
          _button_action_send_sms: {
            _attr: {
              name: 'action_send_sms',
              type: 'object',
              string: 'Send SMS',
              invisible: ['|', ['composition_mode', 'not in', ('comment', 'numbers')], ['recipient_single_valid', '=', false]],
              class: 'oe_highlight'
            }
          },
          _button_action_send_sms_229: {
            _attr: {
              name: 'action_send_sms',
              type: 'object',
              string: 'Send SMS',
              invisible: ['|', ['composition_mode', 'not in', ('comment', 'numbers')], ['recipient_single_valid', '=', true]],
              class: 'oe_highlight'
            }
          },
          _button_action_send_sms_718: {
            _attr: {
              name: 'action_send_sms',
              type: 'object',
              string: 'Put in queue',
              invisible: [['composition_mode', '!=', 'mass']],
              class: 'oe_highlight'
            }
          },
          _button_action_send_sms_mass_now: {
            _attr: {
              name: 'action_send_sms_mass_now',
              type: 'object',
              string: 'Send Now',
              invisible: [['composition_mode', '!=', 'mass']]
            }
          },
          _button: {
            _attr: {
              string: 'Close',
              class: 'btn btn-secondary'
            }
          }
        },
        _group: {
          composition_mode: {
            invisible: '1'
          },
          comment_single_recipient: {
            invisible: '1'
          },
          res_id: {
            invisible: '1'
          },
          res_ids: {
            invisible: '1'
          },
          res_model: {
            invisible: '1'
          },
          mass_force_send: {
            invisible: '1'
          },
          recipient_single_valid: {
            invisible: '1'
          },
          recipient_single_number: {
            invisible: '1'
          },
          number_field_name: {
            invisible: '1'
          },
          numbers: {
            invisible: '1'
          },
          sanitized_numbers: {
            invisible: '1'
          },
          _label_recipient_single_description: {
            for: 'recipient_single_description',
            string: 'Recipient',
            invisible: [['comment_single_recipient', '=', false]],
            class: 'fw-bold'
          },
          _div: {
            _attr: {
              invisible: [['comment_single_recipient', '=', false]]
            },
            recipient_single_description: {
              class: 'oe_inline'
            },
            recipient_single_number_itf: {
              class: 'oe_inline',
              placeholder: 'e.g. +1 415 555 0100'
            }
          },
          body: {
            widget: 'sms_widget',
            invisible: ['|', ['comment_single_recipient', '=', false], ['recipient_single_valid', '=', true]]
          },
          _field_body_176: {
            body: {
              widget: 'sms_widget',
              invisible: [['comment_single_recipient', '=', true], ['recipient_single_valid', '=', false]]
            }
          },
          mass_keep_log: {
            invisible: '1'
          }
        }
      }
    }
  },

  sms_composer_action_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Send SMS Text Message',
    res_model: 'sms.composer',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

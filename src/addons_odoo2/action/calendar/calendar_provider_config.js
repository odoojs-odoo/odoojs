export default {
  calendar_provider_config_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'calendar.provider.config',
    type: 'form',
    arch: {
      sheet: {
        external_calendar_provider: {
          widget: 'radio',
          options: "{'horizontal': true}"
        },
        _div: {
          _attr: { invisible: [['external_calendar_provider', '!=', 'google']] },
          _img: {},
          _span: {
            _attr: {
              class: 'me-1 o_form_label',
              text: 'Google Calendar'
            }
          },
          _a: {
            _attr: {
              title: 'Read More',
              class: 'o_doc_link'
            }
          },
          _div: {
            _attr: {
              class: 'text-muted mt-2',
              text: 'Synchronize your calendar with Google Calendar'
            }
          },
          _group: {
            cal_client_id: { required: [['external_calendar_provider', '=', 'google']] },
            cal_client_secret: { required: [['external_calendar_provider', '=', 'google']] }
          }
        },
        _div_471: {
          _attr: { invisible: [['external_calendar_provider', '!=', 'microsoft']] },
          _img: {},
          _span: {
            _attr: {
              class: 'me-1 o_form_label',
              text: 'Outlook Calendar'
            }
          },
          _a: {
            _attr: {
              title: 'Read More',
              class: 'o_doc_link'
            }
          },
          _div: {
            _attr: {
              class: 'text-muted mt-2',
              text: 'Synchronize your calendar with Outlook'
            }
          },
          _group: {
            microsoft_outlook_client_identifier: { required: [['external_calendar_provider', '=', 'microsoft']] },
            microsoft_outlook_client_secret: { required: [['external_calendar_provider', '=', 'microsoft']] }
          }
        },
        _footer: {
          _a: {
            _attr: {
              title: 'Connect',
              class: 'o_calendar_activate_external_cal btn btn-primary',
              text: 'Connect'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel',
              class: 'btn btn-secondary'
            }
          }
        }
      }
    }
  }
}

export default {
  sms_template_preview_form: {
    _odoo_model: 'ir.ui.view',
    model: 'sms.template.preview',
    type: 'form',
    arch: {
      sheet: {
        _h3: {
          _attr: { text: 'Preview of' },
          sms_template_id: {
            class: 'oe_inline',
            readonly: '1'
          }
        },
        no_record: { invisible: '1' },
        _div: {
          _attr: { class: 'o_row' },
          _span: {
            _attr: { text: 'Choose an example' },
            model_id: { readonly: '1' }
          },
          _div: {
            resource_ref: {
              invisible: [['no_record', '=', true]],
              class: 'oe_inline',
              hide_model: true,
              no_create: true,
              no_open: true
            },
            _span: {
              _attr: {
                invisible: [['no_record', '=', false]],
                class: 'text-warning',
                text: 'No records'
              }
            }
          }
        },
        _p: {
          _attr: { text: 'Choose a language:' },
          lang: { class: 'oe_inline ml8' }
        },
        _label_body: {
          for: 'body',
          string: 'SMS content'
        },
        _hr: {},
        body: {
          readonly: '1',
          safe: true
        },
        _hr_581: {},
        _footer: {
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

  sms_template_preview_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Template Preview',
    type: 'ir.actions.act_window',
    res_model: 'sms.template.preview',
    search_view_id: 'tooooooodoooooo',
    context: { todo_ctx: "{'default_sms_template_id':active_id}" },
    views: {
      tree: 'sms_template_preview_form',
      form: '=======todo=========='
    }
  }
}

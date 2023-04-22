export default {
  mail_template_preview_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.template.preview',
    type: 'form',
    arch: {
      sheet: {
        _h3: {
          _attr: { text: 'Preview of' },
          mail_template_id: {
            readonly: '1',
            no_open: true
          }
        },
        _div: {
          _attr: {
            invisible: [['error_msg', '=', false]],
            class: 'alert alert-danger'
          },
          error_msg: {}
        },
        no_record: { invisible: '1' },
        _div_163: {
          _attr: { class: 'container' },
          _div: {
            _attr: { class: 'row' },
            _span: {
              _attr: {
                class: 'col-md-5 col-lg-4 col-sm-12 ps-0',
                text: ['Choose an example', 'record:']
              },
              model_id: { readonly: '1' }
            },
            _div: {
              _attr: { class: 'col-md-7 col-lg-6 col-sm-12 ps-0' },
              resource_ref: {
                invisible: [['no_record', '=', true]],
                class: 'w-100',
                readonly: 'False',
                hide_model: true,
                no_create: true,
                no_open: true
              },
              _b: {
                _attr: {
                  invisible: [['no_record', '=', false]],
                  class: 'text-warning',
                  text: 'No record for this model'
                }
              }
            }
          },
          _div_733: {
            _attr: { class: 'row' },
            _span: {
              _attr: {
                class: 'col-md-5 col-lg-4 col-sm-12 ps-0',
                text: 'Force a language:'
              }
            },
            _div: {
              _attr: { class: 'col-md-7 col-lg-6 col-sm-12 ps-0' },
              lang: {
                class: 'w-100',
                placeholder: 'Select a language'
              }
            }
          }
        },
        _group: {
          subject: {},
          email_from: { invisible: [['email_from', '=', false]] },
          partner_ids: {
            widget: 'many2many_tags',
            invisible: [['partner_ids', '=', []]]
          },
          email_to: { invisible: [['email_to', '=', false]] },
          email_cc: { invisible: [['email_cc', '=', false]] },
          reply_to: { invisible: [['reply_to', '=', false]] },
          scheduled_date: { invisible: [['scheduled_date', '=', false]] }
        },
        body_html: {
          widget: 'html',
          safe: true
        },
        attachment_ids: { widget: 'many2many_binary' },
        _footer: {
          _button: {
            _attr: {
              string: 'Close',
              class: 'btn-secondary'
            }
          }
        }
      }
    }
  },

  mail_template_preview_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Template Preview',
    type: 'ir.actions.act_window',
    res_model: 'mail.template.preview',
    search_view_id: 'tooooooodoooooo',
    context: { todo_ctx: "{'default_mail_template_id':active_id}" },
    views: {
      tree: 'mail_template_preview_view_form',
      form: '=======todo=========='
    }
  }
}

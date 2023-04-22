export default {
  account_invoice_send_wizard_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.invoice.send',
    type: 'form',
    arch: {
      sheet: {
        _div: {
          _attr: {
            invisible: [['move_types', '=', false]],
            class: 'alert alert-warning',
            text: 'You have selected the following document types at the same time:'
          },
          move_types: {}
        },
        composition_mode: { invisible: '1' },
        invoice_ids: { invisible: '1' },
        email_from: { invisible: '1' },
        mail_server_id: { invisible: '1' },
        _div_option_print: {
          _attr: { name: 'option_print' },
          is_print: {},
          _b: {
            _label_is_print: { for: 'is_print' }
          },
          _div_info_form: {
            _attr: {
              name: 'info_form',
              invisible: ['|', ['is_print', '=', false], ['composition_mode', '=', 'mass_mail']],
              class: 'text-center text-muted d-inline-block',
              text: 'Preview as a PDF'
            }
          }
        },
        _div_option_email: {
          _attr: { name: 'option_email' },
          is_email: {},
          _b: {
            _label_is_email: { for: 'is_email' }
          }
        },
        _div_514: {
          _attr: {
            invisible: ['|', ['is_email', '=', false], ['invoice_without_email', '=', false]],
            class: 'text-start d-inline-block mr8'
          },
          invoice_without_email: { class: 'mr4' }
        },
        _div_mail_form: {
          _attr: {
            name: 'mail_form',
            invisible: [['is_email', '=', false]]
          },
          _div: {
            _attr: { invisible: [['composition_mode', '=', 'mass_mail']] },
            _group: {
              _label_partner_ids: {
                for: 'partner_ids',
                string: 'Recipients',
                groups: 'base.group_user'
              },
              _div: {
                _attr: { groups: 'base.group_user' },
                _span: {
                  _attr: {
                    invisible: [['composition_mode', '!=', 'mass_mail']],
                    text: 'on'
                  },
                  _strong: 'Email mass mailing',
                  _span: 'the selected records'
                },
                _span_374: 'Followers of the document and',
                partner_ids: {
                  widget: 'many2many_tags_email',
                  invisible: [['composition_mode', '=', 'mass_mail']],
                  context: {
                    force_email: true,
                    show_email: true
                  },
                  placeholder: 'Add contacts to notify...'
                }
              },
              subject: {
                required: [['is_email', '=', true], ['composition_mode', '=', 'comment']],
                placeholder: 'Subject...'
              }
            },
            body: {
              class: 'oe-bordered-editor',
              options: "{'style-inline': true}"
            }
          },
          _group: {
            _group: {
              _attr: { invisible: [['composition_mode', '=', 'mass_mail']] },
              attachment_ids: {
                string: 'Attach a file',
                widget: 'many2many_binary',
                invisible: [['composition_mode', '=', 'mass_mail']]
              }
            },
            _group_855: {
              template_id: {
                context: { default_model: 'account.move' },
                no_create: true,
                no_edit: true
              }
            }
          }
        },
        _footer: {
          _button_send_and_print_action: {
            _attr: {
              name: 'send_and_print_action',
              type: 'object',
              string: 'Send & Print',
              invisible: ['|', ['is_email', '=', false], ['is_print', '=', false]],
              class: 'send_and_print btn-primary o_mail_send'
            }
          },
          _button_send_and_print_action_395: {
            _attr: {
              name: 'send_and_print_action',
              type: 'object',
              string: 'Send',
              invisible: ['|', ['is_print', '=', true], ['is_email', '=', false]],
              class: 'send btn-primary o_mail_send'
            }
          },
          _button_send_and_print_action_518: {
            _attr: {
              name: 'send_and_print_action',
              type: 'object',
              string: 'Print',
              invisible: ['|', ['is_print', '=', false], ['is_email', '=', true]],
              class: 'print btn-primary o_mail_send'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel',
              class: 'btn-secondary'
            }
          },
          _button_save_as_template: {
            _attr: {
              name: 'save_as_template',
              type: 'object',
              string: 'Save as new template',
              icon: 'fa-lg fa-save',
              help: 'Save as a new template',
              invisible: ['|', ['composition_mode', '=', 'mass_mail'], ['is_email', '=', false]],
              class: 'float-end btn-secondary'
            }
          }
        }
      }
    }
  }
}

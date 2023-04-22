export default {
  action_partner_mass_mail: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Send email',
    res_model: 'mail.compose.message',
    search_view_id: 'tooooooodoooooo',
    context: "{                 'default_composition_mode': 'mass_mail',                 'default_partner_to': '{{ object.id or \'\' }}',                 'default_use_template': False,                 'default_reply_to_force_new': True,             }",
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  email_compose_message_wizard_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.compose.message',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          author_id: { invisible: '1' },
          auto_delete: { invisible: '1' },
          auto_delete_message: { invisible: '1' },
          composition_mode: { invisible: '1' },
          email_layout_xmlid: { invisible: '1' },
          is_log: { invisible: '1' },
          mail_server_id: { invisible: '1' },
          model: { invisible: '1' },
          parent_id: { invisible: '1' },
          record_name: { invisible: '1' },
          res_id: { invisible: '1' },
          subtype_id: { invisible: '1' },
          email_from: { invisible: [['composition_mode', '!=', 'mass_mail']] },
          _label_partner_ids: {
            for: 'partner_ids',
            string: 'Recipients',
            invisible: ['|', ['is_log', '=', true], ['composition_mode', '!=', 'comment']]
          },
          _div: {
            _attr: {
              groups: 'base.group_user',
              invisible: ['|', ['is_log', '=', true], ['composition_mode', '!=', 'comment']]
            },
            _span_document_followers_text: {
              _attr: {
                name: 'document_followers_text',
                invisible: ['|', ['model', '=', false], ['composition_mode', '=', 'mass_mail']],
                text: 'Followers of the document and'
              }
            },
            partner_ids: {
              widget: 'many2many_tags_email',
              context: {
                force_email: true,
                show_email: true
              },
              placeholder: 'Add contacts to notify...'
            }
          },
          subject: {
            required: 'True',
            placeholder: 'Welcome to MyCompany!'
          },
          notify: { invisible: [['composition_mode', '!=', 'mass_post']] }
        },
        can_edit_body: { invisible: '1' },
        _div: {
          _attr: { invisible: [['composition_mode', '=', 'mass_mail']] },
          body: {
            readonly: [['can_edit_body', '=', false]],
            class: 'oe-bordered-editor',
            placeholder: 'Write your message here...',
            force_save: '1',
            options: "{'style-inline': true}"
          },
          _group: {
            attachment_ids: {
              string: 'Attach a file',
              widget: 'many2many_binary'
            },
            template_id: {
              string: 'Load template',
              context: { todo_ctx: "{'default_model': model, 'default_body_html': body, 'default_subject': subject}" },
              no_create: true
            }
          }
        },
        _notebook: {
          _attr: { invisible: [['composition_mode', '!=', 'mass_mail']] },
          _page: {
            _attr: { string: 'Content' },
            _div: {
              body: {
                readonly: [['can_edit_body', '=', false]],
                class: 'oe-bordered-editor',
                placeholder: 'Write your message here...',
                force_save: '1',
                options: "{'style-inline': true}"
              },
              _group: {
                attachment_ids: {
                  string: 'Attach a file',
                  widget: 'many2many_binary'
                },
                template_id: {
                  string: 'Load template',
                  context: { todo_ctx: "{'default_model': model, 'default_body_html': body, 'default_subject': subject}" },
                  no_create: true
                }
              }
            }
          },
          _page_986: {
            _attr: { string: 'Settings' },
            reply_to_force_new: { invisible: '1' },
            reply_to_mode: {
              widget: 'radio',
              invisible: [['composition_mode', '!=', 'mass_mail']]
            },
            _group: {
              reply_to: {
                string: 'Reply-to Address',
                invisible: ['|', ['reply_to_mode', '=', 'update'], ['composition_mode', '!=', 'mass_mail']],
                required: [['reply_to_mode', '!=', 'update'], ['composition_mode', '=', 'mass_mail']],
                placeholder: 'e.g: "info@mycompany.odoo.com"'
              }
            }
          }
        },
        _footer: {
          _button_action_send_mail: {
            _attr: {
              name: 'action_send_mail',
              type: 'object',
              string: 'Send',
              invisible: [['is_log', '=', true]],
              class: 'btn-primary o_mail_send'
            }
          },
          _button_action_send_mail_713: {
            _attr: {
              name: 'action_send_mail',
              type: 'object',
              string: 'Log',
              invisible: [['is_log', '=', false]],
              class: 'btn-primary'
            }
          },
          _button: {
            _attr: {
              string: 'Cancel',
              class: 'btn-secondary'
            }
          },
          _button_action_save_as_template: {
            _attr: {
              name: 'action_save_as_template',
              type: 'object',
              string: 'Save as new template',
              icon: 'fa-lg fa-save',
              help: 'Save as a new template',
              invisible: [['can_edit_body', '=', false]],
              class: 'float-end btn-secondary'
            }
          }
        }
      }
    }
  },

  action_email_compose_message_wizard: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Compose Email',
    type: 'ir.actions.act_window',
    res_model: 'mail.compose.message',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

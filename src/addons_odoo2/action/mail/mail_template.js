export default {
  email_template_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.template',
    type: 'form',
    arch: {
      header: {
        template_fs: { invisible: '1' },
        _button_mail_template_reset_action: {
          _attr: {
            name: 'mail_template_reset_action',
            type: 'action',
            string: 'Reset Template',
            groups: 'mail.group_mail_template_editor',
            invisible: [['template_fs', '=', false]]
          }
        }
      },
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          ref_ir_act_window: { invisible: '1' },
          _button_create_action: {
            _attr: {
              name: 'create_action',
              type: 'object',
              icon: 'fa-plus',
              help: 'Display an option on related documents to open a composition wizard with this template',
              groups: 'base.group_no_one',
              invisible: [['ref_ir_act_window', '!=', false]],
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_field_widget o_stat_info' },
              _span: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Add'
                }
              },
              _span_419: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Context Action'
                }
              }
            }
          },
          _button_unlink_action: {
            _attr: {
              name: 'unlink_action',
              type: 'object',
              icon: 'fa-minus',
              help: 'Remove the contextual action to use this template on related documents',
              groups: 'base.group_no_one',
              invisible: [['ref_ir_act_window', '=', false]],
              class: 'oe_stat_button'
            },
            _div: {
              _attr: { class: 'o_field_widget o_stat_info' },
              _span: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Remove'
                }
              },
              _span_291: {
                _attr: {
                  class: 'o_stat_text',
                  text: 'Context Action'
                }
              }
            }
          },
          _button_mail_template_preview_action: {
            _attr: {
              name: 'mail_template_preview_action',
              type: 'action',
              string: 'Preview',
              icon: 'fa-search-plus',
              class: 'oe_stat_button'
            }
          }
        },
        _div_title: {
          _attr: { class: 'oe_title' },
          _label_name: { for: 'name' },
          _h1: {
            name: {
              class: 'w-100',
              required: '1',
              placeholder: 'e.g. "Welcome email"'
            }
          },
          _group: {
            model_id: {
              required: '1',
              placeholder: 'e.g. Contact',
              no_create: true
            },
            subject: { placeholder: 'e.g. "Welcome to MyCompany" or "Nice to meet you, {{ object.name }}"' },
            model: { invisible: '1' },
            description: {}
          }
        },
        _notebook: {
          _page_content: {
            _attr: {
              name: 'content',
              string: 'Content'
            },
            can_write: { invisible: '1' },
            body_html: {
              widget: 'html',
              readonly: [['can_write', '=', false], ['id', '!=', false]],
              class: 'oe-bordered-editor',
              options: "{'style-inline': true, 'codeview': true, 'dynamic_placeholder': true}"
            },
            attachment_ids: { widget: 'many2many_binary' }
          },
          _page_email_configuration: {
            _attr: {
              name: 'email_configuration',
              string: 'Email Configuration'
            },
            _group: {
              email_from: { placeholder: "Override author's email" },
              use_default_to: {},
              email_to: {
                invisible: [['use_default_to', '=', true]],
                placeholder: 'Comma-separated recipient addresses'
              },
              partner_to: {
                invisible: [['use_default_to', '=', true]],
                placeholder: 'Comma-separated ids of recipient partners'
              },
              email_cc: {
                invisible: [['use_default_to', '=', true]],
                placeholder: 'Comma-separated carbon copy recipients addresses'
              },
              reply_to: { placeholder: 'Email address to which replies will be redirected when sending emails in mass' },
              scheduled_date: { string: 'Scheduled Send Date' }
            }
          },
          _page_email_settings: {
            _attr: {
              name: 'email_settings',
              string: 'Settings'
            },
            _group: {
              lang: { placeholder: '{{ object.partner_id.lang }}' },
              mail_server_id: {},
              auto_delete: {},
              report_template: {
                domain: { todo_ctx: "[('model','=',model)]" }
              },
              report_name: { invisible: [['report_template', '=', false]] }
            }
          }
        }
      }
    }
  },

  email_template_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.template',
    type: 'tree',
    arch: {
      sheet: {
        mail_server_id: { invisible: '1' },
        name: {},
        model_id: { groups: 'base.group_no_one' },
        description: {},
        subject: { optional: 'hidden' },
        email_from: { optional: 'hidden' },
        email_to: { optional: 'hidden' },
        partner_to: { optional: 'hidden' },
        report_name: { optional: 'hidden' }
      }
    }
  },

  view_email_template_search: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.template',
    type: 'search',
    arch: {
      name: {
        string: 'Templates',
        filter_domain: { todo_ctx: "['|', '|', '|',('name','ilike',self), ('report_name','ilike',self), ('subject','ilike',self), ('email_to','ilike',self)]" }
      },
      lang: {},
      model_id: {},
      _filter_base_templates: {
        _attr: {
          name: 'base_templates',
          string: 'Base Templates',
          domain: [['template_category', '=', 'base_template']]
        }
      },
      _filter_custom_templates: {
        _attr: {
          name: 'custom_templates',
          string: 'Custom Templates',
          domain: [['template_category', '=', 'custom_template']]
        }
      },
      _group: {
        _attr: { string: 'Group by...' },
        _filter_smtpserver: {
          _attr: {
            name: 'smtpserver',
            string: 'SMTP Server',
            domain: [],
            context: { group_by: 'mail_server_id' }
          }
        },
        _filter_model: {
          _attr: {
            name: 'model',
            string: 'Model',
            domain: [],
            context: { group_by: 'model_id' }
          }
        }
      }
    }
  },

  action_email_template_tree_all: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Email Templates',
    res_model: 'mail.template',
    search_view_id: 'view_email_template_search',
    context: { search_default_base_templates: 1 },
    views: {
      tree: 'email_template_tree',
      form: '=======todo=========='
    }
  }
}

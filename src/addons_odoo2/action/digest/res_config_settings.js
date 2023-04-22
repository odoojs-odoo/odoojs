export default {
  res_config_settings_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.config.settings',
    inherit_id: 'base_setup.res_config_settings_view_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//div[@id='contacts_settings']",
            position: 'before'
          },
          _div: {
            _h2: 'Statistics',
            _div: {
              _attr: { class: 'row mt16 o_settings_container' },
              _div_digest_email_setting_container: {
                _attr: {
                  name: 'digest_email_setting_container',
                  title: 'New users are automatically added as recipient of the following digest email.',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  digest_emails: {}
                },
                _div_922: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_digest_emails: {
                    for: 'digest_emails',
                    string: 'Digest Email'
                  },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'ms-1 o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Add new users as recipient of a periodic email with key metrics'
                    }
                  },
                  _div_150: {
                    _attr: {
                      invisible: [['digest_emails', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: { class: 'mt16' },
                      _label_digest_id: {
                        for: 'digest_id',
                        class: 'o_light_label'
                      },
                      digest_id: { class: 'oe_inline' }
                    },
                    _div_164: {
                      _attr: { class: 'mt8' },
                      _button_digest__digest_digest_action: {
                        _attr: {
                          name: 'digest.digest_digest_action',
                          type: 'action',
                          string: 'Configure Digest Emails',
                          icon: 'fa-arrow-right',
                          class: 'btn-link'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

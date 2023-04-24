export default {
  view_company_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.company',
    type: 'form',
    arch: {
      sheet: {
        logo: {
          widget: 'image',
          class: 'oe_avatar'
        },
        _div_title: {
          _attr: { class: 'oe_title' },
          _label_name: { for: 'name' },
          _h1: {
            name: { placeholder: 'e.g. My Company' }
          }
        },
        _notebook: {
          _page_general_info: {
            _attr: {
              name: 'general_info',
              string: 'General Information'
            },
            _group: {
              _group: {
                partner_id: {
                  string: 'Contact',
                  groups: 'base.group_no_one',
                  required: '0',
                  readonly: '1'
                },
                _label_street: {
                  for: 'street',
                  string: 'Address'
                },
                _div: {
                  _attr: { class: 'o_address_format' },
                  street: {
                    class: 'o_address_street',
                    placeholder: 'Street...'
                  },
                  street2: {
                    class: 'o_address_street',
                    placeholder: 'Street 2...'
                  },
                  city: {
                    class: 'o_address_city',
                    placeholder: 'City'
                  },
                  state_id: {
                    class: 'o_address_state',
                    placeholder: 'State',
                    no_open: true
                  },
                  zip: {
                    class: 'o_address_zip',
                    placeholder: 'ZIP'
                  },
                  country_id: {
                    class: 'o_address_country',
                    placeholder: 'Country',
                    no_open: true,
                    no_create: true
                  }
                },
                vat: {},
                company_registry: {},
                currency_id: {
                  context: { active_test: false },
                  no_create: true,
                  no_open: true
                }
              },
              _group_873: {
                phone: { class: 'o_force_ltr' },
                mobile: { class: 'o_force_ltr' },
                email: {},
                website: {
                  string: 'Website',
                  widget: 'url',
                  placeholder: 'e.g. https://www.odoo.com'
                },
                parent_id: { groups: 'base.group_multi_company' },
                sequence: { invisible: '1' },
                favicon: {
                  widget: 'image',
                  groups: 'base.group_no_one',
                  class: 'float-start oe_avatar'
                }
              },
              _group_social_media: {
                _attr: { name: 'social_media' }
              }
            }
          }
        }
      }
    }
  },

  view_company_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.company',
    type: 'tree',
    arch: {
      sheet: {
        sequence: { widget: 'handle' },
        name: {},
        partner_id: {}
      }
    }
  },

  view_res_company_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'res.company',
    type: 'otherview',
    arch: {}
  },

  action_res_company_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Companies',
    type: 'ir.actions.act_window',
    res_model: 'res.company',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  },

  base_onboarding_company_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.company',
    inherit_id: 'base.view_company_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//group[@name='social_media']",
            position: 'replace'
          }
        },
        _form: {
          _attr: { position: 'inside' },
          _footer: {
            _attr: { position: 'replace' },
            _button_action_save_onboarding_company_step: {
              _attr: {
                name: 'action_save_onboarding_company_step',
                type: 'object',
                string: 'Apply',
                class: 'btn btn-primary'
              }
            },
            _button: {
              _attr: { string: 'Cancel' }
            }
          }
        }
      }
    }
  },

  action_open_base_onboarding_company: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Set your company data',
    type: 'ir.actions.act_window',
    res_model: 'res.company',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: 'base_onboarding_company_form',
      form: '=======todo=========='
    }
  }
}

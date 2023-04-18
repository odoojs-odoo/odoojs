export default {
  payment_provider_form: {
    _odoo_model: 'ir.ui.view',
    model: 'payment.provider',
    type: 'form',
    arch: {
      sheet: {
        company_id: {
          invisible: '1'
        },
        is_published: {
          invisible: '1'
        },
        main_currency_id: {
          invisible: '1'
        },
        support_fees: {
          invisible: '1'
        },
        support_manual_capture: {
          invisible: '1'
        },
        support_tokenization: {
          invisible: '1'
        },
        support_express_checkout: {
          invisible: '1'
        },
        module_id: {
          invisible: '1'
        },
        module_state: {
          invisible: '1'
        },
        module_to_buy: {
          invisible: '1'
        },
        show_credentials_page: {
          invisible: '1'
        },
        show_allow_express_checkout: {
          invisible: '1'
        },
        show_allow_tokenization: {
          invisible: '1'
        },
        show_payment_icon_ids: {
          invisible: '1'
        },
        show_pre_msg: {
          invisible: '1'
        },
        show_pending_msg: {
          invisible: '1'
        },
        show_auth_msg: {
          invisible: '1'
        },
        show_done_msg: {
          invisible: '1'
        },
        show_cancel_msg: {
          invisible: '1'
        },
        code: {
          invisible: '1'
        },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            invisible: [['module_state', '!=', 'installed']],
            class: 'oe_button_box'
          },
          _button_action_toggle_is_published: {
            _attr: {
              name: 'action_toggle_is_published',
              invisible: [['is_published', '=', false]],
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-globe'
            },
            _div: {
              _attr: {
                class: 'o_stat_info o_field_widget'
              },
              _span: {
                _attr: {
                  class: 'text-success',
                  text: 'Published'
                }
              }
            }
          },
          _button_action_toggle_is_published_756: {
            _attr: {
              name: 'action_toggle_is_published',
              invisible: [['is_published', '=', true]],
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-eye-slash'
            },
            _div: {
              _attr: {
                class: 'o_stat_info o_field_widget'
              },
              _span: {
                _attr: {
                  class: 'text-danger',
                  text: 'Unpublished'
                }
              }
            }
          }
        },
        image_128: {
          widget: 'image',
          readonly: [['module_state', '!=', 'installed']],
          class: 'oe_avatar'
        },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            invisible: ['|', ['module_state', '!=', 'installed'], ['state', '!=', 'disabled']],
            title: 'Disabled'
          }
        },
        _widget_web_ribbon_947: {
          _attr: {
            name: 'web_ribbon',
            invisible: ['|', ['module_state', '!=', 'installed'], ['state', '!=', 'test']],
            title: 'Test Mode'
          }
        },
        _div_title: {
          _attr: {
            class: 'oe_title'
          },
          _h1: {
            name: {
              placeholder: 'Name'
            }
          },
          _div: {
            _attr: {
              invisible: ['|', ['module_state', '=', 'installed'], ['module_id', '=', false]]
            },
            _a: {
              _attr: {
                invisible: [['module_to_buy', '=', false]],
                class: 'btn btn-info',
                text: 'Upgrade'
              }
            },
            _button_button_immediate_install: {
              _attr: {
                name: 'button_immediate_install',
                string: 'Install',
                invisible: [['module_to_buy', '=', true]],
                class: 'btn btn-primary',
                type: 'object'
              }
            }
          }
        },
        _div: {
          _attr: {
            invisible: [['id', '!=', false]],
            class: 'alert alert-warning'
          },
          _strong: 'Warning',
          _em: 'CREATE',
          _em_450: 'Duplicate'
        },
        _group: {
          _group_payment_state: {
            _attr: {
              name: 'payment_state',
              invisible: [['module_state', 'not in', ('installed', false)]]
            },
            code: {
              groups: 'base.group_no_one',
              readonly: [['id', '!=', false]]
            },
            state: {
              widget: 'radio'
            },
            company_id: {
              groups: 'base.group_multi_company',
              no_open: true
            }
          }
        },
        _notebook: {
          _attr: {
            invisible: ['&', ['module_id', '!=', false], ['module_state', '!=', 'installed']]
          },
          _page_credentials: {
            _attr: {
              name: 'credentials',
              string: 'Credentials',
              invisible: ['|', ['code', '=', 'none'], ['show_credentials_page', '=', false]]
            },
            _group_provider_credentials: {
              _attr: {
                name: 'provider_credentials'
              }
            }
          },
          _page_configuration: {
            _attr: {
              name: 'configuration',
              string: 'Configuration'
            },
            _group_provider_config: {
              _attr: {
                name: 'provider_config'
              },
              _group_payment_form: {
                _attr: {
                  name: 'payment_form',
                  string: 'Payment Form'
                },
                display_as: {
                  placeholder: 'If not defined, the provider name will be used.'
                },
                payment_icon_ids: {
                  widget: 'many2many_tags',
                  invisible: [['show_payment_icon_ids', '=', false]]
                },
                allow_tokenization: {
                  invisible: ['|', ['support_tokenization', '=', false], ['show_allow_tokenization', '=', false]]
                },
                capture_manually: {
                  invisible: [['support_manual_capture', '=', false]]
                },
                allow_express_checkout: {
                  invisible: ['|', ['support_express_checkout', '=', false], ['show_allow_express_checkout', '=', false]]
                }
              },
              _group_availability: {
                _attr: {
                  name: 'availability',
                  string: 'Availability'
                },
                maximum_amount: {},
                available_country_ids: {
                  widget: 'many2many_tags',
                  placeholder: 'Select countries. Leave empty to make available everywhere.',
                  no_open: true,
                  no_create: true
                }
              },
              _group_payment_followup: {
                _attr: {
                  name: 'payment_followup',
                  string: 'Payment Followup',
                  invisible: '1'
                }
              }
            }
          },
          _page_fees: {
            _attr: {
              name: 'fees',
              string: 'Fees',
              invisible: [['support_fees', '=', false]]
            },
            _group_payment_fees: {
              _attr: {
                name: 'payment_fees'
              },
              fees_active: {},
              fees_dom_fixed: {
                invisible: [['fees_active', '=', false]]
              },
              fees_dom_var: {
                invisible: [['fees_active', '=', false]]
              },
              fees_int_fixed: {
                invisible: [['fees_active', '=', false]]
              },
              fees_int_var: {
                invisible: [['fees_active', '=', false]]
              }
            }
          },
          _page_messages: {
            _attr: {
              name: 'messages',
              string: 'Messages',
              invisible: [['module_id', '=', true], ['module_state', '!=', 'installed']]
            },
            _group: {
              pre_msg: {
                invisible: [['show_pre_msg', '=', false]]
              },
              pending_msg: {
                invisible: [['show_pending_msg', '=', false]]
              },
              auth_msg: {
                invisible: ['|', ['support_manual_capture', '=', false], ['show_auth_msg', '=', false]]
              },
              done_msg: {
                invisible: [['show_done_msg', '=', false]]
              },
              cancel_msg: {
                invisible: [['show_cancel_msg', '=', false]]
              }
            }
          }
        }
      }
    }
  },

  payment_provider_list: {
    _odoo_model: 'ir.ui.view',
    model: 'payment.provider',
    type: 'tree',
    arch: {
      sheet: {
        sequence: {
          widget: 'handle'
        },
        name: {},
        code: {},
        state: {},
        available_country_ids: {
          widget: 'many2many_tags'
        },
        company_id: {
          groups: 'base.group_multi_company'
        }
      }
    }
  },

  payment_provider_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'payment.provider',
    type: 'otherview',
    arch: {}
  },

  payment_provider_search: {
    _odoo_model: 'ir.ui.view',
    model: 'payment.provider',
    type: 'search',
    arch: {
      name: {
        string: 'provider'
      },
      code: {},
      _filter_provider_installed: {
        _attr: {
          name: 'provider_installed',
          string: 'Installed',
          domain: [['module_state', '=', 'installed']]
        }
      },
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_code: {
          _attr: {
            name: 'code',
            string: 'Provider',
            context: {
              group_by: 'code'
            }
          }
        },
        _filter_state: {
          _attr: {
            name: 'state',
            string: 'State',
            context: {
              group_by: 'state'
            }
          }
        },
        _filter_company: {
          _attr: {
            name: 'company',
            string: 'Company',
            groups: 'base.group_multi_company',
            context: {
              group_by: 'company_id'
            }
          }
        }
      }
    }
  },

  action_payment_provider: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Payment Providers',
    res_model: 'payment.provider',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

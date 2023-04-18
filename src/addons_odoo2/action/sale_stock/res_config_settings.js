export default {
  res_config_settings_view_form_sale: {
    _odoo_model: 'ir.ui.view',
    model: 'res.config.settings',
    inherit_id: 'sale.res_config_settings_view_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//div[@id='ups']",
            position: 'after'
          },
          _div: {
            _attr: {
              class: 'col-12 col-lg-6 o_setting_box'
            },
            _div: {
              _attr: {
                class: 'o_setting_left_pane'
              },
              group_display_incoterm: {}
            },
            _div_829: {
              _attr: {
                class: 'o_setting_right_pane'
              },
              _label_group_display_incoterm: {
                for: 'group_display_incoterm'
              },
              _div: {
                _attr: {
                  class: 'text-muted',
                  text: 'Display incoterms on orders & invoices'
                }
              },
              _div_122: {
                _attr: {
                  invisible: [['group_display_incoterm', '=', false]],
                  class: 'content-group'
                },
                _div: {
                  _attr: {
                    class: 'mt8'
                  },
                  _button_account__action_incoterms_tree: {
                    _attr: {
                      name: 'account.action_incoterms_tree',
                      string: 'Incoterms',
                      class: 'btn-link',
                      type: 'action',
                      icon: 'fa-arrow-right'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  res_config_settings_view_form_stock: {
    _odoo_model: 'ir.ui.view',
    model: 'res.config.settings',
    inherit_id: 'stock.res_config_settings_view_form',
    arch: {
      sheet: {
        _div: {
          _div: {
            _attr: {
              class: 'col-12 col-lg-6 o_setting_box'
            },
            _div: {
              _attr: {
                class: 'o_setting_right_pane'
              },
              _label_default_picking_policy: {
                for: 'default_picking_policy'
              },
              _div: {
                _attr: {
                  class: 'text-muted',
                  text: 'When to start shipping'
                }
              },
              _div_260: {
                _attr: {
                  class: 'content-group'
                },
                _div: {
                  _attr: {
                    class: 'mt16'
                  },
                  default_picking_policy: {
                    widget: 'selection',
                    class: 'o_light_label'
                  }
                }
              }
            }
          }
        },
        _xpath: {
          _attr: {
            expr: "//h2[@id='schedule_info']",
            position: 'attributes'
          },
          _attribute_invisible: {
            _attr: {
              name: 'invisible',
              text: '0'
            }
          }
        },
        _div_659: {
          _div: {
            _attr: {
              class: 'col-12 col-lg-6 o_setting_box',
              title: 'Margin of error for dates promised to customers. Products will be scheduled for procurement and delivery that many days earlier than the actual promised date, to cope with unexpected delays in the supply chain.'
            },
            _div: {
              _attr: {
                class: 'o_setting_left_pane'
              },
              use_security_lead: {}
            },
            _div_887: {
              _attr: {
                class: 'o_setting_right_pane'
              },
              _label_use_security_lead: {
                for: 'use_security_lead'
              },
              _a: {
                _attr: {
                  class: 'me-2 o_doc_link',
                  title: 'Documentation'
                }
              },
              _span: {
                _attr: {
                  groups: 'base.group_multi_company',
                  class: 'fa fa-lg fa-building-o',
                  title: 'Values set here are company-specific.'
                }
              },
              _div: {
                _attr: {
                  class: 'text-muted',
                  text: 'Schedule deliveries earlier to avoid delays'
                }
              },
              _div_360: {
                _attr: {
                  class: 'content-group'
                },
                _div: {
                  _attr: {
                    invisible: [['use_security_lead', '=', false]],
                    class: 'mt16'
                  },
                  _span: {
                    _attr: {
                      text: 'Move forward expected delivery dates by'
                    },
                    security_lead: {
                      class: 'oe_inline'
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

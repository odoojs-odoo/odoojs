export default {
  res_config_settings_view_form_purchase: {
    _odoo_model: 'ir.ui.view',
    model: 'res.config.settings',
    inherit_id: 'purchase.res_config_settings_view_form_purchase',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//div[@data-key='purchase']",
            position: 'inside'
          },
          is_installed_sale: {
            invisible: '1'
          },
          _h2: {
            _attr: {
              invisible: [['is_installed_sale', '=', false]],
              text: 'Logistics'
            }
          },
          _div_request_vendor_setting_container: {
            _attr: {
              name: 'request_vendor_setting_container',
              class: 'row mt16 o_settings_container'
            },
            _div: {
              _attr: {
                invisible: [['is_installed_sale', '=', false]],
                class: 'col-12 col-lg-6 o_setting_box',
                title: 'This adds a dropshipping route to apply on products in order to request your vendors to deliver to your customers. A product to dropship will generate a purchase request for quotation once the sales order confirmed. This is a on-demand flow. The requested delivery address will be the customer delivery address and not your warehouse.'
              },
              _div: {
                _attr: {
                  class: 'o_setting_left_pane'
                },
                module_stock_dropshipping: {}
              },
              _div_585: {
                _attr: {
                  class: 'o_setting_right_pane'
                },
                _label_module_stock_dropshipping: {
                  for: 'module_stock_dropshipping'
                },
                _a: {
                  _attr: {
                    class: 'o_doc_link',
                    title: 'Documentation'
                  }
                },
                _div: {
                  _attr: {
                    class: 'text-muted',
                    text: 'Request your vendors to deliver to your customers'
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
        _div: {
          _div_schedule_receivings_setting_container: {
            _attr: {
              name: 'schedule_receivings_setting_container',
              class: 'col-12 col-lg-6 o_setting_box',
              title: 'Margin of error for vendor lead times. When the system generates Purchase Orders for reordering products,they will be scheduled that many days earlier to cope with unexpected vendor delays.'
            },
            _div: {
              _attr: {
                class: 'o_setting_left_pane'
              },
              use_po_lead: {}
            },
            _div_517: {
              _attr: {
                class: 'o_setting_right_pane'
              },
              _label_use_po_lead: {
                for: 'use_po_lead'
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
                  text: 'Schedule request for quotations earlier to avoid delays'
                }
              },
              _div_852: {
                _attr: {
                  class: 'content-group'
                },
                _div: {
                  _attr: {
                    invisible: [['use_po_lead', '=', false]],
                    class: 'mt16'
                  },
                  _span: {
                    _attr: {
                      text: 'Move forward expected request creation date by'
                    },
                    po_lead: {
                      class: 'oe_inline'
                    }
                  }
                }
              }
            }
          },
          _div: {
            _attr: {
              class: 'col-12 col-lg-6 o_setting_box'
            },
            _div: {
              _attr: {
                class: 'o_setting_right_pane'
              },
              _label_days_to_purchase: {
                for: 'days_to_purchase'
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
                  text: 'Days needed to confirm a PO'
                }
              },
              _div_163: {
                _attr: {
                  class: 'content-group'
                },
                _div: {
                  _attr: {
                    class: 'mt16'
                  },
                  _span: {
                    days_to_purchase: {
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

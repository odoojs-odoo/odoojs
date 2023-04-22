export default {
  res_config_settings_view_form_purchase: {
    _odoo_model: 'ir.ui.view',
    model: 'res.config.settings',
    inherit_id: 'base.res_config_settings_view_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//div[hasclass('settings')]",
            position: 'inside'
          },
          _div: {
            _attr: {
              string: 'Purchase',
              groups: 'purchase.group_purchase_manager',
              class: 'app_settings_block'
            },
            po_double_validation: { invisible: '1' },
            company_currency_id: { invisible: '1' },
            po_lock: { invisible: '1' },
            _h2: 'Orders',
            _div_purchase_setting_container: {
              _attr: {
                name: 'purchase_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  po_order_approval: {}
                },
                _div_104: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_po_order_approval: { for: 'po_order_approval' },
                  _span: {
                    _attr: {
                      title: 'Values set here are company-specific.',
                      groups: 'base.group_multi_company',
                      class: 'fa fa-lg fa-building-o'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Request managers to approve orders above a minimum amount'
                    }
                  },
                  _div_767: {
                    _attr: {
                      invisible: [['po_order_approval', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: { class: 'row mt16' },
                      _label_po_double_validation_amount: {
                        for: 'po_double_validation_amount',
                        class: 'col-lg-4 o_light_label'
                      },
                      po_double_validation_amount: {}
                    }
                  }
                }
              },
              _div_961: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  lock_confirmed_po: {}
                },
                _div_672: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_lock_confirmed_po: { for: 'lock_confirmed_po' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Automatically lock confirmed orders to prevent editing'
                    }
                  }
                }
              },
              _div_493: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_warning_purchase: {}
                },
                _div_727: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_warning_purchase: {
                    for: 'group_warning_purchase',
                    string: 'Warnings'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Get warnings in orders for products or vendors'
                    }
                  }
                }
              },
              _div_760: {
                _attr: {
                  title: 'Calls for tenders are when you want to generate requests for quotations with several vendors for a given set of products to compare offers.',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_purchase_requisition: {}
                },
                _div_386: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_purchase_requisition: { for: 'module_purchase_requisition' },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Manage your purchase agreements (call for tenders, blanket orders)'
                    }
                  },
                  _div_424: {
                    _attr: {
                      invisible: [['module_purchase_requisition', '=', false]],
                      class: 'content-group'
                    },
                    _div: {}
                  }
                }
              },
              _div_102: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_send_reminder: {}
                },
                _div_510: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_send_reminder: { for: 'group_send_reminder' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Automatically remind the receipt date to your vendors'
                    }
                  }
                }
              }
            },
            _h2_429: 'Invoicing',
            _div_invoicing_settings_container: {
              _attr: {
                name: 'invoicing_settings_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  title: 'This default value is applied to any new product created. This can be changed in the product detail form.',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' }
                },
                _div_352: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_default_purchase_method: { for: 'default_purchase_method' },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Quantities billed by vendors'
                    }
                  },
                  _div_307: {
                    _attr: { class: 'content-group' },
                    _div: {
                      _attr: { class: 'mt16' },
                      default_purchase_method: {
                        widget: 'radio',
                        class: 'o_light_label'
                      }
                    }
                  }
                }
              },
              _div_644: {
                _attr: {
                  title: 'If enabled, activates 3-way matching on vendor bills : the items must be received in order to pay the invoice.',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_account_3way_match: {
                    string: '3-way matching',
                    widget: 'upgrade_boolean'
                  }
                },
                _div_529: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_account_3way_match: { for: 'module_account_3way_match' },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Make sure you only pay bills for which you received the goods you ordered'
                    }
                  }
                }
              }
            },
            _h2_506: 'Products',
            _div_matrix_setting_container: {
              _attr: {
                name: 'matrix_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_product_variant: {}
                },
                _div_415: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_product_variant: { for: 'group_product_variant' },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Purchase variants of a product using attributes (size, color, etc.)'
                    }
                  },
                  _div_898: {
                    _attr: {
                      invisible: [['group_product_variant', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: { class: 'mt8' },
                      _button_product__attribute_action: {
                        _attr: {
                          name: 'product.attribute_action',
                          type: 'action',
                          string: 'Attributes',
                          icon: 'fa-arrow-right',
                          class: 'btn-link'
                        }
                      }
                    }
                  }
                }
              },
              _div_350: {
                _attr: {
                  title: 'If installed, the product variants will be added to purchase orders through a grid entry.',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_purchase_product_matrix: {}
                },
                _div_583: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_purchase_product_matrix: {
                    for: 'module_purchase_product_matrix',
                    string: 'Variant Grid Entry'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Add several variants to the purchase order from a grid'
                    }
                  }
                }
              },
              _div_111: {
                _attr: {
                  title: 'Ability to select a package type in purchase orders and to force a quantity that is a multiple of the number of units per package.',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_stock_packaging: {}
                },
                _div_177: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_stock_packaging: { for: 'group_stock_packaging' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Purchase products by multiple of unit # per package'
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

  action_purchase_configuration: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Settings',
    type: 'ir.actions.act_window',
    res_model: 'res.config.settings',
    search_view_id: 'tooooooodoooooo',
    context: {
      module: 'purchase',
      bin_size: false
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

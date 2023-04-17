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
            po_double_validation: {
              invisible: '1'
            },
            company_currency_id: {
              invisible: '1'
            },
            po_lock: {
              invisible: '1'
            },
            _h2: 'Orders',
            _div_purchase_setting_container: {
              _attr: {
                name: 'purchase_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  po_order_approval: {}
                },
                _div_134: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_po_order_approval: {
                    for: 'po_order_approval'
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
                      text: 'Request managers to approve orders above a minimum amount'
                    }
                  },
                  _div_236: {
                    _attr: {
                      attrs: {
                        invisible: "[('po_order_approval', '=', False)]"
                      },
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'row mt16'
                      },
                      _label_po_double_validation_amount: {
                        for: 'po_double_validation_amount',
                        class: 'col-lg-4 o_light_label'
                      },
                      po_double_validation_amount: {}
                    }
                  }
                }
              },
              _div_801: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  lock_confirmed_po: {}
                },
                _div_378: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_lock_confirmed_po: {
                    for: 'lock_confirmed_po'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Automatically lock confirmed orders to prevent editing'
                    }
                  }
                }
              },
              _div_617: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_warning_purchase: {}
                },
                _div_105: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
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
              _div_248: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'Calls for tenders are when you want to generate requests for quotations with several vendors for a given set of products to compare offers.'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_purchase_requisition: {}
                },
                _div_529: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_purchase_requisition: {
                    for: 'module_purchase_requisition'
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
                      text: 'Manage your purchase agreements (call for tenders, blanket orders)'
                    }
                  },
                  _div_605: {
                    _attr: {
                      attrs: {
                        invisible: "[('module_purchase_requisition', '=', False)]"
                      },
                      class: 'content-group'
                    },
                    _div: {}
                  }
                }
              },
              _div_393: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_send_reminder: {}
                },
                _div_908: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_send_reminder: {
                    for: 'group_send_reminder'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Automatically remind the receipt date to your vendors'
                    }
                  }
                }
              }
            },
            _h2_658: 'Invoicing',
            _div_invoicing_settings_container: {
              _attr: {
                name: 'invoicing_settings_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'This default value is applied to any new product created. This can be changed in the product detail form.'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  }
                },
                _div_740: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_default_purchase_method: {
                    for: 'default_purchase_method'
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
                      text: 'Quantities billed by vendors'
                    }
                  },
                  _div_616: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'mt16'
                      },
                      default_purchase_method: {
                        widget: 'radio',
                        class: 'o_light_label'
                      }
                    }
                  }
                }
              },
              _div_924: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'If enabled, activates 3-way matching on vendor bills : the items must be received in order to pay the invoice.'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_account_3way_match: {
                    string: '3-way matching',
                    widget: 'upgrade_boolean'
                  }
                },
                _div_994: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_account_3way_match: {
                    for: 'module_account_3way_match'
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
                      text: 'Make sure you only pay bills for which you received the goods you ordered'
                    }
                  }
                }
              }
            },
            _h2_773: 'Products',
            _div_matrix_setting_container: {
              _attr: {
                name: 'matrix_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_product_variant: {}
                },
                _div_590: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_product_variant: {
                    for: 'group_product_variant'
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
                      text: 'Purchase variants of a product using attributes (size, color, etc.)'
                    }
                  },
                  _div_765: {
                    _attr: {
                      attrs: {
                        invisible: "[('group_product_variant', '=', False)]"
                      },
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'mt8'
                      },
                      _button_product__attribute_action: {
                        _attr: {
                          name: 'product.attribute_action',
                          string: 'Attributes',
                          class: 'btn-link',
                          type: 'action',
                          icon: 'fa-arrow-right'
                        }
                      }
                    }
                  }
                }
              },
              _div_461: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'If installed, the product variants will be added to purchase orders through a grid entry.'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_purchase_product_matrix: {}
                },
                _div_383: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
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
              _div_753: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'Ability to select a package type in purchase orders and to force a quantity that is a multiple of the number of units per package.'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_stock_packaging: {}
                },
                _div_570: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_stock_packaging: {
                    for: 'group_stock_packaging'
                  },
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

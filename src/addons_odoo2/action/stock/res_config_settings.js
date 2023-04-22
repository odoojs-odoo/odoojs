export default {
  res_config_settings_view_form: {
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
              string: 'Inventory',
              groups: 'stock.group_stock_manager',
              class: 'app_settings_block'
            },
            _h2: 'Operations',
            _div_operations_setting_container: {
              _attr: {
                name: 'operations_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  title: 'Put your products in packs (e.g. parcels, boxes) and track them',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_stock_tracking_lot: {}
                },
                _div_383: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_stock_tracking_lot: { for: 'group_stock_tracking_lot' },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Put your products in packs (e.g. parcels, boxes) and track them'
                    }
                  }
                }
              },
              _div_372: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_stock_picking_batch: {}
                },
                _div_730: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_stock_picking_batch: { for: 'module_stock_picking_batch' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Process transfers in batch per worker'
                    }
                  },
                  _div_525: {
                    _attr: {
                      invisible: [['module_stock_picking_batch', '=', false]],
                      class: 'row mt-2'
                    },
                    group_stock_picking_wave: { class: 'col-lg-1 ml16 mr0' },
                    _div: {
                      _attr: { class: 'col ps-0' },
                      _label_group_stock_picking_wave: { for: 'group_stock_picking_wave' },
                      _div: {
                        _attr: {
                          class: 'text-muted',
                          text: 'Process operations in wave transfers'
                        }
                      }
                    }
                  }
                }
              },
              _div_541: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_warning_stock: {}
                },
                _div_535: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_warning_stock: {
                    for: 'group_warning_stock',
                    string: 'Warnings'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Get informative or blocking warnings on partners'
                    }
                  }
                }
              },
              _div_786: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_quality_control: { widget: 'upgrade_boolean' }
                },
                _div_733: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_quality_control: { for: 'module_quality_control' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Add quality checks to your transfer operations'
                    }
                  },
                  _div_288: {
                    _attr: {
                      invisible: [['module_quality_control', '=', false]],
                      class: 'row mt-2'
                    },
                    module_quality_control_worksheet: {
                      widget: 'upgrade_boolean',
                      class: 'col-lg-1 ml16 mr0'
                    },
                    _div: {
                      _attr: { class: 'col ps-0' },
                      _label_module_quality_control_worksheet: { for: 'module_quality_control_worksheet' },
                      _div: {
                        _attr: {
                          class: 'text-muted',
                          text: 'Create customizable worksheets for your quality checks'
                        }
                      }
                    }
                  }
                }
              },
              _div_771: {
                _attr: {
                  groups: 'stock.group_stock_manager',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_annual_inventory_day: {
                    for: 'annual_inventory_day',
                    string: 'Annual Inventory Day and Month'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Day and month that annual inventory counts should occur.'
                    }
                  },
                  _div_949: {
                    _attr: { class: 'content-group' },
                    annual_inventory_day: { class: 'o_light_label' },
                    annual_inventory_month: { class: 'o_light_label' }
                  }
                }
              },
              _div_608: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_stock_reception_report: {}
                },
                _div_249: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_stock_reception_report: { for: 'group_stock_reception_report' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'View and allocate received quantities.'
                    }
                  }
                }
              }
            },
            _h2_359: 'Barcode',
            _div_barcode_setting_container: {
              _attr: {
                name: 'barcode_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_stock_barcode: { widget: 'upgrade_boolean' }
                },
                _div_628: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_stock_barcode: { for: 'module_stock_barcode' },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'me-2 o_doc_link'
                    }
                  },
                  _span: {
                    _attr: {
                      title: 'Values set here are company-specific.',
                      groups: 'base.group_multi_company',
                      class: 'fa fa-lg fa-building-o'
                    }
                  },
                  _div_stock_barcode: {
                    _attr: {
                      name: 'stock_barcode',
                      class: 'text-muted',
                      text: 'Process operations faster with barcodes'
                    }
                  },
                  _div: {
                    _attr: { class: 'content-group' },
                    _div: {}
                  }
                }
              }
            },
            _h2_922: 'Shipping',
            _div_shipping_setting_container: {
              _attr: {
                name: 'shipping_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  stock_move_email_validation: {}
                },
                _div_708: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_stock_move_email_validation: {
                    for: 'stock_move_email_validation',
                    string: 'Email Confirmation'
                  },
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
                      text: 'Send an automatic confirmation email when Delivery Orders are done'
                    }
                  }
                }
              },
              _div_109: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_stock_sms: {}
                },
                _div_644: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_stock_sms: { for: 'module_stock_sms' },
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
                      text: 'Send an automatic confirmation SMS Text Message when Delivery Orders are done'
                    }
                  },
                  _div_113: {
                    _attr: { class: 'content-group' },
                    _div: {}
                  }
                }
              },
              _div_637: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_stock_sign_delivery: {}
                },
                _div_381: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_stock_sign_delivery: { for: 'group_stock_sign_delivery' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Require a signature on your delivery orders'
                    }
                  }
                }
              },
              _div_900: {
                _attr: {
                  title: 'Shipping connectors allow to compute accurate shipping costs, print shipping labels and request carrier picking at your warehouse to ship to the customer. Apply shipping connector from delivery methods.',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_delivery: {}
                },
                _div_194: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_delivery: { for: 'module_delivery' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Compute shipping costs'
                    }
                  }
                }
              }
            },
            _h2_454: 'Shipping Connectors',
            _div_product_setting_container: {
              _attr: {
                name: 'product_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_delivery_ups: { widget: 'upgrade_boolean' }
                },
                _div_988: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_delivery_ups: { for: 'module_delivery_ups' },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Compute shipping costs and ship with UPS'
                    }
                  },
                  _div_697: {
                    _attr: { class: 'content-group' },
                    _div: {}
                  }
                }
              },
              _div_372: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_delivery_dhl: { widget: 'upgrade_boolean' }
                },
                _div_382: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_delivery_dhl: { for: 'module_delivery_dhl' },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Compute shipping costs and ship with DHL'
                    }
                  },
                  _div_463: {
                    _attr: { class: 'content-group' },
                    _div: {}
                  }
                }
              },
              _div_805: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_delivery_fedex: { widget: 'upgrade_boolean' }
                },
                _div_413: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_delivery_fedex: { for: 'module_delivery_fedex' },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Compute shipping costs and ship with FedEx'
                    }
                  },
                  _div_465: {
                    _attr: { class: 'content-group' },
                    _div: {}
                  }
                }
              },
              _div_131: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_delivery_usps: { widget: 'upgrade_boolean' }
                },
                _div_762: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_delivery_usps: { for: 'module_delivery_usps' },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Compute shipping costs and ship with USPS'
                    }
                  },
                  _div_229: {
                    _attr: { class: 'content-group' },
                    _div: {}
                  }
                }
              },
              _div_621: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_delivery_bpost: { widget: 'upgrade_boolean' }
                },
                _div_139: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_delivery_bpost: { for: 'module_delivery_bpost' },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Compute shipping costs and ship with bpost'
                    }
                  },
                  _div_835: {
                    _attr: { class: 'content-group' },
                    _div: {}
                  }
                }
              },
              _div_583: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_delivery_easypost: { widget: 'upgrade_boolean' }
                },
                _div_337: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_delivery_easypost: { for: 'module_delivery_easypost' },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Compute shipping costs and ship with Easypost'
                    }
                  },
                  _div_270: {
                    _attr: { class: 'content-group' },
                    _div: {}
                  }
                }
              },
              _div_400: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_delivery_sendcloud: { widget: 'upgrade_boolean' }
                },
                _div_330: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_delivery_sendcloud: { for: 'module_delivery_sendcloud' },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Compute shipping costs and ship with Sendcloud'
                    }
                  },
                  _div_699: {
                    _attr: { class: 'content-group' },
                    _div: {}
                  }
                }
              }
            },
            _h2_848: 'Products',
            _div_product_setting_container_699: {
              _attr: {
                name: 'product_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_product_variant: {}
                },
                _div_665: {
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
                      text: 'Set product attributes (e.g. color, size) to manage variants'
                    }
                  },
                  _div_791: {
                    _attr: { class: 'content-group' },
                    _div: {
                      _attr: {
                        invisible: [['group_product_variant', '=', false]],
                        class: 'mt8'
                      },
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
              _div_937: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_uom: {}
                },
                _div_482: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_uom: { for: 'group_uom' },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Sell and purchase products in different units of measure'
                    }
                  },
                  _div_420: {
                    _attr: { class: 'content-group' },
                    _div: {
                      _attr: {
                        invisible: [['group_uom', '=', false]],
                        class: 'mt8'
                      },
                      _button_uom__product_uom_categ_form_action: {
                        _attr: {
                          name: 'uom.product_uom_categ_form_action',
                          type: 'action',
                          string: 'Units Of Measure',
                          icon: 'fa-arrow-right',
                          class: 'btn-link'
                        }
                      }
                    }
                  }
                }
              },
              _div_905: {
                _attr: {
                  title: 'Manage product packagings (e.g. pack of 6 bottles, box of 10 pieces)',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_stock_packaging: {}
                },
                _div_681: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_stock_packaging: { for: 'group_stock_packaging' },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Manage product packagings (e.g. pack of 6 bottles, box of 10 pieces)'
                    }
                  },
                  _div_766: {
                    _attr: { class: 'content-group' },
                    _div: {
                      _attr: {
                        invisible: [['group_stock_packaging', '=', false]],
                        class: 'mt8'
                      },
                      _button_product__action_packaging_view: {
                        _attr: {
                          name: 'product.action_packaging_view',
                          type: 'action',
                          string: 'Product Packagings',
                          icon: 'fa-arrow-right',
                          class: 'btn-link'
                        }
                      }
                    }
                  }
                }
              }
            },
            _h2_871: 'Traceability',
            _div: {
              _attr: { class: 'row mt16 o_settings_container' },
              _div: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_stock_production_lot: {}
                },
                _div_807: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_stock_production_lot: { for: 'group_stock_production_lot' },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Get a full traceability from vendors to customers'
                    }
                  },
                  _div_108: {
                    _attr: {
                      invisible: [['group_stock_production_lot', '=', false]],
                      class: 'row mt-2'
                    },
                    group_stock_lot_print_gs1: { class: 'col-lg-1 ml16 mr0' },
                    _div: {
                      _attr: { class: 'col ps-0' },
                      _label_group_stock_lot_print_gs1: { for: 'group_stock_lot_print_gs1' },
                      _div: {
                        _attr: {
                          class: 'text-muted',
                          text: 'Use GS1 nomenclature datamatrix whenever barcodes are printed for lots and serial numbers.'
                        }
                      }
                    }
                  }
                }
              },
              _div_882: {
                _attr: {
                  title: 'Track following dates on lots & serial numbers: best before, removal, end of life, alert. Such dates are set automatically at lot/serial number creation based on values set on the product (in days).',
                  invisible: [['group_stock_production_lot', '=', false]],
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_product_expiry: {}
                },
                _div_591: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_product_expiry: { for: 'module_product_expiry' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Set expiration dates on lots & serial numbers'
                    }
                  }
                }
              },
              _div_735: {
                _attr: {
                  invisible: [['group_stock_production_lot', '=', false]],
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_lot_on_delivery_slip: {}
                },
                _div_474: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_lot_on_delivery_slip: { for: 'group_lot_on_delivery_slip' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Lots & Serial numbers will appear on the delivery slip'
                    }
                  }
                }
              },
              _div_592: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_stock_tracking_owner: {}
                },
                _div_709: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_stock_tracking_owner: { for: 'group_stock_tracking_owner' },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Set owner on stored products'
                    }
                  }
                }
              }
            },
            _h2_873: {
              _attr: {
                class: 'mt32',
                text: 'Warehouse'
              }
            },
            _div_warehouse_setting_container: {
              _attr: {
                name: 'warehouse_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  title: 'Store products in specific locations of your warehouse (e.g. bins, racks) and to track inventory accordingly.',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_stock_multi_locations: {}
                },
                _div_430: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_stock_multi_locations: { for: 'group_stock_multi_locations' },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Track product location in your warehouse'
                    }
                  },
                  _div_444: {
                    _attr: { class: 'content-group' },
                    _div: {
                      _attr: {
                        invisible: [['group_stock_multi_locations', '=', false]],
                        class: 'mt8'
                      },
                      _button_stock__action_location_form: {
                        _attr: {
                          name: 'stock.action_location_form',
                          type: 'action',
                          string: 'Locations',
                          icon: 'fa-arrow-right',
                          class: 'btn-link'
                        }
                      },
                      _br: {},
                      _button_ock__action_putaway_tr: {
                        _attr: {
                          name: 'ock.action_putaway_tr',
                          type: 'action',
                          string: 'Putaway Rules',
                          icon: 'fa-arrow-right',
                          class: 'btn-link'
                        }
                      }
                    }
                  }
                }
              },
              _div_307: {
                _attr: {
                  title: 'Add and customize route operations to process product moves in your warehouse(s): e.g. unload > quality control > stock for incoming products, pick > pack > ship for outgoing products. You can also set putaway strategies on warehouse locations in order to send incoming products into specific child locations straight away (e.g. specific bins, racks).',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_stock_adv_location: {}
                },
                _div_216: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_stock_adv_location: { for: 'group_stock_adv_location' },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Use your own routes'
                    }
                  },
                  _div_362: {
                    _attr: { class: 'content-group' },
                    _div: {
                      _attr: {
                        invisible: [['group_stock_adv_location', '=', false]],
                        class: 'mt8'
                      },
                      _button_stock__action_warehouse_form: {
                        _attr: {
                          name: 'stock.action_warehouse_form',
                          type: 'action',
                          string: 'Set Warehouse Routes',
                          icon: 'fa-arrow-right',
                          class: 'btn-link'
                        }
                      }
                    }
                  }
                }
              },
              _div_772: {
                _attr: {
                  invisible: [['group_stock_multi_locations', '=', false]],
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_stock_storage_categories: {}
                },
                _div_798: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_stock_storage_categories: { for: 'group_stock_storage_categories' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Categorize your locations for smarter putaway rules'
                    }
                  },
                  _div_449: {
                    _attr: {
                      invisible: [['group_stock_storage_categories', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: { class: 'mt8' },
                      _button_stock__action_storage_category: {
                        _attr: {
                          name: 'stock.action_storage_category',
                          type: 'action',
                          string: 'Storage Categories',
                          icon: 'fa-arrow-right',
                          class: 'btn-link'
                        }
                      }
                    },
                    _div_943: {
                      _attr: {
                        groups: 'base.group_no_one',
                        class: 'mt4'
                      },
                      _button_stock__action_storage_category_capacity: {
                        _attr: {
                          name: 'stock.action_storage_category_capacity',
                          type: 'action',
                          string: 'Storage Category Capacity',
                          icon: 'fa-arrow-right',
                          class: 'btn-link'
                        }
                      }
                    }
                  }
                }
              }
            },
            _h2_428: {
              _attr: {
                invisible: '1',
                text: 'Advanced Scheduling'
              }
            },
            _div_460: {
              _attr: { class: 'row mt16 o_settings_container' },
              _div: {},
              _div_279: {}
            }
          }
        }
      }
    }
  },

  action_stock_config_settings: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Settings',
    type: 'ir.actions.act_window',
    res_model: 'res.config.settings',
    search_view_id: 'tooooooodoooooo',
    context: {
      module: 'stock',
      bin_size: false
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

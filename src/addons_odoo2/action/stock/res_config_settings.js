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
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'Put your products in packs (e.g. parcels, boxes) and track them'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_stock_tracking_lot: {}
                },
                _div_736: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_stock_tracking_lot: {
                    for: 'group_stock_tracking_lot'
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
                      text: 'Put your products in packs (e.g. parcels, boxes) and track them'
                    }
                  }
                }
              },
              _div_322: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_stock_picking_batch: {}
                },
                _div_480: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_stock_picking_batch: {
                    for: 'module_stock_picking_batch'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Process transfers in batch per worker'
                    }
                  },
                  _div_996: {
                    _attr: {
                      attrs: {
                        invisible: "[('module_stock_picking_batch', '=', False)]"
                      },
                      class: 'row mt-2'
                    },
                    group_stock_picking_wave: {
                      class: 'col-lg-1 ml16 mr0'
                    },
                    _div: {
                      _attr: {
                        class: 'col ps-0'
                      },
                      _label_group_stock_picking_wave: {
                        for: 'group_stock_picking_wave'
                      },
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
              _div_998: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_warning_stock: {}
                },
                _div_135: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
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
              _div_842: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_quality_control: {
                    widget: 'upgrade_boolean'
                  }
                },
                _div_488: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_quality_control: {
                    for: 'module_quality_control'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Add quality checks to your transfer operations'
                    }
                  },
                  _div_743: {
                    _attr: {
                      attrs: {
                        invisible: "[('module_quality_control', '=', False)]"
                      },
                      class: 'row mt-2'
                    },
                    module_quality_control_worksheet: {
                      widget: 'upgrade_boolean',
                      class: 'col-lg-1 ml16 mr0'
                    },
                    _div: {
                      _attr: {
                        class: 'col ps-0'
                      },
                      _label_module_quality_control_worksheet: {
                        for: 'module_quality_control_worksheet'
                      },
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
              _div_723: {
                _attr: {
                  groups: 'stock.group_stock_manager',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
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
                    _attr: {
                      class: 'content-group'
                    },
                    annual_inventory_day: {
                      class: 'o_light_label'
                    },
                    annual_inventory_month: {
                      class: 'o_light_label'
                    }
                  }
                }
              },
              _div_830: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_stock_reception_report: {}
                },
                _div_940: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_stock_reception_report: {
                    for: 'group_stock_reception_report'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'View and allocate received quantities.'
                    }
                  }
                }
              }
            },
            _h2_738: 'Barcode',
            _div_barcode_setting_container: {
              _attr: {
                name: 'barcode_setting_container',
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
                  module_stock_barcode: {
                    widget: 'upgrade_boolean'
                  }
                },
                _div_485: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_stock_barcode: {
                    for: 'module_stock_barcode'
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
                  _div_stock_barcode: {
                    _attr: {
                      name: 'stock_barcode',
                      class: 'text-muted',
                      text: 'Process operations faster with barcodes'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {}
                  }
                }
              }
            },
            _h2_811: 'Shipping',
            _div_shipping_setting_container: {
              _attr: {
                name: 'shipping_setting_container',
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
                  stock_move_email_validation: {}
                },
                _div_100: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_stock_move_email_validation: {
                    for: 'stock_move_email_validation',
                    string: 'Email Confirmation'
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
                      text: 'Send an automatic confirmation email when Delivery Orders are done'
                    }
                  }
                }
              },
              _div_971: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_stock_sms: {}
                },
                _div_271: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_stock_sms: {
                    for: 'module_stock_sms'
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
                      text: 'Send an automatic confirmation SMS Text Message when Delivery Orders are done'
                    }
                  },
                  _div_277: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {}
                  }
                }
              },
              _div_187: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_stock_sign_delivery: {}
                },
                _div_857: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_stock_sign_delivery: {
                    for: 'group_stock_sign_delivery'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Require a signature on your delivery orders'
                    }
                  }
                }
              },
              _div_443: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'Shipping connectors allow to compute accurate shipping costs, print shipping labels and request carrier picking at your warehouse to ship to the customer. Apply shipping connector from delivery methods.'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_delivery: {}
                },
                _div_347: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_delivery: {
                    for: 'module_delivery'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Compute shipping costs'
                    }
                  }
                }
              }
            },
            _h2_229: 'Shipping Connectors',
            _div_product_setting_container: {
              _attr: {
                name: 'product_setting_container',
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
                  module_delivery_ups: {
                    widget: 'upgrade_boolean'
                  }
                },
                _div_837: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_delivery_ups: {
                    for: 'module_delivery_ups'
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
                      text: 'Compute shipping costs and ship with UPS'
                    }
                  },
                  _div_597: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {}
                  }
                }
              },
              _div_226: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_delivery_dhl: {
                    widget: 'upgrade_boolean'
                  }
                },
                _div_238: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_delivery_dhl: {
                    for: 'module_delivery_dhl'
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
                      text: 'Compute shipping costs and ship with DHL'
                    }
                  },
                  _div_239: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {}
                  }
                }
              },
              _div_997: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_delivery_fedex: {
                    widget: 'upgrade_boolean'
                  }
                },
                _div_781: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_delivery_fedex: {
                    for: 'module_delivery_fedex'
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
                      text: 'Compute shipping costs and ship with FedEx'
                    }
                  },
                  _div_313: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {}
                  }
                }
              },
              _div_429: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_delivery_usps: {
                    widget: 'upgrade_boolean'
                  }
                },
                _div_732: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_delivery_usps: {
                    for: 'module_delivery_usps'
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
                      text: 'Compute shipping costs and ship with USPS'
                    }
                  },
                  _div_662: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {}
                  }
                }
              },
              _div_462: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_delivery_bpost: {
                    widget: 'upgrade_boolean'
                  }
                },
                _div_776: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_delivery_bpost: {
                    for: 'module_delivery_bpost'
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
                      text: 'Compute shipping costs and ship with bpost'
                    }
                  },
                  _div_273: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {}
                  }
                }
              },
              _div_331: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_delivery_easypost: {
                    widget: 'upgrade_boolean'
                  }
                },
                _div_372: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_delivery_easypost: {
                    for: 'module_delivery_easypost'
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
                      text: 'Compute shipping costs and ship with Easypost'
                    }
                  },
                  _div_719: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {}
                  }
                }
              },
              _div_632: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_delivery_sendcloud: {
                    widget: 'upgrade_boolean'
                  }
                },
                _div_535: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_delivery_sendcloud: {
                    for: 'module_delivery_sendcloud'
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
                      text: 'Compute shipping costs and ship with Sendcloud'
                    }
                  },
                  _div_506: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {}
                  }
                }
              }
            },
            _h2_642: 'Products',
            _div_product_setting_container_429: {
              _attr: {
                name: 'product_setting_container',
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
                _div_981: {
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
                      text: 'Set product attributes (e.g. color, size) to manage variants'
                    }
                  },
                  _div_496: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        attrs: {
                          invisible: "[('group_product_variant', '=', False)]"
                        },
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
              _div_602: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_uom: {}
                },
                _div_692: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_uom: {
                    for: 'group_uom'
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
                      text: 'Sell and purchase products in different units of measure'
                    }
                  },
                  _div_998: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        attrs: {
                          invisible: "[('group_uom', '=', False)]"
                        },
                        class: 'mt8'
                      },
                      _button_uom__product_uom_categ_form_action: {
                        _attr: {
                          name: 'uom.product_uom_categ_form_action',
                          string: 'Units Of Measure',
                          class: 'btn-link',
                          type: 'action',
                          icon: 'fa-arrow-right'
                        }
                      }
                    }
                  }
                }
              },
              _div_210: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'Manage product packagings (e.g. pack of 6 bottles, box of 10 pieces)'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_stock_packaging: {}
                },
                _div_816: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_stock_packaging: {
                    for: 'group_stock_packaging'
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
                      text: 'Manage product packagings (e.g. pack of 6 bottles, box of 10 pieces)'
                    }
                  },
                  _div_583: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        attrs: {
                          invisible: "[('group_stock_packaging', '=', False)]"
                        },
                        class: 'mt8'
                      },
                      _button_product__action_packaging_view: {
                        _attr: {
                          name: 'product.action_packaging_view',
                          string: 'Product Packagings',
                          class: 'btn-link',
                          type: 'action',
                          icon: 'fa-arrow-right'
                        }
                      }
                    }
                  }
                }
              }
            },
            _h2_869: 'Traceability',
            _div: {
              _attr: {
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
                  group_stock_production_lot: {}
                },
                _div_712: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_stock_production_lot: {
                    for: 'group_stock_production_lot'
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
                      text: 'Get a full traceability from vendors to customers'
                    }
                  },
                  _div_107: {
                    _attr: {
                      attrs: {
                        invisible: "[('group_stock_production_lot', '=', False)]"
                      },
                      class: 'row mt-2'
                    },
                    group_stock_lot_print_gs1: {
                      class: 'col-lg-1 ml16 mr0'
                    },
                    _div: {
                      _attr: {
                        class: 'col ps-0'
                      },
                      _label_group_stock_lot_print_gs1: {
                        for: 'group_stock_lot_print_gs1'
                      },
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
              _div_357: {
                _attr: {
                  attrs: {
                    invisible: "[('group_stock_production_lot', '=', False)]"
                  },
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'Track following dates on lots & serial numbers: best before, removal, end of life, alert. Such dates are set automatically at lot/serial number creation based on values set on the product (in days).'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_product_expiry: {}
                },
                _div_333: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_product_expiry: {
                    for: 'module_product_expiry'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Set expiration dates on lots & serial numbers'
                    }
                  }
                }
              },
              _div_718: {
                _attr: {
                  attrs: {
                    invisible: "[('group_stock_production_lot', '=', False)]"
                  },
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_lot_on_delivery_slip: {}
                },
                _div_673: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_lot_on_delivery_slip: {
                    for: 'group_lot_on_delivery_slip'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Lots & Serial numbers will appear on the delivery slip'
                    }
                  }
                }
              },
              _div_660: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_stock_tracking_owner: {}
                },
                _div_857: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_stock_tracking_owner: {
                    for: 'group_stock_tracking_owner'
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
                      text: 'Set owner on stored products'
                    }
                  }
                }
              }
            },
            _h2_126: {
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
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'Store products in specific locations of your warehouse (e.g. bins, racks) and to track inventory accordingly.'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_stock_multi_locations: {}
                },
                _div_109: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_stock_multi_locations: {
                    for: 'group_stock_multi_locations'
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
                      text: 'Track product location in your warehouse'
                    }
                  },
                  _div_823: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        attrs: {
                          invisible: "[('group_stock_multi_locations', '=', False)]"
                        },
                        class: 'mt8'
                      },
                      _button_stock__action_location_form: {
                        _attr: {
                          name: 'stock.action_location_form',
                          string: 'Locations',
                          class: 'btn-link',
                          type: 'action',
                          icon: 'fa-arrow-right'
                        }
                      },
                      _br: {},
                      _button_ock__action_putaway_tr: {
                        _attr: {
                          name: 'ock.action_putaway_tr',
                          string: 'Putaway Rules',
                          class: 'btn-link',
                          type: 'action',
                          icon: 'fa-arrow-right'
                        }
                      }
                    }
                  }
                }
              },
              _div_975: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'Add and customize route operations to process product moves in your warehouse(s): e.g. unload > quality control > stock for incoming products, pick > pack > ship for outgoing products. You can also set putaway strategies on warehouse locations in order to send incoming products into specific child locations straight away (e.g. specific bins, racks).'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_stock_adv_location: {}
                },
                _div_900: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_stock_adv_location: {
                    for: 'group_stock_adv_location'
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
                      text: 'Use your own routes'
                    }
                  },
                  _div_198: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        attrs: {
                          invisible: "[('group_stock_adv_location', '=', False)]"
                        },
                        class: 'mt8'
                      },
                      _button_stock__action_warehouse_form: {
                        _attr: {
                          name: 'stock.action_warehouse_form',
                          string: 'Set Warehouse Routes',
                          class: 'btn-link',
                          type: 'action',
                          icon: 'fa-arrow-right'
                        }
                      }
                    }
                  }
                }
              },
              _div_196: {
                _attr: {
                  attrs: {
                    invisible: "[('group_stock_multi_locations', '=', False)]"
                  },
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_stock_storage_categories: {}
                },
                _div_778: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_stock_storage_categories: {
                    for: 'group_stock_storage_categories'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Categorize your locations for smarter putaway rules'
                    }
                  },
                  _div_933: {
                    _attr: {
                      attrs: {
                        invisible: "[('group_stock_storage_categories', '=', False)]"
                      },
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'mt8'
                      },
                      _button_stock__action_storage_category: {
                        _attr: {
                          name: 'stock.action_storage_category',
                          string: 'Storage Categories',
                          class: 'btn-link',
                          type: 'action',
                          icon: 'fa-arrow-right'
                        }
                      }
                    },
                    _div_584: {
                      _attr: {
                        groups: 'base.group_no_one',
                        class: 'mt4'
                      },
                      _button_stock__action_storage_category_capacity: {
                        _attr: {
                          name: 'stock.action_storage_category_capacity',
                          string: 'Storage Category Capacity',
                          class: 'btn-link',
                          type: 'action',
                          icon: 'fa-arrow-right'
                        }
                      }
                    }
                  }
                }
              }
            },
            _h2_884: {
              _attr: {
                invisible: '1',
                text: 'Advanced Scheduling'
              }
            },
            _div_880: {
              _attr: {
                class: 'row mt16 o_settings_container'
              },
              _div: {},
              _div_173: {}
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

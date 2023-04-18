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
              string: 'Sales',
              groups: 'sales_team.group_sale_manager',
              class: 'app_settings_block o_not_app'
            },
            _h2: 'Product Catalog',
            _div_catalog_setting_container: {
              _attr: {
                name: 'catalog_setting_container',
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
                _div_154: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_product_variant: {
                    for: 'group_product_variant'
                  },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Sell variants of a product using attributes (size, color, etc.)'
                    }
                  },
                  _div_634: {
                    _attr: {
                      invisible: [['group_product_variant', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
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
              _div_521: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_sale_product_matrix: {}
                },
                _div_573: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_sale_product_matrix: {
                    for: 'module_sale_product_matrix',
                    string: 'Variant Grid Entry'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Add several variants to an order from a grid'
                    }
                  }
                }
              },
              _div_229: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_uom: {}
                },
                _div_934: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_uom: {
                    for: 'group_uom'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Sell and purchase products in different units of measure'
                    }
                  },
                  _div_976: {
                    _attr: {
                      invisible: [['group_uom', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'mt8'
                      },
                      _button_uom__product_uom_categ_form_action: {
                        _attr: {
                          name: 'uom.product_uom_categ_form_action',
                          type: 'action',
                          string: 'Units of Measure',
                          icon: 'fa-arrow-right',
                          class: 'btn-link'
                        }
                      }
                    }
                  }
                }
              },
              _div_859: {
                _attr: {
                  title: 'Sending an email is useful if you need to share specific information or content about a product (instructions, rules, links, media, etc.). Create and set the email template from the product detail form (in Sales tab).',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_product_email_template: {}
                },
                _div_588: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_product_email_template: {
                    for: 'module_product_email_template',
                    string: 'Deliver Content by Email'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Send a product-specific email once the invoice is validated'
                    }
                  }
                }
              },
              _div_700: {
                _attr: {
                  title: 'Ability to select a package type in sales orders and to force a quantity that is a multiple of the number of units per package.',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_stock_packaging: {}
                },
                _div_153: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_stock_packaging: {
                    for: 'group_stock_packaging'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Sell products by multiple of unit # per package'
                    }
                  }
                }
              }
            },
            _h2_162: 'Pricing',
            _div: {
              _attr: {
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  title: 'Apply manual discounts on sales order lines or display discounts computed from pricelists (option to activate in the pricelist configuration).',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_discount_per_so_line: {}
                },
                _div_230: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_discount_per_so_line: {
                    for: 'group_discount_per_so_line'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Grant discounts on sales order lines'
                    }
                  }
                }
              },
              _div_668: {
                _attr: {
                  title: 'Boost your sales with multiple kinds of programs: Coupons, Promotions, Gift Card, Loyalty. Specific conditions can be set (products, customers, minimum purchase amount, period). Rewards can be discounts (% or amount) or free products.',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_loyalty: {}
                },
                _div_792: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_loyalty: {
                    for: 'module_loyalty',
                    string: 'Discounts, Loyalty & Gift Card'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Manage Promotions, coupons, loyalty cards, Gift cards & eWallet'
                    }
                  }
                }
              },
              _div_184: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_product_pricelist: {}
                },
                _div_736: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_product_pricelist: {
                    for: 'group_product_pricelist'
                  },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Set multiple prices per product, automated discounts, etc.'
                    }
                  },
                  _div_862: {
                    _attr: {
                      invisible: [['group_product_pricelist', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'mt16'
                      },
                      group_sale_pricelist: {
                        invisible: '1'
                      },
                      product_pricelist_setting: {
                        widget: 'radio',
                        class: 'o_light_label'
                      }
                    },
                    _div_674: {
                      _attr: {
                        class: 'mt8'
                      },
                      _button_product__product_pricelist_action2: {
                        _attr: {
                          name: 'product.product_pricelist_action2',
                          type: 'action',
                          string: 'Pricelists',
                          icon: 'fa-arrow-right',
                          groups: 'product.group_product_pricelist',
                          class: 'btn-link'
                        }
                      }
                    }
                  }
                }
              },
              _div_507: {
                _attr: {
                  title: " To send invitations in B2B mode, open a contact or select several ones in list view and click on 'Portal Access Management' option in the dropdown menu *Action*.",
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  }
                },
                _div_364: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_auth_signup_uninvited: {
                    for: 'auth_signup_uninvited'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Let your customers log in to see their documents'
                    }
                  },
                  _div_410: {
                    _attr: {
                      class: 'mt8'
                    },
                    auth_signup_uninvited: {
                      widget: 'radio',
                      class: 'o_light_label',
                      required: 'True',
                      options: "{'horizontal': true}"
                    }
                  }
                }
              },
              _div_618: {
                _attr: {
                  title: 'The margin is computed as the sum of product sales prices minus the cost set in their detail form.',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_sale_margin: {}
                },
                _div_215: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_sale_margin: {
                    for: 'module_sale_margin'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Show margins on orders'
                    }
                  }
                }
              }
            },
            _h2_767: 'Quotations & Orders',
            _div_quotation_order_setting_container: {
              _attr: {
                name: 'quotation_order_setting_container',
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
                  portal_confirmation_sign: {}
                },
                _div_620: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_portal_confirmation_sign: {
                    for: 'portal_confirmation_sign'
                  },
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
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Request an online signature to confirm orders'
                    }
                  }
                }
              },
              _div_178: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  portal_confirmation_pay: {}
                },
                _div_874: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_portal_confirmation_pay: {
                    for: 'portal_confirmation_pay'
                  },
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
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Request an online payment to confirm orders'
                    }
                  },
                  _div_790: {
                    _attr: {
                      invisible: [['portal_confirmation_pay', '=', false]],
                      class: 'mt8'
                    },
                    _button_payment__action_payment_provider: {
                      _attr: {
                        name: 'payment.action_payment_provider',
                        type: 'action',
                        string: 'Payment Providers',
                        icon: 'fa-arrow-right',
                        class: 'btn-link'
                      }
                    }
                  }
                }
              },
              _div_145: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  use_quotation_validity_days: {}
                },
                _div_696: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_use_quotation_validity_days: {
                    for: 'use_quotation_validity_days'
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
                      text: 'Set a default validity on your quotations'
                    }
                  },
                  _div_296: {
                    _attr: {
                      invisible: [['use_quotation_validity_days', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'mt16'
                      },
                      _span: {
                        _attr: {
                          class: 'col-lg-3',
                          text: 'Default Limit:'
                        },
                        quotation_validity_days: {
                          required: [['use_quotation_validity_days', '=', true]]
                        }
                      }
                    }
                  }
                }
              },
              _div_173: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_warning_sale: {}
                },
                _div_974: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_warning_sale: {
                    for: 'group_warning_sale',
                    string: 'Sale Warnings'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Get warnings in orders for products or customers'
                    }
                  }
                }
              },
              _div_323: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_auto_done_setting: {}
                },
                _div_874: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_auto_done_setting: {
                    for: 'group_auto_done_setting'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'No longer edit orders once confirmed'
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
                  group_proforma_sales: {}
                },
                _div_255: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_proforma_sales: {
                    for: 'group_proforma_sales'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Allows you to send Pro-Forma Invoice to your customers'
                    }
                  }
                }
              }
            },
            _h2_810: {
              _attr: {
                class: 'mt32',
                text: 'Shipping'
              }
            },
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
                  module_delivery: {}
                },
                _div_178: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_delivery: {
                    for: 'module_delivery'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Compute shipping costs on orders'
                    }
                  }
                }
              },
              _div_693: {
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
                _div_685: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_delivery_ups: {
                    for: 'module_delivery_ups'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Compute shipping costs and ship with UPS'
                    }
                  },
                  _div_116: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {}
                  }
                }
              },
              _div_724: {
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
                _div_475: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_delivery_dhl: {
                    for: 'module_delivery_dhl'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Compute shipping costs and ship with DHL'
                    }
                  },
                  _div_763: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {}
                  }
                }
              },
              _div_196: {
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
                _div_958: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_delivery_fedex: {
                    for: 'module_delivery_fedex'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Compute shipping costs and ship with FedEx'
                    }
                  },
                  _div_808: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {}
                  }
                }
              },
              _div_191: {
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
                _div_489: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_delivery_usps: {
                    for: 'module_delivery_usps'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Compute shipping costs and ship with USPS'
                    }
                  },
                  _div_753: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {}
                  }
                }
              },
              _div_515: {
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
                _div_470: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_delivery_bpost: {
                    for: 'module_delivery_bpost'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Compute shipping costs and ship with bpost'
                    }
                  },
                  _div_436: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {}
                  }
                }
              },
              _div_445: {
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
                _div_588: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_delivery_easypost: {
                    for: 'module_delivery_easypost'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Compute shipping costs and ship with Easypost'
                    }
                  },
                  _div_567: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {}
                  }
                }
              },
              _div_973: {
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
                _div_299: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_delivery_sendcloud: {
                    for: 'module_delivery_sendcloud'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Compute shipping costs and ship with Sendcloud'
                    }
                  },
                  _div_265: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {}
                  }
                }
              }
            },
            _h2_715: 'Invoicing',
            _div_invoicing_setting_container: {
              _attr: {
                name: 'invoicing_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  title: 'This default value is applied to any new product created. This can be changed in the product detail form.',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_default_invoice_policy: {
                    for: 'default_invoice_policy'
                  },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Quantities to invoice from sales orders'
                    }
                  },
                  _div_307: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'mt16'
                      },
                      default_invoice_policy: {
                        widget: 'radio',
                        class: 'o_light_label'
                      }
                    }
                  }
                }
              },
              _div_236: {
                _attr: {
                  invisible: ['|', ['default_invoice_policy', '!=', 'order'], ['portal_confirmation_pay', '=', false]],
                  class: 'col-xs-12 col-md-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  automatic_invoice: {}
                },
                _div_584: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_automatic_invoice: {
                    for: 'automatic_invoice'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Generate the invoice automatically when the online payment is confirmed'
                    }
                  },
                  _div_113: {
                    _attr: {
                      groups: 'base.group_no_one',
                      invisible: [['automatic_invoice', '=', false]]
                    },
                    _label_invoice_mail_template_id: {
                      for: 'invoice_mail_template_id',
                      class: 'o_light_label'
                    },
                    invoice_mail_template_id: {
                      class: 'oe_inline',
                      no_create: true
                    }
                  }
                }
              },
              _div_924: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  }
                },
                _div_563: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _span: {
                    _attr: {
                      class: 'o_form_label',
                      text: 'Down Payments'
                    }
                  },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Product used for down payments'
                    }
                  },
                  _div_690: {
                    _attr: {
                      class: 'text-muted'
                    },
                    deposit_default_product_id: {
                      context: {
                        default_detailed_type: 'service'
                      }
                    }
                  }
                }
              }
            },
            _h2_386: {
              _attr: {
                class: 'mt32',
                text: 'Connectors'
              }
            },
            _div_646: {
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
                  module_sale_amazon: {
                    widget: 'upgrade_boolean'
                  }
                },
                _div_936: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_sale_amazon: {
                    for: 'module_sale_amazon'
                  },
                  _a: {
                    _attr: {
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Import Amazon orders and sync deliveries'
                    }
                  },
                  _div_amazon_connector: {
                    _attr: {
                      name: 'amazon_connector',
                      invisible: [['module_sale_amazon', '=', false]],
                      class: 'content-group'
                    }
                  }
                }
              }
            },
            _div_492: {}
          }
        }
      }
    }
  },

  action_sale_config_settings: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Settings',
    type: 'ir.actions.act_window',
    res_model: 'res.config.settings',
    context: {
      module: 'sale_management',
      bin_size: false
    },
    views: {
      tree: 'res_config_settings_view_form',
      form: '=======todo=========='
    }
  }
}

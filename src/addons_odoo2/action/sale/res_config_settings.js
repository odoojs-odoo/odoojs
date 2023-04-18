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
                _div_667: {
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
                      text: 'Sell variants of a product using attributes (size, color, etc.)'
                    }
                  },
                  _div_617: {
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
              _div_232: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_sale_product_matrix: {}
                },
                _div_103: {
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
              _div_128: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_uom: {}
                },
                _div_959: {
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
                  _div_968: {
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
                          string: 'Units of Measure',
                          class: 'btn-link',
                          type: 'action',
                          icon: 'fa-arrow-right'
                        }
                      }
                    }
                  }
                }
              },
              _div_507: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'Sending an email is useful if you need to share specific information or content about a product (instructions, rules, links, media, etc.). Create and set the email template from the product detail form (in Sales tab).'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_product_email_template: {}
                },
                _div_577: {
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
              _div_429: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'Ability to select a package type in sales orders and to force a quantity that is a multiple of the number of units per package.'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_stock_packaging: {}
                },
                _div_972: {
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
            _h2_897: 'Pricing',
            _div: {
              _attr: {
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'Apply manual discounts on sales order lines or display discounts computed from pricelists (option to activate in the pricelist configuration).'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_discount_per_so_line: {}
                },
                _div_392: {
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
              _div_420: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'Boost your sales with multiple kinds of programs: Coupons, Promotions, Gift Card, Loyalty. Specific conditions can be set (products, customers, minimum purchase amount, period). Rewards can be discounts (% or amount) or free products.'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_loyalty: {}
                },
                _div_227: {
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
              _div_425: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_product_pricelist: {}
                },
                _div_422: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_product_pricelist: {
                    for: 'group_product_pricelist'
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
                      text: 'Set multiple prices per product, automated discounts, etc.'
                    }
                  },
                  _div_146: {
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
                    _div_589: {
                      _attr: {
                        class: 'mt8'
                      },
                      _button_product__product_pricelist_action2: {
                        _attr: {
                          name: 'product.product_pricelist_action2',
                          string: 'Pricelists',
                          groups: 'product.group_product_pricelist',
                          class: 'btn-link',
                          type: 'action',
                          icon: 'fa-arrow-right'
                        }
                      }
                    }
                  }
                }
              },
              _div_484: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: " To send invitations in B2B mode, open a contact or select several ones in list view and click on 'Portal Access Management' option in the dropdown menu *Action*."
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  }
                },
                _div_471: {
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
                  _div_817: {
                    _attr: {
                      class: 'mt8'
                    },
                    auth_signup_uninvited: {
                      widget: 'radio',
                      class: 'o_light_label',
                      options: "{'horizontal': true}"
                    }
                  }
                }
              },
              _div_197: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'The margin is computed as the sum of product sales prices minus the cost set in their detail form.'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_sale_margin: {}
                },
                _div_150: {
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
            _h2_505: 'Quotations & Orders',
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
                _div_644: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_portal_confirmation_sign: {
                    for: 'portal_confirmation_sign'
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
                      text: 'Request an online signature to confirm orders'
                    }
                  }
                }
              },
              _div_163: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  portal_confirmation_pay: {}
                },
                _div_240: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_portal_confirmation_pay: {
                    for: 'portal_confirmation_pay'
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
                      text: 'Request an online payment to confirm orders'
                    }
                  },
                  _div_558: {
                    _attr: {
                      invisible: [['portal_confirmation_pay', '=', false]],
                      class: 'mt8'
                    },
                    _button_payment__action_payment_provider: {
                      _attr: {
                        name: 'payment.action_payment_provider',
                        string: 'Payment Providers',
                        class: 'btn-link',
                        type: 'action',
                        icon: 'fa-arrow-right'
                      }
                    }
                  }
                }
              },
              _div_140: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  use_quotation_validity_days: {}
                },
                _div_634: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_use_quotation_validity_days: {
                    for: 'use_quotation_validity_days'
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
                      text: 'Set a default validity on your quotations'
                    }
                  },
                  _div_965: {
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
              _div_892: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_warning_sale: {}
                },
                _div_824: {
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
              _div_522: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_auto_done_setting: {}
                },
                _div_118: {
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
              _div_849: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_proforma_sales: {}
                },
                _div_508: {
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
            _h2_327: {
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
                _div_503: {
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
              _div_157: {
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
                _div_926: {
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
                  _div_362: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {}
                  }
                }
              },
              _div_918: {
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
                _div_157: {
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
                  _div_861: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {}
                  }
                }
              },
              _div_520: {
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
                _div_477: {
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
                  _div_696: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {}
                  }
                }
              },
              _div_518: {
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
                _div_704: {
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
                  _div_345: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {}
                  }
                }
              },
              _div_301: {
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
                _div_992: {
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
                  _div_884: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {}
                  }
                }
              },
              _div_686: {
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
                _div_268: {
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
                  _div_258: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {}
                  }
                }
              },
              _div_127: {
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
                _div_825: {
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
                  _div_599: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {}
                  }
                }
              }
            },
            _h2_695: 'Invoicing',
            _div_invoicing_setting_container: {
              _attr: {
                name: 'invoicing_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'This default value is applied to any new product created. This can be changed in the product detail form.'
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
                      class: 'o_doc_link',
                      title: 'Documentation'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Quantities to invoice from sales orders'
                    }
                  },
                  _div_618: {
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
              _div_229: {
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
                _div_286: {
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
                  _div_507: {
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
              _div_790: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  }
                },
                _div_116: {
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
                      class: 'o_doc_link',
                      title: 'Documentation'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Product used for down payments'
                    }
                  },
                  _div_221: {
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
            _h2_401: {
              _attr: {
                class: 'mt32',
                text: 'Connectors'
              }
            },
            _div_140: {
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
                _div_181: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_sale_amazon: {
                    for: 'module_sale_amazon'
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
            _div_982: {}
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

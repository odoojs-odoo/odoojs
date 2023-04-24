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
                  id: 'variant_options',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_product_variant: {}
                },
                _div_627: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_product_variant: { for: 'group_product_variant' },
                  _a: {
                    _attr: {
                      href: 'https://www.odoo.com/documentation/16.0/applications/sales/sales/products_prices/products/variants.html',
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
                  _div_193: {
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
              _div_444: {
                _attr: {
                  id: 'product_matrix',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_sale_product_matrix: {}
                },
                _div_582: {
                  _attr: { class: 'o_setting_right_pane' },
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
              _div_306: {
                _attr: {
                  id: 'uom_settings',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_uom: {}
                },
                _div_481: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_uom: { for: 'group_uom' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Sell and purchase products in different units of measure'
                    }
                  },
                  _div_664: {
                    _attr: {
                      invisible: [['group_uom', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: { class: 'mt8' },
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
              _div_723: {
                _attr: {
                  id: 'email_template',
                  title: 'Sending an email is useful if you need to share specific information or content about a product (instructions, rules, links, media, etc.). Create and set the email template from the product detail form (in Sales tab).',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_product_email_template: {}
                },
                _div_777: {
                  _attr: { class: 'o_setting_right_pane' },
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
              _div_248: {
                _attr: {
                  id: 'stock_packaging',
                  title: 'Ability to select a package type in sales orders and to force a quantity that is a multiple of the number of units per package.',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_stock_packaging: {}
                },
                _div_282: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_stock_packaging: { for: 'group_stock_packaging' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Sell products by multiple of unit # per package'
                    }
                  }
                }
              }
            },
            _h2_425: 'Pricing',
            _div: {
              _attr: {
                id: 'pricing_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  id: 'discount_sale_order_lines',
                  title: 'Apply manual discounts on sales order lines or display discounts computed from pricelists (option to activate in the pricelist configuration).',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_discount_per_so_line: {}
                },
                _div_410: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_discount_per_so_line: { for: 'group_discount_per_so_line' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Grant discounts on sales order lines'
                    }
                  }
                }
              },
              _div_452: {
                _attr: {
                  id: 'coupon_settings',
                  title: 'Boost your sales with multiple kinds of programs: Coupons, Promotions, Gift Card, Loyalty. Specific conditions can be set (products, customers, minimum purchase amount, period). Rewards can be discounts (% or amount) or free products.',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_loyalty: {}
                },
                _div_297: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_loyalty: {
                    for: 'module_loyalty',
                    string: 'Discounts, Loyalty & Gift Card'
                  },
                  _div: {
                    _attr: {
                      id: 'sale_coupon',
                      class: 'text-muted',
                      text: 'Manage Promotions, coupons, loyalty cards, Gift cards & eWallet'
                    }
                  }
                }
              },
              _div_744: {
                _attr: {
                  id: 'pricelist_configuration',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_product_pricelist: {}
                },
                _div_951: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_product_pricelist: { for: 'group_product_pricelist' },
                  _a: {
                    _attr: {
                      href: 'https://www.odoo.com/documentation/16.0/applications/sales/sales/products_prices/prices/pricing.html',
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
                  _div_143: {
                    _attr: {
                      invisible: [['group_product_pricelist', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: { class: 'mt16' },
                      group_sale_pricelist: { invisible: '1' },
                      product_pricelist_setting: {
                        widget: 'radio',
                        class: 'o_light_label'
                      }
                    },
                    _div_611: {
                      _attr: { class: 'mt8' },
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
              _div_494: {
                _attr: {
                  id: 'auth_signup_documents',
                  title: " To send invitations in B2B mode, open a contact or select several ones in list view and click on 'Portal Access Management' option in the dropdown menu *Action*.",
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' }
                },
                _div_811: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_auth_signup_uninvited: { for: 'auth_signup_uninvited' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Let your customers log in to see their documents'
                    }
                  },
                  _div_237: {
                    _attr: { class: 'mt8' },
                    auth_signup_uninvited: {
                      widget: 'radio',
                      class: 'o_light_label',
                      required: 'True',
                      options: "{'horizontal': true}"
                    }
                  }
                }
              },
              _div_155: {
                _attr: {
                  id: 'show_margins',
                  title: 'The margin is computed as the sum of product sales prices minus the cost set in their detail form.',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_sale_margin: {}
                },
                _div_734: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_sale_margin: { for: 'module_sale_margin' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Show margins on orders'
                    }
                  }
                }
              }
            },
            _h2_728: 'Quotations & Orders',
            _div_quotation_order_setting_container: {
              _attr: {
                name: 'quotation_order_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  id: 'sale_config_online_confirmation_sign',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  portal_confirmation_sign: {}
                },
                _div_139: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_portal_confirmation_sign: { for: 'portal_confirmation_sign' },
                  _a: {
                    _attr: {
                      href: 'https://www.odoo.com/documentation/16.0/applications/sales/sales/send_quotations/get_signature_to_validate.html',
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
              _div_580: {
                _attr: {
                  id: 'sale_config_online_confirmation_pay',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  portal_confirmation_pay: {}
                },
                _div_828: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_portal_confirmation_pay: { for: 'portal_confirmation_pay' },
                  _a: {
                    _attr: {
                      href: 'https://www.odoo.com/documentation/16.0/applications/sales/sales/send_quotations/get_paid_to_validate.html',
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
                  _div_385: {
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
              _div_655: {
                _attr: {
                  id: 'quotation_validity_days',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  use_quotation_validity_days: {}
                },
                _div_266: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_use_quotation_validity_days: { for: 'use_quotation_validity_days' },
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
                  _div_425: {
                    _attr: {
                      invisible: [['use_quotation_validity_days', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: { class: 'mt16' },
                      _span: {
                        _attr: {
                          class: 'col-lg-3',
                          text: ['Default Limit:', 'days']
                        },
                        quotation_validity_days: { required: [['use_quotation_validity_days', '=', true]] }
                      }
                    }
                  }
                }
              },
              _div_965: {
                _attr: {
                  id: 'order_warnings',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_warning_sale: {}
                },
                _div_283: {
                  _attr: { class: 'o_setting_right_pane' },
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
              _div_633: {
                _attr: {
                  id: 'no_edit_order',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_auto_done_setting: {}
                },
                _div_879: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_auto_done_setting: { for: 'group_auto_done_setting' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'No longer edit orders once confirmed'
                    }
                  }
                }
              },
              _div_716: {
                _attr: {
                  id: 'proforma_configuration',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_proforma_sales: {}
                },
                _div_230: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_proforma_sales: { for: 'group_proforma_sales' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Allows you to send Pro-Forma Invoice to your customers'
                    }
                  }
                }
              }
            },
            _h2_206: {
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
                  id: 'delivery',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_delivery: {}
                },
                _div_412: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_delivery: { for: 'module_delivery' },
                  _div: {
                    _attr: {
                      id: 'delivery_carrier',
                      class: 'text-muted',
                      text: 'Compute shipping costs on orders'
                    }
                  }
                }
              },
              _div_903: {
                _attr: {
                  id: 'ups',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_delivery_ups: { widget: 'upgrade_boolean' }
                },
                _div_689: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_delivery_ups: { for: 'module_delivery_ups' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Compute shipping costs and ship with UPS'
                    }
                  },
                  _div_355: {
                    _attr: { class: 'content-group' },
                    _div: {
                      _attr: { id: 'sale_delivery_ups' }
                    }
                  }
                }
              },
              _div_866: {
                _attr: {
                  id: 'shipping_costs_dhl',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_delivery_dhl: { widget: 'upgrade_boolean' }
                },
                _div_795: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_delivery_dhl: { for: 'module_delivery_dhl' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Compute shipping costs and ship with DHL'
                    }
                  },
                  _div_938: {
                    _attr: { class: 'content-group' },
                    _div: {
                      _attr: { id: 'sale_delivery_dhl' }
                    }
                  }
                }
              },
              _div_112: {
                _attr: {
                  id: 'shipping_costs_fedex',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_delivery_fedex: { widget: 'upgrade_boolean' }
                },
                _div_900: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_delivery_fedex: { for: 'module_delivery_fedex' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Compute shipping costs and ship with FedEx'
                    }
                  },
                  _div_577: {
                    _attr: { class: 'content-group' },
                    _div: {
                      _attr: { id: 'sale_delivery_fedex' }
                    }
                  }
                }
              },
              _div_807: {
                _attr: {
                  id: 'shipping_costs_usps',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_delivery_usps: { widget: 'upgrade_boolean' }
                },
                _div_900: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_delivery_usps: { for: 'module_delivery_usps' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Compute shipping costs and ship with USPS'
                    }
                  },
                  _div_856: {
                    _attr: { class: 'content-group' },
                    _div: {
                      _attr: { id: 'sale_delivery_usps' }
                    }
                  }
                }
              },
              _div_563: {
                _attr: {
                  id: 'shipping_costs_bpost',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_delivery_bpost: { widget: 'upgrade_boolean' }
                },
                _div_294: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_delivery_bpost: { for: 'module_delivery_bpost' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Compute shipping costs and ship with bpost'
                    }
                  },
                  _div_255: {
                    _attr: { class: 'content-group' },
                    _div: {
                      _attr: { id: 'sale_delivery_bpost' }
                    }
                  }
                }
              },
              _div_618: {
                _attr: {
                  id: 'shipping_costs_easypost',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_delivery_easypost: { widget: 'upgrade_boolean' }
                },
                _div_437: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_delivery_easypost: { for: 'module_delivery_easypost' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Compute shipping costs and ship with Easypost'
                    }
                  },
                  _div_457: {
                    _attr: { class: 'content-group' },
                    _div: {
                      _attr: { id: 'sale_delivery_easypost' }
                    }
                  }
                }
              },
              _div_266: {
                _attr: {
                  id: 'shipping_costs_sendcloud',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_delivery_sendcloud: { widget: 'upgrade_boolean' }
                },
                _div_918: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_delivery_sendcloud: { for: 'module_delivery_sendcloud' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Compute shipping costs and ship with Sendcloud'
                    }
                  },
                  _div_336: {
                    _attr: { class: 'content-group' },
                    _div: {
                      _attr: { id: 'sale_delivery_sendcloud' }
                    }
                  }
                }
              }
            },
            _h2_233: 'Invoicing',
            _div_invoicing_setting_container: {
              _attr: {
                name: 'invoicing_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  id: 'sales_settings_invoicing_policy',
                  title: 'This default value is applied to any new product created. This can be changed in the product detail form.',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_default_invoice_policy: { for: 'default_invoice_policy' },
                  _a: {
                    _attr: {
                      href: 'https://www.odoo.com/documentation/16.0/applications/sales/sales/invoicing/invoicing_policy.html',
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
                  _div_682: {
                    _attr: { class: 'content-group' },
                    _div: {
                      _attr: { class: 'mt16' },
                      default_invoice_policy: {
                        widget: 'radio',
                        class: 'o_light_label'
                      }
                    }
                  }
                }
              },
              _div_525: {
                _attr: {
                  id: 'automatic_invoicing',
                  invisible: ['|', ['default_invoice_policy', '!=', 'order'], ['portal_confirmation_pay', '=', false]],
                  class: 'col-xs-12 col-md-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  automatic_invoice: {}
                },
                _div_544: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_automatic_invoice: { for: 'automatic_invoice' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Generate the invoice automatically when the online payment is confirmed'
                    }
                  },
                  _div_389: {
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
              _div_826: {
                _attr: {
                  id: 'down_payments',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' }
                },
                _div_596: {
                  _attr: { class: 'o_setting_right_pane' },
                  _span: {
                    _attr: {
                      class: 'o_form_label',
                      text: 'Down Payments'
                    }
                  },
                  _a: {
                    _attr: {
                      href: 'https://www.odoo.com/documentation/16.0/applications/sales/sales/invoicing/down_payment.html',
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
                  _div_831: {
                    _attr: { class: 'text-muted' },
                    deposit_default_product_id: {
                      context: { default_detailed_type: 'service' }
                    }
                  }
                }
              }
            },
            _h2_385: {
              _attr: {
                class: 'mt32',
                text: 'Connectors'
              }
            },
            _div_650: {
              _attr: {
                id: 'connectors_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  id: 'amazon_connector',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_sale_amazon: { widget: 'upgrade_boolean' }
                },
                _div_766: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_sale_amazon: { for: 'module_sale_amazon' },
                  _a: {
                    _attr: {
                      href: 'https://www.odoo.com/documentation/16.0/applications/sales/sales/amazon_connector/setup.html',
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
            _div_964: {
              _attr: { id: 'sale_ebay' }
            }
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
    search_view_id: 'tooooooodoooooo',
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

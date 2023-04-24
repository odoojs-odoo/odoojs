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
          country_code: {
            groups: 'account.group_account_manager',
            invisible: '1'
          },
          _div: {
            _attr: {
              string: 'Invoicing',
              groups: 'account.group_account_manager',
              class: 'app_settings_block'
            },
            has_chart_of_accounts: { invisible: '1' },
            has_accounting_entries: { invisible: '1' },
            _h2: {
              _attr: {
                invisible: [['has_accounting_entries', '!=', false]],
                text: 'Fiscal Localization'
              }
            },
            _div_fiscal_localization_setting_container: {
              _attr: {
                name: 'fiscal_localization_setting_container',
                invisible: [['has_accounting_entries', '!=', false]],
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: { class: 'col-12 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' }
                },
                _div_329: {
                  _attr: { class: 'o_setting_right_pane' },
                  _span: {
                    _attr: {
                      class: 'o_form_label',
                      text: 'Fiscal Localization'
                    }
                  },
                  _span_673: {
                    _attr: {
                      title: 'Values set here are company-specific.',
                      groups: 'base.group_multi_company',
                      class: 'fa fa-lg fa-building-o'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Taxes, fiscal positions, chart of accounts & legal statements for your country'
                    }
                  },
                  _div_162: {
                    _attr: { class: 'content-group' },
                    _div: {
                      _attr: { class: 'row mt16' },
                      _label_chart_template_id: {
                        for: 'chart_template_id',
                        string: 'Package',
                        class: 'col-2 o_light_label'
                      },
                      chart_template_id: {
                        no_open: true,
                        no_create: true
                      }
                    },
                    _div_760: {
                      _attr: { class: 'mt8' },
                      _button_account__open_account_charts_modules: {
                        _attr: {
                          name: 'account.open_account_charts_modules',
                          type: 'action',
                          string: 'Install More Packages',
                          icon: 'fa-arrow-right',
                          class: 'btn-link'
                        }
                      }
                    }
                  }
                }
              }
            },
            _h2_246: 'Taxes',
            _div_default_taxes_setting_container: {
              _attr: {
                name: 'default_taxes_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  id: 'default_taxes',
                  title: 'These taxes are set in any new product created.',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' }
                },
                _div_187: {
                  _attr: { class: 'o_setting_right_pane' },
                  _span: {
                    _attr: {
                      class: 'o_form_label',
                      text: 'Default Taxes'
                    }
                  },
                  _span_569: {
                    _attr: {
                      title: 'Values set here are company-specific.',
                      groups: 'base.group_multi_company',
                      class: 'fa fa-lg fa-building-o'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Default taxes applied to local transactions'
                    }
                  },
                  _div_772: {
                    _attr: { class: 'content-group' },
                    _div: {
                      _attr: { class: 'row mt16' },
                      _label_sale_tax_id: {
                        for: 'sale_tax_id',
                        string: 'Sales Tax',
                        class: 'col-lg-3 o_light_label'
                      },
                      sale_tax_id: {
                        domain: { todo_ctx: "[('type_tax_use', 'in', ('sale', 'all')), ('company_id', '=', company_id)]" }
                      }
                    },
                    _div_732: {
                      _attr: { class: 'row' },
                      _label_purchase_tax_id: {
                        for: 'purchase_tax_id',
                        string: 'Purchase Tax',
                        class: 'col-lg-3 o_light_label'
                      },
                      purchase_tax_id: {
                        domain: { todo_ctx: "[('type_tax_use', 'in', ('purchase', 'all')), ('company_id', '=', company_id)]" }
                      }
                    }
                  }
                }
              },
              _div_691: {
                _attr: {
                  id: 'rounding_method',
                  title: 'A rounding per line is advised if your prices are tax-included. That way, the sum of line subtotals equals the total with taxes.',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' }
                },
                _div_105: {
                  _attr: { class: 'o_setting_right_pane' },
                  _span: {
                    _attr: {
                      class: 'o_form_label',
                      text: 'Rounding Method'
                    }
                  },
                  _span_739: {
                    _attr: {
                      title: 'Values set here are company-specific.',
                      groups: 'base.group_multi_company',
                      class: 'fa fa-lg fa-building-o'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'How total tax amount is computed in orders and invoices'
                    }
                  },
                  _div_703: {
                    _attr: { class: 'content-group' },
                    tax_calculation_rounding_method: {
                      widget: 'radio',
                      class: 'o_light_label mt16'
                    }
                  }
                }
              },
              _div_499: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' }
                },
                _div_129: {
                  _attr: { class: 'o_setting_right_pane' },
                  _span: {
                    _attr: {
                      class: 'o_form_label',
                      text: 'Cash Discount Tax Reduction'
                    }
                  },
                  _span_607: {
                    _attr: {
                      title: 'Values set here are company-specific.',
                      groups: 'base.group_multi_company',
                      class: 'fa fa-lg fa-building-o'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'When will the tax be reduced when offering a cash discount'
                    }
                  },
                  _div_658: {
                    _attr: { class: 'content-group' },
                    early_pay_discount_computation: {}
                  }
                }
              },
              _div_996: {
                _attr: {
                  id: 'taxcloud_settings',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_account_taxcloud: { widget: 'upgrade_boolean' }
                },
                _div_account_taxcloud_right_pane: {
                  _attr: {
                    name: 'account_taxcloud_right_pane',
                    class: 'o_setting_right_pane'
                  },
                  _label_module_account_taxcloud: {
                    for: 'module_account_taxcloud',
                    string: 'TaxCloud'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Compute tax rates based on U.S. ZIP codes'
                    }
                  }
                }
              },
              _div_694: {
                _attr: {
                  id: 'eu_service',
                  title: 'If you sell goods and services to customers in a foreign EU country, you must charge VAT based on the delivery address. This rule applies regardless of where you are located.',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_l10n_eu_oss: {}
                },
                _div_l10n_eu_oss_right_pane: {
                  _attr: {
                    name: 'l10n_eu_oss_right_pane',
                    class: 'o_setting_right_pane'
                  },
                  _label_module_l10n_eu_oss: { for: 'module_l10n_eu_oss' },
                  _a: {
                    _attr: {
                      href: 'https://www.odoo.com/documentation/16.0/applications/finance/accounting/taxation/taxes/eu_distance_selling.html',
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Apply VAT of the EU country to which goods and services are delivered.'
                    }
                  }
                }
              },
              _div_415: {
                _attr: {
                  id: 'tax_exigibility',
                  title: 'Select this if the taxes should use cash basis, which will create an entry for such taxes on a given account during reconciliation.',
                  groups: 'account.group_account_user',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  tax_exigibility: {}
                },
                _div_613: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_tax_exigibility: { for: 'tax_exigibility' },
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
                      text: 'Allow to configure taxes using cash basis'
                    }
                  },
                  _div_814: {
                    _attr: {
                      invisible: [['tax_exigibility', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: { class: 'row mt16' },
                      _label_tax_cash_basis_journal_id: {
                        for: 'tax_cash_basis_journal_id',
                        class: 'col-lg-3 o_light_label'
                      },
                      tax_cash_basis_journal_id: {}
                    },
                    _div_547: {
                      _attr: { class: 'row mt16' },
                      _label_account_cash_basis_base_account_id: {
                        for: 'account_cash_basis_base_account_id',
                        class: 'col-lg-3 o_light_label'
                      },
                      account_cash_basis_base_account_id: {}
                    }
                  }
                }
              },
              _div_709: {
                _attr: {
                  id: 'tax_fiscal_country_234',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' }
                },
                _div_206: {
                  _attr: { class: 'o_setting_right_pane' },
                  _span: {
                    _attr: {
                      class: 'o_form_label',
                      text: 'Fiscal Country'
                    }
                  },
                  _span_278: {
                    _attr: {
                      title: 'Values set here are company-specific.',
                      groups: 'base.group_multi_company',
                      class: 'fa fa-lg fa-building-o'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Domestic country of your accounting'
                    }
                  },
                  _div_622: {
                    _attr: { class: 'text-muted' },
                    account_fiscal_country_id: {
                      no_create: true,
                      no_open: true
                    }
                  }
                }
              }
            },
            _h2_198: 'Currencies',
            _div_main_currency_setting_container: {
              _attr: {
                name: 'main_currency_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  id: 'main_currency',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' }
                },
                _div_346: {
                  _attr: { class: 'o_setting_right_pane' },
                  _span: {
                    _attr: {
                      class: 'o_form_label',
                      text: 'Main Currency'
                    }
                  },
                  _span_789: {
                    _attr: {
                      title: 'Values set here are company-specific.',
                      groups: 'base.group_multi_company',
                      class: 'fa fa-lg fa-building-o'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Main currency of your company'
                    }
                  },
                  _div_713: {
                    _attr: { class: 'content-group' },
                    _div: {
                      _attr: { class: 'row mt16' },
                      _label_currency_id: {
                        for: 'currency_id',
                        class: 'col-lg-3 o_light_label'
                      },
                      currency_id: {
                        context: { active_test: false },
                        no_create_edit: true,
                        no_open: true
                      },
                      group_multi_currency: { invisible: '1' }
                    },
                    _div_809: {
                      _attr: { class: 'mt8' },
                      _button_base__action_currency_form: {
                        _attr: {
                          name: 'base.action_currency_form',
                          type: 'action',
                          string: 'Currencies',
                          icon: 'fa-arrow-right',
                          class: 'btn-link'
                        }
                      }
                    }
                  }
                }
              },
              _div_382: {
                _attr: {
                  id: 'update_exchange_rates',
                  invisible: [['group_multi_currency', '=', false]],
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_currency_rate_live: { widget: 'upgrade_boolean' }
                },
                _div_263: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_currency_rate_live: { for: 'module_currency_rate_live' },
                  _div: {
                    _attr: {
                      id: 'update_currency_live',
                      class: 'text-muted',
                      text: 'Update exchange rates automatically'
                    }
                  }
                }
              }
            },
            _h2_920: 'Customer Invoices',
            _div: {
              _attr: {
                id: 'invoicing_settings',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  id: 'default_setting_options',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' }
                },
                _div_752: {
                  _attr: { class: 'o_setting_right_pane' },
                  _span: {
                    _attr: {
                      class: 'o_form_label',
                      text: 'Default Sending Options'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Those options will be selected by default when clicking "Send & Print" on invoices'
                    }
                  },
                  _div_843: {
                    _attr: { class: 'mt16' },
                    _div: {
                      _attr: {
                        id: 'send_default',
                        class: 'content-group'
                      },
                      _div: {
                        invoice_is_print: {},
                        _label_invoice_is_print: { for: 'invoice_is_print' },
                        _span: {
                          _attr: {
                            title: 'Values set here are company-specific.',
                            class: 'fa fa-lg fa-building-o'
                          }
                        }
                      },
                      _div_122: {
                        invoice_is_email: {},
                        _label_invoice_is_email: { for: 'invoice_is_email' },
                        _span: {
                          _attr: {
                            title: 'Values set here are company-specific.',
                            class: 'fa fa-lg fa-building-o'
                          }
                        }
                      }
                    }
                  }
                }
              },
              _div_165: {
                _attr: {
                  id: 'send_invoices_followups',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_snailmail_account: {}
                },
                _div_858: {
                  _attr: {
                    id: 'snailmail_settings',
                    class: 'o_setting_right_pane'
                  },
                  _label_module_snailmail_account: { for: 'module_snailmail_account' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Send invoices and payment follow-ups by post'
                    }
                  }
                }
              },
              _div_877: {
                _attr: {
                  id: 'invoice_delivery_addresses',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_sale_delivery_address: {}
                },
                _div_682: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_sale_delivery_address: { for: 'group_sale_delivery_address' },
                  _a: {
                    _attr: {
                      href: 'https://www.odoo.com/documentation/16.0/applications/sales/sales/send_quotations/different_addresses.html',
                      title: 'Documentation',
                      class: 'o_doc_link'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Select specific invoice and delivery addresses'
                    }
                  }
                }
              },
              _div_709: {
                _attr: {
                  id: 'line_subtotals',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' }
                },
                _div_669: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_show_line_subtotals_tax_selection: { for: 'show_line_subtotals_tax_selection' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Line subtotals tax display'
                    }
                  },
                  _div_979: {
                    _attr: { class: 'mt16' },
                    show_line_subtotals_tax_selection: {
                      widget: 'radio',
                      class: 'o_light_label'
                    },
                    group_show_line_subtotals_tax_excluded: { invisible: '1' },
                    group_show_line_subtotals_tax_included: { invisible: '1' }
                  }
                }
              },
              _div_758: {
                _attr: {
                  id: 'get_invoice_warnings',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_warning_account: {}
                },
                _div_462: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_warning_account: {
                    for: 'group_warning_account',
                    string: 'Warnings'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Get warnings when invoicing specific customers'
                    }
                  }
                }
              },
              _div_754: {
                _attr: {
                  id: 'smallest_coinage_currency',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_cash_rounding: {}
                },
                _div_521: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_cash_rounding: { for: 'group_cash_rounding' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Define the smallest coinage of the currency used to pay by cash'
                    }
                  },
                  _div_240: {
                    _attr: { class: 'mt8' },
                    _button_account__rounding_list_action: {
                      _attr: {
                        name: 'account.rounding_list_action',
                        type: 'action',
                        string: 'Cash Roundings',
                        icon: 'fa-arrow-right',
                        invisible: [['group_cash_rounding', '=', false]],
                        class: 'btn-link'
                      }
                    }
                  }
                }
              },
              _div_897: {
                _attr: {
                  id: 'intrastat_statistics',
                  class: 'col-xs-12 col-md-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_account_intrastat: { widget: 'upgrade_boolean' }
                },
                _div_intrastat_right_pane: {
                  _attr: {
                    name: 'intrastat_right_pane',
                    class: 'o_setting_right_pane'
                  },
                  _label_module_account_intrastat: { for: 'module_account_intrastat' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Collect information and produce statistics on the trade in goods in Europe with intrastat'
                    }
                  }
                }
              },
              _div_887: {
                _attr: {
                  id: 'default_incoterm',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' }
                },
                _div_130: {
                  _attr: { class: 'o_setting_right_pane' },
                  _span: {
                    _attr: {
                      class: 'o_form_label',
                      text: 'Default Incoterm'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Default Incoterm of your company'
                    }
                  },
                  _div_121: {
                    _attr: { class: 'text-muted' },
                    incoterm_id: {}
                  }
                }
              },
              _div_131: {
                _attr: {
                  id: 'show_sale_receipts',
                  class: 'col-xs-12 col-md-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_show_sale_receipts: { widget: 'upgrade_boolean' }
                },
                _div_show_sale_receipts_right_pane: {
                  _attr: {
                    name: 'show_sale_receipts_right_pane',
                    class: 'o_setting_right_pane'
                  },
                  _label_group_show_sale_receipts: { for: 'group_show_sale_receipts' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Activate to create sale receipt'
                    }
                  }
                }
              },
              _div_257: {
                _attr: {
                  id: 'use_invoice_terms',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  use_invoice_terms: {}
                },
                _div_591: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_use_invoice_terms: { for: 'use_invoice_terms' },
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
                      text: 'Add your terms & conditions at the bottom of invoices/orders/quotations'
                    }
                  },
                  _div_598: {
                    _attr: {
                      invisible: [['use_invoice_terms', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: { class: 'mt16' },
                      terms_type: {
                        widget: 'radio',
                        class: 'o_light_label'
                      },
                      _div: {
                        invoice_terms: {
                          invisible: [['terms_type', '=', 'html']],
                          class: 'oe_account_terms mt-5 w-100',
                          placeholder: 'Insert your terms & conditions here...'
                        }
                      },
                      _div_685: {
                        _attr: {
                          invisible: [['terms_type', '!=', 'html']],
                          class: 'mt8'
                        },
                        _button_action_update_terms: {
                          _attr: {
                            name: 'action_update_terms',
                            type: 'object',
                            string: 'Update Terms',
                            icon: 'fa-arrow-right',
                            class: 'btn-link'
                          }
                        }
                      },
                      preview_ready: { invisible: '1' },
                      _div_133: {
                        _attr: {
                          invisible: [['preview_ready', '=', false]],
                          class: 'mt4 ms-1'
                        },
                        _a: {
                          _attr: {
                            href: '/terms',
                            class: 'btn-link',
                            text: 'Preview'
                          },
                          _i: {
                            _attr: { class: 'fa fa-arrow-right' }
                          }
                        }
                      }
                    }
                  }
                }
              },
              _div_581: {
                _attr: { class: 'col-xs-12 col-md-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  account_use_credit_limit: {}
                },
                _div_206: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_account_use_credit_limit: { for: 'account_use_credit_limit' },
                  _span: {
                    _attr: {
                      title: 'Values set here are company-specific.',
                      class: 'fa fa-lg fa-building-o'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Trigger alerts when creating Invoices and Sales Orders for Partners with a Total Receivable amount exceeding a limit.'
                    }
                  },
                  _div_661: {
                    _attr: {
                      invisible: [['account_use_credit_limit', '=', false]],
                      class: 'content-group mt-2'
                    },
                    _div: {
                      _attr: { class: 'row' },
                      _label_account_default_credit_limit: {
                        for: 'account_default_credit_limit',
                        class: 'col-lg-4 o_light_label'
                      },
                      account_default_credit_limit: {}
                    }
                  }
                }
              }
            },
            _h2_147: 'Customer Payments',
            _div_757: {
              _attr: {
                id: 'pay_invoice_online_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_account_payment: {}
                },
                _div_759: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_account_payment: { for: 'module_account_payment' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Let your customers pay their invoices online'
                    }
                  }
                }
              },
              _div_420: {
                _attr: {
                  id: 'account_batch_payment',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_account_batch_payment: { widget: 'upgrade_boolean' }
                },
                _div_308: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_account_batch_payment: {
                    for: 'module_account_batch_payment',
                    string: 'Batch Payments'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Group payments into a single batch to ease the reconciliation process'
                    }
                  }
                }
              },
              _div_968: {
                _attr: {
                  id: 'collect_customer_payment',
                  title: 'If you check this box, you will be able to collect payments using SEPA Direct Debit mandates.',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_account_sepa_direct_debit: {
                    widget: 'upgrade_boolean',
                    class: 'oe_inline'
                  }
                },
                _div_sepa_direct_debit_right_pane: {
                  _attr: {
                    name: 'sepa_direct_debit_right_pane',
                    class: 'o_setting_right_pane'
                  },
                  _label_module_account_sepa_direct_debit: {
                    for: 'module_account_sepa_direct_debit',
                    string: 'SEPA Direct Debit (SDD)'
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
                      text: 'Collect customer payments in one-click using Euro SEPA Service'
                    }
                  },
                  _div_502: {
                    _attr: {
                      invisible: [['module_account_sepa_direct_debit', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'text-warning mt16 mb4',
                        text: 'Save this page and come back here to set up the feature.'
                      }
                    }
                  }
                }
              },
              _div_485: {
                _attr: {
                  id: 'qr_code_invoices',
                  title: 'Add a QR-code to your invoices so that your customers can pay instantly with their mobile banking application.',
                  class: 'col-xs-12 col-md-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  qr_code: { class: 'oe_inline' }
                },
                _div_qr_code_right_pane: {
                  _attr: {
                    name: 'qr_code_right_pane',
                    class: 'o_setting_right_pane'
                  },
                  _label_qr_code: {
                    for: 'qr_code',
                    string: 'QR Codes'
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
                      text: 'Add a payment QR-code to your invoices'
                    }
                  }
                }
              }
            },
            _h2_975: 'Vendor Bills',
            _div_157: {
              _attr: {
                id: 'account_vendor_bills',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  id: 'show_purchase_receipts',
                  class: 'col-xs-12 col-md-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_show_purchase_receipts: { widget: 'upgrade_boolean' }
                },
                _div_show_purchase_receipts_right_pane: {
                  _attr: {
                    name: 'show_purchase_receipts_right_pane',
                    class: 'o_setting_right_pane'
                  },
                  _label_group_show_purchase_receipts: { for: 'group_show_purchase_receipts' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Activate to create purchase receipt'
                    }
                  }
                }
              }
            },
            _h2_880: 'Vendor Payments',
            _div_448: {
              _attr: {
                id: 'print_vendor_checks_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  id: 'print_checks',
                  groups: 'account.group_account_user',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_account_check_printing: {}
                },
                _div_534: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_account_check_printing: {
                    for: 'module_account_check_printing',
                    string: 'Checks'
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
                      id: 'print_bills_payment',
                      class: 'text-muted',
                      text: 'Print checks to pay your vendors'
                    }
                  }
                }
              },
              _div_546: {
                _attr: {
                  id: 'sepa_payments',
                  title: 'If you check this box, you will be able to register your payment using SEPA.',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_account_sepa: { widget: 'upgrade_boolean' }
                },
                _div_sepa_right_pane: {
                  _attr: {
                    name: 'sepa_right_pane',
                    class: 'o_setting_right_pane'
                  },
                  _label_module_account_sepa: { for: 'module_account_sepa' },
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
                      text: 'Pay your bills in one-click using Euro SEPA Service'
                    }
                  }
                }
              }
            },
            _h2_838: 'Digitization',
            _div_799: {
              _attr: {
                id: 'account_digitalization',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  id: 'account_ocr_settings',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_account_invoice_extract: { widget: 'upgrade_boolean' }
                },
                _div_693: {
                  _attr: {
                    id: 'digitalizeocr',
                    class: 'o_setting_right_pane'
                  },
                  _label_module_account_invoice_extract: { for: 'module_account_invoice_extract' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Digitize your PDF or scanned documents with OCR and Artificial Intelligence'
                    }
                  },
                  _div_666: {
                    _attr: {
                      id: 'msg_invoice_extract',
                      invisible: [['module_account_invoice_extract', '=', false]],
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'text-warning mt16 mb4',
                        text: 'Save this page and come back here to set up the feature.'
                      }
                    }
                  }
                }
              }
            },
            _t: {
              _attr: { groups: 'account.group_account_user' },
              _h2: 'Default Accounts',
              _div: {
                _attr: {
                  id: 'default_accounts',
                  class: 'row mt16 o_settings_container'
                },
                _div: {
                  _attr: {
                    invisible: [['group_multi_currency', '=', false]],
                    class: 'col-12 col-lg-6 o_setting_box'
                  },
                  _div: {
                    _attr: { class: 'o_setting_left_pane' }
                  },
                  _div_464: {
                    _attr: { class: 'o_setting_right_pane' },
                    _div: {
                      _attr: { class: 'content-group' },
                      _div: {
                        _span: {
                          _attr: {
                            class: 'o_form_label',
                            text: 'Post Exchange difference entries in:'
                          }
                        }
                      },
                      _div_526: {
                        _attr: { class: 'row mt8' },
                        _label_currency_exchange_journal_id: {
                          for: 'currency_exchange_journal_id',
                          string: 'Journal',
                          class: 'col-lg-4 o_light_label'
                        },
                        currency_exchange_journal_id: {}
                      },
                      _div_746: {
                        _attr: { class: 'row mt8' },
                        _label_income_currency_exchange_account_id: {
                          for: 'income_currency_exchange_account_id',
                          class: 'col-lg-4 o_light_label'
                        },
                        income_currency_exchange_account_id: {}
                      },
                      _div_364: {
                        _attr: { class: 'row mt8' },
                        _label_expense_currency_exchange_account_id: {
                          for: 'expense_currency_exchange_account_id',
                          class: 'col-lg-4 o_light_label'
                        },
                        expense_currency_exchange_account_id: {}
                      }
                    }
                  }
                },
                _div_786: {
                  _attr: { class: 'col-12 col-lg-6 o_setting_box' },
                  _div: {
                    _attr: { class: 'o_setting_left_panel' }
                  },
                  _div_838: {
                    _attr: { class: 'o_setting_right_pane' },
                    _span: {
                      _attr: {
                        class: 'o_form_label',
                        text: 'The following default accounts are used with certain features.'
                      }
                    },
                    _div: {
                      _attr: { class: 'content-group' },
                      _div: {
                        _attr: { class: 'row mt8' },
                        _label_account_journal_suspense_account_id: {
                          for: 'account_journal_suspense_account_id',
                          class: 'col-lg-5 o_light_label'
                        },
                        account_journal_suspense_account_id: {}
                      },
                      _div_934: {
                        _attr: { class: 'row mt8' },
                        _label_account_journal_payment_debit_account_id: {
                          for: 'account_journal_payment_debit_account_id',
                          class: 'col-lg-5 o_light_label'
                        },
                        account_journal_payment_debit_account_id: {}
                      },
                      _div_191: {
                        _attr: { class: 'row mt8' },
                        _label_account_journal_payment_credit_account_id: {
                          for: 'account_journal_payment_credit_account_id',
                          class: 'col-lg-5 o_light_label'
                        },
                        account_journal_payment_credit_account_id: {}
                      },
                      _div_876: {
                        _attr: { class: 'row mt8' },
                        _label_transfer_account_id: {
                          for: 'transfer_account_id',
                          class: 'col-lg-5 o_light_label'
                        },
                        transfer_account_id: {}
                      },
                      _div_147: {
                        _attr: { class: 'row mt8' },
                        _label_account_journal_early_pay_discount_gain_account_id: {
                          for: 'account_journal_early_pay_discount_gain_account_id',
                          class: 'col-lg-5 o_light_label'
                        },
                        account_journal_early_pay_discount_gain_account_id: {}
                      },
                      _div_467: {
                        _attr: { class: 'row mt8' },
                        _label_account_journal_early_pay_discount_loss_account_id: {
                          for: 'account_journal_early_pay_discount_loss_account_id',
                          class: 'col-lg-5 o_light_label'
                        },
                        account_journal_early_pay_discount_loss_account_id: {}
                      }
                    }
                  }
                }
              }
            },
            _t_209: {
              _attr: { groups: 'account.group_account_user' },
              _h2: 'Bank & Cash',
              _div: {
                _attr: {
                  id: 'bank_cash',
                  class: 'row mt16 o_settings_container'
                },
                _div: {
                  _attr: {
                    id: 'import_bank_statements_csv',
                    title: "Once installed, set 'Bank Feeds' to 'File Import' in bank account settings.This adds a button to import from the Accounting dashboard.",
                    class: 'col-12 col-lg-6 o_setting_box'
                  },
                  _div: {
                    _attr: { class: 'o_setting_left_pane' },
                    module_account_bank_statement_import_csv: { widget: 'upgrade_boolean' }
                  },
                  _div_733: {
                    _attr: { class: 'o_setting_right_pane' },
                    _label_module_account_bank_statement_import_csv: {
                      for: 'module_account_bank_statement_import_csv',
                      string: 'CSV Import'
                    },
                    _div: {
                      _attr: {
                        class: 'text-muted',
                        text: 'Import your bank statements in CSV'
                      }
                    }
                  }
                },
                _div_281: {
                  _attr: {
                    title: "Once installed, set 'Bank Feeds' to 'File Import' in bank account settings.This adds a button to import from the Accounting dashboard.",
                    class: 'col-12 col-lg-6 o_setting_box'
                  },
                  _div: {
                    _attr: { class: 'o_setting_left_pane' },
                    module_account_bank_statement_import_qif: { widget: 'upgrade_boolean' }
                  },
                  _div_713: {
                    _attr: { class: 'o_setting_right_pane' },
                    _label_module_account_bank_statement_import_qif: {
                      for: 'module_account_bank_statement_import_qif',
                      string: 'QIF Import'
                    },
                    _div: {
                      _attr: {
                        class: 'text-muted',
                        text: 'Import your bank statements in QIF'
                      }
                    }
                  }
                },
                _div_725: {
                  _attr: {
                    title: "Once installed, set 'Bank Feeds' to 'File Import' in bank account settings.This adds a button to import from the Accounting dashboard.",
                    class: 'col-12 col-lg-6 o_setting_box'
                  },
                  _div: {
                    _attr: { class: 'o_setting_left_pane' },
                    module_account_bank_statement_import_ofx: { widget: 'upgrade_boolean' }
                  },
                  _div_420: {
                    _attr: { class: 'o_setting_right_pane' },
                    _label_module_account_bank_statement_import_ofx: {
                      for: 'module_account_bank_statement_import_ofx',
                      string: 'OFX Import'
                    },
                    _div: {
                      _attr: {
                        class: 'text-muted',
                        text: 'Import your bank statements in OFX'
                      }
                    }
                  }
                },
                _div_981: {
                  _attr: {
                    id: 'import_bank_statement_camt',
                    title: "Once installed, set 'Bank Feeds' to 'File Import' in bank account settings.This adds a button to import from the Accounting dashboard.",
                    class: 'col-12 col-lg-6 o_setting_box'
                  },
                  _div: {
                    _attr: { class: 'o_setting_left_pane' },
                    module_account_bank_statement_import_camt: { widget: 'upgrade_boolean' }
                  },
                  _div_664: {
                    _attr: { class: 'o_setting_right_pane' },
                    _label_module_account_bank_statement_import_camt: {
                      for: 'module_account_bank_statement_import_camt',
                      string: 'CAMT Import'
                    },
                    _div: {
                      _attr: {
                        class: 'text-muted',
                        text: 'Import your bank statements in CAMT.053'
                      }
                    }
                  }
                }
              }
            },
            _t_143: {
              _attr: { groups: 'account.group_account_user' },
              _h2: 'Fiscal Periods',
              _div: {
                _attr: {
                  id: 'accounting_reports',
                  class: 'row mt16 o_settings_container'
                },
                _div: {
                  _attr: {
                    id: 'fiscalyear',
                    groups: 'account.group_account_user',
                    invisible: '1',
                    class: 'col-12 col-lg-6 o_setting_box'
                  }
                },
                _div_373: {
                  _attr: {
                    id: 'dynamic_report',
                    groups: 'account.group_account_user',
                    invisible: '1',
                    class: 'col-12 col-lg-6 o_setting_box'
                  },
                  _div: {
                    _attr: { class: 'o_setting_left_pane' },
                    module_account_reports: { widget: 'upgrade_boolean' }
                  },
                  _div_843: {
                    _attr: { class: 'o_setting_right_pane' },
                    _label_module_account_reports: { for: 'module_account_reports' },
                    _div: {
                      _attr: {
                        id: 'account_reports',
                        class: 'text-muted',
                        text: 'Navigate easily through reports and see what is behind the numbers'
                      }
                    }
                  }
                }
              }
            },
            _h2_639: 'Analytics',
            _div_136: {
              _attr: {
                id: 'analytic',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  id: 'track_costs_revenues',
                  title: 'Allows you to use the analytic accounting.',
                  groups: 'account.group_account_user',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  group_analytic_accounting: {}
                },
                _div_163: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_group_analytic_accounting: { for: 'group_analytic_accounting' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Track costs & revenues by project, department, etc'
                    }
                  }
                }
              },
              _div_182: {
                _attr: {
                  id: 'account_budget',
                  title: 'This allows accountants to manage analytic and crossovered budgets. Once the master budgets and the budgets are defined, the project managers can set the planned amount on each analytic account.',
                  groups: 'account.group_account_user',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_account_budget: { widget: 'upgrade_boolean' }
                },
                _div_989: {
                  _attr: {
                    id: 'budget_management',
                    class: 'o_setting_right_pane'
                  },
                  _label_module_account_budget: { for: 'module_account_budget' },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Use budgets to compare actual with expected revenues and costs'
                    }
                  }
                }
              },
              _div_944: {
                _attr: {
                  id: 'monitor_product_margins',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  module_product_margin: {}
                },
                _div_235: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_module_product_margin: {
                    for: 'module_product_margin',
                    string: 'Margin Analysis'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Monitor your product margins from invoices'
                    }
                  }
                }
              }
            },
            _h2_633: 'Storno Accounting',
            _div_154: {
              _attr: {
                id: 'storno',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  id: 'enable_storno_accounting',
                  title: 'Allows you to use Storno accounting.',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: { class: 'o_setting_left_pane' },
                  account_storno: {}
                },
                _div_336: {
                  _attr: { class: 'o_setting_right_pane' },
                  _label_account_storno: { for: 'account_storno' },
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
                      text: 'Use Storno accounting'
                    }
                  }
                }
              }
            },
            _h2_171: 'Accounting Firms mode',
            _div_309: {
              _attr: {
                id: 'quick_edit_mode',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: { class: 'col-12 col-lg-12 o_setting_box' },
                _div: {
                  _attr: { class: 'text-muted' },
                  _p: 'Accounting firm mode will change invoice/bill encoding:',
                  _p_862: "- The document's sequence becomes editable on all documents.",
                  _p_272: '- A new field « Total (tax inc.) » to speed up and control the encoding by automating line creation with the right account & tax.',
                  _p_323: '- A default Customer Invoice / Vendor Bill date will be suggested.'
                },
                _div_724: {
                  _attr: { class: 'o_setting_right_pane mt16' },
                  _label_quick_edit_mode: { for: 'quick_edit_mode' },
                  _span: {
                    _attr: {
                      title: 'Values set here are company-specific.',
                      groups: 'base.group_multi_company',
                      class: 'fa fa-lg fa-building-o'
                    }
                  },
                  _div: {
                    quick_edit_mode: { placeholder: 'Disabled' }
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  action_account_config: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Settings',
    type: 'ir.actions.act_window',
    res_model: 'res.config.settings',
    search_view_id: 'tooooooodoooooo',
    context: {
      module: 'account',
      bin_size: false
    },
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

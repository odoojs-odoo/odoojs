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
            has_chart_of_accounts: {
              invisible: '1'
            },
            has_accounting_entries: {
              invisible: '1'
            },
            _h2: {
              _attr: {
                attrs: {
                  invisible: "[('has_accounting_entries', '!=', False)]"
                },
                text: 'Fiscal Localization'
              }
            },
            _div_fiscal_localization_setting_container: {
              _attr: {
                name: 'fiscal_localization_setting_container',
                attrs: {
                  invisible: "[('has_accounting_entries', '!=', False)]"
                },
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  class: 'col-12 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  }
                },
                _div_714: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _span: {
                    _attr: {
                      class: 'o_form_label',
                      text: 'Fiscal Localization'
                    }
                  },
                  _span_102: {
                    _attr: {
                      groups: 'base.group_multi_company',
                      class: 'fa fa-lg fa-building-o',
                      title: 'Values set here are company-specific.'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Taxes, fiscal positions, chart of accounts & legal statements for your country'
                    }
                  },
                  _div_885: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'row mt16'
                      },
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
                    _div_272: {
                      _attr: {
                        class: 'mt8'
                      },
                      _button_account__open_account_charts_modules: {
                        _attr: {
                          name: 'account.open_account_charts_modules',
                          string: 'Install More Packages',
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
            _h2_958: 'Taxes',
            _div_default_taxes_setting_container: {
              _attr: {
                name: 'default_taxes_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'These taxes are set in any new product created.'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  }
                },
                _div_194: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _span: {
                    _attr: {
                      class: 'o_form_label',
                      text: 'Default Taxes'
                    }
                  },
                  _span_455: {
                    _attr: {
                      groups: 'base.group_multi_company',
                      class: 'fa fa-lg fa-building-o',
                      title: 'Values set here are company-specific.'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Default taxes applied to local transactions'
                    }
                  },
                  _div_144: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'row mt16'
                      },
                      _label_sale_tax_id: {
                        for: 'sale_tax_id',
                        string: 'Sales Tax',
                        class: 'col-lg-3 o_light_label'
                      },
                      sale_tax_id: {
                        domain: {
                          todo_ctx: "[('type_tax_use', 'in', ('sale', 'all')), ('company_id', '=', company_id)]"
                        }
                      }
                    },
                    _div_339: {
                      _attr: {
                        class: 'row'
                      },
                      _label_purchase_tax_id: {
                        for: 'purchase_tax_id',
                        string: 'Purchase Tax',
                        class: 'col-lg-3 o_light_label'
                      },
                      purchase_tax_id: {
                        domain: {
                          todo_ctx: "[('type_tax_use', 'in', ('purchase', 'all')), ('company_id', '=', company_id)]"
                        }
                      }
                    }
                  }
                }
              },
              _div_800: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'A rounding per line is advised if your prices are tax-included. That way, the sum of line subtotals equals the total with taxes.'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  }
                },
                _div_791: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _span: {
                    _attr: {
                      class: 'o_form_label',
                      text: 'Rounding Method'
                    }
                  },
                  _span_477: {
                    _attr: {
                      groups: 'base.group_multi_company',
                      class: 'fa fa-lg fa-building-o',
                      title: 'Values set here are company-specific.'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'How total tax amount is computed in orders and invoices'
                    }
                  },
                  _div_815: {
                    _attr: {
                      class: 'content-group'
                    },
                    tax_calculation_rounding_method: {
                      widget: 'radio',
                      class: 'o_light_label mt16'
                    }
                  }
                }
              },
              _div_559: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  }
                },
                _div_379: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _span: {
                    _attr: {
                      class: 'o_form_label',
                      text: 'Cash Discount Tax Reduction'
                    }
                  },
                  _span_556: {
                    _attr: {
                      groups: 'base.group_multi_company',
                      class: 'fa fa-lg fa-building-o',
                      title: 'Values set here are company-specific.'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'When will the tax be reduced when offering a cash discount'
                    }
                  },
                  _div_109: {
                    _attr: {
                      class: 'content-group'
                    },
                    early_pay_discount_computation: {}
                  }
                }
              },
              _div_324: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_account_taxcloud: {
                    widget: 'upgrade_boolean'
                  }
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
              _div_523: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'If you sell goods and services to customers in a foreign EU country, you must charge VAT based on the delivery address. This rule applies regardless of where you are located.'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_l10n_eu_oss: {}
                },
                _div_l10n_eu_oss_right_pane: {
                  _attr: {
                    name: 'l10n_eu_oss_right_pane',
                    class: 'o_setting_right_pane'
                  },
                  _label_module_l10n_eu_oss: {
                    for: 'module_l10n_eu_oss'
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
                      text: 'Apply VAT of the EU country to which goods and services are delivered.'
                    }
                  }
                }
              },
              _div_150: {
                _attr: {
                  groups: 'account.group_account_user',
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'Select this if the taxes should use cash basis, which will create an entry for such taxes on a given account during reconciliation.'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  tax_exigibility: {}
                },
                _div_939: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_tax_exigibility: {
                    for: 'tax_exigibility'
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
                      text: 'Allow to configure taxes using cash basis'
                    }
                  },
                  _div_899: {
                    _attr: {
                      attrs: {
                        invisible: "[('tax_exigibility', '=', False)]"
                      },
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'row mt16'
                      },
                      _label_tax_cash_basis_journal_id: {
                        for: 'tax_cash_basis_journal_id',
                        class: 'col-lg-3 o_light_label'
                      },
                      tax_cash_basis_journal_id: {}
                    },
                    _div_119: {
                      _attr: {
                        class: 'row mt16'
                      },
                      _label_account_cash_basis_base_account_id: {
                        for: 'account_cash_basis_base_account_id',
                        class: 'col-lg-3 o_light_label'
                      },
                      account_cash_basis_base_account_id: {}
                    }
                  }
                }
              },
              _div_760: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  }
                },
                _div_916: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _span: {
                    _attr: {
                      class: 'o_form_label',
                      text: 'Fiscal Country'
                    }
                  },
                  _span_712: {
                    _attr: {
                      groups: 'base.group_multi_company',
                      class: 'fa fa-lg fa-building-o',
                      title: 'Values set here are company-specific.'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Domestic country of your accounting'
                    }
                  },
                  _div_191: {
                    _attr: {
                      class: 'text-muted'
                    },
                    account_fiscal_country_id: {
                      no_create: true,
                      no_open: true
                    }
                  }
                }
              }
            },
            _h2_841: 'Currencies',
            _div_main_currency_setting_container: {
              _attr: {
                name: 'main_currency_setting_container',
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  }
                },
                _div_238: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _span: {
                    _attr: {
                      class: 'o_form_label',
                      text: 'Main Currency'
                    }
                  },
                  _span_759: {
                    _attr: {
                      groups: 'base.group_multi_company',
                      class: 'fa fa-lg fa-building-o',
                      title: 'Values set here are company-specific.'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Main currency of your company'
                    }
                  },
                  _div_246: {
                    _attr: {
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'row mt16'
                      },
                      _label_currency_id: {
                        for: 'currency_id',
                        class: 'col-lg-3 o_light_label'
                      },
                      currency_id: {
                        context: {
                          active_test: false
                        },
                        no_create_edit: true,
                        no_open: true
                      },
                      group_multi_currency: {
                        invisible: '1'
                      }
                    },
                    _div_919: {
                      _attr: {
                        class: 'mt8'
                      },
                      _button_base__action_currency_form: {
                        _attr: {
                          name: 'base.action_currency_form',
                          string: 'Currencies',
                          class: 'btn-link',
                          type: 'action',
                          icon: 'fa-arrow-right'
                        }
                      }
                    }
                  }
                }
              },
              _div_620: {
                _attr: {
                  attrs: {
                    invisible: "[('group_multi_currency', '=', False)]"
                  },
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_currency_rate_live: {
                    widget: 'upgrade_boolean'
                  }
                },
                _div_202: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_currency_rate_live: {
                    for: 'module_currency_rate_live'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Update exchange rates automatically'
                    }
                  }
                }
              }
            },
            _h2_879: 'Customer Invoices',
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
                  }
                },
                _div_718: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
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
                  _div_771: {
                    _attr: {
                      class: 'mt16'
                    },
                    _div: {
                      _attr: {
                        class: 'content-group'
                      },
                      _div: {
                        invoice_is_print: {},
                        _label_invoice_is_print: {
                          for: 'invoice_is_print'
                        },
                        _span: {
                          _attr: {
                            class: 'fa fa-lg fa-building-o',
                            title: 'Values set here are company-specific.'
                          }
                        }
                      },
                      _div_340: {
                        invoice_is_email: {},
                        _label_invoice_is_email: {
                          for: 'invoice_is_email'
                        },
                        _span: {
                          _attr: {
                            class: 'fa fa-lg fa-building-o',
                            title: 'Values set here are company-specific.'
                          }
                        }
                      }
                    }
                  }
                }
              },
              _div_739: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_snailmail_account: {}
                },
                _div_252: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_snailmail_account: {
                    for: 'module_snailmail_account'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Send invoices and payment follow-ups by post'
                    }
                  }
                }
              },
              _div_757: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_sale_delivery_address: {}
                },
                _div_156: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_sale_delivery_address: {
                    for: 'group_sale_delivery_address'
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
                      text: 'Select specific invoice and delivery addresses'
                    }
                  }
                }
              },
              _div_336: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  }
                },
                _div_241: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_show_line_subtotals_tax_selection: {
                    for: 'show_line_subtotals_tax_selection'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Line subtotals tax display'
                    }
                  },
                  _div_494: {
                    _attr: {
                      class: 'mt16'
                    },
                    show_line_subtotals_tax_selection: {
                      widget: 'radio',
                      class: 'o_light_label'
                    },
                    group_show_line_subtotals_tax_excluded: {
                      invisible: '1'
                    },
                    group_show_line_subtotals_tax_included: {
                      invisible: '1'
                    }
                  }
                }
              },
              _div_637: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_warning_account: {}
                },
                _div_593: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
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
              _div_892: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_cash_rounding: {}
                },
                _div_890: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_cash_rounding: {
                    for: 'group_cash_rounding'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Define the smallest coinage of the currency used to pay by cash'
                    }
                  },
                  _div_923: {
                    _attr: {
                      class: 'mt8'
                    },
                    _button_account__rounding_list_action: {
                      _attr: {
                        name: 'account.rounding_list_action',
                        string: 'Cash Roundings',
                        attrs: {
                          invisible: "[('group_cash_rounding', '=', False)]"
                        },
                        class: 'btn-link',
                        type: 'action',
                        icon: 'fa-arrow-right'
                      }
                    }
                  }
                }
              },
              _div_956: {
                _attr: {
                  class: 'col-xs-12 col-md-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_account_intrastat: {
                    widget: 'upgrade_boolean'
                  }
                },
                _div_intrastat_right_pane: {
                  _attr: {
                    name: 'intrastat_right_pane',
                    class: 'o_setting_right_pane'
                  },
                  _label_module_account_intrastat: {
                    for: 'module_account_intrastat'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Collect information and produce statistics on the trade in goods in Europe with intrastat'
                    }
                  }
                }
              },
              _div_581: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  }
                },
                _div_177: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
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
                  _div_432: {
                    _attr: {
                      class: 'text-muted'
                    },
                    incoterm_id: {}
                  }
                }
              },
              _div_150: {
                _attr: {
                  class: 'col-xs-12 col-md-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_show_sale_receipts: {
                    widget: 'upgrade_boolean'
                  }
                },
                _div_show_sale_receipts_right_pane: {
                  _attr: {
                    name: 'show_sale_receipts_right_pane',
                    class: 'o_setting_right_pane'
                  },
                  _label_group_show_sale_receipts: {
                    for: 'group_show_sale_receipts'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Activate to create sale receipt'
                    }
                  }
                }
              },
              _div_158: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  use_invoice_terms: {}
                },
                _div_376: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_use_invoice_terms: {
                    for: 'use_invoice_terms'
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
                      text: 'Add your terms & conditions at the bottom of invoices/orders/quotations'
                    }
                  },
                  _div_773: {
                    _attr: {
                      attrs: {
                        invisible: "[('use_invoice_terms', '=', False)]"
                      },
                      class: 'content-group'
                    },
                    _div: {
                      _attr: {
                        class: 'mt16'
                      },
                      terms_type: {
                        widget: 'radio',
                        class: 'o_light_label'
                      },
                      _div: {
                        invoice_terms: {
                          attrs: {
                            invisible: "[('terms_type', '=', 'html')]"
                          },
                          class: 'oe_account_terms mt-5 w-100',
                          placeholder: 'Insert your terms & conditions here...'
                        }
                      },
                      _div_464: {
                        _attr: {
                          attrs: {
                            invisible: "[('terms_type', '!=', 'html')]"
                          },
                          class: 'mt8'
                        },
                        _button_action_update_terms: {
                          _attr: {
                            name: 'action_update_terms',
                            string: 'Update Terms',
                            class: 'btn-link',
                            type: 'object',
                            icon: 'fa-arrow-right'
                          }
                        }
                      },
                      preview_ready: {
                        invisible: '1'
                      },
                      _div_433: {
                        _attr: {
                          attrs: {
                            invisible: "[('preview_ready', '=', False)]"
                          },
                          class: 'mt4 ms-1'
                        },
                        _a: {
                          _attr: {
                            class: 'btn-link'
                          },
                          _i: {
                            _attr: {
                              class: 'fa fa-arrow-right'
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              _div_973: {
                _attr: {
                  class: 'col-xs-12 col-md-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  account_use_credit_limit: {}
                },
                _div_507: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_account_use_credit_limit: {
                    for: 'account_use_credit_limit'
                  },
                  _span: {
                    _attr: {
                      class: 'fa fa-lg fa-building-o',
                      title: 'Values set here are company-specific.'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Trigger alerts when creating Invoices and Sales Orders for Partners with a Total Receivable amount exceeding a limit.'
                    }
                  },
                  _div_483: {
                    _attr: {
                      attrs: {
                        invisible: "[('account_use_credit_limit', '=', False)]"
                      },
                      class: 'content-group mt-2'
                    },
                    _div: {
                      _attr: {
                        class: 'row'
                      },
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
            _h2_797: 'Customer Payments',
            _div_875: {
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
                  module_account_payment: {}
                },
                _div_358: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_account_payment: {
                    for: 'module_account_payment'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Let your customers pay their invoices online'
                    }
                  }
                }
              },
              _div_412: {
                _attr: {
                  class: 'col-xs-12 col-md-6 o_setting_box',
                  title: 'Add a QR-code to your invoices so that your customers can pay instantly with their mobile banking application.'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  qr_code: {
                    class: 'oe_inline'
                  }
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
                      groups: 'base.group_multi_company',
                      class: 'fa fa-lg fa-building-o',
                      title: 'Values set here are company-specific.'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Add a payment QR-code to your invoices'
                    }
                  }
                }
              },
              _div_276: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'If you check this box, you will be able to collect payments using SEPA Direct Debit mandates.'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
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
                      groups: 'base.group_multi_company',
                      class: 'fa fa-lg fa-building-o',
                      title: 'Values set here are company-specific.'
                    }
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Collect customer payments in one-click using Euro SEPA Service'
                    }
                  },
                  _div_572: {
                    _attr: {
                      attrs: {
                        invisible: "[('module_account_sepa_direct_debit', '=', False)]"
                      },
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
            _h2_891: 'Vendor Bills',
            _div_256: {
              _attr: {
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  class: 'col-xs-12 col-md-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_show_purchase_receipts: {
                    widget: 'upgrade_boolean'
                  }
                },
                _div_show_purchase_receipts_right_pane: {
                  _attr: {
                    name: 'show_purchase_receipts_right_pane',
                    class: 'o_setting_right_pane'
                  },
                  _label_group_show_purchase_receipts: {
                    for: 'group_show_purchase_receipts'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Activate to create purchase receipt'
                    }
                  }
                }
              }
            },
            _h2_489: 'Vendor Payments',
            _div_248: {
              _attr: {
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  groups: 'account.group_account_user',
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_account_check_printing: {}
                },
                _div_784: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_account_check_printing: {
                    for: 'module_account_check_printing',
                    string: 'Checks'
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
                      text: 'Print checks to pay your vendors'
                    }
                  }
                }
              },
              _div_949: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'If you check this box, you will be able to register your payment using SEPA.'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_account_sepa: {
                    widget: 'upgrade_boolean'
                  }
                },
                _div_sepa_right_pane: {
                  _attr: {
                    name: 'sepa_right_pane',
                    class: 'o_setting_right_pane'
                  },
                  _label_module_account_sepa: {
                    for: 'module_account_sepa'
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
                      text: 'Pay your bills in one-click using Euro SEPA Service'
                    }
                  }
                }
              }
            },
            _h2_368: 'Digitization',
            _div_316: {
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
                  module_account_invoice_extract: {
                    widget: 'upgrade_boolean'
                  }
                },
                _div_758: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_account_invoice_extract: {
                    for: 'module_account_invoice_extract'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Digitize your PDF or scanned documents with OCR and Artificial Intelligence'
                    }
                  },
                  _div_337: {
                    _attr: {
                      attrs: {
                        invisible: "[('module_account_invoice_extract', '=', False)]"
                      },
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
              _attr: {
                groups: 'account.group_account_user'
              },
              _h2: 'Default Accounts',
              _div: {
                _attr: {
                  class: 'row mt16 o_settings_container'
                },
                _div: {
                  _attr: {
                    attrs: {
                      invisible: "[('group_multi_currency', '=', False)]"
                    },
                    class: 'col-12 col-lg-6 o_setting_box'
                  },
                  _div: {
                    _attr: {
                      class: 'o_setting_left_pane'
                    }
                  },
                  _div_346: {
                    _attr: {
                      class: 'o_setting_right_pane'
                    },
                    _div: {
                      _attr: {
                        class: 'content-group'
                      },
                      _div: {
                        _span: {
                          _attr: {
                            class: 'o_form_label',
                            text: 'Post Exchange difference entries in:'
                          }
                        }
                      },
                      _div_545: {
                        _attr: {
                          class: 'row mt8'
                        },
                        _label_currency_exchange_journal_id: {
                          for: 'currency_exchange_journal_id',
                          string: 'Journal',
                          class: 'col-lg-4 o_light_label'
                        },
                        currency_exchange_journal_id: {}
                      },
                      _div_474: {
                        _attr: {
                          class: 'row mt8'
                        },
                        _label_income_currency_exchange_account_id: {
                          for: 'income_currency_exchange_account_id',
                          class: 'col-lg-4 o_light_label'
                        },
                        income_currency_exchange_account_id: {}
                      },
                      _div_193: {
                        _attr: {
                          class: 'row mt8'
                        },
                        _label_expense_currency_exchange_account_id: {
                          for: 'expense_currency_exchange_account_id',
                          class: 'col-lg-4 o_light_label'
                        },
                        expense_currency_exchange_account_id: {}
                      }
                    }
                  }
                },
                _div_646: {
                  _attr: {
                    class: 'col-12 col-lg-6 o_setting_box'
                  },
                  _div: {
                    _attr: {
                      class: 'o_setting_left_panel'
                    }
                  },
                  _div_699: {
                    _attr: {
                      class: 'o_setting_right_pane'
                    },
                    _span: {
                      _attr: {
                        class: 'o_form_label',
                        text: 'The following default accounts are used with certain features.'
                      }
                    },
                    _div: {
                      _attr: {
                        class: 'content-group'
                      },
                      _div: {
                        _attr: {
                          class: 'row mt8'
                        },
                        _label_account_journal_suspense_account_id: {
                          for: 'account_journal_suspense_account_id',
                          class: 'col-lg-5 o_light_label'
                        },
                        account_journal_suspense_account_id: {}
                      },
                      _div_696: {
                        _attr: {
                          class: 'row mt8'
                        },
                        _label_account_journal_payment_debit_account_id: {
                          for: 'account_journal_payment_debit_account_id',
                          class: 'col-lg-5 o_light_label'
                        },
                        account_journal_payment_debit_account_id: {}
                      },
                      _div_918: {
                        _attr: {
                          class: 'row mt8'
                        },
                        _label_account_journal_payment_credit_account_id: {
                          for: 'account_journal_payment_credit_account_id',
                          class: 'col-lg-5 o_light_label'
                        },
                        account_journal_payment_credit_account_id: {}
                      },
                      _div_639: {
                        _attr: {
                          class: 'row mt8'
                        },
                        _label_transfer_account_id: {
                          for: 'transfer_account_id',
                          class: 'col-lg-5 o_light_label'
                        },
                        transfer_account_id: {}
                      },
                      _div_731: {
                        _attr: {
                          class: 'row mt8'
                        },
                        _label_account_journal_early_pay_discount_gain_account_id: {
                          for: 'account_journal_early_pay_discount_gain_account_id',
                          class: 'col-lg-5 o_light_label'
                        },
                        account_journal_early_pay_discount_gain_account_id: {}
                      },
                      _div_462: {
                        _attr: {
                          class: 'row mt8'
                        },
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
            _t_610: {
              _attr: {
                groups: 'account.group_account_user'
              },
              _h2: 'Bank & Cash',
              _div: {
                _attr: {
                  class: 'row mt16 o_settings_container'
                },
                _div: {
                  _attr: {
                    class: 'col-12 col-lg-6 o_setting_box',
                    title: "Once installed, set 'Bank Feeds' to 'File Import' in bank account settings.This adds a button to import from the Accounting dashboard."
                  },
                  _div: {
                    _attr: {
                      class: 'o_setting_left_pane'
                    },
                    module_account_bank_statement_import_csv: {
                      widget: 'upgrade_boolean'
                    }
                  },
                  _div_533: {
                    _attr: {
                      class: 'o_setting_right_pane'
                    },
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
                _div_549: {
                  _attr: {
                    class: 'col-12 col-lg-6 o_setting_box',
                    title: "Once installed, set 'Bank Feeds' to 'File Import' in bank account settings.This adds a button to import from the Accounting dashboard."
                  },
                  _div: {
                    _attr: {
                      class: 'o_setting_left_pane'
                    },
                    module_account_bank_statement_import_qif: {
                      widget: 'upgrade_boolean'
                    }
                  },
                  _div_786: {
                    _attr: {
                      class: 'o_setting_right_pane'
                    },
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
                _div_184: {
                  _attr: {
                    class: 'col-12 col-lg-6 o_setting_box',
                    title: "Once installed, set 'Bank Feeds' to 'File Import' in bank account settings.This adds a button to import from the Accounting dashboard."
                  },
                  _div: {
                    _attr: {
                      class: 'o_setting_left_pane'
                    },
                    module_account_bank_statement_import_ofx: {
                      widget: 'upgrade_boolean'
                    }
                  },
                  _div_544: {
                    _attr: {
                      class: 'o_setting_right_pane'
                    },
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
                _div_425: {
                  _attr: {
                    class: 'col-12 col-lg-6 o_setting_box',
                    title: "Once installed, set 'Bank Feeds' to 'File Import' in bank account settings.This adds a button to import from the Accounting dashboard."
                  },
                  _div: {
                    _attr: {
                      class: 'o_setting_left_pane'
                    },
                    module_account_bank_statement_import_camt: {
                      widget: 'upgrade_boolean'
                    }
                  },
                  _div_594: {
                    _attr: {
                      class: 'o_setting_right_pane'
                    },
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
            _t_320: {
              _attr: {
                groups: 'account.group_account_user'
              },
              _h2: 'Fiscal Periods',
              _div: {
                _attr: {
                  class: 'row mt16 o_settings_container'
                },
                _div: {
                  _attr: {
                    groups: 'account.group_account_user',
                    invisible: '1',
                    class: 'col-12 col-lg-6 o_setting_box'
                  }
                },
                _div_693: {
                  _attr: {
                    groups: 'account.group_account_user',
                    invisible: '1',
                    class: 'col-12 col-lg-6 o_setting_box'
                  },
                  _div: {
                    _attr: {
                      class: 'o_setting_left_pane'
                    },
                    module_account_reports: {
                      widget: 'upgrade_boolean'
                    }
                  },
                  _div_228: {
                    _attr: {
                      class: 'o_setting_right_pane'
                    },
                    _label_module_account_reports: {
                      for: 'module_account_reports'
                    },
                    _div: {
                      _attr: {
                        class: 'text-muted',
                        text: 'Navigate easily through reports and see what is behind the numbers'
                      }
                    }
                  }
                }
              }
            },
            _h2_827: 'Analytics',
            _div_923: {
              _attr: {
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  groups: 'account.group_account_user',
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'Allows you to use the analytic accounting.'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  group_analytic_accounting: {}
                },
                _div_292: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_group_analytic_accounting: {
                    for: 'group_analytic_accounting'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Track costs & revenues by project, department, etc'
                    }
                  }
                }
              },
              _div_266: {
                _attr: {
                  groups: 'account.group_account_user',
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'This allows accountants to manage analytic and crossovered budgets. Once the master budgets and the budgets are defined, the project managers can set the planned amount on each analytic account.'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_account_budget: {
                    widget: 'upgrade_boolean'
                  }
                },
                _div_597: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_module_account_budget: {
                    for: 'module_account_budget'
                  },
                  _div: {
                    _attr: {
                      class: 'text-muted',
                      text: 'Use budgets to compare actual with expected revenues and costs'
                    }
                  }
                }
              },
              _div_171: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  module_product_margin: {}
                },
                _div_586: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
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
            _h2_109: 'Storno Accounting',
            _div_133: {
              _attr: {
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  class: 'col-12 col-lg-6 o_setting_box',
                  title: 'Allows you to use Storno accounting.'
                },
                _div: {
                  _attr: {
                    class: 'o_setting_left_pane'
                  },
                  account_storno: {}
                },
                _div_212: {
                  _attr: {
                    class: 'o_setting_right_pane'
                  },
                  _label_account_storno: {
                    for: 'account_storno'
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
                      text: 'Use Storno accounting'
                    }
                  }
                }
              }
            },
            _h2_228: 'Accounting Firms mode',
            _div_535: {
              _attr: {
                class: 'row mt16 o_settings_container'
              },
              _div: {
                _attr: {
                  class: 'col-12 col-lg-12 o_setting_box'
                },
                _div: {
                  _attr: {
                    class: 'text-muted'
                  },
                  _p: 'Accounting firm mode will change invoice/bill encoding:',
                  _p_963: "- The document's sequence becomes editable on all documents.",
                  _p_754: '- A new field « Total (tax inc.) » to speed up and control the encoding by automating line creation with the right account & tax.',
                  _p_967: '- A default Customer Invoice / Vendor Bill date will be suggested.'
                },
                _div_219: {
                  _attr: {
                    class: 'o_setting_right_pane mt16'
                  },
                  _label_quick_edit_mode: {
                    for: 'quick_edit_mode'
                  },
                  _span: {
                    _attr: {
                      groups: 'base.group_multi_company',
                      class: 'fa fa-lg fa-building-o',
                      title: 'Values set here are company-specific.'
                    }
                  },
                  _div: {
                    quick_edit_mode: {
                      placeholder: 'Disabled'
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

  action_account_config: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Settings',
    type: 'ir.actions.act_window',
    res_model: 'res.config.settings',
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

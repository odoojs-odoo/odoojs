export default {
  view_account_reconcile_model_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.reconcile.model',
    type: 'tree',
    arch: {
      sheet: {
        sequence: {
          widget: 'handle'
        },
        name: {},
        rule_type: {},
        auto_reconcile: {}
      }
    }
  },

  view_account_reconcile_model_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.reconcile.model',
    type: 'form',
    arch: {
      sheet: {
        active: {
          invisible: '1'
        },
        payment_tolerance_param: {
          invisible: '1'
        },
        company_id: {
          invisible: '1'
        },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_action_reconcile_stat: {
            _attr: {
              name: 'action_reconcile_stat',
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-book'
            },
            number_entries: {
              string: 'Journal Entries',
              widget: 'statinfo'
            }
          }
        },
        _div_title: {
          _attr: {
            class: 'oe_title'
          },
          _label_name: {
            for: 'name'
          },
          _h1: {
            name: {
              placeholder: 'e.g. Bank Fees'
            }
          }
        },
        _group: {
          _group: {
            rule_type: {
              widget: 'radio'
            }
          },
          _group_859: {
            auto_reconcile: {
              attrs: {
                invisible: "[('rule_type', '=', 'writeoff_button')]"
              }
            },
            to_check: {
              attrs: {
                invisible: "[('rule_type', '!=', 'writeoff_button')]"
              }
            },
            past_months_limit: {
              attrs: {
                invisible: "[('rule_type', '!=', 'invoice_matching')]"
              }
            },
            matching_order: {
              attrs: {
                invisible: "[('rule_type', '!=', 'invoice_matching')]"
              }
            }
          }
        },
        _notebook: {
          _page: {
            _attr: {
              string: 'Bank Transactions Conditions'
            },
            _group: {
              _group: {
                _attr: {
                  class: 'col-6'
                },
                _label_match_journal_ids: {
                  for: 'match_journal_ids'
                },
                _div: {
                  match_journal_ids: {
                    widget: 'many2many_tags',
                    no_create: true
                  }
                },
                match_nature: {
                  attrs: {
                    invisible: "[('rule_type', '=', 'writeoff_button')]"
                  }
                },
                _label_match_amount: {
                  for: 'match_amount',
                  attrs: {
                    invisible: "[('rule_type', '=', 'writeoff_button')]"
                  }
                },
                _div_650: {
                  _attr: {
                    attrs: {
                      invisible: "[('rule_type', '=', 'writeoff_button')]"
                    },
                    class: 'd-flex gap-2'
                  },
                  match_amount: {},
                  match_amount_min: {
                    attrs: {
                      invisible: "[('match_amount', 'in', (False, 'lower'))]",
                      required: "[('match_amount', '!=', False)]"
                    }
                  },
                  _span: {
                    _attr: {
                      attrs: {
                        invisible: "[('match_amount', '!=', 'between')]"
                      },
                      class: 'o_form_label',
                      text: 'and'
                    }
                  },
                  match_amount_max: {
                    attrs: {
                      invisible: "[('match_amount', 'in', (False, 'greater'))]",
                      required: "[('match_amount', '=', 'between')]"
                    }
                  }
                },
                _label_allow_payment_tolerance: {
                  for: 'allow_payment_tolerance',
                  attrs: {
                    invisible: "[('rule_type', '!=', 'invoice_matching')]"
                  }
                },
                _div_165: {
                  _attr: {
                    attrs: {
                      invisible: "[('rule_type', '!=', 'invoice_matching')]"
                    },
                    class: 'd-flex gap-2'
                  },
                  allow_payment_tolerance: {},
                  _span: {
                    _attr: {
                      attrs: {
                        invisible: "[('allow_payment_tolerance', '=', False)]"
                      },
                      class: 'd-flex gap-2 w-100'
                    },
                    payment_tolerance_param: {},
                    payment_tolerance_type: {}
                  }
                },
                match_same_currency: {
                  attrs: {
                    invisible: "[('rule_type', '!=', 'invoice_matching')]"
                  }
                }
              },
              _group_430: {
                _attr: {
                  class: 'col-6'
                },
                _span: {
                  _attr: {
                    attrs: {
                      invisible: "[('rule_type', '!=', 'invoice_matching')]"
                    },
                    class: 'o_form_label o_td_label',
                    text: 'Match Invoice/bill with'
                  }
                },
                _div: {
                  _attr: {
                    attrs: {
                      invisible: "[('rule_type', '!=', 'invoice_matching')]"
                    },
                    class: 'd-flex gap-3'
                  },
                  _label_match_text_location_label: {
                    for: 'match_text_location_label',
                    string: 'Label'
                  },
                  match_text_location_label: {},
                  _label_match_text_location_note: {
                    for: 'match_text_location_note',
                    string: 'Note'
                  },
                  match_text_location_note: {},
                  _label_match_text_location_reference: {
                    for: 'match_text_location_reference',
                    string: 'Reference'
                  },
                  match_text_location_reference: {}
                },
                _label_match_label: {
                  for: 'match_label',
                  attrs: {
                    invisible: "[('rule_type', '=', 'writeoff_button')]"
                  }
                },
                _div_797: {
                  _attr: {
                    attrs: {
                      invisible: "[('rule_type', '=', 'writeoff_button')]"
                    },
                    class: 'd-flex gap-3'
                  },
                  match_label: {},
                  match_label_param: {
                    attrs: {
                      invisible: "[('match_label', '=', False)]",
                      required: "[('match_label', '!=', False)]"
                    }
                  }
                },
                _label_match_note: {
                  for: 'match_note',
                  attrs: {
                    invisible: "[('rule_type', '=', 'writeoff_button')]"
                  }
                },
                _div_595: {
                  _attr: {
                    attrs: {
                      invisible: "[('rule_type', '=', 'writeoff_button')]"
                    },
                    class: 'd-flex gap-3'
                  },
                  match_note: {},
                  match_note_param: {
                    attrs: {
                      invisible: "[('match_note', '=', False)]",
                      required: "[('match_note', '!=', False)]"
                    }
                  }
                },
                _label_match_transaction_type: {
                  for: 'match_transaction_type',
                  attrs: {
                    invisible: "[('rule_type', '=', 'writeoff_button')]"
                  }
                },
                _div_698: {
                  _attr: {
                    attrs: {
                      invisible: "[('rule_type', '=', 'writeoff_button')]"
                    },
                    class: 'd-flex gap-3'
                  },
                  match_transaction_type: {},
                  match_transaction_type_param: {
                    attrs: {
                      invisible: "[('match_transaction_type', '=', False)]",
                      required: "[('match_transaction_type', '!=', False)]"
                    }
                  }
                },
                match_partner: {
                  attrs: {
                    invisible: "[('rule_type', '=', 'writeoff_button')]"
                  }
                },
                _label_match_partner_ids: {
                  for: 'match_partner_ids',
                  attrs: {
                    invisible: "['|', ('match_partner', '=', False), ('rule_type', '=', 'writeoff_button')]"
                  },
                  class: 'ml16'
                },
                match_partner_ids: {
                  widget: 'many2many_tags',
                  attrs: {
                    invisible: "['|', ('match_partner', '=', False), ('rule_type', '=', 'writeoff_button')]"
                  },
                  no_quick_create: true
                },
                _label_match_partner_category_ids: {
                  for: 'match_partner_category_ids',
                  attrs: {
                    invisible: "['|', ('match_partner', '=', False), ('rule_type', '=', 'writeoff_button')]"
                  },
                  class: 'ml16'
                },
                match_partner_category_ids: {
                  widget: 'many2many_tags',
                  attrs: {
                    invisible: "['|', ('match_partner', '=', False), ('rule_type', '=', 'writeoff_button')]"
                  }
                }
              }
            },
            _group_905: {
              _attr: {
                string: 'Counterpart Entries',
                attrs: {
                  invisible: "[('rule_type', '=', 'invoice_matching'), '|', ('allow_payment_tolerance', '=', False), '&', ('allow_payment_tolerance', '=', True), ('payment_tolerance_param', '=', 0.0)]"
                },
                class: 'oe_inline'
              },
              _group: {
                show_decimal_separator: {
                  invisible: '1'
                },
                decimal_separator: {
                  groups: 'base.group_no_one',
                  attrs: {
                    invisible: "[('show_decimal_separator', '=', False)]"
                  }
                }
              },
              line_ids: {
                views: {
                  tree: {
                    arch: {
                      sheet: {
                        show_force_tax_included: {
                          invisible: '1'
                        },
                        company_id: {
                          invisible: '1'
                        },
                        sequence: {
                          widget: 'handle'
                        },
                        account_id: {},
                        amount_type: {},
                        journal_id: {
                          attrs: {
                            column_invisible: "[('parent.rule_type', '!=', 'writeoff_button')]"
                          }
                        },
                        amount_string: {},
                        tax_ids: {
                          widget: 'many2many_tags'
                        },
                        analytic_distribution: {
                          widget: 'analytic_distribution',
                          groups: 'analytic.group_analytic_accounting',
                          account_field: 'account_id',
                          business_domain: 'general'
                        },
                        force_tax_included: {
                          widget: 'boolean_toggle',
                          attrs: {
                            invisible: "[('show_force_tax_included', '=', False)]"
                          }
                        },
                        label: {}
                      }
                    }
                  }
                }
              }
            }
          },
          _page_404: {
            _attr: {
              string: 'Partner Mapping',
              attrs: {
                invisible: "[('rule_type', 'not in', ('invoice_matching', 'writeoff_suggestion'))]"
              }
            },
            partner_mapping_line_ids: {
              views: {
                tree: {
                  arch: {
                    sheet: {
                      payment_ref_regex: {
                        attrs: {
                          required: "[('narration_regex', '=', False)]"
                        }
                      },
                      narration_regex: {
                        attrs: {
                          required: "[('payment_ref_regex', '=', False)]"
                        }
                      },
                      partner_id: {}
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

  view_account_reconcile_model_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.reconcile.model',
    type: 'search',
    arch: {
      _filter_withtax: {
        _attr: {
          name: 'withtax',
          string: 'With tax',
          domain: "[('line_ids.tax_ids', '!=', False)]"
        }
      },
      _filter_auto_reconcile: {
        _attr: {
          name: 'auto_reconcile',
          string: 'Auto Reconcile',
          domain: "[('auto_reconcile', '=', True)]"
        }
      },
      rule_type: {},
      _separator: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: "[('active', '=', False)]"
        }
      }
    }
  },

  action_account_reconcile_model: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Reconciliation Models',
    search_view_id: 'view_account_reconcile_model_search',
    res_model: 'account.reconcile.model',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

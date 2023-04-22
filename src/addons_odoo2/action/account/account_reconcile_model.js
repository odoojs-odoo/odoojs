export default {
  view_account_reconcile_model_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.reconcile.model',
    type: 'tree',
    arch: {
      sheet: {
        sequence: { widget: 'handle' },
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
        active: { invisible: '1' },
        payment_tolerance_param: { invisible: '1' },
        company_id: { invisible: '1' },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_action_reconcile_stat: {
            _attr: {
              name: 'action_reconcile_stat',
              type: 'object',
              icon: 'fa-book',
              class: 'oe_stat_button'
            },
            number_entries: {
              string: 'Journal Entries',
              widget: 'statinfo'
            }
          }
        },
        _div_title: {
          _attr: { class: 'oe_title' },
          _label_name: { for: 'name' },
          _h1: {
            name: { placeholder: 'e.g. Bank Fees' }
          }
        },
        _group: {
          _group: {
            rule_type: { widget: 'radio' }
          },
          _group_299: {
            auto_reconcile: { invisible: [['rule_type', '=', 'writeoff_button']] },
            to_check: { invisible: [['rule_type', '!=', 'writeoff_button']] },
            past_months_limit: { invisible: [['rule_type', '!=', 'invoice_matching']] },
            matching_order: { invisible: [['rule_type', '!=', 'invoice_matching']] }
          }
        },
        _notebook: {
          _page: {
            _attr: { string: 'Bank Transactions Conditions' },
            _group: {
              _group: {
                _attr: { class: 'col-6' },
                _label_match_journal_ids: { for: 'match_journal_ids' },
                _div: {
                  match_journal_ids: {
                    widget: 'many2many_tags',
                    no_create: true
                  }
                },
                match_nature: { invisible: [['rule_type', '=', 'writeoff_button']] },
                _label_match_amount: {
                  for: 'match_amount',
                  invisible: [['rule_type', '=', 'writeoff_button']]
                },
                _div_237: {
                  _attr: {
                    invisible: [['rule_type', '=', 'writeoff_button']],
                    class: 'd-flex gap-2'
                  },
                  match_amount: {},
                  match_amount_min: {
                    invisible: [['match_amount', 'in', (false, 'lower')]],
                    required: [['match_amount', '!=', false]]
                  },
                  _span: {
                    _attr: {
                      invisible: [['match_amount', '!=', 'between']],
                      class: 'o_form_label',
                      text: 'and'
                    }
                  },
                  match_amount_max: {
                    invisible: [['match_amount', 'in', (false, 'greater')]],
                    required: [['match_amount', '=', 'between']]
                  }
                },
                _label_allow_payment_tolerance: {
                  for: 'allow_payment_tolerance',
                  invisible: [['rule_type', '!=', 'invoice_matching']]
                },
                _div_379: {
                  _attr: {
                    invisible: [['rule_type', '!=', 'invoice_matching']],
                    class: 'd-flex gap-2'
                  },
                  allow_payment_tolerance: {},
                  _span: {
                    _attr: {
                      invisible: [['allow_payment_tolerance', '=', false]],
                      class: 'd-flex gap-2 w-100'
                    },
                    payment_tolerance_param: {},
                    payment_tolerance_type: {}
                  }
                },
                match_same_currency: { invisible: [['rule_type', '!=', 'invoice_matching']] }
              },
              _group_949: {
                _attr: { class: 'col-6' },
                _span: {
                  _attr: {
                    invisible: [['rule_type', '!=', 'invoice_matching']],
                    class: 'o_form_label o_td_label',
                    text: 'Match Invoice/bill with'
                  }
                },
                _div: {
                  _attr: {
                    invisible: [['rule_type', '!=', 'invoice_matching']],
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
                  invisible: [['rule_type', '=', 'writeoff_button']]
                },
                _div_605: {
                  _attr: {
                    invisible: [['rule_type', '=', 'writeoff_button']],
                    class: 'd-flex gap-3'
                  },
                  match_label: {},
                  match_label_param: {
                    invisible: [['match_label', '=', false]],
                    required: [['match_label', '!=', false]]
                  }
                },
                _label_match_note: {
                  for: 'match_note',
                  invisible: [['rule_type', '=', 'writeoff_button']]
                },
                _div_793: {
                  _attr: {
                    invisible: [['rule_type', '=', 'writeoff_button']],
                    class: 'd-flex gap-3'
                  },
                  match_note: {},
                  match_note_param: {
                    invisible: [['match_note', '=', false]],
                    required: [['match_note', '!=', false]]
                  }
                },
                _label_match_transaction_type: {
                  for: 'match_transaction_type',
                  invisible: [['rule_type', '=', 'writeoff_button']]
                },
                _div_432: {
                  _attr: {
                    invisible: [['rule_type', '=', 'writeoff_button']],
                    class: 'd-flex gap-3'
                  },
                  match_transaction_type: {},
                  match_transaction_type_param: {
                    invisible: [['match_transaction_type', '=', false]],
                    required: [['match_transaction_type', '!=', false]]
                  }
                },
                match_partner: { invisible: [['rule_type', '=', 'writeoff_button']] },
                _label_match_partner_ids: {
                  for: 'match_partner_ids',
                  invisible: ['|', ['match_partner', '=', false], ['rule_type', '=', 'writeoff_button']],
                  class: 'ml16'
                },
                match_partner_ids: {
                  widget: 'many2many_tags',
                  invisible: ['|', ['match_partner', '=', false], ['rule_type', '=', 'writeoff_button']],
                  no_quick_create: true
                },
                _label_match_partner_category_ids: {
                  for: 'match_partner_category_ids',
                  invisible: ['|', ['match_partner', '=', false], ['rule_type', '=', 'writeoff_button']],
                  class: 'ml16'
                },
                match_partner_category_ids: {
                  widget: 'many2many_tags',
                  invisible: ['|', ['match_partner', '=', false], ['rule_type', '=', 'writeoff_button']]
                }
              }
            },
            _group_834: {
              _attr: {
                string: 'Counterpart Entries',
                invisible: [['rule_type', '=', 'invoice_matching'], '|', ['allow_payment_tolerance', '=', false], '&', ['allow_payment_tolerance', '=', true], ['payment_tolerance_param', '=', 0.0]],
                class: 'oe_inline'
              },
              _group: {
                show_decimal_separator: { invisible: '1' },
                decimal_separator: {
                  groups: 'base.group_no_one',
                  invisible: [['show_decimal_separator', '=', false]]
                }
              },
              line_ids: {
                views: {
                  tree: {
                    arch: {
                      sheet: {
                        show_force_tax_included: { invisible: '1' },
                        company_id: { invisible: '1' },
                        sequence: { widget: 'handle' },
                        account_id: {},
                        amount_type: {},
                        journal_id: {
                          column_invisible: [['parent.rule_type', '!=', 'writeoff_button']],
                          optional: 'hide'
                        },
                        amount_string: {},
                        tax_ids: {
                          widget: 'many2many_tags',
                          optional: 'hide'
                        },
                        analytic_distribution: {
                          widget: 'analytic_distribution',
                          groups: 'analytic.group_analytic_accounting',
                          account_field: 'account_id',
                          business_domain: 'general'
                        },
                        force_tax_included: {
                          widget: 'boolean_toggle',
                          invisible: [['show_force_tax_included', '=', false]],
                          optional: 'hide'
                        },
                        label: {}
                      }
                    }
                  }
                }
              }
            }
          },
          _page_882: {
            _attr: {
              string: 'Partner Mapping',
              invisible: [['rule_type', 'not in', ('invoice_matching', 'writeoff_suggestion')]]
            },
            partner_mapping_line_ids: {
              views: {
                tree: {
                  arch: {
                    sheet: {
                      payment_ref_regex: { required: [['narration_regex', '=', false]] },
                      narration_regex: { required: [['payment_ref_regex', '=', false]] },
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
          domain: [['line_ids.tax_ids', '!=', false]]
        }
      },
      _filter_auto_reconcile: {
        _attr: {
          name: 'auto_reconcile',
          string: 'Auto Reconcile',
          domain: [['auto_reconcile', '=', true]]
        }
      },
      rule_type: {},
      _separator: {},
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Archived',
          domain: [['active', '=', false]]
        }
      }
    }
  },

  action_account_reconcile_model: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Reconciliation Models',
    res_model: 'account.reconcile.model',
    search_view_id: 'view_account_reconcile_model_search',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

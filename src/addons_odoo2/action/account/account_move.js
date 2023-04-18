export default {
  view_move_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'tree',
    arch: {
      sheet: {
        made_sequence_hole: {
          invisible: '1'
        },
        date: {},
        name: {},
        partner_id: {},
        ref: {},
        journal_id: {},
        company_id: {
          groups: 'base.group_multi_company'
        },
        amount_total_signed: {
          string: 'Total'
        },
        state: {
          widget: 'badge'
        },
        currency_id: {
          invisible: '1'
        },
        to_check: {
          widget: 'boolean_toggle'
        }
      }
    }
  },

  view_invoice_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'tree',
    arch: {
      sheet: {
        _header: {
          _button_action_register_payment: {
            _attr: {
              name: 'action_register_payment',
              string: 'Register Payment',
              groups: 'account.group_account_user',
              invisible: "context.get['default_move_type'] not in ['out_invoice', 'out_refund', 'out_receipt', 'in_invoice', 'in_refund','in_receipt']",
              type: 'object'
            }
          }
        },
        made_sequence_hole: {
          invisible: '1'
        },
        name: {},
        invoice_partner_display_name: {
          string: 'Vendor',
          groups: 'base.group_user',
          invisible: "context.get['default_move_type'] not in ['in_invoice', 'in_refund','in_receipt']"
        },
        _field_invoice_partner_display_name_701: {
          invoice_partner_display_name: {
            string: 'Customer',
            groups: 'base.group_user',
            invisible: "context.get['default_move_type'] not in ['out_invoice', 'out_refund','out_receipt']"
          }
        },
        invoice_date: {
          string: 'Bill Date',
          invisible: "context.get['default_move_type'] not in ['in_invoice', 'in_refund','in_receipt']"
        },
        _field_invoice_date_240: {
          invoice_date: {
            string: 'Invoice Date',
            invisible: "context.get['default_move_type'] not in ['out_invoice', 'out_refund','out_receipt']"
          }
        },
        date: {
          string: 'Accounting Date'
        },
        invoice_date_due: {
          widget: 'remaining_days',
          invisible: [['payment_state', 'in', ('paid', 'in_payment', 'reversed')]]
        },
        invoice_origin: {
          string: 'Source Document'
        },
        payment_reference: {
          invisible: "context.get['default_move_type'] in ['out_invoice', 'out_refund','out_receipt']"
        },
        ref: {},
        invoice_user_id: {
          string: 'Salesperson',
          widget: 'many2one_avatar_user',
          invisible: "context.get['default_move_type'] not in ['out_invoice', 'out_refund','out_receipt']"
        },
        activity_ids: {
          widget: 'list_activity'
        },
        company_id: {
          groups: 'base.group_multi_company',
          no_create: true
        },
        amount_untaxed_signed: {
          string: 'Tax Excluded'
        },
        amount_tax_signed: {
          string: 'Tax'
        },
        amount_total_signed: {
          string: 'Total'
        },
        amount_total_in_currency_signed: {
          string: 'Total in Currency',
          groups: 'base.group_multi_currency'
        },
        amount_residual_signed: {
          string: 'Amount Due'
        },
        currency_id: {
          groups: 'base.group_multi_currency'
        },
        company_currency_id: {
          invisible: '1'
        },
        to_check: {
          widget: 'boolean_toggle'
        },
        payment_state: {
          widget: 'badge',
          invisible: [['payment_state', 'in', 'invoicing_legacy']]
        },
        state: {
          widget: 'badge'
        },
        move_type: {
          invisible: "context.get['default_move_type', True]"
        }
      }
    }
  },

  view_out_invoice_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    inherit_id: 'account.view_invoice_tree',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: '//tree',
            position: 'attributes'
          },
          _attribute_banner_route: {
            _attr: {
              name: 'banner_route',
              text: '/account/account_invoice_onboarding'
            }
          }
        },
        currency_id: {
          __todo__string: 'Invoice Currency'
        }
      }
    }
  },

  view_out_credit_note_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    inherit_id: 'account.view_invoice_tree',
    arch: {
      sheet: {
        currency_id: {
          __todo__string: 'Credit Note Currency'
        }
      }
    }
  },

  view_in_invoice_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    inherit_id: 'account.view_invoice_tree',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//field[@name='ref']",
            position: 'attributes'
          },
          _attribute_optional: {
            _attr: {
              name: 'optional',
              text: 'show'
            }
          }
        }
      }
    }
  },

  view_in_invoice_bill_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    inherit_id: 'account.view_in_invoice_tree',
    arch: {
      sheet: {
        currency_id: {
          __todo__string: 'Bill Currency'
        }
      }
    }
  },

  view_in_invoice_refund_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    inherit_id: 'account.view_in_invoice_tree',
    arch: {
      sheet: {
        currency_id: {
          __todo__string: 'Refund Currency'
        }
      }
    }
  },

  view_in_invoice_receipt_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    inherit_id: 'account.view_in_invoice_tree',
    arch: {
      sheet: {
        currency_id: {
          __todo__string: 'Receipt Currency'
        }
      }
    }
  },

  view_account_move_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'otherview',
    arch: {}
  },

  view_move_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'form',
    arch: {
      sheet: {
        _header: {
          _button_action_post: {
            _attr: {
              name: 'action_post',
              string: 'Post',
              groups: 'account.group_account_invoice',
              invisible: ['|', ['hide_post_button', '=', true], ['move_type', '!=', 'entry']],
              context: {
                validate_analytic: true
              },
              class: 'oe_highlight',
              type: 'object'
            }
          },
          _button_action_post_392: {
            _attr: {
              name: 'action_post',
              string: 'Confirm',
              groups: 'account.group_account_invoice',
              invisible: ['|', '|', ['hide_post_button', '=', true], ['move_type', '=', 'entry'], ['display_inactive_currency_warning', '=', true]],
              context: {
                validate_analytic: true
              },
              class: 'oe_highlight',
              type: 'object'
            }
          },
          _button_action_invoice_sent: {
            _attr: {
              name: 'action_invoice_sent',
              string: 'Send & Print',
              invisible: ['|', '|', ['state', '!=', 'posted'], ['is_move_sent', '=', true], ['move_type', 'not in', ('out_invoice', 'out_refund')]],
              class: 'oe_highlight',
              type: 'object'
            }
          },
          _button_action_invoice_sent_541: {
            _attr: {
              name: 'action_invoice_sent',
              string: 'Send & Print',
              invisible: ['|', '|', ['state', '!=', 'posted'], ['is_move_sent', '=', false], ['move_type', 'not in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund')]],
              type: 'object'
            }
          },
          _button_action_register_payment: {
            _attr: {
              name: 'action_register_payment',
              string: 'Register Payment',
              groups: 'account.group_account_invoice',
              invisible: ['|', '|', ['state', '!=', 'posted'], ['payment_state', 'not in', ('not_paid', 'partial')], ['move_type', 'not in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt')]],
              context: {
                dont_redirect_to_payments: true
              },
              class: 'oe_highlight',
              type: 'object'
            }
          },
          _button_preview_invoice: {
            _attr: {
              name: 'preview_invoice',
              string: 'Preview',
              invisible: [['move_type', 'not in', ('out_invoice', 'out_refund')]],
              title: 'Preview invoice',
              type: 'object'
            }
          },
          _button_action_view_account_move_reversal: {
            _attr: {
              name: 'action_view_account_move_reversal',
              string: 'Reverse Entry',
              groups: 'account.group_account_invoice',
              invisible: ['|', ['move_type', '!=', 'entry'], '|', ['state', '!=', 'posted'], ['payment_state', '=', 'reversed']],
              type: 'action'
            }
          },
          _button_action_reverse: {
            _attr: {
              name: 'action_reverse',
              string: 'Add Credit Note',
              groups: 'account.group_account_invoice',
              invisible: ['|', ['move_type', 'not in', ('out_invoice', 'in_invoice')], ['state', '!=', 'posted']],
              type: 'object'
            }
          },
          _button_button_cancel: {
            _attr: {
              name: 'button_cancel',
              string: 'Cancel Entry',
              groups: 'account.group_account_invoice',
              invisible: ['|', '|', ['id', '=', false], ['state', '!=', 'draft'], ['move_type', '!=', 'entry']],
              type: 'object'
            }
          },
          _button_button_cancel_953: {
            _attr: {
              name: 'button_cancel',
              string: 'Cancel',
              groups: 'account.group_account_invoice',
              invisible: ['|', '|', ['id', '=', false], ['state', '!=', 'draft'], ['move_type', '==', 'entry']],
              type: 'object'
            }
          },
          _button_button_draft: {
            _attr: {
              name: 'button_draft',
              string: 'Reset to Draft',
              groups: 'account.group_account_invoice',
              invisible: [['show_reset_to_draft_button', '=', false]],
              type: 'object'
            }
          },
          _button_button_set_checked: {
            _attr: {
              name: 'button_set_checked',
              string: 'Set as Checked',
              groups: 'account.group_account_invoice',
              invisible: [['to_check', '=', false]],
              type: 'object'
            }
          },
          state: {
            widget: 'statusbar'
          }
        },
        _div: {
          _attr: {
            invisible: ['|', ['state', '!=', 'draft'], ['duplicated_ref_ids', '=', []]],
            class: 'alert alert-warning mb-0',
            text: 'Warning: this bill might be a duplicate of'
          },
          _button_open_duplicated_ref_bill_view: {
            _attr: {
              name: 'open_duplicated_ref_bill_view',
              string: 'one of those bills',
              class: 'btn btn-link p-0',
              type: 'object'
            }
          }
        },
        _div_283: {
          _attr: {
            groups: 'account.group_account_invoice,account.group_account_readonly',
            invisible: ['|', ['state', '!=', 'draft'], ['tax_lock_date_message', '=', false]],
            class: 'alert alert-warning mb-0'
          },
          tax_lock_date_message: {}
        },
        _div_632: {
          _attr: {
            groups: 'account.group_account_invoice,account.group_account_readonly',
            invisible: ['|', '|', ['move_type', '!=', 'out_invoice'], ['invoice_has_outstanding', '=', false], ['payment_state', 'not in', ('not_paid', 'partial')]],
            class: 'alert alert-info mb-0',
            text: 'You have'
          },
          _bold: {
            _a: {
              _attr: {
                class: 'alert-link',
                text: 'outstanding credits'
              }
            }
          }
        },
        _div_304: {
          _attr: {
            groups: 'account.group_account_invoice,account.group_account_readonly',
            invisible: ['|', '|', ['move_type', '!=', 'in_invoice'], ['invoice_has_outstanding', '=', false], ['payment_state', 'not in', ('not_paid', 'partial')]],
            class: 'alert alert-info mb-0',
            text: 'You have'
          },
          _bold: {
            _a: {
              _attr: {
                class: 'alert-link',
                text: 'outstanding debits'
              }
            }
          }
        },
        _div_329: {
          _attr: {
            groups: 'account.group_account_invoice,account.group_account_readonly',
            invisible: ['|', '|', ['move_type', '!=', 'out_refund'], ['invoice_has_outstanding', '=', false], ['payment_state', 'not in', ('not_paid', 'partial')]],
            class: 'alert alert-info mb-0',
            text: 'You have'
          },
          _bold: {
            _a: {
              _attr: {
                class: 'alert-link',
                text: 'outstanding debits'
              }
            }
          }
        },
        _div_908: {
          _attr: {
            groups: 'account.group_account_invoice,account.group_account_readonly',
            invisible: ['|', '|', ['move_type', '!=', 'in_refund'], ['invoice_has_outstanding', '=', false], ['payment_state', 'not in', ('not_paid', 'partial')]],
            class: 'alert alert-info mb-0',
            text: 'You have'
          },
          _bold: {
            _a: {
              _attr: {
                class: 'alert-link',
                text: 'outstanding credits'
              }
            }
          }
        },
        _div_415: {
          _attr: {
            invisible: ['|', ['state', '!=', 'draft'], ['auto_post', '!=', 'at_date']],
            class: 'alert alert-info mb-0',
            text: 'This move is configured to be posted automatically at the accounting date:'
          },
          date: {}
        },
        _div_273: {
          _attr: {
            invisible: ['|', '|', ['state', '!=', 'draft'], ['auto_post', '=', 'no'], ['auto_post', '=', 'at_date']],
            class: 'alert alert-info mb-0'
          },
          auto_post: {},
          date: {},
          _span: {
            _attr: {
              invisible: [['auto_post_until', '=', false]],
              text: 'The recurrence will end on'
            },
            auto_post_until: {}
          }
        },
        _div_743: {
          _attr: {
            groups: 'account.group_account_invoice,account.group_account_readonly',
            invisible: [['partner_credit_warning', '=', '']],
            class: 'alert alert-warning mb-0'
          },
          partner_credit_warning: {}
        },
        _div_248: {
          _attr: {
            invisible: ['|', ['display_inactive_currency_warning', '=', false], ['move_type', 'not in', ('in_invoice', 'in_refund', 'in_receipt')]],
            class: 'alert alert-warning mb-0',
            text: 'In order to validate this bill, you must'
          },
          _button_action_activate_currency: {
            _attr: {
              name: 'action_activate_currency',
              class: 'oe_link',
              type: 'object',
              text: 'activate the currency of the bill'
            }
          }
        },
        _div_943: {
          _attr: {
            invisible: ['|', ['display_inactive_currency_warning', '=', false], ['move_type', 'not in', ('out_invoice', 'out_refund', 'out_receipt')]],
            class: 'alert alert-warning mb-0',
            text: 'In order to validate this invoice, you must'
          },
          _button_action_activate_currency: {
            _attr: {
              name: 'action_activate_currency',
              class: 'oe_link',
              type: 'object',
              text: 'activate the currency of the invoice'
            }
          }
        },
        _div_514: {
          _attr: {
            invisible: ['|', ['move_type', 'not in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund')], ['state', '!=', 'draft']],
            class: 'o_attachment_preview'
          }
        },
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          },
          _button_action_open_business_doc: {
            _attr: {
              name: 'action_open_business_doc',
              string: '1 Payment',
              invisible: ['|', '|', ['move_type', '!=', 'entry'], ['id', '=', false], ['payment_id', '=', false]],
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-bars'
            }
          },
          _button_open_reconcile_view: {
            _attr: {
              name: 'open_reconcile_view',
              string: 'Reconciled Items',
              invisible: ['|', '|', ['move_type', '!=', 'entry'], ['id', '=', false], ['has_reconciled_entries', '=', false]],
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-bars'
            }
          },
          _button_open_created_caba_entries: {
            _attr: {
              name: 'open_created_caba_entries',
              string: 'Cash Basis Entries',
              invisible: [['tax_cash_basis_created_move_ids', '=', []]],
              class: 'oe_stat_button',
              type: 'object',
              icon: 'fa-usd'
            }
          }
        },
        _widget_web_ribbon: {
          _attr: {
            name: 'web_ribbon',
            invisible: ['|', ['payment_state', '!=', 'paid'], ['move_type', 'not in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt')]],
            title: 'Paid'
          }
        },
        _widget_web_ribbon_910: {
          _attr: {
            name: 'web_ribbon',
            invisible: ['|', ['payment_state', '!=', 'in_payment'], ['move_type', 'not in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt')]],
            title: 'In Payment'
          }
        },
        _widget_web_ribbon_580: {
          _attr: {
            name: 'web_ribbon',
            invisible: ['|', ['payment_state', '!=', 'partial'], ['move_type', 'not in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt')]],
            title: 'Partial'
          }
        },
        _widget_web_ribbon_637: {
          _attr: {
            name: 'web_ribbon',
            invisible: [['payment_state', '!=', 'reversed']],
            title: 'Reversed'
          }
        },
        _widget_web_ribbon_400: {
          _attr: {
            name: 'web_ribbon',
            invisible: [['payment_state', '!=', 'invoicing_legacy']]
          }
        },
        id: {
          invisible: '1'
        },
        company_id: {
          invisible: '1'
        },
        journal_id: {
          invisible: '1'
        },
        show_name_warning: {
          invisible: '1'
        },
        posted_before: {
          invisible: '1'
        },
        move_type: {
          invisible: '1'
        },
        payment_state: {
          invisible: '1',
          force_save: '1'
        },
        invoice_filter_type_domain: {
          invisible: '1'
        },
        suitable_journal_ids: {
          invisible: '1'
        },
        currency_id: {
          invisible: '1'
        },
        company_currency_id: {
          invisible: '1'
        },
        commercial_partner_id: {
          invisible: '1'
        },
        bank_partner_id: {
          invisible: '1'
        },
        display_qr_code: {
          invisible: '1'
        },
        show_reset_to_draft_button: {
          invisible: '1'
        },
        invoice_has_outstanding: {
          invisible: '1'
        },
        is_move_sent: {
          invisible: '1'
        },
        has_reconciled_entries: {
          invisible: '1'
        },
        restrict_mode_hash_table: {
          invisible: '1'
        },
        country_code: {
          invisible: '1'
        },
        display_inactive_currency_warning: {
          invisible: '1'
        },
        statement_line_id: {
          invisible: '1'
        },
        payment_id: {
          invisible: '1'
        },
        tax_country_id: {
          invisible: '1'
        },
        tax_cash_basis_created_move_ids: {
          invisible: '1'
        },
        quick_edit_mode: {
          invisible: '1'
        },
        hide_post_button: {
          invisible: '1'
        },
        duplicated_ref_ids: {
          invisible: '1'
        },
        quick_encoding_vals: {
          invisible: '1'
        },
        _div_title: {
          _attr: {
            class: 'oe_title'
          },
          _span: {
            _attr: {
              class: 'o_form_label'
            },
            move_type: {
              invisible: [['move_type', '=', 'entry']]
            }
          },
          _div: {
            _attr: {
              invisible: [['show_name_warning', '=', false]],
              class: 'text-warning',
              text: 'The current highest number is'
            },
            highest_name: {
              class: 'oe_inline'
            }
          },
          _h1: {
            name: {
              invisible: [['name', '=', '/'], ['posted_before', '=', false], ['quick_edit_mode', '=', false]],
              readonly: [['state', '!=', 'draft']],
              placeholder: 'Draft'
            },
            _span: {
              _attr: {
                invisible: ['|', '|', ['state', '!=', 'draft'], ['name', '!=', '/'], ['quick_edit_mode', '=', true]],
                text: 'Draft'
              }
            }
          }
        },
        _group: {
          _group: {
            _label_partner_id: {
              for: 'partner_id',
              string: 'Customer',
              invisible: [['move_type', 'not in', ('out_invoice', 'out_refund', 'out_receipt')]]
            },
            _label_partner_id_184: {
              for: 'partner_id',
              string: 'Vendor',
              invisible: [['move_type', 'not in', ('in_invoice', 'in_refund', 'in_receipt')]]
            },
            partner_id: {
              widget: 'res_partner_many2one',
              domain: {
                todo_ctx: "[('type', '!=', 'private'), ('company_id', 'in', (False, company_id))]"
              },
              invisible: [['move_type', 'not in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt')]],
              context: {
                todo_ctx: "{                                             'res_partner_search_mode': (context.get('default_move_type', 'entry') in ('out_invoice', 'out_refund', 'out_receipt') and 'customer') or (context.get('default_move_type', 'entry') in ('in_invoice', 'in_refund', 'in_receipt') and 'supplier') or False,                                             'show_address': 1, 'default_is_company': True, 'show_vat': True}"
              },
              always_reload: true,
              no_quick_create: true
            },
            partner_shipping_id: {
              groups: 'account.group_delivery_invoice_address',
              invisible: [['move_type', 'not in', ('out_invoice', 'out_refund', 'out_receipt')]],
              readonly: [['state', '!=', 'draft']]
            },
            quick_edit_total_amount: {
              invisible: ['|', ['move_type', '=', 'entry'], ['quick_edit_mode', '=', false]],
              readonly: [['state', '!=', 'draft']],
              class: 'w-50'
            },
            _label_ref: {
              for: 'ref',
              string: 'Bill Reference',
              invisible: [['move_type', 'not in', ('in_invoice', 'in_receipt', 'in_refund')]]
            },
            ref: {
              invisible: [['move_type', 'not in', ('in_invoice', 'in_receipt', 'in_refund')]]
            },
            _field_ref_481: {
              ref: {
                invisible: [['move_type', 'in', ('in_invoice', 'in_receipt', 'in_refund', 'out_invoice', 'out_refund')]]
              }
            },
            tax_cash_basis_origin_move_id: {
              invisible: [['tax_cash_basis_origin_move_id', '=', false]]
            },
            _label_invoice_vendor_bill_id: {
              for: 'invoice_vendor_bill_id',
              string: 'Auto-Complete',
              invisible: ['|', ['state', '!=', 'draft'], ['move_type', '!=', 'in_invoice']],
              class: 'oe_edit_only'
            },
            invoice_vendor_bill_id: {
              domain: {
                todo_ctx: "[('company_id', '=', company_id), ('partner_id','child_of', [partner_id]), ('move_type','=','in_invoice')]"
              },
              invisible: ['|', ['state', '!=', 'draft'], ['move_type', '!=', 'in_invoice']],
              context: {
                show_total_amount: true
              },
              class: 'oe_edit_only',
              placeholder: 'Select an old vendor bill',
              no_create: true
            }
          },
          _group_877: {
            _label_invoice_date: {
              for: 'invoice_date',
              string: 'Invoice Date',
              invisible: [['move_type', 'not in', ('out_invoice', 'out_refund', 'out_receipt')]]
            },
            _label_invoice_date_477: {
              for: 'invoice_date',
              string: 'Bill Date',
              invisible: [['move_type', 'not in', ('in_invoice', 'in_refund', 'in_receipt')]]
            },
            invoice_date: {
              invisible: [['move_type', 'not in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt')]],
              options: "{'datepicker': {'warn_future': true}}"
            },
            date: {
              string: 'Accounting Date',
              invisible: [['move_type', 'in', ('out_invoice', 'out_refund', 'out_receipt')], ['quick_edit_mode', '=', false]],
              readonly: [['state', '!=', 'draft']]
            },
            payment_reference: {
              invisible: [['move_type', 'not in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt')]]
            },
            partner_bank_id: {
              domain: {
                todo_ctx: "[('partner_id', '=', bank_partner_id)]"
              },
              invisible: [['move_type', 'not in', ('in_invoice', 'in_refund', 'in_receipt')]],
              context: {
                todo_ctx: "{'default_partner_id': bank_partner_id}"
              }
            },
            _div: {
              _attr: {
                invisible: [['move_type', 'not in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt')]],
                class: 'o_td_label'
              },
              _label_invoice_date_due: {
                for: 'invoice_date_due',
                string: 'Due Date',
                invisible: [['invoice_payment_term_id', '!=', false]]
              },
              _label_invoice_payment_term_id: {
                for: 'invoice_payment_term_id',
                string: 'Payment terms',
                invisible: [['invoice_payment_term_id', '=', false]]
              }
            },
            _div_589: {
              _attr: {
                invisible: [['move_type', 'not in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt')]],
                class: 'd-flex'
              },
              invoice_date_due: {
                invisible: [['invoice_payment_term_id', '!=', false]],
                placeholder: 'Date',
                force_save: '1'
              },
              _span: {
                _attr: {
                  invisible: ['|', ['state', '!=', 'draft'], ['invoice_payment_term_id', '!=', false]],
                  class: 'o_form_label mx-3 oe_edit_only',
                  text: 'or'
                }
              },
              invoice_payment_term_id: {
                context: {
                  todo_ctx: "{'example_date': invoice_date, 'example_amount': tax_totals['amount_total']}"
                },
                placeholder: 'Terms'
              }
            },
            _label_journal_id: {
              for: 'journal_id',
              groups: 'account.group_account_readonly',
              invisible: "context.get['default_journal_id'] and context.get['move_type', 'entry'] != 'entry'"
            },
            _div_journal_div: {
              _attr: {
                name: 'journal_div',
                groups: 'account.group_account_readonly',
                invisible: "context.get['default_journal_id'] and context.get['move_type', 'entry'] != 'entry'",
                class: 'd-flex'
              },
              journal_id: {
                readonly: [['posted_before', '=', true]],
                no_create: true,
                no_open: true
              },
              _span: {
                _attr: {
                  groups: 'base.group_multi_currency',
                  invisible: [['move_type', '=', 'entry']],
                  class: 'oe_inline o_form_label mx-3',
                  text: 'in'
                }
              },
              currency_id: {
                groups: 'base.group_multi_currency',
                readonly: [['state', '!=', 'draft']],
                invisible: [['move_type', '=', 'entry']]
              }
            },
            currency_id: {
              groups: '!account.group_account_readonly,base.group_multi_currency',
              readonly: [['state', '!=', 'draft']]
            }
          }
        },
        _notebook: {
          _page_invoice_tab: {
            _attr: {
              name: 'invoice_tab',
              string: 'Invoice Lines',
              invisible: [['move_type', '=', 'entry']]
            },
            invoice_line_ids: {
              widget: 'section_and_note_one2many',
              context: {
                todo_ctx: "{                                            'default_move_type': context.get('default_move_type'),                                            'journal_id': journal_id,                                            'default_partner_id': commercial_partner_id,                                            'default_currency_id': currency_id or company_currency_id,                                            'default_display_type': 'product',                                            'quick_encoding_vals': quick_encoding_vals,                                        }"
              },
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: {
                        string: 'Journal Items'
                      },
                      _control: {
                        _create_add_line_control: {
                          _attr: {
                            name: 'add_line_control',
                            string: 'Add a line'
                          }
                        },
                        _create_add_section_control: {
                          _attr: {
                            name: 'add_section_control',
                            string: 'Add a section',
                            context: {
                              default_display_type: 'line_section'
                            }
                          }
                        },
                        _create_add_note_control: {
                          _attr: {
                            name: 'add_note_control',
                            string: 'Add a note',
                            context: {
                              default_display_type: 'line_note'
                            }
                          }
                        }
                      },
                      sequence: {
                        widget: 'handle'
                      },
                      product_id: {
                        domain: {
                          todo_ctx: "                                                     context.get('default_move_type') in ('out_invoice', 'out_refund', 'out_receipt')                                                     and [('sale_ok', '=', True), '|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]                                                     or [('purchase_ok', '=', True), '|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]                                                "
                        }
                      },
                      name: {
                        widget: 'section_and_note_text'
                      },
                      account_id: {
                        groups: 'account.group_account_readonly',
                        domain: {
                          todo_ctx: "[('deprecated', '=', False), ('account_type', 'not in', ('asset_receivable', 'liability_payable')), ('company_id', '=', parent.company_id), ('is_off_balance', '=', False)]"
                        },
                        required: [['display_type', 'not in', ('line_note', 'line_section')]],
                        context: {
                          todo_ctx: "{'partner_id': partner_id, 'move_type': parent.move_type}"
                        },
                        no_create: true
                      },
                      analytic_distribution: {
                        widget: 'analytic_distribution',
                        groups: 'analytic.group_analytic_accounting',
                        product_field: 'product_id',
                        account_field: 'account_id'
                      },
                      quantity: {},
                      product_uom_category_id: {
                        invisible: '1'
                      },
                      product_uom_id: {
                        string: 'UoM',
                        groups: 'uom.group_uom'
                      },
                      price_unit: {
                        string: 'Price'
                      },
                      discount: {
                        string: 'Disc.%'
                      },
                      tax_ids: {
                        widget: 'many2many_tags',
                        domain: {
                          todo_ctx: "[('type_tax_use', '=?', parent.invoice_filter_type_domain), ('company_id', '=', parent.company_id), ('country_id', '=', parent.tax_country_id)]"
                        },
                        context: {
                          todo_ctx: "{'append_type_to_tax_name': not parent.invoice_filter_type_domain}"
                        },
                        no_create: true
                      },
                      price_subtotal: {
                        string: 'Subtotal',
                        groups: 'account.group_show_line_subtotals_tax_excluded'
                      },
                      price_total: {
                        string: 'Total',
                        groups: 'account.group_show_line_subtotals_tax_included'
                      },
                      partner_id: {
                        invisible: '1'
                      },
                      currency_id: {
                        invisible: '1'
                      },
                      company_id: {
                        invisible: '1'
                      },
                      company_currency_id: {
                        invisible: '1'
                      },
                      display_type: {
                        invisible: '1',
                        force_save: '1'
                      },
                      _field_product_uom_id_670: {
                        product_uom_id: {
                          invisible: '1'
                        }
                      }
                    }
                  }
                },
                kanban: {
                  arch: {
                    sheet: {
                      _attr: {
                        class: 'o_kanban_mobile'
                      },
                      name: {},
                      product_id: {},
                      price_subtotal: {
                        groups: 'account.group_show_line_subtotals_tax_excluded'
                      },
                      price_total: {
                        groups: 'account.group_show_line_subtotals_tax_included'
                      },
                      quantity: {},
                      product_uom_category_id: {
                        invisible: '1'
                      },
                      product_uom_id: {
                        groups: 'uom.group_uom'
                      },
                      price_unit: {},
                      _templates: {
                        _t: {
                          _div: {
                            _t: {
                              _div: {
                                _attr: {
                                  class: 'row g-0'
                                },
                                _div: {
                                  _attr: {
                                    class: 'col-2 pe-3'
                                  },
                                  _img: {}
                                },
                                _div_155: {
                                  _attr: {
                                    class: 'col-10'
                                  },
                                  _div: {
                                    _attr: {
                                      class: 'row'
                                    },
                                    _div: {
                                      _attr: {
                                        class: 'col'
                                      },
                                      _strong: {}
                                    },
                                    _div_690: {
                                      _attr: {
                                        class: 'col-auto'
                                      },
                                      _strong: {
                                        _attr: {
                                          class: 'float-end text-end'
                                        },
                                        _t: {
                                          _attr: {
                                            groups: 'account.group_show_line_subtotals_tax_excluded'
                                          }
                                        },
                                        _t_252: {
                                          _attr: {
                                            groups: 'account.group_show_line_subtotals_tax_included'
                                          }
                                        }
                                      }
                                    }
                                  },
                                  _div_700: {
                                    _attr: {
                                      class: 'text-muted',
                                      text: 'Quantity:'
                                    },
                                    _t: {},
                                    _t_703: {
                                      _attr: {
                                        groups: 'uom.group_uom'
                                      }
                                    }
                                  },
                                  _div_462: {
                                    _attr: {
                                      class: 'text-muted',
                                      text: 'Unit Price:'
                                    },
                                    _t: {}
                                  }
                                }
                              }
                            },
                            _t_692: {
                              _div: {
                                _attr: {
                                  class: 'row'
                                },
                                _div: {
                                  _attr: {
                                    class: 'col-12'
                                  },
                                  _t: {}
                                }
                              }
                            }
                          }
                        }
                      },
                      currency_id: {
                        invisible: '1'
                      },
                      company_currency_id: {
                        invisible: '1'
                      },
                      display_type: {
                        invisible: '1',
                        force_save: '1'
                      }
                    }
                  }
                },
                form: {
                  arch: {
                    sheet: {
                      _sheet: {
                        display_type: {
                          invisible: '1'
                        },
                        company_id: {
                          invisible: '1'
                        },
                        partner_id: {
                          invisible: '1'
                        },
                        _group: {
                          product_id: {
                            widget: 'many2one_barcode'
                          },
                          quantity: {},
                          product_uom_category_id: {
                            invisible: '1'
                          },
                          product_uom_id: {
                            groups: 'uom.group_uom'
                          },
                          price_unit: {},
                          discount: {
                            string: 'Disc.%'
                          }
                        },
                        _group_916: {
                          account_id: {
                            domain: {
                              todo_ctx: "[('company_id', '=', company_id)]"
                            },
                            context: {
                              todo_ctx: "{'partner_id': partner_id, 'move_type': parent.move_type}"
                            },
                            no_create: true
                          },
                          tax_ids: {
                            widget: 'many2many_tags'
                          },
                          analytic_distribution: {
                            widget: 'analytic_distribution',
                            groups: 'analytic.group_analytic_accounting'
                          }
                        },
                        _label_name: {
                          for: 'name',
                          string: 'Description',
                          invisible: [['display_type', 'in', ('line_note', 'line_section')]]
                        },
                        _label_name_301: {
                          for: 'name',
                          string: 'Section',
                          invisible: [['display_type', '!=', 'line_section']]
                        },
                        _label_name_261: {
                          for: 'name',
                          string: 'Note',
                          invisible: [['display_type', '!=', 'line_note']]
                        },
                        name: {
                          widget: 'text'
                        },
                        _group_354: {
                          price_subtotal: {
                            string: 'Subtotal',
                            groups: 'account.group_show_line_subtotals_tax_excluded'
                          },
                          price_total: {
                            string: 'Total',
                            groups: 'account.group_show_line_subtotals_tax_included'
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            _group: {
              _attr: {
                class: 'oe_invoice_lines_tab'
              },
              _group: {
                narration: {
                  placeholder: 'Terms and Conditions'
                }
              },
              _group_271: {
                _group: {
                  _attr: {
                    invisible: ['|', ['move_type', 'not in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt')], ['payment_state', '=', 'invoicing_legacy']],
                    class: 'oe_subtotal_footer oe_right'
                  },
                  tax_totals: {
                    widget: 'account-tax-totals-field',
                    readonly: ['|', ['state', '!=', 'draft'], '&', ['move_type', 'not in', ('in_invoice', 'in_refund')], ['quick_edit_mode', '=', false]]
                  },
                  invoice_payments_widget: {
                    widget: 'payment'
                  },
                  amount_residual: {
                    invisible: [['state', '=', 'draft']],
                    class: 'oe_subtotal_footer_separator'
                  }
                },
                invoice_outstanding_credits_debits_widget: {
                  widget: 'payment',
                  invisible: ['|', ['state', '!=', 'posted'], ['move_type', 'in', ('out_receipt', 'in_receipt')]],
                  class: 'oe_invoice_outstanding_credits_debits'
                }
              }
            }
          },
          _page_aml_tab: {
            _attr: {
              name: 'aml_tab',
              string: 'Journal Items',
              groups: 'account.group_account_readonly'
            },
            line_ids: {
              invisible: [['payment_state', '=', 'invoicing_legacy'], ['move_type', '!=', 'entry']],
              context: {
                todo_ctx: "{                                            'default_move_type': context.get('default_move_type'),                                            'line_ids': line_ids,                                            'journal_id': journal_id,                                            'default_partner_id': commercial_partner_id,                                            'default_currency_id': currency_id or company_currency_id,                                            'kanban_view_ref': 'account.account_move_line_view_kanban_mobile',                                        }"
              },
              views: {
                tree: {
                  arch: {
                    sheet: {
                      _attr: {
                        string: 'Journal Items'
                      },
                      account_id: {
                        domain: {
                          todo_ctx: "[('deprecated', '=', False), ('company_id', '=', parent.company_id)]"
                        },
                        required: [['display_type', 'not in', ('line_section', 'line_note')]],
                        invisible: [['display_type', 'in', ('line_section', 'line_note')]]
                      },
                      partner_id: {
                        domain: ['|', ['parent_id', '=', false], ['is_company', '=', true]],
                        column_invisible: [['parent.move_type', '!=', 'entry']]
                      },
                      name: {
                        widget: 'section_and_note_text'
                      },
                      analytic_distribution: {
                        widget: 'analytic_distribution',
                        groups: 'analytic.group_analytic_accounting',
                        account_field: 'account_id'
                      },
                      date_maturity: {
                        invisible: [['display_type', 'in', ('line_section', 'line_note')]]
                      },
                      amount_currency: {
                        groups: 'base.group_multi_currency'
                      },
                      currency_id: {
                        groups: 'base.group_multi_currency',
                        column_invisible: [['parent.move_type', '!=', 'entry']],
                        no_create: true
                      },
                      tax_ids: {
                        widget: 'autosave_many2many_tags',
                        domain: {
                          todo_ctx: "[('type_tax_use', '=?', parent.invoice_filter_type_domain)]"
                        },
                        readonly: ['|', '|', ['display_type', 'in', ('line_section', 'line_note')], ['tax_line_id', '!=', false], '&', ['parent.move_type', 'in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt')], ['account_type', 'in', ('asset_receivable', 'liability_payable')]],
                        context: {
                          todo_ctx: "{'append_type_to_tax_name': not parent.invoice_filter_type_domain}"
                        },
                        force_save: '1',
                        no_create: true
                      },
                      debit: {
                        invisible: [['display_type', 'in', ('line_section', 'line_note')]],
                        readonly: [['parent.move_type', 'in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt')], ['display_type', 'in', ('line_section', 'line_note', 'product')]]
                      },
                      credit: {
                        invisible: [['display_type', 'in', ('line_section', 'line_note')]],
                        readonly: [['parent.move_type', 'in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt')], ['display_type', 'in', ('line_section', 'line_note', 'product')]]
                      },
                      balance: {
                        invisible: '1'
                      },
                      discount_date: {
                        string: 'Discount Date'
                      },
                      discount_amount_currency: {
                        string: 'Discount Amount'
                      },
                      tax_tag_ids: {
                        string: 'Tax Grids',
                        widget: 'many2many_tags',
                        domain: {
                          todo_ctx: "[                                                     ('applicability', '=', 'taxes'),                                                     '|', ('country_id', '=', parent.tax_country_id),                                                     ('country_id', '=', False),                                                 ]"
                        },
                        no_create: true
                      },
                      tax_tag_invert: {
                        groups: 'base.group_no_one'
                      },
                      _button_action_automatic_entry: {
                        _attr: {
                          name: 'action_automatic_entry',
                          string: 'Cut-Off',
                          invisible: [['account_internal_group', 'not in', ('income', 'expense')]],
                          column_invisible: ['|', ['parent.move_type', '=', 'entry'], ['parent.state', '!=', 'posted']],
                          context: {
                            hide_automatic_options: 1,
                            default_action: 'change_period'
                          },
                          class: 'float-end',
                          type: 'object',
                          icon: 'fa-calendar'
                        }
                      },
                      tax_line_id: {
                        invisible: '1'
                      },
                      company_currency_id: {
                        invisible: '1'
                      },
                      display_type: {
                        invisible: '1',
                        force_save: '1'
                      },
                      company_id: {
                        invisible: '1'
                      },
                      sequence: {
                        invisible: '1'
                      },
                      id: {
                        invisible: '1'
                      },
                      account_internal_group: {
                        invisible: '1'
                      },
                      account_type: {
                        invisible: '1'
                      }
                    }
                  }
                },
                form: {
                  arch: {
                    sheet: {
                      _group: {
                        account_id: {
                          domain: {
                            todo_ctx: "[('company_id', '=', parent.company_id), ('deprecated', '=', False)]"
                          }
                        },
                        partner_id: {
                          domain: ['|', ['parent_id', '=', false], ['is_company', '=', true]]
                        },
                        name: {},
                        analytic_distribution: {
                          widget: 'analytic_distribution',
                          groups: 'analytic.group_analytic_accounting'
                        },
                        amount_currency: {
                          groups: 'base.group_multi_currency'
                        },
                        company_currency_id: {
                          invisible: '1'
                        },
                        company_id: {
                          invisible: '1'
                        },
                        currency_id: {
                          groups: 'base.group_multi_currency',
                          no_create: true
                        },
                        debit: {},
                        credit: {},
                        balance: {
                          invisible: '1'
                        },
                        tax_ids: {
                          string: 'Taxes Applied',
                          widget: 'autosave_many2many_tags',
                          no_create: true
                        },
                        date_maturity: {
                          invisible: "context.get['view_no_maturity', False]"
                        }
                      }
                    }
                  }
                }
              }
            },
            _div: {
              _attr: {
                invisible: ['|', ['payment_state', '!=', 'invoicing_legacy'], ['move_type', '=', 'entry']],
                class: 'alert alert-info text-center mb-0'
              },
              _span: 'This entry has been generated through the Invoicing app, before installing Accounting. Its balance has been imported separately.'
            }
          },
          _page_other_info: {
            _attr: {
              name: 'other_info',
              string: 'Other Info',
              invisible: [['move_type', 'not in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund')]]
            },
            _group: {
              _group_sale_info_group: {
                _attr: {
                  name: 'sale_info_group',
                  string: 'Invoice',
                  invisible: [['move_type', 'not in', ('out_invoice', 'out_refund')]]
                },
                _label_ref: {
                  for: 'ref',
                  string: 'Customer Reference'
                },
                ref: {},
                user_id: {
                  invisible: '1',
                  force_save: '1'
                },
                invoice_user_id: {
                  widget: 'many2one_avatar_user',
                  domain: [['share', '=', false]]
                },
                invoice_origin: {
                  string: 'Source Document',
                  invisible: '1',
                  force_save: '1'
                },
                partner_bank_id: {
                  domain: {
                    todo_ctx: "[('partner_id', '=', bank_partner_id)]"
                  },
                  readonly: [['state', '!=', 'draft']],
                  context: {
                    todo_ctx: "{'default_partner_id': bank_partner_id}"
                  }
                },
                qr_code_method: {
                  invisible: [['display_qr_code', '=', false]]
                }
              },
              _group_accounting_info_group: {
                _attr: {
                  name: 'accounting_info_group',
                  string: 'Accounting',
                  invisible: [['move_type', 'not in', ('out_invoice', 'out_refund', 'in_invoice', 'in_refund')]]
                },
                company_id: {
                  groups: 'base.group_multi_company'
                },
                invoice_incoterm_id: {},
                fiscal_position_id: {},
                invoice_cash_rounding_id: {
                  groups: 'account.group_cash_rounding'
                },
                invoice_source_email: {
                  widget: 'email',
                  invisible: ['|', ['move_type', 'not in', ('in_invoice', 'in_refund')], ['invoice_source_email', '=', false]]
                },
                auto_post: {
                  readonly: [['state', '!=', 'draft']]
                },
                auto_post_until: {
                  invisible: [['auto_post', 'in', ('no', 'at_date')]],
                  readonly: [['state', '!=', 'draft']]
                },
                to_check: {}
              }
            }
          },
          _page_other_info_377: {
            _attr: {
              name: 'other_info',
              string: 'Other Info',
              invisible: [['move_type', '!=', 'entry']]
            },
            _group: {
              _group_misc_group: {
                _attr: {
                  name: 'misc_group'
                },
                auto_post: {
                  invisible: [['move_type', '!=', 'entry']],
                  readonly: [['state', '!=', 'draft']]
                },
                reversed_entry_id: {
                  invisible: [['move_type', '!=', 'entry']]
                },
                auto_post_until: {
                  invisible: [['auto_post', 'in', ('no', 'at_date')]],
                  readonly: [['state', '!=', 'draft']]
                },
                to_check: {
                  invisible: [['move_type', '!=', 'entry']]
                }
              },
              _group: {
                fiscal_position_id: {},
                company_id: {
                  groups: 'base.group_multi_company'
                }
              }
            },
            narration: {
              placeholder: 'Add an internal note...'
            }
          }
        }
      }
    }
  },

  view_account_move_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'search',
    arch: {
      name: {
        string: 'Journal Entry'
      },
      _field_name_970: {
        name: {}
      },
      ref: {},
      date: {},
      partner_id: {},
      journal_id: {},
      _filter_unposted: {
        _attr: {
          name: 'unposted',
          string: 'Unposted',
          domain: [['state', '=', 'draft']]
        }
      },
      _filter_posted: {
        _attr: {
          name: 'posted',
          string: 'Posted',
          domain: [['state', '=', 'posted']]
        }
      },
      _separator: {},
      _filter_reversed: {
        _attr: {
          name: 'reversed',
          string: 'Reversed',
          domain: [['payment_state', '=', 'reversed']]
        }
      },
      _separator_620: {},
      _filter_to_check: {
        _attr: {
          name: 'to_check',
          string: 'To Check',
          domain: [['to_check', '=', true]]
        }
      },
      _separator_956: {},
      _filter_sales: {
        _attr: {
          name: 'sales',
          string: 'Sales',
          domain: [['journal_id.type', '=', 'sale']],
          context: {
            default_journal_type: 'sale'
          }
        }
      },
      _filter_purchases: {
        _attr: {
          name: 'purchases',
          string: 'Purchases',
          domain: [['journal_id.type', '=', 'purchase']],
          context: {
            default_journal_type: 'purchase'
          }
        }
      },
      _filter_bankoperations: {
        _attr: {
          name: 'bankoperations',
          string: 'Bank',
          domain: [['journal_id.type', '=', 'bank']],
          context: {
            default_journal_type: 'bank'
          }
        }
      },
      _filter_cashoperations: {
        _attr: {
          name: 'cashoperations',
          string: 'Cash',
          domain: [['journal_id.type', '=', 'cash']],
          context: {
            default_journal_type: 'cash'
          }
        }
      },
      _filter_misc_filter: {
        _attr: {
          name: 'misc_filter',
          string: 'Miscellaneous',
          domain: [['journal_id.type', '=', 'general']],
          context: {
            default_journal_type: 'general'
          }
        }
      },
      _separator_436: {},
      _filter_date: {
        _attr: {
          name: 'date',
          string: 'Date'
        }
      },
      _separator_590: {},
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_partner: {
          _attr: {
            name: 'partner',
            string: 'Partner',
            domain: [],
            context: {
              group_by: 'partner_id'
            }
          }
        },
        _filter_journal: {
          _attr: {
            name: 'journal',
            string: 'Journal',
            domain: [],
            context: {
              group_by: 'journal_id'
            }
          }
        },
        _filter_status: {
          _attr: {
            name: 'status',
            string: 'Status',
            domain: [],
            context: {
              group_by: 'state'
            }
          }
        },
        _filter_by_date: {
          _attr: {
            name: 'by_date',
            string: 'Date',
            domain: [],
            context: {
              group_by: 'date'
            }
          }
        },
        _filter_by_company: {
          _attr: {
            name: 'by_company',
            string: 'Company',
            groups: 'base.group_multi_company',
            domain: [],
            context: {
              group_by: 'company_id'
            }
          }
        }
      }
    }
  },

  view_account_invoice_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'search',
    arch: {
      name: {
        string: 'Invoice'
      },
      journal_id: {},
      partner_id: {},
      invoice_user_id: {
        string: 'Salesperson',
        domain: [['share', '=', false]]
      },
      date: {
        string: 'Period'
      },
      line_ids: {
        string: 'Invoice Line'
      },
      _filter_myinvoices: {
        _attr: {
          name: 'myinvoices',
          domain: {
            todo_ctx: "[('invoice_user_id', '=', uid)]"
          }
        }
      },
      _separator: {},
      _filter_draft: {
        _attr: {
          name: 'draft',
          string: 'Draft',
          domain: [['state', '=', 'draft']]
        }
      },
      _filter_posted: {
        _attr: {
          name: 'posted',
          string: 'Posted',
          domain: [['state', '=', 'posted']]
        }
      },
      _filter_cancel: {
        _attr: {
          name: 'cancel',
          string: 'Cancelled',
          domain: [['state', '=', 'cancel']]
        }
      },
      _separator_157: {},
      _filter_to_check: {
        _attr: {
          name: 'to_check',
          string: 'To Check',
          domain: [['to_check', '=', true]]
        }
      },
      _separator_505: {},
      _filter_open: {
        _attr: {
          name: 'open',
          string: 'Unpaid',
          domain: [['state', '=', 'posted'], ['payment_state', 'in', ('not_paid', 'partial')]]
        }
      },
      _filter_closed: {
        _attr: {
          name: 'closed',
          string: 'Paid',
          domain: [['state', '=', 'posted'], ['payment_state', 'in', ('in_payment', 'paid')]]
        }
      },
      _filter_late: {
        _attr: {
          name: 'late',
          string: 'Overdue',
          domain: {
            todo_ctx: "[                         ('invoice_date_due', '<', time.strftime('%Y-%m-%d')),                         ('state', '=', 'posted'),                         ('payment_state', 'in', ('not_paid', 'partial'))                     ]"
          }
        }
      },
      _separator_338: {},
      _filter_invoice_date: {
        _attr: {
          name: 'invoice_date',
          string: 'Invoice Date'
        }
      },
      _filter_date: {
        _attr: {
          name: 'date',
          string: 'Accounting Date',
          invisible: "context.get['default_move_type'] in ['out_invoice', 'out_refund', 'out_receipt']"
        }
      },
      _filter_due_date: {
        _attr: {
          name: 'due_date',
          string: 'Due Date'
        }
      },
      _separator_242: {},
      _filter_activities_overdue: {
        _attr: {
          name: 'activities_overdue',
          string: 'Late Activities',
          invisible: '1',
          domain: {
            todo_ctx: "[('my_activity_date_deadline', '<', context_today().strftime('%Y-%m-%d'))]"
          }
        }
      },
      _filter_activities_today: {
        _attr: {
          name: 'activities_today',
          string: 'Today Activities',
          invisible: '1',
          domain: {
            todo_ctx: "[('my_activity_date_deadline', '=', context_today().strftime('%Y-%m-%d'))]"
          }
        }
      },
      _filter_activities_upcoming_all: {
        _attr: {
          name: 'activities_upcoming_all',
          string: 'Future Activities',
          invisible: '1',
          domain: {
            todo_ctx: "[('my_activity_date_deadline', '>', context_today().strftime('%Y-%m-%d'))]"
          }
        }
      },
      _group: {
        _attr: {
          string: 'Group By'
        },
        _filter_salesperson: {
          _attr: {
            name: 'salesperson',
            string: 'Salesperson',
            context: {
              group_by: 'invoice_user_id'
            }
          }
        },
        _filter_status: {
          _attr: {
            name: 'status',
            string: 'Status',
            context: {
              group_by: 'state'
            }
          }
        },
        _separator: {},
        _filter_invoicedate: {
          _attr: {
            name: 'invoicedate',
            string: 'Invoice Date',
            context: {
              group_by: 'invoice_date'
            }
          }
        },
        _filter_duedate: {
          _attr: {
            name: 'duedate',
            string: 'Due Date',
            context: {
              group_by: 'invoice_date_due'
            }
          }
        },
        _filter_group_by_sequence_prefix: {
          _attr: {
            name: 'group_by_sequence_prefix',
            string: 'Sequence Prefix',
            invisible: '1',
            context: {
              group_by: 'sequence_prefix'
            }
          }
        }
      }
    }
  },

  action_move_journal_line: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Journal Entries',
    search_view_id: 'view_account_move_filter',
    res_model: 'account.move',
    context: {
      default_move_type: 'entry',
      search_default_posted: 1,
      view_no_maturity: true
    },
    views: {
      tree: 'view_move_tree',
      form: '=======todo=========='
    }
  },

  action_move_out_invoice_type: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Invoices',
    search_view_id: 'view_account_invoice_filter',
    res_model: 'account.move',
    domain: "[['move_type', '=', 'out_invoice']]",
    context: {
      default_move_type: 'out_invoice'
    },
    views: {
      tree: 'view_out_invoice_tree',
      form: '=======todo=========='
    }
  },

  action_move_out_refund_type: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Credit Notes',
    search_view_id: 'view_account_invoice_filter',
    res_model: 'account.move',
    domain: "[['move_type', '=', 'out_refund']]",
    context: {
      default_move_type: 'out_refund'
    },
    views: {
      tree: 'view_out_credit_note_tree',
      form: '=======todo=========='
    }
  },

  action_move_in_invoice_type: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Bills',
    search_view_id: 'view_account_invoice_filter',
    res_model: 'account.move',
    domain: "[['move_type', '=', 'in_invoice']]",
    context: {
      default_move_type: 'in_invoice'
    },
    views: {
      tree: 'view_in_invoice_bill_tree',
      form: '=======todo=========='
    }
  },

  action_move_in_refund_type: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Refunds',
    search_view_id: 'view_account_invoice_filter',
    res_model: 'account.move',
    domain: "[['move_type', '=', 'in_refund']]",
    context: {
      default_move_type: 'in_refund'
    },
    views: {
      tree: 'view_in_invoice_refund_tree',
      form: '=======todo=========='
    }
  },

  action_move_out_receipt_type: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Receipts',
    search_view_id: 'view_account_invoice_filter',
    res_model: 'account.move',
    domain: "[['move_type', '=', 'out_receipt']]",
    context: {
      default_move_type: 'out_receipt'
    },
    views: {
      tree: 'view_invoice_tree',
      form: '=======todo=========='
    }
  },

  action_move_in_receipt_type: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Receipts',
    search_view_id: 'view_account_invoice_filter',
    res_model: 'account.move',
    domain: "[['move_type', '=', 'in_receipt']]",
    context: {
      default_move_type: 'in_receipt'
    },
    views: {
      tree: 'view_in_invoice_receipt_tree',
      form: '=======todo=========='
    }
  },

  action_move_line_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Entries',
    type: 'ir.actions.act_window',
    search_view_id: 'view_account_move_filter',
    res_model: 'account.move',
    views: {
      tree: 'view_move_tree',
      form: '=======todo=========='
    }
  },

  action_move_switch_invoice_to_credit_note: {
    _odoo_model: 'ir.actions.server',
    model_id: 'account.model_account_move',
    model: 'account_move'
  },

  action_open_account_onboarding_create_invoice: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Create first invoice',
    type: 'ir.actions.act_window',
    res_model: 'account.move',
    context: {
      default_move_type: 'out_invoice'
    },
    views: {
      tree: 'account.view_move_form',
      form: '=======todo=========='
    }
  },

  action_account_invoice_from_list: {
    _odoo_model: 'ir.actions.server',
    model_id: 'account.model_account_move',
    model: 'account_move'
  },

  invoice_send: {
    _odoo_model: 'ir.actions.server',
    type: 'ir.actions.server',
    model_id: 'model_account_move',
    model: 'account_move'
  }
}

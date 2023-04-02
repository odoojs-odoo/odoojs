export default {
  res_partner_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.view_res_partner_filter',
    type: 'search',
    arch: {
      filters: {
        group_type: {},

        group_sell_purchase: {
          customer: { string: '客户', domain: [['customer_rank', '>', 0]] },
          supplier: { string: '供应商', domain: [['supplier_rank', '>', 0]] }
        }
      }
    }
  },

  partner_view_buttons: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    type: 'form',
    inherit_id: 'base.view_partner_form',
    arch: {
      sheet: {
        _group_button_box: {
          _span: 2,
          total_invoiced: { string: 'Invoiced' }
        },
        _group_internal_notes: {},

        _group_internal_notes__invoice: {
          // groups='account.group_account_invoice,account.group_account_readonly',
          // groups="account.group_warning_account"
          _groups:
            'account.group_account_invoice,account.group_account_readonly,account.group_warning_account',

          invoice_warn: { required: '1' },
          invoice_warn_msg: {
            required: ({ record }) => {
              // 'required':
              // [('invoice_warn','!=', False),
              // ('invoice_warn','!=','no-message')],

              const { invoice_warn } = record
              return invoice_warn && invoice_warn !== 'no-message'
            },

            invisible: ({ record }) => {
              // 'invisible':[('invoice_warn','in',(False,'no-message'))]

              const { invoice_warn } = record
              return !invoice_warn || invoice_warn === 'no-message'
            }
          }
        }
      }
    }
  },

  view_partner_property_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    type: 'form',
    inherit_id: 'base.view_partner_form',

    arch: {
      sheet: {
        // _group_button_box: {
        //   _span: 2,
        //   total_invoiced: { string: 'Invoiced' }
        // },

        _group_sales_purchases__sale: {
          property_payment_term_id: {
            groups:
              'account.group_account_invoice,account.group_account_readonly'
          }
        },
        _group_sales_purchases__purchase: {
          property_supplier_payment_term_id: {
            groups:
              'account.group_account_invoice,account.group_account_readonly'
          }
        },

        _group_sales_purchases__fiscal_information: {
          property_account_position_id: {
            groups:
              'account.group_account_invoice,account.group_account_readonly'
          }
        },

        _group_sales_purchases__misc: {},

        _group_accounting__banks: {
          _span: 2,
          // for group_accounting
          _groups:
            'account.group_account_invoice,account.group_account_readonly',
          _invisible: ({ record }) => {
            // for group_accounting
            // 'invisible': [('is_company','=',False),
            // ('parent_id','!=',False)]
            const { is_company, parent_id } = record
            return !is_company && !parent_id
          },
          duplicated_bank_account_partners_count: { invisible: '1' },
          show_credit_limit: { invisible: '1' },
          bank_ids: {
            _sapn: 2,
            widget: 'x2many_tree',
            context: { default_allow_out_payment: true },
            views: {
              tree: {
                fields: {
                  sequence: { widget: 'handle' },
                  bank_id: {},
                  acc_number: {},
                  allow_out_payment: { widget: 'boolean_toggle' },
                  acc_holder_name: { invisible: '1' }
                }
              },

              form: {
                fields: {
                  sequence: { widget: 'handle' },
                  bank_id: {},
                  acc_number: {},
                  allow_out_payment: { widget: 'boolean_toggle' },
                  acc_holder_name: { invisible: '1' }
                }
              }
            }

            // <button type="action" class="btn-link"
            //     name="%(base.action_res_partner_bank_account_form)d"
            //     context="{'search_default_partner_id': active_id, 'default_partner_id': active_id}"
            //     string="View accounts detail"
            //     colspan="2"
            // />
          }
        },

        _group_accounting__accounting_entries: {
          // for group_accounting
          _groups:
            'account.group_account_invoice,account.group_account_readonly',
          // for group_accounting_entries
          // groups="account.group_account_readonly"
          _invisible: ({ record }) => {
            // for group_accounting
            // 'invisible': [('is_company','=',False),
            // ('parent_id','!=',False)]
            const { is_company, parent_id } = record
            return !is_company && !parent_id
          },

          currency_id: { invisible: '1' },
          property_account_receivable_id: {},
          property_account_payable_id: {}
        },

        _group_accounting__credit_limits: {
          // for group_accounting
          _groups:
            'account.group_account_invoice,account.group_account_readonly',

          // for group_accounting
          // groups="account.group_account_invoice,account.group_account_readonly"

          _invisible: ({ record }) => {
            // for group_accounting
            // 'invisible': [('is_company','=',False), ('parent_id','!=',False)]
            // for group_credit_limits
            // 'invisible': [('show_credit_limit', '=', False)]
            const { is_company, parent_id, show_credit_limit } = record
            return (!is_company && !parent_id) || !show_credit_limit
          },

          credit: {},
          use_partner_credit_limit: {},
          credit_limit: {
            invisible: ({ record }) => {
              // 'invisible': [('use_partner_credit_limit', '=', False)]
              const { use_partner_credit_limit } = record
              return !use_partner_credit_limit
            }
          }
        }
      }
    }
  },

  res_partner_action_customer: {
    _odoo_model: 'ir.actions',
    name: 'Customers',
    type: 'ir.actions.act_window',
    res_model: 'res.partner',
    search_view_id: 'res_partner_view_search',
    domain: [],
    context: {
      search_default_customer: 1,
      res_partner_search_mode: 'customer',
      default_is_company: true,
      default_customer_rank: 1
    },
    views: {
      tree: 'base.view_partner_tree',
      form: 'base.view_partner_form'
    }
  },

  res_partner_action_supplier: {
    _odoo_model: 'ir.actions',
    name: 'Vendors',
    type: 'ir.actions.act_window',
    res_model: 'res.partner',
    search_view_id: 'res_partner_view_search',
    domain: [],
    context: {
      search_default_supplier: 1,
      res_partner_search_mode: 'supplier',
      default_is_company: true,
      default_supplier_rank: 1
    },
    views: {
      tree: 'base.view_partner_tree',
      form: 'base.view_partner_form'
    }
  }
}

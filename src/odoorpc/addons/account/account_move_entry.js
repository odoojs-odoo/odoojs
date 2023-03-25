export default {
  view_move_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'tree',
    fields: {
      made_sequence_hole: { invisible: 1 },
      date: {},
      name: {},
      partner_id: {},
      ref: {},
      journal_id: {},
      company_id: {},
      amount_total_signed: {},
      state: { widget: 'badge' },
      currency_id: { invisible: 1 },
      to_check: { widget: 'boolean_toggle' }
    }
  },

  view_move_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'form',
    toolbar: {
      action: {
        // 在数据库中 找到 所有绑定到该模型的 action
        // select * from ir_actions where binding_model_id = ?
        // model_account_move
        //
        //
        // action_invoice_order_generate_link
      },
      print: {
        // odoo 原生是 report kanban
        // 需要 前端自定义
      }
    },

    arch: {
      header: {
        buttons: [
          // Post
          {
            name: 'action_post',
            string: 'Post',
            type: 'object',
            btn_type: 'primary',
            // context="{'validate_analytic': True}"
            context: { validate_analytic: true },
            invisible: ({ record }) => {
              // attrs="{'invisible':
              // ['|', ('hide_post_button', '=', True),
              // ('move_type', '!=', 'entry')]}"/>

              const { hide_post_button, move_type } = record

              return hide_post_button || move_type !== 'entry'
            }
          },
          {
            name: 'action_post',
            string: 'Confirm',
            type: 'object',
            btn_type: 'primary',
            // context="{'validate_analytic': True}"
            context: { validate_analytic: true },
            invisible: ({ record }) => {
              // 'invisible':
              // ['|', '|',
              // ('hide_post_button', '=', True),
              // ('move_type', '=', 'entry'),
              // ('display_inactive_currency_warning','=',True)]

              const {
                hide_post_button,
                move_type,
                display_inactive_currency_warning
              } = record

              return (
                hide_post_button ||
                move_type === 'entry' ||
                display_inactive_currency_warning
              )
            }
          },

          // Send (only invoices)
          // {
          //   name: 'action_invoice_sent',
          //   string: '发送和打印',
          //   type: 'object',
          //   btn_type: 'primary',
          //   invisible: ({ record }) => {
          //     const { state, is_move_sent, move_type } = record
          //     return (
          //       state !== 'posted' ||
          //       is_move_sent ||
          //       !['out_invoice', 'out_refund'].includes(move_type)
          //     )
          //   }
          // },

          // {
          //   name: 'action_invoice_sent',
          //   string: '发送和打印',
          //   type: 'object',
          //   invisible: ({ record }) => {
          //     const { state, is_move_sent, move_type } = record
          //     return (
          //       state !== 'posted' ||
          //       !is_move_sent ||
          //       ![
          //         'out_invoice',
          //         'out_refund',
          //         'in_invoice',
          //         'in_refund'
          //       ].includes(move_type)
          //     )
          //   }
          // },

          // Register Payment (only invoices / receipts)
          {
            name: 'action_register_payment',
            string: 'Register Payment',
            type: 'object',
            btn_type: 'primary',
            // context="{'dont_redirect_to_payments': True}"
            context: { dont_redirect_to_payments: true },
            invisible: ({ record }) => {
              // attrs="{'invisible':
              // ['|', '|', ('state', '!=', 'posted'),
              // ('payment_state', 'not in', ('not_paid', 'partial')),
              // ('move_type', 'not in', (
              // 'out_invoice', 'out_refund', 'in_invoice', 'in_refund',
              // 'out_receipt', 'in_receipt'))]}"

              const { state, payment_state, move_type } = record
              return (
                state !== 'posted' ||
                !['not_paid', 'partial'].includes(payment_state) ||
                ![
                  'out_invoice',
                  'out_refund',
                  'in_invoice',
                  'in_refund',
                  'out_receipt',
                  'in_receipt'
                ].includes(move_type)
              )
            }
          },
          // Preview (only customer invoices)
          // {
          //   name: 'preview_invoice',
          //   string: '预览',
          //   type: 'object',
          //   btn_type: 'primary',
          //   invisible: ({ record }) => {
          //     const { move_type } = record
          //     return !['out_invoice', 'out_refund'].includes(move_type)
          //   }
          // },

          // Reverse

          // {
          //   name: 'action_view_account_move_reversal',
          //   string: '冲红',
          //   type: 'action',
          //   invisible: ({ record }) => {
          //     const { move_type, state, payment_state } = record
          //     return (
          //       move_type !== 'entry' ||
          //       state !== 'posted' ||
          //       payment_state === 'reversed'
          //     )
          //   }
          // },

          // {
          //   name: 'action_reverse',
          //   string: '反转',
          //   type: 'object',
          //   invisible: ({ record }) => {
          //     const { move_type, state } = record
          //     return (
          //       !['out_invoice', 'in_invoice'].includes(move_type) ||
          //       state !== 'posted'
          //     )
          //   }
          // },

          // Cancel
          {
            name: 'button_cancel',
            string: 'Cancel Entry',
            type: 'object',
            invisible: ({ record }) => {
              // attrs="{'invisible' :
              // ['|', '|', ('id', '=', False),
              // ('state', '!=', 'draft'),('move_type', '!=', 'entry')]}"/>

              const { id: res_id, state, move_type } = record
              return !res_id || state !== 'draft' || move_type !== 'entry'
            }
          },
          {
            name: 'button_cancel',

            string: 'Cancel',
            type: 'object',
            invisible: ({ record }) => {
              // attrs="{'invisible' :
              // ['|', '|', ('id', '=', False),
              //  ('state', '!=', 'draft'),
              // ('move_type', '==', 'entry')]}"/>
              const { id: res_id, state, move_type } = record
              return !res_id || state !== 'draft' || move_type === 'entry'
            }
          },
          {
            name: 'button_draft',
            string: 'Reset to Draft',
            type: 'object',
            invisible: ({ record }) => {
              // attrs="{'invisible' :
              // [('show_reset_to_draft_button', '=', False)]}" data-hotkey="q" />

              const { show_reset_to_draft_button } = record
              return !show_reset_to_draft_button
            }
          },

          //   Set as Checked
          {
            name: 'button_set_checked',
            string: '置为已检查',
            type: 'object',
            invisible: ({ record }) => {
              // attrs="{'invisible' : [('to_check', '=', False)]}" data-hotkey="k" />

              const { to_check } = record
              return !to_check
            }
          }
        ],
        fields: {
          state: { widget: 'statusbar', statusbar_visible: 'draft,posted' }
        }
      },

      sheet: {
        _title: {
          display_name: {}
        },

        _group_account_readonly: {
          tax_lock_date_message: {
            invisible({ record }) {
              // 'invisible': [
              // '|', ('state', '!=', 'draft'),
              // ('tax_lock_date_message', '=', False)]
              const { state, tax_lock_date_message } = record
              return state !== 'draft' || !tax_lock_date_message
            }
          },
          date: {
            readonly: '1',
            invisible({ record }) {
              // {'invisible': ['|', ('state', '!=', 'draft'),
              // ('auto_post', '!=', 'at_date')]}">
              const { state, auto_post } = record
              return state !== 'draft' || auto_post !== 'at_date'
            }
          },
          auto_post: {
            readonly: '1',
            invisible({ record }) {
              // {'invisible': ['|', '|',
              // ('state', '!=', 'draft'), ('auto_post', '=', 'no'),
              //  ('auto_post', '=', 'at_date')]
              const { state, auto_post } = record
              return (
                state !== 'draft' ||
                auto_post === 'no' ||
                auto_post === 'at_date'
              )
            }
          },

          partner_credit_warning: {
            readonly: '1',
            invisible({ record }) {
              // 'invisible': [('partner_credit_warning', '=', '')]
              const { partner_credit_warning } = record
              return !partner_credit_warning
            }
          }
        },

        _group_button_box: {
          _span: 2
        },

        _group_web_ribbon: {
          _span: 2
          // Payment status for invoices / receipts
        },

        _group_name: {
          _span: 2,
          state: { invisible: 1 },
          company_id: { invisible: 1 },
          journal_id: { invisible: 1 },
          show_name_warning: { invisible: 1 },
          posted_before: { invisible: 1 },
          // move_type: { invisible: 1 },
          payment_state: { invisible: 1 },
          invoice_filter_type_domain: { invisible: 1 },
          suitable_journal_ids: { invisible: 1 },
          currency_id: { invisible: 1 },
          company_currency_id: { invisible: 1 },
          commercial_partner_id: { invisible: 1 },
          bank_partner_id: { invisible: 1 },
          display_qr_code: { invisible: 1 },
          show_reset_to_draft_button: { invisible: 1 },

          invoice_has_outstanding: { invisible: 1 },
          is_move_sent: { invisible: 1 },
          has_reconciled_entries: { invisible: 1 },
          restrict_mode_hash_table: { invisible: 1 },
          country_code: { invisible: 1 },
          display_inactive_currency_warning: { invisible: 1 },
          statement_line_id: { invisible: 1 },
          payment_id: { invisible: 1 },
          tax_country_id: { invisible: 1 },
          tax_cash_basis_created_move_ids: { invisible: 1 },
          quick_edit_mode: { invisible: 1 },
          hide_post_button: { invisible: 1 },
          duplicated_ref_ids: { invisible: 1 },
          quick_encoding_vals: { invisible: 1 },

          move_type: {
            readonly: '1',
            invisible({ record }) {
              // 'invisible': [('move_type', '=', 'entry')]
              const { move_type } = record
              return move_type === 'entry'
            }
          },

          name: {
            readonly({ record }) {
              //   'readonly': [('state', '!=', 'draft')]
              const { state } = record
              return state !== 'draft'
            },

            invisible({ record }) {
              // 'invisible':
              // [('name', '=', '/'), ('posted_before', '=', False),
              // ('quick_edit_mode', '=', False)],
              const { name, posted_before, quick_edit_mode } = record
              return name === '/' && !posted_before && !quick_edit_mode
            }
          }
        },

        _group_header_left_group: {
          partner_id: {
            string({ record }) {
              const out_moves = ['out_invoice', 'out_refund', 'out_receipt']
              const in_moves = ['in_invoice', 'in_refund', 'in_receipt']

              const out_label = {
                en_US: 'Customer',
                zh_CN: '客户',
                zh_HK: '客户'
              }
              const in_label = {
                en_US: 'Vendor',
                zh_CN: '供应商',
                zh_HK: '供应商'
              }

              const { move_type } = record

              if (out_moves.includes(move_type)) {
                return out_label
              } else if (in_moves.includes(move_type)) {
                return in_label
              } else {
                return in_label
              }
            },

            invisible({ record }) {
              // 'invisible': [
              // ('move_type', 'not in', (
              // 'out_invoice', 'out_refund', 'in_invoice', 'in_refund',
              // 'out_receipt', 'in_receipt'))]

              const move_types = [
                'out_invoice',
                'out_refund',
                'in_invoice',
                'in_refund',
                'out_receipt',
                'in_receipt'
              ]

              const { move_type } = record
              return !move_types.includes(move_type)
            }
          },

          partner_shipping_id: {
            readonly({ record }) {
              // 'readonly': [('state', '!=', 'draft')]
              const { state } = record
              return state !== 'draft'
            },

            invisible({ record }) {
              // attrs="{'invisible': [
              // ('move_type', 'not in', ('out_invoice', 'out_refund', 'out_receipt'))],

              const move_types = ['out_invoice', 'out_refund', 'out_receipt']
              const { move_type } = record
              return !move_types.includes(move_type)
            }
          },

          quick_edit_total_amount: {
            readonly({ record }) {
              // 'readonly': [('state', '!=', 'draft')]
              const { state } = record
              return state !== 'draft'
            },

            invisible({ record }) {
              // 'invisible': [
              // '|', ('move_type', '=', 'entry'),
              // ('quick_edit_mode', '=', False)],
              const { move_type, quick_edit_mode } = record
              return move_type === 'entry' || !quick_edit_mode
            }
          },

          ref: {
            string({ record }) {
              // <label for="ref" string="Bill Reference"
              //  attrs="{'invisible':
              // [('move_type', 'not in', ('in_invoice', 'in_receipt', 'in_refund'))]}" />

              const in_moves = ['in_invoice', 'in_refund', 'in_receipt']

              const not_in_label = {
                en_US: 'Reference',
                zh_CN: '编号',
                zh_HK: '编号'
              }
              const in_label = {
                en_US: 'Bill Reference',
                zh_CN: '供应商账单编号',
                zh_HK: '供应商账单编号'
              }

              const { move_type } = record

              if (in_moves.includes(move_type)) {
                return in_label
              } else {
                return not_in_label
              }
            },

            invisible({ record }) {
              //  <field name="ref" nolabel="1"
              // attrs="{'invisible':[('move_type', 'not in', ('in_invoice', 'in_receipt', 'in_refund'))]}" />
              //  <field name="ref"
              // attrs="{'invisible':[('move_type', 'in', ('in_invoice', 'in_receipt', 'in_refund', 'out_invoice', 'out_refund'))]}"/>
              const { move_type } = record
              const in_moves = ['in_invoice', 'in_refund', 'in_receipt']
              const out_moves = ['out_invoice', 'out_refund']
              if (in_moves.includes(move_type)) {
                return false
              } else if (out_moves.includes(move_type)) {
                return true
              } else {
                return false
              }
            }
          },

          tax_cash_basis_origin_move_id: {
            invisible({ record }) {
              // 'invisible':
              //  [('tax_cash_basis_origin_move_id', '=', False)]}"/>
              const { tax_cash_basis_origin_move_id } = record
              return !tax_cash_basis_origin_move_id
            }
          },

          invoice_vendor_bill_id: {
            domain: ({ record }) => {
              // domain="
              // [('company_id', '=', company_id),
              // ('partner_id','child_of', [partner_id]), ('move_type','=','in_invoice')]"
              const { company_id, partner_id } = record
              return [
                ['company_id', '=', company_id],
                ['partner_id', 'child_of', [partner_id]],
                ['move_type', '=', 'in_invoice']
              ]
            },
            invisible({ record }) {
              // 'invisible':
              // ['|', ('state', '!=', 'draft'), ('move_type', '!=', 'in_invoice')]
              const { state, move_type } = record
              return state !== 'draft' || move_type !== 'in_invoice'
            }
          }
        },

        _group_header_right_group: {
          invoice_date: {
            string({ record }) {
              const out_moves = ['out_invoice', 'out_refund', 'out_receipt']
              const in_moves = ['in_invoice', 'in_refund', 'in_receipt']

              const out_label = {
                en_US: 'Invoice Date',
                zh_CN: '结算单日期',
                zh_HK: '结算单日期'
              }
              const in_label = {
                en_US: 'Bill Date',
                zh_CN: '账单日期',
                zh_HK: '账单日期'
              }

              const { move_type } = record

              if (out_moves.includes(move_type)) {
                return out_label
              } else if (in_moves.includes(move_type)) {
                return in_label
              } else {
                return in_label
              }
            },

            invisible({ record }) {
              // 'invisible':
              // [('move_type', 'not in', (
              // 'out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt'))]

              const type_map = [
                'out_invoice',
                'out_refund',
                'in_invoice',
                'in_refund',
                'out_receipt',
                'in_receipt'
              ]

              const { move_type } = record
              return !type_map.includes(move_type)
            }
          },
          date: {
            readonly: ({ record }) => {
              // 'readonly': [('state', '!=', 'draft')],
              const { state } = record
              return state !== 'draft'
            },

            invisible({ record }) {
              // 'invisible':
              // [('move_type', 'in', (
              // 'out_invoice', 'out_refund', 'out_receipt')),
              // ('quick_edit_mode', '=', False)],

              const out_moves = ['out_invoice', 'out_refund', 'out_receipt']

              const { move_type, quick_edit_mode } = record
              return out_moves.includes(move_type) && !quick_edit_mode
            }
          },

          payment_reference: {
            invisible({ record }) {
              // 'invisible':
              // [('move_type', 'not in', (
              // 'out_invoice', 'out_refund', 'in_invoice', 'in_refund',
              // 'out_receipt', 'in_receipt'))]}"/>

              const inout_moves = [
                'out_invoice',
                'out_refund',
                'in_invoice',
                'in_refund',
                'out_receipt',
                'in_receipt'
              ]

              const { move_type } = record
              return !inout_moves.includes(move_type)
            }
          },
          partner_bank_id: {
            domain: ({ record }) => {
              // domain="[('partner_id', '=', bank_partner_id)]"
              const { bank_partner_id } = record
              return [['partner_id', '=', bank_partner_id]]
            },
            context: ({ record }) => {
              // context="{'default_partner_id': bank_partner_id}"
              const { bank_partner_id } = record
              return { default_partner_id: bank_partner_id }
            },

            invisible({ record }) {
              // 'invisible': [('move_type', 'not in', (
              // 'in_invoice', 'in_refund', 'in_receipt'))]}"/>

              const in_moves = ['in_invoice', 'in_refund', 'in_receipt']
              const { move_type } = record
              return !in_moves.includes(move_type)
            }
          },

          invoice_date_due: {
            invisible({ record }) {
              // 'invisible': [('move_type', 'not in',
              // ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt'))]
              // attrs="{'invisible': [('invoice_payment_term_id', '!=', False)]
              const move_types = [
                'out_invoice',
                'out_refund',
                'in_invoice',
                'in_refund',
                'out_receipt',
                'in_receipt'
              ]
              const { move_type, invoice_payment_term_id } = record
              return !move_types.includes(move_type) || invoice_payment_term_id
            }
          },
          invoice_payment_term_id: {
            invisible({ record }) {
              // 'invisible': [('move_type', 'not in',
              // ('out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt'))]
              // 'invisible': [('invoice_payment_term_id', '=', False)]
              const move_types = [
                'out_invoice',
                'out_refund',
                'in_invoice',
                'in_refund',
                'out_receipt',
                'in_receipt'
              ]
              const { move_type, invoice_payment_term_id } = record
              return !move_types.includes(move_type) || !invoice_payment_term_id
            }
          },

          journal_id: {
            readonly: ({ record }) => {
              //  attrs="{'readonly': [('posted_before', '=', True)]}"
              const { posted_before } = record
              return posted_before
            },

            invisible({ record }) {
              // invisible="
              // context.get('default_journal_id') and
              // context.get('move_type', 'entry') != 'entry'"
              const { context } = record
              return (
                context.default_journal_id &&
                (context.move_type || 'entry') !== 'entry'
              )
            }
          },
          currency_id: {
            readonly: ({ record }) => {
              // 'readonly': [('state', '!=', 'draft')]
              const { state } = record
              return state !== 'draft'
            },

            invisible({ record }) {
              // 'invisible': [('move_type', '=', 'entry')]
              const { move_type } = record
              return move_type === 'entry'
            }
          }
        },

        _group_invoice_tab: {
          _span: 2,
          _invisible: ({ record }) => {
            // 'invisible': [('move_type', '=', 'entry')]
            const { move_type } = record
            return move_type === 'entry'
          },

          invoice_line_ids: {
            widget: 'x2many_tree',

            context: ({ record }) => {
              //   context="{
              //     'default_move_type': context.get('default_move_type'),
              //     'journal_id': journal_id,
              //     'default_partner_id': commercial_partner_id,
              //     'default_currency_id': currency_id or company_currency_id,
              //     'default_display_type': 'product',
              //     'quick_encoding_vals': quick_encoding_vals,
              // }"

              const {
                context,
                journal_id,
                commercial_partner_id,
                currency_id,
                company_currency_id,
                quick_encoding_vals
              } = record

              return {
                default_move_type: context.default_move_type,
                journal_id,
                default_partner_id: commercial_partner_id,
                default_currency_id: currency_id || company_currency_id,
                default_display_type: 'product',
                quick_encoding_vals: quick_encoding_vals
              }
            },

            views: {
              tree: {
                fields: {
                  // sequence: {},
                  product_id: {
                    domain: ({ record }) => {
                      // domain="
                      // context.get('default_move_type') in ('out_invoice', 'out_refund', 'out_receipt')
                      // and [('sale_ok', '=', True), '|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]
                      // or [('purchase_ok', '=', True), '|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]
                      // "
                      const { context, parent } = record
                      return [
                        'out_invoice',
                        'out_refund',
                        'out_receipt'
                      ].includes(context.default_move_type)
                        ? [
                            ['sale_ok', '=', true],
                            '|',
                            ['company_id', '=', false],
                            ['company_id', '=', parent.company_id]
                          ]
                        : [
                            ['purchase_ok', '=', true],
                            '|',
                            ['company_id', '=', false],
                            ['company_id', '=', parent.company_id]
                          ]
                    }
                  },
                  name: { widget: 'section_and_note_text' },
                  account_id: {
                    context({ record }) {
                      // context="{'partner_id': partner_id, 'move_type': parent.move_type}"
                      const { partner_id, parent } = record
                      return {
                        partner_id: partner_id,
                        move_type: parent.move_type
                      }
                    },
                    domain({ record }) {
                      // domain="[('deprecated', '=', False),
                      // ('account_type', 'not in', ('asset_receivable', 'liability_payable')),
                      // ('company_id', '=', parent.company_id), ('is_off_balance', '=', False)]"
                      const { parent } = record
                      return [
                        ['deprecated', '=', false],
                        [
                          'account_type',
                          'not in',
                          ['asset_receivable', 'liability_payable']
                        ],
                        ['company_id', '=', parent.company_id],
                        ['is_off_balance', '=', false]
                      ]
                    },
                    required({ record }) {
                      // [('display_type', 'not in', ('line_note', 'line_section'))]
                      const { display_type } = record
                      return !['line_note', 'line_section'].includes(
                        display_type
                      )
                    }
                  },
                  analytic_account_id: { widget: 'analytic_distribution' },
                  quantity: {},
                  product_uom_category_id: { invisible: '1' },
                  product_uom_id: {},
                  price_unit: {},
                  discount: {},
                  tax_ids: {
                    widget: 'many2many_tags',
                    domain: ({ record }) => {
                      // domain="[('type_tax_use', '=?', parent.invoice_filter_type_domain),
                      // ('company_id', '=', parent.company_id),
                      // ('country_id', '=', parent.tax_country_id)]"
                      const { parent } = record
                      return [
                        [
                          'type_tax_use',
                          '=?',
                          parent.invoice_filter_type_domain
                        ],
                        ['company_id', '=', parent.company_id],
                        ['country_id', '=', parent.tax_country_id]
                      ]
                    },

                    context: ({ record }) => {
                      // context="{'append_type_to_tax_name':
                      // not parent.invoice_filter_type_domain}"
                      const { parent } = record
                      return {
                        append_type_to_tax_name:
                          !parent.invoice_filter_type_domain
                      }
                    }
                  },
                  price_subtotal: {},
                  price_total: {},

                  partner_id: { invisible: '1' },
                  currency_id: { invisible: '1' },
                  company_id: { invisible: '1' },
                  company_currency_id: { invisible: '1' },
                  display_type: { invisible: '1' }
                  // product_uom_id: { invisible: '1' }
                }
              },
              form: {
                arch: {
                  sheet: {
                    _group_invisible: {
                      _span: 2,
                      display_type: { invisible: '1' },
                      company_id: { invisible: '1' },
                      partner_id: { invisible: '1' }
                    },

                    _group_product: {
                      name: {},
                      product_id: { widget: 'many2one_barcode' },
                      quantity: {},
                      product_uom_category_id: { invisible: '1' },
                      product_uom_id: {},
                      price_unit: {},
                      discount: {}
                    },

                    _group_account: {
                      account_id: {
                        readonly2: '1',
                        domain: ({ record }) => {
                          // domain="[('company_id', '=', company_id)]"
                          const { company_id } = record
                          return [['company_id', '=', company_id]]
                        },
                        context: ({ record }) => {
                          // context="{'partner_id': partner_id, 'move_type': parent.move_type}
                          const { partner_id, parent } = record
                          return {
                            partner_id: partner_id,
                            move_type: parent.move_type
                          }
                        }
                      },
                      tax_ids: { widget: 'many2many_tags' },
                      analytic_distribution: { widget: 'analytic_distribution' }
                    },

                    _group_name: {
                      name: { widget: 'text' }
                    },
                    _group_amount: {
                      price_subtotal: {},
                      price_total: {}
                    }
                  }
                },
                fields: {
                  // product_uom_category_id: { invisible: 1 },
                  //
                  // parent_state: { invisible: 1 },
                  //
                  //
                  // debit: { invisible: 1 },
                  // credit: { invisible: 1 },

                  // currency_id: { invisible: 1 },

                  name: {}
                  // price_subtotal: {},
                  // price_total: {},
                  // sequence: {}
                }
              }
            }
          }
        },

        _group_invoice_tab_narration: {
          _invisible: ({ record }) => {
            // 'invisible': [('move_type', '=', 'entry')]
            const { move_type } = record
            return move_type === 'entry'
          },
          narration: {}
        },

        _group_invoice_tab_subtotal_footer: {
          _invisible: ({ record }) => {
            // 'invisible': [('move_type', '=', 'entry')]
            const { move_type } = record
            return move_type === 'entry'
          },
          tax_totals: {
            widget: 'account-tax-totals-field',
            invisible({ record }) {
              // 'invisible': [
              // '|', ('move_type', 'not in', ('out_invoice', 'out_refund',
              //        'in_invoice', 'in_refund',
              //         'out_receipt', 'in_receipt')),
              // ('payment_state' ,'=', 'invoicing_legacy')]
              const types_out = ['out_invoice', 'out_refund', 'out_receipt']
              const types_in = ['in_invoice', 'in_refund', 'in_receipt']
              const types = [...types_out, ...types_in]
              const { move_type, payment_state } = record
              return (
                !types.includes(move_type) ||
                payment_state === 'invoicing_legacy'
              )
            }
          },
          invoice_payments_widget: {
            widget: 'payment',
            invisible({ record }) {
              const types_out = ['out_invoice', 'out_refund', 'out_receipt']
              const types_in = ['in_invoice', 'in_refund', 'in_receipt']
              const types = [...types_out, ...types_in]
              const { move_type, payment_state } = record
              return (
                !types.includes(move_type) ||
                payment_state === 'invoicing_legacy'
              )
            }
          },
          amount_residual: {
            invisible({ record }) {
              // attrs="{'invisible':  [('state', '=', 'draft')]}"

              const types_out = ['out_invoice', 'out_refund', 'out_receipt']
              const types_in = ['in_invoice', 'in_refund', 'in_receipt']
              const types = [...types_out, ...types_in]

              const { move_type, payment_state, state } = record
              return (
                !types.includes(move_type) ||
                payment_state === 'invoicing_legacy' ||
                state === 'draft'
              )
            }
          },

          invoice_outstanding_credits_debits_widget: {
            widget: 'payment',
            invisible({ record }) {
              // 'invisible': ['|',
              // ('state', '!=', 'posted'),
              // ('move_type', 'in', ('out_receipt', 'in_receipt'))]
              const { state, move_type } = record
              return (
                state !== 'posted' ||
                ['out_receipt', 'in_receipt'].includes(move_type)
              )
            }
          }
        },

        _group_aml_tab: {
          _span: 2,

          line_ids: {
            widget: 'x2many_tree',

            invisible: ({ record }) => {
              // attrs="{'invisible':
              // [('payment_state', '=', 'invoicing_legacy'),
              // ('move_type', '!=', 'entry')]}">
              const { payment_state, move_type } = record
              return (
                payment_state === 'invoicing_legacy' && move_type !== 'entry'
              )
            },

            context: ({ record }) => {
              const {
                context,
                line_ids,
                journal_id,
                commercial_partner_id,
                currency_id,
                company_currency_id
              } = record

              // context="{
              //     'default_move_type': context.get('default_move_type'),
              //     'line_ids': line_ids,
              //     'journal_id': journal_id,
              //     'default_partner_id': commercial_partner_id,
              //     'default_currency_id': currency_id or company_currency_id,
              //     'kanban_view_ref': 'account.account_move_line_view_kanban_mobile',
              // }"

              return {
                default_move_type: context.default_move_type,
                line_ids,
                journal_id,
                default_partner_id: commercial_partner_id,
                default_currency_id: currency_id || company_currency_id
              }
            },

            views: {
              tree: {
                fields: {
                  // sequence: {},
                  account_id: {},
                  partner_id: {},
                  name: {},
                  // analytic_distribution: {},
                  // date_maturity: {},
                  // amount_currency: {},
                  // currency_id: {},
                  tax_ids: { widget: 'autosave_many2many_tags' },
                  debit: {},
                  credit: {},
                  // balance: {},
                  // discount_date:{},
                  // discount_amount_currency:{}
                  tax_tag_ids: { widget: 'many2many_tags' }
                  // tax_tag_invert: {},
                  // tax_line_id: {},
                  // company_currency_id: {},
                  // display_type: {},
                  // company_id: {},
                  // sequence: {},
                  // account_internal_group: {},
                  // account_type: {},
                }
              },
              form: {
                arch: {
                  sheet: {
                    _group_name: {
                      _span: 2,
                      name: {},
                      account_id: {
                        domain: ({ record }) => {
                          // "[('company_id', '=', parent.company_id),
                          // ('deprecated', '=', False)]
                          const { parent } = record
                          return [
                            ['company_id', '=', parent.company_id],
                            ['deprecated', '=', false]
                          ]
                        }
                      },
                      partner_id: {
                        // ['|', ('parent_id', '=', False),
                        // ('is_company', '=', True)]
                        domain: () => {
                          return [
                            '|',
                            ['parent_id', '=', false],
                            ['is_company', '=', true]
                          ]
                        }
                      },
                      analytic_distribution: {
                        widget: 'analytic_distribution'
                      },
                      amount_currency: {},
                      company_currency_id: { invisible: 1 },
                      company_id: { invisible: 1 },
                      currency_id: {},
                      debit: {},
                      credit: {},
                      balance: { invisible: 1 },
                      tax_ids: { widget: 'autosave_many2many_tags' },
                      date_maturity: {
                        invisible({ record }) {
                          // context.get('view_no_maturity', False)
                          const { context } = record
                          return context.view_no_maturity
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },

        _group_other_tab_invoice: {
          _invisible({ record }) {
            // attrs="{'invisible':
            // [('move_type', 'not in',
            // ('out_invoice', 'out_refund', 'in_invoice', 'in_refund'))]

            const { move_type } = record
            return ![
              'out_invoice',
              'out_refund',
              'in_invoice',
              'in_refund'
            ].includes(move_type)
          },

          ref: { string: 'Customer Reference' },
          user_id: { invisible: '1' },
          invoice_user_id: {
            widget: 'many2one_avatar_user',
            domain: [['share', '=', false]]
          },
          invoice_origin: { invisible: '1' },
          partner_bank_id: {
            context({ record }) {
              // context="{'default_partner_id': bank_partner_id}"
              const { bank_partner_id } = record
              return { default_partner_id: bank_partner_id }
            },
            domain({ record }) {
              // domain="[('partner_id', '=', bank_partner_id)]"
              const { bank_partner_id } = record
              return ['partner_id', '=', bank_partner_id]
            },
            readonly({ record }) {
              // attrs="{'readonly': [('state', '!=', 'draft')]}
              const { state } = record
              return state !== 'draft'
            }
          },
          qr_code_method: {
            invisible({ record }) {
              // 'invisible': [('display_qr_code', '=', False)]
              const { display_qr_code } = record
              return !display_qr_code
            }
          }
        },

        _group_other_tab_accounting: {
          _invisible({ record }) {
            // attrs="{'invisible':
            // [('move_type', 'not in',
            // ('out_invoice', 'out_refund', 'in_invoice', 'in_refund'))]

            const { move_type } = record
            return ![
              'out_invoice',
              'out_refund',
              'in_invoice',
              'in_refund'
            ].includes(move_type)
          },
          company_id: {},
          invoice_incoterm_id: {},
          fiscal_position_id: {},
          invoice_cash_rounding_id: {},
          invoice_source_email: {
            widget: 'email',
            invisible({ record }) {
              // attrs="{'invisible': ['|',
              // ('move_type', 'not in', ('in_invoice', 'in_refund')),
              // ('invoice_source_email', '=', False)]}"/>

              const { move_type, invoice_source_email } = record
              return (
                !['in_invoice', 'in_refund'].includes(move_type) ||
                !invoice_source_email
              )
            }
          },
          auto_post: {
            readonly({ record }) {
              // 'readonly': [('state','!=','draft')]
              const { state } = record
              return state !== 'draft'
            }
          },
          auto_post_until: {
            readonly({ record }) {
              // 'readonly': [('state', '!=', 'draft')]
              const { state } = record
              return state !== 'draft'
            },
            invisible({ record }) {
              // attrs="{'invisible': [('auto_post', 'in', ('no', 'at_date'))],
              const { auto_post } = record
              return ['no', 'at_date'].includes(auto_post)
            }
          },
          to_check: {}
        },

        _group_other_tab_entry_misc_group: {
          _invisible: ({ record }) => {
            // attrs="{'invisible': [('move_type', '!=', 'entry')]}">
            const { move_type } = record
            return move_type !== 'entry'
          },
          auto_post: {
            readonly: ({ record }) => {
              // 'readonly': [('state','!=','draft')]
              const { state } = record
              return state !== 'draft'
            }
          },
          reversed_entry_id: {},
          auto_post_until: {
            readonly({ record }) {
              // 'readonly': [('state', '!=', 'draft')]
              const { state } = record
              return state !== 'draft'
            },
            invisible({ record }) {
              // 'invisible': [('auto_post', 'in', ('no', 'at_date'))],
              const { auto_post } = record
              return ['no', 'at_date'].includes(auto_post)
            }
          },
          to_check: {}
        },

        _group_other_tab_entry_2: {
          _invisible: ({ record }) => {
            // attrs="{'invisible': [('move_type', '!=', 'entry')]}">
            const { move_type } = record
            return move_type !== 'entry'
          },

          fiscal_position_id: {},
          company_id: { required: '1' }
        },
        _group_other_tab_entry_narration: {
          _invisible: ({ record }) => {
            // attrs="{'invisible': [('move_type', '!=', 'entry')]}">
            const { move_type } = record
            return move_type !== 'entry'
          },
          narration: { placeholder: 'Add an internal note...' }
        }
      }
    }
  },

  view_account_move_filter: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'search',
    arch: {
      fields: {
        name: {
          string: '分录',
          filter_domain: self => {
            return [
              '|',
              '|',
              ['name', 'ilike', self],
              ['ref', 'ilike', self],
              ['partner_id', 'ilike', self]
            ]
          }
        },
        partner_id: {},
        ref: {},
        date: {},
        journal_id: {}
      },
      filters: {
        group_state: {
          __title: '过账状态',
          unposted: { string: '未过账', domain: [['state', '=', 'draft']] },
          posted: { string: '已过账', domain: [['state', '=', 'posted']] }
        },
        group_payment: {
          __title: '支付状态',
          reversed: {
            string: '保留',
            domain: [['payment_state', '=', 'reversed']]
          }
        },
        group_to_check: {
          __title: '检查',
          to_check: { string: '检查', domain: [['to_check', '=', true]] }
        },
        group_type: {
          __title: '日记账类型',
          sales: {
            string: '销售',
            domain: [['journal_id.type', '=', 'sale']],
            context: { default_journal_type: 'sale' }
          },
          purchases: {
            string: '采购',
            domain: [['journal_id.type', '=', 'purchase']],
            context: { default_journal_type: 'purchase' }
          },
          bankoperations: {
            string: '银行',
            domain: [['journal_id.type', '=', 'bank']],
            context: { default_journal_type: 'bank' }
          },
          cashoperations: {
            string: '现金',
            domain: [['journal_id.type', '=', 'cash']],
            context: { default_journal_type: 'cash' }
          },
          misc_filter: {
            string: '其他',
            domain: [['journal_id.type', '=', 'general']],
            context: { default_journal_type: 'general' }
          }
        },
        group_date: {
          date: { string: '日期', date: 'date' }
        }
      }
    }
  },

  action_move_journal_line: {
    _odoo_model: 'ir.actions',
    name: 'Journal Entries',
    type: 'ir.actions.act_window',
    res_model: 'account.move',

    search_view_id: 'view_account_move_filter',
    domain: [],
    context: {
      default_move_type: 'entry',
      search_default_misc_filter: 1,
      view_no_maturity: true
    },

    views: {
      tree: 'view_move_tree',
      form: 'view_move_form'
    }
  }
}

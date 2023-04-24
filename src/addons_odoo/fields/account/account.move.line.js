const ModelFields = {
  account_id: {
    groups: 'account.group_account_readonly',
    required({ record }) {
      // 'required':
      // [('display_type', 'not in', ('line_note', 'line_section'))]
      const { display_type } = record
      return !['line_note', 'line_section'].includes(display_type)
    },

    // 自动创建 m2o 字段时, 才需要. 其他情况无用
    // for account.move.invoice_line_ids
    context2({ record }) {
      // context="{'partner_id': partner_id, 'move_type': parent.move_type}"
      const { partner_id, parent: prt } = record
      return {
        partner_id: partner_id,
        move_type: prt.move_type
      }
    },

    // for account.move.line_ids
    domain: ({ record }) => {
      // "[('company_id', '=', parent.company_id),
      // ('deprecated', '=', False)]
      const { parent: prt } = record
      return [
        ['company_id', '=', prt.company_id],
        ['deprecated', '=', false]
      ]
    },

    // for account.move.invoice_line_ids.tree
    domain2({ record }) {
      // domain="[('deprecated', '=', False),
      // ('account_type', 'not in', ('asset_receivable', 'liability_payable')),
      // ('company_id', '=', parent.company_id), ('is_off_balance', '=', False)]"
      const { parent: prt } = record
      return [
        ['deprecated', '=', false],
        ['account_type', 'not in', ['asset_receivable', 'liability_payable']],
        ['company_id', '=', prt.company_id],
        ['is_off_balance', '=', false]
      ]
    },

    // for account.move.invoice_line_ids.form
    // odoo 使用 tree edit. 因此 应该使用 tree 里的 domain
    domain1: ({ record }) => {
      // domain="[('company_id', '=', company_id)]"
      const { company_id } = record
      return [['company_id', '=', company_id]]
    }
  },
  account_type: {},
  amount_currency: { groups: 'base.group_multi_currency', readonly: '1' },
  amount_residual: { string: 'Residual', readonly: '1' },

  amount_residual_currency: { string: 'Residual in Currency', readonly: '1' },

  analytic_distribution: {
    groups: 'analytic.group_analytic_accounting',
    readonly: '1'
  },

  analytic_line_ids: {
    // context: {
    //   todo_ctx:
    //     "{'tree_view_ref':'analytic.view_account_analytic_line_tree', 'default_general_account_id':account_id, 'default_name': name, 'default_date':date, 'amount': (debit or 0.0)-(credit or 0.0)}"
    // }
  },

  balance: { readonly: '1' },
  blocked: {},
  company_currency_id: {},
  company_id: { groups: 'base.group_multi_company', readonly: '1' },

  credit: {
    readonly({ record }) {
      // 'readonly':
      //   [('parent.move_type', 'in', (
      // 'out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt'
      //   )),
      //   ('display_type', 'in', ('line_section', 'line_note', 'product'))]}"/>

      const move_types = [
        'out_invoice',
        'out_refund',
        'in_invoice',
        'in_refund',
        'out_receipt',
        'in_receipt'
      ]
      const { parent: prt, display_type } = record
      return (
        move_types.includes(prt.move_type) &&
        ['line_section', 'line_note', 'product'].includes(display_type)
      )
    }
  },

  currency_id: { groups: 'base.group_multi_currency' },

  date: { groups: 'account.group_account_readonly' },

  date_maturity: { readonly: '1' },
  debit: {
    readonly({ record }) {
      // 'readonly':
      //   [('parent.move_type', 'in', (
      // 'out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt'
      //   )),
      //   ('display_type', 'in', ('line_section', 'line_note', 'product'))]

      const move_types = [
        'out_invoice',
        'out_refund',
        'in_invoice',
        'in_refund',
        'out_receipt',
        'in_receipt'
      ]
      const { parent: prt, display_type } = record
      return (
        move_types.includes(prt.move_type) &&
        ['line_section', 'line_note', 'product'].includes(display_type)
      )
    }
  },

  discount: { string: 'Disc.%' },
  discount_amount_currency: { string: 'Discount Amount' },
  discount_date: { string: 'Discount Date' },
  full_reconcile_id: {},
  is_account_reconcile: {},
  is_same_currency: {},
  journal_id: { readonly: '1' },
  matched_credit_ids: {},
  matched_debit_ids: {},
  matching_number: { readonly: '1' },
  move_id: { readonly: '1' },
  move_name: { string: 'Journal Entry' },
  move_type: {},
  name: {},
  partner_id: {
    // 'readonly':[('move_type', '!=', 'entry')]
    domain: () => {
      // domain="['|', ('parent_id', '=', False), ('is_company', '=', True)]
      return ['|', ['parent_id', '=', false], ['is_company', '=', true]]
    }
  },

  price_subtotal: {
    groups: 'account.group_show_line_subtotals_tax_excluded'
  },
  price_total: {
    groups: 'account.group_show_line_subtotals_tax_included'
  },

  product_id: {
    //  for account.move.invoice_line_ids
    domain: ({ record, context }) => {
      // domain="
      // context.get('default_move_type') in ('out_invoice', 'out_refund', 'out_receipt')
      // and [('sale_ok', '=', True), '|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]
      // or [('purchase_ok', '=', True), '|', ('company_id', '=', False), ('company_id', '=', parent.company_id)]
      // "
      const { parent: prt } = record
      return ['out_invoice', 'out_refund', 'out_receipt'].includes(
        context.default_move_type
      )
        ? [
            ['sale_ok', '=', true],
            '|',
            ['company_id', '=', false],
            ['company_id', '=', prt.company_id]
          ]
        : [
            ['purchase_ok', '=', true],
            '|',
            ['company_id', '=', false],
            ['company_id', '=', prt.company_id]
          ]
    }
  },

  product_uom_id: {
    groups: 'uom.group_uom',
    // for model
    domain({ record }) {
      // [('category_id', '=', product_uom_category_id)]
      const { product_uom_category_id } = record
      return [['category_id', '=', product_uom_category_id]]
    }
  },
  quantity: { readonly: '1' },
  ref: { readonly: 'False' },
  sequence: {},
  statement_line_id: { readonly: 'True' },
  tax_audit: {},
  tax_ids: {
    // for account.move.line_ids

    readonly({ record }) {
      //   'readonly': [
      //   '|', '|',
      //   ('display_type', 'in', ('line_section', 'line_note')),
      //   ('tax_line_id', '!=', False),
      //   '&amp;',
      //   ('parent.move_type', 'in', (
      // 'out_invoice', 'out_refund', 'in_invoice', 'in_refund', 'out_receipt', 'in_receipt'
      //   )),
      //   ('account_type', 'in', ('asset_receivable', 'liability_payable')),
      //   ]}"

      const move_types = [
        'out_invoice',
        'out_refund',
        'in_invoice',
        'in_refund',
        'out_receipt',
        'in_receipt'
      ]
      const { parent: prt, display_type, tax_line_id, account_type } = record
      return (
        ['line_section', 'line_note'].includes(display_type) ||
        !tax_line_id ||
        (move_types.includes(prt.move_type) &&
          ['asset_receivable', 'liability_payable'].includes(account_type))
      )
    },

    // for account.move.line_ids

    domain3({ record }) {
      // domain="[('type_tax_use', '=?', parent.invoice_filter_type_domain)]"
      const { parent: prt } = record
      return [['type_tax_use', '=?', prt.invoice_filter_type_domain]]
    },

    //for account.move.invoice_line_ids.tree
    domain: ({ record }) => {
      // domain="[('type_tax_use', '=?', parent.invoice_filter_type_domain),
      // ('company_id', '=', parent.company_id),
      // ('country_id', '=', parent.tax_country_id)]"
      const { parent: prt } = record
      return [
        ['type_tax_use', '=?', prt.invoice_filter_type_domain],
        ['company_id', '=', prt.company_id],
        ['country_id', '=', prt.tax_country_id]
      ]
    },

    //for account.move.invoice_line_ids.form
    domain2({ record }) {
      // [('company_id', 'in', [company_id, False])]
      const { company_id } = record
      return [['company_id', 'in', [company_id, false]]]
    },

    context: ({ record }) => {
      // context="{'append_type_to_tax_name':
      // not parent.invoice_filter_type_domain}"
      const { parent: prt } = record
      return {
        append_type_to_tax_name: !prt.invoice_filter_type_domain
      }
    }
  },
  tax_line_id: {
    readonly: '1',
    string: 'Originator Tax'
  },
  tax_tag_ids: {
    string: 'Tax Grids',
    domain: ({ record }) => {
      // domain="[
      //     ('applicability', '=', 'taxes'),
      //     '|', ('country_id', '=', parent.tax_country_id),
      //     ('country_id', '=', False),
      // ]"
      const { parent: prt } = record
      return [
        ['applicability', '=', 'taxes'],
        '|',
        ['country_id', '=', prt.tax_country_id],
        ['company_id', '=', false]
      ]
    }
  },

  tax_tag_invert: { readonly: '1', groups: 'base.group_no_one' }
}

const AddonsFields = {
  'account.move.line': ModelFields
}

export default AddonsFields

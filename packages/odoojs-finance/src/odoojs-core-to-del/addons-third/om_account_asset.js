export default {
  name: 'account_asset',
  depends: ['account'],

  models: {
    'account.asset.category': {
      fields: [
        'active',
        'name',
        'account_analytic_id',
        'analytic_tag_ids',
        'account_asset_id',
        'account_depreciation_id',
        'account_depreciation_expense_id',
        'journal_id',
        'company_id',
        'method',
        'method_number',
        'method_period',
        'method_progress_factor',
        'method_time',
        'method_end',
        'prorata',
        'open_asset',
        'group_entries',
        'type',
        'date_first_depreciation',
      ],
    },

    'account.asset.asset': {
      fields: [
        'entry_count',
        'name',
        'code',
        'value',
        'currency_id',
        'company_id',
        'note',
        'category_id',
        'date',
        'state',
        'active',
        'partner_id',
        'method',
        'method_number',
        'method_period',
        'method_end',
        'method_progress_factor',
        'value_residual',
        'method_time',
        'prorata',
        'depreciation_line_ids',
        'salvage_value',
        'invoice_id',
        'type',
        'account_analytic_id',
        'analytic_tag_ids',
        'date_first_depreciation',
        'first_depreciation_manual_date',
      ],
    },

    'account.asset.depreciation.line': {
      fields: [
        'name',
        'sequence',
        'asset_id',
        'parent_state',
        'amount',
        'remaining_value',
        'depreciated_value',
        'depreciation_date',
        'move_id',
        'move_check',
        'move_posted_check',
      ],
    },

    'account.invoice.line': {
      fields: [
        'asset_category_id',
        'asset_start_date',
        'asset_end_date',
        'asset_mrr',
      ],
    },

    'account.move': {
      fields: ['asset_depreciation_ids'],
    },

    'product.template': {
      fields: ['asset_category_id', 'deferred_revenue_category_id'],
    },

    'product.product': {
      fields: ['asset_category_id', 'deferred_revenue_category_id'],
    },
  },
};

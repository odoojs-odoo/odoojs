export default {
  name: 'stock_account',
  depends: ['stock', 'account'],
  models: {
    'account.move': {
      fields: ['stock_move_id'],
    },

    'product.template': {
      fields: [
        'property_valuation',
        'valuation',
        'property_cost_method',
        'cost_method',
        'property_stock_account_input',
        'property_stock_account_output',
      ],
    },

    'product.product': {
      fields: [
        'stock_value_currency_id',
        'stock_value',
        'qty_at_date',
        'stock_fifo_real_time_aml_ids',
        'stock_fifo_manual_move_ids',
      ],
    },

    'product.category': {
      fields: [
        'property_valuation',
        'property_cost_method',
        'property_stock_journal',
        'property_stock_account_input_categ_id',
        'property_stock_account_output_categ_id',
        'property_stock_valuation_account_id',
      ],
    },

    'stock.inventory': {
      fields: ['accounting_date'],
    },

    'stock.location': {
      fields: ['valuation_in_account_id', 'valuation_out_account_id'],
    },

    'stock.move': {
      fields: [
        'to_refund',
        'value',
        'remaining_qty',
        'remaining_value',
        'account_move_ids',
      ],
    },
  },
};

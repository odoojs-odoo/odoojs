export default {
  models: {
    'account.invoice': {
      fields: ['team_id', 'comment', 'partner_shipping_id'],
    },

    'account.invoice.line': {
      fields: ['sale_line_ids'],
    },

    'account.analytic.line': {
      fields: ['so_line'],
    },
  },
};

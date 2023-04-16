export default {
  account_invoice_groupby_inherit: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    inherit_id: 'account.view_account_invoice_filter',
    type: 'search',
    arch: {
      fields: {
        invoice_user_id: {},
        team_id: {}
      }
    }
  },

  account_invoice_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.move',
    type: 'tree',
    inherit_id: 'account.view_invoice_tree',
    arch: {
      sheet: {
        invoice_user_id: {},
        team_id: {
          optional: 'hide',
          invisible({ context }) {
            // invisible="context.get('default_move_type') not in (
            // 'out_invoice', 'out_refund','out_receipt')"
            const move_types = ['out_invoice', 'out_refund', 'out_receipt']
            const default_move_type = context.default_move_type
            return !move_types.includes(default_move_type)
          }
        }
      }
    }
  }
}

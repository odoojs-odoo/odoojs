export default {
  account_analytic_account_view_form_mrp: {
    _odoo_model: 'ir.ui.view',
    model: 'account.analytic.account',
    inherit_id: 'analytic.view_account_analytic_account_form',
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            position: 'inside'
          },
          _button_action_view_mrp_production: {
            _attr: {
              name: 'action_view_mrp_production',
              type: 'object',
              icon: 'fa-wrench',
              groups: 'mrp.group_mrp_user',
              invisible: [['production_count', '=', 0]],
              class: 'oe_stat_button'
            },
            production_count: {
              string: 'Manufacturing Orders',
              widget: 'statinfo'
            }
          },
          _button_action_view_mrp_bom: {
            _attr: {
              name: 'action_view_mrp_bom',
              type: 'object',
              icon: 'fa-flask',
              groups: 'mrp.group_mrp_user',
              invisible: [['bom_count', '=', 0]],
              class: 'oe_stat_button'
            },
            bom_count: {
              string: 'Bills of Materials',
              widget: 'statinfo'
            }
          }
        }
      }
    }
  }
}

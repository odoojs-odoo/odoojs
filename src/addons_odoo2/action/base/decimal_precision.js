export default {
  view_decimal_precision_form: {
    _odoo_model: 'ir.ui.view',
    model: 'decimal.precision',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: {
            readonly: [['id', '!=', false]]
          },
          digits: {}
        }
      }
    }
  },

  view_decimal_precision_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'decimal.precision',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        digits: {}
      }
    }
  },

  action_decimal_precision_form: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Decimal Accuracy',
    res_model: 'decimal.precision',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

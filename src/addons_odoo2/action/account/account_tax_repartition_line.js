export default {
  tax_repartition_line_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.tax.repartition.line',
    type: 'tree',
    arch: {
      sheet: {
        sequence: {
          widget: 'handle'
        },
        factor_percent: {
          attrs: {
            invisible: "[('repartition_type', '=', 'base')]"
          }
        },
        repartition_type: {},
        account_id: {
          attrs: {
            invisible: "[('repartition_type', '=', 'base')]"
          },
          no_create: true
        },
        tag_ids: {
          widget: 'many2many_tags',
          domain: {
            todo_ctx: "[('applicability', '=', 'taxes'), '|', ('country_id', '=', parent.country_id), ('country_id', '=', False)]"
          },
          no_create: true
        },
        use_in_tax_closing: {
          attrs: {
            invisible: "[('repartition_type', '=', 'base')]"
          }
        },
        company_id: {
          invisible: '1'
        }
      }
    }
  }
}

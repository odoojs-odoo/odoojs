export default {
  digest_digest_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'digest.digest',
    inherit_id: 'digest.digest_digest_view_form',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//group[@name='kpis']/group[last()]",
            position: 'before'
          },
          _group_kpi_crm: {
            _attr: {
              name: 'kpi_crm',
              string: 'CRM',
              groups: 'sales_team.group_sale_salesman_all_leads'
            },
            kpi_crm_lead_created: {},
            kpi_crm_opportunities_won: {}
          }
        }
      }
    }
  }
}

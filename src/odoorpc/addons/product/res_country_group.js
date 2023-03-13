// ok

export default {
  view_country_group_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.country.group',
    type: 'tree',
    fields: {
      name: {}
    }
  },
  view_country_group_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.country.group',
    type: 'form',
    arch: {
      header: {
        buttons: [],
        fields: {}
      },
      sheet: {
        _title: {
          display_name: {}
        },

        _group_name: {
          _span: 2,
          name: {},
          country_ids: {
            widget: 'many2many_tags'
          }
        },
        _group_pricelist_ids: {
          _span: 2,
          pricelist_ids: {
            widget: 'x2many_tree',
            views: {
              tree: { fields: { name: {} } },
              kanban: {
                fields: { name: {} },
                templates: {
                  title({ record }) {
                    return record.name
                  }
                }
              },
              form: { fields: { name: {} } }
            }
          }
        }
      }
    },

    fields: {}
  },

  action_country_group: {
    _odoo_model: 'ir.actions',
    name: '国家组',
    type: 'ir.actions.act_window',
    res_model: 'res.country.group',

    domain: [],
    context: {},
    views: {
      tree: 'view_country_group_tree',
      form: 'view_country_group_form'
    }
  }
}

export default {
  view_country_group_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.country.group',
    type: 'tree',
    arch: {
      sheet: {
        name: {}
      }
    }
  },

  view_country_group_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.country.group',
    type: 'form',

    arch: {
      sheet: {
        _div_title: {
          _label: { for: 'name', string: 'Group Name' },
          _h1: { name: { placeholder: 'e.g. Europe' } }
        },

        _group_country_group: {
          country_ids: { widget: 'many2many_tags' }
        }
      }
    }
  },

  action_country_group: {
    _odoo_model: 'ir.actions',
    name: 'Country Group',
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

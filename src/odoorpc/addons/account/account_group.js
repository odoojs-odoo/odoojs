export default {
  view_account_group_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'account.group',
    type: 'tree',
    fields: {
      code_prefix_start: {},
      code_prefix_end: {},
      name: {},
      company_id: {}
    }
  },

  view_account_group_form: {
    _odoo_model: 'ir.ui.view',
    model: 'account.group',
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
          code_prefix_start: {},
          code_prefix_end: {},
          name: {},
          company_id: {}
        }
      }
    }
  },

  view_account_group_search: {
    _odoo_model: 'ir.ui.view',
    model: 'account.group',
    type: 'search',
    arch: {
      fields: {
        name: {
          // "['|', ('code_prefix_start', '=like', self + '%'), ('name', 'ilike', self)]"

          filter_domain(self) {
            return [
              '|',
              ['code_prefix_start', '=like', `${self}%`],
              ['name', 'ilike', self]
            ]
          }
        }
      },

      filters: {}
    }
  },

  action_account_group_action: {
    _odoo_model: 'ir.actions',
    name: 'Account Groups',
    type: 'ir.actions.act_window',
    res_model: 'account.group',
    search_view_id: 'view_account_group_search',
    domain: [],
    context: {},
    views: {
      tree: 'view_account_group_tree',
      form: 'view_account_group_form'
    }
  }
}

// <record id="action_account_group_action" model="ir.actions.act_window">
// <field name="name">Account Groups</field>
// <field name="type">ir.actions.act_window</field>
// <field name="res_model">account.group</field>
// <field name="view_mode">tree,form</field>
// </record>

// <record id="action_account_group_action" model="ir.actions.act_window">
// <field name="name">Account Groups</field>
// <field name="type">ir.actions.act_window</field>
// <field name="res_model">account.group</field>
// <field name="view_mode">tree,form</field>
// </record>

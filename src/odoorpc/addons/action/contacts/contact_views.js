// ok

export default {
  action_contacts: {
    _odoo_model: 'ir.actions',
    name: '联系人',
    type: 'ir.actions.act_window',
    res_model: 'res.partner',
    search_view_id: 'base.view_res_partner_filter',
    domain: [],
    context: { default_is_company: true },

    views: {
      tree: 'base.view_partner_tree',
      form: 'base.view_partner_form'
    }
  },

  menu_contacts: {
    _odoo_model: 'ir.ui.menu',
    name: '联系人',
    sequence: 20,
    children: {
      res_partner_menu_contacts: {
        // _odoo_model: 'ir.ui.menu',
        action: 'action_contacts',
        // parent: 'menu_contacts',
        name: '联系人',
        sequence: 2
      },

      res_partner_menu_config: {
        _odoo_model: 'ir.ui.menu',
        parent: 'menu_contacts',
        name: '配置',
        sequence: 2,
        children: {
          menu_partner_category_form: {
            action: 'base.action_partner_category_form',
            parent: 'res_partner_menu_config',
            name: '联系人标签',
            sequence: 1
          },

          menu_partner_title_contact: {
            action: 'base.action_partner_title_contact',
            parent: 'res_partner_menu_config',
            name: '联系人头衔',
            sequence: 3
          },

          res_partner_industry_menu: {
            action: 'base.res_partner_industry_action',
            parent: 'res_partner_menu_config',
            name: '行业',
            sequence: 5
          },

          menu_localisation: {
            parent: 'res_partner_menu_config',
            name: '本地化',
            sequence: 5,
            children: {
              menu_country_partner: {
                action: 'base.action_country',
                parent: 'menu_localisation',
                name: '国家',
                sequence: 1
              },

              menu_country_group: {
                action: 'base.action_country_group',
                parent: 'menu_localisation',
                name: '国家组',
                sequence: 1
              }
            }
          },

          menu_config_bank_accounts: {
            parent: 'res_partner_menu_config',
            name: '银行',
            sequence: 6,
            children: {
              menu_action_res_bank_form: {
                action: 'base.action_res_bank_form',
                parent: 'menu_config_bank_accounts',
                name: '银行',
                sequence: 1
              },
              menu_action_res_partner_bank_form: {
                action: 'base.action_res_partner_bank_account_form',
                parent: 'menu_config_bank_accounts',
                name: '银行账号',
                sequence: 1
              }
            }
          }
        }
      }
    }
  }
}

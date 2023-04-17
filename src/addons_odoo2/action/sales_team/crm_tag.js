export default {
  sales_team_crm_tag_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.tag',
    type: 'form',
    arch: {
      sheet: {
        _div_title: {
          _attr: {
            class: 'oe_title'
          },
          _label_name: {
            for: 'name'
          },
          _h1: {
            name: {
              placeholder: 'e.g. Services'
            }
          }
        },
        _group: {
          _group: {
            color: {
              widget: 'color_picker'
            }
          }
        }
      }
    }
  },

  sales_team_crm_tag_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'crm.tag',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        color: {
          widget: 'color_picker'
        }
      }
    }
  },

  sales_team_crm_tag_action: {
    _odoo_model: 'ir.actions',
    name: 'Tags',
    res_model: 'crm.tag',
    views: {
      tree: 'sales_team_crm_tag_view_tree',
      form: '=======todo=========='
    }
  }
}

// ok

export default {
  view_country_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.country',
    type: 'tree',
    buttons: { create: false, delete: false },
    fields: {
      name: {},
      code: {}
    }
  },

  view_country_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.country',
    type: 'form',
    buttons: { create: false, edit: true, delete: false },

    fields: {
      display_name: {},
      image_url: { widget: 'image_url' },
      name: {},
      code: {},
      currency_id: {},
      phone_code: {},
      vat_label: {},
      zip_required: {},
      state_required: {},
      address_view_id: {},
      address_format: {},
      name_position: {},

      state_ids: {
        widget: 'x2many_tree',
        views: {
          tree: { fields: { name: {}, code: {} } },
          kanban: {
            fields: { name: {}, code: {} },
            templates: {
              title({ record }) {
                return record.name
              },

              default({ record }) {
                return record.code
              }
            }
          },
          form: { fields: { display_name: {}, name: {}, code: {} } }
        }
      }
    }
  },

  action_country: {
    _odoo_model: 'ir.actions',
    name: '国家',
    type: 'ir.actions.act_window',
    res_model: 'res.country',
    domain: [],
    context: {}
  },

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
    fields: {
      name: {},
      country_ids: {
        widget: 'many2many_tags'
      },
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
  },

  action_country_group: {
    _odoo_model: 'ir.actions',
    name: '国家组',
    type: 'ir.actions.act_window',
    res_model: 'res.country.group',

    domain: [],
    context: {}
  }
}

export default {
  res_lang_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.lang',
    type: 'tree',
    fields: {
      name: {},
      code: {},
      iso_code: {},
      url_code: { invisible: 1 },
      direction: {},
      active: {}
    }
  },
  res_lang_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.lang',
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
          name: {}
        },

        _group_image: {
          flag_image: { widget: 'image' }
        },

        _group_code: {
          code: {},
          iso_code: {},
          url_code: { invisible: 1, required: 0 },
          active: {}
        },

        _group_set: {
          direction: {},
          grouping: {},
          decimal_point: {},
          thousands_sep: {},
          date_format: {},
          time_format: {},
          week_start: {}
        }
      }
    }
  },

  res_lang_search: {
    _odoo_model: 'ir.ui.view',
    model: 'res.lang',
    type: 'search',
    arch: {
      fields: {
        name: {
          filter_domain: self => {
            return [
              '|',
              '|',
              ['name', 'ilike', self],
              ['code', 'ilike', self],
              ['iso_code', 'ilike', self]
            ]
          }
        },
        direction: {}
      },

      filters: {
        group_active: {
          active: {
            string: 'Active',
            domain: [['active', '=', true]]
          }
        }
      }
    }
  },

  res_lang_act_window: {
    _odoo_model: 'ir.actions',
    name: 'Languages',
    type: 'ir.actions.act_window',
    res_model: 'res.lang',
    search_view_id: 'res_lang_search',
    domain: [],
    context: { active_test: false },
    views: {
      tree: 'res_lang_tree',
      form: 'res_lang_form'
    }
  }
}

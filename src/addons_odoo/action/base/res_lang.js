export default {
  res_lang_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.lang',
    type: 'tree',
    // tree view. 除了 fields 之外 还有其他标签
    // todo
    // <header>
    //  <button name="action_activate_langs" type="object" string="Activate"/>
    // </header>
    fields: {
      name: {},
      code: { groups: 'base.group_no_one' },
      iso_code: { groups: 'base.group_no_one' },
      url_code: { groups: 'base.group_no_one', invisible: 1 },
      direction: { groups: 'base.group_no_one' },
      active: {}
    }
  },
  res_lang_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.lang',
    type: 'form',
    arch: {
      sheet: {
        _div_button_box: {
          _button: {
            _attr: {
              string: 'Activate and Translate',
              name: 'base.action_view_base_language_install',
              type: 'action',
              icon: 'fa-refresh'
            }
          }
        },

        flag_image: { widget: 'image' },

        _div_title: {
          _label: { _attr: { for: 'name' } },
          _h1: { name: { placeholder: 'e.g. French' } }
        },

        _group_1: {
          _group_1: {
            code: {},
            iso_code: {},
            url_code: { invisible: 1, required: 0 },
            active: { widget: 'boolean_toggle' }
          },

          _group_2: {
            direction: {},
            grouping: {},
            decimal_point: {},
            thousands_sep: {},
            date_format: {},
            time_format: {},
            week_start: {}
          }
        },

        _div: {
          // help
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

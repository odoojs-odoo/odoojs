export default {
  view_country_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.country',
    type: 'tree',
    buttons: { create: false, delete: false },
    arch: {
      sheet: {
        name: {},
        code: {}
      }
    }
  },

  view_country_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.country',
    type: 'form',
    buttons: { create: false, edit: true, delete: false },

    arch: {
      sheet: {
        _div_button_box: {},
        image_url: { widget: 'image_url' },

        _group_main_group: {
          _group_country_details: {
            name: {},
            currency_id: {},
            code: {}
          },
          _group_phone_vat_settings: {
            phone_code: {},
            vat_label: {},
            zip_required: {},
            state_required: {}
          }
        },

        _group_advanced_address_formatting: {
          _attr: {
            string: 'Advanced Address Formatting',
            groups: 'base.group_no_one',
            col: 24
          },

          _field_address_view_id: {
            _label: { for: 'address_view_id' },
            _div_row: {
              address_view_id: {},
              _div: 'Choose a subview of partners that includes only address fields, to change the way users can input addresses.'
            }
          },

          _field_address_format: {
            _label_2: { for: 'address_format' },
            _div_row: {
              address_format: { placeholder: 'Address format...' },
              _div: 'Change the way addresses are displayed in reports'
            }
          },
          name_position: {}
        },

        _label: { for: 'state_ids' },

        state_ids: {
          widget: 'x2many_tree',
          nolabel: 1,
          views: {
            tree: {
              arch: {
                sheet: {
                  name: {},
                  code: {}
                }
              }
            },
            form: {
              arch: {
                sheet: { name: {}, code: {} }
              }
            }
          }
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
    context: {},
    views: {
      tree: 'view_country_tree',
      form: 'view_country_form'
    }
  }
}

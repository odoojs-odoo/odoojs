export default {
  view_country_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'res.country',
    type: 'tree',
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
    arch: {
      sheet: {
        _div_button_box: {
          _attr: {
            name: 'button_box',
            class: 'oe_button_box'
          }
        },
        image_url: {
          widget: 'image_url',
          class: 'oe_avatar',
          size: [128, 128]
        },
        _group_main_group: {
          _attr: { name: 'main_group' },
          _group_country_details: {
            _attr: { name: 'country_details' },
            name: {},
            currency_id: {},
            code: {}
          },
          _group_phone_vat_settings: {
            _attr: { name: 'phone_vat_settings' },
            phone_code: { options: "{'format': false}" },
            vat_label: {},
            zip_required: {},
            state_required: {}
          }
        },
        _group_advanced_address_formatting: {
          _attr: {
            name: 'advanced_address_formatting',
            string: 'Advanced Address Formatting',
            groups: 'base.group_no_one'
          },
          _label_address_view_id: { for: 'address_view_id' },
          _div: {
            _attr: { class: 'o_row' },
            address_view_id: {},
            _div: {
              _attr: {
                class: 'text-muted ms-2',
                text: 'Choose a subview of partners that includes only address fields, to change the way users can input addresses.'
              }
            }
          },
          _label_address_format: { for: 'address_format' },
          _div_356: {
            _attr: { class: 'o_row' },
            address_format: { placeholder: 'Address format...' },
            _div_div_address_format$space$ms$dash$2: {
              _attr: {
                name: 'div_address_format ms-2',
                class: 'text-muted',
                text: 'Change the way addresses are displayed in reports'
              }
            }
          },
          name_position: { class: 'oe_inline' }
        },
        _label_state_ids: { for: 'state_ids' },
        state_ids: {
          views: {
            tree: {
              arch: {
                sheet: {
                  name: {},
                  code: {}
                }
              }
            }
          }
        }
      }
    }
  },

  action_country: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Countries',
    type: 'ir.actions.act_window',
    res_model: 'res.country',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

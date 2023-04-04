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

    arch: {
      sheet: {
        // _div_button_box: {},
        // image_url: { widget: 'image_url' },

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
            groups: 'base.group_no_one'
          },

          // 这种没必要的 label. 这里不支持
          // 这里嵌套. 二级控制, 必须用 group
          // 其他 div 等 标签都是直接选渲染用的. 无法再做布局用
          // _label: { _attr: { for: 'address_view_id' } },
          _group_1: {
            address_view_id: {},
            _div: {
              _attr: {
                text: 'Choose a subview of partners that includes only address fields, to change the way users can input addresses.'
              }
            }
          },
          // _label_2: { _attr: { for: 'address_format' } },
          _group_2: {
            address_format: { placeholder: 'Address format...' },
            _div: {
              _attr: {
                text: 'Change the way addresses are displayed in reports'
              }
            }
          },
          name_position: {}
        },

        _label: { _attr: { for: 'state_ids' } },

        state_ids: {
          widget: 'x2many_tree',
          nolabel: 1,
          views: {
            tree: { fields: { name: {}, code: {} } },
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

    arch: {
      header: {
        buttons: {
          action_open_label_layout: {
            string: 'Print Labels',
            name: 'action_open_label_layout',
            type: 'object',
            invisible({ record }) {
              // 'invisible': [('detailed_type', '==', 'service')]
              const { detailed_type } = record
              return detailed_type === 'service'
            }
          }
        },

        fields: {}
      },
      sheet: {
        _div_title: {
          _label: { _attr: { for: 'name', string: 'Group Name' } },
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

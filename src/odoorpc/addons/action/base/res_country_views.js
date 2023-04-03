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
        _title: { display_name: {} },

        _group_image: {
          _span: 2,
          image_url: { widget: 'image_url' }
        },

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
        },
        _group_address_view_id: {
          _span: 2,
          address_view_id: {}
        },

        _group_address_view_id2: {
          _span: 2,
          _html: 1,
          _children: {
            a: 'Choose a subview of partners that includes only address fields, to change the way users can input addresses.'
          }
        },

        _group_address_format: {
          _span: 2,
          address_format: {}
        },
        _group_address_format2: {
          _span: 2,
          _html: 1,
          _children: {
            a: 'Change the way addresses are displayed in reports'
          }
        },

        _group_name_position: {
          name_position: {}
        },

        _group_state_ids: {
          _span: 2,
          state_ids: {
            span: 2,
            label: '省/州',
            string: '',
            widget: 'x2many_tree',
            views: {
              tree: { fields: { name: {}, code: {}, display_name: {} } },
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
        _title: { display_name: {} },

        _group_name: {
          _span: 2,
          name: {},
          country_ids: {
            widget: 'many2many_tags'
          }
        }
      }
    },

    fields: {
      // pricelist_ids: {
      //   widget: 'x2many_tree',
      //   views: {
      //     tree: { fields: { name: {} } },
      //     kanban: {
      //       fields: { name: {} },
      //       templates: {
      //         title({ record }) {
      //           return record.name
      //         }
      //       }
      //     },
      //     form: { fields: { name: {} } }
      //   }
      // }
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

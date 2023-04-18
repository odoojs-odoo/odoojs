export default {
  product_template_attribute_value_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template.attribute.value',
    type: 'tree',
    arch: {
      sheet: {
        attribute_id: {
          optional: 'hide'
        },
        name: {},
        display_type: {
          optional: 'hide'
        },
        html_color: {
          widget: 'color',
          invisible: [['display_type', '!=', 'color']]
        },
        ptav_active: {
          optional: 'hide'
        },
        price_extra: {
          widget: 'monetary',
          field_digits: true
        },
        currency_id: {
          invisible: '1'
        }
      }
    }
  },

  product_template_attribute_value_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template.attribute.value',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          ptav_active: {
            invisible: [['ptav_active', '=', true]],
            readonly: '1'
          },
          name: {},
          display_type: {
            invisible: '1'
          },
          html_color: {
            invisible: [['display_type', '!=', 'color']]
          },
          price_extra: {
            widget: 'monetary',
            field_digits: true
          },
          currency_id: {
            invisible: '1'
          },
          exclude_for: {
            widget: 'one2many',
            views: {
              tree: {
                arch: {
                  sheet: {
                    product_tmpl_id: {},
                    value_ids: {
                      widget: 'many2many_tags',
                      no_create: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  product_template_attribute_value_view_search: {
    _odoo_model: 'ir.ui.view',
    model: 'product.template.attribute.value',
    type: 'search',
    arch: {
      name: {},
      _filter_active: {
        _attr: {
          name: 'active',
          string: 'Active',
          domain: [['ptav_active', '=', true]]
        }
      },
      _filter_inactive: {
        _attr: {
          name: 'inactive',
          string: 'Inactive',
          domain: [['ptav_active', '=', false]]
        }
      }
    }
  }
}

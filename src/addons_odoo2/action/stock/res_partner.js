export default {
  view_partner_stock_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'mail.res_partner_view_form_inherit_mail',
    arch: {
      sheet: {
        _xpath: {
          _attr: {
            expr: "//page[@name='sales_purchases']/group",
            position: 'inside'
          },
          _group_container_row_stock: {
            _attr: {
              name: 'container_row_stock',
              groups: 'base.group_no_one'
            },
            _group_inventory: {
              _attr: {
                name: 'inventory',
                string: 'Inventory'
              },
              property_stock_customer: {},
              property_stock_supplier: {}
            }
          }
        }
      }
    }
  },

  view_partner_stock_warnings_form: {
    _odoo_model: 'ir.ui.view',
    model: 'res.partner',
    inherit_id: 'base.view_partner_form',
    arch: {
      sheet: {
        _page_internal_notes: {
          _attr: {
            name: 'internal_notes'
          },
          _group: {
            _attr: {
              groups: 'stock.group_warning_stock'
            },
            _group: {
              _separator: {
                _attr: {
                  string: 'Warning on the Picking'
                }
              },
              picking_warn: {
                required: '1'
              },
              picking_warn_msg: {
                required: [['picking_warn', '!=', false], ['picking_warn', '!=', 'no-message']],
                invisible: [['picking_warn', 'in', (false, 'no-message')]],
                placeholder: 'Type a message...'
              }
            }
          }
        }
      }
    }
  }
}

export default {
  form_stock_move: {
    _odoo_model: 'ir.ui.view',
    model: 'stock.move',
    type: 'form',

    arch: {
      buttons: [
        {
          name: 'ok',
          string: '确定',
          type: 'object',
          btn_type: 'primary'
        }
      ]
    },

    fields: {
      // "sequence",
      // "company_id",
      // "state",
      // "location_id",
      // "location_dest_id",
      // "picking_id",
      // "picking_type_id",
      // "is_locked",
      // "picking_type_entire_packs",
      // "display_assign_serial",
      // "from_immediate_transfer",
      // "product_uom_category_id",

      // "product_id",
      // "product_uom_qty",
      // "product_uom",
      // "quantity_done",
      // "reserved_availability",

      // "next_serial",
      // "next_serial_count",
      // "move_line_nosuggest_ids",
      // "display_name"

      picking_id: { invisible: 1 },
      location_id: { invisible: 1 },
      location_dest_id: { invisible: 1 },
      company_id: { invisible: 1 },
      product_id: { readonly2: 1 },
      product_uom: { readonly2: 1 },
      product_uom_qty: { readonly2: 1 },
      quantity_done: { readonly2: 1 },

      reserved_availability: { readonly2: 1 },

      move_line_nosuggest_ids: {
        // string: '',

        context: ({ record }) => {
          console.log('stock move... context.  ', record)
          const {
            id: res_id,
            picking_id,
            product_id,
            location_id,
            location_dest_id,
            company_id
          } = record
          return {
            default_picking_id: picking_id,
            default_move_id: res_id,
            default_product_id: product_id,
            default_location_id: location_id,
            default_location_dest_id: location_dest_id,
            default_company_id: company_id
          }
        },

        widget: 'x2many_tree',
        views: {
          tree: {
            fields: {
              // "company_id",
              // "picking_id",
              // "move_id",
              // "product_uom_category_id",
              // "product_id",
              // "package_level_id",
              // "location_id",
              // "location_dest_id",
              // "lot_id",
              // "lot_name",
              // "package_id",
              // "result_package_id",
              // "owner_id",
              // "product_uom_qty",
              // "state",
              // "is_locked",
              // "picking_code",
              // "qty_done",
              // "product_uom_id"

              lot_name: {},
              qty_done: {},
              product_uom_id: { readonly2: 1 }
            }
          },
          form: {
            fields: {
              lot_name: {},
              qty_done: {},
              product_uom_id: { readonly2: 1 },

              company_id: { invisible: 1 },
              picking_id: { invisible: 1 },
              move_id: { invisible: 1 },
              product_uom_category_id: { invisible: 1 },
              product_id: { invisible: 1 },
              package_level_id: { invisible: 1 },
              location_id: { invisible: 1 },
              location_dest_id: { invisible: 1 },
              lot_id: { invisible: 1 },

              package_id: { invisible: 1 },
              result_package_id: { invisible: 1 },
              owner_id: { invisible: 1 },
              product_uom_qty: { invisible: 1 },
              state: { invisible: 1 },
              is_locked: { invisible: 1 },
              picking_code: { invisible: 1 }
            }
          }
        }
      }
    }
  },

  action_stock_move: {
    _odoo_model: 'ir.actions',
    name: '详细作业',
    type: 'ir.actions.act_window',
    res_model: 'stock.move',
    domain: [],
    context: {
      // active_model: 'fp.ods.sale.order'
    },
    views: {
      form: 'form_stock_move'
    }
  }
}

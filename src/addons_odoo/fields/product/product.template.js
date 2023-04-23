const ModelFields = {
  active: {},
  activity_exception_decoration: {},
  attribute_line_ids: {
    context: { show_attribute: false }
  },

  barcode: {
    readonly({ record }) {
      // readonly: [['product_variant_count', '>', 1]]
      const { product_variant_count } = record
      return product_variant_count > 1
    }
  },
  categ_id: { string: 'Product Category' },
  company_id: { groups: 'base.group_multi_company' },
  cost_currency_id: {},
  currency_id: {},
  default_code: {},
  description: { placeholder: 'This note is only for internal purposes.' },
  description_sale: {
    placeholder: 'This note is added to sales orders and invoices.'
  },
  detailed_type: {},
  id: {},
  image_1920: {},
  is_product_variant: {},
  list_price: { string: 'Sales Price' },
  name: { string: 'Product Name', placeholder: 'e.g. Cheese Burger' },

  packaging_ids: {
    context({ record }) {
      const { company_id } = record
      return {
        // tree_view_ref: 'product.product_packaging_tree_view2',
        default_company_id: company_id
      }
    }
  },

  pricelist_item_count: {},
  priority: {},
  product_tag_ids: {},
  product_tooltip: {},
  product_variant_count: { string: 'Variants' },
  product_variant_id: {},
  purchase_ok: {},
  sale_ok: {},
  standard_price: { readonly: '1' },
  type: {},
  uom_id: {
    groups: 'uom.group_uom',
    readonly: '1'
  },

  uom_name: {},
  uom_po_id: { groups: 'uom.group_uom' },
  volume: { string: 'Volume' },
  volume_uom_name: {},
  weight: {},
  weight_uom_name: {}
}

const AddonsFields = {
  'product.template': ModelFields
}

export default AddonsFields

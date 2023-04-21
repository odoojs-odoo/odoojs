const ModelFields = {
  packaging_reserve_method: { groups: 'product.group_stock_packaging' },
  removal_strategy_id: {},
  route_ids: { groups: 'stock.group_adv_location' },
  total_route_ids: { groups: 'stock.group_adv_location' }
}

const AddonsFields = {
  'product.category': ModelFields
}

export default AddonsFields


const ModelFields = {
  company_id: { groups: 'base.group_multi_company' },
  display_name: {},
  location_id: {},
  name: { placeholder: 'e.g. PACK0000007' },
  owner_id: { groups: 'stock.group_tracking_owner' },
  pack_date: {},
  package_type_id: {},
  quant_ids: {}
}

const AddonsFields = {
  'stock.quant.package': ModelFields
}

export default AddonsFields


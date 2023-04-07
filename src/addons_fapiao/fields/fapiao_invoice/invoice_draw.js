const ModelFields = {
  partner_name: { readonly: 1 },
  partner_tin: { readonly: 1 },
  partner_address_phone: { readonly: 1 },
  partner_bank_account: { readonly: 1 },

  company_name: { nolabel: 1 },
  company_tin: { nolabel: 1 },
  company_address_phone: { nolabel: 1 },
  company_bank_account: { nolabel: 1 }
}

const AddonsFields = {
  'fp.bill.check': ModelFields
}

export default AddonsFields

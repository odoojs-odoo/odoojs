const ModelFields = {
  buyer_name: { readonly: 1 },
  buyer_tin: { readonly: 1 },
  buyer_address_phone: { readonly: 1 },
  buyer_bank_account: { readonly: 1 },

  company_name: { readonly: 1 },
  company_tin: { readonly: 1 },
  company_address_phone: { readonly: 1 },
  company_bank_account: { readonly: 1 },

  partner_name: { readonly: 1 },
  partner_tin: { readonly: 1 },
  partner_address_phone: { readonly: 1 },
  partner_bank_account: { readonly: 1 }
}

const AddonsFields = {
  'fp.bill.ocr': ModelFields
}

export default AddonsFields

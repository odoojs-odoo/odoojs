const ModelFields = {
  name: { string: { en_US: 'Name', zh_CN: '名称', zh_HK: '名稱' } },
  bic: { string: { en_US: 'Code', zh_CN: '编码', zh_HK: '編碼' } },

  street: {},
  street2: {},
  city: {},
  state: {
    string: '州省',
    // domain="[('country_id', '=?', country_id)]"
    domain: ({ record }) => {
      const { country_id } = record
      return [['country_id', '=?', country_id]]
    }
  },
  zip: {},
  country: {},

  phone: {},
  email: {},
  active: {}
}

const PartnerBankFields = {
  display_name: {},
  sequence: {},
  acc_type: {},
  acc_number: {},
  partner_id: { en_US: 'Partner', zh_CN: '參與人', zh_HK: '參與人' },
  company_id: { en_US: 'Company', zh_CN: '公司', zh_HK: '公司' },
  bank_id: {},
  acc_holder_name: {},
  active: {}
}
const AddonsFields = {
  'res.bank': ModelFields,
  'res.partner.bank': PartnerBankFields
}

export default AddonsFields

const ResPartner = {
  metadata: {
    description: '参与人'
  }
}

const ResPartnerCompany = {
  // metadata: {}
}

const ResPartnerPerson = {
  metadata: {
    fieldsForBrowse: {
      // name: null
      email: null
    }
    // columnsForForm: {
    //   name: { label: '名称:', placeholder: '名称' },
    //   email: { label: '邮箱:', placeholder: '邮箱' }
    // }
  }
}

const Models = {
  'res.partner': ResPartner,
  'res.partner.company': ResPartnerCompany,
  'res.partner.person': ResPartnerPerson
}

export default Models

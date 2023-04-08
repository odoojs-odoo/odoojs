const ModelFields = {
  state: {
    selection: [
      ['draft', '草稿'],
      ['posted', '过账'],
      ['cancel', '取消']
    ]
  }
}

const AddonsFields = {
  'account.move': ModelFields
}

export default AddonsFields

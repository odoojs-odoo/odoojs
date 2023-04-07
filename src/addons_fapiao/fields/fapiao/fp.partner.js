const ModelFields = {
  draw_company_id: {
    required({ record }) {
      const { be_company } = record
      return be_company
    }
  }
}

const AddonsFields = {
  'fp.partner': ModelFields
}

export default AddonsFields

const ModelFields = {
  ratio: {
    string: 'Ratio',
    readonly({ record }) {
      // 'readonly': [('uom_type', '=', 'reference')]}"
      const { uom_type } = record
      return uom_type === 'reference'
    }
  },
  factor: {
    readonly: ({ record }) => {
      // 'readonly':[('uom_type','=','bigger')]
      const { uom_type } = record
      return uom_type === 'bigger'
    }
  },
  factor_inv: {
    // 'readonly':[('uom_type','!=','bigger')]
    readonly: ({ record }) => {
      const { uom_type } = record
      return uom_type !== 'bigger'
    }
  }
}

const AddonsFields = {
  'uom.uom': ModelFields
}

export default AddonsFields

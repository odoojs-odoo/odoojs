const ModelFields = {
  tax_dest_id: {
    domain: ({ record }) => {
      // domain for form: [['type_tax_use', '!=', 'none']]
      // domain="[
      // ('type_tax_use', '!=', 'none'),
      // ('country_id', '=',
      //    parent.country_id if parent.foreign_vat
      //    else parent.company_country_id),
      // '|',
      // ('company_id', '=', False),
      // ('company_id', '=', parent.company_id)]"

      const { parent: parent2 } = record
      return [
        ['type_tax_use', '!=', 'none'],
        [
          'country_id',
          '=',
          parent2.foreign_vat ? parent2.country_id : parent2.company_country_id
        ],
        '|',
        ['company_id', '=', false],
        ['company_id', '=', parent2.company_id]
      ]
    },
    context: { append_type_to_tax_name: true }
  },

  tax_src_id: {
    domain: ({ record }) => {
      // domain for form: [['type_tax_use', '!=', 'none']]
      // domain="[
      //  ('type_tax_use', '!=', 'none'),
      //  ('country_id', '=', parent.company_country_id),
      //  '|',
      //  ('company_id', '=', False),
      //  ('company_id', '=', parent.company_id)
      // ]"
      const { parent: parent2 } = record
      return [
        ['type_tax_use', '!=', 'none'],
        ['country_id', '=', parent2.company_country_id],
        '|',
        ['company_id', '=', false],
        ['company_id', '=', parent2.company_id]
      ]
    },

    context: { append_type_to_tax_name: true }
  }
}

const AddonsFields = {
  'account.fiscal.position.tax': ModelFields
}

export default AddonsFields

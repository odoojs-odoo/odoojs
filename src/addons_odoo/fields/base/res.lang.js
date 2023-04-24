const ModelFields = {
  active: {},
  code: { groups: 'base.group_no_one' },
  date_format: {},
  decimal_point: {},
  direction: { groups: 'base.group_no_one' },
  flag_image: {},
  grouping: {},
  iso_code: { groups: 'base.group_no_one' },
  name: { placeholder: 'e.g. French' },
  thousands_sep: {},
  time_format: {},
  url_code: {
    required: 0,
    groups: 'base.group_no_one'
  },

  week_start: {}
}

const AddonsFields = {
  'res.lang': ModelFields
}

export default AddonsFields

const ModelFields = {
  column1: {
    groups: 'base.group_no_one',
    readonly: ['|', ['ttype', '!=', 'many2many'], ['state', '!=', 'manual']]
  },

  column2: {
    groups: 'base.group_no_one',
    readonly: ['|', ['ttype', '!=', 'many2many'], ['state', '!=', 'manual']]
  },

  compute: {},
  copied: {
    groups: 'base.group_no_one'
  },

  depends: {
    required: [['compute', 'not in', [false, '']]]
  },

  domain: {
    groups: 'base.group_no_one',
    readonly: [['ttype', 'not in', ['many2one', 'one2many', 'many2many']]]
  },

  field_description: {},
  groups: {},
  help: {},
  index: {
    groups: 'base.group_no_one'
  },

  modules: {},
  name: {},
  on_delete: {
    groups: 'base.group_no_one',
    readonly: [['ttype', '!=', 'many2one']]
  },

  readonly: {},
  related: {},
  relation: {
    required: [['ttype', 'in', ['many2one', 'one2many', 'many2many']]],
    readonly: [['ttype', 'not in', ['many2one', 'one2many', 'many2many']]]
  },

  relation_field: {
    required: [['ttype', '=', 'one2many']],
    readonly: [['ttype', '!=', 'one2many']]
  },

  relation_table: {
    groups: 'base.group_no_one',
    readonly: ['|', ['ttype', '!=', 'many2many'], ['state', '!=', 'manual']]
  },

  required: {},
  selection_ids: {},
  size: {
    groups: 'base.group_no_one',
    readonly: [['ttype', 'not in', ['char', 'reference']]]
  },

  state: {
    groups: 'base.group_no_one'
  },

  store: {
    groups: 'base.group_no_one'
  },

  translate: {
    readonly: [['ttype', 'not in', ['char', 'text', 'html']]]
  },

  ttype: {}
}

const AddonsFields = {
  'ir.model.field_id': ModelFields
}

export default AddonsFields


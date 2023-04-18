const ModelFields = {
  active: {},
  attach: {},
  configuration: {},
  date: {},
  is_ssl: {},
  name: {},
  object_id: {},
  original: {},
  password: {
    required: [['server_type', 'in', ('imap', 'pop')]]
  },

  port: {
    required: '1'
  },

  priority: {},
  script: {},
  server: {
    required: [['server_type', '!=', 'local']]
  },

  server_type: {
    readonly: [['state', '=', 'done']]
  },

  server_type_info: {},
  state: {},
  user: {
    required: [['server_type', '!=', 'local']]
  }
}

const AddonsFields = {
  'fetchmail.server': ModelFields
}

export default AddonsFields


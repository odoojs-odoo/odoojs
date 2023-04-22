export default {
  view_attachment_form: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.attachment',
    type: 'form',
    arch: {
      sheet: {
        _label_name: { for: 'name' },
        _h1: {
          name: {}
        },
        _group: {
          _group: {
            type: {},
            datas: { invisible: [['type', '=', 'url']] },
            url: {
              widget: 'url',
              invisible: [['type', '=', 'binary']]
            },
            mimetype: { groups: 'base.group_no_one' }
          },
          _group_384: {
            _attr: {
              string: 'Attached To',
              groups: 'base.group_no_one'
            },
            res_model: {},
            res_field: {},
            res_id: {},
            res_name: {},
            company_id: {
              groups: 'base.group_multi_company',
              no_create: true
            },
            public: {}
          },
          _group_693: {
            _attr: {
              string: 'History',
              groups: 'base.group_no_one',
              invisible: [['create_date', '=', false]]
            },
            _label_create_uid: {
              for: 'create_uid',
              string: 'Creation'
            },
            _div_creation_div: {
              _attr: {
                name: 'creation_div',
                text: 'on'
              },
              create_uid: {
                class: 'oe_inline',
                readonly: '1'
              },
              create_date: {
                class: 'oe_inline',
                readonly: '1'
              }
            }
          },
          _group_description_group: {
            _attr: {
              name: 'description_group',
              string: 'Description',
              groups: 'base.group_no_one'
            },
            description: {}
          },
          _group_463: {
            _attr: {
              string: 'Indexed Content',
              groups: 'base.group_no_one'
            },
            index_content: {}
          }
        }
      }
    }
  },

  view_attachment_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.attachment',
    type: 'tree',
    arch: {
      sheet: {
        name: {},
        res_model: {},
        res_field: {},
        res_id: {},
        type: {},
        file_size: {},
        company_id: { groups: 'base.group_multi_company' },
        create_uid: {},
        create_date: {}
      }
    }
  },

  view_attachment_search: {
    _odoo_model: 'ir.ui.view',
    model: 'ir.attachment',
    type: 'search',
    arch: {
      name: {
        string: 'Attachment',
        filter_domain: { todo_ctx: "[('name','ilike',self)]" }
      },
      create_date: {},
      _filter_my_documents_filter: {
        _attr: {
          name: 'my_documents_filter',
          string: 'My Document(s)',
          help: 'Filter on my documents',
          domain: { todo_ctx: "[('create_uid','=',uid)]" }
        }
      },
      _filter_url_filter: {
        _attr: {
          name: 'url_filter',
          string: 'URL',
          domain: [['type', '=', 'url']]
        }
      },
      _filter_binary_filter: {
        _attr: {
          name: 'binary_filter',
          string: 'Stored',
          domain: [['type', '=', 'binary']]
        }
      },
      _separator: {},
      create_uid: { string: 'Created by' },
      type: {},
      _group: {
        _attr: { string: 'Group By' },
        _filter_owner: {
          _attr: {
            name: 'owner',
            string: 'Owner',
            domain: [],
            context: { group_by: 'create_uid' }
          }
        },
        _filter_type: {
          _attr: {
            name: 'type',
            string: 'Type',
            groups: 'base.group_no_one',
            domain: [],
            context: { group_by: 'type' }
          }
        },
        _filter_company: {
          _attr: {
            name: 'company',
            string: 'Company',
            groups: 'base.group_multi_company',
            domain: [],
            context: { group_by: 'company_id' }
          }
        },
        _filter_creation_month: {
          _attr: {
            name: 'creation_month',
            string: 'Creation Date',
            domain: [],
            context: { group_by: 'create_date' }
          }
        }
      }
    }
  },

  action_attachment: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Attachments',
    type: 'ir.actions.act_window',
    res_model: 'ir.attachment',
    search_view_id: 'view_attachment_search',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

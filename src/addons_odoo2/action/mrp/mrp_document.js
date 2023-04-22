export default {
  view_document_file_kanban_mrp: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.document',
    type: 'otherview',
    arch: {}
  },

  view_mrp_document_form: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.document',
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
            }
          },
          _group_947: {
            _attr: {
              string: 'Attached To',
              groups: 'base.group_no_one'
            },
            res_name: {},
            company_id: {
              groups: 'base.group_multi_company',
              no_create: true
            }
          },
          _group_544: {
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
          }
        }
      }
    }
  }
}

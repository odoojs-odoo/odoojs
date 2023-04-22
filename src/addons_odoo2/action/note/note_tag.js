export default {
  note_tag_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'note.tag',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: {}
        }
      }
    }
  },

  note_tag_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'note.tag',
    type: 'tree',
    arch: {
      sheet: {
        name: {}
      }
    }
  },

  note_tag_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Tags',
    res_model: 'note.tag',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

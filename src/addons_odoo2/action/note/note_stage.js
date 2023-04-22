export default {
  view_note_stage_form: {
    _odoo_model: 'ir.ui.view',
    model: 'note.stage',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: {},
          fold: {}
        }
      }
    }
  },

  view_note_stage_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'note.stage',
    type: 'tree',
    arch: {
      sheet: {
        sequence: { widget: 'handle' },
        name: {},
        fold: {}
      }
    }
  },

  action_note_stage: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Stages',
    res_model: 'note.stage',
    search_view_id: 'tooooooodoooooo',
    domain: "[['user_id','=',uid]]",
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

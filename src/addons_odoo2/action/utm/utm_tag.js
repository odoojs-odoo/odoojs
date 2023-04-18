export default {
  utm_tag_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'utm.tag',
    type: 'tree',
    arch: {
      sheet: {
        name: {}
      }
    }
  },

  action_view_utm_tag: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Campaign Tags',
    res_model: 'utm.tag',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

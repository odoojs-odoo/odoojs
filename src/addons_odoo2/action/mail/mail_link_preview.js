export default {
  mail_link_preview_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'mail.link.preview',
    type: 'tree',
    arch: {
      sheet: {
        id: {},
        source_url: {},
        og_title: {},
        og_type: {},
        image_mimetype: {}
      }
    }
  },

  mail_link_preview_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Link Previews',
    res_model: 'mail.link.preview',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

export default {
  paperformat_view_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'report.paperformat',
    type: 'tree',
    arch: {
      sheet: {
        name: {}
      }
    }
  },

  paperformat_view_form: {
    _odoo_model: 'ir.ui.view',
    model: 'report.paperformat',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: {},
          format: {},
          page_height: {
            invisible: [['format', '!=', 'custom']]
          },
          page_width: {
            invisible: [['format', '!=', 'custom']]
          },
          orientation: {},
          margin_top: {},
          margin_bottom: {},
          margin_left: {},
          margin_right: {},
          header_line: {},
          header_spacing: {},
          disable_shrinking: {},
          dpi: {},
          report_ids: {
            widget: 'many2many_tags',
            not_delete: true
          }
        }
      }
    }
  },

  paper_format_action: {
    _odoo_model: 'ir.actions.act_window',
    name: 'Paper Format General Configuration',
    res_model: 'report.paperformat',
    search_view_id: 'tooooooodoooooo',
    views: {
      tree: '=======todo==========',
      form: '=======todo=========='
    }
  }
}

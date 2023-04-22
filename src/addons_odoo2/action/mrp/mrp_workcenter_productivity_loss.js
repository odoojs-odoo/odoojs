export default {
  oee_loss_form_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workcenter.productivity.loss',
    type: 'form',
    arch: {
      sheet: {
        _group: {
          name: {},
          loss_id: {
            no_open: true,
            no_create: true
          }
        }
      }
    }
  },

  oee_loss_tree_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workcenter.productivity.loss',
    type: 'tree',
    arch: {
      sheet: {
        sequence: { widget: 'handle' },
        name: {},
        loss_type: { string: 'Category' }
      }
    }
  },

  view_mrp_workcenter_productivity_loss_kanban: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workcenter.productivity.loss',
    type: 'otherview',
    arch: {}
  },

  oee_loss_search_view: {
    _odoo_model: 'ir.ui.view',
    model: 'mrp.workcenter.productivity.loss',
    type: 'search',
    arch: {
      name: {}
    }
  }
}

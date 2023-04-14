const ModelFields = {
  // company_id: { invisible: '1' },
  priority: {},
  name: {},
  picking_type_id: {
    readonly({ record }) {
      // 'readonly': [('state', '!=', 'draft')]
      const { state } = record
      return state !== 'draft'
    }
  },
  picking_type_code: {},
  company_id: {
    groups: 'base.group_multi_company',
    force_save: '1'
  },
  state: {
    widget: 'badge'
    // decoration-danger="state=='cancel'"
    // decoration-info="state== 'assigned'"
    // decoration-muted="state == 'draft'"
    // decoration-success="state == 'done'"
    // decoration-warning="state not in ('draft','cancel','done','assigned')"/>
  },

  note: {
    string: 'Note',
    placeholder:
      'Add an internal note that will be printed on the Picking Operations sheet'
  },

  scheduled_date: {},

  date_deadline: {},
  date_done: { string: 'Effective Date' },
  origin: {},
  backorder_id: {},

  partner_id: {},
  user_id: {
    //  domain="[('share', '=', False)]
  },

  group_id: {
    // groups="base.group_no_one"
  },

  location_id: { groups: 'stock.group_stock_multi_locations' },
  location_dest_id: { groups: 'stock.group_stock_multi_locations' },
  is_signed: {
    string: 'Signed',
    groups: 'stock.group_stock_sign_delivery'
  },

  products_availability_state: {},
  products_availability: {
    // decoration-success="state == 'assigned' or products_availability_state == 'available'"
    // decoration-warning="state != 'assigned' and products_availability_state in ('expected', 'available')"
    // decoration-danger="state != 'assigned' and products_availability_state == 'late'"/>
  },

  activity_exception_decoration: {},
  json_popover: {},

  move_line_nosuggest_ids: {
    readonly({ record }) {
      // 'readonly': ['|', '|',
      // ('show_operations', '=', False),
      // ('state', '=', 'cancel'),
      // '&amp;', ('state', '=', 'done'),
      // ('is_locked', '=', True)],
      const { show_operations, state, is_locked } = record
      return (
        !show_operations ||
        state === 'cancel' ||
        (state === 'done' && is_locked)
      )
    },
    context({ record }) {
      // context="{'tree_view_ref': 'stock.view_stock_move_line_detailed_operation_tree',
      // 'default_picking_id': id,
      // 'default_location_id': location_id,
      // 'default_location_dest_id': location_dest_id,
      // 'default_company_id': company_id}
      const { id: res_id, location_id, location_dest_id, company_id } = record
      return {
        tree_view_ref: 'stock.view_stock_move_line_detailed_operation_tree',
        default_picking_id: res_id,
        default_location_id: location_id,
        default_location_dest_id: location_dest_id,
        default_company_id: company_id
      }
    }
  },
  move_line_ids_without_package: {
    readonly({ record }) {
      //  'readonly': ['|', '|', ('show_operations', '=', False),
      // ('state', '=', 'cancel'), '&amp;',
      // ('state', '=', 'done'), ('is_locked', '=', True)]
      const { show_operations, state, is_locked } = record
      return (
        !show_operations ||
        state === 'cancel' ||
        (state === 'done' && is_locked)
      )
    },

    context({ record }) {
      // context="{'tree_view_ref': 'stock.view_stock_move_line_detailed_operation_tree',
      // 'default_picking_id': id,
      // 'default_location_id': location_id,
      // 'default_location_dest_id': location_dest_id,
      // 'default_company_id': company_id}

      const { id: res_id, location_id, location_dest_id, company_id } = record
      return {
        tree_view_ref: 'stock.view_stock_move_line_detailed_operation_tree',
        default_picking_id: res_id,
        default_location_id: location_id,
        default_location_dest_id: location_dest_id,
        default_company_id: company_id
      }
    }
  },

  move_ids_without_package: {
    readonly({ record }) {
      //'readonly': ['&amp;', ('state', '=', 'done'),
      // ('is_locked', '=', True)]
      const { state, is_locked } = record
      return state === 'done' && is_locked
    },
    context({ record }) {
      // context="{'tree_view_ref': 'stock.view_stock_move_line_detailed_operation_tree',
      // 'default_picking_id': id,
      // 'default_location_id': location_id,
      // 'default_location_dest_id': location_dest_id,
      // 'default_company_id': company_id}

      //   context="{
      // 'default_company_id': company_id,
      // 'default_date': scheduled_date,
      // 'default_date_deadline': date_deadline,
      // 'picking_type_code': picking_type_code,
      // 'default_picking_id': id,
      // 'form_view_ref':'stock.view_move_form',
      // 'address_in_id': partner_id,
      // 'default_picking_type_id': picking_type_id,
      // 'default_location_id': location_id,
      // 'default_location_dest_id': location_dest_id,
      // 'default_partner_id': partner_id
      // }

      const {
        company_id,
        scheduled_date,
        date_deadline,
        picking_type_code,
        id: res_id,
        partner_id,
        picking_type_id,
        location_id,
        location_dest_id
      } = record
      return {
        default_company_id: company_id,
        default_date: scheduled_date,
        default_date_deadline: date_deadline,
        picking_type_code: picking_type_code,
        default_picking_id: res_id,
        form_view_ref: 'stock.view_move_form',
        address_in_id: partner_id,
        default_picking_type_id: picking_type_id,
        default_location_id: location_id,
        default_location_dest_id: location_dest_id,
        default_partner_id: partner_id
      }
    }
  },

  package_level_ids_details: {
    readonly({ record }) {
      // 'readonly': [('state', '=', 'done')],
      const { state } = record
      return state === 'done'
    },

    context({ record }) {
      // context="{'default_location_id': location_id,
      // 'default_location_dest_id': location_dest_id,
      // 'default_company_id': company_id}"

      const { location_id, location_dest_id, company_id } = record
      return {
        default_location_id: location_id,
        default_location_dest_id: location_dest_id,
        default_company_id: company_id
      }
    }
  },

  package_level_ids: {
    readonly({ record }) {
      // 'readonly': [('state', '=', 'done')],
      const { state } = record
      return state === 'done'
    },
    context({ record }) {
      // context="{
      // 'default_location_id': location_id,
      // 'default_location_dest_id': location_dest_id,
      // 'default_company_id': company_id}"

      const { location_id, location_dest_id, company_id } = record
      return {
        default_location_id: location_id,
        default_location_dest_id: location_dest_id,
        default_company_id: company_id
      }
    }
  }
}

const AddonsFields = {
  'stock.picking': ModelFields
}

export default AddonsFields

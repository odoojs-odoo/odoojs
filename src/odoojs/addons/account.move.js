const action_move_journal_line_kanban = `
<templates name="kanban" model="account.move" string="会计凭证">
  <div name="title">
    <field name="journal_id" />
  </div>
  <div name="label">
    <div> <field name="date" /></div> 
  </div>
  <div name="content">
    <div> <field name="amount_total" /></div> 
    <div> <field name="state" /></div> 
  </div>
</templates >
`

const action_move_out_invoice_type_kanban = `
<templates name="kanban" model="account.move" string="销售发票">
  <div name="title">
    <field name="journal_id" />
  </div>
  <div name="label">
    <div> <field name="date" /></div> 
  </div>
  <div name="content">
    <div> <field name="amount_total" /></div> 
    <div> <field name="state" /></div> 
  </div>
</templates >
`

const action_move_in_invoice_type_kanban = `
<templates name="kanban" model="account.move" string="采购账单">
  <div name="title">
    <field name="journal_id" />
  </div>
  <div name="label">
    <div> <field name="date" /></div> 
  </div>
  <div name="content">
    <div> <field name="amount_total" /></div> 
    <div> <field name="state" /></div> 
  </div>
</templates >
`

const action_move_journal_line_from_invoice_line_ids_kanban = `
<templates name="kanban">
  <div name="title">
    <field name="product_id" />
    <field name="name" />
  </div>
  <div name="label">
    <div> <field name="name" /></div> 
  </div>
  <div name="content">
    <field name="quantity" /><span> x </span>
    <span>¥</span><field name="price_unit" /> <span> = </span>
    <span>¥</span><field name="price_subtotal" />
  </div>
</templates >
`

const action_move_journal_line_from_line_ids_tree = `
<templates name="kanban">
  <div name="title">
    <field name="account_id" />
  </div>
  <div name="label">
    <div> <field name="name" /></div> 
  </div>
  <div name="content">
  <span>借:</span><field name="debit" /> <span> 贷:</span> <field name="credit" />
  </div>
</templates >
`

const AccountMove = {
  'account.action_move_journal_line': {
    fields_views: {
      kanban: {
        templates: action_move_journal_line_kanban
      },
      form: {
        invoice_line_ids: {
          kanban: {
            templates: action_move_journal_line_from_invoice_line_ids_kanban
          }
        },
        line_ids: {
          tree: {
            templates: action_move_journal_line_from_line_ids_tree
          }
        }
      }
    }
  },

  'account.action_move_out_invoice_type': {
    fields_views: {
      kanban: {
        templates: action_move_out_invoice_type_kanban
      },
      form: {
        invoice_line_ids: {
          kanban: {
            templates: action_move_journal_line_from_invoice_line_ids_kanban
          }
        },
        line_ids: {
          tree: {
            templates: action_move_journal_line_from_line_ids_tree
          }
        }
      }
    }
  },

  'account.action_move_in_invoice_type': {
    fields_views: {
      kanban: {
        templates: action_move_in_invoice_type_kanban
      }
    }
  }
}

const action_account_moves_all_kanban = `
<templates name="kanban" model="account.move.line" string="会计分录">
  <div name="title">
    <field name="move_id" />
  </div>
  <div name="label">
    <div> <field name="name" /></div> 
  </div>
  <div name="content">
    <div> <field name="date_maturity" /></div> 
    <div> <field name="partner_id" /></div> 
  </div>
</templates >
`

const AccountMoveLine = {
  'account.action_account_moves_all': {
    fields_views: {
      kanban: {
        templates: action_account_moves_all_kanban
      }
    }
  }
}

const AddonsActions = {
  ...AccountMove,
  ...AccountMoveLine
}

export default AddonsActions

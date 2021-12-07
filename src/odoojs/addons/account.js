const kanban = `
<templates name="kanban" model="res.partner" string="会计科目">
  <div name="title">
    <field name="name" />
  </div>
  <div name="label">
    <div> <field name="code" /></div> 
  </div>
  <div name="content">
    <div> <field name="user_type_id" /></div> 
  </div>
</templates >
`

const AccountAccount = {
  'account.action_account_form': {
    fields_views: {
      kanban: {
        templates: kanban
      }
    }
  }
}

const journal_kanban = `
<templates name="kanban" model="account.journal" string="账簿">
  <div name="title">
    <field name="name" />
  </div>
  <div name="content">
    <div> <field name="name" /></div> 
  </div>  
</templates >
`

const AccountJournal = {
  'account.open_account_journal_dashboard_kanban': {
    fields_views: {
      kanban: {
        templates: journal_kanban
      }
    }
  }
}

//

const AddonsActions = {
  ...AccountAccount,
  ...AccountJournal
}

export default AddonsActions

const kanban = `
<templates name="kanban">
  <div name="title">
    <field name="name" />
  </div>
  <div name="label">
    <div> <field name="login" /></div> 
  </div>
  <div name="content">
    <div> <field name="login_date" /></div> 
    <div> <field name="lang" /></div> 
  </div>
</templates >
`

const ResUsers = {
  'base.action_res_users': {
    fields_views: {
      kanban: {
        templates: kanban
      }
    }
  }
}

const AddonsActions = {
  ...ResUsers
}

export default AddonsActions

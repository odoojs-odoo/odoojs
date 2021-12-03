const action_res_company_form_kanban = `
<templates name="kanban">
  <div name="title">
    <field name="name" />
  </div>
  <div name="label">
  
  </div>
  <div name="content">
    <div> <field name="email" /></div> 
    <div> <field name="phone" /></div> 
  </div>
</templates >
`

const ResCompany = {
  'base.action_res_company_form': {
    fields_views: {
      kanban: {
        templates: action_res_company_form_kanban
      }
    }
  }
}

const action_country_list = `
<templates name="kanban">
  <div name="title">
    <field name="name" />
  </div>
  <div name="label">
  
  </div>
  <div name="content">
    <div> <field name="code" /></div> 
  </div>
</templates >
`

const ResCountry = {
  'base.action_country': {
    fields_views: {
      list: {
        templates: action_country_list
      }
    }
  }
}

const AddonsActions = {
  ...ResCompany,
  ...ResCountry
}

export default AddonsActions

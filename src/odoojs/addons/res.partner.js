const child_ids_kanban = `
<templates name="form_view_child_ids" model="res.partner">
  <div name="title">
    <h3><field name="name" /></h3>
  </div>
  <div  name="content">
    <div> <field name="email" /></div> 
    <img src="" alt="" ><field name="image_128" /></img>
  </div>
</templates >
`

const kanban = `
<templates name="kanban" model="res.partner">
  <div name="title">
    <field name="display_name" />
    <div> <field name="email" /></div>     
  </div>
  <div name="label">
    <div> <field name="email" /></div> 
  </div>
  <div name="content">
    <div> <field name="email" /></div> 
    <img src="" alt="" ><field name="image_128" /></img>
  </div>
</templates >
`

const ResPartner = {
  'contacts.action_contacts': {
    fields_views: {
      form: {
        child_ids: {
          kanban: {
            templates: child_ids_kanban
          }
        }
      },

      kanban: {
        templates: kanban
      }
    }
  }
}

const AddonsActions = {
  ...ResPartner
}

export default AddonsActions

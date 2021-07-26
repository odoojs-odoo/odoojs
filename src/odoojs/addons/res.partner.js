const child_ids_kanban = `
<templates name="form_view_child_ids" model="res.partner">
  <div name="title">
    <field name="name" />
  </div>
  <div  name="content">
    <img src="" alt="" ><field name="image_128" /></img>
  </div>
</templates >
`

const ResPartner = {
  'contacts.action_contacts': {
    form: {
      child_ids: {
        kanban: {
          templates: child_ids_kanban
        }
      }
    }
  }
}

const AddonsActions = {
  ...ResPartner
}

export default AddonsActions

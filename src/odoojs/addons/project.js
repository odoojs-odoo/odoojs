const project_kanban = `
<templates name="kanban" model="project.project" string="项目">
  <div name="title">
    <field name="name" />
  </div>
  <div name="content">
    <div> <field name="name" /></div> 
  </div>  
</templates >
`

const ProjectProject = {
  'project.open_view_project_all': {
    fields_views: {
      kanban: {
        templates: project_kanban
      }
    }
  }
}

//

const AddonsActions = {
  ...ProjectProject
}

export default AddonsActions

const open_module_tree_kanban = `
<templates name="kanban" model="ir.module.module">
  <div name="title">
    <field name="shortdesc" />
  </div>
  <div name="label">
    <div> <field name="name" /></div> 
  </div>
  <div name="content">
    <div> <field name="state" /></div> 
    <div> <field name="application" true_label="应用" false_label="额外的" /></div> 
  </div>
</templates >
`

const IrModuleModule = {
  'base.open_module_tree': {
    fields_views: {
      kanban: {
        templates: open_module_tree_kanban
      }
    }
  }
}

const AddonsActions = {
  ...IrModuleModule
}

export default AddonsActions

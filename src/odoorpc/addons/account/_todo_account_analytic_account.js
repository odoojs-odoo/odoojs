export default {}

// <record id="account_analytic_account_view_form_inherit" model="ir.ui.view">
// <field name="name">account.analytic.account.form.inherit</field>
// <field name="model">account.analytic.account</field>
// <field name="inherit_id" ref="analytic.view_account_analytic_account_form"/>
// <field eval="9" name="priority"/>
// <field name="arch" type="xml">
//     <div name="button_box" position="inside">
//         <button class="oe_stat_button" type="object" name="action_view_invoice"
//             icon="fa-pencil-square-o" attrs="{'invisible': [('invoice_count', '=', 0)]}">
//             <field string="Customer Invoices" name="invoice_count" widget="statinfo"/>
//         </button>
//         <button class="oe_stat_button" type="object" name="action_view_vendor_bill"
//             icon="fa-file-text-o" attrs="{'invisible': [('vendor_bill_count', '=', 0)]}">
//             <field string="Vendor Bills" name="vendor_bill_count" widget="statinfo"/>
//         </button>
//     </div>
// </field>
// </record>

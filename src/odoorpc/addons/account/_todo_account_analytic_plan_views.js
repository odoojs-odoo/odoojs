// <record id="account_analytic_plan_form_view_inherit_account" model="ir.ui.view">
// <field name="name">account.analytic.plan.inherit.form</field>
// <field name="model">account.analytic.plan</field>
// <field name="inherit_id" ref="analytic.account_analytic_plan_form_view"/>
// <field name="arch" type="xml">
//     <data>
//         <xpath expr="//field[@name='applicability_ids']//field[@name='business_domain']" position="after">
//             <field name="account_prefix"/>
//             <field name="product_categ_id"/>
//         </xpath>
//     </data>
// </field>
// </record>

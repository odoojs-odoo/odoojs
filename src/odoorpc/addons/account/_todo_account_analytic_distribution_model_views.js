// <record id="account_analytic_distribution_model_tree_inherit" model="ir.ui.view">
// <field name="name">account.analytic.distribution.model.inherit.tree</field>
// <field name="model">account.analytic.distribution.model</field>
// <field name="inherit_id" ref="analytic.account_analytic_distribution_model_tree_view"/>
// <field name="arch" type="xml">
//     <data>
//         <xpath expr="//field[@name='partner_id']" position="before">
//                 <field name="account_prefix" optional="show"/>
//         </xpath>
//         <xpath expr="//field[@name='company_id']" position="before">
//                 <field name="product_id" optional="show"/>
//                 <field name="product_categ_id" optional="hide"/>
//         </xpath>
//     </data>
// </field>
// </record>

// <record id="account_analytic_distribution_model_form_inherit" model="ir.ui.view">
// <field name="name">account.analytic.distribution.model.inherit.form</field>
// <field name="model">account.analytic.distribution.model</field>
// <field name="inherit_id" ref="analytic.account_analytic_distribution_model_form_view"/>
// <field name="arch" type="xml">
//     <data>
//         <xpath expr="//field[@name='partner_category_id']" position="after">
//                 <field name="account_prefix"/>
//         </xpath>
//         <xpath expr="//field[@name='company_id']" position="before">
//                 <field name="product_id"/>
//                 <field name="product_categ_id"/>
//         </xpath>
//     </data>
// </field>
// </record>

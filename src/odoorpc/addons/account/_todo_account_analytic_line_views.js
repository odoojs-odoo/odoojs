// <record id="view_account_analytic_line_form_inherit_account" model="ir.ui.view">
// <field name="name">account.analytic.line.form.inherit.account</field>
// <field name="model">account.analytic.line</field>
// <field name="inherit_id" ref="analytic.view_account_analytic_line_form"/>
// <field name="arch" type="xml">
//     <data>
//         <xpath expr="//field[@name='amount']" position="after">
//             <field name="ref"/>
//             <field name="partner_id"/>
//         </xpath>
//         <xpath expr="//field[@name='product_uom_id']" position="before">
//             <field name="product_id"/>
//         </xpath>
//         <group name="amount" position="after">
//             <group/> <!-- put Accounting group under Amount group -->
//             <group name="accounting" string="Accounting">
//                 <field name="move_line_id" options="{'no_create': True}" widget="line_open_move_widget"/>
//                 <field name="general_account_id" attrs="{'readonly': [('move_line_id', '!=', False)]}"/>
//             </group>
//         </group>
//     </data>
// </field>
// </record>
// <record id="view_account_analytic_line_tree_inherit_account" model="ir.ui.view">
// <field name="name">account.analytic.line.tree.inherit.account</field>
// <field name="model">account.analytic.line</field>
// <field name="inherit_id" ref="analytic.view_account_analytic_line_tree"/>
// <field name="arch" type="xml">
//     <data>
//         <xpath expr="//field[@name='account_id']" position="after">
//             <field name="ref" invisible="context.get('to_invoice', False)" optional="hide"/>
//             <field name="general_account_id" optional="hide"/>
//             <field name="move_line_id" widget="line_open_move_widget" optional="hide"/>
//             <field name="product_id" optional="hide"/>
//         </xpath>
//     </data>
// </field>
// </record>
// <record id="view_account_analytic_line_filter_inherit_account" model="ir.ui.view">
// <field name="name">account.analytic.line.select.inherit.account</field>
// <field name="model">account.analytic.line</field>
// <field name="inherit_id" ref="analytic.view_account_analytic_line_filter"/>
// <field name="arch" type="xml">
//     <data>
//         <xpath expr="//field[@name='date']" position="after">
//             <field name="product_id"/>
//             <field name="partner_id" filter_domain="[('partner_id','child_of',self)]"/>
//         </xpath>
//         <xpath expr="//group[@name='groupby']" position="after">
//             <filter string="Financial Account" name="financialaccount" context="{'group_by':'general_account_id'}"/>
//             <filter string="Product" name="product" context="{'group_by':'product_id'}"/>
//             <filter string="Partner" name="partner" context="{'group_by':'partner_id'}"/>
//         </xpath>
//     </data>
// </field>
// </record>

// <record id="view_account_analytic_line_pivot" model="ir.ui.view">
// <field name="name">account.analytic.line.pivot</field>
// <field name="model">account.analytic.line</field>
// <field name="inherit_id" ref="analytic.view_account_analytic_line_pivot"/>
// <field name="arch" type="xml">
//     <field name="account_id" position="after">
//         <field name="partner_id" type="row"/>
//     </field>
// </field>
// </record>

// <record id="view_account_analytic_line_filter_inherit" model="ir.ui.view">
// <field name="name">account.analytic.line.select.inherit</field>
// <field name="model">account.analytic.line</field>
// <field name="inherit_id" ref="analytic.view_account_analytic_line_filter"/>
// <field name="arch" type="xml">
//     <xpath expr="//filter[@name='group_date']" position="after">
//         <filter string="Category" name='category' context="{'group_by': 'category'}"/>
//     </xpath>
// </field>
// </record>

<?xml version="1.0" encoding="utf-8"?>
<odoo>
    <record id="product_uom_tree_view" model="ir.ui.view">
        <field name="name">uom.uom.tree</field>
        <field name="model">uom.uom</field>
        <field name="arch" type="xml">
            <tree string="Units of Measure">
                <field name="name"/>
                <field name="category_id"/>
                <field name="uom_type"/>
            </tree>
        </field>
    </record>

    <record id="product_uom_form_view" model="ir.ui.view">
        <field name="name">uom.uom.form</field>
        <field name="model">uom.uom</field>
        <field name="arch" type="xml">
            <form string="Units of Measure">
                <sheet>
                    <group>
                        <group name="uom_details">
                            <field name="name"/>
                            <field name="category_id"/>
                            <field name="uom_type" readonly="1"/>
                            <label for="factor" attrs="{'invisible':[('uom_type','!=','smaller')]}"/>
                            <div attrs="{'invisible':[('uom_type','!=','smaller')]}">
                                <field name="factor" digits="[42,5]" attrs="{'readonly':[('uom_type','=','bigger')]}"/>
                                <span class="oe_grey oe_inline">
                                    e.g: 1*(reference unit)=ratio*(this unit)
                                </span>
                            </div>
                            <label for="factor_inv" attrs="{'invisible':[('uom_type','!=','bigger')]}"/>
                            <div attrs="{'invisible':[('uom_type','!=','bigger')]}">
                                <field name="factor_inv" digits="[42,5]" attrs="{'readonly':[('uom_type','!=','bigger')]}"/>
                                <span class="oe_grey oe_inline">
                                    e.g: 1*(this unit)=ratio*(reference unit)
                                </span>
                            </div>
                        </group>
                        <group name="active_rounding">
                            <field name="active" widget="boolean_toggle"/>
                            <field name="rounding" digits="[42, 5]"/>
                        </group>
                    </group>
                </sheet>
            </form>
        </field>
    </record>

    <record id="uom_uom_view_search" model="ir.ui.view">
        <field name="name">uom.uom.view.search</field>
        <field name="model">uom.uom</field>
        <field name="arch" type="xml">
            <search string="Search UOM">
                <field name="name"/>
                <separator/>
                <filter string="Archived" name="inactive" domain="[('active', '=', False)]"/>
                <group string="Group By">
                    <filter string="Category" name="group_by_category" context="{'group_by': 'category_id'}"/>
                </group>
            </search>
        </field>
    </record>

    <record id="product_uom_form_action" model="ir.actions.act_window">
        <field name="name">Units of Measure</field>
        <field name="type">ir.actions.act_window</field>
        <field name="res_model">uom.uom</field>
        <field name="view_id" ref="product_uom_tree_view"/>
        <field name="search_view_id" ref="uom_uom_view_search"/>
        <field name="help" type="html">
            <p class="o_view_nocontent_smiling_face">
            Add a new unit of measure
            </p>
            <p>
            You must define a conversion rate between several Units of
            Measure within the same category.
            </p>
        </field>
    </record>

    <record id="product_uom_categ_form_view" model="ir.ui.view">
        <field name="name">uom.category.form</field>
        <field name="model">uom.category</field>
        <field name="arch" type="xml">
            <form string="Units of Measure categories">
                <sheet>
                    <group>
                        <field name="name"/>
                        <field name="reference_uom_id" invisible="1"/>
                    </group>
                    <notebook>
                        <page string="Units of Measure" name="uom_lines">
                            <field name="uom_ids" force_save="1" context="{'default_uom_type': 'smaller', 'default_category_id': id}">
                                <tree editable="bottom">
                                    <field name="name" decoration-bf="uom_type == 'reference'"/>
                                    <field name="uom_type" decoration-bf="uom_type == 'reference'"/>
                                    <field name="factor" invisible="1"/>
                                    <field name="factor_inv" invisible="1"/>
                                    <field name="ratio" string="Ratio" attrs="{'readonly': [('uom_type', '=', 'reference')]}" digits="[42,5]"/>
                                    <field name="active"/>
                                    <field name="rounding" digits="[42, 5]"/>
                                </tree>
                            </field>
                        </page>
                    </notebook>
                </sheet>
            </form>
        </field>
    </record>

    <record id="product_uom_categ_tree_view" model="ir.ui.view">
        <field name="name">uom.category.tree</field>
        <field name="model">uom.category</field>
        <field name="arch" type="xml">
            <tree string="Units of Measure categories">
                <field name="name"/>
                <field name="uom_ids" widget="many2many_tags" options="{'color_field': 'color'}"/>
            </tree>
        </field>
    </record>

    <record id="uom_categ_view_search" model="ir.ui.view">
        <field name="name">uom.category.view.search</field>
        <field name="model">uom.category</field>
        <field name="arch" type="xml">
            <search string="Search UoM Category">
                <field name="name"/>
                <field name="uom_ids"/>
            </search>
        </field>
    </record>

    <record id="product_uom_categ_form_action" model="ir.actions.act_window">
        <field name="name">Units of Measure Categories</field>
        <field name="type">ir.actions.act_window</field>
        <field name="res_model">uom.category</field>
        <field name="view_mode">tree,form</field>
        <field name="context">{'allow_to_change_reference': 1}</field>
        <field name="help" type="html">
            <p class="o_view_nocontent_smiling_face">
            Add a new unit of measure category
            </p>
            <p>
            Units of measure belonging to the same category can be
            converted between each others. For example, in the category
                <i>'Time'</i>, you will have the following units of measure:
            Hours, Days.
            </p>
        </field>
    </record>
</odoo>

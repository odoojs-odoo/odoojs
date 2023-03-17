import local_base from './locmenu_base'
import local_base_partner from './locmenu_base_partner'
import local_product from './locmenu_product'
import locmenu_analytic from './locmenu_analytic'
export const local_menus_tree = [
  {
    id: 'bmx.root',
    icon: 'shopping',
    theme: 'twoTone',
    name: '自定义菜单',

    children: [
      {
        id: 'bmx.test',
        icon: 'shopping',
        theme: 'twoTone',
        name: '测试',
        children: [
          {
            action: 'bmx_sale.product_action',
            id: 'bmx.menu_bmx_sale_product_action',
            icon: 'shopping',
            // theme: 'twoTone',
            name: '办公用品'
          },
          {
            action: 'base.action_res_company_form',
            id: 'bmx.menu_action_res_company_form',
            icon: 'shopping',
            // theme: 'twoTone',
            name: '公司'
          }
        ]
      }
      // {
      //   id: 'bmx_purchase',
      //   icon: 'gold',
      //   theme: 'twoTone',
      //   name: '采购管理',
      //   children: [
      //     {
      //       action: 'bmx_purchase.action_purchase_order',
      //       id: 'bmx_purchase.action_purchase_order',
      //       icon: 'video-camera',
      //       // theme: 'twoTone',
      //       name: '采购合同'
      //     },
      //     {
      //       action: 'bmx_purchase.action_purchase_picking',
      //       id: 'bmx_purchase.menu_action_purchase_picking',
      //       icon: 'video-camera',
      //       // theme: 'twoTone',
      //       name: '采购入库'
      //     },
      //     {
      //       action: 'bmx_purchase.action_move_in_invoice',
      //       id: 'bmx_purchase.action_move_in_invoice',
      //       icon: 'video-camera',
      //       // theme: 'twoTone',
      //       name: '采购账单'
      //     }
      //   ]
      // },
      // {
      //   id: 'bmx_sale',
      //   icon: 'gold',
      //   theme: 'twoTone',
      //   name: '销售管理',
      //   children: [
      //     {
      //       action: 'bmx_sale.action_sale_order',
      //       id: 'bmx_sale.menu_action_sale_order',
      //       icon: 'video-camera',
      //       // theme: 'twoTone',
      //       name: '销售合同'
      //     },
      //     {
      //       action: 'bmx_sale.action_sale_picking',
      //       id: 'bmx_sale.menu_action_sale_picking',
      //       icon: 'video-camera',
      //       // theme: 'twoTone',
      //       name: '销售出库'
      //     },
      //     {
      //       action: 'bmx_sale.action_move_out_invoice',
      //       id: 'bmx_sale.action_move_out_invoice',
      //       icon: 'video-camera',
      //       // theme: 'twoTone',
      //       name: '销售结算单'
      //     }
      //     //
      //   ]
      // }
    ]
  },

  {
    id: 'odoo.root',
    icon: 'shopping',
    theme: 'twoTone',
    name: {
      en_US: 'Redo Odoo Menus',
      zh_CN: '重组官方菜单',
      zh_HK: '重组官方菜单'
    },
    children: [local_base, local_base_partner, local_product, locmenu_analytic]
  }
]

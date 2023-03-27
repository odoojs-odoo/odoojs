import locmenu_base from './locmenu_base'
import locmenu_base_partner from './locmenu_base_partner'
import locmenu_product from './locmenu_product'
import locmenu_product_setting from './locmenu_product_setting'
import locmenu_analytic from './locmenu_analytic'
import locmenu_account from './locmenu_account'
import locmenu_account_move from './locmenu_account_move'

import fp_base_setting from './fp_base_setting'
import fp_invoice_setting from './fp_invoice_setting'
import fp_bill_setting from './fp_bill_setting'
import fapiao_sys from './fapiao_sys'

export const local_menus_tree = [
  {
    id: 'odoo.setting',
    icon: 'shopping',
    theme: 'twoTone',
    name: { en_US: 'Setting', zh_CN: '配置', zh_HK: '配置' },
    children: [
      locmenu_base,
      locmenu_product_setting,
      locmenu_analytic,
      locmenu_account
    ]
  },
  {
    id: 'odoo.erp',
    icon: 'shopping',
    theme: 'twoTone',
    name: { en_US: 'ERP', zh_CN: '业务管理', zh_HK: '业务管理' },
    children: [locmenu_base_partner, locmenu_product]
  },

  locmenu_account_move,

  {
    id: 'fapiao',
    icon: 'shopping',
    theme: 'twoTone',
    name: { en_US: 'Fapiao', zh_CN: '发票', zh_HK: '发票' },
    children: [fp_base_setting, fp_bill_setting, fp_invoice_setting, fapiao_sys]
  }
  // {
  //   id: 'bmx.root',
  //   icon: 'shopping',
  //   theme: 'twoTone',
  //   name: '自定义菜单',

  //   children: [
  //     {
  //       id: 'bmx.test',
  //       icon: 'shopping',
  //       theme: 'twoTone',
  //       name: '测试',
  //       children: [
  //         {
  //           action: 'bmx_sale.product_action',
  //           id: 'bmx.menu_bmx_sale_product_action',
  //           icon: 'shopping',
  //           // theme: 'twoTone',
  //           name: '办公用品'
  //         },
  //         {
  //           action: 'base.action_res_company_form',
  //           id: 'bmx.menu_action_res_company_form',
  //           icon: 'shopping',
  //           // theme: 'twoTone',
  //           name: '公司'
  //         }
  //       ]
  //     }
  //     // {
  //     //   id: 'bmx_purchase',
  //     //   icon: 'gold',
  //     //   theme: 'twoTone',
  //     //   name: '采购管理',
  //     //   children: [
  //     //     {
  //     //       action: 'bmx_purchase.action_purchase_order',
  //     //       id: 'bmx_purchase.action_purchase_order',
  //     //       icon: 'video-camera',
  //     //       // theme: 'twoTone',
  //     //       name: '采购合同'
  //     //     },
  //     //     {
  //     //       action: 'bmx_purchase.action_purchase_picking',
  //     //       id: 'bmx_purchase.menu_action_purchase_picking',
  //     //       icon: 'video-camera',
  //     //       // theme: 'twoTone',
  //     //       name: '采购入库'
  //     //     },
  //     //     {
  //     //       action: 'bmx_purchase.action_move_in_invoice',
  //     //       id: 'bmx_purchase.action_move_in_invoice',
  //     //       icon: 'video-camera',
  //     //       // theme: 'twoTone',
  //     //       name: '采购账单'
  //     //     }
  //     //   ]
  //     // },
  //     // {
  //     //   id: 'bmx_sale',
  //     //   icon: 'gold',
  //     //   theme: 'twoTone',
  //     //   name: '销售管理',
  //     //   children: [
  //     //     {
  //     //       action: 'bmx_sale.action_sale_order',
  //     //       id: 'bmx_sale.menu_action_sale_order',
  //     //       icon: 'video-camera',
  //     //       // theme: 'twoTone',
  //     //       name: '销售合同'
  //     //     },
  //     //     {
  //     //       action: 'bmx_sale.action_sale_picking',
  //     //       id: 'bmx_sale.menu_action_sale_picking',
  //     //       icon: 'video-camera',
  //     //       // theme: 'twoTone',
  //     //       name: '销售出库'
  //     //     },
  //     //     {
  //     //       action: 'bmx_sale.action_move_out_invoice',
  //     //       id: 'bmx_sale.action_move_out_invoice',
  //     //       icon: 'video-camera',
  //     //       // theme: 'twoTone',
  //     //       name: '销售结算单'
  //     //     }
  //     //     //
  //     //   ]
  //     // }
  //   ]
  // },
]

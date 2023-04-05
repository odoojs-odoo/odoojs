import base_setting from './submenu/base_setting'
import base_partner from './submenu/base_partner'
import product_setting from './submenu/product_setting'
import product_product from './submenu/product_product'

import analytic_setting from './submenu/analytic_setting'
import account_setting from './submenu/account_setting'

import account_move from './submenu/account_move'

import fapiao from './submenu/fapiao'
import sale_setting from './submenu/sale_setting'

import sale from './submenu/sale'

export const local_menus_tree = [
  {
    id: 'odoo.setting',
    icon: 'shopping',
    theme: 'twoTone',
    name: { en_US: 'Setting', zh_CN: '系统配置', zh_HK: '系统配置' },
    children: [
      base_setting,
      product_setting,
      analytic_setting,
      account_setting,
      sale_setting
    ]
  },
  {
    id: 'odoo.master',
    icon: 'shopping',
    theme: 'twoTone',
    name: { en_US: 'Master Data', zh_CN: '主数据', zh_HK: '主数据' },
    children: [base_partner, product_product]
  },

  account_move,
  fapiao,
  sale
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

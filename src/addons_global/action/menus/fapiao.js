export default {
  menu_fapiao: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_web_root',
    name: 'Fapiao',
    sequence: 100,
    children: {
      menu_fapiao_setting: {
        name: 'Fapaio Setting',
        children: {
          menu_action_tax: {
            action: 'fapiao_base.action_tax',
            name: 'Tax'
          },
          menu_action_vat_product: {
            action: 'fapiao_base.action_vat_product',
            name: 'VAT Product'
          },
          menu_action_partner_company: {
            action: 'fapiao_base.action_partner_company',
            name: 'Fapiao Company'
          },
          menu_action_company_taxmachine: {
            action: 'fapiao_base.action_company_taxmachine',
            name: 'Tax Machine'
          },
          menu_action_users: {
            action: 'fapiao_base.action_users',
            name: 'User Drawer'
          },
          menu_action_api_draw_company: {
            action: 'fapiao_invoice.action_api_draw_company',
            name: 'Draw Setting'
          },
          menu_action_api_ocr_company: {
            action: 'fapiao_bill.action_api_ocr_company',
            name: 'OCR Setting'
          },
          menu_action_api_check_company: {
            action: 'fapiao_bill.action_api_check_company',
            name: 'Check Setting'
          }
        }
      },
      menu_fapiao_master: {
        name: 'Fapaio Master',
        children: {
          menu_action_partner: {
            action: 'fapiao_base.action_partner',
            name: 'Partner'
          },
          menu_action_product: {
            action: 'fapiao_base.action_product',
            name: 'Product'
          }
        }
      },
      menu_action_bill_ocr: {
        action: 'fapiao_bill.action_bill_ocr',
        name: 'OCR'
      },
      menu_action_bill_check: {
        action: 'fapiao_bill.action_bill_check',
        name: 'Check'
      },
      menu_action_invoice_draw: {
        action: 'fapiao_invoice.action_invoice_draw',
        name: 'Draw'
      }
    }
  }
}

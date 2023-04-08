export default {
  menu_fapiao: {
    _odoo_model: 'ir.ui.menu',
    parent: 'menu_web_root',
    name: 'Fapiao',
    sequence: 40,
    children: {
      fapiao_setting: {
        name: 'Fapaio Setting',
        children: {
          action_tax: {
            action: 'fapiao_base.action_tax',
            name: 'Tax'
          },
          action_vat_product: {
            action: 'fapiao_base.action_vat_product',
            name: 'VAT Product'
          },
          action_partner_company: {
            action: 'fapiao_base.action_partner_company',
            name: 'Fapiao Company'
          },
          action_company_taxmachine: {
            action: 'fapiao_base.action_company_taxmachine',
            name: 'Tax Machine'
          },
          action_users: {
            action: 'fapiao_base.action_users',
            name: 'User Drawer'
          },
          action_api_draw_company: {
            action: 'fapiao_invoice.action_api_draw_company',
            name: 'Draw Setting'
          },
          action_api_ocr_company: {
            action: 'fapiao_bill.action_api_ocr_company',
            name: 'OCR Setting'
          },
          action_api_check_company: {
            action: 'fapiao_bill.action_api_check_company',
            name: 'Check Setting'
          }
        }
      },
      fapiao_master: {
        name: 'Fapaio Master',
        children: {
          action_partner: {
            action: 'fapiao_base.action_partner',
            name: 'Partner'
          },
          action_product: {
            action: 'fapiao_base.action_product',
            name: 'Product'
          }
        }
      },
      action_bill_ocr: {
        action: 'fapiao_bill.action_bill_ocr',
        name: 'OCR'
      },
      action_bill_check: {
        action: 'fapiao_bill.action_bill_check',
        name: 'Check'
      },
      action_invoice_draw: {
        action: 'fapiao_invoice.action_invoice_draw',
        name: 'Draw'
      }
    }
  }
}

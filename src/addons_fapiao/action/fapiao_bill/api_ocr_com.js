export default {
  view_api_ocr_company_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.api.ocr.company',
    type: 'tree',
    arch: {
      sheet: {
        company_id: {},
        name: {},
        tin: { secret: 1 }
        //   api_ocr_id: {}
      }
    }
  },

  view_api_ocr_company_form: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.api.ocr.company',
    type: 'form',

    toolbar: {
      action: {},
      print: {}
    },

    arch: {
      sheet: {
        _group: {
          _group_name: {
            company_id: {},
            name: {},
            tin: { secret: 1 }
          },
          _group_desc: {
            api_ocr_id: { secret: 1 },
            glority_app_key: { secret: 1 },
            glority_app_secret: { secret: 1 }
          }
        }
      }
    }
  },

  action_api_ocr_company: {
    _odoo_model: 'ir.actions.act_window',
    name: 'OCR 配置',
    type: 'ir.actions.act_window',
    res_model: 'fp.api.ocr.company',
    domain: [],
    context: {},
    views: {
      tree: 'view_api_ocr_company_tree',
      form: 'view_api_ocr_company_form'
    }
  }
}

export default {
  view_api_ocr_company_tree: {
    _odoo_model: 'ir.ui.view',
    model: 'fp.api.ocr.company',
    type: 'tree',

    fields: {
      company_id: {},
      name: {},
      tin: {}
      //   api_ocr_id: {}
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
        _title: { display_name: {} },

        _group_name: {
          company_id: {},
          name: {},
          tin: {}
        },
        _group_desc: {
          api_ocr_id: {},
          glority_app_key: {},
          glority_app_secret: {}
        }
      }
    }
  },

  action_api_ocr_company: {
    _odoo_model: 'ir.actions',
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

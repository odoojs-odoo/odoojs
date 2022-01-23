import BaseTestCase from './base'
import rpc from '@/odoorpc'

export default class SessionTestCase extends BaseTestCase {
  async test() {
    await this.login()
    this.test_print()

    // this.test_xlsx()
  }
  async test_print() {
    const report_type = 'qweb-pdf'
    const report_name = 'sale.report_saleorder'
    const active_ids = [3, 2, 1]

    const res = await this.api.report_download({
      report_name,
      active_ids,
      report_type
    })
    // console.log('test report_download ', res)

    return res
  }

  async test_xlsx() {
    const model = 'sale.order'
    const fields = [
      { name: 'name', label: '订单关联', store: true, type: 'char' },
      { name: 'create_date', label: '创建日期', store: true, type: 'datetime' },
      { name: 'partner_id', label: '客户', store: true, type: 'many2one' },
      { name: 'user_id', label: '销售员', store: true, type: 'many2one' },
      { name: 'activity_ids', label: '活动', store: true, type: 'one2many' },
      { name: 'amount_total', label: '合计', store: true, type: 'monetary' },
      { name: 'state', label: '状态', store: true, type: 'selection' }
    ]

    const ids = false
    const domain = [['user_id', '=', 2]]
    const groupby = []
    const context = {
      lang: 'zh_CN',
      tz: 'Asia/Shanghai',
      uid: 2,
      allowed_company_ids: [1],
      search_default_my_quotation: 1
    }

    const import_compat = false

    const data = { model, fields, ids, domain, groupby, context, import_compat }
    const res = await this.api.export_xlsx(data)
    console.log('test export_xlsx ', res)
    return res
  }
}

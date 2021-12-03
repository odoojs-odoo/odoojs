import { LoginTestCase } from './base'

export default class SessionTestCase extends LoginTestCase {
  async test() {
    await this.login()
    this.test_print()
    // this.test_xlsx()
  }
  async test_print() {
    const action_xml_id = 'sale.action_quotations_with_onboarding'
    const action = await this.api.action(action_xml_id)
    const model = action.model
    const datalist = await model.pageGoto(1)
    const active_ids = datalist.map(item => item.id)
    const info = model.view_info
    const print_action = info.views.list.toolbar.print[0]
    await model.print({ action: print_action, active_ids })
  }

  async test_xlsx() {
    const action_xml_id = 'sale.action_quotations_with_onboarding'
    const action = await this.api.action(action_xml_id)
    const model = action.model
    await model.export_xlsx_all()
  }
}

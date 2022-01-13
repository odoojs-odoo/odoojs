import { LoginTestCase } from './base'

export default class SessionTestCase extends LoginTestCase {
  async test() {
    await this.login()
    this.test_print()
    // this.test_xlsx()
  }
  async test_print() {
    const action_xml_id = 'sale.action_quotations_with_onboarding'
  }

  async test_xlsx() {
    const action_xml_id = 'sale.action_quotations_with_onboarding'
  }
}

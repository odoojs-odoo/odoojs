import { LoginTestCase } from './base'

export default class ActionTestCase extends LoginTestCase {
  async test_load1() {
    await this.login()
    const action_xml_id = 'contacts.action_contacts'
    const action = await this.api.env
      .model('ir.model.data')
      .execute('xmlid_to_res_model_res_id', action_xml_id, true)
    const action_id = action[1]
    const additional_context = {}
    const res = await this.api.odoorpc.web.action.load({
      action_id,
      additional_context
    })
    console.log(res)
    return res
  }
}

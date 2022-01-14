import BaseTestCase from './base'
import api from '@/odooapi'

export default class ActionTestCase extends BaseTestCase {
  async test() {
    await this.login()
    await this.form_view()
  }

  async form_view() {
    const info = await this.load_action()
    const res_id = 1
    const data = await api.Views.form.read(info, res_id)
    console.log('data', data)
  }

  async list_view() {
    const info = await this.load_action()
    const search = await api.Views.search.default_value(info)

    const data = await api.Views.list.web_search_read(info, { search })
    console.log('data', data)
  }

  async load_action() {
    const action_xml_id = 'contacts.action_contacts'
    const action2 = await api.env
      .model('ir.model.data')
      .execute('xmlid_to_res_model_res_id', action_xml_id, true)
    const action_id = action2[1]
    const additional_context = {}
    const action = await api.Action.load(action_id, additional_context)
    const views = await api.Action.load_views({ action })
    const context = api.web.session.context
    const info = { context, action, views }

    console.log(info)
    return info
  }
}

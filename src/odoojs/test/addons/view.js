import { LoginTestCase } from './base'

export default class ViewTestCase extends LoginTestCase {
  //

  async view1() {
    await this.login()
    const action_xml_id = 'base.action_country'
    const action = await this.api.action(action_xml_id)
    const listview = action.listview
    console.log('treeview1:', listview)
    const formview = action.formview
    console.log('formview1', formview)
  }

  async view2() {
    await this.login()
    const action_xml_id = 'base.action_country_state'
    const action = await this.api.action(action_xml_id)
    const listview = action.listview
    console.log('treeview2', listview)
    const formview = action.formview
    console.log('formview1', formview)
  }

  async view3() {
    await this.login()
    const action_xml_id = 'contacts.action_contacts'
    const action = await this.api.action(action_xml_id)
    const listview = action.listview
    console.log('treeview2', listview)
    const formview = action.formview
    console.log('formview1', formview)
  }

  async view4() {
    await this.login()
    const action_xml_id = 'account.action_move_journal_line'
    const action = await this.api.action(action_xml_id)
    const listview = action.listview
    console.log('treeview2', listview)
    const formview = action.formview
    console.log('formview1', formview)
  }
}

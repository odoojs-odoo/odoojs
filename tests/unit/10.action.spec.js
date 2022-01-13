import { expect } from 'chai'
import api from '@/odooapi'

import Config from './config'

const { authenticate, login_info } = Config

describe('action', async () => {
  it('load', async () => {
    await authenticate(login_info)
    const action_xml_id = 'contacts.action_contacts'

    const action = await api.Action.load(action_xml_id)
    // console.log(action)
  })
})

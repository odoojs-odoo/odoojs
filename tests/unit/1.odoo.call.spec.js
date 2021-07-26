import { expect } from 'chai'

import Config from './config'

const { ODOO, baseURL } = Config

const api = new ODOO({ baseURL })

const test_call_odoo = async () => {
  const res = await api.get_version_info()
  return res
}

describe('connect odoo', async () => {
  it('version', async () => {
    // const version_info = await api.get_version_info()
    const version_info = await test_call_odoo()

    // console.log(version_info)
    const { server_version } = version_info
    expect(server_version.slice(0, 4)).to.equal('13.0')
  })
})

import { expect } from 'chai'
import api from '@/odooapi'

describe('api.connect odoo', async () => {
  it('version', async () => {
    const version_info = await api.web.webclient.version_info()

    // console.log(version_info)
    const { server_version } = version_info
    expect(server_version.slice(0, 4)).to.equal('14.0')
  })
})

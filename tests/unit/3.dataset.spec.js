import { expect } from 'chai'
import api from '@/odooapi'

import Config from './config'

const { authenticate, login_info } = Config

describe('api.web.dataset', async () => {
  it('call_kw search_read', async () => {
    await authenticate(login_info)
    const model = 'ir.module.module'
    const method = 'search_read'
    const domain = []
    const fields = ['name']
    const order = 'name'

    const payload = {
      model,
      method,
      args: [],
      kwargs: { domain, fields, order }
    }

    const res = await api.web.dataset.call_kw(payload)
    expect(res).to.be.instanceOf(Array)
    const res2 = res.find(item => item.name === 'base')
    expect(res2).to.be.instanceOf(Object)
    expect(res2.name).to.equal('base')
  })

  it('call_kw search', async () => {
    await authenticate(login_info)
    const model = 'ir.module.module'
    const method = 'search'
    const domain = []
    const order = 'name'

    const payload = {
      model,
      method,
      args: [domain],
      kwargs: { order }
    }

    const res = await api.web.dataset.call_kw(payload)
    expect(res).to.be.instanceOf(Array)
    expect(res.length).to.be.above(0)
    const res2 = res[0]
    expect(res2).to.be.a('number')
  })
})

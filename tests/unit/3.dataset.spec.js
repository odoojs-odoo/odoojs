import { expect } from 'chai'

import { get_odoo } from './config'

describe('Test Dataset', async () => {
  it('call_kw', async () => {
    const api = await get_odoo()
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
})

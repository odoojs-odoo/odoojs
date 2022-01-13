import { expect } from 'chai'

import Config from './config'

const { authenticate, login_info } = Config

describe('rpc.web', async () => {
  it('login', async () => {
    const session = await authenticate(login_info)
    // console.log(res)

    const { db, username } = session
    expect(db).to.equal(login_info.db)
    expect(username).to.equal(login_info.login)
  })
})

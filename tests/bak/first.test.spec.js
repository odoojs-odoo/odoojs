import { expect } from 'chai'

describe('My first Test', () => {
  it('test is ok', () => {
    const a_string = 'This is string'
    expect(a_string).to.equal('This is string')
    expect(typeof a_string).to.equal('string')
  })
  it('test is not ok', () => {
    const a_string = 123
    expect(a_string).to.equal('This is string')
    expect(typeof a_string).to.equal('string')
  })
})

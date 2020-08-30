const Model = {
  configs: {},

  extend: BaseClass => {
    class ModelClass extends BaseClass {
      global_domain(payload = {}) {
        // const { domain = {}, domain2 = [] } = payload
        return super.global_domain(payload)
      }

      async change_password(oldPsw, newPsw) {
        const method = 'change_password'
        const args = [oldPsw, newPsw]
        const res = await this.call(method, args)
        return res
      }

      async browse_one(rid, kwargs) {
        const res = await super.browse_one(rid, kwargs)

        return res
      }

      async search(params = {}) {
        const res = await super.search(params)
        return res
      }
    }
    return ModelClass
  }
}

export default Model

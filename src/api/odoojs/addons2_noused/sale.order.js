const Model = {
  configs: {},

  extend: BaseClass => {
    class ModelClass extends BaseClass {
      global_domain(payload = {}) {
        // const { domain = {}, domain2 = [] } = payload
        return super.global_domain(payload)
      }

      async create_by_template(template_id) {
        const res = await this.create()
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

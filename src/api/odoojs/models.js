// 简单的 domain, 都是 与 关系的, 可以用 dict 传参数,
// 复杂的 domain, 有 或 非 关系的, 依然可以用 list 格式
// global_domain 是个函数, 用于设置全局的/与用户有关的过滤条件
function _format_domain(self, domain_src = {}) {
  // console.log('_format_domain ,', self.model, self, domain_src)

  const { domain: global, domain2: global2 } = self.global_domain()

  // eslint-disable-next-line object-curly-spacing
  // const { domain_default = {} } = self.configs || {}
  // TBD 不再使用 configs 了, 应该将 本文中 所有的 self.configs 改为 metadata

  // eslint-disable-next-line object-curly-spacing
  const { domain: domain_default = {} } = self.metadata || {}

  let domain = []
  let domain_dict = {}
  if (Array.isArray(domain_default)) {
    domain = [...domain, ...domain_default]
  } else {
    domain_dict = { ...domain_dict, ...domain_default }
  }

  if (Array.isArray(domain_src)) {
    domain = [...domain, ...domain_src]
  } else {
    domain_dict = { ...domain_dict, ...domain_src }
  }

  if (Array.isArray(global)) {
    domain = [...domain, ...global]
  } else {
    domain_dict = { ...domain_dict, ...global }
  }

  if (Array.isArray(global2)) {
    domain = [...domain, ...global2]
  } else {
    domain_dict = { ...domain_dict, ...global2 }
  }

  return [domain, domain_dict]
}

export class ModelClass {
  constructor(options = {}) {
    // 通过 metadata 携带一些 model 的参数
    const { model, metadata, odoo, rpc, env } = options
    this.model = model
    this.metadata = metadata
    this.odoo = odoo
    this.rpc = rpc
    this.env = env
  }

  get_userinfo() {
    return this.rpc.get_userinfo()
  }

  call(method, args, kwargs) {
    // console.log('model, call, ', this.model, method, args, kwargs)
    return this.rpc.call(this.model, method, args, kwargs)
  }

  // TBD  判断 数组或 字典
  global_domain(payload = {}) {
    // to be overrided
    const { domain = {}, domain2 = [] } = payload
    return { domain, domain2 }
  }

  async get_options(fields) {
    const res = await this.call('get_options', [fields])
    return res
  }

  async default_get(fields, context) {
    const method = 'default_get'
    const args = [fields]
    const kwargs = { context }
    const res = await this.call(method, args, kwargs)
    return res
  }

  // 2019-12-8 no used
  async fields_get(kwargs) {
    // const { allfields, attributes } = kwargs
    const method = 'fields_get'
    const args = []
    const res = await this.call(method, args, kwargs)
    return res
  }

  // Not Used
  ref(xmlid) {
    // get model and id from xmlid
    return this.env('ir.model.data').call('xmlid_to_res_model_res_id', [
      xmlid,
      true
    ])
  }

  search_read(kwargs) {
    return this.call('search_read', [], kwargs)
  }

  async search_count(query = {}) {
    // 为了 支持 两种格式的 domain, 这里的参数规范 做了 修改
    // 丢弃的 方法 是 直接 传 domain,
    // 现在采用的 方法 是 将 domain 和  domain2 放在 对象里
    // 注意 检查代码 中 使用到 search_count 的地方

    const {
      domain = {}, // 目前的前端 都是简单的 domian ={}
      domain2 = []
    } = query

    const method = 'search_count2'
    const [domain_list, domain_dict] = _format_domain(this, domain)
    const args = []
    const kwargs = {
      domain: [...domain2, ...domain_list],
      domain2: domain_dict
    }
    return await this.call(method, args, kwargs)
  }

  async browse_one(id, query = {}) {
    const res = await this.browse(id, query)
    return res && res.length === 1 ? res[0] : {}
  }

  get_record(res) {
    // console.log('model, get_record, ', this.model)
    return this.get_image_url(res)
  }

  get_image_url(res) {
    // console.log('get_image_url', this.model)
    // console.log('get_image_url', this)

    const userinfo = this.rpc.get_userinfo() || {}
    // console.log('get_image_url', userinfo)
    const session_id = userinfo.session_id

    const date = new Date().getTime()
    // const image_url2 = `${partner.image_128}&unique=${date}`
    const baseURL = process.env.VUE_APP_BASE_API
    const imgUrl = '/web/image'

    const fields1 = this.metadata.fields || {}

    const fields = Object.keys(fields1).filter(item =>
      ['image', 'many2one', 'many2many', 'one2many'].includes(
        fields1[item].type
      )
    )

    const image_urls = fields.reduce(
      (acc, cur) => {
        const meta = fields1[cur]
        if (meta.type === 'image') {
          acc[cur] = `${baseURL}${imgUrl}?model=${this.model}&id=${
            res.id
          }&field=${cur}&unique=${date}&session_id=${session_id}`
        } else if (meta.type === 'many2one') {
          if (res[cur]) {
            // console.log('res[cur]', this.model, cur, res[cur])
            // console.log('res[cur]', meta.relation, cur, res[cur])

            const ref_fld = `${cur}__object`

            const ref_images = this.odoo
              .env(meta.relation)
              .get_record(res[ref_fld])

            acc[ref_fld] = { ...res[ref_fld], ...ref_images }
          }
        } else {
          // m2m or o2m

          if (res[cur] && res[cur].length) {
            // console.log('res[cur]', this.model, cur, res[cur])
            const ref_fld = `${cur}__objects`
            // console.log('res[cur]', this.model, cur, res[ref_fld])
            acc[ref_fld] = res[ref_fld].map(item => {
              const ref_images = this.odoo.env(meta.relation).get_record(item)

              return { ...item, ...ref_images }
            })
          }
        }

        return acc
      },
      { ...res }
    )

    return image_urls
  }

  async browse(rid, query = {}) {
    // eslint-disable-next-line object-curly-spacing
    const { fields } = query
    const method = 'read2'

    // 判断 id 是数组或 int
    const args = [
      Array.isArray(rid) ? rid.map(item => parseInt(item)) : parseInt(rid)
    ]
    const kwargs = {
      fields: fields // || { display_name: null }
    }

    // read2 返回值是 数组
    const records = await this.call(method, args, kwargs)

    const records2 = records.map(item => {
      const image_fields = this.get_record(item)
      const item2 = { ...item, ...image_fields }
      return item2
    })

    return records2
  }

  async search(query = {}) {
    // const sss = await this.fields_get()
    // console.log('xxxxxxx,fields_get', sss)
    const {
      domain = {}, // 目前的前端 都是简单的 domian ={}
      domain2 = [], // 支持 两种格式的 domain
      fields = {},
      page = 1,
      limit = 0,
      offset, // offset 与 page 二选一
      order
    } = query

    // console.log('xxxxxxx,search', domain2)

    const [domain_list, domain_dict] = _format_domain(this, domain)

    const method = 'search_read2'
    const args = []
    const kwargs = {
      domain: [...domain2, ...domain_list],
      domain2: domain_dict,
      fields: fields || { name: null },
      offset: offset !== undefined ? offset : (page - 1) * limit,
      limit,
      order
    }

    const records = await this.call(method, args, kwargs)
    const records2 = records.map(item => {
      const image_fields = this.get_record(item)
      const item2 = { ...item, ...image_fields }
      return item2
    })

    return records2
  }

  async search_one(kwargs = {}) {
    const res = await this.search(kwargs)
    if (res.length) {
      return res[0]
    } else {
      return {}
    }
  }

  async update_or_create(values, kwargs = {}) {
    console.log('update_or_create, ', values, kwargs)
    const { domain } = kwargs

    if (domain) {
      const rec = await this.search_one({ domain })
      if (rec.id) {
        // 测试下 这个函数
        return this.write({
          id: rec.id,
          ...values
        })

        //         return this.write({
        //           values: {
        //             id: rec.id,
        //             ...values
        //           }
        //         })
      } else {
        return this.create(values, kwargs)
      }
    } else {
      return this.write(values, kwargs)
    }
  }

  async create(values = {}, kwargs = {}) {
    const method = 'create2'
    const args = [values]
    const rec = await this.call(method, args, kwargs)
    const image_fields = this.get_record(rec)
    const rec2 = { ...rec, ...image_fields }
    return rec2
  }

  async write(values, kwargs = {}) {
    // console.log('xxxxx, write', values)
    const method = 'write2'
    const rid = values.id
    const values2 = { ...values }
    delete values2.id
    const args = [rid, values2]
    const rec = await this.call(method, args, kwargs)
    const image_fields = this.get_record(rec)
    const rec2 = { ...rec, ...image_fields }
    return rec2
  }

  async unlink(rid) {
    const method = 'unlink'
    const args = [rid]

    return await this.call(method, args)
  }
  // 移动端 做了 wizard
}

const creater = options => {
  return new ModelClass(options)
}
export default creater

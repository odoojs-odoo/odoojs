import BaseTestCase from './base'
import rpc from '@/odoorpc'

function upload(callback) {
  const input = document.createElement('input')
  input.type = 'file'
  input.click()
  input.onchange = () => {
    const file = input.files[0]
    callback(file)
  }
}

const _parse_metadata = {
  options: {
    headers: true,
    advanced: false,
    keep_matches: false,
    name_create_enabled_fields: {},
    skip: 0,
    limit: 2000,
    encoding: '',
    separator: '',
    quoting: '"',
    date_format: '%Y-%m-%d',
    datetime_format: '%Y-%m-%d %H:%M:%S',
    float_thousand_separator: ',',
    float_decimal_separator: '.',
    fields: []
  },

  fields: [],
  columns: []
}

export default class DatasetTestCase extends BaseTestCase {
  async test() {
    await this.test2()
  }

  async test2() {
    console.log('testss')
    await this.login()

    const import_obj = rpc.env.model('base_import.import')

    const model = 'res.partner.category'

    upload(async file => {
      //   import_obj.test_import_file({ model, file })

      const import_id = await import_obj.create({ res_model: model })

      //   console.log(' upload,', file, rid, [rpc])
      //   console.log(' upload,', file, rid, [rpc], rpc.web.file_import)

      const url = '/base_import/set_file'

      const res = await rpc.web.file_import(url, {
        import_id,
        file
      })

      console.log(' upload,', res)

      const options = _parse_metadata.options

      const parse_result = await import_obj.execute(
        'parse_preview',
        import_id,
        options
      )

      console.log(' upload,2', parse_result)

      //   import_obj.execute_kw(rid, )
      //
    })

    // const model = 'ir.module.module'
    // const method = 'search_read'
    // const domain = []
    // const fields = ['name']
    // const limit = 10
    // const order = 'name'

    // const payload = {
    //   model,
    //   method,
    //   args: [],
    //   kwargs: { domain, fields, limit, order }
    // }

    // const res = await rpc.web.dataset.call_kw(payload)
    // console.log(res)
    // return res
  }
}

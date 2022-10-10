// base_imort  TBD , 暂时保留, 功能未调试

import { Model } from '../models'

export class Base_importImport extends Model {
  constructor(...args) {
    super(...args)

    this._parse_metadata = {
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

    this._parse_result = {}
  }

  static async create_browse(values) {
    const rid = await this.create(values)
    // 目前只有 base_import.import 使用该方法
    const records = new this()
    records._env_local = this.env
    records._ids = [rid]

    return records
  }

  //
  // 1. call: /web/dataset/call_kw/res.partner.category/get_import_templates
  // 2. call: /web/dataset/call_kw/base_import.import/create
  //    params: {res_model: "res.partner.category"}
  // 3. call: /base_import/set_file
  // 4. call: /web/dataset/call_kw/base_import.import/parse_preview
  //    params: wizard.id, options
  //    return: feilds, headers, headers_type, matches, preview
  // 5. call: /web/dataset/call_kw/base_import.import/do
  //    params:  wizard.id, fields, columns, options,

  static async set_file({ import_id, file }) {
    const url = '/base_import2/set_file'
    // const callback = (...res) => {
    //   console.log(' import, ', res)
    // }
    const data = await this._odoo.file_import(url, {
      import_id,
      file
      // jsonp: callback
    })
    return data.result
  }

  async set_file(file) {
    return this.constructor.set_file({ import_id: this.id, file })
  }

  async parse_preview(options) {
    const options2 = this._parse_metadata.options
    const parse_result = await this.execute(
      'parse_preview',
      options || options2
    )

    this._parse_result = parse_result
    this._parse_metadata.fields = parse_result.headers
    this._parse_metadata.columns = parse_result.headers
    this._parse_metadata.options = parse_result.options
    return parse_result
  }

  async _do(dryrun) {
    const fields = this._parse_metadata.fields
    const columns = this._parse_metadata.columns
    const options = this._parse_metadata.options
    const result = await this.execute_kw('do', [fields, columns, options], {
      dryrun
    })
    return result
  }

  async do_dryrun() {
    return this._do(true)
  }

  async do_run() {
    return this._do()
  }

  static async test_import_file({ model, file }) {
    const records = await this.create_browse({ res_model: model })
    await records.set_file(file)
    const parse_result = await records.parse_preview()
    console.log(parse_result)
    const res = await records.do_dryrun()
    console.log(res)
    const res2 = await records.do_run()
    console.log(res2)

    // return data2
  }
}

const AddonsModels = {
  'base_import.import': Base_importImport
}

export default AddonsModels

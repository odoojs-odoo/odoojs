import { X2mBase } from './x2mbase'

import { EditX2m } from './editmodel'
import { tuples_to_ids } from '@/odoorpc/tools'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

export class X2mForm extends X2mBase {
  constructor(field_info, payload) {
    super(field_info, { ...payload, type: 'form' })
    this.parentData = { record: {}, values: {} }
    this.edit_model = undefined
  }

  _edit_model_get(record = {}, values = {}, parentData = {}) {
    return new EditX2m({ viewmodel: this, record, values, parentData })
  }

  context_get(parentData) {
    const context_fn = this.field_info.context

    const prt = this.parent
    const context = prt.context

    if (typeof context_fn !== 'function') {
      return { ...context, ...(context_fn || {}) }
    }

    const { record, values } = parentData

    const parent_record = prt._get_values_for_context(record, values)
    const env = this.env
    // console.log('change new', parent_record, context, env, typeof context_fn)
    const ctx = context_fn({ env, record: { ...parent_record, context } })
    // console.log('change new ok', ctx, context)

    return { ...context, ...ctx }
  }

  _get_values_for_modifiers(record, values) {
    // call by require, readonly, domain of feild

    const all_keys = Object.keys({ ...record, ...values })

    return all_keys.reduce((acc, fld) => {
      const meta = this.fields[fld] || {}
      if (meta.type === 'many2many') {
        const val =
          fld in values ? values[fld] : [[6, false, record[fld] || []]]

        acc[fld] = tuples_to_ids(val)
      } else if (meta.type === 'one2many') {
        const val =
          fld in values
            ? values[fld]
            : (record[fld] || []).map(item => [4, item, false])

        acc[fld] = tuples_to_ids(val)
      } else {
        const val = fld in values ? values[fld] : record[fld]
        const val2 = val && meta.type === 'many2one' ? val[0] : val
        acc[fld] = val2
      }

      return acc
    }, {})
  }

  async onchange_new(parentData) {
    this.edit_model = this._edit_model_get()
    return this.edit_model.onchange_new(parentData)
  }

  set_editable(record, parentData) {
    this.edit_model = this._edit_model_get()
    return this.edit_model.set_editable(record, parentData)
  }

  async onchange(fname, kwargs) {
    return this.edit_model.onchange(fname, kwargs)
  }

  async commit(kwargs = {}) {
    return this.edit_model.commit(kwargs)
  }
}

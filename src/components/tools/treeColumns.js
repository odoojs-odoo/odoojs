import { toRaw } from 'vue'
import api from '@/odoorpc'

export function useTreeColumns() {
  function computedColumns(fields) {
    function formatGet(meta) {
      function valueGet(record) {
        return record[meta.name]
      }

      function valueGetDatatime(record) {
        const value = record[meta.name]

        if (typeof value === 'object') {
          const value2 = api.tools.date_format(value)
          return value2
        }

        return record[meta.name]
      }

      function valueGetM2o(record) {
        const value = toRaw(record[meta.name]) || [0, '']
        // console.log('get_customCell,', { column, record, index })
        // console.log('get_customCell,', value)
        return value[1]
      }

      function valueGetSelection(record) {
        const get_label = value => {
          const elm = meta.selection.find(item => item[0] === value)
          return elm ? elm[1] : ''
        }
        const value = toRaw(record[meta.name])
        return value ? get_label(value) : ''
      }

      function valueGetBoolean(record) {
        return toRaw(record[meta.name]) ? '是' : '否'
      }

      function valueGetMany2many(record) {
        if (meta.widget === 'many2many_tags') {
          const res = record[`${meta.name}___selection`] || []
          const res2 = res.map(item => item[1])
          return res2.join(', ')
        }
        return toRaw(record[meta.name])
      }

      const methodsForGet = {
        many2one: valueGetM2o,
        selection: valueGetSelection,
        boolean: valueGetBoolean,
        datetime: valueGetDatatime,
        many2many: valueGetMany2many
      }

      return methodsForGet[meta.type] || valueGet
    }

    // function format(record, meta) {
    //   const method = formatGet(meta)
    //   const res = method(record)

    // }

    const cols = Object.keys(fields)
      .filter(item => !fields[item].invisible)
      .map(fld => {
        const meta = fields[fld] || {}
        return {
          dataIndex: fld,
          key: fld,
          title: meta.string,
          ellipsis: 'ellipsis' in meta ? meta.ellipsis : true,
          align: 'center',
          width: meta.web_col_width,
          _meta: meta,
          _format: formatGet(meta) // record => format(record, meta)
        }
      })

    // console.log('--- cols ---', cols)

    return cols
  }

  return { computedColumns }
}

import pivot from '@/odoorpc/pivot'

import { pivot_data, fields } from '@/odoorpc/demo_data/pivot_demo'

export default class Pivot {
  test() {
    // this.test_columns()
    // this.test_rows()

    this.test_data_info()
  }

  test_data_info() {
    const data_info = pivot.datadict({ fields, ...pivot_data })
    console.log('data_info', data_info)
  }

  test_rows() {
    const rows = pivot.rowtree({ fields, ...pivot_data })
    console.log('rows', rows)
  }

  test_columns() {
    const cols = pivot.coltree({ fields, ...pivot_data })

    // const cols = pivot.columns_header({ fields, ...pivot_data })

    console.log('cols', cols)
  }
}
//

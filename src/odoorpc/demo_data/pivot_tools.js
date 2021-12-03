import { pivot_data, fields } from './pivot_demo'

import pivot from '@/odoorpc/pivot'

export default {
  pivot_info: {
    // measures: pivot_data.measures,
    measures: pivot.measures({ fields, ...pivot_data }),
    groupbys: pivot.groupbys({ fields, ...pivot_data }),

    rowtree: pivot.rowtree({ fields, ...pivot_data }),
    coltree: pivot.coltree({ fields, ...pivot_data }),
    datadict: pivot.datadict({ fields, ...pivot_data })
  }
}

// import pivot from '@/odoorpc/pivot'

const data_list = [
  {
    // 1
    // filter: {},
    groupby: [],
    records: [{ amt: 1000, tax: 20, __domain: [['uid', '=', 2]] }]
  },
  {
    //2
    // filter: {},
    groupby: ['date:month'],
    records: [
      { amt: 'm10', 'date:month': 'M10' },
      { amt: 'm11', 'date:month': 'M11' },
      { amt: 'm12', 'date:month': 'M12' }
    ]
  },
  {
    //7
    filter: { 'date:month': ['M10'] },
    groupby: ['date:month', 'date:day'],
    records: [
      { amt: 'm10d1', 'date:month': 'M10', 'date:day': 'D1' },
      { amt: 'm11d2', 'date:month': 'M11', 'date:day': 'D2' },
      { amt: 'm12d2', 'date:month': 'M12', 'date:day': 'D2' }
    ]
  },

  {
    //3
    // filter: {},
    groupby: ['partner_id'],
    records: [
      { amt: 'p1', partner_id: 1, partner_id__name: 'Admin' },
      { amt: 'p2', partner_id: 2, partner_id__name: 'P2' }
      //   { amt: 'p3', partner_id: 3, partner_id__name: 'P3' }
    ]
  },

  // {
  //   //4
  //   filter: {},
  //   groupby: ['partner_id', 'date:month'],
  //   records: [
  //     { amt: 'm10p1', 'date:month': 'M10', partner_id: [1, 'Admin'] },
  //     { amt: 'm10p2', 'date:month': 'M10', partner_id: [2, 'P2'] },
  //     { amt: 'm11p1', 'date:month': 'M11', partner_id: [1, 'Admin'] },
  //     { amt: 'm11p2', 'date:month': 'M11', partner_id: [2, 'P2'] },
  //     { amt: 'm12p1', 'date:month': 'M12', partner_id: [1, 'Admin'] },
  //     { amt: 'm12p2', 'date:month': 'M12', partner_id: [2, 'P2'] }
  //   ]
  // },
  {
    //5
    // filter: { partner_id: [1, 3] },
    groupby: ['partner_id', 'company_id'],
    records: [
      {
        amt: 'p1c1',
        partner_id: 1,
        partner_id__name: 'Admin',
        company_id: 1,
        company_id__name: 'Com1'
      }
      //   {
      //     amt: 'p2c1',
      //     partner_id: 2,
      //     partner_id__name: 'P2',
      //     company_id: 1,
      //     company_id__name: 'Com1'
      //   },
      //   {
      //     amt: 'p3c1',
      //     partner_id: 3,
      //     partner_id__name: 'P3',
      //     company_id: 1,
      //     company_id__name: 'Com1'
      //   }
    ]
  }
  // {
  //   //6
  //   // filter: { partner_id: [1, 2] },
  //   groupby: ['partner_id', 'company_id', 'date:month'],
  //   records: [
  //     {
  //       amt: 'm10p1c1',
  //       'date:month': 'M10',
  //       partner_id: [1, 'Admin'],
  //       company_id: [1, 'Com1']
  //     },
  //     {
  //       amt: 'm11p1c1',
  //       'date:month': 'M11',
  //       partner_id: [1, 'Admin'],
  //       company_id: [1, 'Com1']
  //     },
  //     {
  //       amt: 'm12p1c1',
  //       'date:month': 'M12',
  //       partner_id: [1, 'Admin'],
  //       company_id: [1, 'Com1']
  //     },
  //     {
  //       amt: 'm10p2c1',
  //       'date:month': 'M10',
  //       partner_id: [2, 'Admin'],
  //       company_id: [1, 'Com1']
  //     }
  //   ]
  // },
]

export const pivot_data = {
  datalist: data_list,
  // measures: ['amt', 'tax'],
  measures: ['amt'],
  //   rows: ['date:month'],
  rows: ['date:month', 'date:day'],
  // columns: ['partner_id', 'company_id', 'create_date:month']
  columns: ['partner_id', 'company_id']
  //   columns: []
}

export const pivot_fields = {
  amt: { store: true, type: 'float', string: '金额' },
  tax: { store: true, type: 'float', string: '税' },

  date: { store: true, type: 'date', string: '日期' },
  partner_id: { store: true, type: 'many2one', string: '伙伴' },
  company_id: { store: true, type: 'many2one', string: '公司' },
  create_date: { store: true, type: 'date', string: '创建时间' }
}

// const feilds_metadata = () => {
//   const measures = pivot_fields.measures || {}
//   const groupbys = pivot_fields.groupbys || {}
//   const fields = { ...measures, ...groupbys }
//   return fields
// }

// export
// export const rowtree = pivot.rowtree({ fields, ...pivot_data })
// export const coltree = pivot.coltree({ fields, ...pivot_data })
// export const datadict = pivot.datadict({ fields, ...pivot_data })

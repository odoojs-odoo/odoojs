const reports = [
  { id: 2, name: 'Line Race', code: 'odoojs.echarts.line.race,report' },
  { id: 3, name: 'Bar Race', code: 'odoojs.echarts.bar.race,report' },
  { id: 3, name: 'Waterfall', code: 'odoojs.echarts.waterfall,report' },

  // { id: 9, name: 'SO Report', code: 'sale.order,report' },

  // { id: 10, name: 'Bar', code: 'odoojs.echarts.bar,report' },
  // { id: 21, name: 'Line', code: 'odoojs.echarts.line,report' },
  // { id: 22, name: 'Line Stack', code: 'odoojs.echarts.line,stack' },
  // { id: 23, name: 'Line Area', code: 'odoojs.echarts.line,area' },
  // { id: 24, name: 'Stack Area', code: 'odoojs.echarts.line,stack_area' },
  // {
  //   id: 25,
  //   name: 'Gradient Stacked Area',
  //   code: 'odoojs.echarts.line,smooth_stack_area'
  // },
  // { id: 26, name: 'Line Smooth', code: 'odoojs.echarts.line,smooth' },
  // { id: 27, name: 'Line Step', code: 'odoojs.echarts.line,step' },
  // { id: 30, name: 'Pie', code: 'odoojs.echarts.pie,report' },
  // { id: 31, name: 'Pie Ring', code: 'odoojs.echarts.pie,ring' },
  // { id: 32, name: 'Pie Rose', code: 'odoojs.echarts.pie,rose' },
  // { id: 40, name: 'Scatter', code: 'odoojs.echarts.scatter,report' }

  { id: 99999999, name: 'Default Demo', code: 'odoojs.echarts,demo' }
]

export default function useEchartsReport() {
  async function getReports() {
    return reports
  }

  return { getReports }
}

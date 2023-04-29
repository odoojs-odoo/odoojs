const reports = [
  { id: 1, name: 'Default Demo', code: 'odoojs.echarts,demo' },
  { id: 2, name: 'SO Report', code: 'sale.order,report' },
  {
    id: 3,
    name: 'Dynamic Rank Bar',
    code: 'odoojs.echarts.dynamic_rank_bar,report'
  },
  { id: 4, name: 'Bar', code: 'odoojs.echarts.bar,report' },
  { id: 5, name: 'Waterfall', code: 'odoojs.echarts.waterfall,report' },
  { id: 11, name: 'Line', code: 'odoojs.echarts.line,report' },
  { id: 12, name: 'Line Stack', code: 'odoojs.echarts.line,stack' },
  { id: 13, name: 'Line Area', code: 'odoojs.echarts.line,area' },
  { id: 14, name: 'Stack Area', code: 'odoojs.echarts.line,stack_area' },

  { id: 19, name: 'Line Smooth', code: 'odoojs.echarts.line,smooth' },
  { id: 10, name: 'Line Step', code: 'odoojs.echarts.line,step' },
  { id: 20, name: 'Pie', code: 'odoojs.echarts.pie,report' },
  { id: 21, name: 'Pie Ring', code: 'odoojs.echarts.pie,ring' },
  { id: 22, name: 'Pie Rose', code: 'odoojs.echarts.pie,rose' },
  { id: 30, name: 'Scatter', code: 'odoojs.echarts.scatter,report' }
]

export default function useEchartsReport() {
  async function getReports() {
    return reports
  }

  return { getReports }
}

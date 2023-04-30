const reports = [
  // { id: 9, name: 'SO Report', code: 'sale.order,report' },
  // { id: 5, name: 'earth3d', code: 'odoojs.echarts.test,report' },
  //  up no
  //
  // { id: 2, name: 'Line Race', code: 'odoojs.echarts.line.race,report' },
  //  up error
  //
  { id: 3, name: 'Bar Race', code: 'odoojs.echarts.bar.race,report' },
  { id: 3, name: 'Waterfall', code: 'odoojs.echarts.waterfall,report' },
  { id: 4, name: 'dottedbar', code: 'odoojs.echarts.dottedbar,report' },
  { id: 5, name: 'earth3d', code: 'odoojs.echarts.earth3d,report' },

  { id: 120, name: 'gauge', code: 'odoojs.echarts.gauge,report' },
  { id: 121, name: 'gauge progress', code: 'odoojs.echarts.gauge,progress' },
  { id: 122, name: 'gauge progress1', code: 'odoojs.echarts.gauge,progress1' },
  { id: 123, name: 'gauge speed', code: 'odoojs.echarts.gauge,speed' },

  {
    id: 124,
    name: 'gauge speed_stage',
    code: 'odoojs.echarts.gauge,speed_stage'
  },

  { id: 125, name: 'gauge grade', code: 'odoojs.echarts.gauge,grade' },
  {
    id: 126,
    name: 'gauge muiti_title',
    code: 'odoojs.echarts.gauge,muiti_title'
  },
  { id: 127, name: 'gauge ring', code: 'odoojs.echarts.gauge,ring' },

  { id: 130, name: 'pictorialbar', code: 'odoojs.echarts.pictorialbar,report' },
  {
    id: 131,
    name: 'pictorialbar spirits',
    code: 'odoojs.echarts.pictorialbar,spirits'
  },
  { id: 141, name: 'themeriver', code: 'odoojs.echarts.themeriver,report' },
  { id: 142, name: 'themeriver 2', code: 'odoojs.echarts.themeriver,report2' },

  { id: 151, name: 'calendar', code: 'odoojs.echarts.calendar,report' },
  { id: 152, name: 'calendar 2', code: 'odoojs.echarts.calendar,report2' },
  { id: 153, name: 'calendar 3', code: 'odoojs.echarts.calendar,report3' },
  { id: 154, name: 'calendar 4', code: 'odoojs.echarts.calendar,report4' },
  { id: 155, name: 'calendar 5', code: 'odoojs.echarts.calendar,report5' },
  { id: 156, name: 'calendar 6', code: 'odoojs.echarts.calendar,report6' },
  { id: 157, name: 'calendar 7', code: 'odoojs.echarts.calendar,report7' },
  { id: 158, name: 'calendar 8', code: 'odoojs.echarts.calendar,report8' },
  { id: 154, name: 'calendar 4', code: 'odoojs.echarts.calendar,report4' },

  { id: 161, name: 'bar3d', code: 'odoojs.echarts.bar3d,report' },

  { id: 171, name: 'geo', code: 'odoojs.echarts.geo,report' },
  { id: 172, name: 'beef', code: 'odoojs.echarts.geo,beef' },
  { id: 173, name: 'organ', code: 'odoojs.echarts.geo,organ' },
  { id: 174, name: 'flight', code: 'odoojs.echarts.geo,flight' },
  { id: 174, name: 'route', code: 'odoojs.echarts.geo,route' },
  { id: 174, name: 'iceland', code: 'odoojs.echarts.geo,iceland' },
  { id: 174, name: 'Traffic', code: 'odoojs.echarts.geo,traffic' },
  { id: 174, name: 'hk', code: 'odoojs.echarts.geo,hk' },
  { id: 174, name: 'usa', code: 'odoojs.echarts.geo,usa' },

  { id: 30, name: 'Pie', code: 'odoojs.echarts.pie,report' },
  { id: 31, name: 'Doughnut', code: 'odoojs.echarts.pie,doughnut' },
  { id: 31, name: 'Half Doughnut', code: 'odoojs.echarts.pie,half_doughnut' },

  { id: 39, name: 'Pie Rose', code: 'odoojs.echarts.pie,rose' },

  { id: 10, name: 'Bar', code: 'odoojs.echarts.bar,report' },
  { id: 11, name: 'Bar Neg', code: 'odoojs.echarts.bar,neg' },
  { id: 12, name: 'Bar Radial', code: 'odoojs.echarts.bar,radial' },

  { id: 21, name: 'Line', code: 'odoojs.echarts.line,report' },
  { id: 22, name: 'Line Stack', code: 'odoojs.echarts.line,stack' },
  { id: 23, name: 'Line Area', code: 'odoojs.echarts.line,area' },
  { id: 24, name: 'Stack Area', code: 'odoojs.echarts.line,stack_area' },
  {
    id: 25,
    name: 'Gradient Stacked Area',
    code: 'odoojs.echarts.line,smooth_stack_area'
  },
  { id: 26, name: 'Line Smooth', code: 'odoojs.echarts.line,smooth' },
  { id: 27, name: 'Line Step', code: 'odoojs.echarts.line,step' },

  { id: 40, name: 'Scatter', code: 'odoojs.echarts.scatter,report' },
  { id: 41, name: 'Bubble', code: 'odoojs.echarts.scatter,bubble' },
  { id: 50, name: 'Radar', code: 'odoojs.echarts.radar,report' },
  { id: 51, name: 'AQI', code: 'odoojs.echarts.radar,aqi' },
  { id: 51, name: 'Browser', code: 'odoojs.echarts.radar,browser' },
  { id: 60, name: 'Heatmap', code: 'odoojs.echarts.heatmap,report' },

  { id: 70, name: 'Graph', code: 'odoojs.echarts.graph,report' },
  { id: 71, name: 'Graph Cartesian', code: 'odoojs.echarts.graph,cartesian' },

  { id: 80, name: 'sunburst', code: 'odoojs.echarts.sunburst,report' },
  { id: 81, name: 'sunburst book', code: 'odoojs.echarts.sunburst,book' },
  { id: 90, name: 'parallel aqi', code: 'odoojs.echarts.parallel,report' },
  { id: 91, name: 'parallel aqi2', code: 'odoojs.echarts.parallel,aqi' },

  { id: 100, name: 'sankey', code: 'odoojs.echarts.sankey,report' },
  { id: 101, name: 'sankey vertical', code: 'odoojs.echarts.sankey,vertical' },
  { id: 102, name: 'sankey rpt1', code: 'odoojs.echarts.sankey,rpt1' },
  { id: 110, name: 'funnel', code: 'odoojs.echarts.funnel,report' },
  { id: 111, name: 'funnel compare', code: 'odoojs.echarts.funnel,compare' },
  { id: 112, name: 'funnel rpt1', code: 'odoojs.echarts.funnel,rpt1' },

  { id: 99999999, name: 'Default Demo', code: 'odoojs.echarts,demo' }
]

export default function useEchartsReport() {
  async function getReports() {
    return reports
  }

  return { getReports }
}

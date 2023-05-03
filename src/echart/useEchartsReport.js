const reports = [
  // { id: 9, name: 'SO Report', code: 'sale.order,report' },
  // { id: 5, name: 'earth3d', code: 'odoojs.echarts.test,report' },
  // { type: 'geo', name: 'lines.map', code: 'odoojs.echarts.lines.map,report' },
  //  up no
  //

  { type: 'globe', name: 'globe', code: 'odoojs.echarts.globe,report' },
  { type: 'globe', name: 'globe 2', code: 'odoojs.echarts.globe,report2' },
  { type: 'globe', name: 'globe 3', code: 'odoojs.echarts.globe,report3' },
  { type: 'globe', name: 'globe 4', code: 'odoojs.echarts.globe,report4' },
  { type: 'globe', name: 'globe 5', code: 'odoojs.echarts.globe,report5' },

  { type: 'calendar', name: 'cal', code: 'odoojs.echarts.calendar,report' },
  { type: 'calendar', name: 'cal 2', code: 'odoojs.echarts.calendar,report2' },
  { type: 'calendar', name: 'cal 3', code: 'odoojs.echarts.calendar,report3' },
  { type: 'calendar', name: 'cal 4', code: 'odoojs.echarts.calendar,report4' },
  { type: 'calendar', name: 'cal 5', code: 'odoojs.echarts.calendar,report5' },
  { type: 'calendar', name: 'cal 6', code: 'odoojs.echarts.calendar,report6' },
  { type: 'calendar', name: 'cal 7', code: 'odoojs.echarts.calendar,report7' },
  { type: 'calendar', name: 'cal8', code: 'odoojs.echarts.calendar,report8' },

  { type: 'geo', name: 'geo', code: 'odoojs.echarts.geo,report' },
  { type: 'geo', name: 'beef', code: 'odoojs.echarts.geo,beef' },
  { type: 'geo', name: 'organ', code: 'odoojs.echarts.geo,organ' },
  { type: 'geo', name: 'flight', code: 'odoojs.echarts.geo,flight' },
  { type: 'geo', name: 'route', code: 'odoojs.echarts.geo,route' },
  { type: 'geo', name: 'iceland', code: 'odoojs.echarts.geo,iceland' },
  { type: 'geo', name: 'Traffic', code: 'odoojs.echarts.geo,traffic' },
  { type: 'geo', name: 'hk', code: 'odoojs.echarts.geo,hk' },
  { type: 'geo', name: 'usa', code: 'odoojs.echarts.geo,usa' },

  { type: 'line', name: 'Line Race', code: 'odoojs.echarts.line.race,report' },

  { type: 'line', name: 'Line', code: 'odoojs.echarts.line,report' },
  { type: 'line', name: 'Line Smooth', code: 'odoojs.echarts.line,smooth' },
  { type: 'line', name: 'Line Area', code: 'odoojs.echarts.line,area' },
  { type: 'line', name: 'Line Stack', code: 'odoojs.echarts.line,stack' },
  { type: 'line', name: 'Stack Area', code: 'odoojs.echarts.line,stack_area' },
  {
    type: 'line',
    name: 'StackArea2',
    code: 'odoojs.echarts.line,smooth_stack_area'
  },
  { type: 'line', name: 'Line Step', code: 'odoojs.echarts.line,step' },

  { type: 'bar', name: 'Bar', code: 'odoojs.echarts.bar,report' },
  { type: 'bar', name: 'Bar Neg', code: 'odoojs.echarts.bar,neg' },
  { type: 'bar', name: 'Bar Radial', code: 'odoojs.echarts.bar,radial' },
  { type: 'bar', name: 'dottedbar', code: 'odoojs.echarts.dottedbar,report' },
  { type: 'bar', name: 'Bar Race', code: 'odoojs.echarts.bar.race,report' },
  {
    type: 'bar',
    name: 'Waterfall',
    code: 'odoojs.echarts.bar.waterfall,report'
  },

  { type: 'gauge', name: 'gauge', code: 'odoojs.echarts.gauge,report' },
  {
    type: 'gauge',
    name: 'gauge progress',
    code: 'odoojs.echarts.gauge,progress'
  },
  {
    type: 'gauge',
    name: 'gauge progress1',
    code: 'odoojs.echarts.gauge,progress1'
  },
  { type: 'gauge', name: 'gauge speed', code: 'odoojs.echarts.gauge,speed' },

  {
    type: 'gauge',
    name: 'gauge speed_stage',
    code: 'odoojs.echarts.gauge,speed_stage'
  },

  { type: 'gauge', name: 'gauge grade', code: 'odoojs.echarts.gauge,grade' },
  {
    type: 'gauge',
    name: 'gauge muiti_title',
    code: 'odoojs.echarts.gauge,muiti_title'
  },
  { type: 'gauge', name: 'gauge ring', code: 'odoojs.echarts.gauge,ring' },

  {
    type: 'pictorialbar',
    name: 'pictorialbar',
    code: 'odoojs.echarts.pictorialbar,report'
  },
  {
    type: 'pictorialbar',
    name: 'pictorialbar spirits',
    code: 'odoojs.echarts.pictorialbar,spirits'
  },
  {
    type: 'themeriver',
    name: 'themeriver',
    code: 'odoojs.echarts.themeriver,report'
  },
  {
    type: 'themeriver',
    name: 'themeriver 2',
    code: 'odoojs.echarts.themeriver,report2'
  },

  { type: 'bar3d', name: 'bar3d', code: 'odoojs.echarts.bar3d,report' },
  { type: 'bar3d', name: 'bar3d 2', code: 'odoojs.echarts.bar3d,report2' },
  { type: 'bar3d', name: 'bar3d 3', code: 'odoojs.echarts.bar3d,report3' },
  { type: 'bar3d', name: 'bar3d 4', code: 'odoojs.echarts.bar3d,report4' },
  { type: 'bar3d', name: 'bar3d 5', code: 'odoojs.echarts.bar3d,report5' },
  { type: 'bar3d', name: 'bar3d 6', code: 'odoojs.echarts.bar3d,report6' },
  { type: 'bar3d', name: 'bar3d 7', code: 'odoojs.echarts.bar3d,report7' },

  {
    type: 'scatter3d',
    name: 'scatter3d',
    code: 'odoojs.echarts.scatter3d,report'
  },
  {
    type: 'scatter3d',
    name: 'scatter3d 2',
    code: 'odoojs.echarts.scatter3d,report2'
  },

  {
    type: 'scatter3d',
    name: 'scatter3d 3',
    code: 'odoojs.echarts.scatter3d,report3'
  },

  {
    type: 'surface',
    name: 'surface',
    code: 'odoojs.echarts.surface,report'
  },

  {
    type: 'surface',
    name: 'surface 2',
    code: 'odoojs.echarts.surface,report2'
  },

  {
    type: 'surface',
    name: 'surface 3',
    code: 'odoojs.echarts.surface,report3'
  },

  { type: 'pie', name: 'Pie', code: 'odoojs.echarts.pie,report' },
  { type: 'pie', name: 'Doughnut', code: 'odoojs.echarts.pie,doughnut' },
  {
    type: 'pie',
    name: 'Half Doughnut',
    code: 'odoojs.echarts.pie,half_doughnut'
  },
  { type: 'pie', name: 'Pie Rose', code: 'odoojs.echarts.pie,rose' },

  { type: 'scatter', name: 'Scatter', code: 'odoojs.echarts.scatter,report' },
  { type: 'scatter', name: 'Bubble', code: 'odoojs.echarts.scatter,bubble' },

  { type: 'radar', name: 'Radar', code: 'odoojs.echarts.radar,report' },
  { type: 'radar', name: 'AQI', code: 'odoojs.echarts.radar,aqi' },
  { type: 'radar', name: 'Browser', code: 'odoojs.echarts.radar,browser' },

  { type: 'heatmap', name: 'Heatmap', code: 'odoojs.echarts.heatmap,report' },

  { type: 'graph', name: 'Graph', code: 'odoojs.echarts.graph,report' },
  {
    type: 'graph',
    name: 'Graph Cartesian',
    code: 'odoojs.echarts.graph,cartesian'
  },

  {
    type: 'sunburst',
    name: 'sunburst',
    code: 'odoojs.echarts.sunburst,report'
  },
  {
    type: 'sunburst',
    name: 'sunburst book',
    code: 'odoojs.echarts.sunburst,book'
  },
  {
    type: 'parallel',
    name: 'parallel aqi',
    code: 'odoojs.echarts.parallel,report'
  },
  {
    type: 'parallel',
    name: 'parallel aqi2',
    code: 'odoojs.echarts.parallel,aqi'
  },

  { type: 'sankey', name: 'sankey', code: 'odoojs.echarts.sankey,report' },
  {
    type: 'sankey',
    name: 'sankey vertical',
    code: 'odoojs.echarts.sankey,vertical'
  },
  { type: 'sankey', name: 'sankey rpt1', code: 'odoojs.echarts.sankey,rpt1' },
  { type: 'funnel', name: 'funnel', code: 'odoojs.echarts.funnel,report' },
  {
    type: 'funnel',
    name: 'funnel compare',
    code: 'odoojs.echarts.funnel,compare'
  },
  { type: 'funnel', name: 'funnel rpt1', code: 'odoojs.echarts.funnel,rpt1' },

  { type: 'tree', name: 'tree', code: 'odoojs.echarts.tree,report' },
  { type: 'tree', name: 'tree 2', code: 'odoojs.echarts.tree,report2' },
  { type: 'tree', name: 'tree 3', code: 'odoojs.echarts.tree,report3' },
  { type: 'tree', name: 'tree 4', code: 'odoojs.echarts.tree,report4' },
  { type: 'tree', name: 'tree 4', code: 'odoojs.echarts.tree,report5' },
  { type: 'tree', name: 'tree 4', code: 'odoojs.echarts.tree,report6' },
  { type: 'tree', name: 'tree 4', code: 'odoojs.echarts.tree,report7' },

  { type: 'treemap', name: 'treemap', code: 'odoojs.echarts.treemap,report' },
  {
    type: 'treemap',
    name: 'treemap 2',
    code: 'odoojs.echarts.treemap,report2'
  },
  {
    type: 'treemap',
    name: 'treemap 3',
    code: 'odoojs.echarts.treemap,report3'
  },

  { id: 99999999, name: 'Default Demo', code: 'odoojs.echarts,demo' }
]

export default function useEchartsReport() {
  async function getReports(type) {
    if (!type) {
      return reports
    }
    return reports.filter(item => item.type === type)
  }

  return { getReports }
}

const echarts_menus_raw = [
  { id: 'echarts.globe', name: 'globe', action: 'globe' },
  { id: 'echarts.calendar', name: 'calendar', action: 'calendar' },
  { id: 'echarts.geo', name: 'geo', action: 'geo' },

  { id: 'echarts.bar', name: 'bar', action: 'bar' },
  { id: 'echarts.bar3d', name: 'bar3d', action: 'bar3d' },
  { id: 'echarts.line', name: 'line', action: 'line' },
  { id: 'echarts.funnel', name: 'funnel', action: 'funnel' },
  { id: 'echarts.gauge', name: 'gauge', action: 'gauge' },
  { id: 'echarts.graph', name: 'graph', action: 'graph' },
  { id: 'echarts.heatmap', name: 'heatmap', action: 'heatmap' },
  { id: 'echarts.map3d', name: 'map3d', action: 'map3d' },
  { id: 'echarts.parallel', name: 'parallel', action: 'parallel' },
  { id: 'echarts.pie', name: 'pie', action: 'pie' },
  { id: 'echarts.pictorialbar', name: 'pictorialbar', action: 'pictorialbar' },
  { id: 'echarts.radar', name: 'radar', action: 'radar' },
  { id: 'echarts.sankey', name: 'sankey', action: 'sankey' },
  { id: 'echarts.scatter', name: 'scatter', action: 'scatter' },
  { id: 'echarts.scatter3d', name: 'scatter3d', action: 'scatter3d' },
  { id: 'echarts.sunburst', name: 'sunburst', action: 'sunburst' },
  { id: 'echarts.surface', name: 'surface', action: 'surface' },
  { id: 'echarts.themeriver', name: 'themeriver', action: 'themeriver' },
  { id: 'echarts.tree', name: 'tree', action: 'tree' },
  { id: 'echarts.treemap', name: 'treemap', action: 'treemap' }
]

const echarts_menus = echarts_menus_raw.map(item => {
  return { ...item, router: '1', path: '/echarts/type' }
})

export const local_menus_tree = [
  {
    id: 'echarts.root',
    name: 'Echarts',
    children: [...echarts_menus]
  }
]

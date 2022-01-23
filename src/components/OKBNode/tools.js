const search_by_class = (node, classItem) => {
  let result = []
  if (((node.attrs || {}).class || '').includes(classItem)) {
    result.push(node)
  }

  for (const item of node.children || []) {
    const childs = search_by_class(item, classItem)
    result = [...result, ...childs]
  }

  return result
}

export const search_dropdown_menu = node => {
  return search_by_class(node, 'dropdown-menu')
}

export const search_manage_settings = node => {
  return search_by_class(node, 'o_kanban_card_manage_settings')
}

export const search_settings = node => {
  return search_by_class(node, 'o_kanban_card_settings')
}

const _children_remove_by_class = (children, classItem) => {
  return children
    .filter(item => !((item.attrs || {}).class || '').includes(classItem))
    .map(item => {
      if (!item.children || !item.children.length) return item
      else
        return {
          ...item,
          children: _children_remove_by_class(item.children, classItem)
        }
    })
}

export const node_remove_dropdown_menu = node => {
  return {
    ...node,
    children: _children_remove_by_class(node.children, 'dropdown-menu')
  }
}

const Color_Array = [
  'No color',
  'Red',
  'Orange',
  'Yellow',
  'Light blue',
  'Dark purple',
  'Salmon pink',
  'Medium blue',
  'Dark blue',
  'Fushia',
  'Green',
  'Purple'
]

export const Color_Nodes = Color_Array.map((it, index) => {
  return {
    tagName: 'li',
    attrs: {
      // class: `oe_kanban_color_${index}`,
    },
    children: [
      {
        tagName: 'a',
        attrs: {
          role: 'menuitem',
          ['data-color']: `${index}`,
          class: `oe_kanban_color_${index}`,
          // title: it,
          ['aria-label']: it
        }
      }
    ]
  }
})

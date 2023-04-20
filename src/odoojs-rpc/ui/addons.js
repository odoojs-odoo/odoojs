function make_tree(views) {
  function find_children(all, node) {
    const filter_fn = !node
      ? key => !all[key].inherit_id
      : key => all[key].inherit_id === node
    return Object.keys(all)
      .filter(filter_fn)
      .reduce((acc, key) => {
        acc[key] = find_children(all, key)
        return acc
      }, {})
  }

  const tree = find_children(views, null)

  return tree
}

function merge_dict(dst, src) {
  function getkeys() {
    const dstkeys = Object.keys(dst).reduce((acc, cur, index) => {
      acc[cur] = index + 1
      return acc
    }, {})
    const srckeys = Object.keys(src).reduce((acc, cur, index) => {
      acc[cur] = index + 1
      return acc
    }, {})

    const keys = Object.keys({ ...dstkeys, ...srckeys }).reduce((acc, cur) => {
      const get_last = () => {
        const lt = Object.keys(acc)
          .filter(item => acc[item][1] && acc[item][1] < srckeys[cur])
          .map(item => acc[item][0])
        return !lt.length ? 0 : Math.max(...lt)
      }

      const left = dstkeys[cur] || get_last()
      const right = srckeys[cur] || 0
      acc[cur] = [left, right]
      return acc
    }, {})

    const keys2 = Object.keys(keys).map(key => [key, ...keys[key]])
    keys2.sort((a, b) => a[1] - b[1])
    const keys3 = keys2.map(item => item[0])
    return keys3
  }

  const keys = getkeys()

  const res = keys.reduce((acc, key) => {
    const in_left = key in dst
    const in_right = key in src
    const left = dst[key]
    const right = src[key]

    if (!in_left) {
      if (in_right) {
        acc[key] = right
      }
    } else {
      if (!in_right) {
        acc[key] = left
      } else {
        if (typeof right !== 'object') {
          acc[key] = right
        } else if (Array.isArray(right)) {
          acc[key] = right
        } else if (typeof left !== 'object') {
          acc[key] = right
        } else if (Array.isArray(left)) {
          acc[key] = right
        } else {
          acc[key] = merge_dict({ ...left }, { ...right })
        }
      }
    }

    // if (!left) {
    //   acc[key] = right
    // } else if (!right) {
    //   acc[key] = right
    // } else if (typeof right !== 'object') {
    //   acc[key] = right
    // } else if (Array.isArray(right)) {
    //   acc[key] = right
    // } else if (typeof left !== 'object') {
    //   acc[key] = right
    // } else if (Array.isArray(left)) {
    //   acc[key] = right
    // } else {
    //   acc[key] = 'call merge_dict' // merge_dict({ ...left }, { ...right })
    // }
    return acc
  }, {})
  return res
}

function merge_odoo_view(dst, src) {
  const dst2 = { ...src, ...dst }
  delete dst2.inherit_id
  // eslint-disable-next-line no-unused-vars
  const { buttons, inherit_id, priority, xml_id, id, ...src2 } = src

  return merge_dict(dst2, { ...src2 })
}

function merge_tree(views, tree) {
  function tree2list(tree) {
    function fn(tree) {
      return Object.keys(tree).reduce((acc, key) => {
        return { ...acc, [key]: 1, ...fn(tree[key]) }
      }, {})
    }

    return Object.keys(fn(tree))
  }

  const list = tree2list(tree)
  // console.log('list,', list)
  const res = list.reduce((acc, key) => {
    acc = merge_odoo_view(acc, views[key])
    return acc
  }, {})

  return list.reduce((acc, key) => {
    const todo = { ...res }
    const inherit_id = views[key].inherit_id
    if (inherit_id) {
      todo.inherit_id = inherit_id
    }
    acc[key] = todo
    return acc
  }, {})
}

function merge_views(views) {
  const tree = make_tree(views)

  return Object.keys(tree).reduce((acc, key) => {
    const acc2 = merge_tree(views, { [key]: tree[key] })
    acc = { ...acc, ...acc2 }
    return acc
  }, {})
}

export class Addons {
  constructor() {}

  static set_lang(lang, force) {
    // console.log('set lang,1,', this.addons_register)
    if (!force && this.lang_set && this.lang_set === lang) {
      return
    }

    const addons_data = this.addons_register
    const { l10n = {} } = addons_data

    const en_US = l10n.en_US || {}
    const local_patch = l10n[lang] || {}
    // console.log('set lang,en_US,', en_US)
    // console.log('set lang,local_patch,', local_patch)

    const local = merge_dict(en_US, local_patch)

    const { actions_views, models_for_fields, app } = local

    const actions_views2 = this.split_actions(actions_views)

    this.addons_register = {
      ...this.addons_register,
      ...actions_views2,
      models_for_fields,
      app
    }

    // console.log(this.addons_register)
    this.lang_set = lang
  }

  static load_addons(addons_dict, modules_installed) {
    const { odoo_addons, ...other_addons } = addons_dict
    const addons_list = [odoo_addons, ...Object.values(other_addons)]

    const res = this.load_addons_all(addons_list)

    const {
      actions_views: actions_views_todo = {},
      models_for_fields = {},
      models = {},
      app = {}
    } = res
    const { l10n: l10n_todo = {} } = res

    // console.log(modules_installed, res)
    const actions_views_done = Object.keys(actions_views_todo)
      .filter(item => modules_installed.includes(item))
      .reduce((acc, mod) => {
        acc[mod] = actions_views_todo[mod]
        return acc
      }, {})

    function filter_menus(ms) {
      return Object.keys(ms).reduce((acc, mn) => {
        const item = ms[mn]
        if (item.action) {
          if (modules_installed.includes(item.action.split('.')[0])) {
            acc[mn] = item
          }
        } else {
          const child = filter_menus(item.children || {})
          acc[mn] = { ...item, children: child }
        }

        return acc
      }, {})
    }

    const menus = actions_views_todo.menus
    const menus2 = filter_menus(menus)
    // console.log(modules_installed, menus, menus2)

    actions_views_done.menus = menus2

    const l10n_done = Object.keys(l10n_todo).reduce((lns, ln) => {
      const one_ln = l10n_todo[ln]

      if (one_ln.actions_views) {
        const actions_views_ln = Object.keys(one_ln.actions_views)
          .filter(item => [...modules_installed, 'menus'].includes(item))
          .reduce((acc, mod) => {
            acc[mod] = one_ln.actions_views[mod]
            return acc
          }, {})

        lns[ln] = { ...one_ln, actions_views: { ...actions_views_ln } }
      } else {
        lns[ln] = one_ln
      }

      return lns
    }, {})

    // console.log(modules_installed, actions_views_todo, actions_views_done)
    // console.log(modules_installed, l10n_todo, l10n_done)

    const actions_views = actions_views_done
    const l10n = l10n_done

    const actions_views2 = this.split_actions(actions_views)

    const done = { ...actions_views2 }

    const todo = {
      ...done,
      actions_views,
      models_for_fields,
      models,
      app,
      l10n: { ...l10n, en_US: { actions_views, models_for_fields, app } }
    }

    this.addons_register = todo
  }

  static load_addons_all(addons_list) {
    return addons_list.reduce((acc, files) => {
      const one = this.load_addons_one(files)
      const { actions_views = {}, models_for_fields = {}, models = {} } = one
      const { app = {} } = one

      // console.log(one)
      acc.actions_views = {
        ...(acc.actions_views || {}),
        ...actions_views
      }

      acc.models_for_fields = {
        ...(acc.models_for_fields || {}),
        ...models_for_fields
      }

      acc.models = { ...(acc.models || {}), ...models }
      acc.app = { ...(acc.app || {}), ...app }

      const { l10n = {} } = one
      const l10n22 = this.load_addons_for_l10n(acc.l10n || {}, l10n)
      acc.l10n = { ...l10n22 }
      return acc
    }, {})
  }

  static load_addons_for_l10n(l10n, l10n_from) {
    const keys = Object.keys({ ...l10n, ...l10n_from })

    return keys.reduce((acc, lang) => {
      const old_lang = l10n[lang] || {}
      const new_lang = l10n_from[lang] || {}

      const old_actions_views = old_lang.actions_views || {}
      const new_actions_views = new_lang.actions_views || {}

      const old_fields = old_lang.models_for_fields || {}
      const new_fields = new_lang.models_for_fields || {}

      const old_app = old_lang.app || {}
      const new_app = new_lang.app || {}

      acc[lang] = {
        actions_views: { ...old_actions_views, ...new_actions_views },
        models_for_fields: { ...old_fields, ...new_fields },
        app: { ...old_app, ...new_app }
      }
      return acc
    }, {})
  }

  static load_addons_one(AddonsFiles) {
    return AddonsFiles.keys().reduce((acc, modulePath) => {
      const value = AddonsFiles(modulePath)
      const paths = modulePath.split('/')

      const type = paths[1]
      if (type === 'action') {
        const module_name = paths[2]
        const one_addons = this.load_one_action(
          acc.actions_views || {},
          value.default,
          module_name
        )
        acc.actions_views = one_addons
      } else if (type === 'fields') {
        const one_addons = this.load_one_fields(
          acc.models_for_fields || {},
          value.default
        )
        acc.models_for_fields = one_addons
      } else if (type === 'models') {
        acc.models = { ...(acc.models || {}), ...value.default }
      } else if (type === 'app') {
        // console.log(paths, value.default)
        acc.app = { ...(acc.app || {}), ...value.default }
      } else if (type === 'l10n') {
        const lang = paths[2]
        const type2 = paths[3]
        const module_name = paths[4]

        if (!acc.l10n) {
          acc.l10n = {}
        }

        if (!acc.l10n[lang]) {
          acc.l10n[lang] = {}
        }
        if (!acc.l10n[lang].actions_views) {
          acc.l10n[lang].actions_views = {}
        }

        if (!acc.l10n[lang].models_for_fields) {
          acc.l10n[lang].models_for_fields = {}
        }

        if (!acc.l10n[lang].app) {
          acc.l10n[lang].app = {}
        }

        if (type2 === 'action') {
          const old = acc.l10n[lang].actions_views
          const one_addons = this.load_one_action(
            old,
            value.default,
            module_name
          )
          acc.l10n[lang].actions_views = one_addons
        } else if (type2 === 'fields') {
          const old = acc.l10n[lang].models_for_fields
          const one_addons = this.load_one_fields(old, value.default)
          acc.l10n[lang].models_for_fields = one_addons
        } else if (type2 === 'app') {
          acc.l10n[lang].app = { ...value.default }
        }
      } else {
        console.log(paths, value.default)
      }

      return acc
    }, {})
  }

  static load_one_fields(models, models_from) {
    const src = Object.keys(models_from).reduce((acc, model_name) => {
      const metas = models_from[model_name]
      const dest = models[model_name] || {}
      acc[model_name] = { ...dest, ...metas }
      return acc
    }, {})

    return { ...models, ...src }
  }

  static load_one_action(modules, records1, module_name) {
    if (!records1) {
      return { ...modules }
    }

    return {
      ...modules,
      [module_name]: { ...modules[module_name], ...records1 }
    }
  }

  static load_one_action2(records1, module_name) {
    if (!records1) {
      return {}
    }

    const patch_xml_id = (module_name, xml_name, one) => {
      const xml_id = `${module_name}.${xml_name}`
      return { ...one, xml_id, id: xml_id }
    }

    const patch_module_name = (module_name, str) => {
      if (!str) {
        return undefined
      } else {
        const len = str.split('.').length
        if (len === 1) {
          return `${module_name}.${str}`
        } else {
          return str
        }
      }
    }

    const load_menu_childs = (module_name, menu) => {
      const children1 = menu.children || {}

      const children = Object.keys(children1).reduce((acc, cur) => {
        const one = patch_xml_id(module_name, cur, children1[cur])
        one.parent = menu.xml_id
        one._odoo_model = 'ir.ui.menu'
        const acc2 = load_menu(module_name, one)
        return { ...acc, ...acc2 }
      }, {})

      return children
    }

    const load_menu = (module_name, menu) => {
      const children = load_menu_childs(module_name, menu)

      const me = {
        ...menu,
        sequence: menu.sequence !== undefined ? menu.sequence : 10
      }
      delete me.children

      const parent2 = patch_module_name(module_name, me.parent)
      const action2 = patch_module_name(module_name, me.action)
      if (parent2) me.parent = parent2
      if (action2) me.action = action2

      return { [menu.xml_id]: me, ...children }
    }

    const load_view = one => {
      const one2 = {
        ...one,
        buttons: { ...(one.buttons || {}) },
        priority: one.priority || 16
      }

      if (one2.buttons.create === undefined) one2.buttons.create = true
      if (one2.buttons.edit === undefined) one2.buttons.edit = true
      if (one2.buttons.delete === undefined) one2.buttons.delete = true

      return one2
    }

    const load_action = (module_name, one) => {
      const one2 = { ...one, views: { ...(one.views || {}) } }

      const search_view_id2 = patch_module_name(
        module_name,
        one2.search_view_id
      )
      if (search_view_id2) one2.search_view_id = search_view_id2

      const { view_mode = ['tree', 'kanban', 'form'], views = {} } = one
      view_mode.forEach(mode => {
        one2.views[mode] = patch_module_name(module_name, views[mode])
      })

      return one2
    }

    return Object.keys(records1).reduce((acc, cur) => {
      const one = patch_xml_id(module_name, cur, records1[cur])

      if (one._odoo_model === 'ir.ui.menu') {
        const menus = load_menu(module_name, one)
        // console.log('menus,', menus)
        acc = { ...acc, ...menus }
      } else if (one._odoo_model === 'ir.actions.act_window') {
        const one2 = load_action(module_name, one)
        acc = { ...acc, [one.xml_id]: one2 }
      } else if (one._odoo_model === 'ir.ui.view') {
        const one2 = load_view(one)
        acc = { ...acc, [one.xml_id]: one2 }
      } else {
        acc[one.xml_id] = one
      }

      return acc
    }, {})
  }

  static split_actions(modules) {
    const res = Object.keys(modules).reduce((acc, mod) => {
      const res2 = this.load_one_action2(modules[mod], mod)
      return { ...acc, ...res2 }
    }, {})

    return this.split_actions2(res)
  }

  static split_actions2(res) {
    const filter_fn = (res, odoo_model) => {
      return Object.keys(res)
        .filter(item => res[item]._odoo_model === odoo_model)
        .reduce((acc, cur) => {
          return { ...acc, [cur]: res[cur] }
        }, {})
    }

    const menus = filter_fn(res, 'ir.ui.menu')
    const actions = filter_fn(res, 'ir.actions.act_window')
    const views_to_merge = filter_fn(res, 'ir.ui.view')
    const views = merge_views(views_to_merge)
    // test(views_to_merge)
    // const views = views_to_merge

    const view_get_first = (res_model, mode) => {
      const res = Object.values(views)
        .filter(item => item.model === res_model && item.type === mode)
        .sort((a, b) => a.priority - b.priority)

      if (res.length) {
        return res[0].xml_id
      } else {
        return undefined
      }
    }

    const actions2 = Object.values(actions).reduce((acc, one) => {
      const one2 = { ...one, views: { ...(one.views || {}) } }
      const {
        res_model,
        view_mode = ['tree', 'kanban', 'form'],
        views = {}
      } = one

      view_mode.forEach(mode => {
        const view1 = views[mode]

        if (view1) {
          one2.views[mode] = view1
        } else {
          const view_1st = view_get_first(res_model, mode)
          if (view_1st) {
            one2.views[mode] = view_1st
          } else {
            if (mode === 'kanban') {
              one2.views[mode] = view_get_first(res_model, 'tree')
            } else {
              one2.views[mode] = view_1st
            }
          }
        }

        // one2.views[mode] = views[mode] || view_get_first(res_model, mode)
      })

      one2.views.search =
        one.search_view_id || view_get_first(res_model, 'search')

      // console.log(one2.xml_id, one2)

      acc[one.xml_id] = one2

      return acc
    }, {})

    const menus2 = Object.values(menus)
      .sort((a, b) => a.sequence - b.sequence)
      .filter(item => item.active !== false)
      .reduce((acc, cur) => {
        acc[cur.xml_id] = cur
        return acc
      }, {})

    return { menus: menus2, actions: actions2, views }
  }
}

Addons.addons_register = {}

Addons.lang_set = undefined

//
// function test(views) {
//   // const list = [
//   //   // 'base.view_partner_form',
//   //   // 'product.view_partner_form',
//   //   'base.view_country_group_form',
//   //   'product.inherits_website_sale_country_group_form'
//   // ]

//   // const views2 = list.reduce((acc, key) => {
//   //   acc[key] = views[key]
//   //   return acc
//   // }, {})

//   // console.log(views2)
//   console.log('1,', time(), views)

//   const views3 = merge_views(views)

//   console.log('ok', time(), views3)
// }

// function time() {
//   const dt = new Date()
//   const min = dt.getMinutes()
//   const sec = dt.getSeconds()
//   const ms = dt.getMilliseconds()

//   return [min, sec, ms]
// }

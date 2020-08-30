/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
import api from '@/api'

const baseModel = {
  async _vuexcall(method, payload, args = []) {
    const { _model, _method = method } = payload
    const payload2 = { ...payload }
    delete payload2._model
    delete payload2._method
    delete payload2._config

    const mew_args = args.map((item) => {
      delete payload2[item]
      const pm = payload[item]
      if (item === 'id') {
        return parseInt(pm)
      } else {
        return pm
      }
    })

    const Model = api.env(_model)

    // console.log('xxxxx, _vuexcall, ', _model, _method, mew_args, payload2)
    // console.log('xxxxx, _vuexcall, ', Model)
    // console.log('xxxxx, _vuexcall, ', Model[_method])

    if (Model[_method]) {
      return await Model[_method](...mew_args, payload2)
    } else {
      return await Model.call(_method, mew_args, payload2)
    }
  },

  // async call(payload) {
  //   return this._vuexcall('call', payload, ['method', 'args', 'kwargs'])
  // },

  async get_options(payload) {
    const { _config = {} } = payload
    const { optionsForForm = {} } = _config

    const res = await this._vuexcall('get_options', {
      ...optionsForForm,
      ...payload
    })

    const res2 = Object.keys(res).reduce((acc, cur) => {
      const { text: text_fn } = optionsForForm[cur] || {}
      if (text_fn) {
        acc[cur] = res[cur].map((item) => {
          return { ...item, text: text_fn(item) }
        })
      } else {
        acc[cur] = res[cur]
      }

      return acc
    }, {})

    return res2
  },

  async search_count(payload) {
    // console.log('xxxxx, in baseModel search', payload)
    return this._vuexcall('search_count', { ...payload })
  },

  async search(payload) {
    // console.log('xxxxx, in baseModel search', payload)
    const { _config = {}, fields, order } = payload
    const { fieldsForSearch = {}, orderForSearch } = _config
    const fields2 = fields || fieldsForSearch
    const order2 = order || orderForSearch

    return this._vuexcall('search', {
      ...payload,
      fields: fields2,
      order: order2
    })
  },

  async search_one(payload) {
    // console.log('xxxxx, in baseModel browse_one', payload)
    const { _config = {}, fields } = payload
    const { fieldsForBrowse = {} } = _config
    const fields2 = fields || fieldsForBrowse
    return this._vuexcall('search_one', { ...payload, fields: fields2 })
  },

  async browse_one(payload) {
    // console.log('xxxxx, in baseModel browse_one', payload)
    const { _config = {}, fields } = payload
    const { fieldsForBrowse = {} } = _config
    const fields2 = fields || fieldsForBrowse
    return this._vuexcall('browse_one', { ...payload, fields: fields2 }, ['id'])
  },

  async unlink(payload) {
    // console.log('xxxxx, in baseModel write', payload)
    return this._vuexcall('unlink', payload, ['id'])
  },
  async write(payload) {
    // console.log('xxxxx, in baseModel write', payload)
    const { _config = {}, fields } = payload
    const { fieldsForBrowse = {} } = _config
    const fields2 = fields || fieldsForBrowse
    return this._vuexcall('write', { ...payload, fields: fields2 }, ['values'])
  },

  async create(payload) {
    // console.log('xxxxx, in baseModel browse_one', payload)
    const { _config = {}, fields } = payload
    const { fieldsForBrowse = {} } = _config
    const fields2 = fields || fieldsForBrowse
    return this._vuexcall('create', { ...payload, fields: fields2 }, ['values'])
  }
  // async write_like(payload) 等 若干函数 在移动端有
}

const state = {
  // dataCount: 0,
  // dataList: [],
  // dataDict: {},
  // formData: {},
  // options: {}
}

const mutations = {
  SET_DataCount: (state, dataCount) => {
    state.dataCount = dataCount
  },

  SET_DataList: (state, dataList) => {
    state.dataList = dataList
  },

  SET_DataDict: (state, row) => {
    state.dataDict = row
  },

  SET_Options: (state, payload) => {
    state.options = { ...payload }
  },

  UPDATE_FormData: (state, row) => {
    state.formData = { ...state.formData, ...row }
  },

  SET_FormData: (state, payload) => {
    state.formData = { ...payload }
  }
}

const actions_api = {
  async _search_count({ commit, state, dispatch }, payload) {
    // console.log('xxxxx, in search', payload)
    const res = await baseModel.search_count(payload)

    commit('SET_DataCount', res)
    return new Promise((resolve) => {
      resolve(res)
    })
  },

  async search_count({ commit, state, dispatch }, payload) {
    return dispatch('_search_count', payload)
  },

  async _search({ commit, state, dispatch }, payload) {
    // console.log('xxxxx, in search', payload)
    const dataList = await baseModel.search(payload)
    commit('SET_DataList', dataList)
    return new Promise((resolve) => {
      resolve(dataList)
    })
  },

  async search({ commit, state, dispatch }, payload) {
    return dispatch('_search', payload)
  },

  async _search_one({ commit, state, dispatch }, payload) {
    const record = await baseModel.search_one(payload)
    commit('SET_DataDict', record)
    return new Promise((resolve) => {
      resolve(record)
    })
  },
  async search_one({ commit, state, dispatch }, payload) {
    return dispatch('_search_one', payload)
  },

  async browse_one({ commit, state, dispatch }, payload) {
    return dispatch('_browse_one', payload)
  },
  async _browse_one({ commit, state, dispatch }, payload) {
    // console.log('_browse_one', payload)
    const {
      _config: { fieldsForEdit }
    } = payload

    const record = await baseModel.browse_one(payload)
    commit('SET_DataDict', record)
    const rec = Object.keys(record).reduce((acc, cur) => {
      if (cur.split('__').length === 1) {
        if (!fieldsForEdit) {
          acc[cur] = record[cur]
        } else {
          if (cur === 'id') {
            acc[cur] = record[cur]
          } else if (Object.keys(fieldsForEdit).includes(cur)) {
            acc[cur] = record[cur]
          }
        }
      }
      return acc
    }, {})

    commit('SET_FormData', rec)
    return new Promise((resolve) => {
      resolve(record)
    })
  },

  async _unlink({ commit, state, dispatch }, payload) {
    const record = await baseModel.unlink(payload)
    commit('SET_DataDict', record)
    return new Promise((resolve) => {
      resolve(record)
    })
  },
  async unlink({ commit, state, dispatch }, payload) {
    return dispatch('_unlink', payload)
  },

  async _write({ commit, state, dispatch }, payload) {
    const record = await baseModel.write(payload)
    // console.log('xxx,_wrtie ok ,', record)
    commit('SET_DataDict', record)
    return new Promise((resolve) => {
      resolve(record)
    })
  },
  async write({ commit, state, dispatch }, payload) {
    return dispatch('_write', payload)
  },

  async _create({ commit, state, dispatch }, payload) {
    const record = await baseModel.create(payload)
    commit('SET_DataDict', record)
    return new Promise((resolve) => {
      resolve(record)
    })
  },

  async create({ commit, state, dispatch }, payload) {
    return dispatch('_create', payload)
  },

  async _getOptions({ commit, state, dispatch }, payload) {
    const ops = await baseModel.get_options(payload)
    commit('SET_Options', ops)
    return new Promise((resolve) => {
      resolve(ops)
    })
  },

  async getOptions({ commit, state, dispatch }, payload) {
    return dispatch('_getOptions', payload)
  }
}

const actions = {
  async _setDict({ commit, state, dispatch }, values) {
    commit('SET_DataDict', values)
    return new Promise((resolve) => {
      resolve(values)
    })
  },

  async setDict({ commit, state, dispatch }, values) {
    console.log('setDict', values)
    return dispatch('_setDict', values)
  },

  async _initForm({ commit, state, dispatch }, values) {
    // console.log('_initForm', payload)
    commit('SET_FormData', values)
    return new Promise((resolve) => {
      resolve(values)
    })
  },

  // project 用不到了. 因为 创建和编辑前,  form 先处理过了
  // 其他到 form 表单 是否也需要 改变? TBD
  async initForm({ commit, state, dispatch }, payload) {
    return dispatch('_initForm', payload)
  },

  async _setForm({ commit, state, dispatch }, values) {
    commit('SET_FormData', values)
    return new Promise((resolve) => {
      resolve(values)
    })
  },

  async setForm({ commit, state, dispatch }, values) {
    console.log('setForm', values)
    return dispatch('_setForm', values)
  },

  async updateForm({ commit, state, dispatch }, values) {
    commit('UPDATE_FormData', values)
    return new Promise((resolve) => {
      resolve(values)
    })
  }
}

const creator = (config, module = {}) => {
  // console.log('module src: ', module)

  const _config = typeof config === 'string' ? { model: config } : config
  // console.log('config src: ', _config)

  const { model } = _config

  const {
    namespaced = true,
    state: state_extend = {},
    mutations: mutations_extend = {},
    actions: actions_extend = {}
  } = module
  const actions_api2 = Object.keys(actions_api).reduce((acc, cur) => {
    acc[cur] = (vuex2, payload = {}) => {
      // console.log('xxxxx, in creator')
      return actions_api[cur](vuex2, { _model: model, _config, ...payload })
    }
    return acc
  }, {})

  return {
    namespaced,
    state: {
      dataCount: 0,
      dataList: [],
      dataDict: {},
      formData: {},
      options: {},
      ...state,
      ...state_extend,
      _config
    },
    mutations: { ...mutations, ...mutations_extend },
    actions: { ...actions, ...actions_api2, ...actions_extend }
  }
}

export default creator

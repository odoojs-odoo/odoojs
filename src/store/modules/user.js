/* eslint-disable no-unused-vars */
import api from '@/api'

import { getToken } from '@/utils/auth'

const state = {
  token: getToken(),

  partner: {},
  image_url: undefined,
  uid: undefined,
  partner_id: undefined,
  name: undefined,
  session_info: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },

  SET_ME: (state, { partner, uid, partner_id }) => {
    state.partner = { ...partner }

    state.image_url = partner.image_128

    state.isEmployee = partner.employee
    state.uid = uid
    state.partner_id = partner_id
    state.name = partner.name
  },

  SET_IMAGE: (state, image_url) => {
    state.image_url = image_url
  },

  SET_UID: (state, { uid }) => {
    state.uid = uid
  },

  SET_session_info: (state, session_info = {}) => {
    state.session_info = { ...session_info }
  }
}

const actions = {
  async getSessionInfo({ commit, state, dispatch }) {
    //
    const session = await api.rpc.get_session_info(state.token)
    console.log('me getSessionInfo', session)

    commit('SET_UID', { uid: session.uid })
    commit('SET_session_info', session)

    return new Promise((resolve, reject) => {
      resolve(session)
    })
  },

  async getInfo({ commit, state, dispatch }) {
    const { uid, partner_id } = await api.get_userinfo()
    // console.log('me getInfo', uid, partner_id)
    const Ptn = api.env('res.partner')
    const partner = await Ptn.browse_one(partner_id, {
      fields: { name: null, employee: null, title: null }
    })
    console.log('xxxx, getInfo', partner)
    commit('SET_ME', { partner, uid, partner_id })
    return new Promise((resolve) => {
      // commit('SET_CURRENT', current)
      resolve({ uid, partner_id, partner })
    })
  },

  // user login
  async login({ commit, dispatch }, userInfo) {
    const { username, password } = userInfo
    const response = await api.rpc.login({
      username: username.trim(),
      password: password
    })
    // console.log('xxxxx, login,', dispatch)
    return dispatch('afterLogin', response)
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      api.rpc
        .logout(state.token)
        .then(() => {
          dispatch('resetToken')
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  async afterLogin({ commit }, response) {
    return new Promise((resolve, reject) => {
      const { token } = response
      if (token) {
        commit('SET_TOKEN', token)
        resolve(token)
      } else {
        console.log('xxxx, afterLogin,reject,', response)
        reject(response)
      }
    })
  },

  // remove token
  async resetToken({ commit }) {
    console.log('resetToken')
    await api.rpc.reset_token()
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      resolve()
    })
  },

  async emailSend({ commit }, payload) {
    // const { username, password } = userInfo
    const res = await api.rpc.email_send(payload)
    return new Promise((resolve, reject) => {
      resolve(res)
    })
  },

  async emailBack({ commit }, payload) {
    const code = await api.rpc.email_back(payload)
    return new Promise((resolve, reject) => {
      resolve(code)
    })
  },

  async smsSend({ commit }, payload) {
    // const { username, password } = userInfo
    const res = await api.rpc.sms_send(payload)
    return new Promise((resolve, reject) => {
      resolve(res)
    })
  },

  async smsBack({ commit }, payload) {
    const code = await api.rpc.sms_back(payload)
    return new Promise((resolve, reject) => {
      resolve(code)
    })
  },

  async smsLogin({ commit, dispatch }, payload) {
    const response = await api.rpc.sms_login(payload)
    return dispatch('afterLogin', response)
  },

  async register({ commit, dispatch }, payload) {
    // const { mobile, code, username, password } = payload
    const response = api.rpc.register(payload)
    return new Promise((resolve, reject) => {
      response
        .then((res) => {
          dispatch('resetToken')
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  async emailRegister({ commit, dispatch }, payload) {
    // const { email, code, username, password } = payload
    const response = api.rpc.emailRegister(payload)
    return new Promise((resolve, reject) => {
      response
        .then((res) => {
          dispatch('resetToken')
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  async resetPassword({ commit, dispatch }, payload) {
    // const { mobile, code, password } = payload
    // console.log('xxxx, resetPassword, ', mobile, code, password)

    const response = api.rpc.sms_reset_password(payload)

    return new Promise((resolve, reject) => {
      response
        .then((res) => {
          dispatch('resetToken')
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  async resetPasswordByEmail({ commit, dispatch }, payload) {
    // const { email, code, password } = payload
    // console.log('xxxx, resetPassword, ', email, code, password)

    const response = api.rpc.email_reset_password(payload)

    return new Promise((resolve, reject) => {
      response
        .then((res) => {
          dispatch('resetToken')
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  async changePassword({ commit, dispatch }, payload) {
    const { oldPsw, newPsw } = payload
    const User = api.env('res.users')

    const response = User.change_password(oldPsw, newPsw)

    return new Promise((resolve, reject) => {
      response
        .then((res) => {
          dispatch('resetToken')
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  async change_image({ state, commit, dispatch }, payload) {
    const { image } = payload

    const ss = image.split(';base64,')
    const raw_image = ss[1]

    const User = api.env('res.users')

    const { uid } = state

    const response = User.write({
      id: uid,
      image_1920: raw_image
    })

    return new Promise((resolve, reject) => {
      response
        .then((res) => {
          const { partner } = state

          const date = new Date().getTime()
          const image_url2 = `${partner.image_128}&unique=${date}`
          // console.log('change_image,', image_url2)

          commit('SET_IMAGE', image_url2)

          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

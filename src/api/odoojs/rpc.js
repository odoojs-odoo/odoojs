import requestCreator from './request'

import odooConfig from '../odoo.config'

import { getToken, setToken, removeToken } from '@/utils/auth'

// import crypt from './crypt'

// 登录时 需要 数据库名称
const OdooDatabase = odooConfig.OdooDatabase
const busPoll = odooConfig.busPoll

// 登录成功后, 本地存储 user info
const UserInfoKey = 'UserInfo'

const EmailSendUrl = '/api/email/send'
const EmailBackUrl = '/api/email/back'

const EmailResetPswUrl = '/api/email/resetpsw'
const EmailRegisterUrl = '/api/email/register'

const SmsSendUrl = '/api/sms/send'
const SmsLoginUrl = '/api/sms/login'
const SmsResetPswUrl = '/api/sms/resetpsw'
const SmsBackUrl = '/api/sms/back'
const RegisterUrl = '/api/sms/register'
const LoginUrl = '/api/login'
const LogoutUrl = '/api/logout'
const GetSessionInfoUrl = '/api/userinfo'

const CallUrl = '/api/call'
const PollUrl = '/longpolling/poll'

const my_return = (res) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 100, res)
  })
}

export class OdooBus {
  //
  constructor() {
    this.instance = null
  }

  static getBus() {
    if (!this.instance) {
      this.instance = new OdooBus()
      this.instance.init()
    }
    return this.instance
  }

  init() {
    this.isRun = 0
    this.loop = 1
    this.last = 0

    this.channels = []
    const error = () => {
      setTimeout(() => {
        this.poll()
      }, 1000)
    }

    this.rpc = new OdooRpc({ error, timeout: 100000 })

    // this.poll()
  }

  setCallback(channel_id, cb) {
    const chn = this.findOrCreateChannel(channel_id)
    chn.callback = cb
  }

  findOrCreate(records, vals) {
    const recs = records.filter((item) => item.id === vals.id)
    if (recs.length) {
      return recs[0]
    }
    records.push(vals)
    return vals
  }

  findOrCreateChannel(chn_id) {
    return this.findOrCreate(this.channels, {
      callback: null,
      id: chn_id,
      partner_ids: [],
      messages: []
    })
  }

  updateInsert(records, vals) {
    const rec = this.findOrCreate(records, { id: vals.id })
    Object.keys(vals).forEach((item) => {
      rec[item] = vals[item]
    })
  }

  updateChannel(chn) {
    // console.log('xxxxx, updateChannel,', chn)
    const chn0 = this.findOrCreateChannel(chn.id)
    // console.log('xxxxx, updateChannel 2,', chn0)
    if (chn.partner_id) {
      this.updateInsert(chn0.partner_ids, chn.partner_id)
    }

    chn0.messages.push(...chn.messages)
  }

  async poll() {
    this.isRun = 1
    console.log('xxxxx, bus start poll')
    while (this.loop) {
      console.log('xxxxx, bus runing poll', this.last)
      const res = await this.rpc.poll(this.last)
      const msgIds = res.map((item) => item.id)
      if (msgIds.length) {
        this.last = Math.max(...msgIds)
      }
      res.forEach((element) => {
        console.log('xxx, poll,', element)
        const chn = {
          id: element.channel[2],
          partner_id: null,
          messages: []
        }
        const msg = element.message

        if (msg.info === 'typing_status') {
          chn.partner_id = {
            id: msg.partner_id,
            is_typing: msg.is_typing
          }
        } else if (msg.info === 'channel_fetched') {
          chn.partner_id = {
            id: msg.partner_id,
            is_typing: false,
            last_message_id: msg.last_message_id
          }
        } else if (msg.id) {
          chn.messages = [msg]
        }

        // console.log('xxx, poll,', chn, this.channels)
        this.updateChannel(chn)
        const goodchn = this.findOrCreateChannel(chn.id)

        if (goodchn.callback) {
          goodchn.callback(goodchn)
        }

        // console.log('xxx, poll 2,', this.channels)
        // console.log('xxx, poll 3,', this.channels[0].partner_ids[0])
      })
    }
    console.log('xxxxx, bus stop poll')
    this.isRun = 0
  }

  startPoll() {
    this.loop = 1
    if (!this.isRun) {
      this.poll()
      //
    }
  }

  stopPoll() {
    this.loop = 0
  }

  getMsg(channel_id) {
    return this.findOrCreateChannel(channel_id)
  }
}

export class OdooRpc {
  constructor(params) {
    // const { error, timeout,  } = params
    this.request = requestCreator(params)
    // this.bus = new OdooBus(params)
    this.longpoll = requestCreator({ ...params, timeout: 100000 })
  }

  // // eslint-disable-next-line object-curly-spacing
  // async request2({ url, method, data = {} }) {
  //   const url2s = url.split('?')
  //   url2s[0] = `${url2s[0]}2`
  //   const url2 = url2s.join('?')
  //   const encrypt_data = await crypt(data)
  //   return this.request({
  //     url: url2,
  //     method,
  //     data: { data: encrypt_data }
  //   })
  // }

  async poll(last) {
    // console.log('odoorpc.poll:', last)
    const token = getToken()
    if (!token) {
      return null
    }

    const res = await this.longpoll({
      url: `${PollUrl}?session_id=${token}`,
      method: 'post',
      data: { channels: [], last: last || 0 }
    })
    // console.log('odoorpc.poll:', res)

    return res
  }

  async email_send(payload) {
    // const { email, tosend } = payload
    console.log('odoorpc.user.email_send:', payload)

    const userinfo = await this.request({
      url: `${EmailSendUrl}`,
      method: 'post',
      data: { ...payload, db: OdooDatabase }
    })

    return my_return(userinfo)
  }

  async email_back(payload) {
    console.log('odoorpc.user.email_back:')
    // const { email } = payload
    const res = await this.request({
      url: `${EmailBackUrl}`,
      method: 'post',
      data: { ...payload, db: OdooDatabase }
    })

    console.log('odoorpc.user.sms_back:', res)

    return my_return(res)
  }

  async sms_send(payload) {
    // const { mobile, tosend } = payload
    console.log('odoorpc.user.sms:')
    const userinfo = await this.request({
      url: `${SmsSendUrl}`,
      method: 'post',
      data: { ...payload, db: OdooDatabase }
    })

    return my_return(userinfo)
  }

  async sms_back(payload) {
    // const { email } = payload
    console.log('odoorpc.user.sms_back:')
    const res = await this.request({
      url: `${SmsBackUrl}`,
      method: 'post',
      data: { ...payload, db: OdooDatabase }
    })

    console.log('odoorpc.user.sms_back:', res)

    return my_return(res)
  }

  async register({ mobile, code, username, password }) {
    console.log('odoorpc.user.register:')
    const res = await this.request({
      url: `${RegisterUrl}`,
      method: 'post',
      data: { mobile, code, password, login: username, db: OdooDatabase }
    })

    return my_return(res)
  }

  async emailRegister({ email, code, password }) {
    console.log('odoorpc.user.emailRegister:')
    const res = await this.request({
      url: `${EmailRegisterUrl}`,
      method: 'post',
      data: { email, code, password, db: OdooDatabase }
    })

    return my_return(res)
  }

  async sms_reset_password({ mobile, code, password }) {
    console.log('odoorpc.user.SmsResetPswUrl:')
    const res = await this.request({
      url: `${SmsResetPswUrl}`,
      method: 'post',
      data: { mobile, code, password, db: OdooDatabase }
    })

    return my_return(res)
  }

  async email_reset_password({ email, code, password }) {
    console.log('odoorpc.user.SmsResetPswUrl:')
    const res = await this.request({
      url: `${EmailResetPswUrl}`,
      method: 'post',
      data: { email, code, password, db: OdooDatabase }
    })

    return my_return(res)
  }

  async sms_login({ mobile, code }) {
    console.log('odoorpc.user.sms_login:')
    const userinfo = await this.request({
      url: `${SmsLoginUrl}`,
      method: 'post',
      data: { mobile, code, db: OdooDatabase }
    })

    return this.after_login(userinfo)
  }

  async login(params) {
    console.log('odoorpc.user.login:', params)
    const { username, password } = params

    const userinfo = await this.request({
      url: LoginUrl,
      method: 'post',
      data: { login: username, password, db: OdooDatabase }
    })
    console.log('odoorpc.user.login ok:', userinfo)

    return this.after_login(userinfo)
  }

  after_login(userinfo) {
    //
    // const userinfo = {
    //   session_id: 'token-test',
    //   name: username
    // }

    if (userinfo) {
      const token = userinfo.session_id
      setToken(token)
      localStorage.setItem(UserInfoKey, JSON.stringify(userinfo))
      this.switchBus(true)
    }
    return my_return({ token: (userinfo || {}).session_id })
  }

  switchBus(openClose) {
    if (busPoll) {
      const bus = OdooBus.getBus()
      if (openClose) {
        bus.startPoll()
      } else {
        bus.stopPoll()
      }
    }
  }

  async call(model, method, args = [], kwargs = {}) {
    // console.log('odoorpc.call:', model, method, args, kwargs)

    const token = getToken()

    const res = await this.request({
      url: `${CallUrl}?session_id=${token}`,
      method: 'post',
      data: { model, method, args, kwargs }
    })

    return res
  }

  async get_session_info(token) {
    const userinfo = await this.request({
      url: `${GetSessionInfoUrl}?session_id=${token}`,
      method: 'post'
    })

    if (userinfo) {
      localStorage.setItem(UserInfoKey, JSON.stringify(userinfo))
    }

    return my_return(userinfo)
  }

  reset_token() {
    this.switchBus(false)
    removeToken()
    localStorage.clear(UserInfoKey)
    return my_return(true)
  }

  async logout(token) {
    console.log('odoorpc.user.logout:')

    this.switchBus(false)
    removeToken()
    localStorage.clear(UserInfoKey)

    this.request({
      url: `${LogoutUrl}?session_id=${token}`,
      method: 'post'
    })

    return my_return(true)
  }

  get_userinfo() {
    const userstr = localStorage.getItem(UserInfoKey)
    if (userstr) {
      const userinfo = JSON.parse(localStorage.getItem(UserInfoKey))
      return userinfo
    } else {
      return {}
    }
  }
}

const rpcCreator = (params) => {
  return new OdooRpc(params)
}

export default rpcCreator

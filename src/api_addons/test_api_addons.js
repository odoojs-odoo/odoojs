/* eslint-disable no-unused-vars */
import api from '@/api_addons'

const Database = 't1'
export const test_api_addons = async () => {
  // test_account_report()
  // test_export_account()
  // test_export()
  // test_import()

  // await login()
  await test_get_sportType()
  // await test_get_bookvenue()
  // await test_get_presetData()
  // await test_reg_event()
  // await test_search_event_me()
  // await test_reg_event_cancel()
  // test_register_mobile()
}

//
const deep_copy = node => {
  return JSON.parse(JSON.stringify(node))
}

const login = async () => {
  const username = 'admin'
  const password = '123456'

  const res = await api.login({
    db: Database,
    login: username,
    password: password
  })
  return res
}

const get_sportType = async () => {
  const model = 'res.partner'
  const Model = api.env.model(model)
  const records = await Model.get_sportType()

  // console.log('room', 'records', records)
  return records
}

const get_bookvenue = async sportType_id => {
  const model = 'res.partner'
  const Model = api.env.model(model)
  const records = await Model.get_bookvenue(sportType_id)
  return records
}

const get_presetData = async ({ address_id, date, hour_min, hour_max }) => {
  const model = 'event.event'
  const Model = api.env.model(model)
  const records = await Model.search_future_event({
    address_id,
    date,
    hour_min,
    hour_max
  })
  return records
}

const reg_event = async event_id => {
  const model = 'event.event'
  const Model = api.env.model(model)
  const reg = await Model.reg_event(event_id)
  return reg
}

const search_event_me = async () => {
  const model = 'event.event'
  const Model = api.env.model(model)
  const result = await Model.search_me()
  return result
}

const reg_event_cancel = async event_id => {
  const model = 'event.event'
  const Model = api.env.model(model)
  const event = await Model.cancel_me(event_id)
  return event
}

const test_get_sportType = async () => {
  const records = await get_sportType()
  const records2 = records.map(item => {
    return {
      id: item.id,
      name: item.name,
      floor: item.street,
      totalNum: item.child_ids.length, // 所有场地数, 不考虑时段及是否被预定
      introduction: item.comment
      // latestBook: null
    }
  })

  console.log('room2', records2)
}

const test_get_bookvenue = async () => {
  //
  const sportTypes = await get_sportType()

  // 选择一项运动
  const sportType = sportTypes[0]
  const sportType_id = sportType.id

  // 根据 sportType_id 查询所有的 场地
  const records = await get_bookvenue(sportType_id)
  console.log('venue:', records)

  const records2 = records.map(item => {
    return {
      id: item.id,
      type: sportType.ref,
      name: item.parent_id__name,
      num: item.name,
      msg: item.comment
    }
  })

  console.log('venue 2:', records2)

  //   const res_print = [
  //     { id: 9, type: 'pingpang', name: '乒乓球', num: '1号台', msg: false },
  //     { id: 10, type: 'pingpang', name: '乒乓球', num: '2号台', msg: false },
  //     { id: 11, type: 'badminton', name: '羽毛球', num: '1号场', msg: false },
  //     { id: 12, type: 'badminton', name: '羽毛球', num: '2号场', msg: false },
  //     { id: 13, type: 'badminton', name: '羽毛球', num: '3号场', msg: false }
  //   ]
}

const test_get_presetData = async () => {
  const sportTypes = await get_sportType()
  const sportType = sportTypes[0]
  const sportType_id = sportType.id

  // 根据 sportType_id 查询所有的 场地
  const venues = await get_bookvenue(sportType_id)
  console.log('venue:', venues)

  // 选择一块场地
  const venue = venues[0]
  const address_id = venue.id

  const dates = [
    '2021-05-21',
    '2021-05-14',
    '2021-04-07',
    '2021-04-08',
    '2021-04-12',
    '2021-04-13'
  ]

  // 选择日期
  const date = dates[0]

  const HOUR_MIN = 8
  const HOUR_MAX = 20

  // 每日的有效时间段, 若不传, 则会取默认值 8-21
  const hour_min = HOUR_MIN
  const hour_max = HOUR_MAX

  const records = await get_presetData({ address_id, date, hour_min, hour_max })

  console.log(records)

  const records2 = records.map(item => {
    return {
      id: item.id,
      address_id: item.address_id, // 场地 id, 对应 bookvenue
      address_id__name: item.address_id__name, // 场地名称, bookvenue 的 name + num
      date_begin: item.date_begin, // 开始时间
      date_end: item.date_end, // 结束时间
      seats_expected: item.seats_expected, // 0, 空闲, 1, 已经被预定
      reg_id__object: item.reg_id__object, // 预定信息
      reg_id: item.reg_id, // 预定 id
      reg_partner_id: item.reg_partner_id, // 被谁预定, false: 空闲
      reg_by_me: item.reg_by_me, // 被我预定, true: 我, false: 空闲或被别人预定
      isPreset: item.isPreset // 状态
    }
  })

  console.log(records2)

  //   const res_print = [
  //     {
  //       // address_id: 9
  //       // address_id__name: "乒乓球, 1号台"
  //       // date_begin: Sat Apr 03 2021 13:00:00 GMT+0800 (中国标准时间) {}
  //       // date_end: Sat Apr 03 2021 14:00:00 GMT+0800 (中国标准时间) {}
  //       // id: 124
  //       // isPreset: 2
  //       // reg_by_me: true
  //       // reg_partner_id: 3
  //       // seats_expected: 1
  //     },
  //     {
  //       // address_id: 9
  //       // address_id__name: "乒乓球, 1号台"
  //       // date_begin: Sat Apr 03 2021 14:00:00 GMT+0800 (中国标准时间) {}
  //       // date_end: Sat Apr 03 2021 15:00:00 GMT+0800 (中国标准时间) {}
  //       // id: 125
  //       // isPreset: 0
  //       // reg_by_me: false
  //       // reg_partner_id: 1
  //       // seats_expected: 1
  //     },
  //     {
  //       // address_id: 9
  //       // address_id__name: "乒乓球, 1号台"
  //       // date_begin: Sat Apr 03 2021 15:00:00 GMT+0800 (中国标准时间) {}
  //       // date_end: Sat Apr 03 2021 16:00:00 GMT+0800 (中国标准时间) {}
  //       // id: 126
  //       // isPreset: 1
  //       // reg_by_me: false
  //       // reg_partner_id: undefined
  //       // seats_expected: 0
  //     }
  //   ]
}

const test_reg_event = async () => {
  const sportTypes = await get_sportType()
  // 选择一项运动
  const sportType = sportTypes[0]
  const sportType_id = sportType.id

  // 根据 sportType_id 查询所有的 场地
  const venues = await get_bookvenue(sportType_id)

  // 选择一块场地
  const venue = venues[0]
  const address_id = venue.id

  const dates = ['2021-05-21', '2021-05-21']

  // 选择日期
  const date = dates[1]

  const HOUR_MIN = 8
  const HOUR_MAX = 20

  // 每日的有效时间段, 若不传, 则会取默认值 8-21
  const hour_min = HOUR_MIN
  const hour_max = HOUR_MAX
  // 根据 address_id,date 查询所有的 可预定
  const events = await get_presetData({ address_id, date, hour_min, hour_max })

  // 选择 一个预定
  const event = events[1]
  const event_id = event.id

  const event2 = await reg_event(event_id)
  console.log(event2)
}

const test_search_event_me = async () => {
  const result = await search_event_me()
  console.log(result)
}

const test_reg_event_cancel = async () => {
  const events = await search_event_me()
  console.log(events)
  const event = events[0]
  const event2 = await reg_event_cancel(event.id)
  console.log(event2)
  // 取消预定
  // 在预定中 找到 reg_id
  // const reg_id = 8
  // const model = 'event.registration'
  // const Model = api.env.model(model)
  // const result = await Model.execute('unlink', reg_id)
}

// button_reg_cancel

const all_users = [
  '13621007080',
  '13910679928',
  '15801252316',
  '13911469690',
  '13911132711',
  '13811033313',
  '13811535766',
  '18911899712',
  '13522808997',
  '13683292391',
  '13611054306',
  '13661248928',
  '13001294650',
  '13718049661',
  '18810779632',
  '13426057008',
  '18210121077',
  '18611839706',
  '13811057639',
  '13693523682',
  '18001226715',
  '13910604413',
  '13683398123'
]

const register_mobile = async mobile => {
  const model = 'res.users'
  const Model = api.env.model(model)
  const user = await Model.register_mobile(mobile)
}

const change_password = async (old_passwd, new_passwd) => {
  const model = 'res.users'
  const Model = api.env.model(model)
  const ret_boolean = await Model.execute(
    'change_password',
    old_passwd,
    new_passwd
  )
}

const test_register_mobile = async () => {
  const model = 'res.users'
  const Model = api.env.model(model)
  console.log([Model])
  for (const mobile of all_users) {
    // const mobile = '13911223366'
    // const user = await Model.register_mobile(mobile)
    // console.log(mobile)
    // console.log(user)
  }
}

const test_import = () => {
  console.log('text import_file')
  const import_obj = api.env.model('base_import.import')

  const model = 'res.partner.category'

  api.upload(file => {
    console.log(' upload,', file)
    import_obj.test_import_file({ model, file })
  })
  //
}

const test_account_report = async () => {
  console.log('test_account_report')
  // const model = 'accounting.report.balancesheet'
  // const model = 'accounting.report.profitandloss'
  // const model = 'account.report.general.ledger'
  const model = 'account.report.partner.ledger'

  const Model = api.env.model(model)
  const months = await Model.search_read_months()
  console.log(months)
  const date_month = '2021-04-01'
  const result = await Model.report_month(date_month)
  console.log(deep_copy(result))
}

const test_export_account = async () => {
  console.log('test_export_account')
  // const model = 'accounting.report.balancesheet'
  // const model = 'accounting.report.profitandloss'
  // const model = 'account.report.general.ledger'
  const model = 'account.report.partner.ledger'
  const Model = api.env.model(model)
  const date_month = '2021-05-01'
  const result = await Model.export_report_month(date_month)
  api.download(result)
}

const test_export = async () => {
  console.log('text export')

  const data = {
    model: 'sale.order',
    fields: [
      { name: 'name', label: '订单关联' },
      { name: 'create_date', label: '创建日期' },
      { name: 'commitment_date', label: '交货日期' },
      { name: 'expected_date', label: '预计日期' },
      { name: 'partner_id', label: '客户' },
      { name: 'user_id', label: '销售员' },
      { name: 'amount_total', label: '合计' },
      { name: 'state', label: '状态' },
      { name: 'activity_exception_decoration', label: '活动例外勋章' }
    ],
    ids: [13],
    domain: [['user_id', '=', 2]],
    groupby: [],
    context: {
      lang: 'zh_CN',
      tz: false,
      uid: 2,
      allowed_company_ids: [1],
      params: {
        action: 318,
        cids: 1,
        menu_id: 189,
        model: 'sale.order',
        view_type: 'list'
      }
    },
    import_compat: false
  }

  // const response = await api.export_xlsx(data)
  // console.log('xls export', response)
  const response = await api.export_csv(data)
  console.log('text export csv', response)

  api.download(response)
}

const test_class = () => {
  class Model {
    constructor() {}
  }

  Model._columns = {
    a: 1,
    b: 2
  }

  Model._columns2 = {
    a2: 1,
    b2: 2
  }

  class View extends Model {
    constructor() {
      super()
    }
  }

  View._columns = {
    a: 11,
    c: 33
  }

  // console.log([Model])
  // console.log([View])
  // console.log([View.__proto__])
  // View._columns2.ccc = 333
  // console.log('View.columns', View._columns)
  // console.log('View.columns2', View._columns2)
  // console.log('View.__proto__.columns', View.__proto__._columns)
  // console.log('View.__proto__.columns2', View.__proto__._columns2)
}

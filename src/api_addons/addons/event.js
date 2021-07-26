import { Model } from '@/odoorpc/models'

// import { parseTime } from '@/utils'

const dateHelper = {
  // hour_min: 8,
  // hour_max: 20,
  str00: value => value.toString().padStart(2, '0'),
  date2str: function(date) {
    const yyyy = this.str00(date.getFullYear())
    const mm = this.str00(date.getMonth() + 1)
    const dd = this.str00(date.getDate())
    return `${yyyy}-${mm}-${dd}`
  },

  toUTCString: function(date) {
    const yyyy = this.str00(date.getUTCFullYear())
    const mm = this.str00(date.getUTCMonth() + 1)
    const dd = this.str00(date.getUTCDate())
    const hh = this.str00(date.getUTCHours())

    return `${yyyy}-${mm}-${dd} ${hh}:00:00`
  },

  new_hour: (date, hour) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour),

  first_date: date => new Date(date.getFullYear(), date.getMonth(), 1),
  date_add: (date, day) => new Date(date.getTime() + 1000 * 60 * 60 * 24 * day),
  hour_add: (date, hour) => new Date(date.getTime() + 1000 * 60 * 60 * hour),

  get_date: date => {
    const date1 = new Date(date)
    const this_first = this.first_date(date1)
    const this_last = this.date_add(
      this.first_date(this.date_add(this_first, 40)),
      -1
    )
    const date_from = this.date2str(this_first)
    const date_to = this.date2str(this_last)

    return [date_from, date_to]
  }
}

const get_hours = ({ date, hour_min, hour_max }) => {
  const hours = Array.from(new Array(24).keys()).filter(
    item => item >= hour_min && item <= hour_max
  )
  const date2 = new Date(date)
  const oneday_hours = hours.map(item => dateHelper.new_hour(date2, item))
  const all_hours = oneday_hours.filter(item => item > new Date())

  const all_hours2 = all_hours.map(item => {
    return {
      date_begin: item,
      date_end: dateHelper.hour_add(item, 1)
    }
  })

  const utc_hours = all_hours2.map(item => {
    return {
      date_begin: dateHelper.toUTCString(item.date_begin),
      date_end: dateHelper.toUTCString(item.date_end)
    }
  })

  // console.log('get_hours, ', oneday_hours, all_hours, new Date())
  return utc_hours
}

export class EventEvent extends Model {
  constructor() {
    super()
  }

  static async search_event_type() {
    const model = 'event.type'
    const Model = this.env.model(model)
    const domain = [['name', '=', 'reservation']]
    const res = await Model.search(domain)
    return res[0]
  }

  static async search_one_date(payload) {
    const { address_id, date } = payload
    const domain = [
      ['address_id', '=', address_id],
      ['date_begin', '>=', `${date} 00:00:00`],
      ['date_begin', '<=', `${date} 23:59:59`]
    ]
    const ids = await this.search(domain)
    // console.log('in search_future_event', ids)
    if (!ids.length) {
      return []
    } else {
      const rec = await this.browse(ids)
      // console.log('in search_one_date1 ', rec)
      const data = rec.fetch_all()
      // console.log('in search_one_date2 ', data)
      return data
    }
  }

  static async delete_old(payload) {
    const { address_id } = payload

    const lastday = dateHelper.date_add(new Date(), -1)
    const lastday2 = dateHelper.date2str(lastday)

    const domain = [
      ['address_id', '=', address_id],
      ['date_begin', '<=', `${lastday2} 00:00:00`]
    ]
    const ids = await this.search(domain)
    const Reg = this.env.model('event.registration')
    await Reg.delete_by_event_id(ids)
    await this.execute('unlink', ids)
  }

  static async get_values_list(payload) {
    // const { address_id, date, hour_min, hour_max } = payload
    const values_list = await this.get_values_list_raw(payload)
    if (values_list.length === 0) {
      return []
    }

    const vals = values_list[0]
    const vals_template = await this.get_vals_template(vals)
    const values_list2 = values_list.map(item => {
      return { ...vals_template, ...item }
    })

    // console.log(values_list2)
    return values_list2
  }

  static async get_values_list_raw({ address_id, date, hour_min, hour_max }) {
    const get_address = async address_id => {
      const res = await this.env.model('res.partner').name_get([address_id])
      return res[0]
    }
    const address = await get_address(address_id)
    const event_type_id = await this.search_event_type()
    const hours = get_hours({ date, hour_min, hour_max })
    // console.log(hours)
    const values_list = hours.map(hour => {
      return {
        name: `${address[1]} ${hour.date_begin.substr(0, 13)}`,
        event_type_id,
        address_id,
        ...hour
      }
    })

    // console.log('get_values_list_raw, ', hours)

    return values_list
  }

  static async get_vals_template(vals) {
    console.log('get_vals_template, ', vals)
    const rec = await this.browse(null)
    rec.$name = vals.name
    rec.$date_begin = vals.date_begin
    rec.$date_end = vals.date_end
    rec.$address_id = vals.address_id
    rec.$event_type_id = vals.event_type_id
    await rec.awaiter
    return rec._get_values_for_create()
    // await rec.commit()
    // return rec.id
  }

  static async _search_future_event(payload) {
    await this.delete_old(payload)
    const { hour_min, hour_max } = payload
    const today_events = await this.search_one_date(payload)
    console.log('in search_future_event', today_events)

    const hours = today_events.map(item =>
      dateHelper.toUTCString(item.date_begin)
    )
    console.log('in search_future_event', hours)

    const count_ok = hour_max - hour_min + 1
    if (hours.length >= count_ok) {
      return today_events
    }

    const values_list = await this.get_values_list(payload)
    console.log('in search_future_event 1', values_list)

    const values_list2 = values_list.filter(
      item => !hours.includes(item.date_begin)
    )
    // console.log('in search_future_event 2', values_list2)

    if (values_list2.length) {
      await this.create(values_list2)
      return await this.search_one_date(payload)
    } else {
      return today_events
    }
  }

  static async with_reg(records) {
    const Reg = this.env.model('event.registration')

    const event_reg_ids = await Reg.search_by_event(
      records.map(item => item.id)
    )
    const event_regs = await Reg.browse(event_reg_ids)
    const event_regs2 = event_regs.fetch_all()

    const event_regs3 = event_regs2.reduce((acc, cur) => {
      acc[cur.event_id] = cur
      return acc
    }, {})

    console.log('event_regs', event_regs3, this._odoo.session_info.partner_id)

    const records2 = records
    const records3 = records2.map(item => {
      const seats_expected = item.seats_expected // 0, 空闲, 1, 已经被预定

      const reg = event_regs3[item.id] || {}

      const reg_partner_id = reg.partner_id
      const reg_by_me = reg_partner_id === this._odoo.session_info.partner_id

      const get_isPreset = () => {
        if (seats_expected === 0) {
          return 1 // 空闲
        } else if (reg_by_me) {
          return 2 // 我已经预定
        } else {
          return 0 // 被别人预定
        }
      }

      const isPreset = get_isPreset()

      return {
        ...item,
        reg_id: reg.id, // 已有的预定 id
        reg_id__object: reg, // 已有的预定 object
        reg_partner_id, // 被谁预定, false: 空闲
        reg_by_me, // 被我预定, true: 我, false: 空闲或被别人预定
        isPreset
      }
    })

    return records3
  }

  static async search_future_event(payload) {
    /*
     *  params:
     *  address_id:  integer, 场地 id
     *  date:  string '2021-04-08', 某天
     *
     *  return: list, [{
     *     id,
     *     address_id, // 场地 id,
     *     address_id__name, // 场地名称
     *     date_begin,
     *     date_end,
     *     seats_expected, // 0, 空闲, 1, 已经被预定
     *     reg_partner_id, // 被谁预定, false: 空闲
     *     reg_by_me, // 被我预定, true: 我, false: 空闲或被别人预定
     *     isPreset, // 状态: 1 // 空闲, 2 // 我已经预定,  0 // 被别人预定
     * }]
     *
     *
     */

    // const { address_id, date, hour_min, hour_max } = payload

    const records = await this._search_future_event(payload)
    return await this.with_reg(records)
  }

  static async reg_event(event_id) {
    const model = 'event.registration'
    const Model = this.env.model(model)
    // const reg =
    await Model.reg_event(event_id)
    const rec = await this.browse(event_id)
    const rec2 = await this.with_reg(rec.fetch_all())
    return rec2[0]
  }

  static async search_me() {
    const partner_id = this._odoo.session_info.partner_id
    const domain = [['registration_ids.partner_id', 'in', [partner_id]]]
    const ids = await this.search(domain, {})
    const rec = await this.browse(ids)
    const records = rec.fetch_all()
    const rec2 = await this.with_reg(records)
    return rec2
  }

  static async cancel_me(event_id) {
    const model = 'event.registration'
    const Model = this.env.model(model)
    // const reg =
    await Model.cancel_me(event_id)
    const rec = await this.browse(event_id)
    const rec2 = await this.with_reg(rec.fetch_all())
    return rec2[0]
  }

  // static async create_by_values(vals) {
  //   const rec = await this.browse(null)
  //   rec.$name = vals.name
  //   rec.$date_begin = vals.date_begin
  //   rec.$date_end = vals.date_end
  //   rec.$address_id = vals.address_id
  //   rec.$event_type_id = vals.event_type_id
  //   await rec.awaiter
  //   // await rec.commit()
  //   // return rec.id
  // }

  // static async search_or_create(vals) {
  //   const domain = [
  //     ['address_id', '=', vals.address_id],
  //     ['date_begin', '=', vals.date_begin]
  //   ]
  //   const ids = await this.search(domain, { limit: 1 })
  //   if (ids.length) {
  //     return ids[0]
  //     // return this.browse(ids)
  //   }
  //   // return this.create_by_values(vals)
  // }
}

export class EventRegistration extends Model {
  static async search_by_event(event_ids) {
    const domain = [['event_id', 'in', event_ids]]
    const ids = await this.search(domain)
    // console.log(' ids', ids)
    return ids
  }

  static async search_me() {
    const partner_id = this._odoo.session_info.partner_id
    const domain = [['partner_id', '=', partner_id]]
    // const ids =
    await this.search(domain, {})

    // registration_ids

    // const rec = await this.browse(ids)

    // const data = rec.fetch_all()
    // const events = await this.env
    //   .model('event.event')
    //   .browse(data.map(item => item.event_id))
    // console.log(' events', events.fetch_all())
    // return rec.fetch_all()

    // if (ids.length) {
    // } else {
    //   const record = await this.browse(null)
    //   // record.$event_id = event_id
    //   // record.$partner_id = partner_id
    //   await record.awaiter
    //   await record.commit()

    //   return record.fetch_one()
    // }

    // await Model.search_me()
  }

  static async cancel_me(event_id) {
    const partner_id = this._odoo.session_info.partner_id

    const domain = [
      ['event_id', '=', event_id],
      ['partner_id', '=', partner_id]
    ]
    const ids = await this.search(domain, { limit: 1 })
    if (ids.length) {
      const record = await this.browse(ids)
      await record.execute('button_reg_cancel')
      // return rec.fetch_one()
      return false
    } else {
      return false
    }
  }

  static async reg_event(event_id) {
    const partner_id = this._odoo.session_info.partner_id

    // 增加这三句
    const Partner = this.env.model('res.partner')
    const parnter = await Partner.browse(partner_id)
    const mobile = parnter.$mobile
    // 增加这三句

    const domain = [
      ['event_id', '=', event_id],
      ['partner_id', '=', partner_id]
      // ['state', '!=', 'cancel']
    ]

    const ids = await this.search(domain, { limit: 1 })
    if (ids.length) {
      const rec = await this.browse(ids)
      if (rec.$state === 'cancel') {
        await rec.execute('do_draft')
        await rec.execute('confirm_registration')
      }
      return rec.fetch_one()
    } else {
      const record = await this.browse(null)
      record.$event_id = event_id
      record.$partner_id = partner_id
      // 增加这一句
      record.$mobile = mobile
      // 增加这一句

      await record.awaiter
      await record.commit()

      return record.fetch_one()
    }
  }

  static async delete_by_event_id(event_ids) {
    const domain = [['event_id', 'in', event_ids]]
    const ids = await this.search(domain)
    await this.execute('unlink', ids)
  }
}

const AddonsModels = {
  'event.event': EventEvent,
  'event.registration': EventRegistration
}

export default AddonsModels

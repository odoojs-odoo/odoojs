import { parseTime } from './tools'

import { ViewBase } from './base_view'
import { Search } from './search_view'

const ONE_DAY = 24 * 60 * 60 * 1000
const dateHelper = {
  // firstDateOfMonth(date) {
  //   const dt = new Date(date)
  //   dt.setDate(1)
  //   return parseTime(dt)
  // },

  // lastDateOfMonth(date) {
  //   const dt = new Date(date)
  //   dt.setDate(1)
  //   const dt2 = new Date(dt - -40 * 24 * 60 * 60 * 1000)
  //   dt2.setDate(1)
  //   const dt3 = new Date(dt2 - 24 * 60 * 60 * 1000)
  //   return parseTime(dt3)
  // },

  toObj(date) {
    return new Date(date)
  },

  step(date, num) {
    if (num) return new Date(date - -num * ONE_DAY)
    else return new Date()
  },

  toYearMonthDate: dt =>
    `${dt.getFullYear()}年${dt.getMonth() + 1}月${dt.getDate()}日`,

  toYearMonth: dt => `${dt.getFullYear()}年${dt.getMonth() + 1}月`,
  toYear: dt => `${dt.getFullYear()}年`,

  weekRangeStr(date) {
    const fst = new Date(date - date.getDay() * ONE_DAY)
    const lst = new Date(fst - -6 * ONE_DAY)

    const toYMD = this.toYearMonthDate
    const toMD = dt => `${dt.getMonth() + 1}月${dt.getDate()}日`
    const toD = dt => `${dt.getDate()}日`

    const str1 = toYMD(fst)

    const str2 =
      fst.getFullYear() !== lst.getFullYear()
        ? toYMD(lst)
        : fst.getMonth() !== lst.getMonth()
        ? toMD(lst)
        : toD(lst)

    // console.log(' weekRangeStr', str1, str2)

    return `${str1} - ${str2}`
  }
}

export class Calendar extends ViewBase {
  constructor() {
    super()
  }

  static view_node({ action, views }) {
    return super.view_node({ action, views }, 'calendar')
  }

  static _get_title({ type, date }) {
    const dateobj = new Date(date)
    const title =
      type === 'week'
        ? dateHelper.weekRangeStr(dateobj)
        : type === 'year'
        ? dateHelper.toYear(dateobj)
        : type === 'month'
        ? dateHelper.toYearMonth(dateobj)
        : type === 'date'
        ? dateHelper.toYearMonthDate(dateobj)
        : dateHelper.toYearMonthDate(dateobj)

    return title
  }

  static default_value() {
    const dateNowObj = new Date()
    dateNowObj.setHours(0)
    dateNowObj.setMinutes(0)
    dateNowObj.setSeconds(0)

    const date = parseTime(dateNowObj, '{y}-{m}-{d}')
    const today = parseTime(dateNowObj, '{y}-{m}-{d}')
    const type = 'week'
    const title = this._get_title({ date, type })
    const calendarData = { today, title, date, type }
    // console.log(calendarData)
    return calendarData
  }

  static onchange_type({ value, type }) {
    const { date } = value
    const title = this._get_title({ date, type })
    console.log(value, type, title)
    return { ...value, type, title }
  }

  static onchange_step({ value, step }) {
    const { type } = value
    const dateobj = new Date(value.date)
    const dateobj2 = dateHelper.step(dateobj, step)
    const date = parseTime(dateobj2, '{y}-{m}-{d}')
    const title = this._get_title({ date, type })
    return { ...value, date, type, title }
  }

  static _calendar_domain({ action, views }, value) {
    const { date, type } = value

    const node = this.view_node({ action, views })

    const date_start = node.attrs.date_start
    const get_date_range = () => {
      const ONE_DAY = 24 * 60 * 60 * 1000
      const dt = new Date(date)
      dt.setHours(0)
      dt.setMinutes(0)
      dt.setSeconds(0)
      dt.setMilliseconds(0)
      const _first = () => {
        if (type === 'week') return new Date(dt - dt.getDay() * ONE_DAY)
        if (type === 'month' || type === 'year') dt.setDate(1)
        if (type === 'year') dt.setMonth(0)
        return dt
      }

      const fst = _first()
      const _last = () => {
        if (type === 'week') return new Date(fst - -7 * ONE_DAY)

        const delta = type === 'year' ? 369 : type === 'month' ? 40 : 1
        const lst = new Date(fst - -delta * ONE_DAY)
        lst.setDate(1)

        return lst
      }

      const lst = _last()

      const to_utc_str = dt => {
        const yyyy = (dt.getUTCFullYear() + 0).toString().padStart(4, 0)
        const mm = (dt.getUTCMonth() + 1).toString().padStart(2, 0)
        const dd = (dt.getUTCDate() + 0).toString().padStart(2, 0)
        const hh = (dt.getUTCHours() + 0).toString().padStart(2, 0)
        const mi = (dt.getUTCMinutes() + 0).toString().padStart(2, 0)
        const ss = (dt.getUTCSeconds() + 0).toString().padStart(2, 0)
        return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`
      }

      return [to_utc_str(fst), to_utc_str(lst)]
    }

    const [fst, lst] = get_date_range()

    // console.log('search_browse21', fst, lst)

    return [
      [date_start, '>=', fst],
      [date_start, '<', lst]
    ]
  }

  static async search_read({ context, action, views }, { value, search }) {
    const fields1 = views.fields_views.calendar.fields
    const fields2 = Object.keys(fields1)

    const fields = fields2.includes('display_name')
      ? fields2
      : ['display_name', ...fields2]

    const domain1 = this._default_domain({ context, action })
    const domain2 = Search.to_domain({ context, views }, search)
    const domain3 = this._calendar_domain({ action, views }, value)
    const domain = [...domain1, ...domain2, ...domain3]

    const Model = this.Model({ context, action })

    const records = await Model.search_read({ domain, fields })

    return records
  }

  static async load_data({ context, action, views }, kwargs) {
    const records = await this.search_read({ context, action, views }, kwargs)
    return { records }
  }
}

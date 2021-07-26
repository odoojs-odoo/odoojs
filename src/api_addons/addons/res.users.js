import { Model } from '@/odoojs/models'

export class ResUsers extends Model {
  constructor() {
    super()
  }

  static async create_by_values(vals) {
    // const rec = await this.browse(null)
    // // rec.$name = vals.name
    // // rec.$mobile = vals.mobile
    // // rec.$login = vals.login
    // // rec.$email = vals.email
    // // rec.$password = vals.password
    // // await rec.awaiter
    // // // await rec.commit()
    // return rec.id
  }

  static async search_or_create(vals) {
    const domain = [['login', '=', vals.login]]
    const ids = await this.search(domain, { limit: 1 })
    if (ids.length) {
      return ids[0]
      // return this.browse(ids)
    }
    return await this.create(vals)
  }

  static async register_mobile(mobile) {
    const group1 = await this.env.ref('base.group_user')
    const group2 = await this.env.ref('base.group_partner_manager')
    const group3 = await this.env.ref('event.group_event_manager')

    const group_id1 = group1.id
    const group_id2 = group2.id
    const group_id3 = group3.id

    const vals = {
      login: mobile,
      email: mobile,
      name: mobile,
      mobile: mobile,
      password: '123456',
      groups_id: [
        [4, group_id1],
        [4, group_id2],
        [4, group_id3]
      ]
    }

    return await this.search_or_create(vals)
  }
}

const AddonsModels = {
  'res.users': ResUsers
}

export default AddonsModels

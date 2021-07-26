// import { Model } from '@/odoojs/models'

import { ResPartner as Model } from '@/odoojs/addons/res.partner'

export class ResPartner extends Model {
  constructor() {
    super()
  }

  static async search_location(category) {
    const ids = await this.search(
      [
        ['category_id.name', '=', category],
        ['category_id.parent_id.name', '=', 'location']
      ],
      { order: 'street2' }
    )

    return ids
  }

  static async search_location_room() {
    return this.search_location('room')
  }

  static async search_location_area() {
    const ids = await this.search([
      ['parent_id.category_id.name', '=', 'room'],
      ['parent_id.category_id.parent_id.name', '=', 'location']
    ])

    return ids
  }

  static async get_sportType() {
    const ids = await this.search_location_room()
    const records = await this.browse(ids)
    const records2 = records.fetch_all()
    return records2
  }

  static async get_bookvenue(room_id) {
    const domain = [['parent_id', '=', room_id]]
    const ids = await this.search(domain)
    const records = await this.browse(ids)
    const records2 = records.fetch_all()
    return records2
  }
}

const AddonsModels = {
  'res.partner': ResPartner
}

export default AddonsModels

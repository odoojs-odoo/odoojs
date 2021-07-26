import { LoginTestCase } from './base'

export default class O2mModelTestCase extends LoginTestCase {
  async edit() {
    await this.login()
    const model = 'res.partner'
    const Model = this.api.env.model(model)
    const domain = [['id', '=', 7]]
    const fields = ['name', 'bank_ids']

    const records = await Model.search_browse({ domain, fields })
    console.log(records, records.values_list)
    const rid = records.values_list[0].id
    const rec = records.pick(rid)
    console.log(rec, rec.values)
    console.log(records, records.values)

    const banks = await rec.relation_browse('bank_ids', {
      fields: ['bank_id', 'acc_number']
    })

    console.log(banks, banks.values_list)
    console.log(rec, rec.values)

    const bank_id = banks.values_list[1].id
    const bank1 = banks.tree_pick(bank_id)

    await bank1.set_and_onchange('acc_number', 'asaa')
    await banks.tree_update(bank_id, bank1)
    console.log(banks, banks.values_list)

    const bank0 = await banks.tree_new()
    await bank0.set_and_onchange('acc_number', 'dddd')
    await banks.tree_update(bank0.id, bank0)

    const bank91 = banks.values_list[0].id
    await banks.tree_remove(bank91)

    console.log(banks, banks.values_list)

    console.log(rec, rec.values)

    await rec.commit()

    console.log(rec, rec.values)
  }
}

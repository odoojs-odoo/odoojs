import { LoginTestCase } from './base'

export default class AccountOpenTestCase extends LoginTestCase {
  async test() {
    await this.login()
    const model = 'account.move.line.open'
    const Model2 = this.api.env.model(model)
    const move = await Model2.open_move_get()

    const Model = Model2.with_context({ default_move_id: move.id })
    console.log([Model])
    const bal_line = await Model.open_move_balance_line_get()
    console.log(move, bal_line)

    const records = await Model.create_record()

    records.domain = []
    records.order = 'id'
    records.offset = 0
    records.limit = 10

    const res = await records.pageGoto()
    console.log(records, res)
    const res2 = await records.pageGoto(2)
    console.log(records, res2)

    // const rec = await Model.new_and_onchange()
    // console.log(rec)
    // const acc_ops = await rec.get_selection('account_id', { limit: 0 })
    // console.log(acc_ops)
    // const account_tuple = acc_ops[0]
    // await rec.set_and_onchange('account_id', account_tuple[0], {
    //   text: account_tuple[1]
    // })

    // console.log(rec)
    // await rec.set_and_onchange('debit', 200)
    // console.log(rec)
    // await rec.commit()

    // console.log(rec)

    // await move.refresh()
    // await bal_line.refresh()
    // console.log(move, bal_line)

    // const res3 = await records.pageGoto()
    // console.log(records, res3)
    // const rec2 = records.pick(res3[res3.length - 1].id)

    // await rec2.set_and_onchange('debit', 120)
    // console.log(rec2)
    // await rec2.commit()

    // await move.refresh()
    // await bal_line.refresh()
    // console.log(move, bal_line)

    const res4 = await records.pageGoto()
    console.log(records, res4)

    const rec3 = records.pick(res4[res4.length - 1].id)

    await rec3.unlink()

    await move.refresh()
    await bal_line.refresh()
    console.log(move, bal_line)

    const res5 = await records.pageGoto()
    console.log(records, res5)
  }
}

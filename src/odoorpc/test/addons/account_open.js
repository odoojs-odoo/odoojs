/* eslint-disable no-unused-vars */
import { LoginTestCase } from './base'

export default class AccountOpenTestCase extends LoginTestCase {
  async test_move() {
    await this.login()
    const model = 'account.move.open'
    const Model = this.api.env.model(model)
    console.log([Model])
    const move_ids = await Model.search([])
    console.log([move_ids])

    const fields = [
      'company_id',
      'date',
      'state',
      'balance_debit',
      'balance_credit',
      'balance_balance'
      // 'open_line_ids'
    ]

    const move = await Model.browse(move_ids, { fields })
    console.log([move])

    await move.set_and_onchange('date', '2021-08-02')
    console.log(move)
    await move.commit()
    console.log(move)

    const res = await move.button_clicked('object', 'action_post')
    const res2 = await move.button_clicked('object', 'button_cancel')
    const res3 = await move.button_clicked('object', 'button_draft')

    console.log(res, res2, res3)
  }
  async test_line_o2m() {
    await this.login()

    const get_move = async () => {
      const model = 'account.move.open'
      const Model = this.api.env.model(model)
      console.log([Model])
      const move_ids = await Model.search([])
      console.log([move_ids])

      const fields = [
        'company_id',
        'date',
        'state',
        'balance_debit',
        'balance_credit',
        'balance_balance',
        'open_line_ids'
      ]

      const move = await Model.browse(move_ids[0], { fields })
      console.log([move])
      return move
    }

    const get_lines = async move => {
      const fields = [
        'company_id',
        'account_id',
        'name',
        'debit',
        'credit',
        'balance',
        'move_id',
        'parent_state'
      ]

      const lines = await move.relation_browse('open_line_ids', { fields })
      return lines
    }

    const new_line = async (move, lines) => {
      const rec = await lines.tree_new()
      console.log(rec)
      const acc_ops = await rec.get_selection('account_id', { limit: 0 })
      console.log(acc_ops)
      const account_tuple = acc_ops[0]
      await rec.set_and_onchange('account_id', account_tuple[0], {
        text: account_tuple[1]
      })

      console.log(rec)
      await rec.set_and_onchange('debit', 200)
      console.log(rec)

      await lines.tree_update(rec.id, rec)

      await move.commit()

      console.log(rec)
    }

    const write_line = async (move, lines) => {
      const rid = lines.ids[lines.ids.length - 1]
      const rec = lines.tree_pick(rid)
      const values = rec.values
      const debit = values.debit
      await rec.set_and_onchange('debit', debit * 1.2)
      console.log(rec)
      await lines.tree_update(rec.id, rec)
      await move.commit()
    }

    const unlink_line = async (move, lines) => {
      const rid = lines.ids[lines.ids.length - 1]
      // const rec = lines.tree_pick(rid)

      await lines.tree_remove(rid)
      await move.commit()
    }

    const move = await get_move()
    // const lines = await get_lines(move)

    // await new_line(move, lines)
    // await write_line(move, lines)
    // await unlink_line(move, lines)
  }

  async test_line() {
    await this.login()
    const model = 'account.move.line.open'
    const Model = this.api.env.model(model)
    console.log([Model])
    const line_ids = await Model.search([])
    console.log([line_ids])

    const fields = [
      'company_id',
      'account_id',
      'name',
      'debit',
      'credit',
      'balance',
      'move_id',
      'parent_state'
    ]

    const lines = await Model.browse(line_ids, { fields })
    console.log([lines])

    const new_line = async () => {
      const rec = await Model.new_and_onchange({ fields })
      console.log(rec)
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
    }

    const write_line = async () => {
      const ids = lines.ids
      console.log(ids)
      const row_id = ids[ids.length - 1]
      const rec = lines.pick(row_id)
      console.log(rec)
      const account_id = rec.values.account_id
      console.log(account_id)
      const debit = rec.values.debit
      console.log(debit)

      await rec.set_and_onchange('account_id', account_id + 1, { text: '' })
      console.log(rec)
      await rec.set_and_onchange('debit', debit * 1.2)
      console.log(rec)
      await rec.commit()
    }

    const unlink_line = async () => {
      const ids = lines.ids
      console.log(ids)
      const row_id = ids[ids.length - 1]
      const rec = lines.pick(row_id)
      console.log(rec)
      await rec.unlink()
      console.log(rec)
      // await rec.commit()
    }

    // await new_line()
    // await write_line()
    // await unlink_line()
  }

  async test() {
    // await this.test_move()
    await this.test_line_o2m()
    // await this.test_line()

    // await this.test2()
  }

  async test2() {
    await this.login()
    const model = 'account.move.line.open2'
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
    // const res2 = await records.pageGoto(2)
    // console.log(records, res2)

    const rec = await Model.new_and_onchange()
    console.log(rec)
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

    // const res4 = await records.pageGoto()
    // console.log(records, res4)

    // const rec3 = records.pick(res4[res4.length - 1].id)

    // await rec3.unlink()

    // await move.refresh()
    // await bal_line.refresh()
    // console.log(move, bal_line)

    // const res5 = await records.pageGoto()
    // console.log(records, res5)
  }
}

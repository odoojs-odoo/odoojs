import { Model } from '../models'

export class AccountMove extends Model {
  constructor(...args) {
    super(...args)
  }
}

export class AccountMoveLine extends Model {
  constructor(...args) {
    super(...args)
  }
}

// const OPEN = 'OPEN'

// export class AccountMoveLineOpen extends AccountMoveLine {
//   constructor(...args) {
//     super(...args)
//   }

//   static get _name() {
//     return 'account.move.line'
//   }

//   static get default_fields_list() {
//     return [
//       'account_id',
//       'name',
//       'debit',
//       'credit',
//       'balance',
//       'move_id',
//       'parent_state'
//     ]
//   }

//   static get default_domain() {
//     const move_id = this.env.context.default_move_id
//     if (move_id) {
//       return [
//         ['move_id', '=', move_id],
//         ['account_id.code', '!=', '999999']
//       ]
//     }

//     return [
//       ['move_id.type', '=', 'entry'],
//       ['move_id.journal_id.code', '=', OPEN],
//       ['move_id.journal_id.type', '=', 'general'],
//       ['account_id.code', '!=', '999999']
//     ]
//   }

//   static async create_record(payload = {}) {
//     return super.create_record({ ...payload, fields: this.default_fields_list })
//   }

//   static async web_search_read(kwargs = {}) {
//     const { domain = [] } = kwargs
//     return super.web_search_read({
//       ...kwargs,
//       domain: [...this.default_domain, ...domain]
//     })
//   }

//   static async new_and_onchange(payload = {}) {
//     return super.new_and_onchange({
//       ...payload,
//       fields: this.default_fields_list
//     })
//   }

//   static async _open_move_id_get() {
//     const find_journal = async () => {
//       const Journal = this.env.model('account.journal')
//       const domain = [
//         ['code', '=', OPEN],
//         ['type', '=', 'general']
//       ]
//       const journal_ids = await Journal.search(domain, { limit: 1 })

//       if (journal_ids.length) {
//         return journal_ids[0]
//       }

//       const values = { code: OPEN, name: OPEN, type: 'general' }
//       const journal_id = await Journal.create(values)
//       return journal_id
//     }

//     const find_account = async () => {
//       const Account = this.env.model('account.account')
//       const domain = [['code', '=', '999999']]
//       const account_ids = await Account.search(domain, { limit: 1 })
//       return account_ids[0]
//     }

//     const find_move = async () => {
//       const Move = this.env.model('account.move')
//       const domain = [
//         ['type', '=', 'entry'],
//         ['journal_id.code', '=', OPEN],
//         ['journal_id.type', '=', 'general']
//       ]
//       const move_ids = await Move.search(domain, { limit: 1 })

//       // console.log(' web_search_read move_ids,', move_ids)
//       if (move_ids.length) {
//         return move_ids[0]
//       }

//       const journal_id = await find_journal()
//       // console.log(' web_search_read journal_id,', journal_id)
//       const account_id = await find_account()
//       // console.log(' web_search_read account_id,', account_id)

//       const line_values = { account_id, name: '_balance' }

//       const values = {
//         journal_id,
//         ref: OPEN,
//         type: 'entry',
//         line_ids: [[0, false, line_values]]
//       }

//       const move_id = await Move.create(values)
//       return move_id
//     }

//     const move_id = await find_move()
//     return move_id
//   }

//   static async open_move_get() {
//     const move_id = await this._open_move_id_get()
//     // console.log(' web_search_read move_id,', move_id)
//     const move_record = await this.env
//       .model('account.move')
//       .browse(move_id, { fields: ['date', 'journal_id', 'state', 'line_ids'] })

//     // await move_record.relation_browse('line_ids', {
//     //   fields: ['account_id', 'name', 'debit', 'credit', 'move_id']
//     // })
//     // console.log(' web_search_read move_record,', move_record)

//     return move_record
//   }

//   static async _open_move_balance_line_id_get(move_id) {
//     const get_domain = move_id1 => {
//       const move_id2 = move_id1 || this.env.context.default_move_id
//       if (move_id2) {
//         return [
//           ['move_id', '=', move_id2],
//           ['account_id.code', '=', '999999']
//         ]
//       } else {
//         return [
//           ['move_id.type', '=', 'entry'],
//           ['move_id.journal_id.code', '=', OPEN],
//           ['move_id.journal_id.type', '=', 'general'],
//           ['account_id.code', '=', '999999']
//         ]
//       }
//     }

//     const domain = get_domain(move_id)

//     const balance_line_ids = await this.search(domain)
//     return balance_line_ids[0]
//   }

//   static async open_move_balance_line_get(move_id) {
//     const line_id = await this._open_move_balance_line_id_get(move_id)

//     const balance_line = await this.browse(line_id, {
//       fields: this.default_fields_list
//     })
//     return balance_line
//   }

//   static async create(vals) {
//     console.log(vals)
//     // return super.create(vals)
//     return this._update_by_move(0, 0, vals)
//   }

//   static async write(rid, vals) {
//     return this._update_by_move(1, rid, vals)
//   }

//   static async unlink(rid) {
//     return this._update_by_move(2, rid, false)
//   }

//   static async _update_by_move(op, row_id, vals) {
//     const read_move = async move_id => {
//       const Move = this.env.model('account.move')
//       const moves = await Move.read(move_id, ['line_ids', 'journal_id'])
//       const move = moves[0]
//       return move
//     }

//     const update_move = async payload => {
//       const { move_id, line_ids, journal_id, new_line_tuple } = payload
//       const balance_line_id = await this._open_move_balance_line_id_get(move_id)

//       // console.log(balance_line_id)

//       const get_balance_line_values = async () => {
//         const line_ids_in_context = [
//           [6, 0, line_ids],
//           [3, balance_line_id],
//           new_line_tuple
//         ]
//         const Move_Line = this.with_context({
//           ...this.constructor.context,
//           journal_id,
//           line_ids: line_ids_in_context
//         })

//         const new_line = await Move_Line.default_get(['debit', 'credit'])
//         return new_line
//       }

//       const balance_line_values = await get_balance_line_values()

//       console.log(balance_line_values)

//       // const Move = this.env.model('account.move')
//       // await Move.write(move_id, {
//       //   line_ids: [
//       //     [1, balance_line_id, { ...balance_line_values }],
//       //     new_line_tuple
//       //   ]
//       // })
//     }

//     const get_new_line_id = async (move_id, line_ids) => {
//       const Move = this.env.model('account.move')
//       const moves2 = await Move.read(move_id, ['line_ids'])
//       const move2 = moves2[0]
//       const lines2 = move2.line_ids.filter(item => !line_ids.includes(item))
//       const new_line_id = lines2[0]
//       return new_line_id
//     }

//     const move_id = this.env.context.default_move_id

//     const move = await read_move(move_id)
//     console.log(move)
//     const line_ids = move.line_ids
//     const journal_id = move.journal_id[0]
//     const new_line_tuple = [op, row_id, vals]
//     await update_move({ move_id, line_ids, journal_id, new_line_tuple })

//     if (op) {
//       return true
//     } else {
//       return await get_new_line_id(move_id, line_ids)
//     }
//   }
// }

const AddonsModels = {
  'account.move': AccountMove,
  'account.move.line': AccountMoveLine
  // 'account.move.line.open2': AccountMoveLineOpen
}

export default AddonsModels

// 期初数 功能 移植到 服务端, 以上功能作废

import { FormView } from './formview'

export class WizardView extends FormView {
  constructor(action_id, payload = {}) {
    console.log(action_id, payload)
    super(action_id, { ...payload })

    const { active_ids, active_id } = payload

    this.active_ids = active_ids
    this.active_id =
      active_id || (active_ids.length ? active_ids[0] : undefined)
  }

  get context() {
    const context = super.context
    return {
      ...context,
      active_id: this.active_id,
      active_ids: this.active_ids
    }
  }

  arch_buttons(record_in, values) {
    const { view } = this.view_info
    const { arch = {} } = view

    const buttons = arch.buttons || []

    // console.log(header, buttons)
    const btns = buttons.filter(btn => {
      if (btn.invisible === undefined) return true

      if (typeof btn.invisible !== 'function') {
        return !btn.invisible
      }
      const record = this._get_values_for_context(record_in, values)
      // console.log(btn, record)
      return !btn.invisible({ record })
    })

    const btns2 = btns.map(item => {
      const item2 = { ...item }
      delete item2.invisible
      return item2
    })

    return btns2
  }

  //   async onchange_new() {}

  async wizard_button_clicked({ type, name }) {
    console.log(type, name)

    const res_id = await this.commit()
    console.log(type, name, res_id)
    // const res = await this.read(res_id)
    // console.log(type, name, res_id, res)

    const ctx_action = this.context
    const ctx_me = {} // todo
    const context = { ...ctx_action, ...ctx_me }

    const res = await this.Model.call_button(name, [res_id], { context })
    console.log(type, name, res)

    // const ctx_action = this.context
    // const ctx_me = {} // todo
    // const context = { ...ctx_action, ...ctx_me }
    // const res = await this.Model.call_button(name, [record.id], { context })
    // // console.log(' clicked, object:', name, res)
    // if (!res) return res
    // else {
    //   console.log('button_clicked, return action ', res)
    //   // const ctx_active = this._active_context(info, { record })
    //   // const context2 = { ...ctx_action, ...ctx_node, ...ctx_active }
    //   // return await this.button_clicked_after({
    //   //   context: context2,
    //   //   action: res
    //   // })
    // }
    // if (type === 'action') {
    //   // console.log('button_clicked call action', type, name)
    //   return this._button_clicked_action({ name, record })
    // } else if (type === 'object') {
    //   return this._button_clicked_object({ name, record })
    // } else {
    //   // console.log('btn clicked', type, name)
    //   throw 'button_clicked, not type'
    // }
  }
}

import { FormView } from './formview'

export class WizardView extends FormView {
  constructor(action_id, payload = {}) {
    super(action_id, { ...payload })
  }

  async wizard_button_clicked({ type, name }, validate) {
    // console.log(type, name)

    const res_id = await this.commit(validate)
    if (!res_id) {
      throw 'form validate error'
    }
    // console.log(type, name, res_id)
    // const res = await this.read(res_id)
    // console.log(type, name, res_id, res)

    const ctx_action = this.context
    const ctx_me = {} // todo
    const context = { ...ctx_action, ...ctx_me }

    const res = await this.Model.call_button(name, [res_id], { context })
    console.log(type, name, res)

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

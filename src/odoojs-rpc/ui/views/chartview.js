import { BaseView } from './baseview'

export class ChartView extends BaseView {
  constructor(action_id, payload = {}) {
    super(action_id, { ...payload, type: 'chart' })
  }

  async _get_echart_option_from_arch() {
    const { view = {} } = this.view_info

    const { arch = {} } = view
    if (arch.option) {
      return arch.option
    } else {
      return
    }
  }

  async _get_echart_run_from_arch() {
    const { view = {} } = this.view_info

    const { arch = {} } = view
    if (arch.run_server) {
      return arch.run_server
    } else {
      return
    }
  }

  async echart_run(myChart) {
    const run_server = await this._get_echart_run_from_arch()
    if (run_server) {
      await this.Model[run_server.name](myChart)
      return
    }

    const option = await this._get_echart_option_from_arch()
    if (!option) {
      console.log(this.view_info)
      return
    }
  }
}

import { LoginTestCase } from './base'

const deep_copy = node => {
  return JSON.parse(JSON.stringify(node))
}

export default class AccountReportTestCase extends LoginTestCase {
  async general_ledger() {
    await this.login()

    const model = 'account.report.general.ledger'
    const Model = this.api.env.model(model)
    console.log([Model])
    const months = await Model.search_read_months()
    console.log(months)

    const date_month = '2021-06-01'
    const result = await Model.report_month(date_month)
    console.log(deep_copy(result))

    const result2 = await Model.export_report_month(date_month)
    // console.log(deep_copy(result2))
    console.log(result2)

    this.api.download(result2)
  }

  async partner_ledger() {
    await this.login()

    const model = 'account.report.partner.ledger'
    const Model = this.api.env.model(model)
    console.log([Model])
    const months = await Model.search_read_months()
    console.log(months)

    const date_month = '2021-06-01'
    const result = await Model.report_month(date_month)
    console.log(deep_copy(result))

    const result2 = await Model.export_report_month(date_month)
    // console.log(deep_copy(result2))
    console.log(result2)

    this.api.download(result2)
  }

  async balancesheet() {
    await this.login()

    const model = 'accounting.report.balancesheet'
    const Model = this.api.env.model(model)
    console.log([Model])
    const months = await Model.search_read_months()
    console.log(months)

    const last_month = months[months.length - 1]

    // const date_month = '2021-08-01'
    const date_month = last_month.date_month

    const result = await Model.report_month(date_month)
    console.log(deep_copy(result))

    const result2 = await Model.export_report_month(date_month)
    // console.log(deep_copy(result2))
    console.log(result2)

    // this.api.download(result2)
  }

  async profitandloss() {
    await this.login()

    const model = 'accounting.report.profitandloss'
    const Model = this.api.env.model(model)
    console.log([Model])
    const months = await Model.search_read_months()
    console.log(months)

    const date_month = '2021-06-01'
    const result = await Model.report_month(date_month)
    console.log(deep_copy(result))

    const result2 = await Model.export_report_month(date_month)
    // console.log(deep_copy(result2))
    console.log(result2)

    this.api.download(result2)
  }
}

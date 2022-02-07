import { Model } from '../models'

export class AccountCommonReport extends Model {
  constructor(...args) {
    super(...args)
  }
  static get _name() {
    return 'account.common.report'
  }

  static report_name() {
    return '财务报表'
  }

  static async search_read_months() {
    const months = await this.execute('search_read_months')

    return months.map(item => {
      const date = new Date(item.date_month)
      return {
        ...item,
        date_month_name: `${date.getFullYear()}年${date.getMonth() + 1}月`
      }
    })
  }

  static async export_xlsx_account_report(data) {
    const url = '/web2/export/xlsx/account/report'
    const data2 = await this._odoo.file_export(url, data)

    return data2
  }

  static async report_month(date_month, values = {}, context = {}) {
    const context2 = { ...this.env.context, ...context }
    const result = await this.execute_kw('report_month', [date_month], {
      values,
      context: context2
    })
    // console.log('report_month', result)
    return result
  }

  static async export_report_month(date_month, data = {}) {
    const { values = {}, context = {} } = data
    const data2 = { date_month, model: this._name, ...data, values, context }
    const result = await this.export_xlsx_account_report({ ...data2 })

    // console.log(result)
    return result
  }
}

export class AccountingReport extends AccountCommonReport {
  constructor(...args) {
    super(...args)
  }

  static get _name() {
    return 'accounting.report'
  }
}

export class AccountingReportBalancesheet extends AccountingReport {
  constructor(...args) {
    super(...args)
  }
  static get account_report_id_ref() {
    return 'accounting_pdf_reports.account_financial_report_balancesheet0'
  }

  static report_name() {
    return '资产负债表'
  }

  static async report_month(date_month, values = {}) {
    const context = {
      default_account_report_id_ref: this.account_report_id_ref
    }
    const result = await super.report_month(date_month, values, context)
    return result
  }

  static async export_report_month(date_month, data = {}) {
    const data2 = {
      ...data,
      context: {
        default_account_report_id_ref: this.account_report_id_ref
      }
    }
    console.log('export_report_month', data)
    const result = await super.export_report_month(date_month, data2)
    return result
  }
}

export class AccountingReportProfitandloss extends AccountingReport {
  constructor(...args) {
    super(...args)
  }

  static get account_report_id_ref() {
    return 'accounting_pdf_reports.account_financial_report_profitandloss0'
  }

  static report_name() {
    return '损益表'
  }

  static async report_month(date_month, values = {}) {
    const context = {
      default_account_report_id_ref: this.account_report_id_ref
    }
    const result = await super.report_month(date_month, values, context)
    return result
  }

  static async export_report_month(date_month, data = {}) {
    const data2 = {
      ...data,
      context: {
        default_account_report_id_ref: this.account_report_id_ref
      }
    }
    console.log('export_report_month', data)
    const result = await super.export_report_month(date_month, data2)
    return result
  }
}

export class AccountReportGeneralLedger extends AccountCommonReport {
  constructor(...args) {
    super(...args)
  }
  static get _name() {
    return 'account.report.general.ledger'
  }

  static report_name() {
    return '总账'
  }
}

export class AccountReportPartnerLedger extends AccountCommonReport {
  constructor(...args) {
    super(...args)
  }
  static get _name() {
    return 'account.report.partner.ledger'
  }

  static report_name() {
    return '应收应付账'
  }
}

const AddonsModels = {
  'account.common.report': AccountCommonReport,
  //   'accounting.report': AccountingReport,
  'accounting.report.balancesheet': AccountingReportBalancesheet,
  'accounting.report.profitandloss': AccountingReportProfitandloss,
  'account.report.general.ledger': AccountReportGeneralLedger,
  'account.report.partner.ledger': AccountReportPartnerLedger
}

export default AddonsModels

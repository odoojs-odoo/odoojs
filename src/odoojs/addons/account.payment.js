const action_account_payments_kanban = `
<templates name="kanban" model="account.move" string="收款单">
  <div name="title">
    <field name="name" />
  </div>
  <div name="label">
    <div> <field name="payment_date" /></div> 
    <div> <field name="partner_id" /></div> 
  </div>
  <div name="content">
    <div> <field name="amount" /></div> 
    <div> <field name="state" /></div> 
  </div>
</templates >
`

const action_account_payments_payable_kanban = `
<templates name="kanban" model="account.move" string="付款单">
  <div name="title">
    <field name="name" />
  </div>
  <div name="label">
    <div> <field name="payment_date" /></div> 
    <div> <field name="partner_id" /></div> 
  </div>
  <div name="content">
    <div> <field name="amount" /></div> 
    <div> <field name="state" /></div> 
  </div>
</templates >
`

const action_account_payments_transfer_kanban = `
<templates name="kanban" model="account.move" string="转款单">
  <div name="title">
    <field name="name" />
  </div>
  <div name="label">
    <div> <field name="payment_date" /></div> 
  </div>
  <div name="content">
    <div> <field name="amount" /></div> 
    <div> <field name="state" /></div> 
  </div>
</templates >
`

const AccountPayment = {
  'account.action_account_payments': {
    domain: '[("partner_type", "=", "customer")]',
    fields_views: {
      kanban: {
        templates: action_account_payments_kanban
      }
    }
  },
  'account.action_account_payments_payable': {
    domain: '[("partner_type", "=", "supplier")]',
    fields_views: {
      kanban: {
        templates: action_account_payments_payable_kanban
      }
    }
  },

  'account.action_account_payments_transfer': {
    domain: '[("payment_type", "=", "transfer")]',
    fields_views: {
      kanban: {
        templates: action_account_payments_transfer_kanban
      }
    }
  }
}

const AddonsActions = {
  ...AccountPayment
}

export default AddonsActions

/*
1. 可能在 odoo 14 下 , 有区别, 待调试
2. 如果 有版本差异, 那么 odoojs 需要 考虑如何控制版本
3. 仿照前面实现的思路, 
4. 登录后 读取 odoo 版本
5. viewmodel 读取 模型时, 检查版本号, 选择相应的代码

*/

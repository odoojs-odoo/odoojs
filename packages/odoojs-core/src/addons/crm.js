// 2019-8-10 to debug

const models = {
  'crm.lead': {
    extend: BaseClass => {
      class cls extends BaseClass {
        action_set_lost() {
          const data = this._rpc_call('action_set_lost');
          this.browse({ probability: 0, active: 0 });
          return data;
        }

        action_set_won() {
          const data = this._rpc_call('action_set_won');
          //this.setattr('address_fields', data)
          this.browse({ probability: 0, stage_id: 0 });
          return data;
        }
      }

      return cls;
    },
  },
};

export default {
  name: 'crm',
  depends: [
    'sales_team',
    'mail',
    // calendar, resource
  ],
  models,
};

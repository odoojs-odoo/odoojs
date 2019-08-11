// TO debug 2019-8-10

const models = {
  'res.country': {
    extend: BaseClass => {
      class cls extends BaseClass {
        get_address_fields() {
          const data = this._rpc_call('get_address_fields', []);
          return data;
        }
      }
      return cls;
    },
  },

  'res.currency': {
    extend: BaseClass => {
      class cls extends BaseClass {
        amount_to_text(amount) {
          const data = this._rpc_call('amount_to_text', [amount]);
          return data;
        }

        round(amount) {
          const data = this._rpc_call('round', [amount]);
          return data;
        }

        compare_amounts(amount1, amount2) {
          const data = this._rpc_call('compare_amounts', [amount1, amount2]);
          return data;
        }

        is_zero(amount) {
          const data = this._rpc_call('is_zero', [amount]);
          return data;
        }
      }

      return cls;
    },
  },

  'res.partner': {
    extend: BaseClass => {
      class cls extends BaseClass {
        async address_get() {
          const data = this._rpc_call('address_get');
          return data;
        }

        async update_address(vals) {
          const data = this._rpc_call('update_address', [vals]);
          if (data) {
            //TBD
          }
          return this.address_get();
        }

        async create_company() {
          const data = this._rpc_call('create_company', []);
          if (data) {
            //TBD
          }
          return await this.browse({ parent_id: 0, child_ids: 0 });
        }
      }

      cls.main_partner = async () => {
        const data = cls._rpc_call('main_partner', []);
        return data;
      };

      cls.find_or_create = async (email, fields = {}) => {
        return await cls._rpc_call_as_create_read(
          {
            method: 'find_or_create',
            args: [email],
          },
          fields
        );
      };

      return cls;
    },
  },

  'res.users': {
    extend: BaseClass => {
      class cls extends BaseClass {}

      cls.change_password = async (old_passwd, new_passwd) => {
        const data = cls._rpc_call('change_password', [old_passwd, new_passwd]);
        return data;
      };

      cls.has_group = async group_ext_id => {
        const data = cls._rpc_call('has_group', [group_ext_id]);
        return data;
      };

      cls.copy_admin = async vals => {
        const user = await cls.create(vals);
        if (!user) {
          return user;
        }
        const [model, admin_id] = await cls.ref('base.user_admin');

        if (model !== 'res.users') {
        }

        const admin = await cls.browse(admin_id, { groups_id: { name: 0 } });
        await user.write({
          groups_id: [[6, 0, admin.attr('groups_id').ids()]],
        });
        return user;
      };

      return cls;
    },
  },
};

export default {
  name: 'base',
  depends: [],
  models,
};

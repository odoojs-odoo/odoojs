import modelCreator from './models';
import RPC from './rpc';

import addons from './addons';

const rpc_mock = {
  fields_get: async (model, allfields, attributes) => {
    const models = {};
    models['res.partner'] = {
      id: { type: 'integer' },
      name: { type: 'char' },
      email: { type: 'char' },
      title: { type: 'many2one', relation: 'res.partner.title' },
      user_id: { type: 'many2one', relation: 'res.users' },
      company_id: { type: 'many2one', relation: 'res.company' },
      category_id: { type: 'many2many', relation: 'res.partner.category' },
    };

    models['res.partner.title'] = {
      name: { type: 'char' },
      shortcut: { type: 'char' },
    };

    models['res.users'] = {
      name: { type: 'char' },
      login: { type: 'char' },
    };

    models['res.partner.category'] = {
      name: { type: 'char' },
    };

    return models[model];
  },
};

class Odoo {
  constructor(options) {
    /*
        params:
            host:
            db:
            modules: all modules to install
            //models:  all model to set fields.  2019-5-10, need not
        */

    const { host, db, modules, success, error } = options;

    const rpc = new RPC({ host, db, success, error });
    this._rpc = rpc;

    this._user = {};
    this._env = {};
    this._modules = {};
    const { base } = addons;
    const modules2 = { base, ...modules };

    this._modules_all = { ...addons, ...modules };

    for (const module_name in modules2) {
      this._fn_one_module(module_name);
    }
  }

  _fn_one_module(module_name) {
    if (this._modules[module_name]) {
      return;
    }

    const module = this._modules_all[module_name];

    const depends = module.depends || [];
    depends.forEach(item => {
      if (this._modules_all[item]) {
        this._fn_one_module(item);
      }
    });

    for (const model_name in module.models) {
      const model = module.models[model_name];
      this._fn_one_model(model_name, model);
    }

    this._modules[module_name] = module;
  }

  _fn_one_model(model_name, model) {
    let cls = this._env[model_name];
    if (cls) {
      cls._fields_raw = [...cls._fields_raw, ...model.fields];
    } else {
      const fields = model.fields || [];

      cls = modelCreator({
        model: model_name,
        fields,
        rpc: this._rpc,
        env: this._env,
      });
      this._env[model_name] = cls;
    }

    if (model.extend) {
      const extend_class = model.extend(cls);
      Object.defineProperty(extend_class, 'name', {
        value: cls._name,
        configurable: true,
      });

      extend_class._extends.push(model.extend);

      this._env[model_name] = extend_class;
    }
  }

  setCallback({ success, error }) {
    this._rpc.setCallback({ success, error });
  }

  async login(params) {
    const data = await this._rpc.login(params);
    if (!data.code) {
      Odoo._session[this._rpc.sid] = this;
      this._user = data.result;
      return data.result;
    }
    return null;
  }

  async logout() {
    const sid = this._rpc.sid;
    const data = this._rpc.logout();
    this._user = {};
    delete Odoo._session[sid];
    return data;
  }

  get env() {
    return this._env;
  }

  get_model(model) {
    // get a model cls from odoo._env
    let cls = this._env[model];
    if (!cls) {
      cls = modelCreator({ model, rpc: this._rpc, env: this._env });
      this._env[model] = cls;
    }
    return cls;
  }

  get user() {
    return this._user;
  }

  async me(fields) {
    // get login user
    const uid = this._rpc.uid;
    return this.get_model('res.users').browse(uid, fields);
  }

  async ref(xmlid) {
    // get model and id from xmlid
    return this.get_model('ir.model.data').call('xmlid_to_res_model_res_id', [
      xmlid,
      true,
    ]);
  }

  mock() {
    const rpc = this._rpc;
    rpc.login = async params => {
      const { login, password } = params;
      let data = {};
      if (login === 'admin' && password === '123') {
        data = {
          code: 0,
          result: { status: 'ok', sid: `sid_${login}_${password}`, uid: 1 },
        };
      } else {
        data = { code: 0, result: { status: 'error' } };
      }

      const { code } = data;
      if (!code) {
        const {
          result: { status },
        } = data;
        if (status === 'ok') {
          const {
            result: { sid, uid },
          } = data;
          rpc.sid = sid;
          rpc.uid = uid;
        } else {
          rpc.sid = null;
          rpc.uid = null;
        }
      } else {
        rpc.sid = null;
        rpc.uid = null;
      }
      return data;
    };
    rpc.logout = async () => {
      if (!rpc.sid) {
        return { code: 1, error: {} };
      }

      const data = { code: 0, result: {} };
      rpc.sid = null;
      rpc.uid = null;

      return data;
    };
    rpc.call = async params => {
      if (!rpc.sid) {
        return { code: 1, error: { message: 'no sid' } };
      }

      const { model, method, args = [], kwargs = {} } = params;
      const data = {
        code: 0,
        result: rpc_mock[method](model, ...args, kwargs),
      };
      const { code } = data;
      if (!code) {
        //const {result} = data
      }

      return data;
    };
  }
}

Odoo._session = {};

Odoo.load = session_id => {
  return Odoo._session[session_id];
};

Odoo.addons = addons;

export default Odoo;

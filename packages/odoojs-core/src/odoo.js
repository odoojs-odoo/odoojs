import modelCreator from './models';
import RPC from './rpc';

import addons from './addons';

class Odoo {
  constructor(options) {
    const { host, db, modules, success, error } = options;

    const rpc = new RPC({
      host,
      db,
      success,
      error,
    });

    this._env = {};
    this._rpc = rpc;

    this._host = host;
    this._db = db;

    this._user = {};
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

    if (!module) {
      return;
    }

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
    const cls = this._get_model(model_name);

    if (model.extend) {
      const extend_class = model.extend(cls);
      Object.defineProperty(extend_class, 'name', {
        value: cls._name,
        configurable: true,
      });

      // Used for cls.sudo
      //extend_class._extends.push(model.extend);

      this._env[model_name] = extend_class;
    }
  }

  async login(params) {
    const data = await this._rpc.login(params);
    if (!data.code) {
      this._user = data.result;
      return data.result;
    }
    return null;
  }

  async logout() {
    const data = this._rpc.logout();
    this._user = {};
    return data;
  }

  env(model) {
    return this._get_model(model);
  }

  _get_model(model) {
    let new_cls = this._env[model];
    if (!new_cls) {
      new_cls = modelCreator({ model, rpc: this._rpc, env: this._env });
      this._env[model] = new_cls;
    }
    return new_cls;
  }

  get user() {
    return this._user;
  }

  async me(fields) {
    // get login user
    const uid = this._rpc.uid;
    return this._get_model('res.users').browse(uid, fields);
  }

  async ref(xmlid) {
    // get model and id from xmlid
    return this._get_model('ir.model.data')._rpc_call(
      'xmlid_to_res_model_res_id',
      [xmlid, true]
    );
  }
}

Odoo.addons = addons;

export default Odoo;

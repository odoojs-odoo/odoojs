import ResPartner from './ResPartner';
import ProductProduct from './ProductProduct';

class ODOO {
  constructor({ models }) {
    this._user = {};
    this._env = {};
    this._env['res.partner'] = ResPartner;
    this._env['product.product'] = ProductProduct;
    ProductProduct._env = this._env;
  }

  get user() {
    return this._user;
  }

  env(model) {
    return this._env[model];
  }

  async login({ login, password }) {
    this._user = {
      username: login,
      name: login,
      uid: 1,
      session_id: `sid_${login}`,
    };
    return `sid_${login}`;
  }
}

const get_odoo = () => {
  const models = {
    'res.partner': ['name', 'email', 'image'],
  };

  const odoo = new ODOO({ models });
  return odoo;
};

const odoo = get_odoo();
console.log(odoo);
export default odoo;

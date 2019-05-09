import ODOO from '../src';

//var ODOO = require("../lib");

//  const host = '/api';
const host = 'http://192.168.56.101:8069';
const db = 'T3';

//  const host = 'http://localhost:8069';
//  const host = 'http://39.97.162.188:8069';
//  const db = 'Account20190426';

describe('jsonrpc', () => {
  it('all ok', done => {
    test1(done);
  });
});

const test1 = async done => {
  const callbackerror = ({ url, params, error }) => {
    console.log('rpc call url:', url);
    console.log('rpc call params:', params);
    console.log('rpc call error:', error);
  };

  const odoo = ODOO({ host, db, callbackerror });

  const sid = await odoo.login({ login: 'admin', password: '123' });
  console.log(sid);

  const ppp = await odoo.env('res.partner').search([]);
  console.log(ppp);

  done();
};

// Only For Debug
//import fetch from 'dva/fetch';

const _fetch = (url, options, timeout) => {
  return Promise.race([
    fetch(url, options),
    new Promise(function(resolve, reject) {
      setTimeout(() => reject(new Error('request timeout')), timeout);
    }),
  ]);
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.name = response.status;
  error.data = response;
  throw error;
  //    return null;
};

const checkJsonrpc = async (response, oid, options) => {
  const data = await response.json();
  const { id, jsonrpc } = data;
  if (id === oid && jsonrpc === '2.0') {
    return data;
  }
  const error = new Error('Error jsonrpc');
  error.name = 'Jsonrpc';
  error.data = { id: oid, options, data };
  throw error;
  //    return null;
};

const checkOdooError = data => {
  const { result, error: error0 } = data;
  if (!error0) {
    return result;
  }

  console.log('checkOdooError:', error0);

  const { code, message, data: data2 } = error0;
  const error = new Error(message);
  error.name = code;
  error.data = data2;
  error.message = message;
  throw error;
  //    return null;
};

const jsonrpc = (url, params, timeout = 120) => {
  //console.log('jsonrpc=',url, params)
  const id = Math.round(Math.random() * 1000000000);
  const options = {
    method: 'POST',
    body: JSON.stringify({
      jsonrpc: 2.0,
      id,
      method: 'call',
      params: params,
    }),
    //headers: new Headers({ 'Content-Type': 'application/json' })
    headers: { 'content-type': 'application/json' },
  };

  const myFetch = timeout === 0 ? fetch : _fetch;
  const args = timeout === 0 ? [url, options] : [url, options, timeout * 1000];

  return myFetch(...args)
    .then(res => {
      //  console.log('1st',res)
      return checkStatus(res);
    })
    .then(async res => {
      // console.log('after status',res )
      return checkJsonrpc(res, id, options);
    })
    .then(data => {
      // console.log( 'after jsonrpc', data)
      return checkOdooError(data);
    })
    .then(result => {
      // console.log( 'result ok', result)
      return { code: 0, result };
    })
    .catch(error => {
      return { code: 1, error };
    });
};

class RPC {
  constructor(options) {
    const {
      host = '/api',
      db,
      sid = null,
      uid = null,
      user = null,
      timeout = 120,
      success,
      error,
    } = options;
    this.host = host;
    this.db = db;
    this.timeout = timeout;
    this.sid = sid;
    this.uid = uid;
    this.error = error || this._callbackerror;
    this.success = success || this._callbacksuccess;
    this._user = user;
  }

  setCallback({ success, error }) {
    this.error = error || this._callbackerror;
    this.success = success || this._callbacksuccess;
  }

  _callbacksuccess({ url, params, result }) {}

  _callbackerror({ url, params, error }) {
    console.log('rpc call error:', url, params, error);
  }

  async json(url, params, timeout) {
    const timeout1 = timeout === undefined ? this.timeout : timeout;
    const data = await jsonrpc(url, params, timeout1);
    const { code, result, error } = data;
    //console.log(url, params, data)

    if (code) {
      //console.log(url, params, error);
      this.error({ url, params, error });
    } else {
      this.success({ url, params, result });
    }
    return data;
  }

  async login(params) {
    const { db, login, password } = params;
    const url = `${this.host}/json/user/login`;

    if (db) {
      this.db = db;
    }

    const data = await this.json(url, {
      login,
      password,
      db: this.db,
    });

    const { code } = data;

    if (!code) {
      const {
        result: { session_id, uid },
      } = data;

      const { result } = data;
      this.sid = session_id;
      this.uid = uid;
      this._user = result;
    } else {
      //this.sid = null;
      //this.uid = null;
      //this._user = null;
    }

    return data;
  }

  async logout() {
    if (!this.sid) {
      //return { code: 1, error: {} };
    }

    //const url = `${this.host}/json/user/logout?session_id=${this.sid}`;

    const url = this.sid
      ? `${this.host}/json/user/logout?session_id=${this.sid}`
      : `${this.host}/json/user/logout`;

    const data = await this.json(url, {});
    const { code } = data;
    if (!code) {
      this.sid = null;
      this.uid = null;
      this._user = null;
    }

    this.sid = null;
    this.uid = null;
    this._user = null;
    return data;
  }

  async call(params) {
    //console.log('rpc call', params)
    const { model, method, args = [], kwargs = {}, sudo = null } = params;

    const { context = {} } = kwargs;
    const { lang: lang1 } = context;
    const {
      user_context: { lang: lang2 },
    } = this._user || { user_context: {} };
    const lang = lang1 || lang2 || 'en_US';

    //const url = `${this.host}/json/api?session_id=${this.sid}`;

    const url = this.sid
      ? `${this.host}/json/api?session_id=${this.sid}`
      : `${this.host}/json/api`;

    if (!this.sid) {
      //console.log('rpc call no sid:', params, this._callbackerror)

      this.error({ url, params, error: { message: 'no sid' } });
      return { code: 1, error: { message: 'no sid' } };
    }
    const data = await this.json(url, {
      model,
      method,
      args,
      kwargs: { ...kwargs, context: { ...context, lang } },
      sudo,
    });

    const { code } = data;
    if (!code) {
      //const { result } = data;
    }

    return data;
  }
}

export default RPC;

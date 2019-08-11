const modelCreator = options => {
  const {
    model: model_param,
    rpc: rpc_param,
    env: env_param,
    config: config_param = {},
  } = options;

  class cls {
    constructor(ids) {
      this._ids = [];
      this._id = null;

      if (ids && typeof ids === 'object') {
        this._ids = ids;
        this._id = ids.length ? ids[0] : null;
      } else {
        this._id = ids;
        this._ids = ids ? [ids] : [];
      }

      //this.id = this._id;
    }

    get length() {
      return this._ids.length;
    }

    get ids() {
      return this._ids;
    }

    get id() {
      return this._id;
    }

    async _rpc_call(method, args = [], kwargs = {}) {
      return cls._rpc_call(method, [this._ids, ...args], kwargs);
    }

    _get_records() {
      return this._ids.reduce((acc, cur) => {
        const rec = cls._records[cur];
        if (rec) {
          acc.push(rec);
        }
        return acc;
      }, []);
    }

    get _records() {
      return this._get_records();
    }

    get _list() {
      return this._get_records();
    }

    _look(fields) {
      return this._look1(fields);
    }

    _look1(fields) {
      if (this._id) {
        return cls._get_one(this._id, fields);
      } else {
        return {};
      }
    }

    _look2(fields) {
      return cls._get_multi(this._ids, fields);
    }
  }

  Object.defineProperty(cls, 'name', {
    value: model_param,
    configurable: true,
  });

  cls._name = model_param;
  cls._rpc = rpc_param;
  cls._env = env_param;

  cls._fields = {
    id: { type: 'integer' },
    display_name: { type: 'char' },
    name: { type: 'char' },
  };

  cls._config = {
    init: false,
    //return_with_error: false,
    fields_default: {},
    ...config_param,
  };

  cls._records = {};

  cls.env = model => {
    return cls._get_model(model);
  };

  cls._get_model = model => {
    let new_cls = cls._env[model];
    if (!new_cls) {
      new_cls = modelCreator({ model, rpc: cls._rpc, env: cls._env });
      cls._env[model] = new_cls;
    }
    return new_cls;
  };

  cls._view = ids => {
    const myCls = cls._env[cls._name];
    if (!ids) {
      return new myCls(ids);
    }

    if (Array.isArray(ids) && ids.length !== 1) {
      return new myCls(ids);
    }

    const id = Array.isArray(ids) ? ids[0] : ids;

    if (cls._records[id] === undefined) {
      cls._records[id] = new myCls(id);
    }
    return cls._records[id];
  };

  /*
  cls._goto_wizard = async (id, wizard_params, kwargs) => {
//    console.log( cls._name, id, wizard_model, wizard_id_field )

    const {
      wizard_model, wizard_id_field, wizard_vals, wizard_default_get,
      wizard_onchange, wizard_fields,
    } = wizard_params;

    const wizard = cls.env(wizard_model)
    //wizard._config.return_with_error = true;

    let new_vals = {}

    if(wizard_default_get){
      const defaults = await wizard._rpc_call_with_code(
        'default_get',
        [[]],
        {context:{ active_ids: [id], active_model: cls._name } },
        {message: 'call wizard default'}
      )

      //const defaults = await wizard.default_get([], {
      //  context:{ active_ids: [id], active_model: cls._name }
      //})

      if( defaults.code ){
        return cls._return( defaults ) //cls.wizard_return(defaults);
      }

      new_vals = defaults.result;


    }

    if (wizard_vals){
      new_vals = {...new_vals, ...wizard_vals }
    }

//    console.log(new_vals)

    let data = null
    let domain = {}


    if( wizard_onchange ){
      data = await wizard.call('create', [new_vals], {
        context:{ active_ids: [id], active_model: cls._name }
      })

      if(data.code){
        return cls.wizard_return(data);
      }

      for( const onchange of wizard_onchange) {
        const onchange_ret = await wizard.call(onchange, [ data.result ] )
        console.log(onchange_ret)
        if(onchange_ret.code){
          return cls.wizard_return(onchange_ret);
        }

        domain = { ...domain,  ...(onchange_ret.result.domain)}
        console.log(domain)


      }

//      const data6 = await arp.call('_onchange_amount', [wizard_id ] )
//      console.log( data6 )
//      const data7 = await arp.call('_onchange_journal', [wizard_id ] )
//      console.log( data7 )


      data = await wizard.browse(data.result, wizard_fields);

    }
    else{

      data = await wizard.create(
        new_vals,
        { context:{ active_ids: [id], active_model: cls._name }
        },
        {
          success: (result)=>{

          }
        }
      )

      //data = await wizard.create(new_vals, wizard_fields, {
      //  context:{ active_ids: [id], active_model: cls._name }
      //})

    }

    return cls.wizard_return(data, (result)=>{
      const result2 = {id, }
      result2[wizard_id_field] = result.look(wizard_fields);
      result2.domain = domain;
      return result2
    })

  }
*/

  cls._rpc_call_with_code = async (
    method,
    args = [],
    kwargs = {},
    context = {}
  ) => {
    const { success: success_callback, error: error_callback } = context;

    const context2 = { ...context };
    delete context2.success;
    delete context2.error;

    const params = {
      model: cls._name,
      method,
      args,
      kwargs,
    };

    //console.log(cls._name, method,  args, kwargs)
    const data = await cls._rpc.call(params);
    //console.log(data)

    const { code, result, error } = data;

    if (!code) {
      return {
        code,
        model: cls._name,
        method,
        ...context2,
        result: success_callback ? await success_callback(result) : result,
      };
    } else {
      return {
        code,
        model: cls._name,
        method,
        ...context2,
        result: error_callback ? await error_callback(error) : null,
        error,
      };
    }
  };

  cls._rpc_call_without_code = async (method, args, kwargs, context) => {
    const data = await cls._rpc_call_with_code(method, args, kwargs, context);
    return data.result;
  };

  cls._return = (data, error_value = null) => {
    return data;
    /*

    if (cls._config.return_with_error){
      return data;
    }

    const {code, result } = data;
    if(code){
      return error_value;
    }

    return result;

    */
  };

  cls._rpc_call = async (method, args, kwargs, context = {}) => {
    const { return_no_code } = context;
    const data = await cls._rpc_call_with_code(method, args, kwargs, context);

    if (return_no_code) {
      return data.result;
    } else {
      return data;
    }
  };

  cls._init_fields_to_call = async fields => {
    const metas0 = await cls._rpc_call_without_code('fields_get2', [fields]);
    const metas = metas0 || {};

    //console.log(metas)

    Object.keys(metas).forEach(model => {
      const new_cls = cls._get_model(model);
      new_cls._config.init = true;

      const to_fields = new_cls._fields;
      const from_fields = metas[model];

      for (const fld in from_fields) {
        to_fields[fld] = from_fields[fld];
      }
    });
  };

  cls._init_fields_check = fields => {
    if (!cls._config.init) {
      return true;
    }

    // fields must be dict
    const fields2 = fields || {};

    for (const fld in fields2) {
      const { type, relation } = cls._fields[fld];
      if (['many2one', 'one2many', 'many2many'].indexOf(type) < 0) {
        continue;
      }

      const ref_cls = cls._get_model(relation);
      const ref_check = ref_cls._init_fields_check(fields2[fld]);
      if (ref_check) {
        return true;
      }
    }

    return false;
  };

  cls._init_fields = async fields => {
    // TBD, 2019-7-19, to transfer fields from list to dict
    const check_ret = cls._init_fields_check(fields);
    if (check_ret) {
      await cls._init_fields_to_call(fields);
    }
  };

  cls._set_multi = (data, fields0) => {
    // TBD, 2019-7-19, to transfer fields from list to dict
    const fields = fields0 || cls._config.fields_default;
    const ret = data.reduce(
      (acc, cur) => {
        const one_instance = cls._set_one(cur, fields);
        if (one_instance) {
          acc.ids.push(one_instance.id);
          acc.records[one_instance.id] = one_instance;
        }
        return acc;
      },
      { ids: [], records: {} }
    );

    if (ret.ids.length === 1) {
      return ret.records[ret.ids[0]];
    }

    return cls._view(ret.ids);
  };

  cls._set_one = (data, fields0) => {
    const fields = fields0 || cls._config.fields_default;
    const { id } = data;
    if (!id) {
      return null;
    }

    const record_one = cls._view(id);

    return Object.keys(data).reduce((acc, fld) => {
      if (fld === 'id') {
        return acc;
      }

      const value = data[fld];
      const { type, relation } = (cls._fields || {})[fld] || {};

      if (['many2one', 'one2many', 'many2many'].indexOf(type) < 0) {
        if (type === 'date') {
          acc[fld] = value || null;
        } else {
          acc[fld] = value;
        }
        // TBD , bin , image ?
        return acc;
      }

      const ref_cls = cls._get_model(relation);
      if (type === 'many2one') {
        if (!value) {
          acc[fld] = null;
        } else if (value.length === 0) {
          acc[fld] = null;
        } else {
          // TBD: to set name, after to check cls._records

          const ref_vals = fields[fld]
            ? value[0]
            : {
                id: value[0],
                display_name: value[1],
              };

          const ref_rec = ref_cls._records[ref_vals.id];
          if (!fields[fld] && !(ref_rec && ref_rec.name)) {
            ref_vals['name'] = value[1];
          }

          acc[fld] = ref_cls._set_one(ref_vals, fields[fld]);
        }
      } else {
        if (fields[fld]) {
          acc[fld] = ref_cls._set_multi(value, fields[fld]);
        } else {
          acc[fld] = ref_cls._view(value);
        }
      }
      return acc;
    }, record_one);
  };

  // TBD 2019-8-9, notall ? what for?
  cls._get_multi = (ids, fields, notall) => {
    return ids.reduce((records, id) => {
      const item = cls._get_one(id, fields, notall);
      records.push(item);
      return records;
    }, []);
  };

  cls._get_one = (id, fields0, notall) => {
    const fields1 = Object.keys(cls._fields).reduce((acc, cur) => {
      acc[cur] = 1;
      return acc;
    }, {});

    //console.log(cls._name, fields0)
    const fields00 = fields0 || cls._config.fields_default;
    const fields = !notall ? { ...fields1, ...fields00 } : fields0 || fields1;

    const get_ref_fields = (fld, fields) => {
      let ref_fields = { name: null, display_name: null };
      if (fld in fields) {
        const ref_flds = fields[fld];
        if (typeof ref_flds === 'object') {
          ref_fields = ref_flds;
        }
      }

      return ref_fields;
    };

    return Object.keys(fields).reduce(
      (item, fld) => {
        const fld_meta = cls._fields[fld];
        if (!fld_meta) {
          return item;
        }

        const { type, relation } = fld_meta;

        if (['many2one', 'one2many', 'many2many'].indexOf(type) < 0) {
          if (cls._records[id]) {
            item[fld] = cls._records[id][fld];
          }
        } else if (type === 'many2one') {
          const ref_cls = cls._get_model(relation);

          const ref_id =
            cls._records[id] && cls._records[id][fld]
              ? cls._records[id][fld]._id
              : null;

          const ref_fields = get_ref_fields(fld, fields);
          const noall = !(typeof fields[fld] === 'object');
          item[fld] = ref_id && ref_cls._get_one(ref_id, ref_fields, noall);
        } else {
          const ref_cls = cls._get_model(relation);
          const ref_ids =
            cls._records[id] && cls._records[id][fld]
              ? cls._records[id][fld]._ids
              : null;
          const ref_fields = get_ref_fields(fld, fields);
          const noall = !(typeof fields[fld] === 'object');
          item[fld] = ref_ids && ref_cls._get_multi(ref_ids, ref_fields, noall);
        }

        return item;
      },
      { id }
    );
  };

  cls._ref = async xmlid => {
    // get model and id from xmlid
    return cls
      ._get_model('ir.model.data')
      ._rpc_call('xmlid_to_res_model_res_id', [xmlid, true]);
  };

  cls._rpc_call_with_read = async (method, args, kwargs = {}, context = {}) => {
    // {fields={}, context={}} = kwargs
    const { fields: fields0 } = kwargs || {};
    const { fields: fields1, success: success_cb, error: error_cb } =
      context || {};
    const fields = fields0 || fields1 || cls._config.fields_default;
    await cls._init_fields(fields);

    const success = result => {
      const data = cls._set_multi(result || [], fields);
      return success_cb ? success_cb(data) : data;
    };

    const error = error => {
      const data = cls._view([]);
      return error_cb ? error_cb(data) : data;
    };

    return cls._rpc_call(method, args, kwargs, { ...context, success, error });
  };

  cls._rpc_call_as_create_read = async (
    method,
    args,
    kwargs = {},
    context = {}
  ) => {
    const { fields: fields0, context: context0 } = kwargs || {};
    const { fields: fields1 } = context || {};
    const fields = fields0 || fields1 || cls._config.fields_default;
    return await cls._rpc_call_with_read(
      method,
      args,
      { ...kwargs, context: { ...context0, create_read: fields } },
      context
    );
  };

  cls._rpc_call_as_write_read = async (
    method,
    args,
    kwargs = {},
    context = {}
  ) => {
    const { fields: fields0, context: context0 } = kwargs || {};
    const { fields: fields1 } = context || {};
    const fields = fields0 || fields1 || cls._config.fields_default;

    return await cls._rpc_call_with_read(
      method,
      args,
      { ...kwargs, context: { ...context0, write_read: fields } },
      context
    );
  };

  cls.search = async (kwargs = {}, context) => {
    // { domain=[], fields={}, offset=null,limit=null,order=null, context } = kwargs
    const { fields: fields0 } = kwargs || {};
    const fields = fields0 || cls._config.fields_default;
    const method = 'search_read2';
    const args = [];
    return await cls._rpc_call_with_read(
      method,
      args,
      { ...kwargs, fields },
      context
    );
  };

  cls.browse = async (ids, kwargs = {}, context) => {
    const { fields: fields0 } = kwargs || {};
    const fields = fields0 || cls._config.fields_default;
    const method = 'read2';
    const args = [ids];
    return await cls._rpc_call_with_read(
      method,
      args,
      { ...kwargs, fields },
      context
    );
  };

  cls.create = async (vals, kwargs, context) => {
    const { fields: fields0 } = kwargs || {};
    const fields = fields0 || cls._config.fields_default;
    const method = 'create2';
    const args = [vals];
    console.log('create');
    return await cls._rpc_call_with_read(
      method,
      args,
      { ...kwargs, fields },
      context
    );
  };

  cls.write = async (id, vals, kwargs, context) => {
    const { fields: fields0 } = kwargs || {};
    const fields = fields0 || cls._config.fields_default;
    const method = 'write2';
    const args = [id, vals];
    return await cls._rpc_call_with_read(
      method,
      args,
      { ...kwargs, fields },
      context
    );
  };

  cls.unlink = async (ids, kwargs, context0 = {}) => {
    // ids = [1,2,3] or ids = 1
    const method = 'unlink';
    const args = [ids];

    const { success } = context0;
    const context = {
      ...context0,
      success: result => {
        // TBD check ids is [] or int
        delete cls._records[ids];
        return success ? success(result) : result;
      },
    };

    return await cls._rpc_call(method, args, kwargs, context);
  };

  cls.toggle_active = async (id, kwargs, context) => {
    const method = 'toggle_active';
    const args = [id];
    return await cls._rpc_call_as_write_read(method, args, kwargs, context);
  };

  cls.search_count = async (domain, kwargs, context) => {
    const method = 'search_count';
    const args = [domain];
    return await cls._rpc_call(method, args, kwargs, context);
  };

  cls.default_get = async (fields_list, kwargs, context) => {
    const method = 'default_get';
    const args = [fields_list];
    return await cls._rpc_call(method, args, kwargs, context);
  };

  cls.fields_get = async (kwargs, context) => {
    // {allfields=null, attributes=null, context={}}
    const method = 'fields_get';
    const args = [];
    return await cls._rpc_call(method, args, kwargs, context);
  };

  return cls;
};

export default modelCreator;

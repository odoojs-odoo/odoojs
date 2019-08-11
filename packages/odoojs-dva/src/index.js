import ODOO from '../odoojs-core';
//import ODOO from 'odoojs-core';

import addons from './addons';
import addonsThird from './addons-third';

/*
TBD 2019-4-33
for write and view
id must integer , but web maybe string
*/

const getDvamodel = (Model, fields_default = {}) => {
  //const Model = Model2.with_context2({return_with_error: 1});

  //Model._config.return_with_error = true;
  Model._config.fields_default = fields_default;

  const state = {
    ids: [],
    id: 0,
    recordsList: [],
    record: {},

    error: {},
    result: null,
  };

  const effects = {
    // replace recordsList and del record if not in recordsList
    *search({ payload }, { call, put }) {
      //const { domain, fields, order } = payload;
      const { fields } = payload;
      const data = yield Model.search(payload);
      yield put({ type: 'save_replace_multi', payload: { data, fields } });
    },

    // read and set record
    *browse({ payload }, { call, put }) {
      const { ids, fields, context = {} } = payload;
      const data = yield Model.browse(ids, { fields, context });
      yield put({ type: 'save_replace_multi', payload: { data, fields } });
    },

    // del in recordsList and del record if not in recordsList
    *unlink({ payload }, { call, put }) {
      const { id } = payload;
      const data = yield Model.unlink(id);
      yield put({ type: 'save_after_unlink', payload: { data, id } });
    },

    // insert recordsList and set record
    *create({ payload }, { call, put }) {
      const { vals, fields, context = {} } = payload;
      const data = yield Model.create(vals, { context }, { fields });
      yield put({ type: 'save_one', payload: { data, fields } });
    },

    // update recordsList and set record
    *write({ payload }, { call, put }) {
      const { id, vals, fields, context = {} } = payload;
      const data = yield Model.write(id, vals, { context }, { fields });
      yield put({ type: 'save_one', payload: { data, fields } });
    },

    // update or insert recordsList and set record
    *call_as_create_read({ payload }, { call, put }) {
      const { method, args, kwargs, fields } = payload;
      const data = yield Model._rpc_call_as_create_read(method, args, kwargs, {
        fields,
      });
      yield put({ type: 'save_one', payload: { data, fields } });
    },

    // update recordsList and set record
    *call_as_write_read({ payload }, { call, put }) {
      const { method, args, kwargs, fields } = payload;
      const data = yield Model._rpc_call_as_write_read(method, args, kwargs, {
        fields,
      });
      yield put({ type: 'save_one', payload: { data, fields } });
    },

    // call  TBD, 2019-8-9, who call this fn?
    *call({ payload }, { call, put }) {
      const { method, args, kwargs } = payload;
      const data = yield Model._rpc_call(method, args, kwargs);
      const { code, result, error } = data;
      const error2 = code ? error : {};
      yield put({
        type: 'save',
        payload: { result, error: error2 },
      });
    },

    /*
    // TBD 2019-8-9
    *goto_wizard({payload}, { call, put }) {
      const { id,fields=fields_default,
        wizard_model, wizard_id_field, wizard_vals,
        wizard_default_get,
      } = payload;
      console.log( Model._name, id, wizard_model, wizard_id_field,  )
      const data = yield Model.goto_wizard(id, {
        wizard_model, wizard_id_field,
        wizard_vals,
        wizard_default_get,

      }  );
      yield put({ type: 'save_one', payload: { data, fields, wizard: 1 } });
    },

    // TBD 2019-8-9
    *call_wizard({payload}, { call, put }) {
      const { id,fields=fields_default,
        wizard_id, wizard_vals,wizard_model, wizard_method,
      } = payload;

      const data = yield Model.call_wizard(id,fields,{
        wizard_id, wizard_vals,
        wizard_model,
        wizard_method,
      } );

      yield put({ type: 'save_one', payload: { data, fields } });
    },

*/
  };

  const reducers = {
    save_replace_multi(state, { payload }) {
      const {
        data: { code, result, error },
        fields = fields_default,
      } = payload;

      if (code) {
        return { ...state, error };
      }

      const recordsList = result._look2(fields);
      //const recordsList = result._list

      const ids = recordsList.map(item => item.id);

      const { id: id_old, record: record_old } = state;

      const id = result.ids.includes(id_old) ? id_old : 0;
      const record = result.ids.includes(id_old) ? record_old : {};

      return {
        ...state,
        ids,
        recordsList,
        id,
        record,
        error: {},
      };
    },

    save_one(state, { payload }) {
      //console.log(Model._name, payload)
      const { data = { code: 1 }, fields = fields_default, wizard } = payload;
      const { code, result = {}, error } = data;

      if (code) {
        return { ...state, error };
      }

      const { ids, recordsList } = state;

      const id_new = result.id;

      const record_new = wizard ? result : result._look(fields);

      const ids_new = ids.includes(id_new) ? ids : [...ids, id_new];

      const recordsList_new = ids.includes(id_new)
        ? recordsList.map(item => {
            return item.id === id_new ? { ...item, ...record_new } : item;
          })
        : [...recordsList, record_new];

      return {
        ...state,
        ids: ids_new,
        recordsList: recordsList_new,
        id: id_new,
        record: record_new,
        error: {},
      };
    },

    save_after_unlink(state, { payload }) {
      const {
        data: { code, error },
        id,
      } = payload;

      if (code) {
        return { ...state, error };
      }

      const { ids, recordsList, id: id_old, record: record_old } = state;

      const index = ids.findIndex(item => item === id);

      if (index < 0) {
        return state;
      }

      ids.splice(index, 1);
      delete recordsList[id];

      const id_new = id_old !== id ? id_old : 0;
      const record_new = id_old !== id ? record_old : {};

      return {
        ...state,
        ids,
        recordsList,
        id: id_new,
        record: record_new,
        error: {},
      };
    },

    view(state, { payload }) {
      const { id, ids, fields = fields_default } = payload;

      const new_state = {};

      if (id) {
        const rec = Model._view(id);
        new_state.id = id;
        new_state.record = rec._look(fields);
        //new_state.record = rec;
      }

      if (ids) {
        const recs = Model._view(ids);
        new_state.ids = ids;
        new_state.recordsList = recs._look2(fields);
        //new_state.recordsList = recs._list;
      }

      return {
        ...state,
        ...new_state,
      };
    },

    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  };

  return { state, effects, reducers };
};

class Odoo extends ODOO {
  dvamodel({ model, fields }) {
    const Model = this.env(model);

    const dva_model = getDvamodel(Model, fields);
    const { state, effects, reducers } = dva_model;

    const addons_all = { ...addons, ...addonsThird };

    return Object.keys(addons_all).reduce(
      (acc, cur) => {
        const fn = addons_all[cur][model];

        if (!fn) {
          return acc;
        }

        const { state, effects, reducers } = acc;
        const dva_model2 = fn(Model, fields);
        const {
          state: state2 = {},
          effects: effects2 = {},
          reducers: reducers2 = {},
        } = dva_model2;

        return {
          state: { ...state, ...state2 },
          effects: { ...effects, ...effects2 },
          reducers: { ...reducers, ...reducers2 },
        };
      },
      { state, effects, reducers }
    );
  }
}

export default Odoo;

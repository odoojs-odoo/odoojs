//import ODOO from '../odoojs-core';
import ODOO from 'odoojs-core';

import addons from './addons';
import addonsThird from './addons-third';

/*
TBD 2019-4-33
for write and view
id must integer , but web maybe string
*/

const getDvamodel = (Model2, fields_default = {}) => {
  const Model = Model2.with_context2({ return_with_error: 1 });

  const state = {
    ids: [],
    id: 0,
    recordsList: [],
    record: {},

    error: {},
  };

  const effects = {
    // replace recordsList and del record if not in recordsList
    *search({ payload }, { call, put }) {
      const { domain, fields = fields_default, order } = payload;
      const data = yield Model.search(domain, fields, { order });
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
      const { vals, fields = fields_default, context = {} } = payload;
      const data = yield Model.create(vals, fields, { context });
      yield put({ type: 'save_one', payload: { data, fields } });
    },

    // update recordsList and set record
    *write({ payload }, { call, put }) {
      const { id, vals, fields = fields_default, context = {} } = payload;
      const data = yield Model.write(id, vals, fields, { context });
      yield put({ type: 'save_one', payload: { data, fields } });
    },

    // update or insert recordsList and set record
    *call_as_create_read({ payload }, { call, put }) {
      const { method, args, kwargs = {}, fields = fields_default } = payload;
      const data = yield Model.call_as_create_read(
        { method, args, kwargs },
        fields
      );
      yield put({ type: 'save_one', payload: { data, fields } });
    },

    // update recordsList and set record
    *call_as_write_read({ payload }, { call, put }) {
      const { method, args, kwargs = {}, fields = fields_default } = payload;
      const data = yield Model.call_as_write_read(
        { method, args, kwargs },
        fields
      );
      yield put({ type: 'save_one', payload: { data, fields } });
    },
  };

  const reducers = {
    save_replace_multi(state, { payload }) {
      const {
        data: { code, result, error },
        fields,
      } = payload;

      if (code) {
        return { ...state, error };
      }

      //const { ids, recordsList } = state

      const recordsList = result.look2(fields);
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
      const {
        data: { code, result, error },
        fields,
      } = payload;
      if (code) {
        return { ...state, error };
      }

      const { ids, recordsList } = state;

      const id_new = result.id;
      const record_new = result.look(fields);

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
      const { id, fields = fields_default } = payload;
      const rec = Model.view(id);
      console.log(rec.look(fields));

      return {
        ...state,
        record: rec.look(fields),
        id,
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
    const dva_model = getDvamodel(this.env[model], fields);
    const { state, effects, reducers } = dva_model;

    const addons_all = { ...addons, ...addonsThird };

    return Object.keys(addons_all).reduce(
      (acc, cur) => {
        const fn = addons_all[cur][model];

        if (!fn) {
          return acc;
        }

        const { state, effects, reducers } = acc;
        const dva_model2 = fn(this.env[model], fields);
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

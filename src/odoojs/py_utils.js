import py from './py.js/lib/py'

function wrap(value) {
  if (value === null) {
    return py.None
  }

  switch (typeof value) {
    case 'undefined':
      throw new Error('No conversion for undefined')
    case 'boolean':
      return py.bool.fromJSON(value)
    case 'number':
      return py.float.fromJSON(value)
    case 'string':
      return py.str.fromJSON(value)
  }

  switch (value.constructor) {
    case Object:
      return wrapping_dict.fromJSON(value)
    case Array:
      return wrapping_list.fromJSON(value)
  }

  throw new Error('ValueError: unable to wrap ' + value)
}

var wrapping_dict = py.type('wrapping_dict', null, {
  __init__: function() {
    this._store = {}
  },
  __getitem__: function(key) {
    var k = key.toJSON()
    if (!(k in this._store)) {
      throw new Error("KeyError: '" + k + "'")
    }
    return wrap(this._store[k])
  },
  __getattr__: function(key) {
    return this.__getitem__(py.str.fromJSON(key))
  },
  __len__: function() {
    return Object.keys(this._store).length
  },
  __nonzero__: function() {
    return py.PY_size(this) > 0 ? py.True : py.False
  },
  get: function() {
    var args = py.PY_parseArgs(arguments, ['k', ['d', py.None]])

    if (!(args.k.toJSON() in this._store)) {
      return args.d
    }
    return this.__getitem__(args.k)
  },
  fromJSON: function(d) {
    var instance = py.PY_call(wrapping_dict)
    instance._store = d
    return instance
  },
  toJSON: function() {
    return this._store
  }
})

var wrapping_list = py.type('wrapping_list', null, {
  __init__: function() {
    this._store = []
  },
  __getitem__: function(index) {
    return wrap(this._store[index.toJSON()])
  },
  __len__: function() {
    return this._store.length
  },
  __nonzero__: function() {
    return py.PY_size(this) > 0 ? py.True : py.False
  },
  fromJSON: function(ar) {
    var instance = py.PY_call(wrapping_list)
    instance._store = ar
    return instance
  },
  toJSON: function() {
    return this._store
  }
})

function wrap_context(context) {
  for (var k in context) {
    // eslint-disable-next-line no-prototype-builtins
    if (!context.hasOwnProperty(k)) {
      continue
    }
    var val = context[k]
    // Don't add a test case like ``val === undefined``
    // this is intended to prevent letting crap pass
    // on the context without even knowing it.
    // If you face an issue from here, try to sanitize
    // the context upstream instead
    if (val === null) {
      continue
    }
    if (val.constructor === Array) {
      context[k] = wrapping_list.fromJSON(val)
    } else if (
      val.constructor === Object &&
      !py.PY_isInstance(val, py.object)
    ) {
      context[k] = wrapping_dict.fromJSON(val)
    }
  }
  return context
}

const pyeval = (context, evaluation_context2) => {
  const evaluation_context = JSON.parse(JSON.stringify(evaluation_context2))
  const evaluated = py.eval(context, wrap_context(evaluation_context))
  return evaluated
}

export default { eval: pyeval }

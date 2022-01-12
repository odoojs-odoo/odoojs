// import py from './py.js/lib/py'
import py from './py.js/lib/py_extras'

// py.extras = py_extras.extras

// console.log('py', py)
// console.log('py_extras', py_extras)

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
  __init__: function () {
    this._store = {}
  },
  __getitem__: function (key) {
    var k = key.toJSON()
    if (!(k in this._store)) {
      throw new Error("KeyError: '" + k + "'")
    }
    return wrap(this._store[k])
  },
  __getattr__: function (key) {
    return this.__getitem__(py.str.fromJSON(key))
  },
  __len__: function () {
    return Object.keys(this._store).length
  },
  __nonzero__: function () {
    return py.PY_size(this) > 0 ? py.True : py.False
  },
  get: function () {
    var args = py.PY_parseArgs(arguments, ['k', ['d', py.None]])

    if (!(args.k.toJSON() in this._store)) {
      return args.d
    }
    return this.__getitem__(args.k)
  },
  fromJSON: function (d) {
    var instance = py.PY_call(wrapping_dict)
    instance._store = d
    return instance
  },
  toJSON: function () {
    return this._store
  }
})

var wrapping_list = py.type('wrapping_list', null, {
  __init__: function () {
    this._store = []
  },
  __getitem__: function (index) {
    return wrap(this._store[index.toJSON()])
  },
  __len__: function () {
    return this._store.length
  },
  __nonzero__: function () {
    return py.PY_size(this) > 0 ? py.True : py.False
  },
  fromJSON: function (ar) {
    var instance = py.PY_call(wrapping_list)
    instance._store = ar
    return instance
  },
  toJSON: function () {
    return this._store
  }
})

function wrap_context(context) {
  for (var k in context) {
    // if (!context.hasOwnProperty(k)) {
    if (!Object.prototype.hasOwnProperty.call(context, k)) {
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

function context_today() {
  var d = new Date()
  return py.PY_call(py.extras.datetime.date, [
    d.getFullYear(),
    d.getMonth() + 1,
    d.getDate()
  ])
}

function tz_offset() {
  var offset = new Date().getTimezoneOffset()
  var kwargs = { minutes: py.float.fromJSON(offset) }
  return py.PY_call(py.extras.datetime.timedelta, [], kwargs)
}

function pycontext() {
  const d = new Date()
  const today = `${String(d.getFullYear()).padStart(4, '0')}-${String(
    d.getMonth() + 1
  ).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

  const now = `${String(d.getUTCFullYear()).padStart(4, '0')}-${String(
    d.getUTCMonth() + 1
  ).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')} ${String(
    d.getUTCHours()
  ).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}:${String(
    d.getUTCSeconds()
  ).padStart(2, '0')}`

  const { datetime, relativedelta, time } = py.extras
  return {
    current_date: today,
    datetime,
    time,
    now,
    today,
    relativedelta,
    context_today,
    tz_offset
  }
}

const pyeval = (context, evaluation_context2) => {
  // console.log('py,', context, evaluation_context2)
  const evaluation_context3 = JSON.parse(JSON.stringify(evaluation_context2))
  const ctx = pycontext()
  const evaluation_context = { ...evaluation_context3, ...ctx }

  const evaluated = py.eval(context, wrap_context(evaluation_context))

  return evaluated
}

export default { eval: pyeval }

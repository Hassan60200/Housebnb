(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~js/ad~js/app"],{

/***/ "./node_modules/core-js/internals/advance-string-index.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/advance-string-index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(/*! ../internals/string-multibyte */ "./node_modules/core-js/internals/string-multibyte.js").charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "./node_modules/core-js/internals/an-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/an-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-includes.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-includes.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof-raw.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/classof-raw.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/internals/copy-constructor-properties.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "./node_modules/core-js/internals/own-keys.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-non-enumerable-property.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/create-non-enumerable-property.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-property-descriptor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/descriptors.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/descriptors.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/document-create-element.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/document-create-element.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/internals/enum-bug-keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "./node_modules/core-js/internals/export.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/export.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f;
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "./node_modules/core-js/internals/copy-constructor-properties.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/fails.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/internals/fails.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(REPLACE_SUPPORTS_NAMED_GROUPS && REPLACE_KEEPS_$0)) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, { REPLACE_KEEPS_$0: REPLACE_KEEPS_$0 });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-built-in.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-built-in.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js/internals/path.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "./node_modules/core-js/internals/global.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/global.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/core-js/internals/has.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/has.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/internals/hidden-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/hidden-keys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/internals/ie8-dom-define.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/indexed-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/indexed-object.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "./node_modules/core-js/internals/inspect-source.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/inspect-source.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "./node_modules/core-js/internals/internal-state.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/internal-state.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "./node_modules/core-js/internals/native-weak-map.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var objectHas = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-forced.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-forced.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "./node_modules/core-js/internals/is-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-pure.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/is-pure.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/internals/native-symbol.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/native-symbol.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),

/***/ "./node_modules/core-js/internals/native-weak-map.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/native-weak-map.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-property.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-names.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys-internal.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var indexOf = __webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js").indexOf;
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-property-is-enumerable.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/internals/own-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/own-keys.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "./node_modules/core-js/internals/path.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/path.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = global;


/***/ }),

/***/ "./node_modules/core-js/internals/redefine.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/redefine.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-exec-abstract.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-exec-abstract.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var regexpExec = __webpack_require__(/*! ./regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),

/***/ "./node_modules/core-js/internals/regexp-exec.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-exec.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpFlags = __webpack_require__(/*! ./regexp-flags */ "./node_modules/core-js/internals/regexp-flags.js");
var stickyHelpers = __webpack_require__(/*! ./regexp-sticky-helpers */ "./node_modules/core-js/internals/regexp-sticky-helpers.js");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-flags.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-flags.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-sticky-helpers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-sticky-helpers.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(/*! ./fails */ "./node_modules/core-js/internals/fails.js");

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ "./node_modules/core-js/internals/require-object-coercible.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-global.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/set-global.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared-key.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/shared-key.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared-store.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/shared-store.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "./node_modules/core-js/internals/shared.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/shared.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/internals/string-multibyte.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/string-multibyte.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-absolute-index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-indexed-object.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-integer.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/to-integer.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-length.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-length.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-primitive.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/to-primitive.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/internals/uid.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/uid.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "./node_modules/core-js/internals/use-symbol-as-uid.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/use-symbol-as-uid.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol() == 'symbol';


/***/ }),

/***/ "./node_modules/core-js/internals/well-known-symbol.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js/internals/use-symbol-as-uid.js");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.regexp.exec.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.regexp.exec.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var exec = __webpack_require__(/*! ../internals/regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");

$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.replace.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.replace.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ "./node_modules/core-js/internals/advance-string-index.js");
var regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "./node_modules/core-js/internals/regexp-exec-abstract.js");

var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (reason.REPLACE_KEEPS_$0 || (typeof replaceValue === 'string' && replaceValue.indexOf('$0') === -1)) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYWR2YW5jZS1zdHJpbmctaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NsYXNzb2YtcmF3LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW51bS1idWcta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZXhwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZml4LXJlZ2V4cC13ZWxsLWtub3duLXN5bWJvbC1sb2dpYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hhcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGlkZGVuLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbmRleGVkLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1mb3JjZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtcHVyZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbmF0aXZlLXdlYWstbWFwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vd24ta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVkZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1leGVjLWFic3RyYWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtZXhlYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtc3RpY2t5LWhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2V0LWdsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tbGVuZ3RoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdWlkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5yZWdleHAuZXhlYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5yZXBsYWNlLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2IsYUFBYSxtQkFBTyxDQUFDLDJGQUErQjs7QUFFcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDUEEsZUFBZSxtQkFBTyxDQUFDLDZFQUF3Qjs7QUFFL0M7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7QUNOQSxzQkFBc0IsbUJBQU8sQ0FBQyw2RkFBZ0M7QUFDOUQsZUFBZSxtQkFBTyxDQUFDLDZFQUF3QjtBQUMvQyxzQkFBc0IsbUJBQU8sQ0FBQyw2RkFBZ0M7O0FBRTlELHFCQUFxQixvQkFBb0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLFlBQVksZUFBZTtBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQy9CQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDSkEsVUFBVSxtQkFBTyxDQUFDLGlFQUFrQjtBQUNwQyxjQUFjLG1CQUFPLENBQUMsMkVBQXVCO0FBQzdDLHFDQUFxQyxtQkFBTyxDQUFDLCtIQUFpRDtBQUM5RiwyQkFBMkIsbUJBQU8sQ0FBQyx1R0FBcUM7O0FBRXhFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGlCQUFpQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDYkEsa0JBQWtCLG1CQUFPLENBQUMsaUZBQTBCO0FBQ3BELDJCQUEyQixtQkFBTyxDQUFDLHVHQUFxQztBQUN4RSwrQkFBK0IsbUJBQU8sQ0FBQywrR0FBeUM7O0FBRWhGO0FBQ0E7QUFDQSxDQUFDO0FB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LENBQUMsK0VBQXlCO0FBQ2pELDZCQUE2QixtQkFBTyxDQUFDLDJHQUF1QztBQUM1RSx5QkFBeUIsbUJBQU8sQ0FBQyxtR0FBbUM7QUFDcEUsaUJBQWlCLG1CQUFPLENBQUMsbUdBQW1DOztBQUU1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixvQkFBb0I7QUFDekM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixtQkFBbUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQy9IRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUMiLCJmaWxlIjoidmVuZG9yc35qcy9hZH5qcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG52YXIgY2hhckF0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUnKS5jaGFyQXQ7XG5cbi8vIGBBZHZhbmNlU3RyaW5nSW5kZXhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYWR2YW5jZXN0cmluZ2luZGV4XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChTLCBpbmRleCwgdW5pY29kZSkge1xuICByZXR1cm4gaW5kZXggKyAodW5pY29kZSA/IGNoYXJBdChTLCBpbmRleCkubGVuZ3RoIDogMSk7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkge1xuICAgIHRocm93IFR5cGVFcnJvcihTdHJpbmcoaXQpICsgJyBpcyBub3QgYW4gb2JqZWN0Jyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGluZGV4T2YsIGluY2x1ZGVzIH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgaWYgKChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSAmJiBPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluY2x1ZGVzXG4gIGluY2x1ZGVzOiBjcmVhdGVNZXRob2QodHJ1ZSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5kZXhPZmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmRleG9mXG4gIGluZGV4T2Y6IGNyZWF0ZU1ldGhvZChmYWxzZSlcbn07XG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIG93bktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb3duLWtleXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcbiAgdmFyIGtleXMgPSBvd25LZXlzKHNvdXJjZSk7XG4gIHZhciBkZWZpbmVQcm9wZXJ0eSA9IGRlZmluZVByb3BlcnR5TW9kdWxlLmY7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUuZjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgaWYgKCFoYXModGFyZ2V0LCBrZXkpKSBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7XG4gIH1cbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKG9iamVjdCwga2V5LCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG52YXIgZG9jdW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBFWElTVFMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBFWElTVFMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsIi8vIElFOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gICdjb25zdHJ1Y3RvcicsXG4gICdoYXNPd25Qcm9wZXJ0eScsXG4gICdpc1Byb3RvdHlwZU9mJyxcbiAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcbiAgJ3RvTG9jYWxlU3RyaW5nJyxcbiAgJ3RvU3RyaW5nJyxcbiAgJ3ZhbHVlT2YnXG5dO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpLmY7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgc2V0R2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC1nbG9iYWwnKTtcbnZhciBjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NvcHktY29uc3RydWN0b3ItcHJvcGVydGllcycpO1xudmFyIGlzRm9yY2VkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWZvcmNlZCcpO1xuXG4vKlxuICBvcHRpb25zLnRhcmdldCAgICAgIC0gbmFtZSBvZiB0aGUgdGFyZ2V0IG9iamVjdFxuICBvcHRpb25zLmdsb2JhbCAgICAgIC0gdGFyZ2V0IGlzIHRoZSBnbG9iYWwgb2JqZWN0XG4gIG9wdGlvbnMuc3RhdCAgICAgICAgLSBleHBvcnQgYXMgc3RhdGljIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucHJvdG8gICAgICAgLSBleHBvcnQgYXMgcHJvdG90eXBlIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucmVhbCAgICAgICAgLSByZWFsIHByb3RvdHlwZSBtZXRob2QgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLmZvcmNlZCAgICAgIC0gZXhwb3J0IGV2ZW4gaWYgdGhlIG5hdGl2ZSBmZWF0dXJlIGlzIGF2YWlsYWJsZVxuICBvcHRpb25zLmJpbmQgICAgICAgIC0gYmluZCBtZXRob2RzIHRvIHRoZSB0YXJnZXQsIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy53cmFwICAgICAgICAtIHdyYXAgY29uc3RydWN0b3JzIHRvIHByZXZlbnRpbmcgZ2xvYmFsIHBvbGx1dGlvbiwgcmVxdWlyZWQgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLnVuc2FmZSAgICAgIC0gdXNlIHRoZSBzaW1wbGUgYXNzaWdubWVudCBvZiBwcm9wZXJ0eSBpbnN0ZWFkIG9mIGRlbGV0ZSArIGRlZmluZVByb3BlcnR5XG4gIG9wdGlvbnMuc2hhbSAgICAgICAgLSBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gIG9wdGlvbnMuZW51bWVyYWJsZSAgLSBleHBvcnQgYXMgZW51bWVyYWJsZSBwcm9wZXJ0eVxuICBvcHRpb25zLm5vVGFyZ2V0R2V0IC0gcHJldmVudCBjYWxsaW5nIGEgZ2V0dGVyIG9uIHRhcmdldFxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9wdGlvbnMsIHNvdXJjZSkge1xuICB2YXIgVEFSR0VUID0gb3B0aW9ucy50YXJnZXQ7XG4gIHZhciBHTE9CQUwgPSBvcHRpb25zLmdsb2JhbDtcbiAgdmFyIFNUQVRJQyA9IG9wdGlvbnMuc3RhdDtcbiAgdmFyIEZPUkNFRCwgdGFyZ2V0LCBrZXksIHRhcmdldFByb3BlcnR5LCBzb3VyY2VQcm9wZXJ0eSwgZGVzY3JpcHRvcjtcbiAgaWYgKEdMT0JBTCkge1xuICAgIHRhcmdldCA9IGdsb2JhbDtcbiAgfSBlbHNlIGlmIChTVEFUSUMpIHtcbiAgICB0YXJnZXQgPSBnbG9iYWxbVEFSR0VUXSB8fCBzZXRHbG9iYWwoVEFSR0VULCB7fSk7XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0ID0gKGdsb2JhbFtUQVJHRVRdIHx8IHt9KS5wcm90b3R5cGU7XG4gIH1cbiAgaWYgKHRhcmdldCkgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgc291cmNlUHJvcGVydHkgPSBzb3VyY2Vba2V5XTtcbiAgICBpZiAob3B0aW9ucy5ub1RhcmdldEdldCkge1xuICAgICAgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG4gICAgICB0YXJnZXRQcm9wZXJ0eSA9IGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci52YWx1ZTtcbiAgICB9IGVsc2UgdGFyZ2V0UHJvcGVydHkgPSB0YXJnZXRba2V5XTtcbiAgICBGT1JDRUQgPSBpc0ZvcmNlZChHTE9CQUwgPyBrZXkgOiBUQVJHRVQgKyAoU1RBVElDID8gJy4nIDogJyMnKSArIGtleSwgb3B0aW9ucy5mb3JjZWQpO1xuICAgIC8vIGNvbnRhaW5lZCBpbiB0YXJnZXRcbiAgICBpZiAoIUZPUkNFRCAmJiB0YXJnZXRQcm9wZXJ0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodHlwZW9mIHNvdXJjZVByb3BlcnR5ID09PSB0eXBlb2YgdGFyZ2V0UHJvcGVydHkpIGNvbnRpbnVlO1xuICAgICAgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyhzb3VyY2VQcm9wZXJ0eSwgdGFyZ2V0UHJvcGVydHkpO1xuICAgIH1cbiAgICAvLyBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gICAgaWYgKG9wdGlvbnMuc2hhbSB8fCAodGFyZ2V0UHJvcGVydHkgJiYgdGFyZ2V0UHJvcGVydHkuc2hhbSkpIHtcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShzb3VyY2VQcm9wZXJ0eSwgJ3NoYW0nLCB0cnVlKTtcbiAgICB9XG4gICAgLy8gZXh0ZW5kIGdsb2JhbFxuICAgIHJlZGVmaW5lKHRhcmdldCwga2V5LCBzb3VyY2VQcm9wZXJ0eSwgb3B0aW9ucyk7XG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciByZWdleHBFeGVjID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1leGVjJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG52YXIgUkVQTEFDRV9TVVBQT1JUU19OQU1FRF9HUk9VUFMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyAjcmVwbGFjZSBuZWVkcyBidWlsdC1pbiBzdXBwb3J0IGZvciBuYW1lZCBncm91cHMuXG4gIC8vICNtYXRjaCB3b3JrcyBmaW5lIGJlY2F1c2UgaXQganVzdCByZXR1cm4gdGhlIGV4ZWMgcmVzdWx0cywgZXZlbiBpZiBpdCBoYXNcbiAgLy8gYSBcImdyb3BzXCIgcHJvcGVydHkuXG4gIHZhciByZSA9IC8uLztcbiAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgcmVzdWx0Lmdyb3VwcyA9IHsgYTogJzcnIH07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgcmV0dXJuICcnLnJlcGxhY2UocmUsICckPGE+JykgIT09ICc3Jztcbn0pO1xuXG4vLyBJRSA8PSAxMSByZXBsYWNlcyAkMCB3aXRoIHRoZSB3aG9sZSBtYXRjaCwgYXMgaWYgaXQgd2FzICQmXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy82MDI0NjY2L2dldHRpbmctaWUtdG8tcmVwbGFjZS1hLXJlZ2V4LXdpdGgtdGhlLWxpdGVyYWwtc3RyaW5nLTBcbnZhciBSRVBMQUNFX0tFRVBTXyQwID0gKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICdhJy5yZXBsYWNlKC8uLywgJyQwJykgPT09ICckMCc7XG59KSgpO1xuXG4vLyBDaHJvbWUgNTEgaGFzIGEgYnVnZ3kgXCJzcGxpdFwiIGltcGxlbWVudGF0aW9uIHdoZW4gUmVnRXhwI2V4ZWMgIT09IG5hdGl2ZUV4ZWNcbi8vIFdlZXggSlMgaGFzIGZyb3plbiBidWlsdC1pbiBwcm90b3R5cGVzLCBzbyB1c2UgdHJ5IC8gY2F0Y2ggd3JhcHBlclxudmFyIFNQTElUX1dPUktTX1dJVEhfT1ZFUldSSVRURU5fRVhFQyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciByZSA9IC8oPzopLztcbiAgdmFyIG9yaWdpbmFsRXhlYyA9IHJlLmV4ZWM7XG4gIHJlLmV4ZWMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBvcmlnaW5hbEV4ZWMuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgdmFyIHJlc3VsdCA9ICdhYicuc3BsaXQocmUpO1xuICByZXR1cm4gcmVzdWx0Lmxlbmd0aCAhPT0gMiB8fCByZXN1bHRbMF0gIT09ICdhJyB8fCByZXN1bHRbMV0gIT09ICdiJztcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVksIGxlbmd0aCwgZXhlYywgc2hhbSkge1xuICB2YXIgU1lNQk9MID0gd2VsbEtub3duU3ltYm9sKEtFWSk7XG5cbiAgdmFyIERFTEVHQVRFU19UT19TWU1CT0wgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIC8vIFN0cmluZyBtZXRob2RzIGNhbGwgc3ltYm9sLW5hbWVkIFJlZ0VwIG1ldGhvZHNcbiAgICB2YXIgTyA9IHt9O1xuICAgIE9bU1lNQk9MXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH07XG4gICAgcmV0dXJuICcnW0tFWV0oTykgIT0gNztcbiAgfSk7XG5cbiAgdmFyIERFTEVHQVRFU19UT19FWEVDID0gREVMRUdBVEVTX1RPX1NZTUJPTCAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIC8vIFN5bWJvbC1uYW1lZCBSZWdFeHAgbWV0aG9kcyBjYWxsIC5leGVjXG4gICAgdmFyIGV4ZWNDYWxsZWQgPSBmYWxzZTtcbiAgICB2YXIgcmUgPSAvYS87XG5cbiAgICBpZiAoS0VZID09PSAnc3BsaXQnKSB7XG4gICAgICAvLyBXZSBjYW4ndCB1c2UgcmVhbCByZWdleCBoZXJlIHNpbmNlIGl0IGNhdXNlcyBkZW9wdGltaXphdGlvblxuICAgICAgLy8gYW5kIHNlcmlvdXMgcGVyZm9ybWFuY2UgZGVncmFkYXRpb24gaW4gVjhcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8zMDZcbiAgICAgIHJlID0ge307XG4gICAgICAvLyBSZWdFeHBbQEBzcGxpdF0gZG9lc24ndCBjYWxsIHRoZSByZWdleCdzIGV4ZWMgbWV0aG9kLCBidXQgZmlyc3QgY3JlYXRlc1xuICAgICAgLy8gYSBuZXcgb25lLiBXZSBuZWVkIHRvIHJldHVybiB0aGUgcGF0Y2hlZCByZWdleCB3aGVuIGNyZWF0aW5nIHRoZSBuZXcgb25lLlxuICAgICAgcmUuY29uc3RydWN0b3IgPSB7fTtcbiAgICAgIHJlLmNvbnN0cnVjdG9yW1NQRUNJRVNdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gcmU7IH07XG4gICAgICByZS5mbGFncyA9ICcnO1xuICAgICAgcmVbU1lNQk9MXSA9IC8uL1tTWU1CT0xdO1xuICAgIH1cblxuICAgIHJlLmV4ZWMgPSBmdW5jdGlvbiAoKSB7IGV4ZWNDYWxsZWQgPSB0cnVlOyByZXR1cm4gbnVsbDsgfTtcblxuICAgIHJlW1NZTUJPTF0oJycpO1xuICAgIHJldHVybiAhZXhlY0NhbGxlZDtcbiAgfSk7XG5cbiAgaWYgKFxuICAgICFERUxFR0FURVNfVE9fU1lNQk9MIHx8XG4gICAgIURFTEVHQVRFU19UT19FWEVDIHx8XG4gICAgKEtFWSA9PT0gJ3JlcGxhY2UnICYmICEoUkVQTEFDRV9TVVBQT1JUU19OQU1FRF9HUk9VUFMgJiYgUkVQTEFDRV9LRUVQU18kMCkpIHx8XG4gICAgKEtFWSA9PT0gJ3NwbGl0JyAmJiAhU1BMSVRfV09SS1NfV0lUSF9PVkVSV1JJVFRFTl9FWEVDKVxuICApIHtcbiAgICB2YXIgbmF0aXZlUmVnRXhwTWV0aG9kID0gLy4vW1NZTUJPTF07XG4gICAgdmFyIG1ldGhvZHMgPSBleGVjKFNZTUJPTCwgJydbS0VZXSwgZnVuY3Rpb24gKG5hdGl2ZU1ldGhvZCwgcmVnZXhwLCBzdHIsIGFyZzIsIGZvcmNlU3RyaW5nTWV0aG9kKSB7XG4gICAgICBpZiAocmVnZXhwLmV4ZWMgPT09IHJlZ2V4cEV4ZWMpIHtcbiAgICAgICAgaWYgKERFTEVHQVRFU19UT19TWU1CT0wgJiYgIWZvcmNlU3RyaW5nTWV0aG9kKSB7XG4gICAgICAgICAgLy8gVGhlIG5hdGl2ZSBTdHJpbmcgbWV0aG9kIGFscmVhZHkgZGVsZWdhdGVzIHRvIEBAbWV0aG9kICh0aGlzXG4gICAgICAgICAgLy8gcG9seWZpbGxlZCBmdW5jdGlvbiksIGxlYXNpbmcgdG8gaW5maW5pdGUgcmVjdXJzaW9uLlxuICAgICAgICAgIC8vIFdlIGF2b2lkIGl0IGJ5IGRpcmVjdGx5IGNhbGxpbmcgdGhlIG5hdGl2ZSBAQG1ldGhvZCBtZXRob2QuXG4gICAgICAgICAgcmV0dXJuIHsgZG9uZTogdHJ1ZSwgdmFsdWU6IG5hdGl2ZVJlZ0V4cE1ldGhvZC5jYWxsKHJlZ2V4cCwgc3RyLCBhcmcyKSB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGRvbmU6IHRydWUsIHZhbHVlOiBuYXRpdmVNZXRob2QuY2FsbChzdHIsIHJlZ2V4cCwgYXJnMikgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IGRvbmU6IGZhbHNlIH07XG4gICAgfSwgeyBSRVBMQUNFX0tFRVBTXyQwOiBSRVBMQUNFX0tFRVBTXyQwIH0pO1xuICAgIHZhciBzdHJpbmdNZXRob2QgPSBtZXRob2RzWzBdO1xuICAgIHZhciByZWdleE1ldGhvZCA9IG1ldGhvZHNbMV07XG5cbiAgICByZWRlZmluZShTdHJpbmcucHJvdG90eXBlLCBLRVksIHN0cmluZ01ldGhvZCk7XG4gICAgcmVkZWZpbmUoUmVnRXhwLnByb3RvdHlwZSwgU1lNQk9MLCBsZW5ndGggPT0gMlxuICAgICAgLy8gMjEuMi41LjggUmVnRXhwLnByb3RvdHlwZVtAQHJlcGxhY2VdKHN0cmluZywgcmVwbGFjZVZhbHVlKVxuICAgICAgLy8gMjEuMi41LjExIFJlZ0V4cC5wcm90b3R5cGVbQEBzcGxpdF0oc3RyaW5nLCBsaW1pdClcbiAgICAgID8gZnVuY3Rpb24gKHN0cmluZywgYXJnKSB7IHJldHVybiByZWdleE1ldGhvZC5jYWxsKHN0cmluZywgdGhpcywgYXJnKTsgfVxuICAgICAgLy8gMjEuMi41LjYgUmVnRXhwLnByb3RvdHlwZVtAQG1hdGNoXShzdHJpbmcpXG4gICAgICAvLyAyMS4yLjUuOSBSZWdFeHAucHJvdG90eXBlW0BAc2VhcmNoXShzdHJpbmcpXG4gICAgICA6IGZ1bmN0aW9uIChzdHJpbmcpIHsgcmV0dXJuIHJlZ2V4TWV0aG9kLmNhbGwoc3RyaW5nLCB0aGlzKTsgfVxuICAgICk7XG4gIH1cblxuICBpZiAoc2hhbSkgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KFJlZ0V4cC5wcm90b3R5cGVbU1lNQk9MXSwgJ3NoYW0nLCB0cnVlKTtcbn07XG4iLCJ2YXIgcGF0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wYXRoJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG52YXIgYUZ1bmN0aW9uID0gZnVuY3Rpb24gKHZhcmlhYmxlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFyaWFibGUgPT0gJ2Z1bmN0aW9uJyA/IHZhcmlhYmxlIDogdW5kZWZpbmVkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZXNwYWNlLCBtZXRob2QpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPCAyID8gYUZ1bmN0aW9uKHBhdGhbbmFtZXNwYWNlXSkgfHwgYUZ1bmN0aW9uKGdsb2JhbFtuYW1lc3BhY2VdKVxuICAgIDogcGF0aFtuYW1lc3BhY2VdICYmIHBhdGhbbmFtZXNwYWNlXVttZXRob2RdIHx8IGdsb2JhbFtuYW1lc3BhY2VdICYmIGdsb2JhbFtuYW1lc3BhY2VdW21ldGhvZF07XG59O1xuIiwidmFyIGNoZWNrID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAmJiBpdC5NYXRoID09IE1hdGggJiYgaXQ7XG59O1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxubW9kdWxlLmV4cG9ydHMgPVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgY2hlY2sodHlwZW9mIGdsb2JhbFRoaXMgPT0gJ29iamVjdCcgJiYgZ2xvYmFsVGhpcykgfHxcbiAgY2hlY2sodHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cpIHx8XG4gIGNoZWNrKHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYpIHx8XG4gIGNoZWNrKHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsKSB8fFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbiIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge307XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcblxuLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhREVTQ1JJUFRPUlMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjcmVhdGVFbGVtZW50KCdkaXYnKSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9XG4gIH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xuXG52YXIgc3BsaXQgPSAnJy5zcGxpdDtcblxuLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3Ncbm1vZHVsZS5leHBvcnRzID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyB0aHJvd3MgYW4gZXJyb3IgaW4gcmhpbm8sIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9yaGluby9pc3N1ZXMvMzQ2XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgcmV0dXJuICFPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKTtcbn0pID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjbGFzc29mKGl0KSA9PSAnU3RyaW5nJyA/IHNwbGl0LmNhbGwoaXQsICcnKSA6IE9iamVjdChpdCk7XG59IDogT2JqZWN0O1xuIiwidmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xuXG52YXIgZnVuY3Rpb25Ub1N0cmluZyA9IEZ1bmN0aW9uLnRvU3RyaW5nO1xuXG4vLyB0aGlzIGhlbHBlciBicm9rZW4gaW4gYDMuNC4xLTMuNC40YCwgc28gd2UgY2FuJ3QgdXNlIGBzaGFyZWRgIGhlbHBlclxuaWYgKHR5cGVvZiBzdG9yZS5pbnNwZWN0U291cmNlICE9ICdmdW5jdGlvbicpIHtcbiAgc3RvcmUuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBmdW5jdGlvblRvU3RyaW5nLmNhbGwoaXQpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0b3JlLmluc3BlY3RTb3VyY2U7XG4iLCJ2YXIgTkFUSVZFX1dFQUtfTUFQID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS13ZWFrLW1hcCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgb2JqZWN0SGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xudmFyIHNldCwgZ2V0LCBoYXM7XG5cbnZhciBlbmZvcmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBoYXMoaXQpID8gZ2V0KGl0KSA6IHNldChpdCwge30pO1xufTtcblxudmFyIGdldHRlckZvciA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaXQpIHtcbiAgICB2YXIgc3RhdGU7XG4gICAgaWYgKCFpc09iamVjdChpdCkgfHwgKHN0YXRlID0gZ2V0KGl0KSkudHlwZSAhPT0gVFlQRSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdJbmNvbXBhdGlibGUgcmVjZWl2ZXIsICcgKyBUWVBFICsgJyByZXF1aXJlZCcpO1xuICAgIH0gcmV0dXJuIHN0YXRlO1xuICB9O1xufTtcblxuaWYgKE5BVElWRV9XRUFLX01BUCkge1xuICB2YXIgc3RvcmUgPSBuZXcgV2Vha01hcCgpO1xuICB2YXIgd21nZXQgPSBzdG9yZS5nZXQ7XG4gIHZhciB3bWhhcyA9IHN0b3JlLmhhcztcbiAgdmFyIHdtc2V0ID0gc3RvcmUuc2V0O1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgd21zZXQuY2FsbChzdG9yZSwgaXQsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWdldC5jYWxsKHN0b3JlLCBpdCkgfHwge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWhhcy5jYWxsKHN0b3JlLCBpdCk7XG4gIH07XG59IGVsc2Uge1xuICB2YXIgU1RBVEUgPSBzaGFyZWRLZXkoJ3N0YXRlJyk7XG4gIGhpZGRlbktleXNbU1RBVEVdID0gdHJ1ZTtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShpdCwgU1RBVEUsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBvYmplY3RIYXMoaXQsIFNUQVRFKSA/IGl0W1NUQVRFXSA6IHt9O1xuICB9O1xuICBoYXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gb2JqZWN0SGFzKGl0LCBTVEFURSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IHNldCxcbiAgZ2V0OiBnZXQsXG4gIGhhczogaGFzLFxuICBlbmZvcmNlOiBlbmZvcmNlLFxuICBnZXR0ZXJGb3I6IGdldHRlckZvclxufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG52YXIgcmVwbGFjZW1lbnQgPSAvI3xcXC5wcm90b3R5cGVcXC4vO1xuXG52YXIgaXNGb3JjZWQgPSBmdW5jdGlvbiAoZmVhdHVyZSwgZGV0ZWN0aW9uKSB7XG4gIHZhciB2YWx1ZSA9IGRhdGFbbm9ybWFsaXplKGZlYXR1cmUpXTtcbiAgcmV0dXJuIHZhbHVlID09IFBPTFlGSUxMID8gdHJ1ZVxuICAgIDogdmFsdWUgPT0gTkFUSVZFID8gZmFsc2VcbiAgICA6IHR5cGVvZiBkZXRlY3Rpb24gPT0gJ2Z1bmN0aW9uJyA/IGZhaWxzKGRldGVjdGlvbilcbiAgICA6ICEhZGV0ZWN0aW9uO1xufTtcblxudmFyIG5vcm1hbGl6ZSA9IGlzRm9yY2VkLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UocmVwbGFjZW1lbnQsICcuJykudG9Mb3dlckNhc2UoKTtcbn07XG5cbnZhciBkYXRhID0gaXNGb3JjZWQuZGF0YSA9IHt9O1xudmFyIE5BVElWRSA9IGlzRm9yY2VkLk5BVElWRSA9ICdOJztcbnZhciBQT0xZRklMTCA9IGlzRm9yY2VkLlBPTFlGSUxMID0gJ1AnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRm9yY2VkO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZhbHNlO1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gISFPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIENocm9tZSAzOCBTeW1ib2wgaGFzIGluY29ycmVjdCB0b1N0cmluZyBjb252ZXJzaW9uXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICByZXR1cm4gIVN0cmluZyhTeW1ib2woKSk7XG59KTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nICYmIC9uYXRpdmUgY29kZS8udGVzdChpbnNwZWN0U291cmNlKFdlYWtNYXApKTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG5cbnZhciBuYXRpdmVEZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydHlcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gbmF0aXZlRGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIG5hdGl2ZURlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG5cbnZhciBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yXG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/IG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKSB7XG4gIE8gPSB0b0luZGV4ZWRPYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKGhhcyhPLCBQKSkgcmV0dXJuIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcighcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG4iLCJ2YXIgaW50ZXJuYWxPYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xuXG52YXIgaGlkZGVuS2V5cyA9IGVudW1CdWdLZXlzLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5bmFtZXNcbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICByZXR1cm4gaW50ZXJuYWxPYmplY3RLZXlzKE8sIGhpZGRlbktleXMpO1xufTtcbiIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgIWhhcyhoaWRkZW5LZXlzLCBrZXkpICYmIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+aW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIE5hc2hvcm4gfiBKREs4IGJ1Z1xudmFyIE5BU0hPUk5fQlVHID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmICFuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHsgMTogMiB9LCAxKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGVgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eWlzZW51bWVyYWJsZVxuZXhwb3J0cy5mID0gTkFTSE9STl9CVUcgPyBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShWKSB7XG4gIHZhciBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRoaXMsIFYpO1xuICByZXR1cm4gISFkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IuZW51bWVyYWJsZTtcbn0gOiBuYXRpdmVQcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scycpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG4vLyBhbGwgb2JqZWN0IGtleXMsIGluY2x1ZGVzIG5vbi1lbnVtZXJhYmxlIGFuZCBzeW1ib2xzXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ1JlZmxlY3QnLCAnb3duS2V5cycpIHx8IGZ1bmN0aW9uIG93bktleXMoaXQpIHtcbiAgdmFyIGtleXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlLmYoYW5PYmplY3QoaXQpKTtcbiAgdmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZS5mO1xuICByZXR1cm4gZ2V0T3duUHJvcGVydHlTeW1ib2xzID8ga2V5cy5jb25jYXQoZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KSkgOiBrZXlzO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcblxudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldDtcbnZhciBlbmZvcmNlSW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZW5mb3JjZTtcbnZhciBURU1QTEFURSA9IFN0cmluZyhTdHJpbmcpLnNwbGl0KCdTdHJpbmcnKTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIGtleSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgdmFyIHVuc2FmZSA9IG9wdGlvbnMgPyAhIW9wdGlvbnMudW5zYWZlIDogZmFsc2U7XG4gIHZhciBzaW1wbGUgPSBvcHRpb25zID8gISFvcHRpb25zLmVudW1lcmFibGUgOiBmYWxzZTtcbiAgdmFyIG5vVGFyZ2V0R2V0ID0gb3B0aW9ucyA/ICEhb3B0aW9ucy5ub1RhcmdldEdldCA6IGZhbHNlO1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAodHlwZW9mIGtleSA9PSAnc3RyaW5nJyAmJiAhaGFzKHZhbHVlLCAnbmFtZScpKSBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkodmFsdWUsICduYW1lJywga2V5KTtcbiAgICBlbmZvcmNlSW50ZXJuYWxTdGF0ZSh2YWx1ZSkuc291cmNlID0gVEVNUExBVEUuam9pbih0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8ga2V5IDogJycpO1xuICB9XG4gIGlmIChPID09PSBnbG9iYWwpIHtcbiAgICBpZiAoc2ltcGxlKSBPW2tleV0gPSB2YWx1ZTtcbiAgICBlbHNlIHNldEdsb2JhbChrZXksIHZhbHVlKTtcbiAgICByZXR1cm47XG4gIH0gZWxzZSBpZiAoIXVuc2FmZSkge1xuICAgIGRlbGV0ZSBPW2tleV07XG4gIH0gZWxzZSBpZiAoIW5vVGFyZ2V0R2V0ICYmIE9ba2V5XSkge1xuICAgIHNpbXBsZSA9IHRydWU7XG4gIH1cbiAgaWYgKHNpbXBsZSkgT1trZXldID0gdmFsdWU7XG4gIGVsc2UgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KE8sIGtleSwgdmFsdWUpO1xuLy8gYWRkIGZha2UgRnVuY3Rpb24jdG9TdHJpbmcgZm9yIGNvcnJlY3Qgd29yayB3cmFwcGVkIG1ldGhvZHMgLyBjb25zdHJ1Y3RvcnMgd2l0aCBtZXRob2RzIGxpa2UgTG9EYXNoIGlzTmF0aXZlXG59KShGdW5jdGlvbi5wcm90b3R5cGUsICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyAmJiBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpLnNvdXJjZSB8fCBpbnNwZWN0U291cmNlKHRoaXMpO1xufSk7XG4iLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vY2xhc3NvZi1yYXcnKTtcbnZhciByZWdleHBFeGVjID0gcmVxdWlyZSgnLi9yZWdleHAtZXhlYycpO1xuXG4vLyBgUmVnRXhwRXhlY2AgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1yZWdleHBleGVjXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChSLCBTKSB7XG4gIHZhciBleGVjID0gUi5leGVjO1xuICBpZiAodHlwZW9mIGV4ZWMgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgcmVzdWx0ID0gZXhlYy5jYWxsKFIsIFMpO1xuICAgIGlmICh0eXBlb2YgcmVzdWx0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdSZWdFeHAgZXhlYyBtZXRob2QgcmV0dXJuZWQgc29tZXRoaW5nIG90aGVyIHRoYW4gYW4gT2JqZWN0IG9yIG51bGwnKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGlmIChjbGFzc29mKFIpICE9PSAnUmVnRXhwJykge1xuICAgIHRocm93IFR5cGVFcnJvcignUmVnRXhwI2V4ZWMgY2FsbGVkIG9uIGluY29tcGF0aWJsZSByZWNlaXZlcicpO1xuICB9XG5cbiAgcmV0dXJuIHJlZ2V4cEV4ZWMuY2FsbChSLCBTKTtcbn07XG5cbiIsIid1c2Ugc3RyaWN0JztcbnZhciByZWdleHBGbGFncyA9IHJlcXVpcmUoJy4vcmVnZXhwLWZsYWdzJyk7XG52YXIgc3RpY2t5SGVscGVycyA9IHJlcXVpcmUoJy4vcmVnZXhwLXN0aWNreS1oZWxwZXJzJyk7XG5cbnZhciBuYXRpdmVFeGVjID0gUmVnRXhwLnByb3RvdHlwZS5leGVjO1xuLy8gVGhpcyBhbHdheXMgcmVmZXJzIHRvIHRoZSBuYXRpdmUgaW1wbGVtZW50YXRpb24sIGJlY2F1c2UgdGhlXG4vLyBTdHJpbmcjcmVwbGFjZSBwb2x5ZmlsbCB1c2VzIC4vZml4LXJlZ2V4cC13ZWxsLWtub3duLXN5bWJvbC1sb2dpYy5qcyxcbi8vIHdoaWNoIGxvYWRzIHRoaXMgZmlsZSBiZWZvcmUgcGF0Y2hpbmcgdGhlIG1ldGhvZC5cbnZhciBuYXRpdmVSZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xuXG52YXIgcGF0Y2hlZEV4ZWMgPSBuYXRpdmVFeGVjO1xuXG52YXIgVVBEQVRFU19MQVNUX0lOREVYX1dST05HID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJlMSA9IC9hLztcbiAgdmFyIHJlMiA9IC9iKi9nO1xuICBuYXRpdmVFeGVjLmNhbGwocmUxLCAnYScpO1xuICBuYXRpdmVFeGVjLmNhbGwocmUyLCAnYScpO1xuICByZXR1cm4gcmUxLmxhc3RJbmRleCAhPT0gMCB8fCByZTIubGFzdEluZGV4ICE9PSAwO1xufSkoKTtcblxudmFyIFVOU1VQUE9SVEVEX1kgPSBzdGlja3lIZWxwZXJzLlVOU1VQUE9SVEVEX1kgfHwgc3RpY2t5SGVscGVycy5CUk9LRU5fQ0FSRVQ7XG5cbi8vIG5vbnBhcnRpY2lwYXRpbmcgY2FwdHVyaW5nIGdyb3VwLCBjb3BpZWQgZnJvbSBlczUtc2hpbSdzIFN0cmluZyNzcGxpdCBwYXRjaC5cbnZhciBOUENHX0lOQ0xVREVEID0gLygpPz8vLmV4ZWMoJycpWzFdICE9PSB1bmRlZmluZWQ7XG5cbnZhciBQQVRDSCA9IFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyB8fCBOUENHX0lOQ0xVREVEIHx8IFVOU1VQUE9SVEVEX1k7XG5cbmlmIChQQVRDSCkge1xuICBwYXRjaGVkRXhlYyA9IGZ1bmN0aW9uIGV4ZWMoc3RyKSB7XG4gICAgdmFyIHJlID0gdGhpcztcbiAgICB2YXIgbGFzdEluZGV4LCByZUNvcHksIG1hdGNoLCBpO1xuICAgIHZhciBzdGlja3kgPSBVTlNVUFBPUlRFRF9ZICYmIHJlLnN0aWNreTtcbiAgICB2YXIgZmxhZ3MgPSByZWdleHBGbGFncy5jYWxsKHJlKTtcbiAgICB2YXIgc291cmNlID0gcmUuc291cmNlO1xuICAgIHZhciBjaGFyc0FkZGVkID0gMDtcbiAgICB2YXIgc3RyQ29weSA9IHN0cjtcblxuICAgIGlmIChzdGlja3kpIHtcbiAgICAgIGZsYWdzID0gZmxhZ3MucmVwbGFjZSgneScsICcnKTtcbiAgICAgIGlmIChmbGFncy5pbmRleE9mKCdnJykgPT09IC0xKSB7XG4gICAgICAgIGZsYWdzICs9ICdnJztcbiAgICAgIH1cblxuICAgICAgc3RyQ29weSA9IFN0cmluZyhzdHIpLnNsaWNlKHJlLmxhc3RJbmRleCk7XG4gICAgICAvLyBTdXBwb3J0IGFuY2hvcmVkIHN0aWNreSBiZWhhdmlvci5cbiAgICAgIGlmIChyZS5sYXN0SW5kZXggPiAwICYmICghcmUubXVsdGlsaW5lIHx8IHJlLm11bHRpbGluZSAmJiBzdHJbcmUubGFzdEluZGV4IC0gMV0gIT09ICdcXG4nKSkge1xuICAgICAgICBzb3VyY2UgPSAnKD86ICcgKyBzb3VyY2UgKyAnKSc7XG4gICAgICAgIHN0ckNvcHkgPSAnICcgKyBzdHJDb3B5O1xuICAgICAgICBjaGFyc0FkZGVkKys7XG4gICAgICB9XG4gICAgICAvLyBeKD8gKyByeCArICkgaXMgbmVlZGVkLCBpbiBjb21iaW5hdGlvbiB3aXRoIHNvbWUgc3RyIHNsaWNpbmcsIHRvXG4gICAgICAvLyBzaW11bGF0ZSB0aGUgJ3knIGZsYWcuXG4gICAgICByZUNvcHkgPSBuZXcgUmVnRXhwKCdeKD86JyArIHNvdXJjZSArICcpJywgZmxhZ3MpO1xuICAgIH1cblxuICAgIGlmIChOUENHX0lOQ0xVREVEKSB7XG4gICAgICByZUNvcHkgPSBuZXcgUmVnRXhwKCdeJyArIHNvdXJjZSArICckKD8hXFxcXHMpJywgZmxhZ3MpO1xuICAgIH1cbiAgICBpZiAoVVBEQVRFU19MQVNUX0lOREVYX1dST05HKSBsYXN0SW5kZXggPSByZS5sYXN0SW5kZXg7XG5cbiAgICBtYXRjaCA9IG5hdGl2ZUV4ZWMuY2FsbChzdGlja3kgPyByZUNvcHkgOiByZSwgc3RyQ29weSk7XG5cbiAgICBpZiAoc3RpY2t5KSB7XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgbWF0Y2guaW5wdXQgPSBtYXRjaC5pbnB1dC5zbGljZShjaGFyc0FkZGVkKTtcbiAgICAgICAgbWF0Y2hbMF0gPSBtYXRjaFswXS5zbGljZShjaGFyc0FkZGVkKTtcbiAgICAgICAgbWF0Y2guaW5kZXggPSByZS5sYXN0SW5kZXg7XG4gICAgICAgIHJlLmxhc3RJbmRleCArPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICB9IGVsc2UgcmUubGFzdEluZGV4ID0gMDtcbiAgICB9IGVsc2UgaWYgKFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyAmJiBtYXRjaCkge1xuICAgICAgcmUubGFzdEluZGV4ID0gcmUuZ2xvYmFsID8gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGggOiBsYXN0SW5kZXg7XG4gICAgfVxuICAgIGlmIChOUENHX0lOQ0xVREVEICYmIG1hdGNoICYmIG1hdGNoLmxlbmd0aCA+IDEpIHtcbiAgICAgIC8vIEZpeCBicm93c2VycyB3aG9zZSBgZXhlY2AgbWV0aG9kcyBkb24ndCBjb25zaXN0ZW50bHkgcmV0dXJuIGB1bmRlZmluZWRgXG4gICAgICAvLyBmb3IgTlBDRywgbGlrZSBJRTguIE5PVEU6IFRoaXMgZG9lc24nIHdvcmsgZm9yIC8oLj8pPy9cbiAgICAgIG5hdGl2ZVJlcGxhY2UuY2FsbChtYXRjaFswXSwgcmVDb3B5LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoIC0gMjsgaSsrKSB7XG4gICAgICAgICAgaWYgKGFyZ3VtZW50c1tpXSA9PT0gdW5kZWZpbmVkKSBtYXRjaFtpXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGNoZWRFeGVjO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG4vLyBgUmVnRXhwLnByb3RvdHlwZS5mbGFnc2AgZ2V0dGVyIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1nZXQtcmVnZXhwLnByb3RvdHlwZS5mbGFnc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB0aGF0ID0gYW5PYmplY3QodGhpcyk7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgaWYgKHRoYXQuZ2xvYmFsKSByZXN1bHQgKz0gJ2cnO1xuICBpZiAodGhhdC5pZ25vcmVDYXNlKSByZXN1bHQgKz0gJ2knO1xuICBpZiAodGhhdC5tdWx0aWxpbmUpIHJlc3VsdCArPSAnbSc7XG4gIGlmICh0aGF0LmRvdEFsbCkgcmVzdWx0ICs9ICdzJztcbiAgaWYgKHRoYXQudW5pY29kZSkgcmVzdWx0ICs9ICd1JztcbiAgaWYgKHRoYXQuc3RpY2t5KSByZXN1bHQgKz0gJ3knO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZhaWxzID0gcmVxdWlyZSgnLi9mYWlscycpO1xuXG4vLyBiYWJlbC1taW5pZnkgdHJhbnNwaWxlcyBSZWdFeHAoJ2EnLCAneScpIC0+IC9hL3kgYW5kIGl0IGNhdXNlcyBTeW50YXhFcnJvcixcbi8vIHNvIHdlIHVzZSBhbiBpbnRlcm1lZGlhdGUgZnVuY3Rpb24uXG5mdW5jdGlvbiBSRShzLCBmKSB7XG4gIHJldHVybiBSZWdFeHAocywgZik7XG59XG5cbmV4cG9ydHMuVU5TVVBQT1JURURfWSA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gYmFiZWwtbWluaWZ5IHRyYW5zcGlsZXMgUmVnRXhwKCdhJywgJ3knKSAtPiAvYS95IGFuZCBpdCBjYXVzZXMgU3ludGF4RXJyb3JcbiAgdmFyIHJlID0gUkUoJ2EnLCAneScpO1xuICByZS5sYXN0SW5kZXggPSAyO1xuICByZXR1cm4gcmUuZXhlYygnYWJjZCcpICE9IG51bGw7XG59KTtcblxuZXhwb3J0cy5CUk9LRU5fQ0FSRVQgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTc3MzY4N1xuICB2YXIgcmUgPSBSRSgnXnInLCAnZ3knKTtcbiAgcmUubGFzdEluZGV4ID0gMjtcbiAgcmV0dXJuIHJlLmV4ZWMoJ3N0cicpICE9IG51bGw7XG59KTtcbiIsIi8vIGBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXJlcXVpcmVvYmplY3Rjb2VyY2libGVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgdHJ5IHtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoZ2xvYmFsLCBrZXksIHZhbHVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBnbG9iYWxba2V5XSA9IHZhbHVlO1xuICB9IHJldHVybiB2YWx1ZTtcbn07XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcblxudmFyIGtleXMgPSBzaGFyZWQoJ2tleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBrZXlzW2tleV0gfHwgKGtleXNba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHNldEdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtZ2xvYmFsJyk7XG5cbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IHNldEdsb2JhbChTSEFSRUQsIHt9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBzdG9yZTtcbiIsInZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBzdG9yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiB7fSk7XG59KSgndmVyc2lvbnMnLCBbXSkucHVzaCh7XG4gIHZlcnNpb246ICczLjYuMCcsXG4gIG1vZGU6IElTX1BVUkUgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAxOSBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUueyBjb2RlUG9pbnRBdCwgYXQgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChDT05WRVJUX1RPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBwb3MpIHtcbiAgICB2YXIgUyA9IFN0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKCR0aGlzKSk7XG4gICAgdmFyIHBvc2l0aW9uID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIHNpemUgPSBTLmxlbmd0aDtcbiAgICB2YXIgZmlyc3QsIHNlY29uZDtcbiAgICBpZiAocG9zaXRpb24gPCAwIHx8IHBvc2l0aW9uID49IHNpemUpIHJldHVybiBDT05WRVJUX1RPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGZpcnN0ID0gUy5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcbiAgICByZXR1cm4gZmlyc3QgPCAweEQ4MDAgfHwgZmlyc3QgPiAweERCRkYgfHwgcG9zaXRpb24gKyAxID09PSBzaXplXG4gICAgICB8fCAoc2Vjb25kID0gUy5jaGFyQ29kZUF0KHBvc2l0aW9uICsgMSkpIDwgMHhEQzAwIHx8IHNlY29uZCA+IDB4REZGRlxuICAgICAgICA/IENPTlZFUlRfVE9fU1RSSU5HID8gUy5jaGFyQXQocG9zaXRpb24pIDogZmlyc3RcbiAgICAgICAgOiBDT05WRVJUX1RPX1NUUklORyA/IFMuc2xpY2UocG9zaXRpb24sIHBvc2l0aW9uICsgMikgOiAoZmlyc3QgLSAweEQ4MDAgPDwgMTApICsgKHNlY29uZCAtIDB4REMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5jb2RlcG9pbnRhdFxuICBjb2RlQXQ6IGNyZWF0ZU1ldGhvZChmYWxzZSksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21hdGhpYXNieW5lbnMvU3RyaW5nLnByb3RvdHlwZS5hdFxuICBjaGFyQXQ6IGNyZWF0ZU1ldGhvZCh0cnVlKVxufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xuXG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIEhlbHBlciBmb3IgYSBwb3B1bGFyIHJlcGVhdGluZyBjYXNlIG9mIHRoZSBzcGVjOlxuLy8gTGV0IGludGVnZXIgYmUgPyBUb0ludGVnZXIoaW5kZXgpLlxuLy8gSWYgaW50ZWdlciA8IDAsIGxldCByZXN1bHQgYmUgbWF4KChsZW5ndGggKyBpbnRlZ2VyKSwgMCk7IGVsc2UgbGV0IHJlc3VsdCBiZSBtaW4oaW50ZWdlciwgbGVuZ3RoKS5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgdmFyIGludGVnZXIgPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW50ZWdlciA8IDAgPyBtYXgoaW50ZWdlciArIGxlbmd0aCwgMCkgOiBtaW4oaW50ZWdlciwgbGVuZ3RoKTtcbn07XG4iLCIvLyB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSW5kZXhlZE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGl0KSk7XG59O1xuIiwidmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuXG4vLyBgVG9JbnRlZ2VyYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvaW50ZWdlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGlzTmFOKGFyZ3VtZW50ID0gK2FyZ3VtZW50KSA/IDAgOiAoYXJndW1lbnQgPiAwID8gZmxvb3IgOiBjZWlsKShhcmd1bWVudCk7XG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG5cbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gYFRvTGVuZ3RoYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvbGVuZ3RoXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gYXJndW1lbnQgPiAwID8gbWluKHRvSW50ZWdlcihhcmd1bWVudCksIDB4MUZGRkZGRkZGRkZGRkYpIDogMDsgLy8gMiAqKiA1MyAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsInZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG4vLyBgVG9PYmplY3RgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdG9vYmplY3Rcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudCkpO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxuLy8gYFRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvcHJpbWl0aXZlXG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBQUkVGRVJSRURfU1RSSU5HKSB7XG4gIGlmICghaXNPYmplY3QoaW5wdXQpKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpbnB1dC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBpZCA9IDA7XG52YXIgcG9zdGZpeCA9IE1hdGgucmFuZG9tKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnICsgU3RyaW5nKGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXkpICsgJylfJyArICgrK2lkICsgcG9zdGZpeCkudG9TdHJpbmcoMzYpO1xufTtcbiIsInZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS1zeW1ib2wnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfU1lNQk9MXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAmJiAhU3ltYm9sLnNoYW1cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICYmIHR5cGVvZiBTeW1ib2woKSA9PSAnc3ltYm9sJztcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG52YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtc3ltYm9sJyk7XG52YXIgVVNFX1NZTUJPTF9BU19VSUQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQnKTtcblxudmFyIFdlbGxLbm93blN5bWJvbHNTdG9yZSA9IHNoYXJlZCgnd2tzJyk7XG52YXIgU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciBjcmVhdGVXZWxsS25vd25TeW1ib2wgPSBVU0VfU1lNQk9MX0FTX1VJRCA/IFN5bWJvbCA6IHVpZDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICBpZiAoIWhhcyhXZWxsS25vd25TeW1ib2xzU3RvcmUsIG5hbWUpKSB7XG4gICAgaWYgKE5BVElWRV9TWU1CT0wgJiYgaGFzKFN5bWJvbCwgbmFtZSkpIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IFN5bWJvbFtuYW1lXTtcbiAgICBlbHNlIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IGNyZWF0ZVdlbGxLbm93blN5bWJvbCgnU3ltYm9sLicgKyBuYW1lKTtcbiAgfSByZXR1cm4gV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGV4ZWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMnKTtcblxuJCh7IHRhcmdldDogJ1JlZ0V4cCcsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IC8uLy5leGVjICE9PSBleGVjIH0sIHtcbiAgZXhlYzogZXhlY1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZml4UmVnRXhwV2VsbEtub3duU3ltYm9sTG9naWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZml4LXJlZ2V4cC13ZWxsLWtub3duLXN5bWJvbC1sb2dpYycpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcbnZhciBhZHZhbmNlU3RyaW5nSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYWR2YW5jZS1zdHJpbmctaW5kZXgnKTtcbnZhciByZWdFeHBFeGVjID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1leGVjLWFic3RyYWN0Jyk7XG5cbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG52YXIgU1VCU1RJVFVUSU9OX1NZTUJPTFMgPSAvXFwkKFskJidgXXxcXGRcXGQ/fDxbXj5dKj4pL2c7XG52YXIgU1VCU1RJVFVUSU9OX1NZTUJPTFNfTk9fTkFNRUQgPSAvXFwkKFskJidgXXxcXGRcXGQ/KS9nO1xuXG52YXIgbWF5YmVUb1N0cmluZyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/IGl0IDogU3RyaW5nKGl0KTtcbn07XG5cbi8vIEBAcmVwbGFjZSBsb2dpY1xuZml4UmVnRXhwV2VsbEtub3duU3ltYm9sTG9naWMoJ3JlcGxhY2UnLCAyLCBmdW5jdGlvbiAoUkVQTEFDRSwgbmF0aXZlUmVwbGFjZSwgbWF5YmVDYWxsTmF0aXZlLCByZWFzb24pIHtcbiAgcmV0dXJuIFtcbiAgICAvLyBgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnJlcGxhY2VcbiAgICBmdW5jdGlvbiByZXBsYWNlKHNlYXJjaFZhbHVlLCByZXBsYWNlVmFsdWUpIHtcbiAgICAgIHZhciBPID0gcmVxdWlyZU9iamVjdENvZXJjaWJsZSh0aGlzKTtcbiAgICAgIHZhciByZXBsYWNlciA9IHNlYXJjaFZhbHVlID09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHNlYXJjaFZhbHVlW1JFUExBQ0VdO1xuICAgICAgcmV0dXJuIHJlcGxhY2VyICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyByZXBsYWNlci5jYWxsKHNlYXJjaFZhbHVlLCBPLCByZXBsYWNlVmFsdWUpXG4gICAgICAgIDogbmF0aXZlUmVwbGFjZS5jYWxsKFN0cmluZyhPKSwgc2VhcmNoVmFsdWUsIHJlcGxhY2VWYWx1ZSk7XG4gICAgfSxcbiAgICAvLyBgUmVnRXhwLnByb3RvdHlwZVtAQHJlcGxhY2VdYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1yZWdleHAucHJvdG90eXBlLUBAcmVwbGFjZVxuICAgIGZ1bmN0aW9uIChyZWdleHAsIHJlcGxhY2VWYWx1ZSkge1xuICAgICAgaWYgKHJlYXNvbi5SRVBMQUNFX0tFRVBTXyQwIHx8ICh0eXBlb2YgcmVwbGFjZVZhbHVlID09PSAnc3RyaW5nJyAmJiByZXBsYWNlVmFsdWUuaW5kZXhPZignJDAnKSA9PT0gLTEpKSB7XG4gICAgICAgIHZhciByZXMgPSBtYXliZUNhbGxOYXRpdmUobmF0aXZlUmVwbGFjZSwgcmVnZXhwLCB0aGlzLCByZXBsYWNlVmFsdWUpO1xuICAgICAgICBpZiAocmVzLmRvbmUpIHJldHVybiByZXMudmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHZhciByeCA9IGFuT2JqZWN0KHJlZ2V4cCk7XG4gICAgICB2YXIgUyA9IFN0cmluZyh0aGlzKTtcblxuICAgICAgdmFyIGZ1bmN0aW9uYWxSZXBsYWNlID0gdHlwZW9mIHJlcGxhY2VWYWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgIGlmICghZnVuY3Rpb25hbFJlcGxhY2UpIHJlcGxhY2VWYWx1ZSA9IFN0cmluZyhyZXBsYWNlVmFsdWUpO1xuXG4gICAgICB2YXIgZ2xvYmFsID0gcnguZ2xvYmFsO1xuICAgICAgaWYgKGdsb2JhbCkge1xuICAgICAgICB2YXIgZnVsbFVuaWNvZGUgPSByeC51bmljb2RlO1xuICAgICAgICByeC5sYXN0SW5kZXggPSAwO1xuICAgICAgfVxuICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWdFeHBFeGVjKHJ4LCBTKTtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkgYnJlYWs7XG5cbiAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICAgIGlmICghZ2xvYmFsKSBicmVhaztcblxuICAgICAgICB2YXIgbWF0Y2hTdHIgPSBTdHJpbmcocmVzdWx0WzBdKTtcbiAgICAgICAgaWYgKG1hdGNoU3RyID09PSAnJykgcngubGFzdEluZGV4ID0gYWR2YW5jZVN0cmluZ0luZGV4KFMsIHRvTGVuZ3RoKHJ4Lmxhc3RJbmRleCksIGZ1bGxVbmljb2RlKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGFjY3VtdWxhdGVkUmVzdWx0ID0gJyc7XG4gICAgICB2YXIgbmV4dFNvdXJjZVBvc2l0aW9uID0gMDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQgPSByZXN1bHRzW2ldO1xuXG4gICAgICAgIHZhciBtYXRjaGVkID0gU3RyaW5nKHJlc3VsdFswXSk7XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IG1heChtaW4odG9JbnRlZ2VyKHJlc3VsdC5pbmRleCksIFMubGVuZ3RoKSwgMCk7XG4gICAgICAgIHZhciBjYXB0dXJlcyA9IFtdO1xuICAgICAgICAvLyBOT1RFOiBUaGlzIGlzIGVxdWl2YWxlbnQgdG9cbiAgICAgICAgLy8gICBjYXB0dXJlcyA9IHJlc3VsdC5zbGljZSgxKS5tYXAobWF5YmVUb1N0cmluZylcbiAgICAgICAgLy8gYnV0IGZvciBzb21lIHJlYXNvbiBgbmF0aXZlU2xpY2UuY2FsbChyZXN1bHQsIDEsIHJlc3VsdC5sZW5ndGgpYCAoY2FsbGVkIGluXG4gICAgICAgIC8vIHRoZSBzbGljZSBwb2x5ZmlsbCB3aGVuIHNsaWNpbmcgbmF0aXZlIGFycmF5cykgXCJkb2Vzbid0IHdvcmtcIiBpbiBzYWZhcmkgOSBhbmRcbiAgICAgICAgLy8gY2F1c2VzIGEgY3Jhc2ggKGh0dHBzOi8vcGFzdGViaW4uY29tL04yMVF6ZVFBKSB3aGVuIHRyeWluZyB0byBkZWJ1ZyBpdC5cbiAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCByZXN1bHQubGVuZ3RoOyBqKyspIGNhcHR1cmVzLnB1c2gobWF5YmVUb1N0cmluZyhyZXN1bHRbal0pKTtcbiAgICAgICAgdmFyIG5hbWVkQ2FwdHVyZXMgPSByZXN1bHQuZ3JvdXBzO1xuICAgICAgICBpZiAoZnVuY3Rpb25hbFJlcGxhY2UpIHtcbiAgICAgICAgICB2YXIgcmVwbGFjZXJBcmdzID0gW21hdGNoZWRdLmNvbmNhdChjYXB0dXJlcywgcG9zaXRpb24sIFMpO1xuICAgICAgICAgIGlmIChuYW1lZENhcHR1cmVzICE9PSB1bmRlZmluZWQpIHJlcGxhY2VyQXJncy5wdXNoKG5hbWVkQ2FwdHVyZXMpO1xuICAgICAgICAgIHZhciByZXBsYWNlbWVudCA9IFN0cmluZyhyZXBsYWNlVmFsdWUuYXBwbHkodW5kZWZpbmVkLCByZXBsYWNlckFyZ3MpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXBsYWNlbWVudCA9IGdldFN1YnN0aXR1dGlvbihtYXRjaGVkLCBTLCBwb3NpdGlvbiwgY2FwdHVyZXMsIG5hbWVkQ2FwdHVyZXMsIHJlcGxhY2VWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvc2l0aW9uID49IG5leHRTb3VyY2VQb3NpdGlvbikge1xuICAgICAgICAgIGFjY3VtdWxhdGVkUmVzdWx0ICs9IFMuc2xpY2UobmV4dFNvdXJjZVBvc2l0aW9uLCBwb3NpdGlvbikgKyByZXBsYWNlbWVudDtcbiAgICAgICAgICBuZXh0U291cmNlUG9zaXRpb24gPSBwb3NpdGlvbiArIG1hdGNoZWQubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjdW11bGF0ZWRSZXN1bHQgKyBTLnNsaWNlKG5leHRTb3VyY2VQb3NpdGlvbik7XG4gICAgfVxuICBdO1xuXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWdldHN1YnN0aXR1dGlvblxuICBmdW5jdGlvbiBnZXRTdWJzdGl0dXRpb24obWF0Y2hlZCwgc3RyLCBwb3NpdGlvbiwgY2FwdHVyZXMsIG5hbWVkQ2FwdHVyZXMsIHJlcGxhY2VtZW50KSB7XG4gICAgdmFyIHRhaWxQb3MgPSBwb3NpdGlvbiArIG1hdGNoZWQubGVuZ3RoO1xuICAgIHZhciBtID0gY2FwdHVyZXMubGVuZ3RoO1xuICAgIHZhciBzeW1ib2xzID0gU1VCU1RJVFVUSU9OX1NZTUJPTFNfTk9fTkFNRUQ7XG4gICAgaWYgKG5hbWVkQ2FwdHVyZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbmFtZWRDYXB0dXJlcyA9IHRvT2JqZWN0KG5hbWVkQ2FwdHVyZXMpO1xuICAgICAgc3ltYm9scyA9IFNVQlNUSVRVVElPTl9TWU1CT0xTO1xuICAgIH1cbiAgICByZXR1cm4gbmF0aXZlUmVwbGFjZS5jYWxsKHJlcGxhY2VtZW50LCBzeW1ib2xzLCBmdW5jdGlvbiAobWF0Y2gsIGNoKSB7XG4gICAgICB2YXIgY2FwdHVyZTtcbiAgICAgIHN3aXRjaCAoY2guY2hhckF0KDApKSB7XG4gICAgICAgIGNhc2UgJyQnOiByZXR1cm4gJyQnO1xuICAgICAgICBjYXNlICcmJzogcmV0dXJuIG1hdGNoZWQ7XG4gICAgICAgIGNhc2UgJ2AnOiByZXR1cm4gc3RyLnNsaWNlKDAsIHBvc2l0aW9uKTtcbiAgICAgICAgY2FzZSBcIidcIjogcmV0dXJuIHN0ci5zbGljZSh0YWlsUG9zKTtcbiAgICAgICAgY2FzZSAnPCc6XG4gICAgICAgICAgY2FwdHVyZSA9IG5hbWVkQ2FwdHVyZXNbY2guc2xpY2UoMSwgLTEpXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDogLy8gXFxkXFxkP1xuICAgICAgICAgIHZhciBuID0gK2NoO1xuICAgICAgICAgIGlmIChuID09PSAwKSByZXR1cm4gbWF0Y2g7XG4gICAgICAgICAgaWYgKG4gPiBtKSB7XG4gICAgICAgICAgICB2YXIgZiA9IGZsb29yKG4gLyAxMCk7XG4gICAgICAgICAgICBpZiAoZiA9PT0gMCkgcmV0dXJuIG1hdGNoO1xuICAgICAgICAgICAgaWYgKGYgPD0gbSkgcmV0dXJuIGNhcHR1cmVzW2YgLSAxXSA9PT0gdW5kZWZpbmVkID8gY2guY2hhckF0KDEpIDogY2FwdHVyZXNbZiAtIDFdICsgY2guY2hhckF0KDEpO1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXB0dXJlID0gY2FwdHVyZXNbbiAtIDFdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNhcHR1cmUgPT09IHVuZGVmaW5lZCA/ICcnIDogY2FwdHVyZTtcbiAgICB9KTtcbiAgfVxufSk7XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iXSwic291cmNlUm9vdCI6IiJ9
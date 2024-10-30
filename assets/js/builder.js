/*
 * Bloks 1.0.0
 * Wordpress blocks builder.
 * http://bloks.co
 *
 * Copyright 2017, Bloks Co., Ltd.
*/

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 58);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = Vue;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (true) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return _;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}.call(this));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self
// eslint-disable-next-line no-new-func
: Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var store = __webpack_require__(48)('wks');
var uid = __webpack_require__(49);
var _Symbol = __webpack_require__(3).Symbol;
var USE_SYMBOL = typeof _Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = addStyles;

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addStyles(el) {
    var styles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _underscore2.default.each(styles, function (val, key) {
        el.style[key] = val;
    });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(10);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dP = __webpack_require__(18);
var createDesc = __webpack_require__(46);
module.exports = __webpack_require__(11) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Checkboard = function () {
    function Checkboard() {
        _classCallCheck(this, Checkboard);
    }

    _createClass(Checkboard, null, [{
        key: 'get',

        /**
         * get base 64 data by canvas
         *
         * @param {String} c1 hex color
         * @param {String} c2 hex color
         * @param {Number} size
         */
        value: function get(c1, c2, size) {
            // Dont Render On Server
            if (typeof document === 'undefined') {
                return null;
            }

            var canvas = document.createElement('canvas');
            canvas.width = canvas.height = size * 2;
            var ctx = canvas.getContext('2d');
            // If no context can be found, return early.
            if (!ctx) {
                return null;
            }
            ctx.fillStyle = c1;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = c2;
            ctx.fillRect(0, 0, size, size);
            ctx.translate(size, size);
            ctx.fillRect(0, 0, size, size);

            return canvas.toDataURL();
        }
    }]);

    return Checkboard;
}();

exports.default = Checkboard;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (it) {
  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(45)(function () {
  return Object.defineProperty({}, 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _main = __webpack_require__(21);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _jquery2.default)(document).ready(function () {
    'use strict';

    var old = _jquery2.default.fn.colorpicker;

    _jquery2.default.colorpicker = _main2.default;

    _jquery2.default.fn.colorpicker = function (option) {
        var apiArgs = Array.prototype.slice.call(arguments, 1),
            isSingleElement = this.length === 1,
            returnValue = null;

        var $jq = this.each(function () {
            var $this = (0, _jquery2.default)(this),
                inst = $this.data('colorpicker'),
                options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object' ? option : {};

            if (!inst) {
                inst = new _main2.default(this, options);
                $this.data('colorpicker', inst);
            }

            $this.on('color-change', function (e) {
                $this.trigger('change', e.detail.color);
            });

            if (typeof option === 'string') {
                if (_jquery2.default.isFunction(inst[option])) {
                    returnValue = inst[option].apply(inst, apiArgs);
                } else {
                    // its a property ?
                    if (apiArgs.length) {
                        // set property
                        inst[option] = apiArgs[0];
                    }
                    returnValue = inst[option];
                }
            } else {
                returnValue = $this;
            }
        });

        return isSingleElement ? returnValue : $jq;
    };

    _jquery2.default.fn.colorpicker.Constructor = _main2.default;

    _jquery2.default.fn.colorpicker.noConflict = function () {
        _jquery2.default.fn.colorpicker = old;
        return this;
    };
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
        key: 'isJson',

        /**
         * Function to check string is json or not
         *
         * @param string
         * @returns {boolean}
         */
        value: function isJson(string) {
            string = typeof string !== "string" ? JSON.stringify(string) : string;

            try {
                string = JSON.parse(string);
            } catch (e) {
                return false;
            }

            if ((typeof string === 'undefined' ? 'undefined' : _typeof(string)) === "object" && string !== null) {
                return true;
            }

            return false;
        }

        /**
         * Method to remove all html comment
         *
         * @param html
         */

    }, {
        key: 'removeHtmlComments',
        value: function removeHtmlComments(html) {
            var COMMENT_PSEUDO_COMMENT_OR_LT_BANG = new RegExp('<!--@[\\s\\S]*?@-->' + '|<!--[\\s\\S]*?(?:-->)?' + '<!---+>?' // A comment with no body
            + '|<!(?![dD][oO][cC][tT][yY][pP][eE]|\\[CDATA\\[)[^>]*>?' + '|<[?][^>]*>?', // A pseudo-comment
            'g');

            return html.replace(COMMENT_PSEUDO_COMMENT_OR_LT_BANG, '');
        }

        /**
         * Method to minify html string
         *
         * @param html
         */

    }, {
        key: 'minifyHtml',
        value: function minifyHtml(html) {
            return html.replace(/>\s+</g, '> <').replace(new RegExp('[\r\n]', 'gi'), '');
        }

        /**
         * Method to convert special chars to html encoded
         *
         * @param str
         * @returns {string}
         */

    }, {
        key: 'htmlEncode',
        value: function htmlEncode(str) {
            var i = str.length,
                aRet = [];

            while (i--) {
                var iC = str[i].charCodeAt();
                if (iC < 65 || iC > 127 || iC > 90 && iC < 97) {
                    aRet[i] = '&#' + iC + ';';
                } else {
                    aRet[i] = str[i];
                }
            }
            return aRet.join('');
        }

        /**
         * Extract parameter from URL
         *
         * @param name
         * @param url
         * @returns {string}
         */

    }, {
        key: 'getUrlParameter',
        value: function getUrlParameter(name, url) {
            url = !url ? window.location.href : url;
            var regexSearch = "[\\?&#]" + name + "=([^&#]*)";
            var regex = new RegExp(regexSearch);
            var results = regex.exec(url);
            return results ? _underscore2.default.unescape(results[1]) : '';
        }

        /**
         * Parse a string to link
         *
         * @param url
         */

    }, {
        key: 'toLink',
        value: function toLink(url) {
            var pattern = /^((http|https):\/\/)/;
            if (!pattern.test(url)) {
                url = "http://" + url;
            }

            return url;
        }

        /**
         * Method to sanitize html by xss attack
         *
         * @param html
         * @returns {*}
         */

    }, {
        key: 'sanitize',
        value: function sanitize(html) {
            function trimAttributes(node) {
                _jquery2.default.each(node.attributes, function () {
                    var attrName = this.name;
                    var attrValue = this.value;
                    if (attrName.indexOf('on') === 0 || attrValue.indexOf('javascript:') === 0) {
                        (0, _jquery2.default)(node).removeAttr(attrName);
                    }
                });
            }

            var output = (0, _jquery2.default)(_jquery2.default.parseHTML('<div>' + html + '</div>', null, false));
            output.find('*').each(function () {
                trimAttributes(this);
            });

            return output.html();
        }

        /**
         * Method to strip all html tags
         *
         * @param html
         */

    }, {
        key: 'stripHtml',
        value: function stripHtml(html) {
            return html.replace(/(<([^>]+)>)/ig, "");
        }

        /**
         * Method to check browser is Firefox
         *
         * @returns {boolean}
         */

    }, {
        key: 'isFirefox',
        value: function isFirefox() {
            return (/Firefox/.test(navigator.userAgent)
            );
        }

        /**
         * Method to check browser is IE
         *
         * @returns {boolean}
         */

    }, {
        key: 'isIe',
        value: function isIe() {
            return (/.NET CLR/.test(navigator.userAgent)
            );
        }

        /**
         * Method to check browser is Safari
         *
         * @returns {boolean}
         */

    }, {
        key: 'isSafari',
        value: function isSafari() {
            return (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)
            );
        }
    }]);

    return Utils;
}();

exports.default = Utils;
;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(3);
var core = __webpack_require__(7);
var ctx = __webpack_require__(16);
var hide = __webpack_require__(8);
var PROTOTYPE = 'prototype';

var $export = function $export(type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? function (C) {
      var F = function F(a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0:
              return new C();
            case 1:
              return new C(a);
            case 2:
              return new C(a, b);
          }return new C(a, b, c);
        }return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
      // make static versions for prototype methods
    }(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1; // forced
$export.G = 2; // global
$export.S = 4; // static
$export.P = 8; // proto
$export.B = 16; // bind
$export.W = 32; // wrap
$export.U = 64; // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// optional / simple context binding
var aFunction = __webpack_require__(17);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1:
      return function (a) {
        return fn.call(that, a);
      };
    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };
    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }
  return function () /* ...args */{
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(6);
var IE8_DOM_DEFINE = __webpack_require__(83);
var toPrimitive = __webpack_require__(84);
var dP = Object.defineProperty;

exports.f = __webpack_require__(11) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) {/* empty */}
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bloks = __webpack_require__(22);

var _bloks2 = _interopRequireDefault(_bloks);

var _saturation = __webpack_require__(23);

var _saturation2 = _interopRequireDefault(_saturation);

var _hue = __webpack_require__(26);

var _hue2 = _interopRequireDefault(_hue);

var _alpha = __webpack_require__(29);

var _alpha2 = _interopRequireDefault(_alpha);

var _color = __webpack_require__(32);

var _color2 = _interopRequireDefault(_color);

var _checkboard = __webpack_require__(9);

var _checkboard2 = _interopRequireDefault(_checkboard);

var _addStyles = __webpack_require__(5);

var _addStyles2 = _interopRequireDefault(_addStyles);

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULTS = {
    color: '#8D2D2D',
    hue: true,
    alpha: true,
    preview: true
};

var ColorPicker = function () {
    function ColorPicker(el, opts) {
        _classCallCheck(this, ColorPicker);

        this.container = (typeof el === 'undefined' ? 'undefined' : _typeof(el)) === 'object' ? el : document.querySelector(el);
        this.settings = _underscore2.default.defaults(opts, DEFAULTS);
        this.color = _color2.default.toObject(this.settings.color, 0);

        this.render();
        this.handleColorChange();
    }

    _createClass(ColorPicker, [{
        key: 'setColor',
        value: function setColor(value) {
            this.color = _color2.default.toObject(value);
            this.triggerColorChange();
        }
    }, {
        key: 'getColor',
        value: function getColor() {
            return this.color;
        }
    }, {
        key: 'handleChange',
        value: function handleChange(data) {
            var isValidColor = _color2.default.simpleCheckForValidColor(data);
            if (isValidColor) {
                this.color = _color2.default.toObject(data, data.h || this.color.oldHue);
                this.triggerColorChange();
            }
        }
    }, {
        key: 'handleHexChange',
        value: function handleHexChange(e) {
            var hex = this.container.querySelector('.colorpicker__editable-input__input[name=hex]').value;

            if (hex.length > 5 && _color2.default.isValidHex(hex)) {
                e.preventDefault();
                this.color = _color2.default.toObject({
                    hex: hex,
                    source: 'input'
                });
                this.triggerColorChange();
            }
        }
    }, {
        key: 'triggerColorChange',
        value: function triggerColorChange() {
            var event = document.createEvent('CustomEvent');
            event.initCustomEvent('color-change', true, true, { color: this.color });
            this.container.dispatchEvent(event);
        }
    }, {
        key: 'render',
        value: function render() {
            this.container.innerHTML = _bloks2.default;

            if (!this.settings.preview) {
                this.container.querySelector('.colorpicker__bloks').removeChild(this.container.querySelector('.colorpicker__bloks__field'));
            }

            if (this.settings.preview) {
                (0, _addStyles2.default)(this.container.querySelector('.colorpicker__bloks__color-wrap'), {
                    background: 'url(' + _checkboard2.default.get('#fff', '#e6e6e6', 8.5) + ') center left'
                });
            }
            new _saturation2.default(this.container.querySelector('.colorpicker__bloks__saturation-wrap'), this);
            if (this.settings.hue) {
                new _hue2.default(this.container.querySelector('.colorpicker__bloks__hue-wrap'), this);
            }

            if (this.settings.alpha) {
                new _alpha2.default(this.container.querySelector('.colorpicker__bloks__alpha-wrap'), this);
            }

            if (this.settings.preview) {
                this.container.querySelector('.colorpicker__editable-input__input[name=hex]').addEventListener('keyup', this.handleHexChange.bind(this));
            }

            this.container.addEventListener('color-change', this.handleColorChange.bind(this));
        }
    }, {
        key: 'handleColorChange',
        value: function handleColorChange() {
            if (this.settings.preview) {
                (0, _addStyles2.default)(this.container.querySelector('.colorpicker__bloks__active-color'), {
                    background: this.active
                });

                this.container.querySelector('.colorpicker__editable-input__input[name=hex]').value = this.color.hex;
            }
        }
    }, {
        key: 'active',
        get: function get() {
            var rgba = this.color.rgb;
            return 'rgba(' + rgba.r + ', ' + rgba.g + ', ' + rgba.b + ', ' + rgba.a + ')';
        }
    }]);

    return ColorPicker;
}();

ColorPicker.VERSION = '1.0.0';

exports.default = ColorPicker;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = "<div class=colorpicker__bloks> <div class=colorpicker__bloks__saturation-wrap></div> <div class=colorpicker__bloks__controls> <div class=colorpicker__bloks__sliders> <div class=colorpicker__bloks__alpha-wrap></div> <div class=colorpicker__bloks__hue-wrap></div> </div> </div> <div class=colorpicker__bloks-clearfix></div> <div class=colorpicker__bloks__field> <div class=colorpicker__bloks__color-wrap> <div class=colorpicker__bloks__active-color></div> </div> <div class=colorpicker__editable-input> <span class=colorpicker__editable-input__label>Hex</span> <input class=colorpicker__editable-input__input name=hex /> </div> </div> <div class=colorpicker__bloks__presets></div> </div>";

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import throttle from 'lodash/throttle';


var _saturation = __webpack_require__(24);

var _saturation2 = _interopRequireDefault(_saturation);

var _saturation3 = __webpack_require__(25);

var saturation = _interopRequireWildcard(_saturation3);

var _addStyles = __webpack_require__(5);

var _addStyles2 = _interopRequireDefault(_addStyles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Saturation = function () {
    function Saturation(el, picker) {
        _classCallCheck(this, Saturation);

        this.container = el;
        this.parent = picker;
        this.handleChange = this.handleChange.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);

        this.render();
        this.handleColorChange();

        // this.throttle = throttle((fn, data, e) => {
        //     fn(data, e)
        // }, 50);
    }

    _createClass(Saturation, [{
        key: 'handleChange',
        value: function handleChange(e, skip) {
            // this.parent.handleChange && this.throttle(
            //     this.parent.handleChange,
            //     saturation.calculateChange(e, skip, this.parent.color, this.container),
            //     e
            // );

            var change = saturation.calculateChange(e, skip, this.parent.color, this.container);
            change && this.parent.handleChange(change);
        }
    }, {
        key: 'handleMouseDown',
        value: function handleMouseDown(e) {
            this.handleChange(e, true);
            window.addEventListener('mousemove', this.handleChange);
            window.addEventListener('mouseup', this.handleMouseUp);
        }
    }, {
        key: 'handleMouseUp',
        value: function handleMouseUp() {
            this.unbindEventListeners();
        }
    }, {
        key: 'unbindEventListeners',
        value: function unbindEventListeners() {
            window.removeEventListener('mousemove', this.handleChange);
            window.removeEventListener('mouseup', this.handleMouseUp);
        }
    }, {
        key: 'render',
        value: function render() {
            this.container.innerHTML = _saturation2.default;
            this.container.querySelector('.colorpicker__saturation').addEventListener('mousedown', this.handleMouseDown);
            this.container.querySelector('.colorpicker__saturation').addEventListener('touchmove touchstart', this.handleChange);
            this.parent.container.addEventListener('color-change', this.handleColorChange.bind(this));
        }
    }, {
        key: 'handleColorChange',
        value: function handleColorChange() {
            (0, _addStyles2.default)(this.container.querySelector('.colorpicker__saturation'), {
                background: this.bg
            });

            (0, _addStyles2.default)(this.container.querySelector('.colorpicker__saturation--pointer'), {
                top: this.pointer.top,
                left: this.pointer.left
            });
        }
    }, {
        key: 'bg',
        get: function get() {
            return 'hsl(' + this.parent.color.hsl.h + ', 100%, 50%)';
        }
    }, {
        key: 'pointer',
        get: function get() {
            return {
                top: -(this.parent.color.hsv.v * 100) + 100 + '%',
                left: this.parent.color.hsv.s * 100 + '%'
            };
        }
    }]);

    return Saturation;
}();

exports.default = Saturation;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = "<div class=colorpicker__saturation> <div class=colorpicker__saturation--white></div> <div class=colorpicker__saturation--black></div> <div class=colorpicker__saturation--pointer> <div class=colorpicker__saturation--circle></div> </div> </div>";

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.calculateChange = calculateChange;
function calculateChange(e, skip, props, container) {
    !skip && e.preventDefault();
    var containerWidth = container.clientWidth;
    var containerHeight = container.clientHeight;
    var x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;
    var y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY;
    var left = x - (container.getBoundingClientRect().left + window.pageXOffset);
    var top = y - (container.getBoundingClientRect().top + window.pageYOffset);

    if (left < 0) {
        left = 0;
    } else if (left > containerWidth) {
        left = containerWidth;
    } else if (top < 0) {
        top = 0;
    } else if (top > containerHeight) {
        top = containerHeight;
    }

    var saturation = left * 100 / containerWidth;
    var bright = -(top * 100 / containerHeight) + 100;

    return {
        h: props.hsl.h,
        s: saturation,
        v: bright,
        a: props.hsl.a,
        source: 'saturation'
    };
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hue = __webpack_require__(27);

var _hue2 = _interopRequireDefault(_hue);

var _hue3 = __webpack_require__(28);

var hue = _interopRequireWildcard(_hue3);

var _addStyles = __webpack_require__(5);

var _addStyles2 = _interopRequireDefault(_addStyles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Control = function () {
    function Control(el, picker) {
        _classCallCheck(this, Control);

        this.container = el;
        this.parent = picker;
        this.handleChange = this.handleChange.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);

        this.render();
        this.handleColorChange();
    }

    _createClass(Control, [{
        key: 'handleChange',
        value: function handleChange(e, skip) {
            var change = hue.calculateChange(e, skip, this.parent.color, this.container);
            change && this.parent.handleChange(change);
        }
    }, {
        key: 'handleMouseDown',
        value: function handleMouseDown(e) {
            this.handleChange(e, true);
            window.addEventListener('mousemove', this.handleChange);
            window.addEventListener('mouseup', this.handleMouseUp);
        }
    }, {
        key: 'handleMouseUp',
        value: function handleMouseUp() {
            this.unbindEventListeners();
        }
    }, {
        key: 'unbindEventListeners',
        value: function unbindEventListeners() {
            window.removeEventListener('mousemove', this.handleChange);
            window.removeEventListener('mouseup', this.handleMouseUp);
        }
    }, {
        key: 'render',
        value: function render() {
            this.container.innerHTML = _hue2.default;
            this.container.querySelector('.colorpicker__c-hue__container').addEventListener('mousedown', this.handleMouseDown);
            this.parent.container.addEventListener('color-change', this.handleColorChange.bind(this));
        }
    }, {
        key: 'handleColorChange',
        value: function handleColorChange() {
            (0, _addStyles2.default)(this.container.querySelector('.colorpicker__c-hue__pointer'), {
                top: this.pointer.top,
                left: this.pointer.left
            });
        }
    }, {
        key: 'pointer',
        get: function get() {
            return {
                top: '' + (-(this.parent.color.hsl.h * 100 / 360) + 100 + '%'),
                left: 0
            };
        }
    }]);

    return Control;
}();

exports.default = Control;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = "<div class=colorpicker__c-hue> <div class=colorpicker__c-hue__container> <div class=colorpicker__c-hue__pointer> <div class=colorpicker__c-hue__picker></div> </div> </div> </div>";

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.calculateChange = calculateChange;
function calculateChange(e, skip, props, container) {
    !skip && e.preventDefault();
    var containerHeight = container.clientHeight;
    var y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY;
    var top = y - (container.getBoundingClientRect().top + window.pageYOffset);

    var h = void 0;
    var percent = void 0;

    if (top < 0) {
        h = 359;
    } else if (top > containerHeight) {
        h = 0;
    } else {
        percent = -(top * 100 / containerHeight) + 100;
        h = 360 * percent / 100;
    }

    if (props.hsl.h !== h) {
        return {
            h: h,
            s: props.hsl.s,
            l: props.hsl.l,
            a: props.hsl.a,
            source: 'hue'
        };
    }

    return null;
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alpha = __webpack_require__(30);

var _alpha2 = _interopRequireDefault(_alpha);

var _checkboard = __webpack_require__(9);

var _checkboard2 = _interopRequireDefault(_checkboard);

var _alpha3 = __webpack_require__(31);

var alpha = _interopRequireWildcard(_alpha3);

var _addStyles = __webpack_require__(5);

var _addStyles2 = _interopRequireDefault(_addStyles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Alpha = function () {
    function Alpha(el, picker) {
        _classCallCheck(this, Alpha);

        this.container = el;
        this.parent = picker;
        this.handleChange = this.handleChange.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);

        this.render();
        this.handleColorChange();
    }

    _createClass(Alpha, [{
        key: 'handleChange',
        value: function handleChange(e, skip) {
            var change = alpha.calculateChange(e, skip, this.parent.color, this.container);
            change && this.parent.handleChange(change);
        }
    }, {
        key: 'handleMouseDown',
        value: function handleMouseDown(e) {
            this.handleChange(e, true);
            window.addEventListener('mousemove', this.handleChange);
            window.addEventListener('mouseup', this.handleMouseUp);
        }
    }, {
        key: 'handleMouseUp',
        value: function handleMouseUp() {
            this.unbindEventListeners();
        }
    }, {
        key: 'unbindEventListeners',
        value: function unbindEventListeners() {
            window.removeEventListener('mousemove', this.handleChange);
            window.removeEventListener('mouseup', this.handleMouseUp);
        }
    }, {
        key: 'render',
        value: function render() {
            this.container.innerHTML = _alpha2.default;
            (0, _addStyles2.default)(this.container.querySelector('.colorpicker__c-checkerboard'), {
                background: 'url(' + _checkboard2.default.get('#fff', '#6b6b6b', 7.5) + ') center left'
            });
            this.container.querySelector('.colorpicker__c-alpha__container').addEventListener('mousedown', this.handleMouseDown);
            this.parent.container.addEventListener('color-change', this.handleColorChange.bind(this));
        }
    }, {
        key: 'handleColorChange',
        value: function handleColorChange() {
            (0, _addStyles2.default)(this.container.querySelector('.colorpicker__c-alpha__gradient'), {
                background: this.gradient
            });

            (0, _addStyles2.default)(this.container.querySelector('.colorpicker__c-alpha__pointer'), {
                top: this.pointer.top,
                left: this.pointer.left
            });
        }
    }, {
        key: 'gradient',
        get: function get() {
            var rgb = this.parent.color.rgb;
            return 'linear-gradient(to top, rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ', 0) 0%, rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ', 1) 100%)';
        }
    }, {
        key: 'pointer',
        get: function get() {
            return {
                top: 100 - this.parent.color.rgb.a * 100 + '%',
                left: 0
            };
        }
    }]);

    return Alpha;
}();

exports.default = Alpha;

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = "<div class=colorpicker__c-alpha> <div class=colorpicker__c-alpha__checkboard-wrap> <div class=colorpicker__c-checkerboard></div> </div> <div class=colorpicker__c-alpha__gradient></div> <div class=colorpicker__c-alpha__container> <div class=colorpicker__c-alpha__pointer> <div class=colorpicker__c-alpha__picker></div> </div> </div> </div>";

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.calculateChange = calculateChange;
function calculateChange(e, skip, props, container) {
    !skip && e.preventDefault();
    var containerHeight = container.clientHeight;
    var y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY;
    var top = y - (container.getBoundingClientRect().top + window.pageYOffset);

    var a = void 0;
    if (top < 0) {
        a = 1;
    } else if (top > containerHeight) {
        a = 0;
    } else {
        a = 1 - Math.round(top * 100 / containerHeight) / 100;
    }

    if (props.hsl.a !== a) {
        return {
            h: props.hsl.h,
            s: props.hsl.s,
            l: props.hsl.l,
            a: a,
            source: 'alpha'
        };
    }

    return null;
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import tinycolor from 'tinycolor';

exports.default = {
    simpleCheckForValidColor: function simpleCheckForValidColor(data) {
        var keysToCheck = ['r', 'g', 'b', 'a', 'h', 's', 'a', 'v'];
        var checked = 0;
        var passed = 0;
        _underscore2.default.each(keysToCheck, function (letter) {
            if (data[letter]) {
                checked += 1;
                if (!isNaN(data[letter])) {
                    passed += 1;
                }
            }
        });

        return checked === passed ? data : false;
    },
    toObject: function toObject(data, oldHue) {
        var color = data.hex ? tinycolor(data.hex) : tinycolor(data);
        var hsl = color.toHsl();
        var hsv = color.toHsv();
        var rgb = color.toRgb();
        var hex = color.toHex();
        if (hsl.s === 0) {
            hsl.h = oldHue || 0;
            hsv.h = oldHue || 0;
        }
        var transparent = hex === '000000' && rgb.a === 0;

        return {
            hsl: hsl,
            hex: transparent ? 'transparent' : '#' + hex,
            rgb: rgb,
            hsv: hsv,
            oldHue: data.h || oldHue || hsl.h,
            source: data.source
        };
    },
    isValidHex: function isValidHex(hex) {
        return tinycolor(hex).isValid();
    }
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(10);
var document = __webpack_require__(3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(91);
var defined = __webpack_require__(34);
module.exports = function (it) {
  return IObject(defined(it));
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var shared = __webpack_require__(48)('keys');
var uid = __webpack_require__(49);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var def = __webpack_require__(18).f;
var has = __webpack_require__(19);
var TAG = __webpack_require__(4)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)

var aFunction = __webpack_require__(17);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _codemirror = __webpack_require__(41);

var _codemirror2 = _interopRequireDefault(_codemirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CodeMirror = function (_Core) {
    _inherits(CodeMirror, _Core);

    function CodeMirror() {
        _classCallCheck(this, CodeMirror);

        return _possibleConstructorReturn(this, (CodeMirror.__proto__ || Object.getPrototypeOf(CodeMirror)).apply(this, arguments));
    }

    return CodeMirror;
}(_codemirror2.default);

CodeMirror.fromTextArea = function (textarea, options) {
    options.lineNumbers = true;
    options.extraKeys = { "Ctrl-Space": "autocomplete" };
    var editor = _codemirror2.default.fromTextArea(textarea, options);

    editor.on('change', editor.save);

    editor.on("inputRead", function (instance) {
        if (instance.state.completionActive) {
            return;
        }

        var cur = instance.getCursor();
        var token = instance.getTokenAt(cur);
        var string = '';
        if (token.string.match(/^[.`\w@]\w*$/)) {
            string = token.string;
        }
        if (string.length > 0) {
            _codemirror2.default.commands.autocomplete(instance);
        }
    });

    return editor;
};

exports.default = CodeMirror;

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = CodeMirror;

/***/ }),
/* 42 */,
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LIBRARY = __webpack_require__(44);
var $export = __webpack_require__(15);
var redefine = __webpack_require__(85);
var hide = __webpack_require__(8);
var has = __webpack_require__(19);
var Iterators = __webpack_require__(12);
var $iterCreate = __webpack_require__(86);
var setToStringTag = __webpack_require__(38);
var getPrototypeOf = __webpack_require__(94);
var ITERATOR = __webpack_require__(4)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function returnThis() {
  return this;
};

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function getMethod(kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS:
        return function keys() {
          return new Constructor(this, kind);
        };
      case VALUES:
        return function values() {
          return new Constructor(this, kind);
        };
    }return function entries() {
      return new Constructor(this, kind);
    };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() {
      return $native.call(this);
    };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = true;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.1.15 ToLength
var toInteger = __webpack_require__(33);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// IE 8- don't enum bug keys
module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var document = __webpack_require__(3).document;
module.exports = document && document.documentElement;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(20);
var TAG = __webpack_require__(4)('toStringTag');
// ES3 wrong here
var ARG = cof(function () {
  return arguments;
}()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (e) {/* empty */}
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
  // @@toStringTag case
  : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
  // builtinTag case
  : ARG ? cof(O)
  // ES3 arguments fallback
  : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(6);
var aFunction = __webpack_require__(17);
var SPECIES = __webpack_require__(4)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ctx = __webpack_require__(16);
var invoke = __webpack_require__(106);
var html = __webpack_require__(51);
var cel = __webpack_require__(35);
var global = __webpack_require__(3);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function run() {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function listener(event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) {
      args.push(arguments[i++]);
    }queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(20)(process) == 'process') {
    defer = function defer(id) {
      process.nextTick(ctx(run, id, 1));
    };
    // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function defer(id) {
      Dispatch.now(ctx(run, id, 1));
    };
    // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function defer(id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
    // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function defer(id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
    // Rest old browsers
  } else {
    defer = function defer(id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(6);
var isObject = __webpack_require__(10);
var newPromiseCapability = __webpack_require__(39);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

var _utils = __webpack_require__(14);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    ready: function ready() {
        this.getSampleLink();
        (0, _jquery2.default)(this.$el).closest('html').addClass('builder-page');
        Bloks.Common.canSave = this.$children.length > 0;
    },

    methods: {
        appendComponent: function appendComponent(component) {
            (0, _jquery2.default)(this.$el).append(component);
            this.scrollTo(component);
            this.compile();
        },
        importPreset: function importPreset(content) {
            (0, _jquery2.default)(this.$el).html(content);
            this.compile();
        },
        scrollTo: function scrollTo(element) {
            Bloks.Iframe.win.jQuery('html,body').animate({
                scrollTop: element.offset().top
            }, 400);
        },
        changeChildPosition: function changeChildPosition(uidFrom, uidTo) {
            var from = false,
                to = false;

            _underscore2.default.each(this.$children, function (val, index) {
                if (val._uid == uidFrom) from = index;

                if (val._uid == uidTo) to = index;
            });

            if (from !== false && to !== false) {
                var tmp = this.$children[from];
                this.$children[from] = this.$children[to];
                this.$children[to] = tmp;
            }
        },
        compile: function compile() {
            this.$compile(this.$el);
        },
        getSampleLink: function getSampleLink(onChange) {
            var _this = this;

            onChange = onChange == 'undefined' ? false : onChange;

            var data = {
                action: 'bloks-get-sample-link',
                page_id: Bloks.Settings.page_id
            };

            if (onChange) {
                data.new_title = (0, _jquery2.default)('#bloks__app input[name="page-title"]').val();
                data.new_slug = Bloks.Common.slug;
            }

            _jquery2.default.ajax(Bloks.Settings.ajax, {
                method: "POST",
                dataType: 'JSON',
                data: data
            }).done(function (response) {
                if (!response.error) {
                    Bloks.Common.slug = response['link'][1];
                } else {
                    Bloks.Common.message = _this.prepareMessage(response.error_msg);
                }
            });
        },
        prepareMessage: function prepareMessage(message) {
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'error';

            return '<p class="' + type + '">' + message + '</p>';
        },

        save: function save(status) {
            var _this2 = this;

            Bloks.Common.loader = true;
            if (jQuery(this.$el).find('.form-invalid').length) {
                jQuery(this.$el).find('.form-invalid').focus();
                return false;
            }
            var builder = '';
            _underscore2.default.each(this.$children, function (component) {
                builder += component.toString();
            });
            builder = _utils2.default.minifyHtml(builder);

            var data = _underscore2.default.extend({
                page_id: Bloks.Settings.page_id,
                title: _utils2.default.htmlEncode((0, _jquery2.default)('#bloks__app input[name="page-title"]').val()),
                slug: Bloks.Common.slug,
                builder: builder,
                action: 'bloks-update-page',
                status: status ? status : '',
                wpnonce: Bloks.Settings.wpnonce
            }, (0, _jquery2.default)('#bloks__app #bloks-meta-form').serializeObject());

            this.$destroy(false, true);
            setTimeout(function () {
                data.content = _utils2.default.minifyHtml(_utils2.default.removeHtmlComments((0, _jquery2.default)(_this2.$el).html()));

                _jquery2.default.ajax(Bloks.Settings.ajax, {
                    method: "POST",
                    dataType: 'JSON',
                    data: data
                }).done(function (response) {
                    if (response) {
                        if (response.error) {
                            _this2.$children = [];
                            (0, _jquery2.default)(_this2.$el).html(builder);
                            _this2.compile();
                            Bloks.Common.message = _this2.prepareMessage(response.error_msg);
                            Bloks.Common.loader = false;
                            setTimeout(function () {
                                Bloks.Common.message = '';
                            }, 5000);
                        } else {
                            if (status !== 'save') {
                                window.location.href = response.redirect;
                            } else {
                                var iframe = (0, _jquery2.default)('.bloks__iframe')[0];
                                iframe.src = iframe.src;
                                (0, _jquery2.default)(iframe).on('load', function () {
                                    new Promise(function (resolve) {
                                        Bloks.Common.loader = false;
                                        resolve();
                                    }).then(function () {
                                        Bloks.Common.message = _this2.prepareMessage('Saved successfully!', 'success');
                                        setTimeout(function () {
                                            Bloks.Common.message = '';
                                        }, 5000);
                                    });
                                });
                            }
                        }
                    } else {
                        window.location.href = Bloks.Settings.login_url;
                    }
                });
            }, 1000);
        }
    }
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(59);


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

__webpack_require__(60);

__webpack_require__(13);

var _webfontloader = __webpack_require__(61);

var _webfontloader2 = _interopRequireDefault(_webfontloader);

__webpack_require__(62);

__webpack_require__(157);

__webpack_require__(168);

var _iframe = __webpack_require__(57);

var _iframe2 = _interopRequireDefault(_iframe);

var _common = __webpack_require__(171);

var _common2 = _interopRequireDefault(_common);

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Vue = _vue2.default;

window.Bloks = {
    VERSION: '1.0.0'
};

(0, _jquery2.default)(document).ready(function () {
    /** Load webfont **/
    _webfontloader2.default.load({
        custom: {
            families: ['Bloks']
        }
    });

    Bloks.Common = new _vue2.default(_common2.default).$mount('#bloks__app');
    // On iframe initialized
    (0, _jquery2.default)(Bloks.Common.$el).find('iframe').on('load', function () {
        var doc = this.contentDocument ? this.contentDocument : this.contentWindow.document;
        var win = this.contentWindow;

        // Unbind all redirect events in iframe
        win.jQuery('a').click(function (e) {
            e.preventDefault();
            return false;
        });

        win.jQuery('form').submit(function (e) {
            e.preventDefault();
            return false;
        });

        win.jQuery('.carousel').carousel({
            interval: false
        });

        Bloks.Iframe = new _vue2.default(_underscore2.default.extend(_iframe2.default, {
            data: {
                doc: doc,
                win: win
            }
        })).$mount(doc.getElementById('bloks-builder-content'));

        Bloks.Iframe.$broadcast('on_iframe_ready');

        // Hide loader when iframe ready
        setTimeout(function () {
            Bloks.Common.loader = false;
        }, 0);

        // preset & page placeholder
        if (Bloks.Iframe.win.jQuery('#bloks-builder-content').children().length === 0) {
            Bloks.Iframe.win.jQuery('#bloks-builder-content').addClass('active-placeholder');
            var placeholder = (0, _jquery2.default)('#bloks__canvas__page-placeholder').html();
            // let preset = $('#bloks__canvas__nav-templates').html();
            Bloks.Iframe.win.jQuery('#bloks-builder-content').append(placeholder);

            Bloks.Iframe.win.jQuery('#bloks-builder-content').find('.bloks__canvas__button-toggle').click(function () {
                Bloks.Common.canvas = true;
            });
            /*Bloks.Iframe.win.jQuery('#bloks-builder-content').find('.bloks__canvas__nav_preset-template').find('a').click( function(e) {
                Bloks.Common.importPreset(e);
            });*/
        }

        (0, _jquery2.default)(this).contents().find("body").one('click', function (e) {
            if (!(0, _jquery2.default)(e.target).closest("#bloks-builder-content").length && !(0, _jquery2.default)(e.target).closest(".media-modal").length && !(0, _jquery2.default)(e.target).hasClass('ibloks-remove')) {
                Bloks.Iframe.win.jQuery('.bloks__component__box').removeClass('active');
                Bloks.Iframe.win.jQuery('#bloks-builder-content').removeClass('has-component-active');
            }
        });

        (0, _jquery2.default)(document).click(function (e) {
            if (!(0, _jquery2.default)(e.target).closest(".bloks__modal").length && !(0, _jquery2.default)(e.target).hasClass('ibloks-cancel')) {
                Bloks.Iframe.win.jQuery('.bloks__component__box').removeClass('active');
                Bloks.Iframe.win.jQuery('#bloks-builder-content').removeClass('has-component-active');
            }
        });
    });
});

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _jquery2.default)(document).ready(function () {
    (0, _jquery2.default)(document).on('click', '.bloks__actions__dropdown-toggle', function () {
        (0, _jquery2.default)(this).next('.bloks__actions__dropdown__menu').toggle();
    });
    (0, _jquery2.default)(document).on('click', 'ul.bloks__actions__dropdown__menu li', function () {
        (0, _jquery2.default)(this).closest('.bloks__actions__dropdown__menu').toggle();
    });
    (0, _jquery2.default)(document).click(function (event) {
        if (!(0, _jquery2.default)(event.target).hasClass('bloks__actions__dropdown-toggle')) {
            (0, _jquery2.default)('.bloks__actions__dropdown__menu').hide();
        }
    });
    (0, _jquery2.default)(window).load(function () {
        var iframe = (0, _jquery2.default)('.bloks__iframe').contents();
        iframe.click(function () {
            (0, _jquery2.default)('.bloks__actions__dropdown__menu').hide();
        });
    });
});

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = WebFont;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(63);

__webpack_require__(129);

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

var _utils = __webpack_require__(14);

var _utils2 = _interopRequireDefault(_utils);

__webpack_require__(64);

__webpack_require__(67);

__webpack_require__(70);

__webpack_require__(76);

__webpack_require__(126);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.component('bloks', {
    props: {
        'tpl': {
            type: String
        }
    },
    data: function data() {
        var regEx = "<!--@(\\w+)\\s*[\\s\\S]*?([\\s\\S]*?)\\s*@-->";
        var data = new Object();
        var isEdit = false;
        var template = '';

        data.modal = false;

        /**
         * Default styles
         * @type {{paddingTop: number, paddingBottom: number, backgroundColor: string}}
         */
        data.styles = {
            "paddingTop": 0,
            "paddingLeft": 0,
            "paddingRight": 0,
            "paddingBottom": 0,
            "marginTop": 0,
            "marginLeft": 0,
            "marginRight": 0,
            "marginBottom": 0,
            "backgroundColor": "transparent",
            "backgroundImage": "",
            "backgroundRepeat": "no-repeat",
            "backgroundPosition": "center center",
            "backgroundAttachment": "initial",
            "classContainer": "container-fullwidth",
            "expand": 0
        };

        if (_underscore2.default.isUndefined(this.tpl)) {
            var clone = (0, _jquery2.default)(this.$options.template).clone();
            var tmp = (0, _jquery2.default)('<div/>').append(clone);
            template = tmp.html();
        } else {
            template = (0, _jquery2.default)(this.tpl).html();
        }

        var matches = template.match(new RegExp(regEx, "g"));

        if (!_underscore2.default.isNull(matches)) {
            _underscore2.default.each(matches, function (match) {
                var key = match.match(new RegExp(regEx))[1];
                var value = match.match(new RegExp(regEx))[2];
                if (key == 'vars') {
                    _underscore2.default.each(JSON.parse(value), function (val, index) {
                        if (data[index] == undefined) data[index] = val;else data[index] = _underscore2.default.extend(data[index], val);
                    });
                } else {
                    if (_utils2.default.isJson(value)) {
                        value = JSON.parse(value);
                    } else if (value === 'true') {
                        value = true;
                    } else if (value === 'false') {
                        value = false;
                    }

                    if (data[key] == undefined) data[key] = value;else {
                        if (_utils2.default.isJson(value)) data[key] = _underscore2.default.extend(data[key], value);else data[key] = value;

                        //data[key] = _.extend(data[key], value); ===> old
                    }
                }
            });
        }

        data.template = _utils2.default.removeHtmlComments(template);
        var colorset = data.colorset || 'bloks__colorset-light';
        data.colorset = colorset;

        return data;
    },
    created: function created() {
        if (!_underscore2.default.isUndefined(this.tpl)) {
            this.$options.template = this.tpl;
        }
    },
    events: {
        'on_iframe_ready': function on_iframe_ready() {}
    },
    computed: {
        id: function id() {
            return _underscore2.default.uniqueId('bloks_');
        }
    },
    ready: function ready() {
        var _this = this;

        var isEdit = false;
        var el = this.$el;

        if (this.$el.nodeName === '#text') {
            if (this.$el.nextElementSibling !== undefined) el = this.$el.nextElementSibling;else el = this.$el.nextSibling;
        }

        this.el = el;

        /**
         * Init color variables
         *
         * @type {string}
         */
        if (_underscore2.default.isUndefined(this.tpl)) isEdit = true;

        _underscore2.default.each(Bloks.Settings.colorsets, function (set, setKey) {
            if (set.class === _this.colorset && !isEdit) {
                if (_this.colorsets !== undefined && _this.colorsets[setKey] !== undefined) {
                    _underscore2.default.each(_this.colorsets[setKey], function (val, key) {
                        _this.$set(key, val);
                    });
                }
            }
        });
    },
    methods: {
        toString: function toString() {
            var string = '<' + this.$options.name + ' inline-template>';
            var data = '';
            _underscore2.default.each(this.$data, function (value, key) {
                if (key !== 'modal') {
                    if (_underscore2.default.isObject(value)) {
                        data += '<!--@' + key + ' ' + JSON.stringify(value) + ' @-->';
                    } else {
                        data += '<!--@' + key + ' ' + value + ' @-->';
                    }
                }
            }.bind(this));

            var clone = jQuery(this.template);
            clone.append(data);
            var tmp = jQuery('<div/>').append(clone);
            string += tmp.html();
            string += '</' + this.$options.name + '>';

            return string;
        },
        remove: function remove() {
            var _this2 = this;

            new Promise(function (resolve) {
                _this2.modal = false;
                resolve();
            }).then(function () {
                _this2.$emit('on_before_delete');
            }).then(function () {
                var el = (0, _jquery2.default)(_this2.el);
                _this2.$destroy();
                el.remove();
            }).then(function () {
                _this2.$emit('on_after_delete');
                Bloks.Common.canSave = Bloks.Iframe.$children.length > 0;

                if (!Bloks.Common.canSave) {

                    Bloks.Iframe.win.jQuery('#bloks-builder-content').addClass('active-placeholder');
                    var placeholder = (0, _jquery2.default)('#bloks__canvas__page-placeholder').html();
                    // let preset = $('#bloks__canvas__nav-templates').html();
                    Bloks.Iframe.win.jQuery('#bloks-builder-content').append(placeholder);

                    Bloks.Iframe.win.jQuery('#bloks-builder-content').find('.bloks__canvas__button-toggle').click(function () {
                        Bloks.Common.canvas = true;
                    });

                    /*Bloks.Iframe.win.jQuery('#bloks-builder-content').find('.bloks__canvas__nav_preset-template').find('a').click( function(e) {
                        Bloks.Common.importPreset(e);
                    });*/

                    Bloks.Iframe.win.jQuery('#bloks-builder-content').removeClass('has-component-active');
                }
            });
        }
    }
});

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(65)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] dev/web/js/builder/components/bloks/modal.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(66)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-20f00b04/modal.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _vue2.default.component('bloks-modal', {
    props: {
        show: {
            type: Boolean,
            default: false
        },
        backdrop: {
            type: [Boolean, String],
            default: true
        },
        classes: {
            type: String,
            default: ''
        }
    },
    watch: {
        show: function show(val) {
            if (val === true) {
                (0, _jquery2.default)(Bloks.Common.$el).closest('body').find('.bloks__form__form').find(".bloks-nice-scroll-form").niceScroll({
                    cursorwidth: "8px",
                    cursoropacitymin: 0.4,
                    cursorcolor: '#FC9553',
                    cursorborder: 'none',
                    cursorborderradius: 3,
                    autohidemode: 'scroll',
                    background: '#c7c7c7'
                });
            }
        }
    },
    ready: function ready() {
        this.$appendTo('body');
    }
});

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"bloks__modal\" v-bind:class=\"classes\" v-show=\"show\">\n    <div class=\"bloks__modal-backdrop\" v-if=\"backdrop !== false\" @click=\"show = (backdrop === 'static')\"></div>\n    <div class=\"bloks__modal-content\" v-show=\"show\">\n        <div class=\"bloks__modal-header\">\n            <a type=\"button\" href=\"javascript:void(0)\" @click=\"show = false\">\n                <span class=\"ibloks-cancel\"></span>\n            </a>\n            <h4 class=\"bloks__modal-title\" slot=\"title\"><slot name=\"title\">Settings</slot></h4>\n        </div>\n        <div class=\"bloks__modal-body\">\n            <slot name=\"body\"></slot>\n        </div>\n        <div class=\"bloks__modal-footer\">\n            <slot name=\"footer\">\n                <button type=\"button\" class=\"bloks__modal-btn bloks__modal__btn-save\" @click=\"show = false\">Save</button>\n            </slot>\n        </div>\n    </div>\n</div>\n";

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(68)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] dev/web/js/builder/components/bloks/button.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(69)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-6f96fc31/button.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

__webpack_require__(13);

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _vue2.default.component('bloks-button', {
    data: function data() {
        return {
            modal: false
        };
    },
    props: {
        newtab: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            required: true,
            default: 'Button'
        },
        href: {
            type: String,
            required: true,
            default: '#'
        },
        align: {
            type: String,
            required: true,
            default: 'bloks__button-left'
        },
        size: {
            type: String,
            required: true,
            default: 'bloks__button-small'
        },
        background: {
            type: String,
            default: '#fc9553'
        },
        color: {
            type: String,
            default: '#fff'
        }
    },
    ready: function ready() {
        var _this = this;

        (0, _jquery2.default)(this.$el).find('.bloks__button').on('click', function (e) {
            e.preventDefault();
            _this.modal = true;
        });

        this.bgDefault = _underscore2.default.clone(this.background);
        this.textDefault = _underscore2.default.clone(this.color);
    },

    watch: {
        modal: function modal(val) {
            var _this2 = this;

            if (val === true) {
                var btnBgColor = (0, _jquery2.default)(this.$els.background);
                btnBgColor.colorpicker({
                    color: this.background === '' || this.background === undefined ? 'rgba(113,108,108,0.2)' : this.background,
                    alpha: false,
                    preview: false
                }).on('change', function (e, data) {
                    e.preventDefault();
                    if (data) _this2.background = data.hex;
                });

                var btnTextColor = (0, _jquery2.default)(this.$els.color);
                btnTextColor.colorpicker({
                    color: this.color === '' || this.color === undefined ? 'rgba(113,108,108,0.2)' : this.color,
                    alpha: false,
                    preview: false
                }).on('change', function (e, data) {
                    e.preventDefault();
                    if (data) _this2.color = data.hex;
                });

                var hideBgColor = (0, _jquery2.default)(Bloks.Common.$el).closest('body').find('.bloks__modal-content');
                hideBgColor.mousedown(function (e) {
                    var containerPicker = hideBgColor.find('.colorpicker__bloks');
                    var containerColorCode = hideBgColor.find('.btn-code');

                    if (!containerPicker.is(e.target) && containerPicker.has(e.target).length === 0 && !containerColorCode.is(e.target) && containerColorCode.has(e.target).length === 0) {
                        hideBgColor.find('.preview-button-color').hide();
                    }

                    var containerColorCodeText = hideBgColor.find('.text-code');

                    if (!containerPicker.is(e.target) && containerPicker.has(e.target).length === 0 && !containerColorCodeText.is(e.target) && containerColorCodeText.has(e.target).length === 0) {
                        hideBgColor.find('.preview-text-color').hide();
                    }
                });
            }
        }
    },
    methods: {
        keyupButtonInput: function keyupButtonInput() {
            if (this.background.length == 6 && this.background.indexOf('#') == -1) {
                this.background = '#' + this.background;
            }
        },
        keyupTextInput: function keyupTextInput() {
            if (this.color.length == 6 && this.color.indexOf('#') == -1) {
                this.color = '#' + this.color;
            }
        },
        blurButtonInput: function blurButtonInput() {
            var str = this.background;
            if (typeof str == 'undefined' || !str || str.length === 0 || str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || str.replace(/\s/g, "") === "") {
                this.background = this.bgDefault;
            } else {
                var isOk = /^#(?:[A-Fa-f0-9]{6}){1,2}$/gm.test(this.background);
                if (isOk) (0, _jquery2.default)(Bloks.Common.$el).closest('body').find('.bloks__modal-button-settings').find('.preview-button-color').colorpicker('setColor', this.background);
            }
        },
        blurTextInput: function blurTextInput() {
            var str = this.color;
            if (typeof str == 'undefined' || !str || str.length === 0 || str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || str.replace(/\s/g, "") === "") {
                this.color = this.textDefault;
            } else {
                var isOk = /^#(?:[A-Fa-f0-9]{6}){1,2}$/gm.test(this.color);
                if (isOk) (0, _jquery2.default)(Bloks.Common.$el).closest('body').find('.bloks__modal-button-settings').find('.preview-text-color').colorpicker('setColor', this.color);
            }
        },
        bindBgColor: function bindBgColor() {
            var btnBgColor = (0, _jquery2.default)(Bloks.Common.$el).closest('body').find('.bloks__modal-button-settings').find('.preview-button-color');
            if (btnBgColor.css('display') == 'none') btnBgColor.show();
        },
        bindTextColor: function bindTextColor() {
            var btnBgColor = (0, _jquery2.default)(Bloks.Common.$el).closest('body').find('.bloks__modal-button-settings').find('.preview-text-color');
            if (btnBgColor.css('display') == 'none') btnBgColor.show();
        }
    }
});

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = "\n<div v-bind:class=\"align\" class=\"bloks__button-wrapper\">\n    <a v-bind:href=\"href\"\n       v-bind:class=\"[style, size]\"\n       v-bind:target=\"newtab ? '_blank' : newtab\"\n       class=\"bloks__button\"\n       v-bind:style=\"{ color: color, background: background }\">{{title}}\n        <span><i class=\"ibloks-pencil\" title=\"Btn Setting\" v-destroy></i></span>\n    </a>\n\n    <bloks-modal classes=\"bloks__modal-button-settings\" :show.sync=\"modal\">\n        <template slot=\"title\">Button Settings</template>\n        <div class=\"bloks__form\" slot=\"body\">\n            <div class=\"bloks__form-group\">\n                <label for=\"title\" class=\"bloks__form-label\">Label:</label>\n                <input type=\"text\" class=\"bloks__form-control\" id=\"title\" v-model=\"title\" placeholder=\"Label\"/>\n            </div>\n            <div class=\"bloks__form-group bloks__form-2cols\">\n                <div class=\"bloks__form-col bloks__form-col70\">\n                    <label for=\"href\" class=\"bloks__form-label\">Link:</label>\n                    <input type=\"text\" class=\"bloks__form-control\" id=\"href\" v-model=\"href\" placeholder=\"Link\"/>\n                </div>\n                <div class=\"bloks__form-col bloks__form-col30 bloks__form-newtab\">\n                    <label for=\"newtab\" class=\"bloks__form-label\">New Tab:</label>\n                    <label class=\"toggle-switcher\">\n                        <input type=\"checkbox\" id=\"newtab\" v-model=\"newtab\"/>\n                        <span class=\"slider round\"></span>\n                    </label>\n                </div>\n            </div>\n            <div class=\"bloks__form-group bloks__form-2cols\">\n                <div class=\"bloks__form-col\">\n                    <label for=\"align\" class=\"bloks__form-label\">Align:</label>\n                    <div class=\"bloks__selectbox\">\n                        <select class=\"bloks__form-control\" id=\"align\" v-model=\"align\">\n                            <option value=\"bloks__button-left\">Left</option>\n                            <option value=\"bloks__button-center\">Center</option>\n                            <option value=\"bloks__button-right\">Right</option>\n                        </select>\n                    </div>\n                </div>\n                <div class=\"bloks__form-col\">\n                    <label for=\"size\" class=\"bloks__form-label\">Size:</label>\n                    <div class=\"bloks__selectbox\">\n                        <select class=\"bloks__form-control\" id=\"size\" v-model=\"size\">\n                            <option value=\"bloks__button-small\">Small</option>\n                            <option value=\"bloks__button-medium\">Medium</option>\n                            <option value=\"bloks__button-large\">Large</option>\n                        </select>\n                    </div>\n                </div>\n            </div>\n            <div class=\"bloks__form-group bloks__form-2cols\">\n                <div class=\"bloks__form-col\">\n                    <label for=\"background\" class=\"bloks__form-label\">Background Color:</label>\n                    <div class=\"button-color\">\n                        <div v-on:click=\"bindBgColor\" class=\"button-color-code btn-code\" v-bind:style=\"{ background: background }\"></div>\n                        <input type=\"text\" class=\"bloks__form-control button-background\" id=\"background\" placeholder=\"Background Color\" maxlength=\"7\"\n                               name=\"bg-color\"\n                               v-model=\"background\"\n                               v-on:keyup=\"keyupButtonInput\"\n                               v-on:blur=\"blurButtonInput\"/>\n                    </div>\n                    <div v-el:background class=\"preview-button-color\" style=\"display: none;\"></div>\n                </div>\n                <div class=\"bloks__form-col\">\n                    <label for=\"size\" class=\"bloks__form-label\">Text Color:</label>\n                    <div class=\"button-color\">\n                        <div v-on:click=\"bindTextColor\" class=\"button-color-code text-code\" v-bind:style=\"{ background: color }\"></div>\n                        <input type=\"text\" class=\"bloks__form-control\" id=\"color\" placeholder=\"Text Color\" maxlength=\"7\"\n                               name=\"color\"\n                               v-model=\"color\"\n                               v-on:keyup=\"keyupTextInput\"\n                               v-on:blur=\"blurTextInput\" />\n                    </div>\n                    <div v-el:color class=\"preview-text-color\" style=\"display: none;\"></div>\n                </div>\n            </div>\n        </div>\n    </bloks-modal>\n</div>\n";

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(71)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] dev/web/js/builder/components/bloks/editor.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(75)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-05193e28/editor.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _utils = __webpack_require__(14);

var _utils2 = _interopRequireDefault(_utils);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

__webpack_require__(72);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BLOCK_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div'];

exports.default = _vue2.default.component('bloks-editor', {
    props: {
        content: {
            type: String,
            require: true,
            coerce: function coerce(val) {
                return _utils2.default.sanitize(val);
            }
        },
        placeholder: {
            type: String,
            default: 'Please enter your text here!'
        },
        defaultParagraph: {
            type: String,
            default: 'p'
        },
        maxlength: {
            type: Number,
            default: 0
        }
    },
    data: function data() {
        return {
            ranges: false,
            empty: false,
            focus: false
        };
    },
    ready: function ready() {
        var _this = this;

        var document = this.getDocument();
        (0, _jquery2.default)(this.$els.content).html(this.content);
        (0, _jquery2.default)(document.body).css('position', 'relative');
        (0, _jquery2.default)(document).on('selectionchange', function () {
            _this.$emit('on_selection_change');
        });
    },

    computed: {
        placeholderHTML: function placeholderHTML() {
            return '<' + this.defaultParagraph + '>' + this.placeholder + '</' + this.defaultParagraph + '>';
        }
    },
    methods: {
        getDocument: function getDocument() {
            return this.$el.ownerDocument || this.$el.document;
        },
        getWindow: function getWindow() {
            return this.getDocument().defaultView || this.getDocument().parentWindow;
        },
        getSelection: function getSelection() {
            var selection = {};

            if (this.getWindow().getSelection) {
                selection = this.getWindow().getSelection();
            } else {
                selection = this.getDocument().selection;
            }

            if (selection.focusNode !== null && selection.anchorNode !== null) {
                var end = selection.focusNode.nodeType === Node.TEXT_NODE ? selection.focusNode.parentNode : selection.focusNode;
                selection.node = (0, _jquery2.default)(end);
                selection.block = this.getBlockElement(selection.node);
                delete selection.nodes;
                delete selection.blocks;
                delete selection.multiple;

                if (selection.focusNode !== selection.anchorNode) {
                    var start = selection.anchorNode.nodeType === Node.TEXT_NODE ? selection.anchorNode.parentNode : selection.anchorNode;
                    selection.nodes = this.getElementsBetween(start, end);
                    selection.blocks = this.getBlockElement(selection.nodes);
                    selection.multiple = true;
                }

                if ((0, _jquery2.default)(this.$els.content).is(end)) {
                    selection.nodes = (0, _jquery2.default)(this.$els.content).children();
                    selection.blocks = selection.nodes;
                    selection.node = selection.nodes.last();
                    selection.block = selection.blocks.last();
                    selection.multiple = true;
                }
            }

            return selection;
        },
        saveSelection: function saveSelection() {
            var selection = this.getSelection();

            if (selection.getRangeAt && selection.rangeCount) {
                var ranges = [];
                for (var i = 0, len = selection.rangeCount; i < len; ++i) {
                    ranges.push(selection.getRangeAt(i));
                }

                this.ranges = ranges;
            } else if (selection.createRange) {
                this.ranges = selection.createRange();
            } else {
                this.ranges = false;
            }
        },
        restoreSelection: function restoreSelection() {
            var ranges = this.ranges;

            if (ranges) {
                var selection = this.getSelection();

                if (selection.getRangeAt) {
                    selection.removeAllRanges();
                    for (var i = 0, len = ranges.length; i < len; ++i) {
                        selection.addRange(ranges[i]);
                    }
                } else if (selection.createRange) {
                    ranges.select();
                }
            }
        },
        createSelectionFromPoint: function createSelectionFromPoint(startX, startY, endX, endY) {
            var doc = this.getDocument();
            var start = void 0,
                end = void 0,
                range = null;
            if (typeof doc.caretPositionFromPoint !== "undefined") {
                start = doc.caretPositionFromPoint(startX, startY);
                end = doc.caretPositionFromPoint(endX, endY);
                range = doc.createRange();
                range.setStart(start.offsetNode, start.offset);
                range.setEnd(end.offsetNode, end.offset);
            } else if (typeof doc.caretRangeFromPoint !== "undefined") {
                start = doc.caretRangeFromPoint(startX, startY);
                end = doc.caretRangeFromPoint(endX, endY);
                range = doc.createRange();
                range.setStart(start.startContainer, start.startOffset);
                range.setEnd(end.startContainer, end.startOffset);
            }

            if (range !== null && typeof this.getWindow().getSelection !== "undefined") {
                var sel = this.getWindow().getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (typeof doc.body.createTextRange !== "undefined") {
                range = doc.body.createTextRange();
                range.moveToPoint(startX, startY);
                var endRange = range.duplicate();
                endRange.moveToPoint(endX, endY);
                range.setEndPoint("EndToEnd", endRange);
                range.select();
            }
        },
        getBlockElement: function getBlockElement(el) {
            return (0, _jquery2.default)(el).closest(BLOCK_TAGS.join(','));
        },
        getElementsBetween: function getElementsBetween(start, end) {
            var elements = (0, _jquery2.default)(start).nextUntil(end).andSelf();
            elements.push(end);

            return elements;
        },
        insertTextAtCursor: function insertTextAtCursor(text) {
            var document = this.getDocument();
            window = this.getWindow();

            if (window.getSelection) {
                var selection = window.getSelection();
                if (selection.getRangeAt && selection.rangeCount) {
                    var range = selection.getRangeAt(0);
                    range.deleteContents();
                    range.insertNode(document.createTextNode(text));
                }
            } else if (document.selection && document.selection.createRange) {
                document.selection.createRange().text = text;
            }
        },
        onFocus: function onFocus() {
            this.$emit('on_focus');
            this.focus = true;
        },
        onBlur: function onBlur() {
            this.$emit('on_blur');
            this.focus = false;
            this.content = (0, _jquery2.default)(this.$els.content).html();
            this.empty = _utils2.default.stripHtml(this.content) === '';
        },
        onEnter: function onEnter() {
            this.getDocument().execCommand('insertParagraph', false);
            this.getDocument().execCommand('formatBlock', false, '<' + this.defaultParagraph + '>');
        },
        onDelete: function onDelete() {
            if (_utils2.default.stripHtml(this.content) === '') {
                this.getDocument().execCommand('formatBlock', false, '<' + this.defaultParagraph + '>');
            }
        },
        onPasteAndDrop: function onPasteAndDrop(e) {
            var window = this.getWindow();

            if (e.type === 'drop') this.createSelectionFromPoint(e.x, e.y, e.x, e.y);

            if (e.clipboardData && e.clipboardData.getData || e.dataTransfer && e.dataTransfer.getData) {
                var text = e.type === 'drop' ? e.dataTransfer.getData("text/plain") : e.clipboardData.getData("text/plain");
                this.getDocument().execCommand("insertHTML", false, text);
            } else if (window.clipboardData && window.clipboardData.getData) {
                var _text = window.clipboardData.getData("Text");
                this.insertTextAtCursor(_text);
            }
        }
    },
    events: {
        'on_change': function on_change() {
            this.content = (0, _jquery2.default)(this.$els.content).html();
        }
    },
    beforeDestroy: function beforeDestroy() {
        (0, _jquery2.default)(this.$els.content).contents().unwrap();
    }
});

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(73)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] dev/web/js/builder/components/bloks/editor/formatter.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(74)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-58f5c7e7/formatter.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

var _utils = __webpack_require__(14);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GET_COLOR_SOURCE = 'editor_get_color';
var TOOLBAR_MAX_HEIGHT = 320;

exports.default = _vue2.default.component('bloks-formatter', {
    data: function data() {
        return {
            left: 0,
            top: false,
            bottom: false,
            show: false,
            bold: false,
            italic: false,
            justified: false,
            heading: false,
            font: false,
            color: false,
            changeHeading: false,
            changeLink: false,
            changeColor: false,
            changeFont: false,
            link: '',
            newtab: false,
            position: 'top',
            fonts: {
                "Helvetica Neue": "'Helvetica Neue', Helvetica, Arial, sans-serif",
                "Open Sans": '"Open Sans", sans-serif',
                "Roboto": "'Roboto', sans-serif",
                "Lato": "'Lato', sans-serif",
                "Raleway": "'Raleway', sans-serif",
                "Lobster": "'Lobster', cursive",
                "Courgette": "'Courgette', cursive",
                "Fjalla One": "'Fjalla One', sans-serif"
            }
        };
    },
    watch: {
        show: function show(val) {
            if (val === false) {
                this.changeHeading = false;
                this.changeColor = false;
                this.changeFont = false;
                this.changeLink = false;
            }
        }
    },
    computed: {
        width: function width() {
            var el = this.$el;

            if (this.$el.nodeName === '#text') {
                if (this.$el.nextElementSibling !== undefined) el = this.$el.nextElementSibling;else el = this.$el.nextSibling;
            }

            return el.offsetWidth;
        },
        height: function height() {
            var el = this.$el;

            if (this.$el.nodeName === '#text') {
                if (this.$el.nextElementSibling !== undefined) el = this.$el.nextElementSibling;else el = this.$el.nextSibling;
            }

            return el.offsetHeight;
        },
        styles: function styles() {
            var styles = {
                left: this.left + 'px'
            };

            if (this.position === 'bottom') {
                styles.bottom = this.bottom + 'px';
            } else {
                styles.top = this.top + 'px';
            }

            return styles;
        }
    },
    methods: {
        reposition: function reposition() {
            var document = this.$parent.getDocument(),
                window = this.$parent.getWindow(),
                selection = this.$parent.getSelection();

            if (selection.rangeCount) {
                var range = selection.getRangeAt(0),
                    clientRects = range.getBoundingClientRect(),
                    screenHeight = window.innerHeight,
                    windowHeight = document.body.offsetHeight;

                var scrollTop = this.$parent.getWindow().pageYOffset || this.$parent.getDocument().documentElement.scrollTop;

                this.left = clientRects.left + clientRects.width / 2 - this.width / 2;
                this.top = clientRects.bottom + scrollTop;
                this.bottom = false;
                this.position = 'top';

                if (windowHeight > screenHeight && windowHeight - this.top <= TOOLBAR_MAX_HEIGHT) {
                    this.position = 'bottom';
                    this.bottom = windowHeight - clientRects.top - scrollTop;
                    this.top = false;
                }
            }
        },
        refreshState: function refreshState() {
            var document = this.$parent.getDocument(),
                selection = this.$parent.getSelection(),
                node = selection.node.prop('tagName') !== 'A' ? selection.node.closest('a') : selection.node,
                block = selection.block;

            this.bold = document.queryCommandState("bold");
            this.italic = document.queryCommandState("italic");
            this.justified = block.css('textAlign') === 'center';
            this.heading = block.prop("tagName").toLowerCase();
            this.font = block.css('fontFamily');
            this.link = node.attr('href') !== undefined ? node.attr('href') : '';
            this.newtab = node.attr('target') !== undefined;
            this.color = block.css('color');
            this.$root.win.jQuery(this.$els.colorpicker).colorpicker('setColor', { hex: this.color, source: GET_COLOR_SOURCE });

            this.$parent.$emit('on_change');
        },
        triggerHeadingPanel: function triggerHeadingPanel() {
            this.changeHeading = !this.changeHeading;
            this.changeLink = false;
            this.changeColor = false;
            this.changeFont = false;
        },
        triggerLinkPanel: function triggerLinkPanel() {
            this.$parent.saveSelection();
            this.changeHeading = false;
            this.changeLink = !this.changeLink;
            this.changeColor = false;
            this.changeFont = false;
        },
        triggerColorPanel: function triggerColorPanel() {
            this.$parent.saveSelection();
            this.changeHeading = false;
            this.changeLink = false;
            this.changeColor = !this.changeColor;
            this.changeFont = false;
        },
        triggerFontPanel: function triggerFontPanel() {
            this.changeHeading = false;
            this.changeLink = false;
            this.changeColor = false;
            this.changeFont = !this.changeFont;
        },
        execBold: function execBold() {
            this.changeHeading = false;
            this.changeLink = false;
            this.changeColor = false;
            this.changeFont = false;
            this.$parent.getDocument().execCommand('bold', false, null);
            this.bold = !this.bold;
            this.reposition();
        },
        execItalic: function execItalic() {
            this.changeHeading = false;
            this.changeLink = false;
            this.changeColor = false;
            this.changeFont = false;
            this.italic = !this.italic;
            this.$parent.getDocument().execCommand('italic', false, null);
            this.reposition();
        },
        execHeading: function execHeading(format) {
            this.$parent.getDocument().execCommand('formatBlock', false, '<' + format + '>');
            this.reposition();
        },
        execJustify: function execJustify() {
            var selection = this.$parent.getSelection(),
                block = selection.block,
                blocks = selection.multiple ? selection.blocks : false;

            if (!this.justified) {
                if (blocks) {
                    blocks.css({ 'text-align': 'center' });
                } else {
                    block.css({ 'text-align': 'center' });
                }
            } else {
                if (blocks) {
                    blocks.css({ 'text-align': '' });
                } else {
                    block.css({ 'text-align': '' });
                }
            }

            this.changeHeading = false;
            this.changeLink = false;
            this.changeColor = false;
            this.changeFont = false;
            this.justified = !this.justified;
            this.reposition();
        },
        execLink: function execLink() {
            this.$parent.restoreSelection();
            var document = this.$parent.getDocument();

            document.execCommand('UnLink', false, null);
            document.execCommand('CreateLink', false, this.link);

            if (this.newtab) {
                this.$parent.getSelection().node.attr('target', '_blank');
            }

            this.changeLink = false;
            this.reposition();
        },
        execFont: function execFont(font) {
            var selection = this.$parent.getSelection(),
                block = selection.block,
                blocks = selection.multiple ? selection.blocks : false;

            if (blocks) {
                blocks.css({ 'font-family': font });
            } else {
                block.css({ 'font-family': font });
            }

            this.font = font;
            this.$parent.saveSelection();
            this.$parent.restoreSelection();
            this.reposition();
        }
    },
    ready: function ready() {
        var _this = this;

        this.$parent.$on('on_selection_change', function () {
            var selection = _this.$parent.getSelection();

            if (selection.rangeCount) {
                var range = selection.getRangeAt(0);

                if ((0, _jquery2.default)(_this.$parent.$el).is(_this.$parent.getSelection().node) || (0, _jquery2.default)(_this.$parent.$el).has(_this.$parent.getSelection().node).length > 0) {
                    _this.show = (range.endOffset - range.startOffset !== 0 || range.startContainer !== range.endContainer) && _utils2.default.stripHtml(_this.$parent.content) !== '';

                    _this.reposition();

                    setTimeout(function () {
                        _this.refreshState();
                    }, 0);
                } else {
                    if (!(0, _jquery2.default)(_this.$el).is(_this.$parent.getSelection().node) && (0, _jquery2.default)(_this.$el).has(_this.$parent.getSelection().node).length === 0) {
                        _this.show = false;
                    }
                }
            }
        });

        this.$root.win.jQuery(this.$els.colorpicker).colorpicker({
            alpha: false
        }).on('change', function (e, data) {
            e.preventDefault();

            if (data && data.source !== GET_COLOR_SOURCE) {
                if (data.source === 'input') {
                    _this.$parent.restoreSelection();
                    _this.changeColor = false;
                }

                var selection = _this.$parent.getSelection(),
                    block = selection.block,
                    blocks = selection.multiple ? selection.blocks : false;

                _this.color = data.hex;
                if (blocks) {
                    blocks.css({ 'color': data.hex });
                } else {
                    block.css('color', data.hex);
                }

                if (_utils2.default.isSafari()) {
                    setTimeout(function () {
                        _this.$parent.restoreSelection();
                    }, 0);
                }

                _this.$parent.$emit('on_change');
            }
        });


        (0, _jquery2.default)(this.$el).find(".bloks__editor-format-panel").niceScroll({
            cursorwidth: 7,
            cursoropacitymin: 0.4,
            cursorcolor: '#aaaaaa',
            cursorborder: 'none',
            cursorborderradius: 3,
            autohidemode: 'leave',
            background: '#ebebeb'
        });

        this.$appendTo(this.$el.ownerDocument.body);
    }
});

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"bloks__popover bloks__popover-editor\"\n     v-destroy\n     v-bind:class=\"[position, { expanded: changeLink || changeColor || changeHeading || changeFont, active: show }]\"\n     v-bind:style=\"styles\"\n>\n    <div class=\"bloks__editor-formats\">\n        <!-- Bold -->\n        <button class=\"bloks__editor-format\" @click=\"execBold\">\n            <span class=\"bloks__editor-format-icon\" v-bind:class=\"{ active: bold }\">\n                <i class=\"ibloks-bold\"></i>\n            </span>\n        </button>\n        <!-- Italic -->\n        <button class=\"bloks__editor-format\" @click=\"execItalic\">\n            <span class=\"bloks__editor-format-icon italic\" v-bind:class=\"{ active: italic }\">\n                <i class=\"ibloks-italic\"></i>\n            </span>\n        </button>\n        <!-- Heading -->\n        <button class=\"bloks__editor-format\" @click=\"triggerHeadingPanel\">\n            <span class=\"bloks__editor-format-icon\" v-bind:class=\"{ active: changeHeading }\">\n                <i class=\"ibloks-heading\"></i>\n            </span>\n        </button>\n        <!-- Alignment -->\n        <button class=\"bloks__editor-format\" @click=\"execJustify\">\n            <span class=\"bloks__editor-format-icon\" v-bind:class=\"{ active: justified }\">\n                <i class=\"ibloks-align\"></i>\n            </span>\n        </button>\n        <!-- Link -->\n        <button class=\"bloks__editor-format\" @click=\"triggerLinkPanel\">\n            <span class=\"bloks__editor-format-icon\" v-bind:class=\"{ active: changeLink || link != '' }\">\n                <i class=\"ibloks-link-editor\"></i>\n            </span>\n        </button>\n        <!-- Color -->\n        <button class=\"bloks__editor-format\" @click=\"triggerColorPanel\">\n            <span class=\"bloks__editor-format-icon\" v-bind:class=\"{ active: changeColor }\">\n                <span class=\"bloks__editor-format-color\" v-bind:style=\"{ background: color }\" style=\"background: rgb(66, 66, 66);\"></span>\n            </span>\n        </button>\n        <!-- Fonts -->\n        <button class=\"bloks__editor-format\" @click=\"triggerFontPanel\">\n            <span class=\"bloks__editor-format-icon\" v-bind:class=\"{ active: changeFont }\">\n                <i class=\"ibloks-font\"></i>\n            </span>\n        </button>\n    </div>\n    <!-- Panel for selecting heading -->\n    <div class=\"bloks__editor-format-panel\" v-show=\"changeHeading\">\n        <ul class=\"bloks__editor-heading\">\n            <li class=\"bloks__editor-format-h1\"><a v-bind:class=\"{ selected: heading == 'h1' }\" href=\"javascript:void(0)\" @click=\"execHeading('h1')\">Heading 1</a></li>\n            <li class=\"bloks__editor-format-h2\"><a v-bind:class=\"{ selected: heading == 'h2' }\" href=\"javascript:void(0)\" @click=\"execHeading('h2')\">Heading 2</a></li>\n            <li class=\"bloks__editor-format-h3\"><a v-bind:class=\"{ selected: heading == 'h3' }\" href=\"javascript:void(0)\" @click=\"execHeading('h3')\">Heading 3</a></li>\n            <li class=\"bloks__editor-format-p\"><a v-bind:class=\"{ selected: heading == 'p' }\" href=\"javascript:void(0)\" @click=\"execHeading('p')\">Normal</a></li>\n        </ul>\n    </div>\n    <!-- Panel for link -->\n    <div class=\"bloks__editor-format-panel\" v-show=\"changeLink\">\n        <ul class=\"bloks__editor-newtab\">\n            <li>\n                <p class=\"title\">Url Actived Text</p>\n                <input type=\"text\" placeholder=\"Enter your link\" v-model=\"link\">\n                <button class=\"save-link\" @click=\"execLink\">Save</button>\n            </li>\n            <li class=\"link-newtab\">\n                <span class=\"title\">New Tab</span>\n                <label class=\"toggle-switcher\">\n                    <input type=\"checkbox\" v-model=\"newtab\">\n                    <span class=\"slider round\"></span>\n                </label>\n            </li>\n        </ul>\n    </div>\n    <!-- Panel for change color -->\n    <div class=\"bloks__editor-format-panel\" v-show=\"changeColor\">\n        <div v-el:colorpicker></div>\n    </div>\n    <!-- Panel for Fonts List -->\n    <div class=\"bloks__editor-format-panel\" v-show=\"changeFont\">\n        <ul class=\"bloks__editor-font\">\n            <li v-for=\"(title, value) in fonts\">\n                <a v-bind:style=\"{ fontFamily: value }\" v-bind:class=\"{ selected: font == value }\" href=\"javascript:void(0)\" @click=\"execFont(value)\">{{title}}</a>\n            </li>\n        </ul>\n    </div>\n</div>\n";

/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"bloks__editor\">\n    <div v-el:content\n         @focus=\"onFocus\"\n         @blur=\"onBlur\"\n         @keydown.enter.prevent=\"onEnter\"\n         @keyup.delete=\"onDelete\"\n         @paste.prevent=\"onPasteAndDrop($event)\"\n         @drop.prevent=\"onPasteAndDrop($event)\"\n         contenteditable=\"true\" spellcheck=\"false\"></div>\n    <div v-destroy v-if=\"empty && !focus\" class=\"bloks__editor-placeholder\" v-html=\"placeholderHTML\"></div>\n    <bloks-formatter></bloks-formatter>\n</div>\n";

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(77)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] dev/web/js/builder/components/bloks/media.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(125)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-24700796/media.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(78);

var _promise2 = _interopRequireDefault(_promise);

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

var _image = __webpack_require__(113);

var _image2 = _interopRequireDefault(_image);

var _video = __webpack_require__(116);

var _video2 = _interopRequireDefault(_video);

var _social = __webpack_require__(119);

var _social2 = _interopRequireDefault(_social);

var _background = __webpack_require__(122);

var _background2 = _interopRequireDefault(_background);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _vue2.default.component('bloks-media', {
    data: function data() {
        return {
            tools: false,
            media: false,
            enteredType: '',
            hrefSaveButton: false,
            hrefSaveSuccess: false,
            mediaSaveButton: false,
            mediaSaveSuccess: false,
            mediaUploader: false,
            dndUploader: false,
            dndWindow: (0, _jquery2.default)('<div class="bloks__dropzone"><div class="bloks__dropzone-content"><h3>Drop files to upload</h3></div></div>'),
            dndLoader: (0, _jquery2.default)('<div class="bloks__dnd-loader"></div>')
        };
    },
    props: {
        type: {
            type: String,
            default: 'image'
        },
        title: {
            type: String,
            default: 'Media'
        },
        backdrop: {
            type: String,
            default: 'transparent'
        },
        href: {
            type: String,
            default: ''
        },
        autoplay: {
            type: Boolean,
            default: false
        },
        newtab: {
            type: Boolean,
            default: false
        },
        src: {
            type: String,
            default: ''
        },
        settings: {
            type: Object,
            default: function _default() {
                return {};
            }
        },
        iscover: {
            type: Boolean,
            defautle: false
        },
        maxheight: {
            type: String,
            default: ''
        },
        maxwidth: {
            type: String,
            default: ''
        }
    },
    computed: {
        videoId: function videoId() {
            return this.type !== 'image' && this.type !== 'background' ? this.src : '';
        },
        controls: function controls() {
            if (this.settings.controls === undefined) return ['play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'fullscreen'];else if (this.settings.controls === false) return [];else return this.settings.controls;
        },
        volume: function volume() {
            if (this.settings.volume === undefined) return 5;else return this.settings.volume;
        },
        allowVideo: function allowVideo() {
            return this.settings.allow === undefined || _underscore2.default.indexOf(this.settings.allow, 'video') >= 0;
        },
        allowImage: function allowImage() {
            return this.settings.allow === undefined || _underscore2.default.indexOf(this.settings.allow, 'image') >= 0;
        },
        allowLink: function allowLink() {
            return this.settings.link === undefined || this.settings.link !== false;
        }
    },
    ready: function ready() {
        this.enteredType = this.type;
        this.updateType(this.type);

        var self = this;
        (0, _jquery2.default)(this.$el).find('.ibloks-link').on('click', function () {
            setTimeout(function () {
                (0, _jquery2.default)(self.$el).find('input[name="link"]').focus();
            }, 1);
        });

        (0, _jquery2.default)(this.$el).find('.ibloks-media').on('click', function () {
            setTimeout(function () {
                (0, _jquery2.default)(self.$el).find('input[name="id"]').focus();
            }, 1);
        });
    },

    watch: {
        'type': function type(val) {
            this.enteredType = val;
            this.updateType(val);
        },
        'title': function title(val) {
            this.media.$emit('on_update_media_title', val);
        },
        'src': function src(val) {
            this.media.$emit('on_update_media_src', val);
            if (this.type !== 'image') {
                this.updateType(this.type);
            }
            if (this.type == 'image' && this.iscover) {
                this.type = 'background';
            }
        },
        'href': function href(val) {
            this.media.$emit('on_update_media_href', val);
        },
        'backdrop': function backdrop(val) {
            this.media.$emit('on_update_media_backdrop', val);
            if (this.type !== 'image') {
                this.$root.win.jQuery(this.$el).find('.bloks__player').player('setBackdrop', val);
            }
        },
        'newtab': function newtab(val) {
            this.media.$emit('on_update_media_newtab', val);
        },
        'autoplay': function autoplay(val) {
            this.$root.win.jQuery(this.$el).find('.bloks__player').player('setAutoplay', val);
        },
        'maxheight': function maxheight(val) {
            this.media.$emit('on_update_media_max_height', val);
        },
        'maxwidth': function maxwidth(val) {
            this.media.$emit('on_update_media_max_width', val);
        }
    },
    methods: {
        updateType: function updateType(type) {

            switch (type) {
                case 'mp4':
                    this.media = new _vue2.default(_underscore2.default.extend(_video2.default, {
                        el: this.$els.content,
                        data: {
                            src: this.src,
                            backdrop: this.backdrop,
                            controls: this.controls,
                            volume: this.volume,
                            autoplay: this.autoplay
                        }
                    }));
                    this.bindPlayer();
                    break;
                case 'youtube':
                case 'vimeo':
                    this.media = new _vue2.default(_underscore2.default.extend(_social2.default, {
                        el: this.$els.content,
                        data: {
                            src: this.src,
                            type: this.type,
                            backdrop: this.backdrop,
                            controls: this.controls,
                            volume: this.volume,
                            autoplay: this.autoplay
                        }
                    }));
                    this.bindPlayer();
                    break;
                case 'background':
                    this.media = new _vue2.default(_underscore2.default.extend(_background2.default, {
                        el: this.$els.content,
                        data: {
                            src: this.src,
                            title: this.title,
                            backdrop: this.backdrop,
                            href: this.href,
                            newtab: this.newtab
                        }
                    }));
                    break;
                default:
                    this.media = new _vue2.default(_underscore2.default.extend(_image2.default, {
                        el: this.$els.content,
                        data: {
                            src: this.src,
                            title: this.title,
                            backdrop: this.backdrop,
                            href: this.href,
                            newtab: this.newtab,
                            maxheight: this.maxheight,
                            maxwidth: this.maxwidth
                        }
                    }));
            }

            this.bindDndUploader();
        },
        updateHref: function updateHref() {
            (0, _jquery2.default)(this.$el).find('.bloks__dropdown-content input[name="link"]').removeAttr('style');
            this.href = (0, _jquery2.default)(this.$el).find('.bloks__dropdown-content input[name="link"]').val();
            this.media.$emit('on_update_media_href', this.href);

            this.hrefSaveSuccess = true;
            this.hrefSaveButton = false;
            setTimeout(function () {
                this.hrefSaveSuccess = false;
                (0, _jquery2.default)(this.$el).find('.bloks__dropdown-content input[name="link"]').css('padding', '0 10px 0 10px');
            }.bind(this), 3000);
        },
        updateId: function updateId() {
            var id = (0, _jquery2.default)(this.$el).find('.bloks__dropdown-content input[name="id"]').val();
            if (!id || 0 === id.length) {
                return false;
            }

            var type = this.getTypeById(id);
            if (!type || type === 'errorId' || 0 === type.length) {
                if (this.type !== 'image') (0, _jquery2.default)(this.$el).find('.bloks__dropdown-content input[name="id"]').val(this.src);else (0, _jquery2.default)(this.$el).find('.bloks__dropdown-content input[name="id"]').val('');

                this.mediaSaveSuccess = true;
                this.mediaSaveButton = false;
                return false;
            }

            this.src = id;
            this.type = type;
            this.mediaSaveSuccess = true;
            this.mediaSaveButton = false;
            setTimeout(function () {
                this.mediaSaveSuccess = false;
                (0, _jquery2.default)(this.$el).find('.bloks__dropdown-content input[name="link"]').css('padding', '0 10px 0 10px');
            }.bind(this), 3000);
        },
        showBoxLink: function showBoxLink() {
            (0, _jquery2.default)(this.$el).find('.bloks__dropdown-content input[name="link"]').focus();
        },
        getTypeById: function getTypeById(id) {
            if (!id || 0 === id.length) return '';

            var type = 'errorId';
            if (this.validVimeo(id)) {
                type = 'vimeo';
            } else if (this.validMp4(id)) {
                type = 'mp4';
            } else if (this.validYoutube(id)) {
                type = 'youtube';
            }

            return type;
        },
        updateValidType: function updateValidType() {
            var id = (0, _jquery2.default)(this.$el).find('.bloks__dropdown-content input[name="id"]').val();
            this.enteredType = this.getTypeById(id);
        },
        validYoutube: function validYoutube(id) {
            var url = 'https://youtu.be/' + id;
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            return match && match[2].length == 11;
        },

        validVimeo: function validVimeo(id) {
            return !isNaN(parseFloat(id)) && isFinite(id);
        },
        validMp4: function validMp4(url) {
            var p = /^(http(s)?:\/\/|www\.).*(\.mp4)$/;
            return url.match(p) ? RegExp.$1 : false;
        },
        bindHrefKeyUp: function bindHrefKeyUp(event) {
            (0, _jquery2.default)(this.$el).find('.bloks__dropdown-content input[name="link"]').removeAttr('style');
            if ((0, _jquery2.default)(this.$el).find('.bloks__dropdown-content input[name="link"]').val() != this.href) {
                this.hrefSaveSuccess = false;
                this.hrefSaveButton = true;
            }

            if (event.key == "Enter") {
                this.hrefSaveSuccess = true;
                this.hrefSaveButton = false;
                this.updateHref();
            }
        },
        bindMediaKeyUp: function bindMediaKeyUp() {
            (0, _jquery2.default)(this.$el).find('.bloks__dropdown-content input[name="id"]').removeAttr('style');
            if ((0, _jquery2.default)(this.$el).find('.bloks__dropdown-content input[name="id"]').val() != this.videoId) {
                this.mediaSaveSuccess = false;
                this.mediaSaveButton = true;
            } else {
                this.mediaSaveButton = false;
            }
        },
        bindIdKeyUp: function bindIdKeyUp(e) {
            var _this = this;

            if (e.type === 'paste') {
                setTimeout(function () {
                    _this.bindMediaKeyUp();
                    _this.updateValidType();
                }, 100);
            } else {
                this.bindMediaKeyUp();
                this.updateValidType();
            }

            var keycode = e.keyCode ? e.keyCode : e.which;
            if (keycode === 13) {
                this.updateId();
            }
        },
        bindPlayer: function bindPlayer() {
            var _this2 = this;

            var media = (0, _jquery2.default)(this.$el).find('.bloks__media-content').clone().html();
            new _promise2.default(function (resolve) {
                (0, _jquery2.default)(_this2.$el).find('.bloks__media-content').html(media);
                resolve();
            }).then(function () {
                _this2.$root.win.jQuery(_this2.$el).find('.bloks__player').player();
            });
        },
        bindDndUploader: function bindDndUploader() {
            var _this3 = this;

            var browser = this.settings.browser === undefined || this.settings.browser === false ? (0, _jquery2.default)(this.$els.content) : (0, _jquery2.default)(this.$els.content).find(this.settings.browser);

            this.dndWindow.appendTo((0, _jquery2.default)(this.$els.content));
            this.dndLoader.appendTo((0, _jquery2.default)(this.$els.content));
            this.dndUploader = new this.$root.win.wp.Uploader({
                container: (0, _jquery2.default)(this.$els.content).get(0),
                dropzone: (0, _jquery2.default)(this.$els.content),
                browser: browser,
                added: function added() {
                    _this3.dndLoader.show();
                },
                success: function success(attachment) {
                    var _self = _this3;
                    _this3.src = attachment.attributes.url;
                    _this3.title = attachment.attributes.alt;
                    (0, _jquery2.default)("<img/>", {
                        load: function load() {
                            if (this.width > this.height) {
                                _self.maxheight = '100%';
                                _self.maxwidth = 'inherit';
                            } else {
                                _self.maxheight = 'inherit';
                                _self.maxwidth = '100%';
                            }
                        },
                        src: _self.src
                    });

                    if (attachment.attributes.mime === 'image/png' || attachment.attributes.mime === 'image/jpeg') {
                        _this3.type = 'image';
                    } else if (attachment.attributes.mime === 'video/mp4') {
                        _this3.type = 'mp4';
                    }

                    _this3.dndLoader.hide();
                }
            });

            this.dndUploader.dropzone.on('dropzone:enter', function () {
                _this3.dndWindow.show().css({ opacity: 1 });
            });

            this.dndUploader.dropzone.on('dropzone:leave', function () {
                _this3.dndWindow.hide().css({ opacity: 0 });
            });
        },
        showMediaModal: function showMediaModal() {
            var _this4 = this;

            if (this.mediaUploader) {
                this.mediaUploader.open();
                return;
            }

            this.mediaUploader = this.$root.win.wp.media({
                title: 'Select or Upload Media Of Your Chosen Persuasion',
                button: {
                    text: 'Use this media'
                },
                library: {
                    type: this.settings.allow !== undefined ? this.settings.allow : ['image', 'video']
                },
                multiple: false });

            this.mediaUploader.on('close', function () {});

            this.mediaUploader.on('select', function () {
                var _self = _this4;
                var attachment = _this4.mediaUploader.state().get('selection').first().toJSON();
                _this4.src = attachment.url;
                _this4.title = attachment.alt;
                (0, _jquery2.default)("<img/>", {
                    load: function load() {
                        if (this.width > this.height) {
                            _self.maxheight = '100%';
                            _self.maxwidth = 'inherit';
                        } else {
                            _self.maxheight = 'inherit';
                            _self.maxwidth = '100%';
                        }
                    },
                    src: _self.src
                });
                if (attachment.mime === 'image/png' || attachment.mime === 'image/jpeg') {
                    _this4.type = 'image';
                    setTimeout(function () {
                        Bloks.Iframe.win.jQuery(this.$el).closest('.bloks__component__box').find('.bloks-tooltip').each(function (i, el) {
                            if (!(0, _jquery2.default)(el).hasClass('tooltipstered')) {
                                Bloks.Iframe.win.jQuery(el).tooltipster({
                                    theme: 'bloks__tooltip-content'
                                });
                            }
                        });
                    }.bind(_this4), 100);
                } else if (attachment.mime === 'video/mp4') {
                    _this4.type = 'mp4';
                }
            });

            this.mediaUploader.open();
        }
    },
    beforeDestroy: function beforeDestroy() {
        this.dndWindow.remove();
        this.dndLoader.remove();
        (0, _jquery2.default)(this.$els.content).removeClass('supports-drag-drop');
        if ((0, _jquery2.default)(this.$els.content).is('[id^=__wp-uploader-id-]')) (0, _jquery2.default)(this.$els.content).removeAttr('id');
        (0, _jquery2.default)(this.$els.content).css({ 'position': '', 'z-index': '' });
        this.dndUploader.uploader.destroy();
        this.$root.win.jQuery(this.$el).find('.bloks__player').player('destroy');
        this.$root.win.jQuery(this.$el).find('.moxie-shim-html5').remove();
    }
});

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = { "default": __webpack_require__(79), __esModule: true };

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(80);
__webpack_require__(81);
__webpack_require__(96);
__webpack_require__(100);
__webpack_require__(111);
__webpack_require__(112);
module.exports = __webpack_require__(7).Promise;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $at = __webpack_require__(82)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(43)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0; // next index
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(33);
var defined = __webpack_require__(34);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = !__webpack_require__(11) && !__webpack_require__(45)(function () {
  return Object.defineProperty(__webpack_require__(35)('div'), 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(10);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(8);

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var create = __webpack_require__(87);
var descriptor = __webpack_require__(46);
var setToStringTag = __webpack_require__(38);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(8)(IteratorPrototype, __webpack_require__(4)('iterator'), function () {
  return this;
});

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(6);
var dPs = __webpack_require__(88);
var enumBugKeys = __webpack_require__(50);
var IE_PROTO = __webpack_require__(37)('IE_PROTO');
var Empty = function Empty() {/* empty */};
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var _createDict = function createDict() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(35)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(51).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  _createDict = iframeDocument.F;
  while (i--) {
    delete _createDict[PROTOTYPE][enumBugKeys[i]];
  }return _createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = _createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dP = __webpack_require__(18);
var anObject = __webpack_require__(6);
var getKeys = __webpack_require__(89);

module.exports = __webpack_require__(11) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) {
    dP.f(O, P = keys[i++], Properties[P]);
  }return O;
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(90);
var enumBugKeys = __webpack_require__(50);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = __webpack_require__(19);
var toIObject = __webpack_require__(36);
var arrayIndexOf = __webpack_require__(92)(false);
var IE_PROTO = __webpack_require__(37)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) {
    if (key != IE_PROTO) has(O, key) && result.push(key);
  } // Don't enum bug & hidden keys
  while (names.length > i) {
    if (has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
  }return result;
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(20);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(36);
var toLength = __webpack_require__(47);
var toAbsoluteIndex = __webpack_require__(93);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
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
    } else for (; length > index; index++) {
      if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      }
    }return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(33);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(19);
var toObject = __webpack_require__(95);
var IE_PROTO = __webpack_require__(37)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.1.13 ToObject(argument)
var defined = __webpack_require__(34);
module.exports = function (it) {
  return Object(defined(it));
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(97);
var global = __webpack_require__(3);
var hide = __webpack_require__(8);
var Iterators = __webpack_require__(12);
var TO_STRING_TAG = __webpack_require__(4)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' + 'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' + 'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' + 'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' + 'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addToUnscopables = __webpack_require__(98);
var step = __webpack_require__(99);
var Iterators = __webpack_require__(12);
var toIObject = __webpack_require__(36);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(43)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0; // next index
  this._k = kind; // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {/* empty */};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (done, value) {
  return { value: value, done: !!done };
};

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LIBRARY = __webpack_require__(44);
var global = __webpack_require__(3);
var ctx = __webpack_require__(16);
var classof = __webpack_require__(52);
var $export = __webpack_require__(15);
var isObject = __webpack_require__(10);
var aFunction = __webpack_require__(17);
var anInstance = __webpack_require__(101);
var forOf = __webpack_require__(102);
var speciesConstructor = __webpack_require__(53);
var task = __webpack_require__(54).set;
var microtask = __webpack_require__(107)();
var newPromiseCapabilityModule = __webpack_require__(39);
var perform = __webpack_require__(55);
var promiseResolve = __webpack_require__(56);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function empty() {/* empty */};
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(4)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) {/* empty */}
}();

// helpers
var isThenable = function isThenable(it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function notify(promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function run(reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) {
      run(chain[i++]);
    } // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function onUnhandled(promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    }promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function isUnhandled(promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  }return true;
};
var onHandleUnhandled = function onHandleUnhandled(promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function $reject(value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function $resolve(value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = []; // <- awaiting reactions
    this._a = undefined; // <- checked in isUnhandled reactions
    this._s = 0; // <- state
    this._d = false; // <- done
    this._v = undefined; // <- value
    this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false; // <- notify
  };
  Internal.prototype = __webpack_require__(108)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function _catch(onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function OwnPromiseCapability() {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function newPromiseCapability(C) {
    return C === $Promise || C === Wrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(38)($Promise, PROMISE);
__webpack_require__(109)(PROMISE);
Wrapper = __webpack_require__(7)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(110)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
    throw TypeError(name + ': incorrect invocation!');
  }return it;
};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ctx = __webpack_require__(16);
var call = __webpack_require__(103);
var isArrayIter = __webpack_require__(104);
var anObject = __webpack_require__(6);
var toLength = __webpack_require__(47);
var getIterFn = __webpack_require__(105);
var BREAK = {};
var RETURN = {};
var _exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () {
    return iterable;
  } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
_exports.BREAK = BREAK;
_exports.RETURN = RETURN;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// call something on iterator step with safe closing on error
var anObject = __webpack_require__(6);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// check on default Array iterator
var Iterators = __webpack_require__(12);
var ITERATOR = __webpack_require__(4)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__(52);
var ITERATOR = __webpack_require__(4)('iterator');
var Iterators = __webpack_require__(12);
module.exports = __webpack_require__(7).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
                  var un = that === undefined;
                  switch (args.length) {
                                    case 0:
                                                      return un ? fn() : fn.call(that);
                                    case 1:
                                                      return un ? fn(args[0]) : fn.call(that, args[0]);
                                    case 2:
                                                      return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
                                    case 3:
                                                      return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
                                    case 4:
                                                      return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
                  }return fn.apply(that, args);
};

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(3);
var macrotask = __webpack_require__(54).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(20)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function flush() {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();else last = undefined;
        throw e;
      }
    }last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function notify() {
      process.nextTick(flush);
    };
    // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function notify() {
      node.data = toggle = !toggle;
    };
    // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function notify() {
      promise.then(flush);
    };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout
  } else {
    notify = function notify() {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    }last = task;
  };
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hide = __webpack_require__(8);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];else hide(target, key, src[key]);
  }return target;
};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(3);
var core = __webpack_require__(7);
var dP = __webpack_require__(18);
var DESCRIPTORS = __webpack_require__(11);
var SPECIES = __webpack_require__(4)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function get() {
      return this;
    }
  });
};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ITERATOR = __webpack_require__(4)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () {
    SAFE_CLOSING = true;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () {
    throw 2;
  });
} catch (e) {/* empty */}

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () {
      return { done: safe = true };
    };
    arr[ITERATOR] = function () {
      return iter;
    };
    exec(arr);
  } catch (e) {/* empty */}
  return safe;
};

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally


var $export = __webpack_require__(15);
var core = __webpack_require__(7);
var global = __webpack_require__(3);
var speciesConstructor = __webpack_require__(53);
var promiseResolve = __webpack_require__(56);

$export($export.P + $export.R, 'Promise', { 'finally': function _finally(onFinally) {
    var C = speciesConstructor(this, core.Promise || global.Promise);
    var isFunction = typeof onFinally == 'function';
    return this.then(isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () {
        return x;
      });
    } : onFinally, isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () {
        throw e;
      });
    } : onFinally);
  } });

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try

var $export = __webpack_require__(15);
var newPromiseCapability = __webpack_require__(39);
var perform = __webpack_require__(55);

$export($export.S, 'Promise', { 'try': function _try(callbackfn) {
    var promiseCapability = newPromiseCapability.f(this);
    var result = perform(callbackfn);
    (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
    return promiseCapability.promise;
  } });

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(114)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] dev/web/js/builder/components/bloks/media/image.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(115)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-3bc849fe/image.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    replace: false,
    events: {
        'on_update_media_href': function on_update_media_href(href) {
            this.href = href;
        },
        'on_update_media_title': function on_update_media_title(title) {
            this.title = title;
        },
        'on_update_media_src': function on_update_media_src(src) {
            this.src = src;
        },
        'on_update_media_newtab': function on_update_media_newtab(newtab) {
            this.newtab = newtab;
        },
        'on_update_media_backdrop': function on_update_media_backdrop(backdrop) {
            this.backdrop = backdrop;
        },
        'on_update_media_max_height': function on_update_media_max_height(maxheight) {
            this.maxheight = maxheight;
        },
        'on_update_media_max_width': function on_update_media_max_width(maxwidth) {
            this.maxwidth = maxwidth;
        }
    },
    ready: function ready() {
        (0, _jquery2.default)(this.$el).find('a').click(function (e) {
            e.preventDefault();
        });

        this.title = this.title.replace(/<(?:.|\n)*?>/gm, '');
    },

    watch: {
        'title': function title(val) {
            return this.title = val.replace(/<(?:.|\n)*?>/gm, '');
        }
    }
};

/***/ }),
/* 115 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"bloks__image\">\n    <div class=\"has-link\" v-show=\"href != ''\">\n        <a v-bind:href=\"href\" v-bind:title=\"title\" v-bind:target=\"newtab ? '_blank' : newtab\">\n            <img\n                    v-bind:src=\"src\"\n                    v-bind:alt=\"title\"\n                    v-bind:style=\"{ maxHeight: maxheight, maxWidth: maxwidth}\"\n            />\n            <span class=\"bloks__mask\" v-bind:style=\"{ background: backdrop }\"></span>\n        </a>\n    </div>\n    <div class=\"no-link\" v-show=\"href == ''\">\n        <img\n                v-bind:src=\"src\"\n                v-bind:alt=\"title\"\n                v-bind:style=\"{ maxHeight: maxheight, maxWidth: maxwidth}\"\n        />\n        <span class=\"bloks__mask\" v-bind:style=\"{ background: backdrop }\"></span>\n    </div>\n</div>\n";

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(117)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] dev/web/js/builder/components/bloks/media/video.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(118)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-65e6b621/video.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    replace: false
};

/***/ }),
/* 118 */
/***/ (function(module, exports) {

module.exports = "\n<video class=\"bloks__player\"\n    data-player=\"true\"\n    v-bind:data-controls=\"controls | json\"\n    v-bind:data-autoplay=\"autoplay | lowercase\"\n    v-bind:data-backdrop=\"backdrop\"\n    v-bind:data-volume=\"volume\"\n>\n    <source v-bind:src=\"src\" type=\"video/mp4\" />\n</video>\n";

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(120)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] dev/web/js/builder/components/bloks/media/social.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(121)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-4acb38b7/social.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    replace: false
};

/***/ }),
/* 121 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"bloks__player\"\n    data-player=\"true\"\n    v-bind:data-controls=\"controls | json\"\n    v-bind:data-autoplay=\"autoplay | lowercase\"\n    v-bind:data-type=\"type\"\n    v-bind:data-backdrop=\"backdrop\"\n    v-bind:data-volume=\"volume\"\n    v-bind:data-video-id=\"src\"\n>\n</div>\n";

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(123)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] dev/web/js/builder/components/bloks/media/background.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(124)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-7e16c4f8/background.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    replace: false,
    events: {
        'on_update_media_href': function on_update_media_href(href) {
            this.href = href;
        },
        'on_update_media_title': function on_update_media_title(title) {
            this.title = title;
        },
        'on_update_media_src': function on_update_media_src(src) {
            this.src = src;
        },
        'on_update_media_newtab': function on_update_media_newtab(newtab) {
            this.newtab = newtab;
        },
        'on_update_media_backdrop': function on_update_media_backdrop(backdrop) {
            this.backdrop = backdrop;
        }
    },
    ready: function ready() {
        (0, _jquery2.default)(this.$el).find('a').click(function (e) {
            e.preventDefault();
        });

        this.title = this.title.replace(/<(?:.|\n)*?>/gm, '');
    },

    watch: {
        'title': function title(val) {
            return this.title = val.replace(/<(?:.|\n)*?>/gm, '');
        }
    }
};

/***/ }),
/* 124 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"bloks__background\">\n    <template v-if=\"href != ''\">\n        <a v-bind:href=\"href\" v-bind:title=\"title\" v-bind:target=\"newtab ? '_blank' : newtab\">\n            <span class=\"background-cover\"\n                  v-bind:style=\"{backgroundImage: 'url(' + src + ')',backgroundSize: 'cover', backgroundPosition: 'center'}\">\n                <span class=\"bloks__mask\"\n                      v-bind:style=\"{ background: backdrop}\"></span>\n            </span>\n        </a>\n    </template>\n    <template v-else>\n        <span class=\"background-cover\"\n              v-bind:style=\"{backgroundImage: 'url(' + src + ')', backgroundSize: 'cover', backgroundPosition: 'center'}\">\n            <span class=\"bloks__mask\"\n                  v-bind:style=\"{ background: backdrop}\"></span>\n        </span>\n    </template>\n</div>\n";

/***/ }),
/* 125 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"bloks__media\">\n    <ul class=\"bloks__media-tools\" v-show=\"tools\" v-destroy>\n        <li>\n            <a href=\"javascript:void(0)\" @click=\"showMediaModal\" data-type=\"dropdown\" title=\"Upload Image\"\n               class=\"bloks-tooltip\">\n                <span class=\"ibloks-upload\"></span>\n            </a>\n        </li>\n        <li class=\"bloks__dropdown\" v-if=\"allowImage && allowLink && type == 'image' || type =='background'\">\n            <a href=\"javascript:void(0)\" data-type=\"dropdown\" title=\"Add link\" class=\"bloks-tooltip\"\n               @click=\"showBoxLink\">\n                <span class=\"ibloks-link\"></span>\n            </a>\n            <div class=\"bloks__dropdown-content\">\n                <h3 class=\"heading\">Link Image</h3>\n                <ul class=\"media-form\">\n                    <li>\n                        <div class=\"wrap-link\">\n                            <label class=\"title\">Url Active Image:</label>\n                            <div class=\"bloks__input-text\">\n                                <input name=\"link\" v-on:keyup=\"bindHrefKeyUp\" v-bind:value=\"href\"\n                                       v-bind:class=\"{ 'has-button': hrefSaveButton == true }\"\n                                       placeholder=\"Enter your link image\"/>\n                                <button v-show=\"hrefSaveButton\" class=\"save-link\" href=\"javascript:void(0)\"\n                                        @click=\"updateHref\">Save\n                                </button>\n                                <span v-show=\"hrefSaveSuccess\" class=\"ibloks-success\"></span>\n                            </div>\n                        </div>\n                    </li>\n                    <li class=\"bloks__input-text\">\n                        <div class=\"t-right\">\n                            <span class=\"title\">New Tab</span>\n                            <label class=\"toggle-switcher\">\n                                <input type=\"checkbox\" v-model=\"newtab\"/>\n                                <span class=\"slider round\"></span>\n                            </label>\n                        </div>\n                    </li>\n                </ul>\n            </div>\n        </li>\n        <li class=\"bloks__dropdown bloks__insert-media\" v-show=\"allowVideo\">\n            <a class=\" bloks-tooltip\" href=\"javascript:void(0)\" data-type=\"dropdown\" title=\"Insert video\">\n                <span class=\"ibloks-media\"></span>\n            </a>\n            <div class=\"bloks__dropdown-content\">\n                <h3 class=\"heading\">\n                    Insert Video\n                </h3>\n                <ul class=\"media-form\">\n                    <li>\n                        <div class=\"wrap-link\">\n                            <label class=\"title\">Youtube, Vimeo ID, MP4</label>\n                            <div class=\"bloks__input-text\">\n                                <span class=\"ibloks-vimeo\" v-if=\"enteredType == 'vimeo'\"></span>\n                                <span class=\"ibloks-youtube\" v-if=\"enteredType == 'youtube'\"></span>\n                                <span class=\"ibloks-mp4\" v-if=\"enteredType == 'mp4'\"></span>\n                                <span class=\"ibloks-warning\" v-if=\"enteredType == 'errorId'\"></span>\n                                <input v-bind:class=\"{ 'has-icon': enteredType != '' && enteredType != 'image' && enteredType != 'background', 'has-button': mediaSaveButton == true || mediaSaveSuccess == true }\"\n                                       v-on:keyup=\"bindIdKeyUp\" v-on:paste=\"bindIdKeyUp\"\n                                       placeholder=\"Your video ID here\" name=\"id\" size=\"12\"\n                                       v-bind:value=\"videoId\"/>\n                                <button v-show=\"mediaSaveButton\" class=\"add-youtube-id\" @click=\"updateId\">Save\n                                </button>\n                                <span class=\"ibloks-success\" v-show=\"mediaSaveSuccess\"></span>\n                            </div>\n                        </div>\n                        <div class=\"video-auto\"\n                             v-if=\"enteredType != '' && enteredType != 'image' && enteredType != 'background' && enteredType != 'errorId'\">\n                            <div class=\"t-right\">\n                                <span class=\"title\">Autoplay</span>\n                                <label class=\"toggle-switcher\">\n                                    <input type=\"checkbox\" v-model=\"autoplay\"/>\n                                    <span class=\"slider round\"></span>\n                                </label>\n                            </div>\n                        </div>\n                    </li>\n                </ul>\n            </div>\n        </li>\n    </ul>\n    <slot name=\"before-content\"></slot>\n    <div v-el:content class=\"bloks__media-content\" @mouseover=\"tools = true\" v-on:dblclick=\"showMediaModal\"></div>\n    <slot name=\"after-content\"></slot>\n</div>\n";

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(127)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] dev/web/js/builder/components/bloks/form.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(128)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-303d7683/form.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _iframe = __webpack_require__(57);

var _iframe2 = _interopRequireDefault(_iframe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _vue2.default.component('bloks-form', {
    data: function data() {
        return {
            modal: false,
            fieldsTmp: Array
        };
    },
    props: {
        fields: {
            type: Array,
            default: []
        },
        form: {
            type: Object,
            default: function _default() {
                return {};
            }
        },
        name: {
            type: String,
            default: 'Submit'
        },
        link: {
            type: String,
            default: ''
        }
    },
    beforeCompile: function beforeCompile() {
        this.fieldsTmp = _underscore2.default.clone(this.fields);
    },

    watch: {
        modal: function modal(val) {
            if (val === false) {
                this.resetField();
            }
        }
    },
    ready: function ready() {
        var _this = this;

        var self = this;
        (0, _jquery2.default)(this.$el).find('.bloks__button').on('click', function (e) {
            e.preventDefault();
            _this.modal = true;
            return false;
        });

        (0, _jquery2.default)(this.$el).closest('.bloks__component__bloks-form').find('.form-container').hover(function () {
            (0, _jquery2.default)(this).find('.bloks-formmail').toggleClass('blok-form-hovering');
        }).click(function () {
            (0, _jquery2.default)(this).parent().find('.btn-edit-form').css('display', 'inline-block');
            (0, _jquery2.default)(this).find('.bloks-formmail').addClass('blok-form-focusing');
        }).dblclick(function () {
            self.modal = true;
        });

        (0, _jquery2.default)(this.$root.doc).mousedown(function (e) {
            var container = (0, _jquery2.default)(self.$el).closest('.bloks__component__bloks-form').find('.form-container');
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                    (0, _jquery2.default)(self.$el).closest('.bloks__component__bloks-form').find('.btn-edit-form').hide();
                    (0, _jquery2.default)(self.$el).closest('.bloks__component__bloks-form').find('.bloks-formmail').removeClass('blok-form-focusing');
                }
        });
    },

    methods: {
        updatePlaceholder: function updatePlaceholder(index, event) {
            var clone = _underscore2.default.clone(this.fieldsTmp[index]);
            clone.placeholder = event.target.value;
            this.fieldsTmp[index] = clone;
        },
        updateLabel: function updateLabel(index, event) {
            var clone = _underscore2.default.clone(this.fieldsTmp[index]);
            clone.label = event.target.value;
            this.fieldsTmp[index] = clone;
        },
        updateToggleLabel: function updateToggleLabel(index, event) {
            var clone = _underscore2.default.clone(this.fieldsTmp[index]);
            clone.togglelabel = (0, _jquery2.default)(event.target).is(":checked");
            this.fieldsTmp[index] = clone;
        },
        resetField: function resetField() {
            this.fieldsTmp = _underscore2.default.clone(this.fields);
        },
        saveChange: function saveChange(event) {
            var element = (0, _jquery2.default)(event.target).closest('.bloks__modal-content').find('.bloks__form');
            if (element.find('.bloks__form-group').find('.bloks__form-type').find('select').hasClass("required") === true) {
                return false;
            }

            this.name = element.find('input[name="label-button"]').val();
            if (element.find('input[name="link-button"]').val()) this.link = this.validateUrl(element.find('input[name="link-button"]').val());else this.link = '';

            this.fields = this.fieldsTmp;
            this.modal = false;
        },
        addField: function addField(event) {
            var fieldtype = 'text';
            var data = {
                label: this.toTitleCase(fieldtype),
                name: this.regenFieldname(fieldtype, ' ', '_'),
                type: fieldtype,
                togglelabel: true,
                data_attr: fieldtype,
                placeholder: this.toTitleCase('Enter your text here')
            };
            this.fieldsTmp.push(data);

            setTimeout(function () {
                var nicescroll = (0, _jquery2.default)(event.target).closest('.bloks__modal-content').find('.bloks__form').find(".bloks-nice-scroll-form");
                nicescroll.animate({ scrollTop: nicescroll.prop("scrollHeight") }, 'slow');
            }.bind(this), 100);

            if ((0, _jquery2.default)(event.target).closest('.bloks__modal-content').find('.ibloks-remove').hasClass('not-allowed')) (0, _jquery2.default)(event.target).closest('.bloks__modal-content').find('.ibloks-remove').removeClass('not-allowed');
        },
        removeField: function removeField(index, event) {
            if (this.fieldsTmp.length == 1) return false;
            this.fieldsTmp.$remove(this.fieldsTmp[index]);

            if (this.fieldsTmp.length == 1) {
                (0, _jquery2.default)(event.target).closest('.bloks__modal-content').find('.ibloks-remove').addClass('not-allowed');
            } else {
                (0, _jquery2.default)(event.target).closest('.bloks__modal-content').find('.ibloks-remove').removeClass('not-allowed');
            }
        },
        changeType: function changeType(index, event) {
            var selectType = event.target.value;
            var inputFields = ['name', 'email', 'phone', 'address', 'text'];
            var areaFields = ['message', 'comment', 'custom_text'];
            var type = '';
            var attr = '';
            if (inputFields.indexOf(selectType) >= 0) {
                type = 'text';
                attr = selectType;
            } else if (areaFields.indexOf(selectType) >= 0) {
                type = 'textarea';
                attr = selectType;
            } else {
                type = selectType;
                attr = selectType;
            }

            var placeholderValue = '';
            if (selectType == 'textarea') placeholderValue = 'comment';else if (selectType == 'phone') placeholderValue = 'telephone';else placeholderValue = selectType;

            var element = (0, _jquery2.default)(event.target).closest('.bloks__modal-content').find('.bloks__form').find('.wrap-field');
            if (selectType != '') {
                element.find('.label-' + index).val((0, _jquery2.default)(event.target).children(":selected").text());
                element.find('.placeholder-' + index).val('Enter your ' + placeholderValue + ' here');
                (0, _jquery2.default)(event.target).removeClass('required');
            } else {
                (0, _jquery2.default)(event.target).addClass('required');
            }

            var item = _underscore2.default.clone(this.fieldsTmp[index]);
            item.label = (0, _jquery2.default)(event.target).children(":selected").text();
            item.name = this.regenFieldname(item.label, ' ', '_');
            item.type = type;
            item.data_attr = attr;
            item.placeholder = 'Enter your ' + placeholderValue + ' here...';
            this.fieldsTmp[index] = item;
        },
        regenFieldname: function regenFieldname(str, strFind, strReplace) {
            str = str.toLowerCase();
            str = str.replace(/[^A-Z0-9]+/ig, " ");

            var temp = str;
            var index = temp.indexOf(strFind);

            while (index != -1) {
                temp = temp.replace(strFind, strReplace);
                index = temp.indexOf(strFind);
            }
            return temp;
        },
        toTitleCase: function toTitleCase(str) {
            return str.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        },

        validateUrl: function validateUrl(str) {
            var url = str;
            if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0) {
                return url;
            } else {
                return 'http://' + url;
            }
        }
    }
});

/***/ }),
/* 128 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"bloks__form-wrapper\" v-destroy>\n    <button type=\"button\" class=\"btn-edit-form bloks__button\" style=\"display: none;\">\n        <span class=\"ibloks-edit\"></span>\n    </button>\n\n    <bloks-modal :show.sync=\"modal\" classes=\"bloks__form__form\">\n        <template slot=\"title\" class=\"modal-title\">Form Settings</template>\n        <div slot=\"body\" class=\"bloks__form\">\n            <div class=\"form-label-static\">\n                <ul>\n                    <li class=\"static-form-type\"><label>Type:</label></li>\n                    <li class=\"static-form-label\"><label>Label:</label></li>\n                    <li class=\"static-form-placeholder\"><label>Placeholder:</label></li>\n                </ul>\n            </div>\n            <div class=\"wrap-field bloks-nice-scroll-form\">\n                <!--<div class=\"title-field\">Edit Fields</div>-->\n\n                <!-- list fields -->\n                <div v-for=\"(index, item) in fieldsTmp\" class=\"bloks__form-group\">\n                    <div class=\"bloks__form-type\">\n                        <select class=\"select-type\" v-on:change=\"changeType(index, $event)\">\n                            <option value=\"\">Select Type</option>\n                            <option :selected=\"(item.data_attr=='email')?true : false\" value=\"email\">E-Mail</option>\n                            <option :selected=\"(item.data_attr=='name')?true : false\" value=\"name\">Name</option>\n                            <option :selected=\"(item.data_attr=='phone')?true : false\" value=\"phone\">Telephone\n                            </option>\n                            <option :selected=\"(item.data_attr=='text')?true : false\" value=\"text\">Text</option>\n                            <option :selected=\"(item.data_attr=='address')?true : false\" value=\"address\">Address\n                            </option>\n                            <option :selected=\"(item.data_attr=='textarea')?true : false\" value=\"textarea\">Comment\n                            </option>\n                        </select>\n                    </div>\n                    <div class=\"bloks__form-label\">\n                        <input class=\"input-label label-{{index}}\" type=\"text\" name=\"inputlabel\"\n                               v-bind:value=\"item.label\"\n                               placeholder=\"Label\" v-on:keyup=\"updateLabel(index, $event)\">\n                        <div class=\"checkbox_wrapper\">\n                            <input :checked=\"item.togglelabel\" class=\"input-checkbox\" type=\"checkbox\"\n                                   name=\"inputcheckbox\"\n                                   v-on:click=\"updateToggleLabel(index, $event)\">\n                            <label></label>\n                        </div>\n                    </div>\n                    <div class=\"bloks__form-placeholder\">\n                        <input class=\"input-placeholder placeholder-{{index}}\" type=\"text\" name=\"inputplaceholder\"\n                               style=\"float: left;\" placeholder=\"Placeholder\"\n                               v-bind:value=\"item.placeholder\" v-on:keyup=\"updatePlaceholder(index, $event)\">\n                        <span v-on:click=\"removeField(index, $event)\" class=\"remove ibloks-remove\"\n                              style=\"float: left;cursor: pointer;\"></span>\n                    </div>\n                </div>\n                <!-- end -->\n            </div>\n            <div class=\"form-group\">\n                <div class=\"formOverlay-add-input\">\n                    <a v-on:click=\"addField\" class=\"text-center add-field\"><span class=\"ibloks-plus\"></span>\n                        Add Field </a>\n                </div>\n            </div>\n            <div class=\"form-group form-button\">Edit Button</div>\n            <div class=\"form-group\">\n                <div class=\"bloks__form-button\" data-key=\"button_submit\">\n                    <div class=\"bloks__form-button-text\">\n                        <label>Button Name:</label>\n                        <input class=\"button-text\" placeholder=\"Enter button text\" type=\"text\"\n                               v-bind:value=\"name\" name=\"label-button\">\n                    </div>\n                    <div class=\"bloks__form-button-link\">\n                        <label>Link Button:</label>\n                        <input class=\"button-href\" type=\"text\" placeholder=\"Extra submission link\"\n                               v-bind:value=\"link\" name=\"link-button\">\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div slot=\"footer\" class=\"modal-footer\">\n            <button type=\"button\" class=\"bloks__modal-btn bloks__modal__btn-close\" v-on:click=\"modal = false\">\n                Cancel\n            </button>\n            <button type=\"button\" class=\"bloks__modal-btn bloks__modal__btn-save\" v-on:click=\"saveChange\">\n                Save changes\n            </button>\n        </div>\n    </bloks-modal>\n</div>\n";

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(130);

__webpack_require__(133);

__webpack_require__(136);

__webpack_require__(139);

__webpack_require__(142);

__webpack_require__(145);

__webpack_require__(148);

__webpack_require__(151);

__webpack_require__(154);

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(131)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] dev/web/js/builder/components/settings/collection.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(132)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-01677f46/collection.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _vue2.default.component('bloks-collection-settings', {
    props: ['collection', 'title', 'imagedefault'],
    methods: {
        addItem: function addItem() {
            setTimeout(function () {
                var clone = _underscore2.default.clone(this.collection[this.collection.length - 1]);
                clone.title = this.title + ' ' + (this.collection.length + 1);
                clone.url = this.imagedefault;
                this.collection.$set(this.collection.length, clone);

                if ((0, _jquery2.default)(this.$el).find('.delete-item').hasClass('not-allowed')) (0, _jquery2.default)(this.$el).find('.delete-item').removeClass('not-allowed');

                setTimeout(function () {
                    this.$root.win.jQuery('.carousel').carousel(this.collection.length - 1);
                    this.$root.win.jQuery('.carousel').carousel('pause');
                    var nicescroll = (0, _jquery2.default)(this.$el).find(".bloks-nice-scroll");
                    nicescroll.animate({ scrollTop: nicescroll.prop("scrollHeight") }, 'slow');

                    Bloks.Iframe.win.jQuery(this.$el).closest('.bloks__component__box').find('.bloks-tooltip').each(function (i, el) {
                        if (!(0, _jquery2.default)(el).hasClass('tooltipstered')) {
                            Bloks.Iframe.win.jQuery(el).tooltipster({
                                theme: 'bloks__tooltip-content'
                            });
                        }
                    });
                }.bind(this), 100);
            }.bind(this), 200);
        },
        removeItem: function removeItem(item, index) {
            setTimeout(function () {
                if (this.collection.length === 1) return false;
                this.$root.win.jQuery('.carousel').carousel(this.collection.length - 2);
                setTimeout(function () {
                    this.collection.$remove(this.collection[index]);
                    if (this.collection.length === 1) (0, _jquery2.default)(this.$el).find('.delete-item').addClass('not-allowed');else (0, _jquery2.default)(this.$el).find('.delete-item').removeClass('not-allowed');
                }.bind(this), 1000);
            }.bind(this), 200);
        },
        removeIcon: function removeIcon(index) {
            this.collection[index].url = false;
        },
        editIcon: function editIcon(index, type) {
            this.showMediaModal(index);
        },
        showMediaModal: function showMediaModal(index) {
            var frame = void 0;
            var self = this;
            if (frame) {
                frame.open();
                return;
            }
            frame = Bloks.Iframe.win.wp.media({
                title: 'Select or Upload Media Of Your Chosen Persuasion',
                button: {
                    text: 'Use this media'
                },
                multiple: false });
            frame.on('close', function () {});

            frame.on('select', function () {
                var attachment = frame.state().get('selection').first().toJSON();
                var img = (0, _jquery2.default)(self.$el).find('li[data-index="' + index + '"]').find('img');
                var img_preview = Bloks.Iframe.win.jQuery(self.$el).closest('.bloks__component__box').find('div[data-index="' + index + '"]').find('.bloks__image').find('img');
                (0, _jquery2.default)("<img/>", {
                    load: function load() {
                        if (this.width > this.height) {
                            (0, _jquery2.default)(img).css('max-height', '100%');
                            (0, _jquery2.default)(img).css('max-width', 'inherit');
                            (0, _jquery2.default)(img_preview).css('max-height', '100%');
                            (0, _jquery2.default)(img_preview).css('max-width', 'inherit');
                        } else {
                            (0, _jquery2.default)(img).css('max-height', 'inherit');
                            (0, _jquery2.default)(img).css('max-width', '100%');
                            (0, _jquery2.default)(img_preview).css('max-height', 'inherit');
                            (0, _jquery2.default)(img_preview).css('max-width', '100%');
                        }
                    },
                    src: attachment.url
                });
                self.collection[index].url = attachment.url;
                if (attachment.mime == 'image/jpeg') {
                    self.collection[index].type = 'image';
                }
                if (attachment.mime == 'video/mp4') {
                    self.collection[index].type = 'mp4';
                }
            });
            frame.open();
        }
    },
    ready: function ready() {
        var el = this.$el;
        var self = this;
        this.$root.win.jQuery('.carousel').carousel('pause');
        this.$root.win.jQuery(el).find('#sortable').sortable({
            placeholder: "ui-state-highlight",
            opacity: 0.6,
            update: function update(event, ui) {
                var newOrder = self.$root.win.jQuery(this).sortable('toArray');
                var newcollection = [];
                self.$root.win.jQuery.each(newOrder, function (key, value) {
                    newcollection.push(self.collection[value]);
                });
                self.collection = newcollection;
            }
        });
        this.$root.win.jQuery(el).find('#sortable').disableSelection();
        (0, _jquery2.default)(this.$el).find(".bloks-nice-scroll").niceScroll({
            cursorwidth: 8,
            cursoropacitymin: 0.4,
            cursorcolor: '#FC9553',
            cursorborder: 'none',
            cursorborderradius: 3,
            autohidemode: 'leave',
            background: '#c7c7c7'
        });
    }
});

/***/ }),
/* 132 */
/***/ (function(module, exports) {

module.exports = "\n<li class=\"setting-collection bloks__dropdown\">\n    <a href=\"javascript:void(0)\" class=\"bloks-tooltip\" title=\"{{title}} Settings\" data-type=\"dropdown\">\n        <span class=\"ibloks-colection-setting\"></span>\n    </a>\n    <div class=\"bloks__dropdown-content\">\n        <h3 class=\"heading\">{{title}} Settings</h3>\n        <ul id=\"sortable\" class=\"bloks-nice-scroll\">\n            <li class=\"ui-state-default list-collection sortable-item\" id=\"{{index}}\"\n                v-for=\"(index, item) in collection\" data-index=\"{{index}}\">\n                <div class=\"list-item\">\n                    <div v-if=\"item.url\" v-on:click=\"editIcon(index,item.type)\" class=\"image-item\">\n                        <template v-if=\"item.type=='image'||item.type=='background'\">\n                            <div class=\"border-image\"> <img alt=\"icon item\" v-bind:src=\"item.url\" title=\"Change image\"></div>\n                        </template>\n                        <template v-else>\n                            <i class=\"ibloks-media-default\" title=\"Video\"></i>\n                        </template>\n                        <div class=\"bor-imgdel\" v-on:click=\"removeIcon(index)\">\n                            <span class=\"ibloks-delete-thumb\" v-if=\"item.url\" title=\"Delete image\"></span>\n                        </div>\n                    </div>\n                    <div v-else v-on:click=\"editIcon(index)\" class=\"upload-image-item image-item\"><span\n                            class=\"text-center\">Select</span></div>\n                    <div class=\"input-title\">\n                        <label>Title #{{index+1}}:</label>\n                        <input v-model=\"item.title\" data-index=\"{{index}}\"\n                               title=\"{{item.title}}\"\n                               placeholder=\"Enter your title...\"\n                               class=\"item-{{index}}\" name=\"item\" type=\"text\">\n                    </div>\n                    <div href=\"javascript:void(0)\" class=\"delete-item\">\n                    <span v-on:click=\"removeItem(item, index)\">\n                        <i class=\"ibloks-remove\" aria-hidden=\"true\" title=\"Remove Item\"></i>\n                    </span>\n                    </div>\n                </div>\n            </li>\n        </ul>\n        <div class=\"add-item\">\n            <a href=\"javascript:void(0);\" class=\"new-item\" @click=\"addItem\" title=\"Add Item\">Add {{title}}</a>\n        </div>\n    </div>\n</li>\n";

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(134)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] dev/web/js/builder/components/settings/colorpicker.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(135)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-4b19ba82/colorpicker.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _vue2.default.component('bloks-colorpicker-settings', {
    props: ['colorpicker'],
    ready: function ready() {
        var self = this;

        Bloks.Iframe.win.jQuery(this.$el).find('.blend-color').colorpicker({
            color: self.colorpicker === '' || self.colorpicker === undefined ? 'rgba(113,108,108,0.2)' : self.colorpicker
        }).on('change', function (e, data) {
            e.preventDefault();
            if (data) self.colorpicker = 'rgba(' + data.rgb.r + ', ' + data.rgb.g + ', ' + data.rgb.b + ', ' + data.rgb.a + ')';
        });
    }
});

/***/ }),
/* 135 */
/***/ (function(module, exports) {

module.exports = "\n<li class=\"bloks__setting-color bloks__dropdown\">\n    <a href=\"javascript:void(0)\" class=\"bloks-tooltip\" title=\"Blend Color\" data-type=\"dropdown\">\n        <span class=\"ibloks-blend\"></span>\n    </a>\n    <div class=\"bloks__dropdown-content\">\n        <h3 class=\"heading\">Blend Color</h3>\n        <ul>\n            <li>\n                <div class=\"blend-color\"></div>\n            </li>\n        </ul>\n    </div>\n</li>\n";

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(137)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] dev/web/js/builder/components/settings/layout.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(138)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-4cdb9269/layout.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _vue2.default.component('bloks-layout-settings', {
    props: ['layout'],
    ready: function ready() {
        var el = this.$el;
        var self = this;

        (0, _jquery2.default)(el).find('input[type="checkbox"]').each(function (index, el) {
            var element = (0, _jquery2.default)(this).data('element');
            (0, _jquery2.default)(this).prop('checked', self.layout[element]);
        });

        (0, _jquery2.default)(el).find('input[type="checkbox"]').click(function () {
            var element = (0, _jquery2.default)(this).data('element');
            self.layout[element] = this.checked;
        });
    }
});

/***/ }),
/* 138 */
/***/ (function(module, exports) {

module.exports = "\n<li class=\"bloks__feature__text bloks__dropdown\">\n    <a class=\"bloks-tooltip tooltipstered\" title=\"Setting Layout\" href=\"javascript:void(0)\" data-type=\"dropdown\">\n        <span class=\"ibloks-change-layout\"></span>\n    </a>\n    <div class=\"bloks__dropdown-content\">\n        <h3 class=\"heading\">Change Layout</h3>\n        <ul>\n            <li>\n                <div class=\"setting-feature\">\n                    <span class=\"title-header\">Show Title:</span>\n                    <label class=\"toggle-switcher\">\n                        <input class=\"show-header\" v-bind=\"header\" name=\"header\" data-element=\"header\"\n                               type=\"checkbox\">\n                        <span class=\"slider round\"></span>\n                    </label>\n                </div>\n            </li>\n            <li>\n                <div class=\"setting-feature\">\n                    <span class=\"title-content\">Show Content:</span>\n                    <label class=\"toggle-switcher\">\n                        <input class=\"show-content\" v-bind=\"content\" name=\"content\" data-element=\"content\"\n                               type=\"checkbox\">\n                        <span class=\"slider round\"></span>\n                    </label>\n                </div>\n            </li>\n        </ul>\n    </div>\n</li>\n";

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(140)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] dev/web/js/builder/components/settings/grid.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(141)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-5547f245/grid.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _vue2.default.component('bloks-grid-settings', {
    data: function data() {
        return {
            ran: _underscore2.default.random(0, 100)
        };
    },

    props: {
        'grid': {
            type: Object,
            required: true
        }
    },
    ready: function ready() {
        var self = this;
        (0, _jquery2.default)(this.$el).find('.grid-media-height').val(self.grid.height);
        (0, _jquery2.default)(this.$el).closest('.bloks__component__box').find('.bloks__image').css('height', self.grid.height + 'px');
        (0, _jquery2.default)(this.$el).find('input[type="checkbox"]').each(function () {
            var element = (0, _jquery2.default)(this).data('element');
            (0, _jquery2.default)(this).prop('checked', self.grid[element]);
        });

        (0, _jquery2.default)(this.$el).find('input[type="checkbox"]').click(function () {
            var element = (0, _jquery2.default)(this).data('element');
            self.grid[element] = this.checked;
        });

        (0, _jquery2.default)(this.$el).find('.grid-media-height').on("change mousewheel", function () {
            if (this.value > self.grid.maxheight) this.value = self.grid.maxheight;
            if (this.value < self.grid.minheight) this.value = self.grid.minheight;
            self.grid.height = parseInt(this.value);
            (0, _jquery2.default)(self.$el).closest('.bloks__component__box').find('.bloks__image').css('height', self.grid.height + 'px');
        });
    }
});

/***/ }),
/* 141 */
/***/ (function(module, exports) {

module.exports = "\n<li class=\"bloks__dropdown\">\n    <a href=\"javascript:void(0);\" data-type=\"dropdown\" class=\"bloks-tooltip\" title=\"Settings grid\">\n        <span class=\"ibloks-change-layout\"></span>\n    </a>\n    <div class=\"bloks__dropdown-content\">\n        <h3 class=\"heading\">Change layout</h3>\n        <ul class=\"grid-elements\">\n            <li v-if=\"this.grid.showtitle !== undefined\">\n                <span>Title:</span>\n                <label class=\"toggle-switcher\"><input type=\"checkbox\" name=\"gridheader\" data-element=\"showtitle\"/>\n                    <span class=\"slider round\"></span>\n                </label>\n            </li>\n            <li v-if=\"this.grid.showdescription !== undefined\">\n                <span>Description:</span>\n                <label class=\"toggle-switcher\">\n                    <input type=\"checkbox\" name=\"griddescription\" data-element=\"showdescription\"/>\n                    <span class=\"slider round\"></span>\n                </label>\n            </li>\n            <li v-if=\"this.grid.showmedia !== undefined\">\n                <span>Media:</span>\n                <label class=\"toggle-switcher\">\n                    <input type=\"checkbox\" name=\"gridmedia\" data-element=\"showmedia\"/>\n                    <span class=\"slider round\"></span>\n                </label>\n            </li>\n            <li v-if=\"this.grid.showsubtitle !== undefined\">\n                <span>Subtitle:</span>\n                <label class=\"toggle-switcher\">\n                    <input type=\"checkbox\" name=\"gridtitle\" data-element=\"showsubtitle\"/>\n                    <span class=\"slider round\"></span>\n                </label>\n            </li>\n            <li v-if=\"this.grid.showsubdescription !== undefined\">\n                <span>Subdescription:</span>\n                <label class=\"toggle-switcher\">\n                    <input type=\"checkbox\" name=\"gridsubdescription\" data-element=\"showsubdescription\"/>\n                    <span class=\"slider round\"></span>\n                </label>\n            </li>\n            <li v-if=\"this.grid.showbutton !== undefined\">\n                <span>Button:</span>\n                <label class=\"toggle-switcher\">\n                    <input type=\"checkbox\" name=\"gridbutton\" data-element=\"showbutton\"/>\n                    <span class=\"slider round\"></span>\n                </label>\n            </li>\n            <li v-if=\"this.grid.showmedia !== undefined\" class=\"grid-media\">\n                <span class=\"text-media-height\">Media height:</span>\n                <div class=\"bloks__before-px\">\n                    <input type=\"number\" value=\"\" step=\"1\" class=\"grid-media-height\" placeholder=\"\"/>\n                </div>\n            </li>\n        </ul>\n    </div>\n</li>\n";

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(143)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] dev/web/js/builder/components/settings/map.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(144)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-2bb079ad/map.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _vue2.default.component('bloks-map-settings', {
    props: {
        'map': {
            type: Object | Array,
            required: true
        },
        'custommap': {
            type: Object | Array,
            required: true
        },
        'class': {
            type: String,
            required: true
        }
    },
    ready: function ready() {
        var self = this;
        if (this.map.length == 1) {
            (0, _jquery2.default)(this.$el).find('.delete-address').addClass('not-allowed');
        }

        (0, _jquery2.default)(this.$el).find('.new-address').on('click', function () {
            var clone = _underscore2.default.clone(self.map[self.map.length - 1]);
            self.map.push(clone);

            setTimeout(function () {
                var nicescroll = (0, _jquery2.default)(self.$el).find(".bloks-nice-scroll");
                nicescroll.animate({ scrollTop: nicescroll.prop("scrollHeight") }, 'slow');
            }.bind(this), 100);

            if ((0, _jquery2.default)(self.$el).find('.delete-address').hasClass('not-allowed')) (0, _jquery2.default)(self.$el).find('.delete-address').removeClass('not-allowed');
        });

        (0, _jquery2.default)(this.$el).find(".bloks-nice-scroll").niceScroll({
            cursorwidth: 8,
            cursoropacitymin: 0.4,
            cursorcolor: '#FC9553',
            cursorborder: 'none',
            cursorborderradius: 3,
            autohidemode: 'leave',
            background: '#c7c7c7'
        });

        this.initMap();
    },

    methods: {
        enterKeyup: function enterKeyup(event) {
            var self = this;
            var $ = jQuery;
            var adds = this.map;
            var classInput = $(event.target).attr('class');

            var keycode = event.keyCode ? event.keyCode : event.which;
            if (keycode == 13) {
                adds[$(event.target).data('index')].title = $(event.target).val();
                $(this.el).toggleClass('open');
                var classmap = jQuery(this.$el).closest('.bloks__component__box').find('.bloks-google-map').find('.' + this.class).attr('id');
                var gmap = new Bloks.Iframe.win.GoogleMaps();
                gmap.getLatLngAddress(classmap, self.map);
            }
        },
        initMap: function initMap() {
            jQuery(this.$el).closest('.bloks__component__box').find('.dropdown').removeClass('open');
            var classmap = jQuery(this.$el).closest('.bloks__component__box').find('.bloks-google-map').find('.' + this.class).attr('id');
            var gmap = new Bloks.Iframe.win.GoogleMaps();
            gmap.init(classmap, this.map, this.$parent.styleMap);
        },
        findAddress: function findAddress(item, idx) {
            if (item.title != jQuery(this.$el).find('.address-' + idx).val()) {
                item.title = jQuery(this.$el).find('.address-' + idx).val();
                var classmap = jQuery(this.$el).closest('.bloks__component__box').find('.bloks-google-map').find('.' + this.class).attr('id');
                var gmap = new Bloks.Iframe.win.GoogleMaps();
                gmap.getLatLngAddress(classmap, this.map);
            }
        },
        removeAddress: function removeAddress(item, idx) {
            if (this.map.length == 1) return false;
            this.map.$remove(item);
            var classmap = jQuery(this.$el).closest('.bloks__component__box').find('.bloks-google-map').find('.' + this.class).attr('id');
            var gmap = new Bloks.Iframe.win.GoogleMaps();
            gmap.getLatLngAddress(classmap, this.map);
            if (this.map.length == 1) {
                (0, _jquery2.default)(this.$el).find('.delete-address').addClass('not-allowed');
            } else {
                (0, _jquery2.default)(this.$el).find('.delete-address').removeClass('not-allowed');
            }
        },
        removeIcon: function removeIcon(item, idx) {
            item.icon = '';
            var classmap = jQuery(this.$el).closest('.bloks__component__box').find('.bloks-google-map').find('.' + this.class).attr('id');
            var url = 'http://bloks.co/demo_images/map-default.png';
            var gmap = new Bloks.Iframe.win.GoogleMaps();
            gmap.changeIconMarker(classmap, idx, url);
        },
        editIcon: function editIcon(item, idx) {
            this.showMediaModal(item, idx);
        },
        showMediaModal: function showMediaModal(item, idx) {
            var frame = void 0;
            var self = this;
            if (frame) {
                frame.open();return;
            }
            frame = Bloks.Iframe.win.wp.media({
                title: 'Select or Upload Media Of Your Chosen Persuasion',
                button: {
                    text: 'Use this media'
                },
                library: {
                    type: 'image' },
                multiple: false });
            frame.on('close', function () {});

            frame.on('select', function () {
                var attachment = frame.state().get('selection').first().toJSON();
                item.icon = attachment.url;

                var classmap = jQuery(self.$el).closest('.bloks__component__box').find('.bloks-google-map').find('.' + self.class).attr('id');
                var gmap = new Bloks.Iframe.win.GoogleMaps();
                gmap.changeIconMarker(classmap, idx, attachment.url);
            });
            frame.open();
        }
    }
});

/***/ }),
/* 144 */
/***/ (function(module, exports) {

module.exports = "\n<li class=\"bloks__setting__google-map bloks__dropdown\">\n    <a class=\"bloks-tooltip\" title=\"Setting Google Map\" href=\"javascript:void(0)\" data-type=\"dropdown\">\n        <span class=\"ibloks-map\"></span>\n    </a>\n    <div class=\"bloks__dropdown-content map-wrap\">\n        <h3 class=\"heading\">Google Map Settings</h3>\n        <ul class=\"map-content bloks-nice-scroll\">\n            <li v-for=\"(idx, item) in map\" class=\"list-address\">\n                <div v-if=\"item.icon\" v-on:click=\"editIcon(item, idx)\" class=\"image-map\">\n                    <div class=\"border-image\"> <img class=\"icon-marker\" alt=\"icon google map\" v-bind:src=\"item.icon\" title=\"Change marker\"></div>\n                     <div class=\"bor-imgdel\" v-on:click=\"removeIcon(item, idx)\" >\n                         <span class=\"ibloks-delete-thumb\" v-if=\"item.icon\" title=\"Delete marker\"></span>\n                     </div>\n                </div>\n               <div v-else v-on:click=\"editIcon(item, idx)\" class=\"upload-image-map\"><span title=\"Upload marker\">Select</span></div>\n                <div class=\"input-address\">\n                    <label>Address #{{idx+1}} (default)</label>\n                    <input v-on:keyup=\"enterKeyup\" data-index=\"{{idx}}\"\n                           v-on:blur=\"findAddress(item, idx)\"\n                           title=\"{{item.title}}\"\n                           placeholder=\"Search your address\"\n                           value=\"{{item.title}}\"\n                           class=\"address-{{idx}}\" name=\"address\" type=\"text\">\n                </div>\n                <div href=\"javascript:void(0)\" class=\"delete-address\">\n                    <span v-on:click=\"removeAddress(item, idx)\"><i class=\"ibloks-remove\" aria-hidden=\"true\" title=\"Remove address\"></i></span>\n                </div>\n            </li>\n        </ul>\n        <div class=\"map-btn\">\n            <a href=\"javascript:void(0);\" class=\"new-address\" title=\"Add New Address\">Add New Address</a>\n        </div>\n    </div>\n</li>\n";

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(146)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] dev/web/js/builder/components/settings/position.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(147)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-54ca4b28/position.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _vue2.default.component('bloks-position-settings', {
    props: ['position'],
    ready: function ready() {
        var el = this.$el;
        var self = this;
        (0, _jquery2.default)(el).find('input[type="radio"]').click(function () {
            if (this.value.search('left') > 1) {
                self.position.buttonalign = 'bloks__button-left';
            }
            if (this.value.search('center') > 1) {
                self.position.buttonalign = 'bloks__button-center';
            }
            if (this.value.search('right') > 1) {
                self.position.buttonalign = 'bloks__button-right';
            }
        });
        (0, _jquery2.default)(el).find('input[type="number"]').on("mouseup mousewheel keyup keypress", function (evt) {
            if (this.value > 2000) this.value = 2000;
            if (this.value < 0) this.value = 0;
            evt = evt ? evt : window.event;
            var charCode = evt.which ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                return false;
            }
            return true;
        });
    }
});

/***/ }),
/* 147 */
/***/ (function(module, exports) {

module.exports = "\n<li class=\"cover-positon bloks__dropdown\">\n    <a href=\"javascript:void(0)\" data-type=\"dropdown\" title=\"Position Settings\" class=\"bloks-tooltip\">\n        <span class=\"ibloks-change-layout\"></span>\n    </a>\n    <div class=\"bloks__dropdown-content\">\n        <h3 class=\"heading\">Change Layout</h3>\n        <ul class=\"grid-radio\">\n            <li class=\"left-top\" v-bind:class=\"{ active: position.class == 'bloks__position-top-left' }\">\n                <label>\n                    <input type=\"radio\" v-model=\"position.class\" value=\"bloks__position-top-left\"/>\n                    <p class=\"ibloks-left\"></p>\n                </label>\n            </li>\n            <li class=\"center-top\" v-bind:class=\"{ active: position.class == 'bloks__position-top-center' }\">\n                <label>\n                    <input type=\"radio\" v-model=\"position.class\" value=\"bloks__position-top-center\"/>\n                    <p class=\"ibloks-mid\"></p>\n                </label>\n            </li>\n            <li class=\"right-top\" v-bind:class=\"{ active: position.class == 'bloks__position-top-right' }\">\n                <label>\n                    <input type=\"radio\" v-model=\"position.class\" value=\"bloks__position-top-right\"/>\n                    <p class=\"ibloks-right\"></p>\n                </label>\n            </li>\n            <li class=\"left-middle\" v-bind:class=\"{ active: position.class == 'bloks__position-middle-left' }\">\n                <label>\n                    <input type=\"radio\" v-model=\"position.class\" value=\"bloks__position-middle-left\"/>\n                    <p class=\"ibloks-left\"></p>\n                </label>\n            </li>\n            <li class=\"center-middle\" v-bind:class=\"{ active: position.class == 'bloks__position-middle-center' }\">\n                <label>\n                    <input type=\"radio\" v-model=\"position.class\" value=\"bloks__position-middle-center\"/>\n                    <p class=\"ibloks-mid\"></p>\n                </label>\n            </li>\n            <li class=\"right-middle\" v-bind:class=\"{ active: position.class == 'bloks__position-middle-right' }\">\n                <label>\n                    <input type=\"radio\" v-model=\"position.class\" value=\"bloks__position-middle-right\"/>\n                    <p class=\"ibloks-right\"></p>\n                </label>\n            </li>\n            <li class=\"left-bottom\" v-bind:class=\"{ active: position.class == 'bloks__position-bottom-left' }\">\n                <label>\n                    <input type=\"radio\" v-model=\"position.class\" value=\"bloks__position-bottom-left\"/>\n                    <p class=\"ibloks-left\"></p>\n                </label>\n            </li>\n            <li class=\"center-bottom\" v-bind:class=\"{ active: position.class == 'bloks__position-bottom-center' }\">\n                <label>\n                    <input type=\"radio\" v-model=\"position.class\" value=\"bloks__position-bottom-center\"/>\n                    <p class=\"ibloks-mid\"></p>\n                </label>\n            </li>\n            <li class=\"right-bottom\" v-bind:class=\"{ active: position.class == 'bloks__position-bottom-right' }\">\n                <label>\n                    <input type=\"radio\" v-model=\"position.class\" value=\"bloks__position-bottom-right\"/>\n                    <p class=\"ibloks-right\"></p>\n                </label>\n            </li>\n            <div class=\"text-description\">Position text to change layout</div>\n        </ul>\n        <div class=\"show-content\">\n            <ul class=\"feature-settings\">\n                <li>\n                    <span class=\"title-hero\">Header:</span>\n                    <label class=\"toggle-switcher\">\n                        <input v-model=\"position.header\" type=\"checkbox\">\n                        <span class=\"slider round\"></span>\n                    </label>\n                </li>\n                <li>\n                    <span class=\"title-hero\">Description:</span>\n                    <label class=\"toggle-switcher\">\n                        <input v-model=\"position.description\" type=\"checkbox\">\n                        <span class=\"slider round\"></span>\n                    </label>\n                </li>\n                <li>\n                    <span class=\"title-hero\">Button:</span>\n                    <label class=\"toggle-switcher\">\n                        <input v-model=\"position.button\" type=\"checkbox\">\n                        <span class=\"slider round\"></span>\n                    </label>\n                </li>\n                <li>\n                    <span class=\"text-media-height\">Height cover:</span>\n                    <div class=\"bloks__before-px\">\n                        <input type=\"number\" min=\"0\" max=\"2000\" v-model=\"position.height\" class=\"cover-media-height\"/>\n                    </div>\n                </li>\n            </ul>\n        </div>\n    </div>\n</li>\n";

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(149)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] dev/web/js/builder/components/settings/size.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(150)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-74ce7180/size.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.component('bloks-size-settings', {
    props: {
        'size': {
            type: Object | Array,
            required: true
        }
    },
    template: '',
    watch: {
        size: function size() {
            var el = this.$el;
            var self = this;
            (0, _jquery2.default)(el).find('.full-image').click(function () {
                self.size.size = 'image-full';
            });
            (0, _jquery2.default)(el).find('.small-image').click(function () {
                self.size.size = "image-small";
            });
            (0, _jquery2.default)(el).find('.change-full-video').click(function () {
                self.size.size = 'full-video';
            });
            (0, _jquery2.default)(el).find('.change-small-video').click(function () {
                self.size.size = "small-video";
            });
        }
    },
    ready: function ready() {
        var el = this.$el;
        var self = this;
        var $ = jQuery;

        $(el).find('.full-image').click(function () {
            self.size.size = 'image-full';
        });
        $(el).find('.small-image').click(function () {
            self.size.size = "image-small";
        });
        $(el).find('.change-full-video').click(function () {
            self.size.size = 'full-video';
        });
        $(el).find('.change-small-video').click(function () {
            self.size.size = "small-video";
        });
    }
});

/***/ }),
/* 150 */
/***/ (function(module, exports) {

module.exports = "\n<li class=\"element-tools tool-image bloks__dropdown\">\n    <a href=\"javascript:void(0)\" data-toggle=\"dropdown\">\n        <span class=\"ibloks-size\"></span>\n    </a>\n    <div class=\"bloks__dropdown-content\">\n        <ul v-if=\"size.type == 'image'\">\n            <li><a class=\"full-image close-popover\" href=\"javascript:void(0)\">Full Image</a></li>\n            <li><a class=\"small-image close-popover\" href=\"javascript:void(0)\">Small Image</a></li>\n        </ul>\n        <ul v-if=\"size.type == 'video'\">\n            <li><a class=\"change-full-video close-popover\" href=\"javascript:void(0)\">Full Video</a></li>\n            <li><a class=\"change-small-video close-popover\" href=\"javascript:void(0)\">Small Video</a></li>\n        </ul>\n    </div>\n</li>\n";

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(152)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] dev/web/js/builder/components/settings/tabsposition.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(153)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-2daa33b4/tabsposition.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _vue2.default.component('bloks-tabsposition-settings', {
    props: ['tabsposition']
});

/***/ }),
/* 153 */
/***/ (function(module, exports) {

module.exports = "\n<li class=\"tab-position bloks__dropdown\">\n    <a href=\"javascript:void(0)\" data-type=\"dropdown\" title=\"Position Settings\" class=\"bloks-tooltip\">\n        <span class=\"ibloks-change-layout\"></span>\n    </a>\n    <div class=\"bloks__dropdown-content\">\n        <h3 class=\"heading\">Change Layout</h3>\n        <ul class=\"grid-radio-tab \">\n            <li class=\"center-top\" v-bind:class=\"{ active: tabsposition.class == 'tabs-horizontal-top' }\">\n                <label>\n                    <input type=\"radio\" v-model=\"tabsposition.class\" value=\"tabs-horizontal-top\"/>\n                    <span class=\"ibloks-tabtop\"></span>\n                    <span class=\"text\">Top</span>\n                </label>\n            </li>\n            <li class=\"left-middle\" v-bind:class=\"{ active: tabsposition.class == 'tabs-vertical-left' }\">\n                <label>\n                    <input type=\"radio\" v-model=\"tabsposition.class\" value=\"tabs-vertical-left\"/>\n                    <span class=\"ibloks-tableft\"></span>\n                    <span class=\"text\">Left</span>\n                </label>\n            </li>\n            <li class=\"right-middle\"\n                v-bind:class=\"{ active: tabsposition.class == 'tabs-vertical-right' }\">\n                <label>\n                    <input type=\"radio\" v-model=\"tabsposition.class\" value=\"tabs-vertical-right\"/>\n                    <span class=\"ibloks-tabright\"></span>\n                    <span class=\"text\">Right</span>\n                </label>\n            </li>\n            <li class=\"center-bottom\"\n                v-bind:class=\"{ active: tabsposition.class == 'tabs-horizontal-bot' }\">\n                <label>\n                    <input type=\"radio\" v-model=\"tabsposition.class\" value=\"tabs-horizontal-bot\"/>\n                    <span class=\"ibloks-tabbot\"></span>\n                    <span class=\"text\">Bottom</span>\n                </label>\n            </li>\n        </ul>\n    </div>\n</li>\n";

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(155)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] dev/web/js/builder/components/settings/widget.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(156)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-262ed483/widget.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _vue2.default.component('bloks-widget-settings', {
    data: function data() {
        return {
            types: Bloks.Settings.widgets
        };
    },
    props: {
        'widget': {
            type: Object,
            required: true
        }
    },
    ready: function ready() {
        this.getWidgetForm();
    },
    methods: {
        getWidgetForm: function getWidgetForm() {
            var self = this;
            var widgetObject = _underscore2.default.clone(this.widget);
            delete widgetObject.type;

            var data = {
                action: 'bloks-get-widget-form',
                type: this.widget.type,
                default: widgetObject
            };

            jQuery.ajax(Bloks.Settings.ajax, {
                method: "POST",
                data: data,
                dataType: 'JSON'
            }).done(function (response) {
                if (data.error) {
                    alert(response.error_msg);
                } else {
                    jQuery(this.$el).find('.widget-form').html(response.html);
                    this.updateWidget();
                    jQuery(this.$el).find('.widget-form').find('input, textarea, select').on('keyup change', this.updateWidget);
                }
            }.bind(this));
        },
        updateWidget: function updateWidget() {
            var widget = {
                type: this.widget.type
            };
            _underscore2.default.each(jQuery(this.$el).find('.widget-form').serializeArray(), function (input) {
                widget[input.name] = input.value;
            });

            this.widget = widget;
        }
    }
});

/***/ }),
/* 156 */
/***/ (function(module, exports) {

module.exports = "\n<li class=\"widgetbox bloks__dropdown\">\n    <a href=\"javascript:void(0)\" data-type=\"dropdown\">\n        <i class=\"ibloks-widget\" aria-hidden=\"true\"></i>\n    </a>\n    <div class=\"bloks__dropdown-content\">\n        <div class=\"form-group widget-selectbox\">\n            <div class=\"border-select\">\n                <select class=\"form-control\" name=\"type\" v-model=\"widget.type\" @change=\"getWidgetForm\">\n                    <option v-for=\"type in types\" v-bind:value=\"type.value\">{{type.text}}</option>\n                </select>\n            </div>\n            <form class=\"widget-form\"></form>\n        </div>\n    </div>\n</li>\n";

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(158);

__webpack_require__(159);

__webpack_require__(160);

__webpack_require__(161);

__webpack_require__(162);

__webpack_require__(163);

__webpack_require__(164);

__webpack_require__(165);

__webpack_require__(166);

__webpack_require__(167);

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Register a global custom directive called v-settings
_vue2.default.directive('col', {
    priority: 1,
    update: function update(data) {
        var self = this;
        if ((0, _jquery2.default)(self.el).find('.grid-col-component-box').length == 0) {
            setTimeout(function () {
                var tool = '<div data-uid="' + self.vm._uid + '" class="grid-col-component-box grid-col-component-box-' + self.vm.$options.name + ' animated fadeIn">' + '<div class="grid-col-component-box-header">' + '<ul class="col-elements">' + '<li>' + '<a class="grid-move-left" href="javascript:void(0)" data-placement="bottom">' + '<span class="ibloks-mid-left"></span>' + '</a>' + '</li>';
                _underscore2.default.each(_underscore2.default.keys(data), function (value) {
                    tool += '<bloks-' + value + '-settings :' + value + '.sync=' + data[value] + '></bloks-' + value + '-settings>';
                });
                tool += '<li>' + '<a class="grid-move-right" href="javascript:void(0)" data-placement="bottom">' + '<span class="ibloks-mid-right"></span>' + '</a>' + '</li>' + '</ul>' + '</div>' + '</div>';
                tool = (0, _jquery2.default)(tool);
                (0, _jquery2.default)(self.el).prepend(tool);
                this.vm.$compile(Bloks.Iframe.$el);
                this.resetMoveLeftRight();
                tool.find('.grid-move-left').click(function () {
                    self.moveLeft();
                });
                tool.find('.grid-move-right').click(function () {
                    self.moveRight();
                });

                tool.parent().on('click', function () {
                    self.active();
                });

                /**
                 * Remove animate class fix z-index issue
                 */
                (0, _jquery2.default)(self.el).find('.grid-col-component-box').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    (0, _jquery2.default)(this).removeClass('animated fadeIn');
                });

                /**
                 * Fix popover issue
                 */
                (0, _jquery2.default)(Bloks.Iframe.doc).mousedown(function (e) {
                    var container = (0, _jquery2.default)(self.el);
                    if (!container.is(e.target) && container.has(e.target).length === 0) {
                        (0, _jquery2.default)(self.el).closest('.grid-cols').removeClass('in');
                    }
                });
            }.bind(this), 0);
        }
    },
    active: function active() {
        this.resetMoveLeftRight();
        Bloks.Iframe.win.jQuery('.grid-cols').removeClass('in');
        (0, _jquery2.default)(this.el).closest('.grid-cols').addClass('in');
    },
    getNext: function getNext() {
        return (0, _jquery2.default)(this.el).closest('.grid-cols').next('.grid-cols');
    },
    getPrev: function getPrev() {
        return (0, _jquery2.default)(this.el).closest('.grid-cols').prev('.grid-cols');
    },
    moveLeft: function moveLeft() {
        var prev = this.getPrev();
        this.updateDataMove(prev);
        this.resetMoveLeftRight();
    },
    moveRight: function moveRight() {
        var next = this.getNext();
        this.updateDataMove(next);
        this.resetMoveLeftRight();
    },
    resetMoveLeftRight: function resetMoveLeftRight() {
        var self = this;
        setTimeout(function () {
            if (self.getNext().length) {
                (0, _jquery2.default)(self.el).find('.grid-move-right').parent().removeClass('hide');
                (0, _jquery2.default)(self.el).find('.grid-col-component-box-header').addClass('has-right');
            } else {
                (0, _jquery2.default)(self.el).find('.grid-move-right').parent().addClass('hide');
                (0, _jquery2.default)(self.el).find('.grid-col-component-box-header').removeClass('has-right');
            }

            if (self.getPrev().length) {
                (0, _jquery2.default)(self.el).find('.grid-move-left').parent().removeClass('hide');
                (0, _jquery2.default)(self.el).find('.grid-col-component-box-header').addClass('has-left');
            } else {
                (0, _jquery2.default)(self.el).find('.grid-move-left').parent().addClass('hide');
                (0, _jquery2.default)(self.el).find('.grid-col-component-box-header').removeClass('has-left');
            }

            //self.updateStyles();
        });
    },
    updateDataMove: function updateDataMove(next) {
        var index = (0, _jquery2.default)(this.el).find('input[name="index"]').val();
        var nextindex = (0, _jquery2.default)(next).find('input[name="index"]').val();

        (0, _jquery2.default)(this.el).find('input[name="index"]').val(nextindex);
        (0, _jquery2.default)(next).find('input[name="index"]').val(index);

        var tmp = this.vm.grid[index];
        this.vm.grid.$set(index, this.vm.grid[nextindex]);
        this.vm.grid.$set(nextindex, tmp);
    },
    updateStyles: function updateStyles() {
        var self = this;
        setTimeout(function () {
            var num = (0, _jquery2.default)(self.el).find('.col-elements > li').not('.hide').length;
            var marginLeft = num * 50 / -2;
            (0, _jquery2.default)(self.el).find('.col-elements').css('margin-left', marginLeft + 'px');
        }, 0);
    },
    unbind: function unbind() {
        (0, _jquery2.default)(this.el).find('.grid-col-component-box').parent().find('input[type="hidden"]').remove();
        (0, _jquery2.default)(this.el).find('.grid-col-component-box').remove();
    }
});

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Register a global custom directive called v-destroy
_vue2.default.directive('destroy', {
    unbind: function unbind() {
        jQuery(this.el).remove();
    }
});

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ALLOWED_KEYS_ON_MAX_LENGTH = [8, 13, 16, 17, 18, 20, 33, 34, 35, 36, 37, 38, 39, 40, 46];
// Register a global custom directive called v-editable
_vue2.default.directive('editable', {
    twoWay: true,
    update: function update(value) {
        var self = this;
        var maxleng = (0, _jquery2.default)(this.el).data('maxleng');
        if (maxleng != undefined) {
            (0, _jquery2.default)(this.el).on('keydown', function (e) {
                if (e.keyCode == 13) {
                    return false;
                }
                if ((0, _jquery2.default)(this).text().length > maxleng && ALLOWED_KEYS_ON_MAX_LENGTH.indexOf(e.keyCode) === -1) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            });
            (0, _jquery2.default)(this.el).on('paste', function (e) {
                var clipboardData = e.clipboardData || e.originalEvent.clipboardData || window.clipboardData;
                var pastedData = clipboardData.getData('text');
                if (pastedData.length + (0, _jquery2.default)(this).text().length > maxleng) {
                    return false;
                }
            });
        }
        if (_underscore2.default.isObject(value)) {
            (0, _jquery2.default)(this.el).attr('contenteditable', true);

            (0, _jquery2.default)(this.el).on('keydown', function (event) {
                var keycode = event.keyCode ? event.keyCode : event.which;
                if (keycode == 13) {
                    event.preventDefault();
                    if ((0, _jquery2.default)(this).text() != "") {
                        value.label = (0, _jquery2.default)(this).text();
                        value.name = self.regenFieldname((0, _jquery2.default)(this).text(), ' ', '_');

                        if ((0, _jquery2.default)(self.el).parent().find('textarea').eq(0)) (0, _jquery2.default)(self.el).parent().find('textarea').eq(0).attr('placeholder', (0, _jquery2.default)(this).text());
                        if ((0, _jquery2.default)(self.el).parent().find('input').eq(0)) (0, _jquery2.default)(self.el).parent().find('input').eq(0).attr('placeholder', (0, _jquery2.default)(this).text());
                    }
                }
                if ((0, _jquery2.default)(this).text() == "") {
                    (0, _jquery2.default)(self.el).text(value.label);
                }
            }).on('blur', function (event) {
                if ((0, _jquery2.default)(this).text() != "") {
                    value.label = (0, _jquery2.default)(this).text();
                    value.name = self.regenFieldname((0, _jquery2.default)(this).text(), ' ', '_');
                    if ((0, _jquery2.default)(self.el).parent().find('textarea').eq(0)) (0, _jquery2.default)(self.el).parent().find('textarea').eq(0).attr('placeholder', (0, _jquery2.default)(this).text());
                    if ((0, _jquery2.default)(self.el).parent().find('input').eq(0)) (0, _jquery2.default)(self.el).parent().find('input').eq(0).attr('placeholder', (0, _jquery2.default)(this).text());
                } else {
                    (0, _jquery2.default)(self.el).text(value.label);
                }
            });
        } else {
            (0, _jquery2.default)(this.el).attr('contenteditable', true);
            (0, _jquery2.default)(this.el).empty().append(_underscore2.default.unescape(value));
            (0, _jquery2.default)(this.el).on('keyup', function () {
                self.set(_underscore2.default.escape((0, _jquery2.default)(this).html()));
            });
        }
    },
    regenFieldname: function regenFieldname(str, strFind, strReplace) {
        str = str.toLowerCase();
        str = str.replace(/[^A-Z0-9]+/ig, " ");

        var temp = str;
        var index = temp.indexOf(strFind);

        while (index != -1) {
            temp = temp.replace(strFind, strReplace);
            index = temp.indexOf(strFind);
        }
        return temp;
    },
    unbind: function unbind() {
        (0, _jquery2.default)(this.el).removeAttr('contenteditable');
    }
});

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Register a global custom directive called v-form
_vue2.default.directive('form', {
    priority: 1,
    twoWay: true,
    bind: function bind() {},
    update: function update(data) {
        var self = this;
        setTimeout(function () {
            var tool = '';
            tool += '' + '<button id="edit-form-' + this.vm.id + '" type="button" class="btn-edit-form">' + '<span class="ibloks-setting"></span>' + '</button>' + '<div class="modal_setting_form" id="build-form-' + this.vm.id + '" style="display: none;">' + '<div class="modal-template modal-dialog full-screen">' + '<div class="modal-content">' + '<div class="modal-header">' + '<button type="button" class="close-form" data-dismiss="modal" aria-label="Close"><span class="ibloks-cancel"></span></button>' + '<h4 class="modal-title">Form Settings</h4>' + '</div>' + '<div class="modal-body" style="">' + '<div class="wrap-field bloks-nice-scroll">' + '<div class="form-editor-header">Edit Fields</div>';
            _underscore2.default.each(_underscore2.default.keys(data), function (value) {
                var item = data[value];
                tool += self.getElementHtml(item);
            });

            tool += '</div>' + '<div class="formOverlay-add-input form-group">' + '<div class="col-sm-12" style="padding:0"><a class="text-center add-field"><span class="ibloks-plus"></span> Add Field </a></div>' + '</div>' + '<div class="form-editor-header">Edit Button</div>' + '<div class="formOverlay-inputButton">' + '<div class="bloks__form__edit-button" data-key="button_submit">' + '<div class="bloks__form__edit-button-text">' + '<label>Button Name:</label>' + '<input class="button-text" placeholder="Enter button text" type="text" value="' + this.vm.btnmore.name + '">' + '</div>' + '<div class="bloks__form__edit-button-link">' + '<label>Link Button:</label>' + '<input class="button-href" type="text" placeholder="Extra submission link" value="' + this.vm.btnmore.link + '">' + '</div>' + '</div>' + '</div>' + '</div>' + '<div class="modal-footer">' + '<button type="button" class="form-btn-close">Close</button>' + '<button type="button" class="form-save-changes">Save changes</button>' + '</div>' + '</div>' + '</div>' + '<div class="bg-form modal-bg"></div>' + '</div>';

            tool = (0, _jquery2.default)(tool);
            (0, _jquery2.default)(self.el).find('.blok-edit-form').html(tool);

            (0, _jquery2.default)(self.el).find(".bloks-nice-scroll").niceScroll({
                cursorwidth: 8,
                cursoropacitymin: 0.4,
                cursorcolor: '#FC9553',
                cursorborder: 'none',
                cursorborderradius: 3,
                autohidemode: 'leave',
                background: '#c7c7c7'
            });

            // click button edit form
            (0, _jquery2.default)(self.el).find('#edit-form-' + self.vm.id).click(function () {
                (0, _jquery2.default)(this).parent().find('#build-form-' + self.vm.id).css('display', 'inline-block');

                // fix autoload Content Modal
                self.autoloadContentModal();

                // hide builder-header
                self.hideBuildHeader();
            });

            // hover form
            Bloks.Iframe.win.jQuery(this.el).closest('.bloks__component__bloks-form').find('.form-container').on('hover', function () {
                (0, _jquery2.default)(this).find('.bloks-formmail').addClass('blok-form-hovering');
            }).on('mouseleave', function () {
                (0, _jquery2.default)(this).find('.bloks-formmail').removeClass('blok-form-hovering');
            }).on('dblclick', function () {
                (0, _jquery2.default)(this).find('#build-form-' + self.vm.id).css('display', 'inline-block');;

                self.autoloadContentModal();
                self.hideBuildHeader();
            }).on('click', function () {
                (0, _jquery2.default)(this).find('.blok-edit-form').css('display', 'inline-block');
                (0, _jquery2.default)(this).find('.bloks-formmail').addClass('blok-form-focusing');
            });

            // hide button edit form
            (0, _jquery2.default)(Bloks.Iframe.doc).mousedown(function (e) {
                //find('.bloks__component__bloks-form').
                var container = (0, _jquery2.default)(self.el);
                if (!container.is(e.target) // if the target of the click isn't the container...
                && container.has(e.target).length === 0) // ... nor a descendant of the container
                    {
                        if ((0, _jquery2.default)(self.el).closest('.bloks__component__bloks-form').find('.form-container').find('.blok-edit-form').find('#build-form-' + self.vm.id).css('display') == 'none') {
                            (0, _jquery2.default)(self.el).closest('.bloks__component__bloks-form').find('.form-container').find('.blok-edit-form').fadeOut(300);
                            (0, _jquery2.default)(self.el).closest('.bloks__component__bloks-form').find('.form-container').find('.blok-edit-form').find('.modal_setting_form').fadeOut(300);
                            (0, _jquery2.default)(self.el).closest('.bloks__component__bloks-form').find('.form-container').find('.bloks-formmail').removeClass('blok-form-focusing');
                        }
                    }
            });

            // change type field
            (0, _jquery2.default)(tool).find('.wrap-field').find('.form-group').find('.col-sm-3').find('select').on('change', function () {
                self.changeField(this);
            });

            // new field
            (0, _jquery2.default)(tool).find('.add-field').click(function () {
                var newElement = self.addField();
                var newtool = (0, _jquery2.default)(tool).find('.wrap-field').append(newElement);

                // remove new field
                (0, _jquery2.default)(tool).find('.col-sm-5').find('.remove').click(function (event) {
                    event.stopPropagation();
                    event.stopImmediatePropagation();
                    (0, _jquery2.default)(this).parent().parent().remove();
                    self.autoloadContentModal();
                });

                // change type for new element
                (0, _jquery2.default)(newtool).find('.col-sm-3').find('select').on('change', function () {
                    self.changeField(this);
                });

                // fix autoload Content Modal
                self.autoloadContentModal();
            });

            // close form
            (0, _jquery2.default)(tool).find('.modal-header .close-form, .modal-footer .btn-close').click(function () {
                self.activeBuildHeader();
            });

            // click btn close form
            (0, _jquery2.default)(tool).find('.close-form').click(function () {
                self.closeFormSettings(this);
            });
            (0, _jquery2.default)(tool).find('.form-btn-close').click(function () {
                self.closeFormSettings(this);
            });

            // save-changes
            (0, _jquery2.default)(tool).find('.form-save-changes').click(function () {
                // save button
                var buttonField = (0, _jquery2.default)(tool).find('.formOverlay-inputButton').find('.form-group').find('.col-sm-6').find('input.button-text').val();
                self.vm.btnmore.name = buttonField;

                // save link
                var linksubmit = (0, _jquery2.default)(tool).find('.formOverlay-inputButton').find('.form-group').find('.col-sm-6').find('input.button-href').val();
                self.vm.btnmore.link = self.validateUrl(linksubmit);

                // list field
                var elm = (0, _jquery2.default)(tool).find('.wrap-field').find('.form-group');
                var dataFields = [];
                elm.each(function () {
                    var typeField = (0, _jquery2.default)(this).find('.col-sm-3').find('.blok-field-select :selected').val();
                    var nameField = (0, _jquery2.default)(this).find('.col-sm-4').find('input[name=inputlabel]').val();
                    var checkboxField = (0, _jquery2.default)(this).find('.col-sm-4').find('input[name=inputcheckbox]').is(":checked");
                    var placeholderField = (0, _jquery2.default)(this).find('.col-sm-5').find('input').val();

                    var inputFields = ['name', 'email', 'phone', 'address', 'text'];
                    var areaFields = ['message', 'comment', 'custom_text'];

                    var optionType = '';
                    var optionAttr = '';
                    if (inputFields.indexOf(typeField) >= 0) {
                        optionType = 'text';
                        optionAttr = typeField;
                    } else if (areaFields.indexOf(typeField) >= 0) {
                        optionType = 'textarea';
                        optionAttr = typeField;
                    } else {
                        optionType = typeField;
                        optionAttr = typeField;
                    }

                    dataFields.push({
                        label: nameField,
                        name: self.regenFieldname(nameField, ' ', '_'),
                        type: optionType,
                        togglelabel: checkboxField,
                        data_attr: optionAttr,
                        placeholder: placeholderField
                    });
                });

                // save fields
                self.vm.fields = dataFields;

                (0, _jquery2.default)('#build-form-' + self.vm.id).hide();
                Bloks.Iframe.win.jQuery('.modal-backdrop').hide();

                self.autoloadContentModal();

                // active build header
                self.activeBuildHeader();
            });

            // remove field
            (0, _jquery2.default)(tool).find('.col-sm-5').find('.remove').click(function (event) {
                event.stopPropagation();
                event.stopImmediatePropagation();
                // if(confirm("Are you sure you want to delete this field?") == true) {}
                (0, _jquery2.default)(this).parent().parent().remove();

                self.autoloadContentModal();
            });
        }.bind(this), 0);
    },

    closeFormSettings: function closeFormSettings(elm) {
        (0, _jquery2.default)(elm).closest('.bloks__component__bloks-form').find('.form-container').find('.blok-edit-form').fadeOut(300);
        (0, _jquery2.default)(elm).closest('.bloks__component__bloks-form').find('.form-container').find('.blok-edit-form').find('.modal_setting_form').fadeOut(300);
        (0, _jquery2.default)(elm).closest('.bloks__component__bloks-form').find('.form-container').find('.bloks-formmail').removeClass('blok-form-focusing');

        // active build header
        this.activeBuildHeader();
    },

    activeBuildHeader: function activeBuildHeader() {
        // jQuery(Bloks.Common.$el).find('.bloks__overlay').css('display', 'block' );
        jQuery(Bloks.Common.$el).find('.bloks__header').css({ 'zIndex': '', 'opacity': 1 });
        jQuery(Bloks.Common.$el).find('.bloks__canvas').css('display', 'block');
        jQuery(Bloks.Common.$el).find('iframe').contents().find('body').css('overflow', '');
    },

    hideBuildHeader: function hideBuildHeader() {
        // jQuery(Bloks.Common.$el).find('.bloks__overlay').css('display', 'none' );
        jQuery(Bloks.Common.$el).find('.bloks__header').css({ 'zIndex': 0, 'opacity': 0.5 });
        jQuery(Bloks.Common.$el).find('.bloks__canvas').css('display', 'none');
        jQuery(Bloks.Common.$el).find('iframe').contents().find('body').css('overflow', 'hidden');
    },

    autoloadContentModal: function autoloadContentModal() {
        var contentModal = (0, _jquery2.default)(this.el).find('#build-form-' + this.vm.id).find('.full-screen').find('.modal-content');
        var totalField = (0, _jquery2.default)(contentModal).find('.modal-body').find('.wrap-field').find('.form-group').length;
        if (totalField > 3) {
            (0, _jquery2.default)(contentModal).css('height', '750px');
            (0, _jquery2.default)(contentModal).find('.modal-body').css('height', '600px');
            (0, _jquery2.default)(contentModal).find('.modal-body').css('padding-bottom', '0');
            (0, _jquery2.default)(contentModal).find('.modal-body').css('overflowY', 'scroll');
        } else {
            (0, _jquery2.default)(contentModal).css('height', 'auto');
            (0, _jquery2.default)(contentModal).find('.modal-body').css('height', 'auto');
            (0, _jquery2.default)(contentModal).find('.modal-body').css('overflowY', 'hidden');
            (0, _jquery2.default)(contentModal).find('.modal-body').css('padding-bottom', '65px');
        }
    },

    changeField: function changeField(elm) {
        var typeField = (0, _jquery2.default)(elm).children(":selected").text();
        var pval = '';
        if (elm.value == 'textarea') pval = 'comment';else if (elm.value == 'phone') pval = 'telephone';else pval = elm.value;

        (0, _jquery2.default)(elm).parent().parent().find('.col-sm-4').find('input').val(typeField);
        (0, _jquery2.default)(elm).parent().parent().find('.col-sm-5').find('input').val('Enter your ' + pval + ' here');
    },

    validateUrl: function validateUrl(str) {
        var url = str;
        if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0) {
            return url;
        } else {
            return 'http://' + url;
        }
    },

    addField: function addField() {
        var fieldtype = 'text';
        var data = {
            label: this.toTitleCase(fieldtype),
            name: this.regenFieldname(fieldtype, ' ', '_'),
            type: fieldtype,
            togglelabel: true,
            data_attr: fieldtype,
            placeholder: this.toTitleCase('Enter your text here')
        };

        return this.getElementHtml(data);
    },

    getElementHtml: function getElementHtml(item) {
        var attr_email = '';
        var attr_name = '';
        var attr_phone = '';
        var attr_text = '';
        var attr_address = '';
        var attr_comment = '';
        switch (item.data_attr) {
            case 'email':
                attr_email = 'selected="selected"';
                break;
            case 'name':
                attr_name = 'selected="selected"';
                break;
            case 'phone':
                attr_phone = 'selected="selected"';
                break;
            case 'text':
                attr_text = 'selected="selected"';
                break;
            case 'address':
                attr_address = 'selected="selected"';
                break;
            case 'textarea':
                attr_comment = 'selected="selected"';
                break;
            default:
                break;
        }

        // show - hide label
        var toglabel = '';
        if (item.togglelabel === true) toglabel = 'checked="checked"';

        var html = '';
        html += '' + '<div class="bloks__form-edit">' + '<div class="bloks__form-edit-type">' + '<label>Type:</label>' + '<select class="blok-field-select">' + '<option value="">Select Type</option>' + '<option value="email" ' + attr_email + '>E-Mail</option>' + '<option value="name" ' + attr_name + '>Name</option>' + '<option value="phone" ' + attr_phone + '>Telephone</option>' + '<option value="text" ' + attr_text + '>Text</option>' + '<option value="address" ' + attr_address + '>Address</option>' + '<option value="textarea" ' + attr_comment + '>Comment</option>' + '</select>' + '</div>' + '<div class="bloks__form-edit-label">' + '<label>Label:</label>' + '<input class="input-label" type="text" name="inputlabel" value="' + item.label + '" placeholder="Label">' + '<div class="checkbox_wrapper"><input class="input-checkbox" type="checkbox" name="inputcheckbox" ' + toglabel + '><label></label></div>' + '</div>' + '<div class="bloks__form-edit-placeholder">' + '<label>Placeholder:</label>' + '<input class="input-placeholder" type="text" style="float: left;" value="' + item.placeholder + '" placeholder="Placeholder">' + '<span class="remove ibloks-remove" style="float: left;"></span>' + '</div>' + '</div>';

        return html;
    },

    regenFieldname: function regenFieldname(str, strFind, strReplace) {
        str = str.toLowerCase();
        str = str.replace(/[^A-Z0-9]+/ig, " ");

        var temp = str;
        var index = temp.indexOf(strFind);

        while (index != -1) {
            temp = temp.replace(strFind, strReplace);
            index = temp.indexOf(strFind);
        }
        return temp;
    },

    toTitleCase: function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },

    unbind: function unbind() {
        jQuery(this.el).find('.form-col-component-box').remove();
    }
});

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Register a global custom directive called v-googlemap
_vue2.default.directive('googlemap', {
    twoWay: true,

    update: function update(data) {},
    unbind: function unbind() {
        (0, _jquery2.default)(this.el).find('.' + this.vm.classmap).children('div').remove();

        (0, _jquery2.default)(this.el).attr('data-classmap', this.vm.classmap);
        (0, _jquery2.default)(this.el).attr('data-markers', JSON.stringify(this.vm.address));
        (0, _jquery2.default)(this.el).attr('data-custommap', JSON.stringify(this.vm.styleMap));
    }
});

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Register a global custom directive called v-settings
_vue2.default.directive('settings', {
    update: function update(data) {
        var _this = this;

        this.vm.$on('on_before_delete', function () {
            if (_this.getPrev().length) {
                Bloks.Iframe.scrollTo(_this.getPrev());
                _this.active(_this.getPrev());
            }
        });

        var title = data.title;
        delete data.title;
        this.default_settings = this.vm.stylesDefault = _underscore2.default.clone(this.vm.styles);
        var self = this;
        // Initializing directly after destroying
        // didn't work. Wrapping it in a setTimeout
        // seems to do the trick.
        setTimeout(function () {
            (0, _jquery2.default)(this.el).wrap('<div data-uid="' + this.vm._uid + '" class="bloks__component__box animated fadeIn"></div>');
            var modal = '<bloks-modal classes="bloks__modal__delete-block" :show.sync="modal">\n                <template slot="title">Delete this Blok?</template>\n                <template slot="body"><span class="ibloks-warning left-content"></span><span class="right-content">You are about to remove this Blok. This action cannot be undone. Are you sure you want to go ahead?</span></template>\n                <template slot="footer">\n                    <button type="button" class="bloks__modal-btn bloks__modal__btn-save" @click="remove()">Delete</button>\n                    <button type="button" class="bloks__modal-btn bloks__modal__btn-close" @click="modal = false">Cancel</button>\n                </template>\n            </bloks-modal>';

            var tool = modal + '<div class="bloks__component__box-header has-' + (parseInt(_underscore2.default.keys(data).length) + 1) + '-items">' + '<h2>' + title + '</h2>' + '<div class="bloks__component__box-inner">' + '<ul>';
            _underscore2.default.each(_underscore2.default.keys(data), function (value) {
                if (_underscore2.default.isObject(data[value])) {
                    tool += '<bloks-' + value + '-settings';
                    _underscore2.default.each(data[value], function (val, key) {
                        if (key == 'sync') tool += ' :' + value + '.sync="' + val + '"';else {
                            if (_underscore2.default.isBoolean(val)) {
                                tool += ' :' + key + '="' + val + '"';
                            } else {
                                tool += ' ' + key + '="' + val + '"';
                            }
                        }
                    });
                    tool += '></bloks-' + value + '-settings>';
                } else {
                    tool += '<bloks-' + value + '-settings :' + value + '.sync=' + data[value] + '></bloks-' + value + '-settings>';
                }
            });
            tool += '<li class="box-line"><span class="ibloks-line"></span></li>';
            tool += '<li class="box-appearance bloks__dropdown">' + '<a href="javascript:void(0)" data-type="dropdown" title="Appearance" class="bloks-tooltip">' + '<span class="ibloks-appearance"></span>' + '</a>' + '<div class="secondary-toolbar">' + '<div class="secondary-toolbar-inner">' + '<ul>' + '<li>' + '<a href="javascript:void(0)" data-type="secondary">' + '<span>Color Sets</span>' + '</a>' + '<div class="bloks__dropdown-content">' + '<h3 class="heading">Color Sets</h3>' + '<ul class="colorsets">';
            _underscore2.default.each(Bloks.Settings.colorsets, function (colorset, name) {
                tool += '<li><a href="javascript:void(0)" title="' + colorset.title + '" data-set="' + name + '" data-class="' + colorset.class + '"';
                if (colorset.class == self.vm.colorset) tool += ' class="active"';
                tool += '><img src="' + colorset.preview + '" alt="' + colorset.title + '"/><span>' + colorset.title + '</span></a></li>';
            });
            tool += '</ul>' + '</div>' + '</li>' + '<li class="box-line"><span class="ibloks-line"></span></li>' + '<li class="bloks__background-settings">' + '<a href="javascript:void(0)" data-type="secondary">' + '<span>Background</span>' + '</a>' + '<div class="bloks__dropdown-content">' + '<h3 class="heading">Background Color</h3>' + '<ul class="bloks__background-content">' + '<li><div class="background-picker"></div></li>' + '<li>' + '<h3>Background Image</h3>' + '<div class="bloks-row-action">' + '<div class="row-inner-action" title="Add background image">' + '<a class="image-action" title="add background image"><span>Select Image</span></a>' + '<div class="wrap-image-tool hide">' + '<img class="image-action" src="' + this.vm.styles.backgroundImage + '" alt="image background" />' + '</div>' + '<a class="rm-image hide" title="Remove background image" href="javascript:void(0)"><span class="ibloks-delete-thumb"></span></a>' + '</div>' + '<div class="expand-row hide">' + '<span>Expand to next row:</span> <input type="number" min="0" max="10" class="form-control expand-background" value="' + this.vm.styles.expand + '" />' + '</div>' + '</div>' + '</li>' + '</ul>' + '</div>' + '</li>' + '<li class="box-line"><span class="ibloks-line"></span></li>' + '<li>' + '<a href="javascript:void(0)" data-type="secondary">' + '<span>Padding</span>' + '</a>' + '<div class="bloks__dropdown-content">' + '<ul class="padding-content">' + '<li class="padding-top"><div class="p-wrapper"><div class="bloks__before-px"><input type="number" min="-999" max="999" step="1" class="general-padding-top"/></div></div></li>' + '<li class="padding-middle">' + '<div class="p-wrapper">' + '<div class="p-inner"><div class="bloks__before-px"><input type="number" min="0" max="999" step="1" class="general-padding-left"/></div></div>' + '<div class="p-inner"><div class="bloks__before-px"><input type="number" min="0" max="999" step="1" class="general-padding-right" /></div></div>' + '</div>' + '</li>' + '<li class="padding-bottom"><div class="p-wrapper"><div class="bloks__before-px"><input type="number" min="-999" max="999" step="1" class="general-padding-bottom" /></div></div></li>' + '</ul>' + '</div>' + '</li>' + '<li class="box-line"><span class="ibloks-line"></span></li>' + '<li class="bor-resetall"><a title="Reset all settings" class="resetall bloks-tooltip" href="javascript:void(0);"><i class="ibloks-reset"></i></a></li>' + '</ul>' + '</div>' + '</div>' + '</li>' + '<li class="general bloks__dropdown">' + '<a href="javascript:void(0)" title="General Settings" class="bloks-tooltip" data-type="dropdown">' + '<span class="ibloks-more"></span>' + '</a>' + '<div class="bloks__dropdown-content">' + '<ul>' + '<li class="toolbar-element">' + '<a class="up" href="javascript:void(0)">' + '<span>Move up</span>' + '</a>' + '</li>' + '<li class="toolbar-element">' + '<a class="down" href="javascript:void(0)">' + '<span>Move down</span>' + '</a>' + '</li>' + '<li class="toolbar-element">' + '<a class="duplicate" href="javascript:void(0)">' + '<span>Duplicate</span>' + '</a>' + '</li>' + '</ul>' + '</div>' + '</li>' + '<li class="box-line"><span class="ibloks-line"></span></li>' + '<li>' + '<a class="remove bloks-tooltip" title="Remove" href="javascript:void(0)">' + '<span class="ibloks-remove"></span>' + '</a>' + '</li>' + '</ul>' + '</div>' + '</div>';
            (0, _jquery2.default)(tool).insertBefore((0, _jquery2.default)(this.el));
            (0, _jquery2.default)(this.el).prepend('<div class="bloks__block-background" style="background-color: ' + self.vm.styles.backgroundColor + '"></div>');
            (0, _jquery2.default)(this.el).prop('id', this.vm.id);
            this.vm.$compile(Bloks.Iframe.$el);

            // Reset move cols
            this.resetMoveActions();
            this.checkDefault();

            Bloks.Iframe.win.jQuery(this.el).closest('.bloks__component__box').find('.bloks-tooltip').tooltipster({
                theme: 'bloks__tooltip-content'
            });

            (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('input[type="number"]').keydown(function (e) {
                // Allow: backspace, delete, tab, escape, enter and .
                // if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                //     // Allow: Ctrl+A, Command+A
                //     (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                //     // Allow: home, end, left, right, down, up
                //     (e.keyCode >= 35 && e.keyCode <= 40)) {
                //     // let it happen, don't do anything
                //     return;
                // }
                // // Ensure that it is a number and stop the keypress
                // if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                //     e.preventDefault();
                // }
                // Not allow e, ., +
                if (e.keyCode == 69 || e.keyCode == 110 || e.keyCode == 190 || e.keyCode == 107 || e.keyCode == 187) {
                    e.preventDefault();
                }
            });

            // auto fix builder margin
            this.autoFixBuildMargin();

            (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('.general-padding-top').on("mouseup mousewheel keyup", function () {
                if (this.value > 999) this.value = 999;
                if (this.value < -999) this.value = -999;
                self.vm.styles.paddingTop = this.value;
                if (self.vm.styles.paddingTop <= 0) {
                    self.vm.styles.marginTop = self.vm.styles.paddingTop;
                    (0, _jquery2.default)(self.el).parent().css('marginTop', self.vm.styles.marginTop + 'px');
                } else {
                    self.vm.styles.marginTop = 0;
                    (0, _jquery2.default)(self.el).parent().css('marginTop', self.vm.styles.marginTop + 'px');
                }
            });

            (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('.general-padding-right').on("mouseup mousewheel keyup", function () {
                if (this.value > 999) this.value = 999;
                self.vm.styles.paddingRight = this.value;
            });

            (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('.general-padding-bottom').on("mouseup mousewheel keyup", function () {
                if (this.value > 999) this.value = 999;
                if (this.value < -999) this.value = -999;
                self.vm.styles.paddingBottom = this.value;
                if (self.vm.styles.paddingBottom <= 0) {
                    self.vm.styles.marginBottom = self.vm.styles.paddingBottom;
                    (0, _jquery2.default)(self.el).parent().css('marginBottom', self.vm.styles.marginBottom + 'px');
                } else {
                    self.vm.styles.marginBottom = 0;
                    (0, _jquery2.default)(self.el).parent().css('marginBottom', self.vm.styles.marginBottom + 'px');
                }
            });

            (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('.general-padding-left').on("mouseup mousewheel keyup", function () {
                if (this.value > 999) this.value = 999;
                self.vm.styles.paddingLeft = this.value;
            });

            Bloks.Iframe.win.jQuery(self.el).closest('.bloks__component__box').find('.general-padding-top').val(self.vm.styles.paddingTop);
            Bloks.Iframe.win.jQuery(self.el).closest('.bloks__component__box').find('.general-padding-left').val(self.vm.styles.paddingLeft);
            Bloks.Iframe.win.jQuery(self.el).closest('.bloks__component__box').find('.general-padding-bottom').val(self.vm.styles.paddingBottom);
            Bloks.Iframe.win.jQuery(self.el).closest('.bloks__component__box').find('.general-padding-right').val(self.vm.styles.paddingRight);

            Bloks.Iframe.win.jQuery(this.el).closest('.bloks__component__box').find('.colorsets a').click(function () {
                Bloks.Iframe.win.jQuery(self.el).closest('.bloks__component__box').find('.colorsets a').removeClass('active');
                (0, _jquery2.default)(this).addClass('active');
                self.vm.colorset = (0, _jquery2.default)(this).data('class');

                if (self.vm.colorsets !== undefined) {
                    if (self.vm.colorsets[(0, _jquery2.default)(this).data('set')]) {
                        _underscore2.default.each(self.vm.colorsets[(0, _jquery2.default)(this).data('set')], function (val, key) {
                            self.vm.$set(key, val);

                            if (key === 'styles.backgroundColor') {
                                (0, _jquery2.default)(self.el).find('.bloks__block-background').css({ 'background-color': val });
                            }
                        });
                    }
                }
            });

            Bloks.Iframe.win.jQuery(this.el).closest('.bloks__component__box').find('.background-picker').colorpicker({
                color: self.vm.styles.backgroundColor
            }).on('change', function (e, data) {
                e.preventDefault();
                if (data) {
                    (0, _jquery2.default)(self.el).find('.bloks__block-background').css({ 'background-color': 'rgba(' + data.rgb.r + ', ' + data.rgb.g + ', ' + data.rgb.b + ', ' + data.rgb.a + ')' });
                    self.vm.styles.backgroundColor = 'rgba(' + data.rgb.r + ', ' + data.rgb.g + ', ' + data.rgb.b + ', ' + data.rgb.a + ')';
                }
            });

            (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('.bloks__dropdown-content .up').click(this.up.bind(this));
            (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('.bloks__dropdown-content .down').click(this.down.bind(this));
            (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('.bloks__dropdown-content .duplicate').click(this.clone.bind(this));
            (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('.remove').click(this.remove.bind(this));

            (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('.bloks__dropdown-content .toggle').click(function () {
                if ((0, _jquery2.default)(this).hasClass('in')) {
                    (0, _jquery2.default)(self.el).closest('.bloks__component__box').find('.bloks__dropdown-content .toolbar-element').css('display', 'block');
                    (0, _jquery2.default)(this).removeClass('in').addClass('out');
                } else {
                    (0, _jquery2.default)(self.el).closest('.bloks__component__box').find('.bloks__dropdown-content .toolbar-element').hide();
                    (0, _jquery2.default)(this).removeClass('out').addClass('in');
                }
            });

            (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('.image-action').click(function () {
                self.showMediaModal();
            });

            (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('.rm-image').click(function () {
                self.vm.styles.backgroundImage = "";
                (0, _jquery2.default)(self.el).closest('.bloks__component__box').find('a.image-action').removeClass('hide');
                (0, _jquery2.default)(self.el).closest('.bloks__component__box').find('.wrap-image-tool').addClass('hide');
                (0, _jquery2.default)(self.el).closest('.bloks__component__box').find('.rm-image').addClass('hide');
                (0, _jquery2.default)(self.el).closest('.bloks__component__box').find('.expand-row').addClass('hide');
                self.vm.styles.removeImage = true;
                self.vm.styles.changeImage = false;
                (0, _jquery2.default)(this).removeClass('bg-enable');
                self.compileExpand();
            });

            (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('.resetall').click(function () {
                self.reset();
            });

            (0, _jquery2.default)(this.el).closest('.bloks__component__box').click(function () {
                self.active(this);
            }).trigger('click');

            /**
             * Remove animate class fix z-index issue
             */
            (0, _jquery2.default)(this.el).closest('.bloks__component__box').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                (0, _jquery2.default)(this).removeClass('animated fadeIn');
            });

            /**
             * Boxed
             */
            // $(this.el).closest('.bloks__component__box').find('input[data-element="boxed"]').each( function(){
            //     let checked = true;
            //     if(self.vm.styles.classContainer == 'container-fullwidth') checked = false;
            //     $(this).prop('checked', checked);
            // });
            //
            // $(this.el).closest('.bloks__component__box').find('input[data-element="boxed"]').click(function () {
            //     if(this.checked)
            //         self.vm.styles.classContainer = 'container';
            //     else
            //         self.vm.styles.classContainer = 'container-fullwidth';
            // });

            (0, _jquery2.default)(Bloks.Iframe.doc).on('mousedown', function (e) {
                var container = (0, _jquery2.default)(self.el).closest('.bloks__component__box').find('.bloks__dropdown-content');
                var s_toolbar = (0, _jquery2.default)(self.el).closest('.bloks__component__box').find('.secondary-toolbar');
                var dropdown = (0, _jquery2.default)(self.el).closest('.bloks__component__box').find('a[data-type="dropdown"]');
                var secondary = (0, _jquery2.default)(self.el).closest('.bloks__component__box').find('a[data-type="secondary"]');

                if (!(0, _jquery2.default)(container).is(e.target) && (0, _jquery2.default)(container).has(e.target).length === 0 && dropdown.has(e.target).length === 0 && secondary.has(e.target).length === 0 && self.openBackgroundSetting !== true) {
                    container.removeClass('active');
                    container.prev().removeClass('active');
                    Bloks.Iframe.win.jQuery(dropdown).tooltipster('enable');
                }

                if (!s_toolbar.is(e.target) && (0, _jquery2.default)(container).has(e.target).length === 0 && s_toolbar.has(e.target).length === 0 && dropdown.has(e.target).length === 0 && self.openBackgroundSetting !== true) {
                    s_toolbar.removeClass('active');
                    s_toolbar.prev().removeClass('active');
                    Bloks.Iframe.win.jQuery(dropdown).tooltipster('enable');
                }
            });

            //Expand Background
            (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('.expand-background').on("mouseup mousewheel keyup", function () {
                if (this.value < 0) this.value = 0;
                if (this.value > 10) this.value = 10;
                if (this.value > 1) (0, _jquery2.default)(self.el).closest('.bloks__component__box').find('.expand-row').addClass('plural');else (0, _jquery2.default)(self.el).closest('.bloks__component__box').find('.expand-row').removeClass('plural');
                self.vm.styles.expand = this.value;
            });

            self.vm.$watch('styles.expand', function (expand, expandOld) {
                self.compileExpand();
            });
            self.vm.$watch('styles.backgroundImage', function (ex, exold) {
                self.checkDefault();
            });
            // Check Expand Background when add new component
            if (self.vm.styles.backgroundImage == this.default_settings.backgroundImage) {
                this.compileExpand();
            }
        }.bind(this), 0);
    },
    unbind: function unbind() {
        var $ = jQuery;
        $(this.el).closest('.bloks__component__box').find('.bloks__component__box-header').remove();
        $(this.el).unwrap();
        this.autoFixMargin();
    },
    active: function active(target) {
        this.resetMoveActions();
        Bloks.Iframe.win.jQuery('.bloks__component__box').removeClass('active');
        jQuery(target).addClass('active');
        Bloks.Iframe.win.jQuery('#bloks-builder-content').addClass('has-component-active');
    },
    remove: function remove() {
        Bloks.Iframe.scrollTo(this.getCurrent());
        this.vm.$set('modal', true);
    },
    clone: function clone() {
        var clone = jQuery(this.vm.toString());
        clone.insertAfter(this.getCurrent());
        Bloks.Iframe.scrollTo(clone);
        Bloks.Iframe.compile();

        var self = this,
            from = 0;

        _underscore2.default.each(Bloks.Iframe.$children, function (val, index) {
            if (val._uid == self.getCurrent().data('uid')) from = index;
        });

        var cloneInstance = Bloks.Iframe.$children[Bloks.Iframe.$children.length - 1];

        for (var i = Bloks.Iframe.$children.length - 2; i > from; i--) {
            Bloks.Iframe.$children[i + 1] = Bloks.Iframe.$children[i];
        }

        Bloks.Iframe.$children[from + 1] = cloneInstance;
        self.compileExpand();
    },
    getPrev: function getPrev() {
        return jQuery(this.el).closest('.bloks__component__box').prev('.bloks__component__box');
    },
    getCurrent: function getCurrent() {
        return jQuery(this.el).closest('.bloks__component__box');
    },
    getNext: function getNext() {
        return jQuery(this.el).closest('.bloks__component__box').next('.bloks__component__box');
    },
    resetMoveActions: function resetMoveActions() {
        var $ = jQuery;
        if (this.getNext().length == 0) $(this.el).closest('.bloks__component__box').find('.bloks__dropdown-content .down').parent().hide();else $(this.el).closest('.bloks__component__box').find('.bloks__dropdown-content .down').parent().show();
        if (this.getPrev().length == 0) {
            $(this.el).closest('.bloks__component__box').find('.bloks__dropdown-content .up').parent().hide();
            $(this.el).closest('.bloks__component__box').find('.bloks__dropdown-content .down').parent().addClass('first');
        } else {
            $(this.el).closest('.bloks__component__box').find('.bloks__dropdown-content .up').parent().show();
            $(this.el).closest('.bloks__component__box').find('.bloks__dropdown-content .down').parent().removeClass('first');
        }

        if (this.getNext().length == 0 && this.getPrev().length == 0) {
            $(this.el).closest('.bloks__component__box').find('.bloks__dropdown-content .duplicate').parent().addClass('first-last');
            $(this.el).closest('.bloks__component__box').find('.bloks__dropdown-content .down').parent().removeClass('first');
        } else $(this.el).closest('.bloks__component__box').find('.bloks__dropdown-content .duplicate').parent().removeClass('first-last');
    },
    up: function up() {
        var $ = jQuery;
        var current = this.getCurrent();
        var prev = this.getPrev();

        // current.addClass('animated fadeIn');
        // prev.addClass('animated fadeIn');
        current.insertBefore(prev);
        Bloks.Iframe.scrollTo(current);

        Bloks.Iframe.changeChildPosition(current.data('uid'), prev.data('uid'));

        /**
         * Remove animate class fix z-index issue
         */
        // $(current).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        //     $(this).removeClass('animated fadeIn');
        // });
        //
        // $(prev).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        //     $(this).removeClass('animated fadeIn');
        // });
        this.compileExpand();
    },
    down: function down() {
        var $ = jQuery;
        var current = this.getCurrent();
        var next = this.getNext();

        // current.addClass('animated fadeIn');
        // next.addClass('animated fadeIn');
        current.insertAfter(next);
        Bloks.Iframe.scrollTo(current);

        Bloks.Iframe.changeChildPosition(current.data('uid'), next.data('uid'));

        /**
         * Remove animate class fix z-index issue
         */
        // $(current).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        //     $(this).removeClass('animated fadeIn');
        // });
        //
        // $(next).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        //     $(this).removeClass('animated fadeIn');
        // });
        this.compileExpand();
    },
    showMediaModal: function showMediaModal() {
        this.openBackgroundSetting = true;
        var frame = void 0;
        var self = this;
        if (frame) {
            frame.open();return;
        }
        frame = Bloks.Iframe.win.wp.media({
            title: 'Select or Upload Media Of Your Chosen Persuasion',
            button: {
                text: 'Use this media'
            },
            library: {
                type: 'image' // need check againt
            },
            multiple: false // Set to true to allow multiple files to be selected
        });
        frame.on('close', function () {});

        // When an image is selected in the media frame...
        frame.on('select', function () {
            var attachment = frame.state().get('selection').first().toJSON();
            self.vm.styles.backgroundImage = attachment.url;
            (0, _jquery2.default)(self.el).closest('.bloks__component__box').find('img.image-action').attr('src', attachment.url);
            (0, _jquery2.default)(self.el).closest('.bloks__component__box').find('.wrap-image-tool').removeClass('hide');
            (0, _jquery2.default)(self.el).closest('.bloks__component__box').find('.rm-image').removeClass('hide');
            (0, _jquery2.default)(self.el).closest('.bloks__component__box').find('a.image-action').addClass('hide');
            (0, _jquery2.default)(self.el).closest('.bloks__component__box').find('.expand-row').removeClass('hide');
            self.vm.styles.removeImage = false;
            self.vm.styles.changeImage = true;
            self.compileExpand();
            self.openBackgroundSetting = false;
        });
        frame.open();
    },
    reset: function reset() {
        var self = this;
        this.vm.styles = _underscore2.default.clone(this.default_settings);
        jQuery(this.el).find('.bloks__block-background').css({ 'background-color': this.vm.styles.backgroundColor });
        Bloks.Iframe.win.jQuery(this.el).closest('.bloks__component__box').find('.general-padding-top').val(this.vm.styles.paddingTop);
        Bloks.Iframe.win.jQuery(this.el).closest('.bloks__component__box').find('.general-padding-bottom').val(this.vm.styles.paddingBottom);
        Bloks.Iframe.win.jQuery(this.el).closest('.bloks__component__box').find('.general-padding-left').val(this.vm.styles.paddingLeft);
        Bloks.Iframe.win.jQuery(this.el).closest('.bloks__component__box').find('.general-padding-right').val(this.vm.styles.paddingRight);
        Bloks.Iframe.win.jQuery(this.el).closest('.bloks__component__box').find('.expand-background').val(this.vm.styles.expand);

        var colorpicker = Bloks.Iframe.win.jQuery(this.el).closest('.bloks__component__box').find('.background-picker').data('colorpicker');
        colorpicker.setColor(this.vm.styles.backgroundColor);
        Bloks.Iframe.win.jQuery(this.el).closest('.bloks__component__box').css('margin', 'auto');

        Bloks.Iframe.win.jQuery(self.el).closest('.bloks__component__box').find('.colorsets a').removeClass('active');
        Bloks.Iframe.win.jQuery(self.el).closest('.bloks__component__box').find('.colorsets a[data-class="bloks__colorset-light"]').addClass('active');
        self.vm.colorset = 'bloks__colorset-light';
        if (self.vm.colorsets !== undefined) {
            if (self.vm.colorsets['none']) {
                _underscore2.default.each(self.vm.colorsets['none'], function (val, key) {
                    self.vm.$set(key, val);
                    if (key === 'styles.backgroundColor') {
                        (0, _jquery2.default)(self.el).find('.bloks__block-background').css({ 'background-color': val });
                    }
                });
            }
        }

        // jQuery(this.el).closest('.bloks__component__box').find('input[data-element="boxed"]').each( function(){
        //     let checked = true;
        //     if(self.vm.styles.classContainer == 'container-fullwidth') checked = false;
        //     jQuery(this).prop('checked', checked);
        // });
    },
    compileExpand: function compileExpand() {
        var self = this;
        var expand = 0;
        var backgroundImage = '';
        _underscore2.default.each(Bloks.Iframe.$children, function (val, index) {
            val.styles.backgroundAttachment = 'initial';
            if (val.styles.expand && val.styles.backgroundImage) {
                expand = val.styles.expand;
                backgroundImage = val.styles.backgroundImage;
                val.styles.backgroundAttachment = 'fixed';
            } else if (!val.styles.expand && expand > 0) {
                if (val.styles.backgroundImage == backgroundImage || !val.styles.changeImage) {
                    val.styles.backgroundImage = backgroundImage;
                    val.styles.backgroundAttachment = 'fixed';
                }
                expand = expand - 1;
            } else if (val.styles.backgroundImage == backgroundImage || !val.styles.changeImage) {
                if (val.styles.removeImage) {
                    val.styles.backgroundImage = "";
                } else {
                    val.styles.backgroundImage = val.stylesDefault.backgroundImage;
                }
            }
        });
    },
    checkDefault: function checkDefault() {
        if (this.vm.styles.backgroundImage !== "" && this.vm.styles.backgroundImage !== "none" && (this.vm.styles.expand && this.vm.styles.backgroundAttachment == 'fixed' || this.vm.styles.backgroundAttachment == 'initial')) {
            (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('a.image-action').addClass('hide');
            (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('.wrap-image-tool').removeClass('hide');
            (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('.rm-image').removeClass('hide');
            (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('.expand-row').removeClass('hide');
        } else {
            (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('a.image-action').removeClass('hide');
            (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('.wrap-image-tool').addClass('hide');
            (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('.rm-image').addClass('hide');
            (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('.expand-row').addClass('hide');
        }

        if ((0, _jquery2.default)(this.el).closest('.bloks__component__box').find('.expand-background').val() > 1) (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('.expand-row').addClass('plural');
    },
    autoFixBuildMargin: function autoFixBuildMargin() {
        (0, _jquery2.default)(this.el).css('margin', 'auto');
        if (this.vm.styles.paddingTop < 0) (0, _jquery2.default)(this.el).parent().css('marginTop', this.vm.styles.paddingTop + 'px');
        if (this.vm.styles.paddingRight < 0) (0, _jquery2.default)(this.el).parent().css('marginRight', this.vm.styles.paddingRight + 'px');
        if (this.vm.styles.paddingBottom < 0) (0, _jquery2.default)(this.el).parent().css('marginBottom', this.vm.styles.paddingBottom + 'px');
        if (this.vm.styles.paddingLeft < 0) (0, _jquery2.default)(this.el).parent().css('marginLeft', this.vm.styles.paddingLeft + 'px');
    },
    autoFixMargin: function autoFixMargin() {
        if (this.vm.styles.paddingTop < 0) (0, _jquery2.default)(this.el).css('marginTop', this.vm.styles.paddingTop + 'px');
        if (this.vm.styles.paddingRight < 0) (0, _jquery2.default)(this.el).css('marginRight', this.vm.styles.paddingRight + 'px');
        if (this.vm.styles.paddingBottom < 0) (0, _jquery2.default)(this.el).css('marginBottom', this.vm.styles.paddingBottom + 'px');
        if (this.vm.styles.paddingLeft < 0) (0, _jquery2.default)(this.el).css('marginLeft', this.vm.styles.paddingLeft + 'px');
    }
});

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Register a global custom directive called v-tabs
_vue2.default.directive('tabs', {
    twoWay: true,
    bind: function bind() {
        var self = this;

        var plus = (0, _jquery2.default)('<li class="tabs-add"><a href="javascript:void(0)"><span class="ibloks-plus"></span></a></li>');
        plus.appendTo((0, _jquery2.default)(this.el).find('.nav-tabs'));

        jQuery(this.el).find('.tabs-add').on('click', function () {
            var tabs = self.vm.$get(self.expression);
            var clone = _underscore2.default.clone(tabs[tabs.length - 1]);
            tabs.$set(tabs.length, clone);
            setTimeout(function () {
                Bloks.Iframe.win.jQuery(self.el).closest('.bloks__component__box').find('.bloks-tooltip').each(function (i, el) {
                    if (!(0, _jquery2.default)(el).hasClass('tooltipstered')) {
                        Bloks.Iframe.win.jQuery(el).tooltipster({
                            theme: 'bloks__tooltip-content'
                        });
                    }
                });
            }.bind(this), 100);
        });
    },
    update: function update(tabs) {
        var self = this;

        // setup active tab
        self.setTabActive();

        jQuery(self.el).find('.remove-tab').on('click', function (event) {

            var indexdelete = jQuery(this).parent().data('index');
            var tabs = self.vm.$get(self.expression);

            if (tabs.length == 1) return false;

            event.stopPropagation();
            event.stopImmediatePropagation();

            // remove v-upload
            jQuery.each(self.vm._directives, function (index, value) {
                if (value.name == 'upload') {
                    value.unbind();
                }
            });

            // remove tab
            tabs.$remove(tabs[indexdelete]);
        });
    },
    setTabActive: function setTabActive() {
        var navTab = jQuery(this.el).find('.nav-tabs');
        if (navTab.find('li.active').length == 0) {
            navTab.find('li').first().addClass('active');
        }

        var contentTab = jQuery(this.el).find('.tab-content');
        if (contentTab.find('.tab-pane.active').length == 0) {
            contentTab.find('div.tab-pane').first().addClass('active');
        }
    },
    unbind: function unbind() {
        jQuery(this.el).find('.tabs-add').remove();
    }
});

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Register a global custom directive called v-slider. */
_vue2.default.directive('slider', {
    twoWay: true,
    bind: function bind() {
        var self = this;
        setTimeout(function () {
            var html = '\n                <div class="slider-toolbar active">\n                    <div class="slider-toolbar-inner">\n                        <ul>\n                            <li class="slider-add"><a href="javascript:void(0)"><i class="ibloks-plus"></i>Add new</a></li>\n                            <li class="slider-remove"><a href="javascript:void(0)">Remove</a></li>\n                        </ul>\n                    </div>\n                </div>';
            var action = (0, _jquery2.default)(html);
            (0, _jquery2.default)(action).appendTo((0, _jquery2.default)(self.el).closest('.bloks__component__box').find('.bloks__component__box-inner'));
            (0, _jquery2.default)(self.el).closest('.bloks__component__box').find('.bloks-slider').on('click', function () {
                self.active();
            });
        }, 0);
    },
    update: function update(slider) {
        var self = this;
        setTimeout(function () {
            self.reset();
            /** Add new slider */
            (0, _jquery2.default)(self.el).closest('.bloks__component__box').find('.slider-add').click(function (event) {
                event.stopPropagation();
                event.stopImmediatePropagation();

                var clone = _underscore2.default.clone(slider[slider.length - 1]);
                slider.$set(slider.length, clone);
            });

            /** Remove slider */
            (0, _jquery2.default)(self.el).closest('.bloks__component__box').find('.slider-remove').click(function (event) {
                var indexdelete = (0, _jquery2.default)(self.el).find('.active').data('slide-to');
                var slider = self.vm.$get(self.expression);

                event.stopPropagation();
                event.stopImmediatePropagation();

                /** Remove v-upload */
                _jquery2.default.each(self.vm._directives, function (index, value) {
                    if (value.name == 'upload') {
                        var _index = (0, _jquery2.default)(value.el).closest('.active').data('index');
                        if (_index !== undefined && _index == indexdelete) value.unbind();
                    }
                });
                slider.$remove(slider[indexdelete]);
            });
        }, 100);
    },
    reset: function reset() {
        /** Reset active */
        if (!(0, _jquery2.default)(this.el).find('li.active').length) {
            (0, _jquery2.default)(this.el).find('li:first').addClass('active');
        }
        if (!(0, _jquery2.default)(this.el).prev().find('.active').length) {
            (0, _jquery2.default)(this.el).prev().find('.item:first').addClass('active');
        }

        /** Reset button remove */
        var leng = (0, _jquery2.default)(this.el).find('li.carousel-item').length;
        if (leng > 1) {
            if (!(0, _jquery2.default)(this.el).closest('.bloks__component__box').find('li.slider-remove').length) {
                var remove = (0, _jquery2.default)('<li class="slider-remove"><a href="javascript:void(0)">Remove</a></li>');
                remove.appendTo((0, _jquery2.default)(this.el).closest('.bloks__component__box').find('.slider-toolbar'));
            }
        } else {
            (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('.slider-remove').remove();
        }
    },
    active: function active() {
        (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('.slider-toolbar').addClass('active');
    },
    unbind: function unbind() {
        (0, _jquery2.default)(this.el).closest('.bloks__component__box').find('.slider-toolbar').remove();
    }
});

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Register a global custom directive called v-widget
_vue2.default.directive('widget', {
    twoWay: true,
    update: function update(value) {
        var widgetObject = _underscore2.default.clone(value);
        widgetObject.action = 'bloks-get-widget-content';

        _jquery2.default.ajax(Bloks.Settings.ajax, {
            method: "POST",
            data: widgetObject,
            dataType: 'JSON'
        }).done(function (response) {
            if (response.error) {
                alert(response.error_msg);
            } else {
                (0, _jquery2.default)(this.el).html(response.html);

                (0, _jquery2.default)(this.el).find('a').click(function (e) {
                    e.preventDefault();
                });
                (0, _jquery2.default)(this.el).find('select').change(function (e) {
                    e.preventDefault();
                }).removeAttr('onchange');

                (0, _jquery2.default)(this.el).find('form').submit(function (e) {
                    e.preventDefault();
                });
            }
        }.bind(this));
    },
    unbind: function unbind() {
        var tokenize = this.vm.$get(this.expression);

        var widget = '[widget';
        _jquery2.default.each(tokenize, function (key, value) {
            widget += ' ' + key + '="' + value + '"';
        });
        widget += ']';
        (0, _jquery2.default)(this.el).html(widget);
    }
});

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _underscore = __webpack_require__(2);

var _underscore2 = _interopRequireDefault(_underscore);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Register a global custom directive called v-settings
_vue2.default.directive('elements', {
    priority: 1,
    update: function update(data) {
        var self = this;
        if ((0, _jquery2.default)(self.el).find('.element-component-box').length == 0) {
            setTimeout(function () {
                var tool = '<ul class="element-component-box">';
                _underscore2.default.each(_underscore2.default.keys(data), function (value) {
                    tool += '<bloks-' + value + '-settings :' + value + '.sync=' + data[value] + '></bloks-' + value + '-settings>';
                });
                tool += '</ul>';
                tool = (0, _jquery2.default)(tool);
                (0, _jquery2.default)(self.el).prepend(tool);

                this.vm.$compile(Bloks.Iframe.$el);

                (0, _jquery2.default)(self.el).parent().bind({
                    mouseenter: function mouseenter() {
                        self.active();
                    },
                    mouseleave: function mouseleave() {
                        (0, _jquery2.default)(self.el).removeClass('active');
                    }
                });

                (0, _jquery2.default)(Bloks.Iframe.doc).mousedown(function (e) {
                    var container = (0, _jquery2.default)(self.el);
                    if (!container.is(e.target) && container.has(e.target).length === 0) {
                        //$(self.el).removeClass('active');
                    }
                });
            }.bind(this), 0);
        }
    },
    active: function active() {
        if ((0, _jquery2.default)(this.el).closest('.bloks__component__box').hasClass('active')) {
            Bloks.Iframe.win.jQuery('.bloks-elements').removeClass('active');
            if (!(0, _jquery2.default)(this.el).hasClass('active')) (0, _jquery2.default)(this.el).addClass('active');
        }
    },
    unbind: function unbind() {
        (0, _jquery2.default)(this.el).remove();
    }
});

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(169);

__webpack_require__(170);

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.transition('fade-down', {
    enter: function enter(el) {
        (0, _jquery2.default)(el).addClass('bloks__fade__in-down');
        (0, _jquery2.default)(el).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            (0, _jquery2.default)(this).removeClass('bloks__fade__in-down');
        });
    },
    leave: function leave(el) {
        (0, _jquery2.default)(el).addClass('bloks__fade__out-up');
        (0, _jquery2.default)(el).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            (0, _jquery2.default)(this).removeClass('bloks__fade__out-up');
        });
    }
});

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.transition('flash', {
    enter: function enter(el) {
        (0, _jquery2.default)(el).addClass('bloks__flash animated');
        (0, _jquery2.default)(el).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            (0, _jquery2.default)(this).removeClass('bloks__flash animated');
        });
    },
    leave: function leave(el) {
        (0, _jquery2.default)(el).addClass('bloks__fadeOut animated');
        (0, _jquery2.default)(el).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            (0, _jquery2.default)(this).removeClass('bloks__fadeOut animated');
        });
    }
});

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _main = __webpack_require__(40);

var _main2 = _interopRequireDefault(_main);

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    template: '#bloks__app-template',
    data: function data() {
        return {
            'loader': true,
            'canvas': false,
            'hover': 'image',
            'adding': false,
            'viewport': 'desktop',
            'inEditSlug': false,
            'inSlugSuccess': false,
            'inSlugInput': false,
            'slug': '',
            'canSave': false,
            'message': '',
            'pageSettings': false,
            'pagePlaceholder': false,
            'pagePreset': false
        };
    },
    ready: function ready() {
        (0, _jquery2.default)(this.$el).find('.bloks-tooltip').tooltipster({
            theme: 'bloks__tooltip-content'
        });

        var self = this;

        (0, _jquery2.default)(this.$el).find('.bloks__viewports a').click(function () {
            self.viewport = (0, _jquery2.default)(this).data('viewport');
        });

        (0, _jquery2.default)(this.$el).find(".bloks__canvas__nav-template").niceScroll({
            cursorwidth: 7,
            cursoropacitymin: 0.4,
            cursorcolor: '#aaaaaa',
            cursorborder: 'none',
            cursorborderradius: 3,
            autohidemode: 'leave',
            background: '#ebebeb'
        });

        this.customCss = _main2.default.fromTextArea(jQuery(self.$el).find('#custom_css').get(0), {
            mode: 'css',
            indentUnit: 4,
            value: jQuery(self.$el).find('#custom_css').val()
        });

        this.customJs = _main2.default.fromTextArea(jQuery(self.$el).find('#custom_js').get(0), {
            mode: 'javascript',
            indentUnit: 4,
            value: jQuery(self.$el).find('#custom_js').val()
        });

        /**
         * Confirmation before reload page
         */
        if (true) {
            (0, _jquery2.default)(window).on('beforeunload', function (e) {
                var dialog = "Data will be lost if you leave the page, are you sure?";
                e.returnValue = dialog;
                return dialog;
            });
        }
    },

    watch: {
        pageSettings: function pageSettings() {
            this.customCss.refresh();
            this.customJs.refresh();
        },
        viewport: function viewport(value) {
            var viewports = {
                'desktop': {
                    'width': '100%',
                    'height': '100%',
                    'left': '0',
                    'padding-top': '71px',
                    'margin-top': '0',
                    'margin-left': '0'
                },
                'tablet': {
                    'width': '768px',
                    'height': '85%',
                    'left': '50%',
                    'padding-top': '0',
                    'margin-top': '90px',
                    'margin-left': '-384px'
                },
                'phone': {
                    'width': '480px',
                    'height': '70%',
                    'left': '50%',
                    'padding-top': '0',
                    'margin-top': '90px',
                    'margin-left': '-240px'
                }
            };

            this.canvas = false;

            (0, _jquery2.default)(this.$el).find('iframe').animate(viewports[value], 400, function () {
                Bloks.Iframe.$emit('on_resize_complete');
            });
        }
    },
    events: {
        'on_after_append_component': function on_after_append_component() {
            Bloks.Common.canSave = Bloks.Iframe.$children.length > 0;
        },
        'on_after_delete_component': function on_after_delete_component() {
            Bloks.Common.canSave = Bloks.Iframe.$children.length > 0;
        }
    },
    methods: {
        appendComponent: function appendComponent(e) {
            if (this.adding) return;

            if (Bloks.Iframe.win.jQuery('#bloks-builder-content').find('.bloks__page-placeholder').length) {
                Bloks.Iframe.win.jQuery('#bloks-builder-content').removeClass('active-placeholder');
                Bloks.Iframe.win.jQuery('#bloks-builder-content').find('.bloks__page-placeholder').remove();
                // Bloks.Iframe.win.jQuery('#bloks-builder-content').find('.bloks__canvas__nav_preset-template').remove();
            }

            this.adding = true;
            var component = (0, _jquery2.default)('<bloks/>', {
                "tpl": '#' + (0, _jquery2.default)(e.currentTarget).data('tpl')
            });
            Bloks.Iframe.appendComponent(component);

            setTimeout(function () {
                this.adding = false;
            }.bind(this), 400);

            this.canvas = false;
            this.$emit('on_after_append_component');
        },
        importPreset: function importPreset(e) {
            this.loader = true;
            var content = (0, _jquery2.default)('div#' + (0, _jquery2.default)(e.currentTarget).data('tpl')).html();
            Bloks.Iframe.importPreset(content);
            this.pagePreset = false;
            setTimeout(function () {
                this.loader = false;
            }.bind(this), 3000);
        },
        showSettingsModal: function showSettingsModal() {
            jQuery(this.$el).find('.modal').modal('show');
        },
        getSampleLink: function getSampleLink() {
            Bloks.Iframe.getSampleLink(true);
            this.inSlugSuccess = true;
            this.inEditSlug = false;

            setTimeout(function () {
                this.inSlugSuccess = false;
                this.inSlugInput = false;
                (0, _jquery2.default)(this.$el).find('.bloks-action-permalink').css('width', 'auto');
            }.bind(this), 3000);
        },
        save: function save() {
            Bloks.Iframe.save('save');
        },
        publish: function publish() {
            if (true) {
                (0, _jquery2.default)(window).off('beforeunload');
            }
            Bloks.Iframe.save('publish');
        },
        preview: function preview() {
            if (true) {
                (0, _jquery2.default)(window).off('beforeunload');
            }
            Bloks.Iframe.save('preview');
        },
        showInputEdit: function showInputEdit() {
            this.inSlugInput = true;
            this.inEditSlug = !this.inEditSlug;
            (0, _jquery2.default)(this.$el).find('.bloks-action-permalink').css('width', (0, _jquery2.default)(this.$el).find('.bloks-edit-permalink').width() - (0, _jquery2.default)(this.$el).find('.sample-permalink').width() + (0, _jquery2.default)(this.$el).find('#editable-post-name').width() + 'px');
            var permalink = (0, _jquery2.default)(this.$el).find('input.input-edit-permalink');
            setTimeout(function () {
                permalink.select();
            }, 10);
        }
    }
};

/***/ })
/******/ ]);
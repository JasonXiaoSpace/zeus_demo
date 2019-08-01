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
/******/ 	return __webpack_require__(__webpack_require__.s = 55);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return core; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Dictionary__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__observable_Observable__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reflect_metadata__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reflect_metadata___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_reflect_metadata__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global_Patch__ = __webpack_require__(20);




__WEBPACK_IMPORTED_MODULE_3__global_Patch__;
/**
 * 核心上下文对象，负责内核消息转发、对象注入等核心功能的实现
 *
 * @export
 * @class Core
 */
var Core = /** @class */ (function () {
    function Core() {
        /*********************** 下面是内核消息系统 ***********************/
        this._observable = new __WEBPACK_IMPORTED_MODULE_1__observable_Observable__["a" /* default */]();
        /*********************** 下面是依赖注入系统 ***********************/
        /**
         * 记录已经注入过的对象单例
         *
         * @private
         * @type {Dictionary<Function, any>}
         * @memberof Core
         */
        this._injectDict = new __WEBPACK_IMPORTED_MODULE_0__utils_Dictionary__["a" /* default */]();
        /**
         * 注入字符串类型字典，记录注入字符串和类型构造函数的映射
         *
         * @private
         * @type {Dictionary<any, IConstructor>}
         * @memberof Core
         */
        this._injectStrDict = new __WEBPACK_IMPORTED_MODULE_0__utils_Dictionary__["a" /* default */]();
        // 进行单例判断
        if (Core._instance)
            throw new Error("已生成过Core实例，不允许多次生成");
        // 赋值单例
        Core._instance = this;
        // 注入自身
        this.mapInjectValue(this);
    }
    Object.defineProperty(Core.prototype, "disposed", {
        /**
         * Core的disposed属性没有任何作用，仅为了实现接口，始终会返回false
         *
         * @readonly
         * @type {boolean}
         * @memberof Core
         */
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Core.prototype, "observable", {
        /**
         * 将IObservable暴露出来
         *
         * @readonly
         * @type {IObservable}
         * @memberof Core
         */
        get: function () {
            return this._observable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Core.prototype, "parent", {
        /**
         * 获取到父级IObservable
         *
         * @type {IObservable}
         * @memberof Core
         */
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    /** dispatch方法实现 */
    Core.prototype.dispatch = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this._observable.dispatch.apply(this._observable, params);
    };
    /**
     * 监听内核消息
     *
     * @param {string} type 消息类型
     * @param {Function} handler 消息处理函数
     * @param {*} [thisArg] 消息this指向
     * @param {boolean} [once=false] 是否是一次性监听
     * @memberof Core
     */
    Core.prototype.listen = function (type, handler, thisArg, once) {
        if (once === void 0) { once = false; }
        this._observable.listen(type, handler, thisArg, once);
    };
    /**
     * 移除内核消息监听
     *
     * @param {string} type 消息类型
     * @param {Function} handler 消息处理函数
     * @param {*} [thisArg] 消息this指向
     * @param {boolean} [once=false] 是否是一次性监听
     * @memberof Core
     */
    Core.prototype.unlisten = function (type, handler, thisArg, once) {
        if (once === void 0) { once = false; }
        this._observable.unlisten(type, handler, thisArg, once);
    };
    /**
     * 注册命令到特定消息类型上，当这个类型的消息派发到框架内核时会触发Command运行
     *
     * @param {string} type 要注册的消息类型
     * @param {(ICommandConstructor)} cmd 命令处理器，可以是方法形式，也可以使类形式
     * @memberof Core
     */
    Core.prototype.mapCommand = function (type, cmd) {
        this._observable.mapCommand(type, cmd);
    };
    /**
     * 注销命令
     *
     * @param {string} type 要注销的消息类型
     * @param {(ICommandConstructor)} cmd 命令处理器
     * @returns {void}
     * @memberof Core
     */
    Core.prototype.unmapCommand = function (type, cmd) {
        this._observable.unmapCommand(type, cmd);
    };
    /**
     * 添加一个类型注入，会立即生成一个实例并注入到框架内核中
     *
     * @param {IConstructor} target 要注入的类型（注意不是实例）
     * @param {*} [type] 如果提供该参数，则使用该类型代替注入类型的key，否则使用注入类型自身作为key
     * @memberof Core
     */
    Core.prototype.mapInject = function (target, type) {
        // 如果已经注入过了，则使用已经注入的单例再次注入
        var oriTarget = target["__ori_constructor__"] || target;
        var value = this._injectDict.get(oriTarget) || new target();
        this.mapInjectValue(value, type);
    };
    /**
     * 注入一个对象实例
     *
     * @param {*} value 要注入的对象实例
     * @param {*} [type] 如果提供该参数，则使用该类型代替注入类型的key，否则使用注入实例的构造函数作为key
     * @memberof Core
     */
    Core.prototype.mapInjectValue = function (value, type) {
        // 如果是字符串则记录类型构造函数映射
        if (!(type instanceof Function) || !type.prototype) {
            this._injectStrDict.set(type, value.constructor);
            type = value.constructor;
        }
        // 记录已注入的单例
        this._injectDict.set(value.constructor, value);
        // 开始注入
        Reflect.defineMetadata("design:type", value, type["__ori_constructor__"] || type);
    };
    /**
     * 移除类型注入
     *
     * @param {*} type 要移除注入的类型
     * @memberof Core
     */
    Core.prototype.unmapInject = function (type) {
        // 如果是字符串则记录类型构造函数映射
        if (!(type instanceof Function) || !type.prototype)
            type = this._injectStrDict.get(type);
        Reflect.deleteMetadata("design:type", type["__ori_constructor__"] || type);
    };
    /**
     * 获取注入的对象实例
     *
     * @param {*} type 注入对象的类型
     * @returns {*} 注入的对象实例
     * @memberof Core
     */
    Core.prototype.getInject = function (type) {
        if (!(type instanceof Function) || !type.prototype)
            type = this._injectStrDict.get(type);
        if (type) {
            // 需要用原始的构造函数取
            type = type["__ori_constructor__"] || type;
            return Reflect.getMetadata("design:type", type);
        }
    };
    /**
     * Core的dispose方法没有任何作用，仅为了实现接口
     *
     * @memberof Core
     */
    Core.prototype.dispose = function () {
    };
    return Core;
}());
/* unused harmony default export */ var _unused_webpack_default_export = (Core);
/** 再额外导出一个单例 */
var core = new Core();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = __extends;
/* unused harmony export __assign */
/* unused harmony export __rest */
/* harmony export (immutable) */ __webpack_exports__["a"] = __decorate;
/* unused harmony export __param */
/* harmony export (immutable) */ __webpack_exports__["c"] = __metadata;
/* unused harmony export __awaiter */
/* unused harmony export __generator */
/* unused harmony export __exportStar */
/* unused harmony export __values */
/* unused harmony export __read */
/* unused harmony export __spread */
/* unused harmony export __await */
/* unused harmony export __asyncGenerator */
/* unused harmony export __asyncDelegator */
/* unused harmony export __asyncValues */
/* unused harmony export __makeTemplateObject */
/* unused harmony export __importStar */
/* unused harmony export __importDefault */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { if (o[n]) i[n] = function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; }; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["Injectable"] = Injectable;
/* harmony export (immutable) */ __webpack_exports__["Inject"] = Inject;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global_Patch__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_ConstructUtil__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reflect_metadata__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reflect_metadata___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_reflect_metadata__);




/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-19
 * @modify date 2017-09-19
 *
 * Core模组的装饰器注入模块
*/
/** 生成类型实例并注入，可以进行类型转换注入（即注入类型可以和注册类型不一致，采用@Injectable(AnotherClass)的形式即可） */
function Injectable() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (this === __WEBPACK_IMPORTED_MODULE_1__global_Patch__["decorateThis"]) {
        // 不需要转换注册类型，直接注册
        __WEBPACK_IMPORTED_MODULE_0__Core__["a" /* core */].mapInject(args[0]);
    }
    else {
        // 需要转换注册类型，需要返回一个ClassDecorator
        return function (realCls) {
            for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
                var cls = args_1[_i];
                // 注入类型
                __WEBPACK_IMPORTED_MODULE_0__Core__["a" /* core */].mapInject(realCls, cls);
            }
            // 需要转换的也要额外将自身注入一个
            __WEBPACK_IMPORTED_MODULE_0__Core__["a" /* core */].mapInject(realCls);
        };
    }
}
;
function Inject(target, key) {
    if (key) {
        var cls = Reflect.getMetadata("design:type", target, key);
        doInject(target.constructor, key, cls);
    }
    else {
        return function (prototype, propertyKey) {
            doInject(prototype.constructor, propertyKey, target);
        };
    }
}
;
function doInject(cls, key, type) {
    // 监听实例化
    var target;
    Object(__WEBPACK_IMPORTED_MODULE_2__utils_ConstructUtil__["c" /* listenConstruct */])(cls, function (instance) {
        Object.defineProperty(instance, key, {
            configurable: true,
            enumerable: true,
            get: function () { return target || (target = __WEBPACK_IMPORTED_MODULE_0__Core__["a" /* core */].getInject(type)); }
        });
    });
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = extendObject;
/* harmony export (immutable) */ __webpack_exports__["a"] = cloneObject;
/* unused harmony export getGUID */
/* unused harmony export getAutoIncId */
/* unused harmony export isEmpty */
/* unused harmony export trimData */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return extendsClass; });
/* harmony export (immutable) */ __webpack_exports__["d"] = getObjectHash;
/* harmony export (immutable) */ __webpack_exports__["e"] = getObjectHashs;
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-11
 * @modify date 2017-09-11
 *
 * 对象工具集
*/
/**
 * populate properties
 * @param target        目标obj
 * @param sources       来源obj
 */
function extendObject(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    sources.forEach(function (source) {
        if (!source)
            return;
        for (var propName in source) {
            if (source.hasOwnProperty(propName)) {
                target[propName] = source[propName];
            }
        }
    });
    return target;
}
/**
 * 复制对象
 * @param target 要复制的对象
 * @param deep 是否深表复制，默认浅表复制
 * @returns {any} 复制后的对象
 */
function cloneObject(target, deep) {
    if (deep === void 0) { deep = false; }
    if (target == null)
        return null;
    var newObject = Object.create(Object.getPrototypeOf(target));
    var keys = Object.keys(target);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var value = target[key];
        if (deep && typeof value == "object") {
            // 如果是深表复制，则需要递归复制子对象
            value = cloneObject(value, true);
        }
        var desc = Object.getOwnPropertyDescriptor(target, key);
        Object.defineProperty(newObject, key, desc);
    }
    return newObject;
}
/**
 * 生成一个随机ID
 */
function getGUID() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((parseInt(s[19]) & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    return s.join("");
}
var _getAutoIncIdMap = {};
/**
 * 生成自增id（从0开始）
 * @param type
 */
function getAutoIncId(type) {
    var index = _getAutoIncIdMap[type] || 0;
    _getAutoIncIdMap[type] = index++;
    return type + "-" + index;
}
/**
 * 判断对象是否为null或者空对象
 * @param obj 要判断的对象
 * @returns {boolean} 是否为null或者空对象
 */
function isEmpty(obj) {
    var result = true;
    for (var key in obj) {
        result = false;
        break;
    }
    return result;
}
/**
 * 移除data中包含的空引用或未定义
 * @param data 要被移除空引用或未定义的对象
 */
function trimData(data) {
    for (var key in data) {
        if (data[key] == null) {
            delete data[key];
        }
    }
    return data;
}
/**
 * 让child类继承自parent类
 * @param child 子类
 * @param parent 父类
 */
var extendsClass = (function () {
    var extendStatics = Object["setPrototypeOf"] ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var hash = 0;
var hashTypes = ["object", "function"];
/**
 * 获取一个对象的对象哈希字符串
 *
 * @export
 * @param {*} target 任意对象，可以是基础类型或null
 * @returns {string} 哈希值
 */
function getObjectHash(target) {
    if (target == null)
        return "__object_hash_0__";
    var key = "__object_hash__";
    var value;
    // 只有当前对象上有key才算
    if (Object.prototype.hasOwnProperty.call(target, key))
        value = target[key];
    // 如果已经有哈希值则直接返回
    if (value)
        return value;
    // 如果是基础类型则直接返回对应字符串
    var type = typeof target;
    if (hashTypes.indexOf(type) < 0)
        return type + ":" + target;
    // 如果是复杂类型则返回计算的哈希值并打上标签
    var value = "__object_hash_" + (++hash) + "__";
    Object.defineProperty(target, key, {
        configurable: true,
        enumerable: false,
        writable: false,
        value: value
    });
    return value;
}
/**
 * 获取多个对象的哈希字符串，会对每个对象调用getObjectHash生成单个哈希值，并用|连接
 *
 * @export
 * @param {...any[]} targets 希望获取哈希值的对象列表
 * @returns {string} 多个对象共同作用下的哈希值
 */
function getObjectHashs() {
    var targets = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        targets[_i] = arguments[_i];
    }
    var values = targets.map(function (target) { return getObjectHash(target); });
    return values.join("|");
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ObjectUtil__ = __webpack_require__(3);

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-15
 * @modify date 2017-09-15
 *
 * 字典，支持key为任意类型的对象
*/
var Dictionary = /** @class */ (function () {
    function Dictionary() {
        this._keyDict = {};
        this._valueDict = {};
    }
    Object.defineProperty(Dictionary.prototype, "size", {
        /**
         * 获取字典内的元素数量
         *
         * @readonly
         * @type {number}
         * @memberof Dictionary
         */
        get: function () {
            var size = 0;
            for (var hash in this._keyDict)
                size++;
            return size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dictionary.prototype, "keys", {
        /**
         * 获取字典key的集合
         *
         * @readonly
         * @type {K[]}
         * @memberof Dictionary
         */
        get: function () {
            var keys = [];
            for (var hash in this._keyDict) {
                keys.push(this._keyDict[hash]);
            }
            return keys;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dictionary.prototype, "values", {
        /**
         * 获取字典值的集合
         *
         * @readonly
         * @type {V[]}
         * @memberof Dictionary
         */
        get: function () {
            var values = [];
            for (var hash in this._valueDict) {
                values.push(this._valueDict[hash]);
            }
            return values;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 设置一个键值对
     *
     * @param {K} key 键
     * @param {V} value 值
     * @memberof Dictionary
     */
    Dictionary.prototype.set = function (key, value) {
        var hash = Object(__WEBPACK_IMPORTED_MODULE_0__ObjectUtil__["d" /* getObjectHash */])(key);
        this._keyDict[hash] = key;
        this._valueDict[hash] = value;
    };
    /**
     * 获取一个值
     *
     * @param {K} key 键
     * @returns {V} 值
     * @memberof Dictionary
     */
    Dictionary.prototype.get = function (key) {
        var hash = Object(__WEBPACK_IMPORTED_MODULE_0__ObjectUtil__["d" /* getObjectHash */])(key);
        return this._valueDict[hash];
    };
    /**
     * 删除一个键值对
     *
     * @param {K} key 键
     * @memberof Dictionary
     */
    Dictionary.prototype.delete = function (key) {
        var hash = Object(__WEBPACK_IMPORTED_MODULE_0__ObjectUtil__["d" /* getObjectHash */])(key);
        delete this._keyDict[hash];
        delete this._valueDict[hash];
    };
    /**
     * 遍历字典
     *
     * @param {(key:K, value:V)=>void} callback 每次遍历的回调
     * @memberof Dictionary
     */
    Dictionary.prototype.forEach = function (callback) {
        for (var hash in this._keyDict) {
            var key = this._keyDict[hash];
            var value = this._valueDict[hash];
            callback(key, value);
        }
    };
    return Dictionary;
}());
/* harmony default export */ __webpack_exports__["a"] = (Dictionary);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_injector_Injector__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_URLUtil__ = __webpack_require__(13);




/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-21
 * @modify date 2017-09-21
 *
 * 环境参数
*/
var Environment = /** @class */ (function () {
    function Environment() {
        this._env = "dev";
        this._hostsDict = {};
        this._cdnsDict = {};
        this._curCDNIndex = 0;
    }
    Object.defineProperty(Environment.prototype, "env", {
        /**
         * 获取当前环境字符串
         *
         * @readonly
         * @type {string}
         * @memberof Environment
         */
        get: function () {
            return this._env;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Environment.prototype, "hostsDict", {
        /**
         * 获取域名字典
         *
         * @readonly
         * @type {{[env:string]:string[]}}
         * @memberof Environment
         */
        get: function () {
            return this._hostsDict;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取当前环境下某索引处的消息域名
     *
     * @param {number} [index=0] 域名字典索引，默认是0
     * @returns {string} 域名字符串，如果取不到则使用当前域名
     * @memberof Environment
     */
    Environment.prototype.getHost = function (index) {
        if (index === void 0) { index = 0; }
        var hosts = this._hostsDict[this._env];
        if (!hosts)
            return Object(__WEBPACK_IMPORTED_MODULE_3__utils_URLUtil__["a" /* getCurOrigin */])();
        return (hosts[index] || Object(__WEBPACK_IMPORTED_MODULE_3__utils_URLUtil__["a" /* getCurOrigin */])());
    };
    Object.defineProperty(Environment.prototype, "cdnsDict", {
        /**
         * 获取CDN字典
         *
         * @readonly
         * @type {{[env:string]:string[]}}
         * @memberof Environment
         */
        get: function () {
            return this._cdnsDict;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Environment.prototype, "curCDNHost", {
        /**
         * 获取当前使用的CDN域名
         *
         * @readonly
         * @type {string}
         * @memberof Environment
         */
        get: function () {
            var cdns = this._cdnsDict[this._env];
            if (!cdns)
                return Object(__WEBPACK_IMPORTED_MODULE_3__utils_URLUtil__["a" /* getCurOrigin */])();
            return (cdns[this._curCDNIndex] || Object(__WEBPACK_IMPORTED_MODULE_3__utils_URLUtil__["a" /* getCurOrigin */])());
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 切换下一个CDN
     *
     * @returns {boolean} 是否已经到达CDN列表的终点，回到了起点
     * @memberof Environment
     */
    Environment.prototype.nextCDN = function () {
        var cdns = this._cdnsDict[this._env];
        if (!cdns)
            return true;
        this._curCDNIndex++;
        if (this._curCDNIndex >= cdns.length) {
            this._curCDNIndex = 0;
            return true;
        }
        return false;
    };
    /**
     * 初始化Environment对象，因为该对象保存的数据基本来自项目初始参数，所以必须有initialize方法
     *
     * @param {string} [env] 当前所属环境字符串
     * @param {{[env:string]:string[]}} [hostsDict] host数组字典
     * @param {{[env:string]:string[]}} [cdnsDict] cdn数组字典
     * @memberof Environment
     */
    Environment.prototype.initialize = function (env, hostsDict, cdnsDict) {
        this._env = env || "dev";
        this._hostsDict = hostsDict || {};
        this._cdnsDict = cdnsDict || {};
        this._curCDNIndex = 0;
    };
    /**
     * 让url的域名变成消息域名
     *
     * @param {string} url 要转变的url
     * @param {number} [index=0] host索引，默认0
     * @returns {string} 转变后的url
     * @memberof Environment
     */
    Environment.prototype.toHostURL = function (url, index) {
        if (index === void 0) { index = 0; }
        // 加上domain
        url = Object(__WEBPACK_IMPORTED_MODULE_3__utils_URLUtil__["g" /* wrapHost */])(url, this.getHost(index));
        // 返回url
        return url;
    };
    /**
     * 让url的域名变成CDN域名
     *
     * @param {string} url 要转变的url
     * @param {boolean} [forced=false] 是否强制替换host
     * @param {boolean} [infix=true] 是否加入路径中缀，即host之后，index.html之前的部分，默认加入
     * @returns {string} 转变后的url
     * @memberof Environment
     */
    Environment.prototype.toCDNHostURL = function (url, forced, infix) {
        if (forced === void 0) { forced = false; }
        if (infix === void 0) { infix = true; }
        if (infix) {
            // 组织中缀
            var midnameIndex = window.location.pathname.lastIndexOf("/");
            var midname = window.location.pathname.substring(0, midnameIndex + 1);
            return Object(__WEBPACK_IMPORTED_MODULE_3__utils_URLUtil__["g" /* wrapHost */])(url, this.curCDNHost + "/" + midname, forced);
        }
        else {
            // 只替换域名
            return Object(__WEBPACK_IMPORTED_MODULE_3__utils_URLUtil__["g" /* wrapHost */])(url, this.curCDNHost, forced);
        }
    };
    Environment = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
        __WEBPACK_IMPORTED_MODULE_2__core_injector_Injector__["Injectable"]
    ], Environment);
    return Environment;
}());
/* harmony default export */ __webpack_exports__["default"] = (Environment);
/** 再额外导出一个单例 */
var environment = __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].getInject(Environment);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = wrapConstruct;
/* harmony export (immutable) */ __webpack_exports__["a"] = getConstructor;
/* harmony export (immutable) */ __webpack_exports__["c"] = listenConstruct;
/* unused harmony export unlistenConstruct */
/* harmony export (immutable) */ __webpack_exports__["d"] = listenDispose;
/* harmony export (immutable) */ __webpack_exports__["b"] = listenApply;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Dictionary__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_ObjectUtil__ = __webpack_require__(3);


/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-13
 * @modify date 2017-09-13
 *
 * 装饰器工具集
*/
// 用来判断是否支持Proxy
var hasProxy = (window["Proxy"] && Proxy.revocable instanceof Function);
var instanceDict = new __WEBPACK_IMPORTED_MODULE_0__utils_Dictionary__["a" /* default */]();
function handleInstance(instance) {
    var cls = instance.constructor;
    cls = cls["__ori_constructor__"] || cls;
    var funcs = instanceDict.get(cls);
    if (funcs)
        for (var _i = 0, funcs_1 = funcs; _i < funcs_1.length; _i++) {
            var func = funcs_1[_i];
            func(instance);
        }
}
/**
 * 包装一个类型，监听类型的实例化操作
 *
 * @export
 * @param {IConstructor} cls 要监听构造的类型构造器
 * @returns {IConstructor} 新的构造函数
 */
function wrapConstruct(cls) {
    if (hasProxy) {
        // 使用Proxy监听类型构建
        return new Proxy(cls, {
            construct: function (target, args, newTarget) {
                var result = Reflect.construct(target, args, newTarget);
                if (newTarget)
                    result.constructor = newTarget;
                handleInstance(result);
                return result;
            }
        });
    }
    else {
        // 创建一个新的构造函数
        var func;
        eval('func = function ' + cls["name"] + '(){onConstruct.call(this, arguments)}');
        // 动态设置继承
        Object(__WEBPACK_IMPORTED_MODULE_1__utils_ObjectUtil__["c" /* extendsClass */])(func, cls);
        // 为新的构造函数打一个标签，用以记录原始的构造函数
        func["__ori_constructor__"] = cls;
        // 为原始构造函数也打一个标签，用以记录新构造函数
        cls["__wrap_constructor__"] = func;
        // 返回新的构造函数
        return func;
    }
    function onConstruct(args) {
        // 恢复__proto__
        Object.defineProperty(this, "__proto__", {
            configurable: true,
            enumerable: false,
            writable: true,
            value: cls.prototype
        });
        // 调用父类构造函数构造实例
        cls.apply(this, args);
        // 调用回调
        handleInstance(this);
    }
}
/**
 * 如果传入的类有包装类，则返回包装类，否则返回其本身
 *
 * @export
 * @param {IConstructor} cls 要获取包装类的类构造函数
 * @returns {IConstructor}
 */
function getConstructor(cls) {
    return (cls["__wrap_constructor__"] || cls);
}
/**
 * 监听类型的实例化
 *
 * @export
 * @param {IConstructor} cls 要监听实例化的类
 * @param {(instance?:any)=>void} handler 处理函数
 */
function listenConstruct(cls, handler) {
    cls = cls["__ori_constructor__"] || cls;
    var list = instanceDict.get(cls);
    if (!list)
        instanceDict.set(cls, list = []);
    if (list.indexOf(handler) < 0)
        list.push(handler);
}
/**
 * 移除实例化监听
 *
 * @export
 * @param {IConstructor} cls 要移除监听实例化的类
 * @param {(instance?:any)=>void} handler 处理函数
 */
function unlistenConstruct(cls, handler) {
    cls = cls["__ori_constructor__"] || cls;
    var list = instanceDict.get(cls);
    if (list) {
        var index = list.indexOf(handler);
        if (index >= 0)
            list.splice(index, 1);
    }
}
/**
 * 监听类型销毁（如果能够销毁的话，需要类型具有dispose方法），该监听不需要移除
 *
 * @export
 * @param {IConstructor} cls 要监听销毁的类
 * @param {(instance?:any)=>void} handler 处理函数
 */
function listenDispose(cls, handler) {
    var dispose = cls.prototype.dispose;
    // 判断类型是否具有dispose方法
    if (dispose) {
        // 替换dispose方法
        cls.prototype.dispose = function () {
            // 调用回调
            handler(this);
            // 调用原始dispose方法执行销毁
            return dispose.apply(this, arguments);
        };
    }
}
/**
 * 监听某个实例的某个方法调用，并插入逻辑
 *
 * @export
 * @param {IConstructor|any} target 要监听的对象类型或实例
 * @param {string} name 要监听调用的方法名
 * @param {(instance:any, args?:any[])=>any[]|void} [before] 执行前调用的回调，如果有返回值则替换掉正式方法执行时的参数
 * @param {(instance:any, args?:any[], result?:any)=>any} [after] 执行后调用的回调，可以接收正式方法的返回值，如果after有返回值则替换掉正式方法的返回值
 * @param {boolean} [once=true] 是否是一次性监听，默认是true
 */
function listenApply(target, name, before, after, once) {
    if (once === void 0) { once = true; }
    if (target instanceof Function)
        // 是个类型，监听构建后再执行处理
        listenConstruct(target, onGetInstance);
    else
        // 是个实例，直接执行处理
        onGetInstance(target);
    function onGetInstance(instance) {
        // 篡改指定方法
        var oriFunc = instance.hasOwnProperty(name) ? instance[name] : null;
        instance[name] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // 调用回调
            var tempArgs = before && before(instance, args);
            // 替换参数
            if (tempArgs)
                args = tempArgs;
            // 如果是一次性监听，则恢复原始方法
            if (once) {
                if (oriFunc)
                    instance[name] = oriFunc;
                else
                    delete instance[name];
            }
            // 调用原始方法
            var result = instance[name].apply(this, args);
            // 调用回调
            var tempResult = after && after(instance, args, result);
            // 替换结果
            if (tempResult)
                result = tempResult;
            // 返回结果
            return result;
        };
    }
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["ModelClass"] = ModelClass;
/* harmony export (immutable) */ __webpack_exports__["MediatorClass"] = MediatorClass;
/* harmony export (immutable) */ __webpack_exports__["MessageHandler"] = MessageHandler;
/* harmony export (immutable) */ __webpack_exports__["GlobalMessageHandler"] = GlobalMessageHandler;
/* harmony export (immutable) */ __webpack_exports__["ResponseHandler"] = ResponseHandler;
/* harmony export (immutable) */ __webpack_exports__["GlobalResponseHandler"] = GlobalResponseHandler;
/* harmony export (immutable) */ __webpack_exports__["SubMediator"] = SubMediator;
/* harmony export (immutable) */ __webpack_exports__["BindValue"] = BindValue;
/* harmony export (immutable) */ __webpack_exports__["BindExp"] = BindExp;
/* harmony export (immutable) */ __webpack_exports__["BindFunc"] = BindFunc;
/* harmony export (immutable) */ __webpack_exports__["BindOn"] = BindOn;
/* harmony export (immutable) */ __webpack_exports__["BindIf"] = BindIf;
/* harmony export (immutable) */ __webpack_exports__["BindFor"] = BindFor;
/* harmony export (immutable) */ __webpack_exports__["BindMessage"] = BindMessage;
/* harmony export (immutable) */ __webpack_exports__["BindGlobalMessage"] = BindGlobalMessage;
/* harmony export (immutable) */ __webpack_exports__["BindResponse"] = BindResponse;
/* harmony export (immutable) */ __webpack_exports__["BindGlobalResponse"] = BindGlobalResponse;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reflect_metadata__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reflect_metadata___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_reflect_metadata__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_global_Patch__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_injector_Injector__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_message_Message__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_ConstructUtil__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_Dictionary__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_DisplayUtil__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__bind_Utils__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__bridge_BridgeManager__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__mediator_Mediator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__mediator_MediatorStatus__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__net_NetManager__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__net_ResponseData__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__BindUtil__ = __webpack_require__(45);
















/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-19
 * @modify date 2017-09-19
 *
 * 负责注入的模块
*/
/** 定义数据模型，支持实例注入，并且自身也会被注入 */
function ModelClass() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    // 转调Injectable方法
    if (this === __WEBPACK_IMPORTED_MODULE_2__core_global_Patch__["decorateThis"]) {
        var cls = Object(__WEBPACK_IMPORTED_MODULE_5__utils_ConstructUtil__["e" /* wrapConstruct */])(args[0]);
        __WEBPACK_IMPORTED_MODULE_3__core_injector_Injector__["Injectable"].call(this, cls);
        return cls;
    }
    else {
        var result = __WEBPACK_IMPORTED_MODULE_3__core_injector_Injector__["Injectable"].apply(this, args);
        return function (realCls) {
            realCls = Object(__WEBPACK_IMPORTED_MODULE_5__utils_ConstructUtil__["e" /* wrapConstruct */])(realCls);
            result.call(this, realCls);
            return realCls;
        };
    }
}
/** 定义界面中介者，支持实例注入，并可根据所赋显示对象自动调整所使用的表现层桥 */
function MediatorClass(moduleName) {
    return function (cls) {
        // 判断一下Mediator是否有dispose方法，没有的话弹一个警告
        if (!cls.prototype.dispose)
            console.warn("Mediator[" + cls["name"] + "]不具有dispose方法，可能会造成内存问题，请让该Mediator实现IDisposable接口");
        // 监听实例化
        Object(__WEBPACK_IMPORTED_MODULE_5__utils_ConstructUtil__["c" /* listenConstruct */])(cls, function (instance) {
            // 替换skin属性
            var $skin;
            var oriSkin = instance.skin;
            Object.defineProperty(instance, "skin", {
                configurable: true,
                enumerable: true,
                get: function () {
                    return $skin;
                },
                set: function (value) {
                    if (value === $skin)
                        return;
                    var lastBridge = this.bridge;
                    // 根据skin类型选取表现层桥
                    this.bridge = __WEBPACK_IMPORTED_MODULE_9__bridge_BridgeManager__["a" /* bridgeManager */].getBridgeBySkin(value);
                    // 记录值
                    if (this.bridge) {
                        if (this.bridge === lastBridge && $skin) {
                            // 需要判断桥的类型是否相同，且之前有皮肤，则替换皮肤
                            $skin = this.bridge.replaceSkin(this, $skin, value);
                        }
                        else {
                            // 否则直接包装一下皮肤
                            $skin = this.bridge.wrapSkin(this, value);
                        }
                    }
                    else {
                        // 不认识的皮肤类型，直接赋值
                        $skin = value;
                    }
                }
            });
            // 如果本来就有皮肤，则赋值皮肤
            if (oriSkin)
                instance.skin = oriSkin;
        });
        // 包装类
        var wrapperCls = Object(__WEBPACK_IMPORTED_MODULE_5__utils_ConstructUtil__["e" /* wrapConstruct */])(cls);
        // 注册模块，每一个Mediator都有成为独立Module的能力
        Object(__WEBPACK_IMPORTED_MODULE_10__mediator_Mediator__["registerModule"])(moduleName, wrapperCls);
        // 返回包装类
        return wrapperCls;
    };
}
function MessageHandler(target, key) {
    if (key) {
        var defs = Reflect.getMetadata("design:paramtypes", target, key);
        var resClass = defs[0];
        if (!(resClass.prototype instanceof __WEBPACK_IMPORTED_MODULE_4__core_message_Message__["a" /* default */]))
            throw new Error("@MessageHandler装饰器装饰的方法的首个参数必须是Message");
        doMessageHandler(target.constructor, key, resClass, true);
    }
    else {
        return function (prototype, propertyKey, descriptor) {
            doMessageHandler(prototype.constructor, propertyKey, target, true);
        };
    }
}
;
function GlobalMessageHandler(target, key) {
    if (key) {
        var defs = Reflect.getMetadata("design:paramtypes", target, key);
        var resClass = defs[0];
        if (!(resClass.prototype instanceof __WEBPACK_IMPORTED_MODULE_4__core_message_Message__["a" /* default */]))
            throw new Error("@GlobalMessageHandler装饰器装饰的方法的首个参数必须是Message");
        doMessageHandler(target.constructor, key, resClass, false);
    }
    else {
        return function (prototype, propertyKey, descriptor) {
            doMessageHandler(prototype.constructor, propertyKey, target, false);
        };
    }
}
;
function doMessageHandler(cls, key, type, inModule) {
    // 监听实例化
    Object(__WEBPACK_IMPORTED_MODULE_5__utils_ConstructUtil__["c" /* listenConstruct */])(cls, function (instance) {
        if (instance instanceof __WEBPACK_IMPORTED_MODULE_10__mediator_Mediator__["default"] && instance.parent) {
            // 如果是被托管的Mediator，则需要等到被托管后再执行注册
            addSubHandler(instance, function () {
                var observable = inModule ? instance.observable || __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].observable : __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].observable;
                observable.listen(type, instance[key], instance);
            });
        }
        else {
            var observable = inModule ? instance.observable || __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].observable : __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].observable;
            observable.listen(type, instance[key], instance);
        }
    });
    // 监听销毁
    Object(__WEBPACK_IMPORTED_MODULE_5__utils_ConstructUtil__["d" /* listenDispose */])(cls, function (instance) {
        var observable = inModule ? instance.observable || __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].observable : __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].observable;
        observable.unlisten(type, instance[key], instance);
    });
}
function ResponseHandler(target, key) {
    if (key) {
        var defs = Reflect.getMetadata("design:paramtypes", target, key);
        var resClass = defs[0];
        if (!(resClass.prototype instanceof __WEBPACK_IMPORTED_MODULE_13__net_ResponseData__["default"]))
            throw new Error("无参数@ResponseHandler装饰器装饰的方法的首个参数必须是ResponseData");
        doResponseHandler(target.constructor, key, defs[0], true);
    }
    else {
        return function (prototype, propertyKey, descriptor) {
            doResponseHandler(prototype.constructor, propertyKey, target, true);
        };
    }
}
function GlobalResponseHandler(target, key) {
    if (key) {
        var defs = Reflect.getMetadata("design:paramtypes", target, key);
        var resClass = defs[0];
        if (!(resClass.prototype instanceof __WEBPACK_IMPORTED_MODULE_13__net_ResponseData__["default"]))
            throw new Error("无参数@GlobalResponseHandler装饰器装饰的方法的首个参数必须是ResponseData");
        doResponseHandler(target.constructor, key, defs[0], false);
    }
    else {
        return function (prototype, propertyKey, descriptor) {
            doResponseHandler(prototype.constructor, propertyKey, target, false);
        };
    }
}
function doResponseHandler(cls, key, type, inModule) {
    // 监听实例化
    Object(__WEBPACK_IMPORTED_MODULE_5__utils_ConstructUtil__["c" /* listenConstruct */])(cls, function (instance) {
        if (instance instanceof __WEBPACK_IMPORTED_MODULE_10__mediator_Mediator__["default"] && instance.parent) {
            // 如果是被托管的Mediator，则需要等到被托管后再执行注册
            addSubHandler(instance, function () {
                __WEBPACK_IMPORTED_MODULE_12__net_NetManager__["netManager"].listenResponse(type, instance[key], instance, false, (inModule ? instance.observable : undefined));
            });
        }
        else {
            __WEBPACK_IMPORTED_MODULE_12__net_NetManager__["netManager"].listenResponse(type, instance[key], instance, false, (inModule ? instance.observable : undefined));
        }
    });
    // 监听销毁
    Object(__WEBPACK_IMPORTED_MODULE_5__utils_ConstructUtil__["d" /* listenDispose */])(cls, function (instance) {
        __WEBPACK_IMPORTED_MODULE_12__net_NetManager__["netManager"].unlistenResponse(type, instance[key], instance, false, (inModule ? instance.observable : undefined));
    });
}
var subHandlerDict = new __WEBPACK_IMPORTED_MODULE_6__utils_Dictionary__["a" /* default */]();
function addSubHandler(instance, handler) {
    if (!instance)
        return;
    var handlers = subHandlerDict.get(instance);
    if (!handlers)
        subHandlerDict.set(instance, handlers = []);
    if (handlers.indexOf(handler) < 0)
        handlers.push(handler);
}
function SubMediator(arg1, arg2, arg3) {
    var skin;
    var mediatorCls;
    var dataExp;
    // 判断是否是参数化装饰
    if (this === __WEBPACK_IMPORTED_MODULE_2__core_global_Patch__["decorateThis"]) {
        // 无参数
        doSubMediator(arg1, arg2);
    }
    else {
        // 有参数，分配参数
        if (typeof arg1 === "string" && !arg2 && !arg3) {
            dataExp = arg1;
        }
        else if (arg1 instanceof Function) {
            mediatorCls = arg1;
            dataExp = arg2;
        }
        else {
            skin = arg1;
            mediatorCls = arg2;
            dataExp = arg3;
        }
        // 返回装饰器方法
        return doSubMediator;
    }
    function doSubMediator(prototype, propertyKey) {
        if (prototype.delegateMediator instanceof Function && prototype.undelegateMediator instanceof Function) {
            // 监听实例化
            Object(__WEBPACK_IMPORTED_MODULE_5__utils_ConstructUtil__["c" /* listenConstruct */])(prototype.constructor, function (instance) {
                var mediator;
                var temp = instance[propertyKey];
                // 篡改属性
                Object.defineProperty(instance, propertyKey, {
                    configurable: true,
                    enumerable: true,
                    get: function () {
                        return mediator;
                    },
                    set: function (value) {
                        var _this = this;
                        if (value instanceof __WEBPACK_IMPORTED_MODULE_10__mediator_Mediator__["default"]) {
                            // 取消托管中介者
                            if (mediator) {
                                this.undelegateMediator(mediator);
                            }
                            // 设置中介者
                            mediator = value;
                            // 托管新的中介者
                            if (mediator) {
                                // 如果当前中介者没有皮肤就用装饰器皮肤
                                if (skin && !mediator.skin)
                                    mediator.skin = skin;
                            }
                        }
                        else if (value) {
                            // 赋值皮肤
                            skin = value;
                            // 如果存在中介者，则额外赋值中介者皮肤
                            if (mediator) {
                                if (mediator.skin && mediator.status < __WEBPACK_IMPORTED_MODULE_11__mediator_MediatorStatus__["a" /* default */].OPENED) {
                                    // 当前有皮肤且中介者尚未打开完毕，说明是现在是皮肤转发阶段，要用老皮肤替换新皮肤的位置
                                    Object(__WEBPACK_IMPORTED_MODULE_7__utils_DisplayUtil__["a" /* replaceDisplay */])(mediator.bridge, value, mediator.skin);
                                    // 同步位置
                                    mediator.bridge.syncSkin(value, mediator.skin);
                                }
                                else {
                                    // 当前没皮肤，或者中介者已经打开完毕了，说明新皮肤就是要替换老皮肤
                                    mediator.skin = value;
                                }
                            }
                        }
                        else {
                            // mediator和skin都赋值为空
                            skin = value;
                            if (mediator) {
                                mediator.skin = value;
                                this.undelegateMediator(mediator);
                            }
                            mediator = value;
                        }
                        // 如果当前中介者已经为正在打开或已打开状态，则额外调用open
                        if (mediator) {
                            // 托管中介者
                            this.delegateMediator(mediator);
                            // 如果当前中介者已经为正在打开或已打开状态，则额外调用open
                            if (mediator.skin) {
                                if (mediator.status === __WEBPACK_IMPORTED_MODULE_11__mediator_MediatorStatus__["a" /* default */].UNOPEN) {
                                    var getCommonScope = function () {
                                        return {
                                            $this: _this,
                                            $data: _this.viewModel,
                                            $bridge: _this.bridge,
                                            $currentTarget: mediator,
                                            $target: mediator
                                        };
                                    };
                                    // 子Mediator还没有open，open之
                                    if (this.status === __WEBPACK_IMPORTED_MODULE_11__mediator_MediatorStatus__["a" /* default */].OPENED) {
                                        // 父Mediator已经open了，直接open之
                                        var data = dataExp ? Object(__WEBPACK_IMPORTED_MODULE_8__bind_Utils__["c" /* evalExp */])(dataExp, this.viewModel, this.viewModel, this.data, getCommonScope()) : this.data;
                                        if (!data)
                                            data = this.data;
                                        // 执行open方法
                                        mediator.open(data);
                                    }
                                    else if (this.status < __WEBPACK_IMPORTED_MODULE_11__mediator_MediatorStatus__["a" /* default */].OPENED && dataExp) {
                                        // 父Mediator也没有open，监听子Mediator的open，篡改参数
                                        Object(__WEBPACK_IMPORTED_MODULE_5__utils_ConstructUtil__["b" /* listenApply */])(mediator, "open", function () {
                                            var data = Object(__WEBPACK_IMPORTED_MODULE_8__bind_Utils__["c" /* evalExp */])(dataExp, _this.viewModel, _this.viewModel, _this.data, getCommonScope());
                                            if (data)
                                                return [data];
                                        });
                                    }
                                }
                            }
                        }
                    }
                });
                // 实例化
                if (temp) {
                    instance[propertyKey] = temp;
                }
                else if (temp === undefined) {
                    // 优先使用装饰器提供的中介者类型，如果没有则使用元数据
                    var cls = mediatorCls || Reflect.getMetadata("design:type", prototype, propertyKey);
                    instance[propertyKey] = temp = new cls(skin);
                }
                // 执行回调
                var handlers = subHandlerDict.get(mediator);
                if (handlers) {
                    for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
                        var handler = handlers_1[_i];
                        handler(mediator);
                    }
                    // 移除记录
                    subHandlerDict.delete(mediator);
                }
            });
            // 监听销毁
            Object(__WEBPACK_IMPORTED_MODULE_5__utils_ConstructUtil__["d" /* listenDispose */])(prototype.constructor, function (instance) {
                var mediator = instance[propertyKey];
                if (mediator) {
                    // 移除实例
                    instance[propertyKey] = undefined;
                }
            });
        }
    }
}
var onOpenDict = new __WEBPACK_IMPORTED_MODULE_6__utils_Dictionary__["a" /* default */]();
function _listenOnOpen(prototype, before, after) {
    Object(__WEBPACK_IMPORTED_MODULE_5__utils_ConstructUtil__["b" /* listenApply */])(prototype.constructor, "onOpen", function (mediator) {
        // 记录onOpen篡改次数
        var count = onOpenDict.get(mediator) || 0;
        onOpenDict.set(mediator, count + 1);
        // 调用回调
        before && before(mediator);
    }, function (mediator) {
        // 调用回调
        after && after(mediator);
        // 递减篡改次数
        var count = onOpenDict.get(mediator) - 1;
        onOpenDict.set(mediator, count);
        // 判断是否所有onOpen都调用完毕，如果完毕了，则启动编译过程
        if (count <= 0) {
            // 移除数据
            onOpenDict.delete(mediator);
            // 全调用完毕了，按层级顺序由浅入深编译
            var bindTargets = mediator.bindTargets;
            for (var depth in bindTargets) {
                var dict = bindTargets[depth];
                dict.forEach(function (currentTarget) { return __WEBPACK_IMPORTED_MODULE_14__BindUtil__["compile"](mediator, currentTarget); });
            }
        }
    });
}
/**
 * 获取显示对象在mediator.skin中的嵌套层级
 *
 * @param {IMediator} mediator 中介者
 * @param {*} target 目标显示对象
 * @returns {number}
 */
function getDepth(mediator, target) {
    var skin = mediator.skin;
    var bridge = mediator.bridge;
    var depth = 0;
    if (bridge.isMySkin(target)) {
        while (target && target !== skin) {
            depth++;
            target = bridge.getParent(target);
        }
        // 如果显示对象是没有根的，或者不在skin的显示树中，则返回0
        if (!target)
            depth = 0;
    }
    return depth;
}
function searchUIDepth(values, mediator, target, callback, addressing) {
    if (addressing === void 0) { addressing = false; }
    // 获取显示层级
    var depth = getDepth(mediator, target);
    // 如果有中断编译则将遍历的工作推迟到中断重启后，否则直接开始遍历
    var stopLeftHandlers = target.__stop_left_handlers__;
    if (stopLeftHandlers)
        stopLeftHandlers.push(handler);
    else
        handler(target, mediator.bindTargets, stopLeftHandlers);
    function handler(target, bindTargets, leftHandlers) {
        var index = -1;
        if (leftHandlers)
            index = leftHandlers.indexOf(handler);
        // 遍历绑定的目标，将编译指令绑定到目标身上，而不是指令所在的显示对象身上
        Object(__WEBPACK_IMPORTED_MODULE_14__BindUtil__["searchUI"])(values, target, function (currentTarget, name, exp, depth) {
            if (addressing)
                currentTarget = currentTarget[name];
            // 记录当前编译目标和命令本体目标到bindTargets中
            var dict = bindTargets[depth];
            if (!dict)
                bindTargets[depth] = dict = new __WEBPACK_IMPORTED_MODULE_6__utils_Dictionary__["a" /* default */]();
            dict.set(currentTarget, target);
            // 调用回调
            callback(currentTarget, target, name, exp, leftHandlers, index);
        }, depth);
    }
}
/**
 * @private
 */
function BindValue(arg1, arg2) {
    return function (prototype, propertyKey) {
        _listenOnOpen(prototype, function (mediator) {
            // 组织参数字典
            var uiDict;
            if (typeof arg1 == "string") {
                uiDict = {};
                uiDict[arg1] = arg2;
            }
            else {
                uiDict = arg1;
            }
            // 遍历绑定的目标，将编译指令绑定到目标身上，而不是指令所在的显示对象身上
            var target = mediator[propertyKey];
            searchUIDepth(uiDict, mediator, target, function (currentTarget, target, name, exp) {
                // 添加编译指令
                __WEBPACK_IMPORTED_MODULE_14__BindUtil__["pushCompileCommand"](currentTarget, target, __WEBPACK_IMPORTED_MODULE_14__BindUtil__["compileValue"], name, exp);
            });
        });
    };
}
/**
 * @private
 */
function BindExp(exp) {
    return function (prototype, propertyKey) {
        _listenOnOpen(prototype, function (mediator) {
            // 组织参数字典
            var uiDict = {};
            if (exp instanceof Array) {
                for (var key in exp) {
                    uiDict[key] = exp[key];
                }
            }
            else {
                uiDict[""] = exp;
            }
            // 遍历绑定的目标，将编译指令绑定到目标身上，而不是指令所在的显示对象身上
            var target = mediator[propertyKey];
            searchUIDepth(uiDict, mediator, target, function (currentTarget, target, name, exp) {
                // 添加编译指令
                __WEBPACK_IMPORTED_MODULE_14__BindUtil__["pushCompileCommand"](currentTarget, target, __WEBPACK_IMPORTED_MODULE_14__BindUtil__["compileExp"], exp);
            });
        });
    };
}
/**
 * @private
 */
function BindFunc(arg1, arg2) {
    return function (prototype, propertyKey) {
        _listenOnOpen(prototype, function (mediator) {
            // 组织参数字典
            var funcDict;
            if (typeof arg1 == "string") {
                funcDict = {};
                funcDict[arg1] = arg2;
            }
            else {
                funcDict = arg1;
            }
            // 遍历绑定的目标，将编译指令绑定到目标身上，而不是指令所在的显示对象身上
            var target = mediator[propertyKey];
            searchUIDepth(funcDict, mediator, target, function (currentTarget, target, name, argExps) {
                // 统一参数类型为字符串数组
                if (!(argExps instanceof Array))
                    argExps = [argExps];
                // 添加编译指令
                __WEBPACK_IMPORTED_MODULE_14__BindUtil__["pushCompileCommand"].apply(__WEBPACK_IMPORTED_MODULE_14__BindUtil__, [currentTarget, target, __WEBPACK_IMPORTED_MODULE_14__BindUtil__["compileFunc"], name].concat(argExps));
            });
        });
    };
}
/**
 * @private
 */
function BindOn(arg1, arg2, arg3) {
    return function (prototype, propertyKey) {
        _listenOnOpen(prototype, function (mediator) {
            // 获取编译启动目标
            var target = mediator[propertyKey];
            // 组织参数字典
            if (typeof arg1 == "string") {
                if (arg3) {
                    // 指定了UI对象，先去寻找
                    var nameDict = {};
                    nameDict[arg1] = "";
                    searchUIDepth(nameDict, mediator, target, function (currentTarget, target, type, exp) {
                        // 添加编译指令
                        __WEBPACK_IMPORTED_MODULE_14__BindUtil__["pushCompileCommand"](currentTarget, target, __WEBPACK_IMPORTED_MODULE_14__BindUtil__["compileOn"], arg2, arg3);
                    }, true);
                }
                else {
                    var evtDict = {};
                    evtDict[arg1] = arg2;
                    // 遍历绑定的目标，将编译指令绑定到目标身上，而不是指令所在的显示对象身上
                    searchUIDepth(evtDict, mediator, target, function (currentTarget, target, type, exp) {
                        // 添加编译指令
                        __WEBPACK_IMPORTED_MODULE_14__BindUtil__["pushCompileCommand"](currentTarget, target, __WEBPACK_IMPORTED_MODULE_14__BindUtil__["compileOn"], type, exp);
                    });
                }
            }
            else {
                // 遍历绑定的目标，将编译指令绑定到目标身上，而不是指令所在的显示对象身上
                searchUIDepth(arg1, mediator, target, function (currentTarget, target, type, exp) {
                    // 添加编译指令
                    __WEBPACK_IMPORTED_MODULE_14__BindUtil__["pushCompileCommand"](currentTarget, target, __WEBPACK_IMPORTED_MODULE_14__BindUtil__["compileOn"], type, exp);
                });
            }
        });
    };
}
/**
 * @private
 */
function BindIf(arg1, arg2) {
    return function (prototype, propertyKey) {
        _listenOnOpen(prototype, function (mediator) {
            var target = mediator[propertyKey];
            if (typeof arg1 === "string" || arg1 instanceof Function) {
                if (!arg2) {
                    // 没有指定寻址路径，就是要操作当前对象，但也要经过一次searchUIDepth操作
                    searchUIDepth({ r: 13 }, mediator, target, function (currentTarget, target, name, exp) {
                        // 添加编译指令
                        __WEBPACK_IMPORTED_MODULE_14__BindUtil__["pushCompileCommand"](currentTarget, target, __WEBPACK_IMPORTED_MODULE_14__BindUtil__["compileIf"], arg1);
                    });
                }
                else {
                    // 指定了寻址路径，需要寻址
                    var uiDict = {};
                    uiDict[arg1] = arg2;
                    // 遍历绑定的目标，将编译指令绑定到目标身上，而不是指令所在的显示对象身上
                    searchUIDepth(uiDict, mediator, target, function (currentTarget, target, name, exp) {
                        // 添加编译指令
                        __WEBPACK_IMPORTED_MODULE_14__BindUtil__["pushCompileCommand"](currentTarget, target, __WEBPACK_IMPORTED_MODULE_14__BindUtil__["compileIf"], exp);
                    }, true);
                }
            }
            else {
                // 遍历绑定的目标，将编译指令绑定到目标身上，而不是指令所在的显示对象身上
                searchUIDepth(arg1, mediator, target, function (currentTarget, target, name, exp) {
                    // 添加编译指令
                    __WEBPACK_IMPORTED_MODULE_14__BindUtil__["pushCompileCommand"](currentTarget, target, __WEBPACK_IMPORTED_MODULE_14__BindUtil__["compileIf"], exp);
                }, true);
            }
        });
    };
}
/**
 * @private
 */
function BindFor(arg1, arg2, arg3) {
    // 组织参数
    var uiDict;
    var name;
    var exp;
    var mediatorCls;
    if (typeof arg1 === "string") {
        if (typeof arg2 === "string") {
            name = arg1;
            exp = arg2;
            mediatorCls = arg3;
        }
        else {
            exp = arg1;
            mediatorCls = arg2;
        }
    }
    else {
        uiDict = arg1;
    }
    return function (prototype, propertyKey) {
        _listenOnOpen(prototype, function (mediator) {
            // 取到编译目标对象
            var target = mediator[propertyKey];
            // 开始赋值指令
            if (!uiDict) {
                if (!name) {
                    // 没有指定寻址路径，就是要操作当前对象，但也要经过一次searchUIDepth操作
                    searchUIDepth({ r: 13 }, mediator, target, function (currentTarget, target, _name, _exp, leftHandlers, index) {
                        // 添加编译指令
                        __WEBPACK_IMPORTED_MODULE_14__BindUtil__["pushCompileCommand"](currentTarget, target, __WEBPACK_IMPORTED_MODULE_14__BindUtil__["compileFor"], exp, mediatorCls);
                        // 设置中断编译
                        target.__stop_left_handlers__ = leftHandlers ? leftHandlers.splice(index + 1, leftHandlers.length - index - 1) : [];
                    });
                }
                else {
                    // 指定了寻址路径，需要寻址
                    var uiDict = {};
                    uiDict[name] = exp;
                    // 遍历绑定的目标，将编译指令绑定到目标身上，而不是指令所在的显示对象身上
                    searchUIDepth(uiDict, mediator, target, function (currentTarget, target, _name, _exp, leftHandlers, index) {
                        // 添加编译指令
                        __WEBPACK_IMPORTED_MODULE_14__BindUtil__["pushCompileCommand"](currentTarget, target, __WEBPACK_IMPORTED_MODULE_14__BindUtil__["compileFor"], _exp, mediatorCls);
                        // 设置中断编译
                        target.__stop_left_handlers__ = leftHandlers ? leftHandlers.splice(index + 1, leftHandlers.length - index - 1) : [];
                    }, true);
                }
            }
            else {
                // 遍历绑定的目标，将编译指令绑定到目标身上，而不是指令所在的显示对象身上
                searchUIDepth(uiDict, mediator, target, function (currentTarget, target, _name, _exp, leftHandlers, index) {
                    // 添加编译指令
                    __WEBPACK_IMPORTED_MODULE_14__BindUtil__["pushCompileCommand"](currentTarget, target, __WEBPACK_IMPORTED_MODULE_14__BindUtil__["compileFor"], _exp, mediatorCls);
                    // 设置中断编译
                    target.__stop_left_handlers__ = leftHandlers ? leftHandlers.splice(index + 1, leftHandlers.length - index - 1) : [];
                }, true);
            }
        });
    };
}
function doBindMessage(mediator, target, type, uiDict, observable) {
    searchUIDepth(uiDict, mediator, target, function (currentTarget, target, name, exp) {
        __WEBPACK_IMPORTED_MODULE_14__BindUtil__["pushCompileCommand"](currentTarget, target, __WEBPACK_IMPORTED_MODULE_14__BindUtil__["compileMessage"], type, name, exp, observable);
    });
}
/**
 * @private
 */
function BindMessage(arg1, arg2) {
    return function (prototype, propertyKey) {
        _listenOnOpen(prototype, function (mediator) {
            var target = mediator[propertyKey];
            if (typeof arg1 == "string" || arg1 instanceof Function) {
                // 是类型方式
                doBindMessage(mediator, target, arg1, arg2, mediator.observable);
            }
            else {
                // 是字典方式
                for (var type in arg1) {
                    doBindMessage(mediator, target, type, arg1[type], mediator.observable);
                }
            }
        });
    };
}
/**
 * @private
 */
function BindGlobalMessage(arg1, arg2) {
    return function (prototype, propertyKey) {
        _listenOnOpen(prototype, function (mediator) {
            var target = mediator[propertyKey];
            if (typeof arg1 == "string" || arg1 instanceof Function) {
                // 是类型方式
                doBindMessage(mediator, target, arg1, arg2);
            }
            else {
                // 是字典方式
                for (var type in arg1) {
                    doBindMessage(mediator, target, type, arg1[type]);
                }
            }
        });
    };
}
function doBindResponse(mediator, target, type, uiDict, observable) {
    searchUIDepth(uiDict, mediator, target, function (currentTarget, target, name, exp) {
        __WEBPACK_IMPORTED_MODULE_14__BindUtil__["pushCompileCommand"](currentTarget, target, __WEBPACK_IMPORTED_MODULE_14__BindUtil__["compileResponse"], type, name, exp, observable);
    });
}
/**
 * @private
 */
function BindResponse(arg1, arg2) {
    return function (prototype, propertyKey) {
        // Response需要在onOpen之后执行，因为可能有初始化消息需要绑定，要在onOpen后有了viewModel再首次更新显示
        _listenOnOpen(prototype, function (mediator) {
            var target = mediator[propertyKey];
            if (typeof arg1 == "string" || arg1 instanceof Function) {
                // 是类型方式
                doBindResponse(mediator, target, arg1, arg2, mediator.observable);
            }
            else {
                // 是字典方式
                for (var type in arg1) {
                    doBindResponse(mediator, target, type, arg1[type], mediator.observable);
                }
            }
        });
    };
}
/**
 * @private
 */
function BindGlobalResponse(arg1, arg2) {
    return function (prototype, propertyKey) {
        _listenOnOpen(prototype, function (mediator) {
            var target = mediator[propertyKey];
            if (typeof arg1 == "string" || arg1 instanceof Function) {
                // 是类型方式
                doBindResponse(mediator, target, arg1, arg2);
            }
            else {
                // 是字典方式
                for (var type in arg1) {
                    doBindResponse(mediator, target, type, arg1[type]);
                }
            }
        });
    };
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["registerModule"] = registerModule;
/* harmony export (immutable) */ __webpack_exports__["getModule"] = getModule;
/* harmony export (immutable) */ __webpack_exports__["getModuleName"] = getModuleName;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_Core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_observable_Observable__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_Dictionary__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bind_Mutator__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bind_BindManager__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mask_MaskManager__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_AssetsManager__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__net_NetManager__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__MediatorStatus__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__IMediatorModulePart__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__utils_ArrayUtil__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__MediatorMessage__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__utils_ConstructUtil__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__system_System__ = __webpack_require__(25);














var moduleDict = {};
var moduleNameDict = new __WEBPACK_IMPORTED_MODULE_2__utils_Dictionary__["a" /* default */]();
/**
 * 注册模块
 *
 * @export
 * @param {string} moduleName 模块名
 * @param {IMediatorConstructor} cls 模块类型
 */
function registerModule(moduleName, cls) {
    moduleDict[moduleName] = cls;
    moduleNameDict.set(cls, moduleName);
}
/**
 * 获取模块类型
 *
 * @export
 * @param {string} moduleName 模块名
 * @returns {IMediatorConstructor}
 */
function getModule(moduleName) {
    return moduleDict[moduleName];
}
/**
 * 获取模块名
 *
 * @export
 * @param {ModuleType} type 模块实例或模块类型
 * @returns {string} 模块名
 */
function getModuleName(type) {
    var cls = Object(__WEBPACK_IMPORTED_MODULE_12__utils_ConstructUtil__["a" /* getConstructor */])(type instanceof Function ? type : type.constructor);
    return moduleNameDict.get(cls);
}
var Mediator = /** @class */ (function () {
    function Mediator(skin) {
        this._status = __WEBPACK_IMPORTED_MODULE_8__MediatorStatus__["a" /* default */].UNOPEN;
        /**
         * 绑定目标数组，第一层key是调用层级，第二层是该层级需要编译的对象数组
         *
         * @type {Dictionary<any, any>[]}
         * @memberof Mediator
         */
        this.bindTargets = [];
        this._openMask = true;
        this._listeners = [];
        this._disposeDict = new __WEBPACK_IMPORTED_MODULE_2__utils_Dictionary__["a" /* default */]();
        /**
         * 父中介者
         *
         * @type {IMediator}
         * @memberof Mediator
         */
        this.parent = null;
        this._children = [];
        /*********************** 下面是模块消息系统 ***********************/
        this._observable = new __WEBPACK_IMPORTED_MODULE_1__core_observable_Observable__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__core_Core__["a" /* core */]);
        // 赋值模块名称
        this._moduleName = getModuleName(this);
        // 赋值皮肤
        if (skin)
            this.skin = skin;
        this.oriSkin = skin;
        // 初始化绑定
        __WEBPACK_IMPORTED_MODULE_4__bind_BindManager__["a" /* bindManager */].bind(this);
    }
    Object.defineProperty(Mediator.prototype, "status", {
        /**
         * 获取中介者状态
         *
         * @readonly
         * @type {MediatorStatus}
         * @memberof Mediator
         */
        get: function () {
            return this._status;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mediator.prototype, "viewModel", {
        /**
         * 获取或设置ViewModel
         *
         * @type {*}
         * @memberof Mediator
         */
        get: function () {
            return this._viewModel;
        },
        set: function (value) {
            // 设置的时候进行一次变异
            this._viewModel = Object(__WEBPACK_IMPORTED_MODULE_3__bind_Mutator__["a" /* mutate */])(value);
            // 更新绑定
            __WEBPACK_IMPORTED_MODULE_4__bind_BindManager__["a" /* bindManager */].bind(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mediator.prototype, "disposed", {
        /**
         * 获取中介者是否已被销毁
         *
         * @readonly
         * @type {boolean}
         * @memberof Mediator
         */
        get: function () {
            return (this._status === __WEBPACK_IMPORTED_MODULE_8__MediatorStatus__["a" /* default */].DISPOSED);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mediator.prototype, "data", {
        /**
         * 打开时传递的data对象
         *
         * @type {*}
         * @memberof Mediator
         */
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            // 递归设置子中介者的data
            for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
                var mediator = _a[_i];
                mediator.data = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mediator.prototype, "openMask", {
        /**
         * 开启时是否触发全屏遮罩，防止用户操作，设置操作会影响所有子孙中介者。默认是true
         *
         * @type {boolean}
         * @memberof Mediator
         */
        get: function () {
            return this._openMask;
        },
        set: function (value) {
            this._openMask = value;
            // 递归设置所有子中介者的openMask
            for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
                var child = _a[_i];
                child.openMask = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mediator.prototype, "responses", {
        /**
         * 模块初始消息的返回数据
         *
         * @type {ResponseData[]}
         * @memberof Mediator
         */
        get: function () {
            return this._responses;
        },
        set: function (value) {
            this._responses = value;
            // 递归设置子中介者的data
            for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
                var mediator = _a[_i];
                mediator.responses = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mediator.prototype, "moduleName", {
        /**
         * 获取模块名
         *
         * @readonly
         * @type {string}
         * @memberof Mediator
         */
        get: function () {
            return this._moduleName;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 加载从listAssets中获取到的所有资源
     *
     * @param {(err?:Error)=>void} handler 加载完毕后的回调，如果出错则会给出err参数
     * @returns {void}
     * @memberof Mediator
     */
    Mediator.prototype.loadAssets = function (handler) {
        var _this = this;
        var mediators = this._children.concat();
        var temp = function (err) {
            if (err || mediators.length <= 0) {
                // 调用onLoadAssets接口
                _this.onLoadAssets(err);
                // 调用回调
                handler(err);
            }
            else {
                // 加载一个子中介者的资源
                var mediator = mediators.shift();
                mediator.loadAssets(temp);
            }
        };
        // 加载自身资源
        var assets = this.listAssets();
        if (assets && assets.length > 0) {
            // 去重
            assets = Object(__WEBPACK_IMPORTED_MODULE_10__utils_ArrayUtil__["a" /* unique */])(assets);
            // 开始加载
            this.bridge.loadAssets(assets, this, temp);
        }
        else {
            // 没有资源，直接调用回调
            handler();
        }
    };
    /**
     * 加载从listStyleFiles中获取到的所有资源
     *
     * @param {(err?:Error)=>void} handler 加载完毕后的回调，如果出错则会给出err参数
     * @memberof IMediator
     */
    Mediator.prototype.loadStyleFiles = function (handler) {
        var _this = this;
        var mediators = this._children.concat();
        var temp = function (err) {
            if (err || mediators.length <= 0) {
                // 调用onLoadStyleFiles接口
                _this.onLoadStyleFiles(err);
                // 调用回调
                handler(err);
            }
            else {
                // 加载一个子中介者的资源
                var mediator = mediators.shift();
                mediator.loadStyleFiles(temp);
            }
        };
        // 开始加载css文件
        var cssFiles = this.listStyleFiles();
        // 去重
        cssFiles = Object(__WEBPACK_IMPORTED_MODULE_10__utils_ArrayUtil__["a" /* unique */])(cssFiles);
        // 加载
        __WEBPACK_IMPORTED_MODULE_6__assets_AssetsManager__["b" /* assetsManager */].loadStyleFiles(cssFiles, temp);
    };
    /**
     * 加载从listJsFiles中获取到的所有资源
     *
     * @param {(err?:Error)=>void} handler 加载完毕后的回调，如果出错则会给出err参数
     * @memberof IMediator
     */
    Mediator.prototype.loadJsFiles = function (handler) {
        var _this = this;
        var mediators = this._children.concat();
        var temp = function (err) {
            if (err || mediators.length <= 0) {
                // 调用onLoadJsFiles接口
                _this.onLoadJsFiles(err);
                // 调用回调
                handler(err);
            }
            else {
                // 加载一个子中介者的js
                var mediator = mediators.shift();
                mediator.loadJsFiles(temp);
            }
        };
        // 开始加载js文件
        var jsFiles = this.listJsFiles();
        // 去重
        jsFiles = Object(__WEBPACK_IMPORTED_MODULE_10__utils_ArrayUtil__["a" /* unique */])(jsFiles);
        // 加载
        __WEBPACK_IMPORTED_MODULE_6__assets_AssetsManager__["b" /* assetsManager */].loadJsFiles(jsFiles, temp);
    };
    /**
     * 发送从listInitRequests中获取到的所有资源
     *
     * @param {(err?:Error)=>void} handler 加载完毕后的回调，如果出错则会给出err参数
     * @memberof IMediator
     */
    Mediator.prototype.sendInitRequests = function (handler) {
        var _this = this;
        var mediators = this._children.concat();
        var temp = function (responses) {
            if (responses instanceof Error) {
                var err = responses instanceof Error ? responses : undefined;
                // 调用onSendInitRequests接口
                _this.onSendInitRequests(err);
                // 调用回调
                handler(err);
            }
            else {
                if (isMine) {
                    isMine = false;
                    // 赋值返回值
                    _this.responses = responses;
                    // 调用回调
                    var stop = _this.onGetResponses(responses);
                    if (stop) {
                        var err = new Error("用户中止打开模块操作");
                        // 调用onSendInitRequests接口
                        _this.onSendInitRequests(err);
                        // 调用回调
                        handler(err);
                        return;
                    }
                }
                if (mediators.length <= 0) {
                    // 调用onSendInitRequests接口
                    _this.onSendInitRequests();
                    // 调用回调
                    handler();
                }
                else {
                    // 发送一个子中介者的初始化消息
                    var mediator = mediators.shift();
                    mediator.sendInitRequests(temp);
                }
            }
        };
        // 发送所有模块消息，模块消息默认发送全局内核
        var isMine = true;
        __WEBPACK_IMPORTED_MODULE_7__net_NetManager__["netManager"].sendMultiRequests(this.listInitRequests(), temp, this, this.observable);
    };
    /**
     * 当所需资源加载完毕后调用
     *
     * @param {Error} [err] 加载出错会给出错误对象，没错则不给
     * @memberof Mediator
     */
    Mediator.prototype.onLoadAssets = function (err) {
    };
    /**
     * 当所需CSS加载完毕后调用
     *
     * @param {Error} [err] 加载出错会给出错误对象，没错则不给
     * @memberof Mediator
     */
    Mediator.prototype.onLoadStyleFiles = function (err) {
    };
    /**
     * 当所需js加载完毕后调用
     *
     * @param {Error} [err] 加载出错会给出错误对象，没错则不给
     * @memberof Mediator
     */
    Mediator.prototype.onLoadJsFiles = function (err) {
    };
    /**
     * 当所需资源加载完毕后调用
     *
     * @param {Error} [err] 加载出错会给出错误对象，没错则不给
     * @memberof Mediator
     */
    Mediator.prototype.onSendInitRequests = function (err) {
    };
    /**
     * 当获取到所有初始化请求返回时调用，可以通过返回一个true来阻止模块的打开
     *
     * @param {ResponseData[]} responses 返回结构数组
     * @returns {boolean} 返回true则表示停止模块打开
     * @memberof Mediator
     */
    Mediator.prototype.onGetResponses = function (responses) {
        return false;
    };
    /**
     * 打开，为了实现IOpenClose接口
     *
     * @param {*} [data] 开启数据
     * @param {...any[]} args 其他数据
     * @returns {*} 返回自身引用
     * @memberof Mediator
     */
    Mediator.prototype.open = function (data) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // 判断状态
        if (this._status === __WEBPACK_IMPORTED_MODULE_8__MediatorStatus__["a" /* default */].UNOPEN) {
            // 修改状态
            this._status = __WEBPACK_IMPORTED_MODULE_8__MediatorStatus__["a" /* default */].OPENING;
            // 赋值参数
            this.data = data;
            // 记一个是否需要遮罩的flag
            var maskFlag = this.openMask;
            // 发送初始化消息
            this.sendInitRequests(function (err) {
                if (err) {
                    // 移除遮罩
                    hideMask();
                    // 调用回调
                    _this.moduleOpenHandler && _this.moduleOpenHandler(__WEBPACK_IMPORTED_MODULE_9__IMediatorModulePart__["a" /* ModuleOpenStatus */].Stop, err);
                }
                else {
                    // 加载所有已托管中介者的资源
                    _this.loadAssets(function (err) {
                        if (err) {
                            // 移除遮罩
                            hideMask();
                            // 调用回调
                            _this.moduleOpenHandler && _this.moduleOpenHandler(__WEBPACK_IMPORTED_MODULE_9__IMediatorModulePart__["a" /* ModuleOpenStatus */].Stop, err);
                        }
                        else {
                            // 加载css文件
                            _this.loadStyleFiles(function (err) {
                                if (err) {
                                    // 移除遮罩
                                    hideMask();
                                    // 调用回调
                                    _this.moduleOpenHandler && _this.moduleOpenHandler(__WEBPACK_IMPORTED_MODULE_9__IMediatorModulePart__["a" /* ModuleOpenStatus */].Stop, err);
                                }
                                else {
                                    // 加载js文件
                                    _this.loadJsFiles(function (err) {
                                        // 移除遮罩
                                        hideMask();
                                        // 判断错误
                                        if (err) {
                                            // 调用回调
                                            _this.moduleOpenHandler && _this.moduleOpenHandler(__WEBPACK_IMPORTED_MODULE_9__IMediatorModulePart__["a" /* ModuleOpenStatus */].Stop, err);
                                        }
                                        else {
                                            // 要先开启自身，再开启子中介者
                                            // 调用回调
                                            _this.moduleOpenHandler && _this.moduleOpenHandler(__WEBPACK_IMPORTED_MODULE_9__IMediatorModulePart__["a" /* ModuleOpenStatus */].BeforeOpen);
                                            // 调用模板方法
                                            _this.__beforeOnOpen.apply(_this, [data].concat(args));
                                            // 调用自身onOpen方法
                                            var result = _this.onOpen.apply(_this, [data].concat(args));
                                            if (result !== undefined)
                                                _this.data = data = result;
                                            // 初始化绑定，如果子类并没有在onOpen中设置viewModel，则给一个默认值以启动绑定功能
                                            if (!_this._viewModel)
                                                _this.viewModel = {};
                                            // 记录子中介者数量，并监听其开启完毕事件
                                            var subCount = _this._children.length;
                                            if (subCount > 0) {
                                                // 调用所有已托管中介者的open方法
                                                for (var _i = 0, _a = _this._children; _i < _a.length; _i++) {
                                                    var mediator = _a[_i];
                                                    mediator.open(data);
                                                }
                                            }
                                            // 修改状态
                                            _this._status = __WEBPACK_IMPORTED_MODULE_8__MediatorStatus__["a" /* default */].OPENED;
                                            // 调用模板方法
                                            _this.__afterOnOpen.apply(_this, [data].concat(args));
                                            // 调用回调
                                            _this.moduleOpenHandler && _this.moduleOpenHandler(__WEBPACK_IMPORTED_MODULE_9__IMediatorModulePart__["a" /* ModuleOpenStatus */].AfterOpen);
                                            // 派发事件
                                            _this.dispatch(__WEBPACK_IMPORTED_MODULE_11__MediatorMessage__["a" /* default */].MEDIATOR_OPENED, _this);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
            // 显示Loading
            if (maskFlag) {
                __WEBPACK_IMPORTED_MODULE_5__mask_MaskManager__["a" /* maskManager */].showLoading(null, "mediatorOpen");
                maskFlag = false;
            }
        }
        // 返回自身引用
        return this;
        function hideMask() {
            // 隐藏Loading
            if (!maskFlag)
                __WEBPACK_IMPORTED_MODULE_5__mask_MaskManager__["a" /* maskManager */].hideLoading("mediatorOpen");
            maskFlag = false;
        }
    };
    Mediator.prototype.__beforeOnOpen = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // 给子类用的模板方法
    };
    Mediator.prototype.__afterOnOpen = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // 给子类用的模板方法
    };
    /**
     * 关闭，为了实现IOpenClose接口
     *
     * @param {*} [data] 关闭数据
     * @param {...any[]} args 其他参数
     * @returns {*} 返回自身引用
     * @memberof Mediator
     */
    Mediator.prototype.close = function (data) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this._status === __WEBPACK_IMPORTED_MODULE_8__MediatorStatus__["a" /* default */].OPENED) {
            var doClose = function () {
                // 调用模板方法
                _this.__beforeOnClose.apply(_this, [data].concat(args));
                // 修改状态
                _this._status = __WEBPACK_IMPORTED_MODULE_8__MediatorStatus__["a" /* default */].CLOSING;
                // 调用自身onClose方法
                _this.onClose.apply(_this, [data].concat(args));
                // 修改状态
                _this._status = __WEBPACK_IMPORTED_MODULE_8__MediatorStatus__["a" /* default */].CLOSED;
                // 调用模板方法
                _this.__afterOnClose.apply(_this, [data].concat(args));
            };
            var subCount = this._children.length;
            if (subCount > 0) {
                var handler = function (mediator) {
                    if (_this._children.indexOf(mediator) >= 0 && --subCount === 0) {
                        // 取消监听
                        _this.unlisten(__WEBPACK_IMPORTED_MODULE_11__MediatorMessage__["a" /* default */].MEDIATOR_CLOSED, handler);
                        // 执行关闭
                        doClose();
                    }
                };
                this.listen(__WEBPACK_IMPORTED_MODULE_11__MediatorMessage__["a" /* default */].MEDIATOR_CLOSED, handler);
                // 调用所有已托管中介者的close方法
                for (var _a = 0, _b = this._children.concat(); _a < _b.length; _a++) {
                    var mediator = _b[_a];
                    mediator.close(data);
                }
            }
            else {
                // 没有子中介者，直接执行
                doClose();
            }
        }
        // 返回自身引用
        return this;
    };
    Mediator.prototype.__beforeOnClose = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // 给子类用的模板方法
    };
    Mediator.prototype.__afterOnClose = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // 派发关闭事件
        this.dispatch(__WEBPACK_IMPORTED_MODULE_11__MediatorMessage__["a" /* default */].MEDIATOR_CLOSED, this);
        // 给子类用的模板方法
        this.dispose();
    };
    /**
     * 当打开时调用
     *
     * @param {*} [data] 可能的打开参数
     * @param {...any[]} args 其他参数
     * @returns {*} 若返回对象则使用该对象替换传入的data进行后续开启操作
     * @memberof Mediator
     */
    Mediator.prototype.onOpen = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // 可重写
    };
    /**
     * 当关闭时调用
     *
     * @param {*} [data] 可能的关闭参数
     * @param {...any[]} args 其他参数
     * @memberof Mediator
     */
    Mediator.prototype.onClose = function (data) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // 可重写
    };
    /**
     * 监听事件，从这个方法监听的事件会在中介者销毁时被自动移除监听
     *
     * @param {*} target 事件目标对象
     * @param {string} type 事件类型
     * @param {Function} handler 事件处理函数
     * @param {*} [thisArg] this指向对象
     * @memberof Mediator
     */
    Mediator.prototype.mapListener = function (target, type, handler, thisArg) {
        for (var i = 0, len = this._listeners.length; i < len; i++) {
            var data = this._listeners[i];
            if (data.target == target && data.type == type && data.handler == handler && data.thisArg == thisArg) {
                // 已经存在一样的监听，不再监听
                return;
            }
        }
        // 记录监听
        this._listeners.push({ target: target, type: type, handler: handler, thisArg: thisArg });
        // 调用桥接口
        this.bridge.mapListener(target, type, handler, thisArg);
    };
    /**
     * 注销监听事件
     *
     * @param {*} target 事件目标对象
     * @param {string} type 事件类型
     * @param {Function} handler 事件处理函数
     * @param {*} [thisArg] this指向对象
     * @memberof Mediator
     */
    Mediator.prototype.unmapListener = function (target, type, handler, thisArg) {
        for (var i = 0, len = this._listeners.length; i < len; i++) {
            var data = this._listeners[i];
            if (data.target == target && data.type == type && data.handler == handler && data.thisArg == thisArg) {
                // 调用桥接口
                this.bridge.unmapListener(target, type, handler, thisArg);
                // 移除记录
                this._listeners.splice(i, 1);
                break;
            }
        }
    };
    /**
     * 注销所有注册在当前中介者上的事件监听
     *
     * @memberof Mediator
     */
    Mediator.prototype.unmapAllListeners = function () {
        for (var i = 0, len = this._listeners.length; i < len; i++) {
            var data = this._listeners.pop();
            // 调用桥接口
            this.bridge.unmapListener(data.target, data.type, data.handler, data.thisArg);
        }
    };
    Mediator.prototype.disposeChild = function (mediator, oriDispose) {
        // 调用原始销毁方法
        oriDispose.call(mediator);
        // 取消托管
        this.undelegateMediator(mediator);
    };
    ;
    Object.defineProperty(Mediator.prototype, "root", {
        /**
         * 获取根级中介者（当做模块直接被打开的中介者）
         *
         * @type {IMediator}
         * @memberof IMediator
         */
        get: function () {
            return (this.parent ? this.parent.root : this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mediator.prototype, "children", {
        /**
         * 获取所有子中介者
         *
         * @type {IMediator[]}
         * @memberof Mediator
         */
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 托管子中介者
     *
     * @param {IMediator} mediator 要托管的中介者
     * @memberof Mediator
     */
    Mediator.prototype.delegateMediator = function (mediator) {
        if (this._children.indexOf(mediator) < 0) {
            // 托管新的中介者
            this._children.push(mediator);
            // 设置关系
            mediator.parent = this;
            // 设置observable关系
            mediator.observable.parent = this._observable;
            // 篡改dispose方法，以监听其dispose
            if (mediator.hasOwnProperty("dispose"))
                this._disposeDict.set(mediator, mediator.dispose);
            mediator.dispose = this.disposeChild.bind(this, mediator, mediator.dispose);
        }
    };
    /**
     * 取消托管子中介者
     *
     * @param {IMediator} mediator 要取消托管的中介者
     * @memberof Mediator
     */
    Mediator.prototype.undelegateMediator = function (mediator) {
        var index = this._children.indexOf(mediator);
        if (index >= 0) {
            // 取消托管中介者
            this._children.splice(index, 1);
            // 移除关系
            mediator.parent = null;
            // 移除observable关系
            if (mediator.observable)
                mediator.observable.parent = null;
            // 恢复dispose方法，取消监听dispose
            var oriDispose = this._disposeDict.get(mediator);
            if (oriDispose)
                mediator.dispose = oriDispose;
            else
                delete mediator.dispose;
            this._disposeDict.delete(mediator);
        }
    };
    /**
     * 判断指定中介者是否包含在该中介者里（判断范围包括当前中介者和子孙级中介者）
     *
     * @param {IMediator} mediator 要判断的中介者
     * @returns {boolean}
     * @memberof Mediator
     */
    Mediator.prototype.containsMediator = function (mediator) {
        // 首先判断自身
        if (mediator === this)
            return true;
        // 判断子中介者
        var contains = false;
        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (child.containsMediator(mediator)) {
                contains = true;
                break;
            }
        }
        return contains;
    };
    /**
     * 其他模块被关闭回到当前模块时调用
     *
     * @param {(IMediator|undefined)} from 从哪个模块回到当前模块
     * @param {*} [data] 可能的参数传递
     * @memberof Mediator
     */
    Mediator.prototype.wakeUp = function (from, data) {
        // 调用自身方法
        this.onWakeUp(from, data);
        // 递归调用子中介者方法
        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
            var mediator = _a[_i];
            mediator.onWakeUp(from, data);
        }
    };
    /**
     * 模块切换到前台时调用（与wakeUp的区别是open时activate会触发，但wakeUp不会）
     *
     * @param {(IMediator|undefined)} from 从哪个模块来到当前模块
     * @param {*} [data] 可能的参数传递
     * @memberof Mediator
     */
    Mediator.prototype.activate = function (from, data) {
        // 调用自身方法
        this.onActivate(from, data);
        // 递归调用子中介者方法
        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
            var mediator = _a[_i];
            mediator.onActivate(from, data);
        }
    };
    /**
     * 模块切换到后台时调用（close之后或者其他模块打开时）
     *
     * @param {(IMediator|undefined)} to 将要去往哪个模块
     * @param {*} [data] 可能的参数传递
     * @memberof Mediator
     */
    Mediator.prototype.deactivate = function (to, data) {
        // 调用自身方法
        this.onDeactivate(to, data);
        // 递归调用子中介者方法
        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
            var mediator = _a[_i];
            mediator.onDeactivate(to, data);
        }
    };
    /**
     * 列出中介者所需的资源数组，可重写
     *
     * @returns {string[]}
     * @memberof Mediator
     */
    Mediator.prototype.listAssets = function () {
        return null;
    };
    /**
     * 列出所需CSS资源URL，可重写
     *
     * @returns {string[]}
     * @memberof Mediator
     */
    Mediator.prototype.listStyleFiles = function () {
        return null;
    };
    /**
     * 列出所需JS资源URL，可重写
     *
     * @returns {string[]}
     * @memberof Mediator
     */
    Mediator.prototype.listJsFiles = function () {
        return null;
    };
    /**
     * 列出模块初始化请求，可重写
     *
     * @returns {RequestData[]}
     * @memberof Mediator
     */
    Mediator.prototype.listInitRequests = function () {
        return null;
    };
    /**
     * 其他模块被关闭回到当前模块时调用
     *
     * @param {(IMediator|undefined)} from 从哪个模块回到当前模块
     * @param {*} [data] 可能的参数传递
     * @memberof Mediator
     */
    Mediator.prototype.onWakeUp = function (from, data) {
        // 可重写
    };
    /**
     * 模块切换到前台时调用（与onWakeUp的区别是open时onActivate会触发，但onWakeUp不会）
     *
     * @param {(IMediator|undefined)} from 从哪个模块来到当前模块
     * @param {*} [data] 可能的参数传递
     * @memberof Mediator
     */
    Mediator.prototype.onActivate = function (from, data) {
        // 可重写
    };
    /**
     * 模块切换到后台时调用（close之后或者其他模块打开时）
     *
     * @param {(IMediator|undefined)} to 将要去往哪个模块
     * @param {*} [data] 可能的参数传递
     * @memberof Mediator
     */
    Mediator.prototype.onDeactivate = function (to, data) {
        // 可重写
    };
    Object.defineProperty(Mediator.prototype, "observable", {
        /**
         * 暴露IObservable
         *
         * @readonly
         * @type {IObservable}
         * @memberof Mediator
         */
        get: function () {
            return this._observable;
        },
        enumerable: true,
        configurable: true
    });
    /** dispatch方法实现 */
    Mediator.prototype.dispatch = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this._observable.dispatch.apply(this._observable, params);
    };
    /**
     * 监听消息
     *
     * @param {string} type 消息类型
     * @param {Function} handler 消息处理函数
     * @param {*} [thisArg] 消息this指向
     * @param {boolean} [once=false] 是否是一次性监听
     * @memberof Mediator
     */
    Mediator.prototype.listen = function (type, handler, thisArg, once) {
        if (once === void 0) { once = false; }
        this._observable.listen(type, handler, thisArg, once);
    };
    /**
     * 移除消息监听
     *
     * @param {string} type 消息类型
     * @param {Function} handler 消息处理函数
     * @param {*} [thisArg] 消息this指向
     * @param {boolean} [once=false] 是否是一次性监听
     * @memberof Mediator
     */
    Mediator.prototype.unlisten = function (type, handler, thisArg, once) {
        if (once === void 0) { once = false; }
        this._observable.unlisten(type, handler, thisArg, once);
    };
    /**
     * 注册命令到特定消息类型上，当这个类型的消息派发到框架内核时会触发Command运行
     *
     * @param {string} type 要注册的消息类型
     * @param {(ICommandConstructor)} cmd 命令处理器，可以是方法形式，也可以使类形式
     * @memberof Mediator
     */
    Mediator.prototype.mapCommand = function (type, cmd) {
        this._observable.mapCommand(type, cmd);
    };
    /**
     * 注销命令
     *
     * @param {string} type 要注销的消息类型
     * @param {(ICommandConstructor)} cmd 命令处理器
     * @returns {void}
     * @memberof Mediator
     */
    Mediator.prototype.unmapCommand = function (type, cmd) {
        this._observable.unmapCommand(type, cmd);
    };
    /**
     * 销毁中介者
     *
     * @memberof Mediator
     */
    Mediator.prototype.dispose = function () {
        var _this = this;
        // 判断状态
        if (this.status >= __WEBPACK_IMPORTED_MODULE_8__MediatorStatus__["a" /* default */].DISPOSING)
            return;
        // 修改状态
        this._status = __WEBPACK_IMPORTED_MODULE_8__MediatorStatus__["a" /* default */].DISPOSING;
        // 移除绑定
        __WEBPACK_IMPORTED_MODULE_4__bind_BindManager__["a" /* bindManager */].unbind(this);
        // 注销事件监听
        this.unmapAllListeners();
        // 调用模板方法
        this.onDispose();
        // 移除显示，只移除没有原始皮肤的，因为如果有原始皮肤，其原始parent可能不希望子节点被移除
        if (!this.oriSkin) {
            if (this.skin && this.bridge) {
                var parent = this.bridge.getParent(this.skin);
                if (parent)
                    this.bridge.removeChild(parent, this.skin);
            }
        }
        // 移除表现层桥
        this.bridge = null;
        // 移除ViewModel
        this._viewModel = null;
        // 移除绑定目标数组
        this.bindTargets = null;
        // 移除皮肤
        this.skin = null;
        this.oriSkin = null;
        // 将所有子中介者销毁
        for (var i = 0, len = this._children.length; i < len; i++) {
            var mediator = this._children.pop();
            this.undelegateMediator(mediator);
            mediator.dispose();
        }
        // 将observable的销毁拖延到下一帧，因为虽然执行了销毁，但有可能这之后还会使用observable发送消息
        __WEBPACK_IMPORTED_MODULE_13__system_System__["a" /* system */].nextFrame(function () {
            // 移除observable
            _this._observable.dispose();
            _this._observable = null;
            // 修改状态
            _this._status = __WEBPACK_IMPORTED_MODULE_8__MediatorStatus__["a" /* default */].DISPOSED;
        });
    };
    /**
     * 当销毁时调用
     *
     * @memberof Mediator
     */
    Mediator.prototype.onDispose = function () {
        // 可重写
    };
    return Mediator;
}());
/* harmony default export */ __webpack_exports__["default"] = (Mediator);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return bridgeManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_injector_Injector__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mediator_Mediator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__BridgeMessage__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__panel_PanelManager__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__scene_SceneManager__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__module_ModuleManager__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mask_MaskManager__ = __webpack_require__(15);









/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-06
 * @modify date 2017-09-06
 *
 * 用来管理所有表现层对象
*/
var BridgeManager = /** @class */ (function () {
    function BridgeManager() {
        this._bridgeDict = {};
        this._bridgeList = [];
    }
    Object.defineProperty(BridgeManager.prototype, "currentBridge", {
        /**
         * 获取当前的表现层桥实例（规则是取当前模块的第一个拥有bridge属性的Mediator的bridge）
         *
         * @readonly
         * @type {IBridge}
         * @memberof BridgeManager
         */
        get: function () {
            // 找出当前的场景或模块
            var curHasBridge = __WEBPACK_IMPORTED_MODULE_6__scene_SceneManager__["a" /* sceneManager */].currentScene || __WEBPACK_IMPORTED_MODULE_7__module_ModuleManager__["moduleManager"].currentModuleInstance;
            // 先用当前首个IHasBridge的bridge
            if (curHasBridge) {
                var hasBridges = this.getAllHasBridges(curHasBridge);
                for (var _i = 0, hasBridges_1 = hasBridges; _i < hasBridges_1.length; _i++) {
                    var hasBridge = hasBridges_1[_i];
                    if (hasBridge.bridge)
                        return hasBridge.bridge;
                }
            }
            // 没找到，再用第一个桥代替
            return (this._bridgeList[0] && this._bridgeList[0][0]);
        },
        enumerable: true,
        configurable: true
    });
    BridgeManager.prototype.getAllHasBridges = function (hasBridge) {
        var result = [hasBridge];
        // 如果是中介者，则额外提供子中介者
        if (hasBridge instanceof __WEBPACK_IMPORTED_MODULE_3__mediator_Mediator__["default"]) {
            for (var _i = 0, _a = hasBridge.children; _i < _a.length; _i++) {
                var temp = _a[_i];
                result = result.concat(this.getAllHasBridges(temp));
            }
        }
        return result;
    };
    /**
     * 获取表现层桥实例
     *
     * @param {string} type 表现层类型
     * @returns {IBridge} 表现层桥实例
     * @memberof BridgeManager
     */
    BridgeManager.prototype.getBridge = function (type) {
        var data = this._bridgeDict[type];
        return (data && data[0]);
    };
    /**
     * 通过给出一个显示对象皮肤实例来获取合适的表现层桥实例
     *
     * @param {*} skin 皮肤实例
     * @returns {IBridge|null} 皮肤所属表现层桥实例
     * @memberof BridgeManager
     */
    BridgeManager.prototype.getBridgeBySkin = function (skin) {
        if (skin) {
            // 遍历所有已注册的表现层桥进行判断
            for (var _i = 0, _a = this._bridgeList; _i < _a.length; _i++) {
                var data = _a[_i];
                var bridge = data[0];
                if (bridge.isMySkin(skin))
                    return bridge;
            }
        }
        return null;
    };
    /**
     * 注册一个表现层桥实例到框架中
     *
     * @param {...IBridge[]} bridges 要注册的所有表现层桥
     * @memberof BridgeManager
     */
    BridgeManager.prototype.registerBridge = function () {
        var _this = this;
        var bridges = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            bridges[_i] = arguments[_i];
        }
        // 进行DOM初始化判断
        if (!document.body) {
            var onLoad = function (evt) {
                window.removeEventListener("load", onLoad);
                // 重新调用注册方法
                _this.registerBridge.apply(_this, bridges);
            };
            window.addEventListener("load", onLoad);
            return;
        }
        // 进行初始化
        if (bridges.length > 0) {
            var self = this;
            // 记录
            for (var _a = 0, bridges_1 = bridges; _a < bridges_1.length; _a++) {
                var bridge = bridges_1[_a];
                var type = bridge.type;
                if (!this._bridgeDict[type]) {
                    var data = [bridge, false];
                    this._bridgeDict[type] = data;
                    this._bridgeList.push(data);
                }
            }
            // 开始初始化
            for (var _b = 0, bridges_2 = bridges; _b < bridges_2.length; _b++) {
                var bridge = bridges_2[_b];
                // 派发消息
                __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].dispatch(__WEBPACK_IMPORTED_MODULE_4__BridgeMessage__["a" /* default */].BRIDGE_BEFORE_INIT, bridge);
                // 初始化Mask
                __WEBPACK_IMPORTED_MODULE_8__mask_MaskManager__["a" /* maskManager */].registerMask(bridge.type, bridge.maskEntity);
                // 注册通用提示框
                __WEBPACK_IMPORTED_MODULE_5__panel_PanelManager__["a" /* panelManager */].registerPrompt(bridge.type, bridge.promptClass);
                // 初始化该表现层实例
                if (bridge.init)
                    bridge.init(afterInitBridge);
                else
                    afterInitBridge(bridge);
            }
        }
        else {
            this.testAllInit();
        }
        function afterInitBridge(bridge) {
            // 派发消息
            __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].dispatch(__WEBPACK_IMPORTED_MODULE_4__BridgeMessage__["a" /* default */].BRIDGE_AFTER_INIT, bridge);
            // 设置初始化完毕属性
            var data = self._bridgeDict[bridge.type];
            data[1] = true;
            // 先隐藏表现层桥的htmlWrapper
            bridge.htmlWrapper.style.display = "none";
            // 测试是否全部初始化完毕
            self.testAllInit();
        }
    };
    BridgeManager.prototype.testAllInit = function () {
        var allInited = true;
        for (var _i = 0, _a = this._bridgeList; _i < _a.length; _i++) {
            var data = _a[_i];
            allInited = allInited && data[1];
        }
        if (allInited)
            __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].dispatch(__WEBPACK_IMPORTED_MODULE_4__BridgeMessage__["a" /* default */].BRIDGE_ALL_INIT);
    };
    BridgeManager = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
        __WEBPACK_IMPORTED_MODULE_2__core_injector_Injector__["Injectable"]
    ], BridgeManager);
    return BridgeManager;
}());
/* unused harmony default export */ var _unused_webpack_default_export = (BridgeManager);
/** 再额外导出一个单例 */
var bridgeManager = __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].getInject(BridgeManager);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moduleManager", function() { return moduleManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_injector_Injector__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_ConstructUtil__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ModuleMessage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mediator_IMediatorModulePart__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mediator_Mediator__ = __webpack_require__(8);







/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-14
 * @modify date 2017-09-15
 *
 * 模块管理器，管理模块相关的所有操作。模块具有唯一性，同一时间不可以打开两个相同模块，如果打开则会退回到先前的模块处
*/
var ModuleManager = /** @class */ (function () {
    function ModuleManager() {
        this._moduleStack = [];
        this._openCache = [];
        this._opening = null;
        this._busy = false;
    }
    Object.defineProperty(ModuleManager.prototype, "currentModule", {
        /**
         * 获取当前模块
         *
         * @readonly
         * @type {IMediatorConstructor|undefined}
         * @memberof ModuleManager
         */
        get: function () {
            var curData = this.getCurrent();
            return (curData && curData[0]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuleManager.prototype, "currentModuleInstance", {
        /**
         * 获取当前模块的实例
         *
         * @readonly
         * @type {(IMediator|undefined)}
         * @memberof ModuleManager
         */
        get: function () {
            var curData = this.getCurrent();
            return (curData && curData[1]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModuleManager.prototype, "activeCount", {
        /**
         * 获取活动模块数量
         *
         * @readonly
         * @type {number}
         * @memberof ModuleManager
         */
        get: function () {
            return this._moduleStack.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取模块在栈中的索引
     *
     * @param {IMediatorConstructor} cls 模块类型
     * @returns {number} 索引值
     * @memberof ModuleManager
     */
    ModuleManager.prototype.getIndex = function (cls) {
        for (var i = 0, len = this._moduleStack.length; i < len; i++) {
            if (this._moduleStack[i][0] == cls)
                return i;
        }
        return -1;
    };
    /**
     * 获取索引处模块类型
     *
     * @param {number} index 模块索引值
     * @returns {IMediatorConstructor} 模块类型
     * @memberof ModuleManager
     */
    ModuleManager.prototype.getModule = function (index) {
        var data = this._moduleStack[index];
        return data && data[0];
    };
    ModuleManager.prototype.getAfter = function (cls) {
        var result = [];
        for (var _i = 0, _a = this._moduleStack; _i < _a.length; _i++) {
            var module = _a[_i];
            if (module[0] == cls)
                return result;
            result.push(module);
        }
        return null;
    };
    ModuleManager.prototype.getCurrent = function () {
        // 按顺序遍历模块，取出最新的没有在开启中的模块
        var target;
        for (var _i = 0, _a = this._moduleStack; _i < _a.length; _i++) {
            var temp = _a[_i];
            if (temp[0] !== this._opening) {
                target = temp;
                break;
            }
        }
        return target;
    };
    /**
     * 获取模块是否开启中
     *
     * @param {IMediatorConstructor} cls 要判断的模块类型
     * @returns {boolean} 是否开启
     * @memberof ModuleManager
     */
    ModuleManager.prototype.isOpened = function (cls) {
        return (this._moduleStack.filter(function (temp) { return temp[0] == cls; }).length > 0);
    };
    ModuleManager.prototype.activateModule = function (module, from, data) {
        if (module) {
            // 调用activate接口
            module.activate(from, data);
        }
    };
    ModuleManager.prototype.deactivateModule = function (module, to, data) {
        if (module) {
            // 调用deactivate接口
            module.deactivate(to, data);
        }
    };
    /**
     * 打开模块
     *
     * @param {ModuleType|string} clsOrName 模块类型或名称
     * @param {*} [data] 参数
     * @param {boolean} [replace=false] 是否替换当前模块
     * @memberof ModuleManager
     */
    ModuleManager.prototype.open = function (module, data, replace) {
        var _this = this;
        if (replace === void 0) { replace = false; }
        // 如果是字符串则获取引用
        var type = (typeof module == "string" ? Object(__WEBPACK_IMPORTED_MODULE_6__mediator_Mediator__["getModule"])(module) : module);
        // 非空判断
        if (!type)
            return;
        // 判断是否正在打开模块
        if (this._busy) {
            this._openCache.push([type, data, replace]);
            return;
        }
        this._busy = true;
        // 取到类型
        var cls = Object(__WEBPACK_IMPORTED_MODULE_3__utils_ConstructUtil__["a" /* getConstructor */])(type instanceof Function ? type : type.constructor);
        var after = this.getAfter(cls);
        if (!after) {
            // 记录正在打开的模块类型
            this._opening = type;
            // 尚未打开过，正常开启模块
            var target = type instanceof Function ? new cls() : type;
            // 赋值打开参数
            target.data = data;
            // 数据先行
            var from = this.getCurrent();
            var fromModule = from && from[1];
            var moduleData = [cls, target, null];
            this._moduleStack.unshift(moduleData);
            // 设置回调
            target.moduleOpenHandler = function (status, err) {
                switch (status) {
                    case __WEBPACK_IMPORTED_MODULE_5__mediator_IMediatorModulePart__["a" /* ModuleOpenStatus */].Stop:
                        // 移除先行数据
                        var tempData = _this._moduleStack.shift();
                        // 销毁模块
                        tempData[1].dispose();
                        // 派发失败消息
                        __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].dispatch(__WEBPACK_IMPORTED_MODULE_4__ModuleMessage__["default"].MODULE_CHANGE_FAILED, cls, from && from[0], err);
                        // 结束一次模块开启
                        _this.onFinishOpen();
                        break;
                    case __WEBPACK_IMPORTED_MODULE_5__mediator_IMediatorModulePart__["a" /* ModuleOpenStatus */].BeforeOpen:
                        // 这里要优先关闭标识符，否则在开启的模块的onOpen方法里如果有操作Mask的动作就会被这个标识阻塞住
                        _this._opening = null;
                        // 篡改target的close方法，使其改为触发ModuleManager的close
                        moduleData[2] = target.hasOwnProperty("close") ? target.close : null;
                        target.close = function (data) {
                            moduleManager.close(target, data);
                        };
                        break;
                    case __WEBPACK_IMPORTED_MODULE_5__mediator_IMediatorModulePart__["a" /* ModuleOpenStatus */].AfterOpen:
                        // 调用onDeactivate接口
                        _this.deactivateModule(fromModule, target, data);
                        // 调用onActivate接口
                        _this.activateModule(target, fromModule, data);
                        // 如果replace是true，则关掉上一个模块
                        if (replace)
                            _this.close(from && from[0], data);
                        // 派发消息
                        __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].dispatch(__WEBPACK_IMPORTED_MODULE_4__ModuleMessage__["default"].MODULE_CHANGE, cls, fromModule);
                        // 结束一次模块开启
                        _this.onFinishOpen();
                        break;
                }
            };
            // 调用open接口
            target.open(data);
        }
        else if (after.length > 0) {
            // 已经打开且不是当前模块，先关闭当前模块到目标模块之间的所有模块
            for (var i = 1, len = after.length; i < len; i++) {
                this.close(after[i][0], data);
            }
            // 最后关闭当前模块，以实现从当前模块直接跳回到目标模块
            this.close(after[0][0], data);
            // 结束一次模块开启
            this.onFinishOpen();
        }
        else {
            // 结束一次模块开启
            this.onFinishOpen();
        }
    };
    ModuleManager.prototype.onFinishOpen = function () {
        // 关闭标识符
        this._opening = null;
        this._busy = false;
        // 如果有缓存的模块需要打开则打开之
        if (this._openCache.length > 0)
            this.open.apply(this, this._openCache.shift());
    };
    /**
     * 关闭模块，只有关闭的是当前模块时才会触发onDeactivate和onActivate，否则只会触发close
     *
     * @param {ModuleType|string} clsOrName 模块类型或名称
     * @param {*} [data] 参数
     * @memberof ModuleManager
     */
    ModuleManager.prototype.close = function (module, data) {
        // 如果是字符串则获取引用
        var type = (typeof module == "string" ? Object(__WEBPACK_IMPORTED_MODULE_6__mediator_Mediator__["getModule"])(module) : module);
        // 非空判断
        if (!type)
            return;
        // 数量判断，不足一个模块时不关闭
        if (this.activeCount <= 1)
            return;
        // 取到类型
        var cls = Object(__WEBPACK_IMPORTED_MODULE_3__utils_ConstructUtil__["a" /* getConstructor */])(type instanceof Function ? type : type.constructor);
        // 存在性判断
        var index = this.getIndex(cls);
        if (index < 0)
            return;
        // 取到目标模块
        var moduleData = this._moduleStack[index];
        var target = moduleData[1];
        // 恢复原始close方法
        var oriClose = moduleData[2];
        if (oriClose)
            target.close = oriClose;
        else
            delete target.close;
        // 如果是当前模块，则需要调用onDeactivate和onActivate接口，否则不用
        if (index == 0) {
            // 数据先行
            this._moduleStack.shift();
            // 获取前一个模块
            var to = this._moduleStack[0];
            var toModule = to && to[1];
            // 调用onDeactivate接口
            this.deactivateModule(target, toModule, data);
            // 调用close接口
            target.close(data);
            // 调用onActivate接口
            this.activateModule(toModule, target, data);
            // 调用onWakeUp接口
            toModule.wakeUp(target, data);
            // 派发消息
            __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].dispatch(__WEBPACK_IMPORTED_MODULE_4__ModuleMessage__["default"].MODULE_CHANGE, to && to[0], cls);
        }
        else {
            // 数据先行
            this._moduleStack.splice(index, 1);
            // 调用close接口
            target.close(data);
        }
    };
    ModuleManager = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
        __WEBPACK_IMPORTED_MODULE_2__core_injector_Injector__["Injectable"]
    ], ModuleManager);
    return ModuleManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (ModuleManager);
/** 再额外导出一个单例 */
var moduleManager = __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].getInject(ModuleManager);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JSLoadMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return assetsManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_injector_Injector__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_Core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_HTTPUtil__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_URLUtil__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__version_Version__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__env_Environment__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_ArrayUtil__ = __webpack_require__(42);








/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-10-26
 * @modify date 2017-10-26
 *
 * 资源管理器
*/
var AssetsManager = /** @class */ (function () {
    function AssetsManager() {
        this._keyDict = {};
        this._assetsDict = {};
    }
    /**
     * @private
     */
    AssetsManager.prototype.configPath = function (arg1, arg2) {
        if (typeof arg1 == "string") {
            this._keyDict[arg1] = arg2;
        }
        else {
            for (var key in arg1) {
                this._keyDict[key] = arg1[key];
            }
        }
    };
    /**
     * 获取资源，同步的，且如果找不到资源并不会触发加载
     *
     * @param {string} keyOrPath 资源的短名称或路径
     * @returns {*}
     * @memberof AssetsManager
     */
    AssetsManager.prototype.getAssets = function (keyOrPath) {
        var path = this._keyDict[keyOrPath] || keyOrPath;
        var result = this._assetsDict[path];
        // 如果是个数组则表示正在加载中，返回undefined
        if (result instanceof Array)
            return undefined;
        else
            return result;
    };
    /**
     * 加载资源，如果已加载过则同步回调，如果未加载则加载后异步回调
     *
     * @param {string|string[]} keyOrPath 资源短名称或资源路径
     * @param {(assets?:any|any[])=>void} complete 完成回调，如果加载失败则参数是个Error对象
     * @param {XMLHttpRequestResponseType} [responseType] 加载类型
     * @param {(keyOrPath?:string, assets?:any)=>void} [oneComplete] 一个资源加载完毕会调用这个回调，如果有的话。仅在keyOrPath是数组情况下生效
     * @returns {void}
     * @memberof AssetsManager
     */
    AssetsManager.prototype.loadAssets = function (keyOrPath, complete, responseType, oneComplete) {
        var _this = this;
        // 非空判断
        if (!keyOrPath) {
            complete && complete(value);
            return;
        }
        // 获取路径
        if (keyOrPath instanceof Array) {
            // 数组去重
            keyOrPath = Object(__WEBPACK_IMPORTED_MODULE_7__utils_ArrayUtil__["a" /* unique */])(keyOrPath);
            // 是个数组，转换成单一名称或对象
            var count = keyOrPath.length;
            var results = [];
            // 判断数量
            if (count > 0) {
                // 声明回调
                var handler = function (path, assets) {
                    // 调用回调
                    oneComplete && oneComplete(path, assets);
                    // 填充数组
                    var index = keyOrPath.indexOf(path);
                    results[index] = assets;
                    // 判断完成
                    if (--count === 0)
                        complete && complete(results);
                };
                // 并行加载资源
                for (var i = 0, len = count; i < len; i++) {
                    var path = keyOrPath[i];
                    this.loadAssets(path, null, null, handler);
                }
            }
            else {
                // 直接完成
                complete && complete(results);
            }
        }
        else {
            // 是单一名称或对象
            var path = this._keyDict[keyOrPath] || keyOrPath;
            // 获取值
            var value = this._assetsDict[path];
            if (value instanceof Array) {
                // 正在加载中，等待之
                value.push(complete);
            }
            else if (value) {
                // 已经加载过了，直接返回
                oneComplete && oneComplete(keyOrPath, value);
                complete && complete(value);
            }
            else {
                // 没有就去加载
                this._assetsDict[path] = value = [function (result) {
                        oneComplete && oneComplete(keyOrPath, result);
                        complete && complete(result);
                    }];
                Object(__WEBPACK_IMPORTED_MODULE_3__utils_HTTPUtil__["a" /* load */])({
                    url: __WEBPACK_IMPORTED_MODULE_5__version_Version__["a" /* version */].wrapHashUrl(path),
                    useCDN: true,
                    responseType: responseType,
                    onResponse: function (result) {
                        // 记录结果
                        _this._assetsDict[path] = result;
                        // 通知各个回调
                        for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                            var handler = value_1[_i];
                            handler(result);
                        }
                    },
                    onError: function (err) {
                        // 移除结果
                        delete _this._assetsDict[path];
                        // 通知各个回调
                        for (var _i = 0, value_2 = value; _i < value_2.length; _i++) {
                            var handler = value_2[_i];
                            handler(err);
                        }
                    }
                });
            }
        }
    };
    /**
     * 加载CSS样式文件
     *
     * @param {string[]} cssFiles 样式文件URL列表
     * @param {(err?:Error)=>void} handler 完成回调
     * @memberof AssetsManager
     */
    AssetsManager.prototype.loadStyleFiles = function (cssFiles, handler) {
        if (!cssFiles || cssFiles.length === 0) {
            handler();
            return;
        }
        var count = cssFiles.length;
        var stop = false;
        for (var _i = 0, cssFiles_1 = cssFiles; _i < cssFiles_1.length; _i++) {
            var cssFile = cssFiles_1[_i];
            var cssNode = document.createElement("link");
            cssNode.rel = "stylesheet";
            cssNode.type = "text/css";
            cssNode.href = __WEBPACK_IMPORTED_MODULE_6__env_Environment__["environment"].toCDNHostURL(__WEBPACK_IMPORTED_MODULE_5__version_Version__["a" /* version */].wrapHashUrl(cssFile));
            cssNode.onload = onLoadOne;
            cssNode.onerror = onErrorOne;
            document.body.appendChild(cssNode);
        }
        function onLoadOne() {
            // 如果全部加载完毕则调用回调
            if (!stop && --count === 0)
                handler();
        }
        function onErrorOne(evt) {
            if (!stop) {
                stop = true;
                handler(new Error("CSS加载失败"));
            }
        }
    };
    /**
     * 加载JS文件
     *
     * @param {JSFile[]} jsFiles js文件列表
     * @param {(err?:Error)=>void} handler 完成回调
     * @param {boolean} [ordered=false] 是否保证标签形式js的执行顺序，保证执行顺序会降低标签形式js的加载速度，因为必须串行加载。该参数不会影响JSONP形式的加载速度和执行顺序，JSONP形式脚本总是并行加载且顺序执行的。默认是true
     * @memberof AssetsManager
     */
    AssetsManager.prototype.loadJsFiles = function (jsFiles, handler, ordered) {
        if (ordered === void 0) { ordered = true; }
        if (!jsFiles || jsFiles.length === 0) {
            handler();
            return;
        }
        jsFiles = jsFiles.concat();
        var count = jsFiles.length;
        var jsonpCount = 0;
        var stop = false;
        var nodes = [];
        // 遍历加载js
        for (var i in jsFiles) {
            var jsFile = jsFiles[i];
            // 统一类型
            if (typeof jsFile === "string") {
                // 是简单路径，变成JSFileData
                jsFiles[i] = jsFile = {
                    url: jsFile,
                    mode: JSLoadMode.AUTO
                };
            }
            // 创建一个空的script标签
            var jsNode = document.createElement("script");
            jsNode.type = "text/javascript";
            nodes.push(jsNode);
            // 开始加载
            if (jsFile.mode === JSLoadMode.JSONP || (jsFile.mode === JSLoadMode.AUTO && !Object(__WEBPACK_IMPORTED_MODULE_4__utils_URLUtil__["b" /* isAbsolutePath */])(jsFile.url))) {
                this.loadAssets(jsFile.url, null, null, onCompleteOne);
                // 递增数量
                jsonpCount++;
            }
            else {
                // 使用script标签方式加载，不用在意顺序
                jsNode.onload = onLoadOne;
                jsNode.onerror = onErrorOne;
                jsNode.src = __WEBPACK_IMPORTED_MODULE_6__env_Environment__["environment"].toCDNHostURL(__WEBPACK_IMPORTED_MODULE_5__version_Version__["a" /* version */].wrapHashUrl(jsFile.url));
            }
        }
        // 判断一次
        var appendIndex = 0;
        judgeAppend();
        function judgeAppend() {
            if (jsonpCount === 0) {
                // 这里统一将所有script标签添加到DOM中，以此保持顺序
                for (var i = appendIndex, len = nodes.length; i < len;) {
                    var node = nodes[i];
                    document.body.appendChild(node);
                    // 记录添加索引
                    appendIndex = ++i;
                    // 如果需要保持顺序且当前是标签形式js，则停止添加，等待加载完毕再继续
                    if (ordered && node.src)
                        break;
                }
            }
        }
        function onCompleteOne(url, result) {
            if (result instanceof Error) {
                // 调用失败
                onErrorOne();
            }
            else {
                // 取到索引
                var index = -1;
                for (var i = 0, len = jsFiles.length; i < len; i++) {
                    var jsFile = jsFiles[i];
                    if (jsFile.url === url) {
                        index = i;
                        break;
                    }
                }
                // 填充script标签内容
                if (index >= 0) {
                    var jsNode = nodes[index];
                    jsNode.innerHTML = result;
                }
                // 递减jsonp数量
                jsonpCount--;
                // 调用成功
                onLoadOne();
            }
        }
        function onLoadOne() {
            // 添加标签
            judgeAppend();
            // 如果全部加载完毕则调用回调
            if (!stop && --count === 0)
                handler();
        }
        function onErrorOne() {
            if (!stop) {
                stop = true;
                handler(new Error("JS加载失败"));
            }
        }
    };
    AssetsManager = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
        __WEBPACK_IMPORTED_MODULE_1__core_injector_Injector__["Injectable"]
    ], AssetsManager);
    return AssetsManager;
}());
/* unused harmony default export */ var _unused_webpack_default_export = (AssetsManager);
var JSLoadMode;
(function (JSLoadMode) {
    JSLoadMode[JSLoadMode["AUTO"] = 0] = "AUTO";
    JSLoadMode[JSLoadMode["JSONP"] = 1] = "JSONP";
    JSLoadMode[JSLoadMode["TAG"] = 2] = "TAG";
})(JSLoadMode || (JSLoadMode = {}));
/** 再额外导出一个单例 */
var assetsManager = __WEBPACK_IMPORTED_MODULE_2__core_Core__["a" /* core */].getInject(AssetsManager);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "netManager", function() { return netManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_injector_Injector__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_message_CoreMessage__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_ObjectUtil__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__RequestData__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__NetMessage__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mask_MaskManager__ = __webpack_require__(15);








var NetManager = /** @class */ (function () {
    function NetManager() {
        this._responseDict = {};
        this._responseListeners = {};
        __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].listen(__WEBPACK_IMPORTED_MODULE_3__core_message_CoreMessage__["a" /* default */].MESSAGE_DISPATCHED, this.onMsgDispatched, __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */]);
    }
    NetManager.prototype.onMsgDispatched = function (msg) {
        var observable = this.observable;
        // 如果消息是通讯消息则做处理
        if (msg instanceof __WEBPACK_IMPORTED_MODULE_5__RequestData__["default"]) {
            // 添加遮罩
            if (msg.__useMask)
                __WEBPACK_IMPORTED_MODULE_7__mask_MaskManager__["a" /* maskManager */].showLoading(null, "net");
            // 指定消息参数连接上公共参数作为参数
            Object(__WEBPACK_IMPORTED_MODULE_4__utils_ObjectUtil__["b" /* extendObject */])(msg.__params.data, __WEBPACK_IMPORTED_MODULE_5__RequestData__["commonData"]);
            // 发送消息
            msg.__policy.sendRequest(msg);
            // 派发系统消息
            observable.dispatch(__WEBPACK_IMPORTED_MODULE_6__NetMessage__["a" /* default */].NET_REQUEST, msg);
        }
    };
    /**
     * 注册一个返回结构体
     *
     * @param {string} type 返回类型
     * @param {IResponseDataConstructor} cls 返回结构体构造器
     * @memberof NetManager
     */
    NetManager.prototype.registerResponse = function (cls) {
        this._responseDict[cls.type] = cls;
    };
    /**
     * 添加一个通讯返回监听
     *
     * @param {(IResponseDataConstructor|string)} clsOrType 要监听的返回结构构造器或者类型字符串
     * @param {ResponseHandler} handler 回调函数
     * @param {*} [thisArg] this指向
     * @param {boolean} [once=false] 是否一次性监听
     * @param {IObservable} [observable] 要发送到的内核
     * @memberof NetManager
     */
    NetManager.prototype.listenResponse = function (clsOrType, handler, thisArg, once, observable) {
        if (once === void 0) { once = false; }
        if (!observable)
            observable = __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].observable;
        var type = (typeof clsOrType == "string" ? clsOrType : clsOrType.type);
        var listeners = this._responseListeners[type];
        if (!listeners)
            this._responseListeners[type] = listeners = [];
        for (var _i = 0, listeners_1 = listeners; _i < listeners_1.length; _i++) {
            var listener = listeners_1[_i];
            if (handler == listener[0] && thisArg == listener[1] && once == listener[2])
                return;
        }
        listeners.push([handler, thisArg, once, observable]);
    };
    /**
     * 移除一个通讯返回监听
     *
     * @param {(IResponseDataConstructor|string)} clsOrType 要移除监听的返回结构构造器或者类型字符串
     * @param {ResponseHandler} handler 回调函数
     * @param {*} [thisArg] this指向
     * @param {boolean} [once=false] 是否一次性监听
     * @param {IObservable} [observable] 要发送到的内核
     * @memberof NetManager
     */
    NetManager.prototype.unlistenResponse = function (clsOrType, handler, thisArg, once, observable) {
        if (once === void 0) { once = false; }
        if (!observable)
            observable = __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].observable;
        var type = (typeof clsOrType == "string" ? clsOrType : clsOrType.type);
        var listeners = this._responseListeners[type];
        if (listeners) {
            for (var i = 0, len = listeners.length; i < len; i++) {
                var listener = listeners[i];
                if (handler == listener[0] && thisArg == listener[1] && once == listener[2] && observable == listener[3]) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    };
    /**
     * 发送多条请求，并且等待返回结果（如果有的话），调用回调
     *
     * @param {RequestData[]} [requests 要发送的请求列表
     * @param {(responses?:ResponseData[]|Error)=>void} [handler] 收到返回结果或错误后的回调函数
     * @param {*} [thisArg] this指向
     * @param {IObservable} [observable] 要发送到的内核
     * @memberof NetManager
     */
    NetManager.prototype.sendMultiRequests = function (requests, handler, thisArg, observable) {
        var self = this;
        var responses = [];
        var leftResCount = 0;
        if (!observable)
            observable = __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].observable;
        for (var _i = 0, _a = requests || []; _i < _a.length; _i++) {
            var request = _a[_i];
            var response = request.__params.response;
            if (response) {
                // 监听一次性返回
                this.listenResponse(response, onResponse, request);
                // 记录返回监听
                responses.push(response);
                // 记录数量
                leftResCount++;
            }
            // 发送请求
            observable.dispatch(request);
        }
        // 测试回调
        testCallback();
        function onResponse(response) {
            if (response instanceof Error) {
                // 出错了，直接调用回调
                handler && handler.call(thisArg, response);
            }
            else {
                // 成功了
                for (var key in responses) {
                    var temp = responses[key];
                    if (temp == response.constructor && this === response.__params.request) {
                        self.unlistenResponse(temp, onResponse, this);
                        responses[key] = response;
                        leftResCount--;
                        // 测试回调
                        testCallback();
                        break;
                    }
                }
            }
        }
        function testCallback() {
            // 判断是否全部替换完毕
            if (leftResCount <= 0) {
                handler && handler.call(thisArg, responses);
            }
        }
    };
    /** 这里导出不希望用户使用的方法，供框架内使用 */
    NetManager.prototype.__onResponse = function (type, result, request) {
        // 移除遮罩
        if (request && request.__useMask)
            __WEBPACK_IMPORTED_MODULE_7__mask_MaskManager__["a" /* maskManager */].hideLoading("net");
        // 解析结果
        var cls = this._responseDict[type];
        if (cls) {
            var response = new cls();
            // 执行解析
            response.parse(result);
            // 设置配对请求和发送内核
            var observable = __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].observable;
            if (request) {
                response.__params.request = request;
                // 由上至下找到最远的一个有效内核
                for (var i = request.__observables.length - 1; i >= 0; i--) {
                    var temp = request.__observables[i];
                    if (!temp || temp.disposed)
                        break;
                    else
                        observable = temp;
                }
            }
            // 派发事件
            observable.dispatch(__WEBPACK_IMPORTED_MODULE_6__NetMessage__["a" /* default */].NET_RESPONSE, response, request);
            // 递归处理事件监听
            this.recurseResponse(type, response, request, observable);
        }
        else {
            console.warn("没有找到返回结构体定义：" + type);
        }
    };
    NetManager.prototype.__onError = function (type, err, request) {
        // 移除遮罩
        if (request && request.__useMask)
            __WEBPACK_IMPORTED_MODULE_7__mask_MaskManager__["a" /* maskManager */].hideLoading("net");
        // 如果有配对请求，则将返回值发送到请求所在的原始内核里
        var observable = request && request.__oriObservable;
        // 派发事件
        observable.dispatch(__WEBPACK_IMPORTED_MODULE_6__NetMessage__["a" /* default */].NET_ERROR, err, request);
        // 递归处理事件监听
        this.recurseResponse(type, err, request, observable);
    };
    NetManager.prototype.recurseResponse = function (type, response, request, observable) {
        // 先递归父级，与消息发送时顺序相反
        if (observable.parent) {
            this.recurseResponse(type, response, request, observable.parent);
        }
        // 触发事件形式监听
        var listeners = this._responseListeners[type];
        if (listeners) {
            listeners = listeners.concat();
            for (var _i = 0, listeners_2 = listeners; _i < listeners_2.length; _i++) {
                var listener = listeners_2[_i];
                if (listener[3] == observable) {
                    // 必须是同核消息才能触发回调
                    listener[0].call(listener[1], response, request);
                    // 如果是一次性监听则移除之
                    if (listener[2])
                        this.unlistenResponse(type, listener[0], listener[1], listener[2], listener[3]);
                }
            }
        }
    };
    NetManager = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
        __WEBPACK_IMPORTED_MODULE_2__core_injector_Injector__["Injectable"],
        __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [])
    ], NetManager);
    return NetManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (NetManager);
/** 再额外导出一个单例 */
var netManager = __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].getInject(NetManager);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getCurOrigin;
/* harmony export (immutable) */ __webpack_exports__["d"] = trimURL;
/* harmony export (immutable) */ __webpack_exports__["b"] = isAbsolutePath;
/* harmony export (immutable) */ __webpack_exports__["e"] = validateProtocol;
/* harmony export (immutable) */ __webpack_exports__["g"] = wrapHost;
/* harmony export (immutable) */ __webpack_exports__["f"] = wrapAbsolutePath;
/* unused harmony export getHostAndPathname */
/* unused harmony export getPath */
/* unused harmony export getName */
/* unused harmony export parseUrl */
/* unused harmony export getQueryParams */
/* harmony export (immutable) */ __webpack_exports__["c"] = joinQueryParams;
/* unused harmony export joinHashParams */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ObjectUtil__ = __webpack_require__(3);

/**
 * 获取当前页面的origin，会兼容IE10以下
 *
 * @export
 * @returns {string}
 */
function getCurOrigin() {
    if (window.location.origin)
        return window.location.origin;
    return (window.location.protocol + "//" + window.location.host);
}
/**
 * 规整url
 * @param url
 */
function trimURL(url) {
    // 去除多余的"/"
    url = url.replace(/([^:\/]|(:\/))\/+/g, "$1/");
    if (url.charAt(0) == "/")
        url = url.substr(1);
    // 处理非紧贴域名的"/xx/../"
    var reg = /(?!:\/{2,}[^\/]+\/)([^\/\.]+)\/[^\/\.]+?\/\.\.\//;
    while (reg.test(url)) {
        url = url.replace(reg, "/$1");
    }
    // 处理"/./"和剩余的"/../"，直接丢弃之
    var reg = /\/\.{1,2}\//;
    while (reg.test(url)) {
        url = url.replace(reg, "/");
    }
    return url;
}
/**
 * 检查URL是否是绝对路径（具有协议头）
 * @param url 要判断的URL
 * @returns {any} 是否是绝对路径
 */
function isAbsolutePath(url) {
    if (url == null)
        return false;
    return (url.indexOf("://") >= 0);
}
/**
 * 如果url有protocol，使其与当前域名的protocol统一，否则会跨域
 * @param url 要统一protocol的url
 * @param {string} [protocol] 要统一成的protocol，不传则根据当前页面的protocol使用。根据标准，protocol是要携带:的，比如“http:”
 */
function validateProtocol(url, protocol) {
    if (url == null)
        return null;
    var index = url.indexOf("://");
    if (index < 0)
        return url;
    // 因为protocol是要携带:的，所以index自加1
    index++;
    if (protocol) {
        // 直接使用传递的protocol
        return protocol + url.substr(index);
    }
    else {
        protocol = url.substring(0, index);
        // 调整http和https
        if (protocol == "http:" || protocol == "https:") {
            return window.location.protocol + url.substr(index);
        }
        // 调整ws和wss
        if (protocol == "ws:" || protocol == "wss:") {
            if (window.location.protocol == "https:")
                protocol = "wss:";
            else
                protocol = "ws:";
            return protocol + url.substr(index);
        }
        // 不需要调整
        return url;
    }
}
/**
 * 替换url中的host
 * @param url       url
 * @param host      要替换的host
 * @param forced    是否强制替换（默认false）
 */
function wrapHost(url, host, forced) {
    if (forced === void 0) { forced = false; }
    host = host || getCurOrigin();
    var re = /^(?:[^\/]+):\/{2,}(?:[^\/]+)\//;
    var arr = url.match(re);
    if (arr && arr.length > 0) {
        if (forced) {
            url = url.substr(arr[0].length);
            url = host + "/" + url;
        }
    }
    else {
        url = host + "/" + url;
    }
    // 合法化一下protocol
    url = validateProtocol(url);
    // 最后规整一下url
    url = trimURL(url);
    return url;
}
/**
 * 将相对于当前页面的相对路径包装成绝对路径
 * @param relativePath 相对于当前页面的相对路径
 * @param host 传递该参数会用该host替换当前host
 */
function wrapAbsolutePath(relativePath, host) {
    // 获取当前页面的url
    var curPath = getPath(window.location.href);
    var url = trimURL(curPath + "/" + relativePath);
    if (host != null) {
        url = wrapHost(url, host, true);
    }
    return url;
}
/**
 * 获取URL的host+pathname部分，即问号(?)以前的部分
 *
 */
function getHostAndPathname(url) {
    if (url == null)
        throw new Error("url不能为空");
    // 去掉get参数和hash
    url = url.split("#")[0].split("?")[0];
    // 去掉多余的/
    url = trimURL(url);
    return url;
}
/**
 * 获取URL路径（文件名前的部分）
 * @param url 要分析的URL
 */
function getPath(url) {
    // 首先去掉多余的/
    url = getHostAndPathname(url);
    // 然后获取到路径
    var urlArr = url.split("/");
    urlArr.pop();
    return urlArr.join("/") + "/";
}
/**
 * 获取URL的文件名
 * @param url 要分析的URL
 */
function getName(url) {
    // 先去掉get参数和hash
    url = url.split("#")[0].split("?")[0];
    // 然后获取到文件名
    var urlArr = url.split("/");
    var fileName = urlArr[urlArr.length - 1];
    return fileName;
}
/**
 * 解析URL
 * @param url 要被解析的URL字符串
 * @returns {any} 解析后的URLLocation结构体
 */
function parseUrl(url) {
    var regExp = /(([^:]+:)\/{2,}(([^:\/\?#]+)(:(\d+))?))(\/[^?#]*)?(\?[^#]*)?(#.*)?/;
    var match = regExp.exec(url);
    if (match) {
        return {
            href: match[0] || "",
            origin: match[1] || "",
            protocol: match[2] || "",
            host: match[3] || "",
            hostname: match[4] || "",
            port: match[6] || "",
            pathname: match[7] || "",
            search: match[8] || "",
            hash: (match[9] == "#" ? "" : match[9]) || ""
        };
    }
    else {
        throw new Error("传入parseUrl方法的参数不是一个完整的URL：" + url);
    }
}
/**
 * 解析url查询参数
 * @TODO 添加对jquery编码方式的支持
 * @param url url
 */
function getQueryParams(url) {
    var index = url.indexOf("#");
    if (index >= 0) {
        url = url.substring(0, index);
    }
    index = url.indexOf("?");
    if (index < 0)
        return {};
    var queryString = url.substring(index + 1);
    var params = {};
    var kvs = queryString.split("&");
    for (var _i = 0, kvs_1 = kvs; _i < kvs_1.length; _i++) {
        var kv = kvs_1[_i];
        var pair = kv.split("=", 2);
        if (pair.length !== 2 || !pair[0]) {
            console.log("[URLUtil] invalid query params: " + kv);
            continue;
        }
        var name = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1]);
        params[name] = value;
    }
    return params;
}
/**
 * 将参数连接到指定URL后面
 * @param url url
 * @param params 一个map，包含要连接的参数
 * @return string 连接后的URL地址
 */
function joinQueryParams(url, params) {
    if (url == null)
        throw new Error("url不能为空");
    var oriParams = getQueryParams(url);
    var targetParams = Object(__WEBPACK_IMPORTED_MODULE_0__ObjectUtil__["b" /* extendObject */])(oriParams, params);
    var hash = parseUrl(url).hash;
    url = getHostAndPathname(url);
    var isFirst = true;
    for (var key in targetParams) {
        if (isFirst) {
            url += "?" + encodeURIComponent(key) + "=" + encodeURIComponent(targetParams[key]);
            isFirst = false;
        }
        else {
            url += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(targetParams[key]);
        }
    }
    // 加上hash
    url += hash;
    return url;
}
/**
 * 将参数链接到URL的hash后面
 * @param url 如果传入的url没有注明hash模块，则不会进行操作
 * @param params 一个map，包含要连接的参数
 */
function joinHashParams(url, params) {
    if (url == null)
        throw new Error("url不能为空");
    var hash = parseUrl(url).hash;
    if (hash == null || hash == "")
        return url;
    for (var key in params) {
        var value = params[key];
        if (value && typeof value != "string")
            value = value.toString();
        hash += ((hash.indexOf("?") < 0 ? "?" : "&") + encodeURIComponent(key) + "=" + encodeURIComponent(value));
    }
    return (url.split("#")[0] + hash);
}


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mediator_Mediator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SceneManager__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mediator_MediatorMessage__ = __webpack_require__(24);




/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-08
 * @modify date 2017-09-08
 *
 * 实现了IScene接口的场景中介者基类
*/
var SceneMediator = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](SceneMediator, _super);
    function SceneMediator(skin, policy) {
        var _this = _super.call(this, skin) || this;
        _this.policy = policy;
        return _this;
    }
    SceneMediator.prototype.__afterOnOpen = function (data) {
        __WEBPACK_IMPORTED_MODULE_2__SceneManager__["a" /* sceneManager */].push(this, data);
    };
    SceneMediator.prototype.__afterOnClose = function (data) {
        var _this = this;
        // 篡改onAfterOut，等待关闭动画结束后再执行
        var oriOnAfterOut = this.onAfterOut;
        this.onAfterOut = function (toScene, data) {
            oriOnAfterOut.call(_this, toScene, data);
            // 派发关闭事件
            _this.dispatch(__WEBPACK_IMPORTED_MODULE_3__mediator_MediatorMessage__["a" /* default */].MEDIATOR_CLOSED, _this);
        };
        __WEBPACK_IMPORTED_MODULE_2__SceneManager__["a" /* sceneManager */].pop(this, data);
    };
    /**
     * 切入场景开始前调用
     * @param fromScene 从哪个场景切入
     * @param data 切场景时可能的参数
     */
    SceneMediator.prototype.onBeforeIn = function (fromScene, data) {
        // 可重写
    };
    /**
     * 切入场景开始后调用
     * @param fromScene 从哪个场景切入
     * @param data 切场景时可能的参数
     */
    SceneMediator.prototype.onAfterIn = function (fromScene, data) {
        // 可重写
    };
    /**
     * 切出场景开始前调用
     * @param toScene 要切入到哪个场景
     * @param data 切场景时可能的参数
     */
    SceneMediator.prototype.onBeforeOut = function (toScene, data) {
        // 可重写
    };
    /**
     * 切出场景开始后调用
     * @param toScene 要切入到哪个场景
     * @param data 切场景时可能的参数
     */
    SceneMediator.prototype.onAfterOut = function (toScene, data) {
        // 可重写
    };
    return SceneMediator;
}(__WEBPACK_IMPORTED_MODULE_1__mediator_Mediator__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (SceneMediator);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return maskManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_injector_Injector__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_Core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bridge_BridgeManager__ = __webpack_require__(9);




/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-10-25
 * @modify date 2017-10-25
 *
 * 遮罩管理器
*/
var MaskManager = /** @class */ (function () {
    function MaskManager() {
        this._entityDict = {};
        this._loadingMaskDict = {};
    }
    MaskManager.prototype.getLoadingMaskCount = function () {
        var count = 0;
        for (var key in this._loadingMaskDict) {
            var temp = this._loadingMaskDict[key];
            if (temp > 0)
                count += temp;
        }
        return count;
    };
    MaskManager.prototype.plusLoadingMaskCount = function (key) {
        var count = this._loadingMaskDict[key] || 0;
        if (count < 0)
            count = 0;
        this._loadingMaskDict[key] = ++count;
        return count;
    };
    MaskManager.prototype.minusLoadingMaskCount = function (key) {
        var count = this._loadingMaskDict[key] || 0;
        count--;
        if (count < 0)
            count = 0;
        this._loadingMaskDict[key] = count;
        if (count == 0)
            delete this._loadingMaskDict[key];
        return count;
    };
    /**
     * 初始化MaskUtil
     * @param type 所属表现层桥
     * @param entity 遮罩实体
     */
    MaskManager.prototype.registerMask = function (type, entity) {
        this._entityDict[type] = entity;
    };
    /**
     * 显示遮罩
     */
    MaskManager.prototype.showMask = function (alpha) {
        var type = __WEBPACK_IMPORTED_MODULE_3__bridge_BridgeManager__["a" /* bridgeManager */].currentBridge.type;
        var entity = this._entityDict[type];
        if (entity != null) {
            // 显示遮罩
            entity.showMask(alpha);
            // 调用回调
            entity.maskData.onShowMask && entity.maskData.onShowMask();
        }
    };
    /**
     * 隐藏遮罩
     */
    MaskManager.prototype.hideMask = function () {
        var type = __WEBPACK_IMPORTED_MODULE_3__bridge_BridgeManager__["a" /* bridgeManager */].currentBridge.type;
        var entity = this._entityDict[type];
        if (entity != null) {
            // 调用回调
            entity.maskData.onHideMask && entity.maskData.onHideMask();
            // 隐藏遮罩
            entity.hideMask();
        }
    };
    /**当前是否在显示遮罩*/
    MaskManager.prototype.isShowingMask = function () {
        var type = __WEBPACK_IMPORTED_MODULE_3__bridge_BridgeManager__["a" /* bridgeManager */].currentBridge.type;
        var entity = this._entityDict[type];
        if (entity != null)
            return entity.isShowingMask();
        return false;
    };
    /**
     * 显示加载图
     */
    MaskManager.prototype.showLoading = function (alpha, key) {
        if (key === void 0) { key = null; }
        // 若当前你没有loading则显示loading
        if (this.getLoadingMaskCount() == 0) {
            var type = __WEBPACK_IMPORTED_MODULE_3__bridge_BridgeManager__["a" /* bridgeManager */].currentBridge.type;
            var entity = this._entityDict[type];
            if (entity != null) {
                // 显示遮罩
                entity.showLoading(alpha);
                // 调用回调
                entity.maskData.onShowLoading && entity.maskData.onShowLoading(entity.loadingSkin);
            }
        }
        // 增计数
        this.plusLoadingMaskCount(key);
    };
    /**
     * 隐藏加载图
     */
    MaskManager.prototype.hideLoading = function (key) {
        if (key === void 0) { key = null; }
        // 减计数
        this.minusLoadingMaskCount(key);
        if (this.getLoadingMaskCount() == 0) {
            // 移除loading
            var type = __WEBPACK_IMPORTED_MODULE_3__bridge_BridgeManager__["a" /* bridgeManager */].currentBridge.type;
            var entity = this._entityDict[type];
            if (entity != null) {
                // 调用回调
                entity.maskData.onHideLoading && entity.maskData.onHideLoading(entity.loadingSkin);
                // 隐藏遮罩
                entity.hideLoading();
            }
        }
    };
    /**当前是否在显示loading*/
    MaskManager.prototype.isShowingLoading = function () {
        var type = __WEBPACK_IMPORTED_MODULE_3__bridge_BridgeManager__["a" /* bridgeManager */].currentBridge.type;
        var entity = this._entityDict[type];
        if (entity != null)
            return entity.isShowingLoading();
        return false;
    };
    /** 显示模态窗口遮罩 */
    MaskManager.prototype.showModalMask = function (popup, alpha) {
        var type = popup.bridge.type;
        var entity = this._entityDict[type];
        if (entity != null) {
            // 显示遮罩
            entity.showModalMask(popup, alpha);
            // 调用回调
            entity.maskData.onShowModalMask && entity.maskData.onShowModalMask(popup);
        }
    };
    /** 隐藏模态窗口遮罩 */
    MaskManager.prototype.hideModalMask = function (popup) {
        var type = popup.bridge.type;
        var entity = this._entityDict[type];
        if (entity != null) {
            // 调用回调
            entity.maskData.onHideModalMask && entity.maskData.onHideModalMask(popup);
            // 隐藏遮罩
            entity.hideModalMask(popup);
        }
    };
    /** 当前是否在显示模态窗口遮罩 */
    MaskManager.prototype.isShowingModalMask = function (popup) {
        var type = popup.bridge.type;
        var entity = this._entityDict[type];
        if (entity != null)
            return entity.isShowingModalMask(popup);
        return false;
    };
    MaskManager = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
        __WEBPACK_IMPORTED_MODULE_1__core_injector_Injector__["Injectable"]
    ], MaskManager);
    return MaskManager;
}());
/* unused harmony default export */ var _unused_webpack_default_export = (MaskManager);
/** 再额外导出一个单例 */
var maskManager = __WEBPACK_IMPORTED_MODULE_2__core_Core__["a" /* core */].getInject(MaskManager);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-18
 * @modify date 2017-09-18
 *
 * 模块消息
*/
var ModuleMessage = /** @class */ (function () {
    function ModuleMessage() {
    }
    /**
     * 切换模块消息
     *
     * @static
     * @type {string}
     * @memberof ModuleMessage
     */
    ModuleMessage.MODULE_CHANGE = "moduleChange";
    /**
     * 切换模块失败消息
     *
     * @static
     * @type {string}
     * @memberof ModuleMessage
     */
    ModuleMessage.MODULE_CHANGE_FAILED = "moduleChangeFailed";
    /**
     * 加载模块失败消息
     *
     * @static
     * @type {string}
     * @memberof ModuleMessage
     */
    ModuleMessage.MODULE_LOAD_ASSETS_ERROR = "moduleLoadAssetsError";
    return ModuleMessage;
}());
/* harmony default export */ __webpack_exports__["default"] = (ModuleMessage);


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2018-02-24
 * @modify date 2018-02-24
 *
 * 中介者状态枚举
*/
var MediatorStatus;
(function (MediatorStatus) {
    MediatorStatus[MediatorStatus["UNOPEN"] = 0] = "UNOPEN";
    MediatorStatus[MediatorStatus["OPENING"] = 1] = "OPENING";
    MediatorStatus[MediatorStatus["OPENED"] = 2] = "OPENED";
    MediatorStatus[MediatorStatus["CLOSING"] = 3] = "CLOSING";
    MediatorStatus[MediatorStatus["CLOSED"] = 4] = "CLOSED";
    MediatorStatus[MediatorStatus["DISPOSING"] = 5] = "DISPOSING";
    MediatorStatus[MediatorStatus["DISPOSED"] = 6] = "DISPOSED";
})(MediatorStatus || (MediatorStatus = {}));
/* harmony default export */ __webpack_exports__["a"] = (MediatorStatus);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["DOMMediatorClass"] = DOMMediatorClass;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_olympus_r_engine_bridge_BridgeManager__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_olympus_r_engine_injector_Injector__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_olympus_r_utils_ConstructUtil__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__DOMBridge__ = __webpack_require__(26);




/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-10-09
 * @modify date 2017-10-09
 *
 * 负责注入的模块
*/
function DOMMediatorClass(moduleName, skin) {
    var skins = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        skins[_i - 2] = arguments[_i];
    }
    return function (cls) {
        // 调用MediatorClass方法
        cls = Object(__WEBPACK_IMPORTED_MODULE_1_olympus_r_engine_injector_Injector__["MediatorClass"])(moduleName)(cls);
        // 监听类型实例化，转换皮肤格式
        var finalSkin;
        if (skins.length === 0) {
            finalSkin = skin;
        }
        else {
            skins.unshift(skin);
            finalSkin = skins;
        }
        Object(__WEBPACK_IMPORTED_MODULE_2_olympus_r_utils_ConstructUtil__["c" /* listenConstruct */])(cls, function (mediator) {
            // 先赋值桥
            mediator.bridge = __WEBPACK_IMPORTED_MODULE_0_olympus_r_engine_bridge_BridgeManager__["a" /* bridgeManager */].getBridge(__WEBPACK_IMPORTED_MODULE_3__DOMBridge__["default"].TYPE);
            // 然后监听onOpen，在onOpen中设置皮肤
            Object(__WEBPACK_IMPORTED_MODULE_2_olympus_r_utils_ConstructUtil__["b" /* listenApply */])(mediator, "onOpen", function (mediator) {
                mediator.skin = finalSkin;
            });
        });
        // 返回结果类型
        return cls;
    };
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect;
(function (Reflect) {
    // Metadata Proposal
    // https://rbuckton.github.io/reflect-metadata/
    (function (factory) {
        var root = typeof global === "object" ? global :
            typeof self === "object" ? self :
                typeof this === "object" ? this :
                    Function("return this;")();
        var exporter = makeExporter(Reflect);
        if (typeof root.Reflect === "undefined") {
            root.Reflect = Reflect;
        }
        else {
            exporter = makeExporter(root.Reflect, exporter);
        }
        factory(exporter);
        function makeExporter(target, previous) {
            return function (key, value) {
                if (typeof target[key] !== "function") {
                    Object.defineProperty(target, key, { configurable: true, writable: true, value: value });
                }
                if (previous)
                    previous(key, value);
            };
        }
    })(function (exporter) {
        var hasOwn = Object.prototype.hasOwnProperty;
        // feature test for Symbol support
        var supportsSymbol = typeof Symbol === "function";
        var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
        var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
        var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
        var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
        var downLevel = !supportsCreate && !supportsProto;
        var HashMap = {
            // create an object in dictionary mode (a.k.a. "slow" mode in v8)
            create: supportsCreate
                ? function () { return MakeDictionary(Object.create(null)); }
                : supportsProto
                    ? function () { return MakeDictionary({ __proto__: null }); }
                    : function () { return MakeDictionary({}); },
            has: downLevel
                ? function (map, key) { return hasOwn.call(map, key); }
                : function (map, key) { return key in map; },
            get: downLevel
                ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
                : function (map, key) { return map[key]; },
        };
        // Load global or shim versions of Map, Set, and WeakMap
        var functionPrototype = Object.getPrototypeOf(Function);
        var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
        var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
        var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
        var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
        // [[Metadata]] internal slot
        // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
        var Metadata = new _WeakMap();
        /**
         * Applies a set of decorators to a property of a target object.
         * @param decorators An array of decorators.
         * @param target The target object.
         * @param propertyKey (Optional) The property key to decorate.
         * @param attributes (Optional) The property descriptor for the target key.
         * @remarks Decorators are applied in reverse order.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Example = Reflect.decorate(decoratorsArray, Example);
         *
         *     // property (on constructor)
         *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Object.defineProperty(Example, "staticMethod",
         *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
         *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
         *
         *     // method (on prototype)
         *     Object.defineProperty(Example.prototype, "method",
         *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
         *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
         *
         */
        function decorate(decorators, target, propertyKey, attributes) {
            if (!IsUndefined(propertyKey)) {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
                    throw new TypeError();
                if (IsNull(attributes))
                    attributes = undefined;
                propertyKey = ToPropertyKey(propertyKey);
                return DecorateProperty(decorators, target, propertyKey, attributes);
            }
            else {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsConstructor(target))
                    throw new TypeError();
                return DecorateConstructor(decorators, target);
            }
        }
        exporter("decorate", decorate);
        // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
        // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
        /**
         * A default metadata decorator factory that can be used on a class, class member, or parameter.
         * @param metadataKey The key for the metadata entry.
         * @param metadataValue The value for the metadata entry.
         * @returns A decorator function.
         * @remarks
         * If `metadataKey` is already defined for the target and target key, the
         * metadataValue for that key will be overwritten.
         * @example
         *
         *     // constructor
         *     @Reflect.metadata(key, value)
         *     class Example {
         *     }
         *
         *     // property (on constructor, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticProperty;
         *     }
         *
         *     // property (on prototype, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         property;
         *     }
         *
         *     // method (on constructor)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticMethod() { }
         *     }
         *
         *     // method (on prototype)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         method() { }
         *     }
         *
         */
        function metadata(metadataKey, metadataValue) {
            function decorator(target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
                    throw new TypeError();
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
            }
            return decorator;
        }
        exporter("metadata", metadata);
        /**
         * Define a unique metadata entry on the target.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param metadataValue A value that contains attached metadata.
         * @param target The target object on which to define metadata.
         * @param propertyKey (Optional) The property key for the target.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Reflect.defineMetadata("custom:annotation", options, Example);
         *
         *     // property (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
         *
         *     // method (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
         *
         *     // decorator factory as metadata-producing annotation.
         *     function MyAnnotation(options): Decorator {
         *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
         *     }
         *
         */
        function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        exporter("defineMetadata", defineMetadata);
        /**
         * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasMetadata", hasMetadata);
        /**
         * Gets a value indicating whether the target object has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasOwnMetadata", hasOwnMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        exporter("getMetadata", getMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("getOwnMetadata", getOwnMetadata);
        /**
         * Gets the metadata keys defined on the target object or its prototype chain.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "method");
         *
         */
        function getMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryMetadataKeys(target, propertyKey);
        }
        exporter("getMetadataKeys", getMetadataKeys);
        /**
         * Gets the unique metadata keys defined on the target object.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
         *
         */
        function getOwnMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryOwnMetadataKeys(target, propertyKey);
        }
        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
        /**
         * Deletes the metadata entry from the target object with the provided key.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata entry was found and deleted; otherwise, false.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.deleteMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function deleteMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            if (!metadataMap.delete(metadataKey))
                return false;
            if (metadataMap.size > 0)
                return true;
            var targetMetadata = Metadata.get(target);
            targetMetadata.delete(propertyKey);
            if (targetMetadata.size > 0)
                return true;
            Metadata.delete(target);
            return true;
        }
        exporter("deleteMetadata", deleteMetadata);
        function DecorateConstructor(decorators, target) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsConstructor(decorated))
                        throw new TypeError();
                    target = decorated;
                }
            }
            return target;
        }
        function DecorateProperty(decorators, target, propertyKey, descriptor) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target, propertyKey, descriptor);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsObject(decorated))
                        throw new TypeError();
                    descriptor = decorated;
                }
            }
            return descriptor;
        }
        function GetOrCreateMetadataMap(O, P, Create) {
            var targetMetadata = Metadata.get(O);
            if (IsUndefined(targetMetadata)) {
                if (!Create)
                    return undefined;
                targetMetadata = new _Map();
                Metadata.set(O, targetMetadata);
            }
            var metadataMap = targetMetadata.get(P);
            if (IsUndefined(metadataMap)) {
                if (!Create)
                    return undefined;
                metadataMap = new _Map();
                targetMetadata.set(P, metadataMap);
            }
            return metadataMap;
        }
        // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
        function OrdinaryHasMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return true;
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryHasMetadata(MetadataKey, parent, P);
            return false;
        }
        // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
        function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            return ToBoolean(metadataMap.has(MetadataKey));
        }
        // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
        function OrdinaryGetMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return OrdinaryGetOwnMetadata(MetadataKey, O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryGetMetadata(MetadataKey, parent, P);
            return undefined;
        }
        // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
        function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return undefined;
            return metadataMap.get(MetadataKey);
        }
        // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
            metadataMap.set(MetadataKey, MetadataValue);
        }
        // 3.1.6.1 OrdinaryMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
        function OrdinaryMetadataKeys(O, P) {
            var ownKeys = OrdinaryOwnMetadataKeys(O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (parent === null)
                return ownKeys;
            var parentKeys = OrdinaryMetadataKeys(parent, P);
            if (parentKeys.length <= 0)
                return ownKeys;
            if (ownKeys.length <= 0)
                return parentKeys;
            var set = new _Set();
            var keys = [];
            for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
                var key = ownKeys_1[_i];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
                var key = parentKeys_1[_a];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            return keys;
        }
        // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
        function OrdinaryOwnMetadataKeys(O, P) {
            var keys = [];
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return keys;
            var keysObj = metadataMap.keys();
            var iterator = GetIterator(keysObj);
            var k = 0;
            while (true) {
                var next = IteratorStep(iterator);
                if (!next) {
                    keys.length = k;
                    return keys;
                }
                var nextValue = IteratorValue(next);
                try {
                    keys[k] = nextValue;
                }
                catch (e) {
                    try {
                        IteratorClose(iterator);
                    }
                    finally {
                        throw e;
                    }
                }
                k++;
            }
        }
        // 6 ECMAScript Data Typ0es and Values
        // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
        function Type(x) {
            if (x === null)
                return 1 /* Null */;
            switch (typeof x) {
                case "undefined": return 0 /* Undefined */;
                case "boolean": return 2 /* Boolean */;
                case "string": return 3 /* String */;
                case "symbol": return 4 /* Symbol */;
                case "number": return 5 /* Number */;
                case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
                default: return 6 /* Object */;
            }
        }
        // 6.1.1 The Undefined Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
        function IsUndefined(x) {
            return x === undefined;
        }
        // 6.1.2 The Null Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
        function IsNull(x) {
            return x === null;
        }
        // 6.1.5 The Symbol Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
        function IsSymbol(x) {
            return typeof x === "symbol";
        }
        // 6.1.7 The Object Type
        // https://tc39.github.io/ecma262/#sec-object-type
        function IsObject(x) {
            return typeof x === "object" ? x !== null : typeof x === "function";
        }
        // 7.1 Type Conversion
        // https://tc39.github.io/ecma262/#sec-type-conversion
        // 7.1.1 ToPrimitive(input [, PreferredType])
        // https://tc39.github.io/ecma262/#sec-toprimitive
        function ToPrimitive(input, PreferredType) {
            switch (Type(input)) {
                case 0 /* Undefined */: return input;
                case 1 /* Null */: return input;
                case 2 /* Boolean */: return input;
                case 3 /* String */: return input;
                case 4 /* Symbol */: return input;
                case 5 /* Number */: return input;
            }
            var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
            var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
            if (exoticToPrim !== undefined) {
                var result = exoticToPrim.call(input, hint);
                if (IsObject(result))
                    throw new TypeError();
                return result;
            }
            return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
        }
        // 7.1.1.1 OrdinaryToPrimitive(O, hint)
        // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
        function OrdinaryToPrimitive(O, hint) {
            if (hint === "string") {
                var toString_1 = O.toString;
                if (IsCallable(toString_1)) {
                    var result = toString_1.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            else {
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var toString_2 = O.toString;
                if (IsCallable(toString_2)) {
                    var result = toString_2.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            throw new TypeError();
        }
        // 7.1.2 ToBoolean(argument)
        // https://tc39.github.io/ecma262/2016/#sec-toboolean
        function ToBoolean(argument) {
            return !!argument;
        }
        // 7.1.12 ToString(argument)
        // https://tc39.github.io/ecma262/#sec-tostring
        function ToString(argument) {
            return "" + argument;
        }
        // 7.1.14 ToPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-topropertykey
        function ToPropertyKey(argument) {
            var key = ToPrimitive(argument, 3 /* String */);
            if (IsSymbol(key))
                return key;
            return ToString(key);
        }
        // 7.2 Testing and Comparison Operations
        // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
        // 7.2.2 IsArray(argument)
        // https://tc39.github.io/ecma262/#sec-isarray
        function IsArray(argument) {
            return Array.isArray
                ? Array.isArray(argument)
                : argument instanceof Object
                    ? argument instanceof Array
                    : Object.prototype.toString.call(argument) === "[object Array]";
        }
        // 7.2.3 IsCallable(argument)
        // https://tc39.github.io/ecma262/#sec-iscallable
        function IsCallable(argument) {
            // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
            return typeof argument === "function";
        }
        // 7.2.4 IsConstructor(argument)
        // https://tc39.github.io/ecma262/#sec-isconstructor
        function IsConstructor(argument) {
            // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
            return typeof argument === "function";
        }
        // 7.2.7 IsPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-ispropertykey
        function IsPropertyKey(argument) {
            switch (Type(argument)) {
                case 3 /* String */: return true;
                case 4 /* Symbol */: return true;
                default: return false;
            }
        }
        // 7.3 Operations on Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-objects
        // 7.3.9 GetMethod(V, P)
        // https://tc39.github.io/ecma262/#sec-getmethod
        function GetMethod(V, P) {
            var func = V[P];
            if (func === undefined || func === null)
                return undefined;
            if (!IsCallable(func))
                throw new TypeError();
            return func;
        }
        // 7.4 Operations on Iterator Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
        function GetIterator(obj) {
            var method = GetMethod(obj, iteratorSymbol);
            if (!IsCallable(method))
                throw new TypeError(); // from Call
            var iterator = method.call(obj);
            if (!IsObject(iterator))
                throw new TypeError();
            return iterator;
        }
        // 7.4.4 IteratorValue(iterResult)
        // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
        function IteratorValue(iterResult) {
            return iterResult.value;
        }
        // 7.4.5 IteratorStep(iterator)
        // https://tc39.github.io/ecma262/#sec-iteratorstep
        function IteratorStep(iterator) {
            var result = iterator.next();
            return result.done ? false : result;
        }
        // 7.4.6 IteratorClose(iterator, completion)
        // https://tc39.github.io/ecma262/#sec-iteratorclose
        function IteratorClose(iterator) {
            var f = iterator["return"];
            if (f)
                f.call(iterator);
        }
        // 9.1 Ordinary Object Internal Methods and Internal Slots
        // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
        // 9.1.1.1 OrdinaryGetPrototypeOf(O)
        // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
        function OrdinaryGetPrototypeOf(O) {
            var proto = Object.getPrototypeOf(O);
            if (typeof O !== "function" || O === functionPrototype)
                return proto;
            // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
            // Try to determine the superclass constructor. Compatible implementations
            // must either set __proto__ on a subclass constructor to the superclass constructor,
            // or ensure each class has a valid `constructor` property on its prototype that
            // points back to the constructor.
            // If this is not the same as Function.[[Prototype]], then this is definately inherited.
            // This is the case when in ES6 or when using __proto__ in a compatible browser.
            if (proto !== functionPrototype)
                return proto;
            // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
            var prototype = O.prototype;
            var prototypeProto = prototype && Object.getPrototypeOf(prototype);
            if (prototypeProto == null || prototypeProto === Object.prototype)
                return proto;
            // If the constructor was not a function, then we cannot determine the heritage.
            var constructor = prototypeProto.constructor;
            if (typeof constructor !== "function")
                return proto;
            // If we have some kind of self-reference, then we cannot determine the heritage.
            if (constructor === O)
                return proto;
            // we have a pretty good guess at the heritage.
            return constructor;
        }
        // naive Map shim
        function CreateMapPolyfill() {
            var cacheSentinel = {};
            var arraySentinel = [];
            var MapIterator = (function () {
                function MapIterator(keys, values, selector) {
                    this._index = 0;
                    this._keys = keys;
                    this._values = values;
                    this._selector = selector;
                }
                MapIterator.prototype["@@iterator"] = function () { return this; };
                MapIterator.prototype[iteratorSymbol] = function () { return this; };
                MapIterator.prototype.next = function () {
                    var index = this._index;
                    if (index >= 0 && index < this._keys.length) {
                        var result = this._selector(this._keys[index], this._values[index]);
                        if (index + 1 >= this._keys.length) {
                            this._index = -1;
                            this._keys = arraySentinel;
                            this._values = arraySentinel;
                        }
                        else {
                            this._index++;
                        }
                        return { value: result, done: false };
                    }
                    return { value: undefined, done: true };
                };
                MapIterator.prototype.throw = function (error) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    throw error;
                };
                MapIterator.prototype.return = function (value) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    return { value: value, done: true };
                };
                return MapIterator;
            }());
            return (function () {
                function Map() {
                    this._keys = [];
                    this._values = [];
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                }
                Object.defineProperty(Map.prototype, "size", {
                    get: function () { return this._keys.length; },
                    enumerable: true,
                    configurable: true
                });
                Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
                Map.prototype.get = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    return index >= 0 ? this._values[index] : undefined;
                };
                Map.prototype.set = function (key, value) {
                    var index = this._find(key, /*insert*/ true);
                    this._values[index] = value;
                    return this;
                };
                Map.prototype.delete = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    if (index >= 0) {
                        var size = this._keys.length;
                        for (var i = index + 1; i < size; i++) {
                            this._keys[i - 1] = this._keys[i];
                            this._values[i - 1] = this._values[i];
                        }
                        this._keys.length--;
                        this._values.length--;
                        if (key === this._cacheKey) {
                            this._cacheKey = cacheSentinel;
                            this._cacheIndex = -2;
                        }
                        return true;
                    }
                    return false;
                };
                Map.prototype.clear = function () {
                    this._keys.length = 0;
                    this._values.length = 0;
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                };
                Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
                Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
                Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
                Map.prototype["@@iterator"] = function () { return this.entries(); };
                Map.prototype[iteratorSymbol] = function () { return this.entries(); };
                Map.prototype._find = function (key, insert) {
                    if (this._cacheKey !== key) {
                        this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
                    }
                    if (this._cacheIndex < 0 && insert) {
                        this._cacheIndex = this._keys.length;
                        this._keys.push(key);
                        this._values.push(undefined);
                    }
                    return this._cacheIndex;
                };
                return Map;
            }());
            function getKey(key, _) {
                return key;
            }
            function getValue(_, value) {
                return value;
            }
            function getEntry(key, value) {
                return [key, value];
            }
        }
        // naive Set shim
        function CreateSetPolyfill() {
            return (function () {
                function Set() {
                    this._map = new _Map();
                }
                Object.defineProperty(Set.prototype, "size", {
                    get: function () { return this._map.size; },
                    enumerable: true,
                    configurable: true
                });
                Set.prototype.has = function (value) { return this._map.has(value); };
                Set.prototype.add = function (value) { return this._map.set(value, value), this; };
                Set.prototype.delete = function (value) { return this._map.delete(value); };
                Set.prototype.clear = function () { this._map.clear(); };
                Set.prototype.keys = function () { return this._map.keys(); };
                Set.prototype.values = function () { return this._map.values(); };
                Set.prototype.entries = function () { return this._map.entries(); };
                Set.prototype["@@iterator"] = function () { return this.keys(); };
                Set.prototype[iteratorSymbol] = function () { return this.keys(); };
                return Set;
            }());
        }
        // naive WeakMap shim
        function CreateWeakMapPolyfill() {
            var UUID_SIZE = 16;
            var keys = HashMap.create();
            var rootKey = CreateUniqueKey();
            return (function () {
                function WeakMap() {
                    this._key = CreateUniqueKey();
                }
                WeakMap.prototype.has = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.has(table, this._key) : false;
                };
                WeakMap.prototype.get = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.get(table, this._key) : undefined;
                };
                WeakMap.prototype.set = function (target, value) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                    table[this._key] = value;
                    return this;
                };
                WeakMap.prototype.delete = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? delete table[this._key] : false;
                };
                WeakMap.prototype.clear = function () {
                    // NOTE: not a real clear, just makes the previous data unreachable
                    this._key = CreateUniqueKey();
                };
                return WeakMap;
            }());
            function CreateUniqueKey() {
                var key;
                do
                    key = "@@WeakMap@@" + CreateUUID();
                while (HashMap.has(keys, key));
                keys[key] = true;
                return key;
            }
            function GetOrCreateWeakMapTable(target, create) {
                if (!hasOwn.call(target, rootKey)) {
                    if (!create)
                        return undefined;
                    Object.defineProperty(target, rootKey, { value: HashMap.create() });
                }
                return target[rootKey];
            }
            function FillRandomBytes(buffer, size) {
                for (var i = 0; i < size; ++i)
                    buffer[i] = Math.random() * 0xff | 0;
                return buffer;
            }
            function GenRandomBytes(size) {
                if (typeof Uint8Array === "function") {
                    if (typeof crypto !== "undefined")
                        return crypto.getRandomValues(new Uint8Array(size));
                    if (typeof msCrypto !== "undefined")
                        return msCrypto.getRandomValues(new Uint8Array(size));
                    return FillRandomBytes(new Uint8Array(size), size);
                }
                return FillRandomBytes(new Array(size), size);
            }
            function CreateUUID() {
                var data = GenRandomBytes(UUID_SIZE);
                // mark as random - RFC 4122 § 4.4
                data[6] = data[6] & 0x4f | 0x40;
                data[8] = data[8] & 0xbf | 0x80;
                var result = "";
                for (var offset = 0; offset < UUID_SIZE; ++offset) {
                    var byte = data[offset];
                    if (offset === 4 || offset === 6 || offset === 8)
                        result += "-";
                    if (byte < 16)
                        result += "0";
                    result += byte.toString(16).toLowerCase();
                }
                return result;
            }
        }
        // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
        function MakeDictionary(obj) {
            obj.__ = undefined;
            delete obj.__;
            return obj;
        }
    });
})(Reflect || (Reflect = {}));
//# sourceMappingURL=Reflect.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32), __webpack_require__(58)))

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decorateThis", function() { return decorateThis; });
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-06
 * @modify date 2017-09-06
 *
 * 这个文件的存在是为了对现有js功能打补丁修bug等
*/
/** 修复Array.findIndex会被遍历到的问题 */
if (Array.prototype.hasOwnProperty("findIndex")) {
    var desc = Object.getOwnPropertyDescriptor(Array.prototype, "findIndex");
    if (desc.enumerable) {
        desc.enumerable = false;
        Object.defineProperty(Array.prototype, "findIndex", desc);
    }
}
/** 为某些不支持ErrorEvent的浏览器添加ErrorEvent支持 */
try {
    new ErrorEvent("");
}
catch (err) {
    window["ErrorEvent"] = function ErrorEvent(type, errorEventInitDict) {
        if (!errorEventInitDict)
            errorEventInitDict = {};
        if (Event instanceof Function) {
            Event.call(this, type, errorEventInitDict);
            this.initErrorEvent(type, errorEventInitDict.bubbles, errorEventInitDict.cancelable, errorEventInitDict.message, errorEventInitDict.filename, errorEventInitDict.lineno);
            this.error = errorEventInitDict.error;
            return this;
        }
        else {
            var evt = document.createEvent("ErrorEvent");
            evt.initErrorEvent(type, errorEventInitDict.bubbles, errorEventInitDict.cancelable, errorEventInitDict.message, errorEventInitDict.filename, errorEventInitDict.lineno);
            return evt;
        }
    };
    window["ErrorEvent"].prototype.initErrorEvent = function initErrorEvent(typeArg, canBubbleArg, cancelableArg, messageArg, filenameArg, linenoArg) {
        this.type = typeArg;
        this.bubbles = canBubbleArg;
        this.cancelable = cancelableArg;
        this.message = messageArg;
        this.filename = filenameArg;
        this.lineno = linenoArg;
    };
}
/** 篡改Reflect.decorate方法，用于为装饰器方法打个flag，标记装饰器是否为参数化装饰 */
var decorateThis = {};
if (Reflect && Reflect.decorate) {
    var oriDecorate = Reflect.decorate;
    Reflect.decorate = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // 篡改args[0][0]（装饰器方法引用），在调用时为其提供一个this指向，指向window
        var oriRef = args[0][0];
        args[0][0] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return oriRef.apply(decorateThis, args);
        };
        // 调用原始方法
        var result = oriDecorate.apply(this, args);
        // 还原篡改项
        args[0][0] = oriRef;
        // 返回结果
        return result;
    };
}


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = createRunFunc;
/* unused harmony export runExp */
/* harmony export (immutable) */ __webpack_exports__["a"] = createEvalFunc;
/* harmony export (immutable) */ __webpack_exports__["c"] = evalExp;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_ObjectUtil__ = __webpack_require__(3);

function wrapEvalFunc(exp) {
    // 这个方法的功能主要是将多个scope合并成为一个scope
    return function () {
        var scopes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            scopes[_i] = arguments[_i];
        }
        var scope = __WEBPACK_IMPORTED_MODULE_0__utils_ObjectUtil__["b" /* extendObject */].apply(void 0, [{}].concat(scopes.reverse()));
        return exp.call(this, scope);
    };
}
/**
 * 将表达式包装成为方法
 *
 * @param {(EvalExp)} exp 表达式或方法
 * @param {number} scopeCount 参数个数，仅在exp为表达式时有效
 * @returns {EvalFunc} 包装方法
 */
function wrapEvalFuncExp(exp, scopeCount) {
    if (typeof exp === "string") {
        var argList = [];
        var expStr = exp;
        for (var i = 0; i < scopeCount; i++) {
            argList.push("s" + i);
            expStr = "with(s" + i + "||{}){" + expStr + "}";
        }
        return Function(argList.join(","), expStr);
    }
    else {
        return wrapEvalFunc(exp);
    }
}
/**
 * 创建一个执行方法，用于未来执行
 *
 * @export
 * @param {(EvalExp)} exp 表达式或方法
 * @param {number} [scopeCount=0] 所需的域的数量
 * @returns {EvalFunc} 创建的方法
 */
function createRunFunc(exp, scopeCount) {
    if (scopeCount === void 0) { scopeCount = 0; }
    if (typeof exp === "string") {
        var func;
        try {
            func = wrapEvalFuncExp(exp, scopeCount);
        }
        catch (err) {
            // 可能是某些版本的解释器不认识模板字符串，将模板字符串变成普通字符串
            var sepStr = (exp.indexOf('"') < 0 ? '"' : "'");
            // 将exp中的·替换为'
            var reg = /([^\\]?)`/g;
            exp = exp.replace(reg, "$1" + sepStr);
            // 将exp中${...}替换为" + ... + "的形式
            reg = /\$\{(.*?)\}/g;
            exp = exp.replace(reg, sepStr + "+($1)+" + sepStr);
            // 重新生成方法并返回
            func = wrapEvalFuncExp(exp, scopeCount);
        }
        return func;
    }
    else {
        return wrapEvalFunc(exp);
    }
}
/**
 * 直接执行表达式，不求值。该方法可以执行多条语句
 *
 * @export
 * @param {(EvalExp)} exp 表达式或方法
 * @param {*} [thisArg] this指向
 * @param {...any[]} scopes 表达式的作用域列表
 */
function runExp(exp, thisArg) {
    var scopes = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        scopes[_i - 2] = arguments[_i];
    }
    createRunFunc(exp, scopes.length).apply(thisArg, scopes);
}
/**
 * 创建一个表达式求值方法，用于未来执行
 *
 * @export
 * @param {(EvalExp)} exp 表达式或方法
 * @param {number} [scopeCount=0] 所需的域的数量
 * @returns {EvalFunc} 创建的方法
 */
function createEvalFunc(exp, scopeCount) {
    if (scopeCount === void 0) { scopeCount = 0; }
    if (typeof exp === "string")
        return createRunFunc("return " + exp, scopeCount);
    else
        return wrapEvalFunc(exp);
}
/**
 * 表达式求值，无法执行多条语句
 *
 * @export
 * @param {(EvalExp)} exp 表达式或方法
 * @param {*} [thisArg] this指向
 * @param {...any[]} scopes 表达式的作用域列表
 * @returns {*} 返回值
 */
function evalExp(exp, thisArg) {
    var scopes = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        scopes[_i - 2] = arguments[_i];
    }
    return createEvalFunc(exp, scopes.length).apply(thisArg, scopes);
}


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return panelManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_injector_Injector__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__NonePanelPolicy__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__PanelMessage__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__IPromptPanel__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__bridge_BridgeManager__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mask_MaskManager__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils_Dictionary__ = __webpack_require__(4);









/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-06
 * @modify date 2017-09-06
 *
 * 弹窗管理器，包含弹出弹窗、关闭弹窗、弹窗管理等功能
*/
var PanelManager = /** @class */ (function () {
    function PanelManager() {
        this._panels = [];
        this._priorities = new __WEBPACK_IMPORTED_MODULE_8__utils_Dictionary__["a" /* default */]();
        this._modalDict = new __WEBPACK_IMPORTED_MODULE_8__utils_Dictionary__["a" /* default */]();
        /************************ 下面是通用弹窗的逻辑 ************************/
        this._promptDict = {};
    }
    PanelManager_1 = PanelManager;
    /**
     * 获取当前显示的弹窗数组（副本）
     *
     * @param {IConstructor} [cls] 弹窗类型，如果传递该参数则只返回该类型的已打开弹窗，否则将返回所有已打开的弹窗
     * @returns {IPanel[]} 已打开弹窗数组
     * @memberof PanelManager
     */
    PanelManager.prototype.getOpened = function (cls) {
        if (!cls)
            return this._panels.concat();
        else
            return this._panels.filter(function (panel) { return panel.constructor == cls; });
    };
    /**
     * 获取弹窗是否已开启
     *
     * @param {IPanel} panel 弹窗对象
     * @returns {boolean} 是否已经开启
     * @memberof PanelManager
     */
    PanelManager.prototype.isOpened = function (panel) {
        return (this._panels.indexOf(panel) >= 0);
    };
    PanelManager.prototype.updateModalMask = function (panel) {
        // 首先将传入的panel的模态遮罩去除
        __WEBPACK_IMPORTED_MODULE_7__mask_MaskManager__["a" /* maskManager */].hideModalMask(panel);
        // 然后为最上层的模态弹窗添加遮罩
        for (var i = this._panels.length - 1; i >= 0; i--) {
            panel = this._panels[i];
            if (this._modalDict.get(panel)) {
                // 如果已经有遮罩了，先移除之
                if (__WEBPACK_IMPORTED_MODULE_7__mask_MaskManager__["a" /* maskManager */].isShowingModalMask(panel))
                    __WEBPACK_IMPORTED_MODULE_7__mask_MaskManager__["a" /* maskManager */].hideModalMask(panel);
                // 添加遮罩
                __WEBPACK_IMPORTED_MODULE_7__mask_MaskManager__["a" /* maskManager */].showModalMask(panel);
                break;
            }
        }
    };
    /**
     * 打开一个弹窗
     *
     * @param {IPanel} panel 要打开的弹窗
     * @param {*} [data] 数据
     * @param {boolean} [isModal=true] 是否模态弹出
     * @param {{x:number, y:number}} [from] 弹出起点位置
     * @returns {IPanel} 返回弹窗对象
     * @memberof PanelManager
     */
    PanelManager.prototype.pop = function (panel, data, isModal, from) {
        var _this = this;
        if (isModal === void 0) { isModal = true; }
        if (this._panels.indexOf(panel) < 0) {
            // 数据先行
            this._panels.push(panel);
            // 弹窗所在的表现层必须要显示
            panel.bridge.htmlWrapper.style.display = "";
            // 获取策略
            var policy = panel.policy || panel.bridge.defaultPanelPolicy || __WEBPACK_IMPORTED_MODULE_3__NonePanelPolicy__["a" /* default */];
            // 调用回调
            panel.onBeforePop(data, isModal, from);
            // 派发消息
            __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].dispatch(__WEBPACK_IMPORTED_MODULE_4__PanelMessage__["a" /* default */].PANEL_BEFORE_POP, panel, isModal, from);
            // 调用准备接口
            policy.prepare && policy.prepare(panel);
            // 添加显示
            var bridge = panel.bridge;
            bridge.addChild(panel.bridge.panelLayer, panel.skin);
            // 根据优先级进行排序
            this._panels.sort(function (a, b) {
                var priA = _this._priorities.get(a) || 0;
                var priB = _this._priorities.get(b) || 0;
                return priA - priB;
            });
            // 根据排序后的顺序调整显示顺序
            for (var _i = 0, _a = this._panels; _i < _a.length; _i++) {
                var temp = _a[_i];
                temp.bridge.addChild(temp.bridge.panelLayer, temp.skin);
            }
            // 调用策略接口
            policy.pop(panel, function () {
                // 调用回调
                panel.onAfterPop(data, isModal, from);
                // 派发消息
                __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].dispatch(__WEBPACK_IMPORTED_MODULE_4__PanelMessage__["a" /* default */].PANEL_AFTER_POP, panel, isModal, from);
            }, from);
            // 记录模态数据
            this._modalDict.set(panel, isModal);
            // 更新模态遮罩
            this.updateModalMask(panel);
        }
        return panel;
    };
    /**
     * 关闭一个弹窗
     *
     * @param {IPanel} panel 要关闭的弹窗
     * @param {*} [data] 数据
     * @param {{x:number, y:number}} [to] 关闭终点位置
     * @returns {IPanel} 返回弹窗对象
     * @memberof PanelManager
     */
    PanelManager.prototype.drop = function (panel, data, to) {
        var index = this._panels.indexOf(panel);
        if (index >= 0) {
            // 数据先行
            this._panels.splice(index, 1);
            // 获取策略
            var policy = panel.policy || panel.bridge.defaultPanelPolicy || __WEBPACK_IMPORTED_MODULE_3__NonePanelPolicy__["a" /* default */];
            // 调用回调
            panel.onBeforeDrop(data, to);
            // 派发消息
            __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].dispatch(__WEBPACK_IMPORTED_MODULE_4__PanelMessage__["a" /* default */].PANEL_BEFORE_DROP, panel, to);
            // 调用策略接口
            policy.drop(panel, function () {
                // 调用回调
                panel.onAfterDrop(data, to);
                // 派发消息
                __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].dispatch(__WEBPACK_IMPORTED_MODULE_4__PanelMessage__["a" /* default */].PANEL_AFTER_DROP, panel, to);
                // 移除显示
                var bridge = panel.bridge;
                var parent = bridge.getParent(panel.skin);
                if (parent)
                    bridge.removeChild(parent, panel.skin);
                // 调用接口
                panel.dispose();
            }, to);
            // 移除优先级数据
            this._priorities.delete(panel);
            // 移除模态数据
            this._modalDict.delete(panel);
            // 更新模态遮罩
            this.updateModalMask(panel);
        }
        return panel;
    };
    /**
     * 注册通用弹窗
     *
     * @param {string} type 通用弹窗要注册到的表现层类型
     * @param {IPromptPanelConstructor} prompt 通用弹窗类型
     * @memberof PanelManager
     */
    PanelManager.prototype.registerPrompt = function (type, prompt) {
        this._promptDict[type] = prompt;
    };
    /**
     * 取消注册通用弹窗
     *
     * @param {string} type 要取消注册通用弹窗的表现层类型
     * @memberof PanelManager
     */
    PanelManager.prototype.unregisterPrompt = function (type) {
        delete this._promptDict[type];
    };
    /**
     * @private
     */
    PanelManager.prototype.prompt = function (msgOrParams) {
        var handlers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            handlers[_i - 1] = arguments[_i];
        }
        var params;
        if (typeof msgOrParams == "string") {
            params = {
                msg: msgOrParams,
                handlers: handlers
            };
        }
        else {
            params = msgOrParams;
        }
        // 取到当前场景的类型
        var curBridge = __WEBPACK_IMPORTED_MODULE_6__bridge_BridgeManager__["a" /* bridgeManager */].currentBridge;
        var type = curBridge && curBridge.type;
        // 用场景类型取到弹窗对象
        var promptCls = this._promptDict[type];
        if (promptCls == null) {
            // 没有找到当前模块类型关联的通用弹窗类型，改用系统弹窗凑合一下
            alert(params.msg);
            return;
        }
        // 增加默认值
        for (var i in params.handlers) {
            var handler = params.handlers[i];
            if (handler.text == null)
                handler.text = handler.data;
            if (handler.buttonType == null)
                handler.buttonType = __WEBPACK_IMPORTED_MODULE_5__IPromptPanel__["a" /* ButtonType */].normal;
        }
        // 实例化
        var prompt = new promptCls();
        // 设置优先级
        this._priorities.set(prompt, PanelManager_1.PRIORITY_PROMPT);
        // 显示弹窗
        prompt.open(params);
        // 更新弹窗
        prompt.update(params);
        // 返回弹窗
        return prompt;
    };
    /**
     * 显示警告窗口（只有一个确定按钮）
     *
     * @param {(string|IPromptParams)} msgOrParams 要显示的文本，或者弹窗数据
     * @param {()=>void} [okHandler] 确定按钮点击回调
     * @returns {IPromptPanel} 返回弹窗实体
     * @memberof PanelManager
     */
    PanelManager.prototype.alert = function (msgOrParams, okHandler) {
        var params;
        if (typeof msgOrParams == "string") {
            params = { msg: msgOrParams };
        }
        else {
            params = msgOrParams;
        }
        params.handlers = [
            { data: "确定", handler: okHandler, buttonType: __WEBPACK_IMPORTED_MODULE_5__IPromptPanel__["a" /* ButtonType */].important }
        ];
        return this.prompt(params);
    };
    /**
     * 显示确认窗口（有一个确定按钮和一个取消按钮）
     *
     * @param {(string|IPromptParams)} msgOrParams 要显示的文本，或者弹窗数据
     * @param {()=>void} [okHandler] 确定按钮点击回调
     * @param {()=>void} [cancelHandler] 取消按钮点击回调
     * @returns {IPromptPanel} 返回弹窗实体
     * @memberof PanelManager
     */
    PanelManager.prototype.confirm = function (msgOrParams, okHandler, cancelHandler) {
        var params;
        if (typeof msgOrParams == "string") {
            params = { msg: msgOrParams };
        }
        else {
            params = msgOrParams;
        }
        params.handlers = [
            { data: "取消", handler: cancelHandler, buttonType: __WEBPACK_IMPORTED_MODULE_5__IPromptPanel__["a" /* ButtonType */].normal },
            { data: "确定", handler: okHandler, buttonType: __WEBPACK_IMPORTED_MODULE_5__IPromptPanel__["a" /* ButtonType */].important }
        ];
        return this.prompt(params);
    };
    PanelManager.PRIORITY_NORMAL = 0;
    PanelManager.PRIORITY_PROMPT = 1;
    PanelManager = PanelManager_1 = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
        __WEBPACK_IMPORTED_MODULE_2__core_injector_Injector__["Injectable"]
    ], PanelManager);
    return PanelManager;
    var PanelManager_1;
}());
/* unused harmony default export */ var _unused_webpack_default_export = (PanelManager);
/** 再额外导出一个单例 */
var panelManager = __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].getInject(PanelManager);


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return version; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_injector_Injector__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_URLUtil__ = __webpack_require__(13);




/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-21
 * @modify date 2017-09-21
 *
 * 管理文件哈希版本号
*/
var Version = /** @class */ (function () {
    function Version() {
        this._hashDict = {};
    }
    /**
     * 初始化哈希版本工具
     *
     * @param {()=>void} handler 回调
     * @param {string} [host] version.cfg文件加载域名，不传则使用当前域名
     * @param {string} [version] 加载version.cfg文件的版本号，不传则使用随机时间戳作为版本号
     * @memberof Version
     */
    Version.prototype.initialize = function (handler, host, version) {
        var self = this;
        if (window["__Olympus_Version_hashDict__"]) {
            // 之前在哪加载过，无需再次加载，直接使用
            this._hashDict = window["__Olympus_Version_hashDict__"];
            handler();
        }
        else {
            // 去加载version.cfg
            var request = null;
            if (window["XDomainRequest"] && navigator.userAgent.indexOf("MSIE 10.") < 0) {
                // code for IE7 - IE9
                request = new window["XDomainRequest"]();
            }
            else if (window["XMLHttpRequest"]) {
                // code for IE10, Firefox, Chrome, Opera, Safari
                request = new XMLHttpRequest();
            }
            else if (window["ActiveXObject"]) {
                // code for IE6, IE5
                request = new ActiveXObject("Microsoft.XMLHTTP");
            }
            // 注册回调函数
            request.onload = function (evt) {
                if (request.status === undefined) {
                    // 说明是不支持XMLHttpRequest的情况，查看其responseText是否为""
                    if (request.responseText === "") {
                        // 失败
                        request.onerror(new ErrorEvent("RequestError", { filename: url }));
                    }
                    else {
                        // 成功
                        onLoad(evt);
                        handler();
                    }
                }
                else {
                    // 即使是onLoad也要判断下状态码
                    var statusHead = Math.floor(request.status * 0.01);
                    switch (statusHead) {
                        case 2:
                        case 3:
                            // 2xx和3xx的状态码认为是成功
                            onLoad(evt);
                            handler();
                            break;
                        case 4:
                        case 5:
                            // 4xx和5xx的状态码认为是错误，转调错误回调
                            request.onerror(new ErrorEvent("RequestError", { filename: url, message: request.status + " " + request.statusText }));
                            break;
                    }
                }
            };
            var url;
            if (version) {
                request.onerror = function () {
                    // 使用-r_方式加载失败了，再试一次用query参数加载版本号
                    var url = Object(__WEBPACK_IMPORTED_MODULE_3__utils_URLUtil__["f" /* wrapAbsolutePath */])("version.cfg?v=" + version, host);
                    request.abort();
                    request.onerror = handler;
                    request.open("GET", url, true);
                    request.send();
                };
                // 设置连接信息
                url = Object(__WEBPACK_IMPORTED_MODULE_3__utils_URLUtil__["f" /* wrapAbsolutePath */])("version.cfg", host);
                // 添加-r_方式版本号
                url = this.joinVersion(url, version);
            }
            else {
                // 没有版本号，直接使用当前时间戳加载
                request.onerror = handler;
                url = Object(__WEBPACK_IMPORTED_MODULE_3__utils_URLUtil__["f" /* wrapAbsolutePath */])("version.cfg?v=" + Date.now(), host);
            }
            request.open("GET", url, true);
            // 发送数据，开始和服务器进行交互
            request.send();
        }
        function onLoad(evt) {
            var request = evt.target;
            var responseText = request.responseText;
            var lines = responseText.split("\n");
            for (var i in lines) {
                var line = lines[i];
                var arr = line.split("  ");
                if (arr.length == 2) {
                    var key = arr[1].substr(2);
                    var value = arr[0];
                    self._hashDict[key] = value;
                }
            }
            // 在window上挂一份
            window["__Olympus_Version_hashDict__"] = self._hashDict;
        }
    };
    /**
     * 获取文件哈希值，如果没有文件哈希值则返回null
     *
     * @param {string} url 文件的URL
     * @returns {string} 文件的哈希值，或者null
     * @memberof Version
     */
    Version.prototype.getHash = function (url) {
        url = Object(__WEBPACK_IMPORTED_MODULE_3__utils_URLUtil__["d" /* trimURL */])(url);
        var result = null;
        for (var path in this._hashDict) {
            if (url.indexOf(path) >= 0) {
                result = this._hashDict[path];
                break;
            }
        }
        return result;
    };
    /**
     * 将url转换为哈希版本url
     *
     * @param {string} url 原始url
     * @returns {string} 哈希版本url
     * @memberof Version
     */
    Version.prototype.wrapHashUrl = function (url) {
        var hash = this.getHash(url);
        if (hash != null) {
            url = this.joinVersion(url, hash);
        }
        return url;
    };
    /**
     * 添加-r_XXX形式版本号
     *
     * @param {string} url
     * @param {string} version 版本号，以数字和小写字母组成
     * @returns {string} 加版本号后的url，如果没有查到版本号则返回原始url
     * @memberof Version
     */
    Version.prototype.joinVersion = function (url, version) {
        if (version == null)
            return url;
        // 去掉version中的非法字符
        version = version.replace(/[^0-9a-z]+/ig, "");
        // 插入版本号
        var reg = /(([a-zA-Z]+:\/+[^\/\?#]+\/)?[^\?#]+)\.([^\?]+)(\?.+)?/;
        var result = reg.exec(url);
        if (result != null) {
            url = result[1] + "-r_" + version + "." + result[3] + (result[4] || "");
        }
        return url;
    };
    /**
     * 移除-r_XXX形式版本号
     *
     * @param {string} url url
     * @returns {string} 移除版本号后的url
     * @memberof Version
     */
    Version.prototype.removeVersion = function (url) {
        // 去掉-r_XXX版本号，如果有
        url = url.replace(/\-r_[a-z0-9]+\./ig, ".");
        return url;
    };
    Version = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
        __WEBPACK_IMPORTED_MODULE_2__core_injector_Injector__["Injectable"]
    ], Version);
    return Version;
}());
/* unused harmony default export */ var _unused_webpack_default_export = (Version);
/** 再额外导出一个单例 */
var version = __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].getInject(Version);


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2018-03-05
 * @modify date 2018-03-05
 *
 * 中介者消息
*/
var MediatorMessage = /** @class */ (function () {
    function MediatorMessage() {
    }
    /**
     * 中介者开启完毕事件
     *
     * @static
     * @type {string}
     * @memberof MediatorMessage
     */
    MediatorMessage.MEDIATOR_OPENED = "mediatorOpened";
    /**
     * 中介者关闭完毕事件
     *
     * @static
     * @type {string}
     * @memberof MediatorMessage
     */
    MediatorMessage.MEDIATOR_CLOSED = "mediatorClosed";
    return MediatorMessage;
}());
/* harmony default export */ __webpack_exports__["a"] = (MediatorMessage);


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return system; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_injector_Injector__ = __webpack_require__(2);



/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-06
 * @modify date 2017-09-06
 *
 * 用来记录程序运行时间，并且提供延迟回调或频率回调功能
*/
var System = /** @class */ (function () {
    function System() {
        // 这里尝试一下TS的Tuple类型——Raykid
        this._nextFrameList = [];
        this._timer = 0;
        var self = this;
        if (window.requestAnimationFrame instanceof Function) {
            requestAnimationFrame(onRequestAnimationFrame);
        }
        else {
            // 如果不支持requestAnimationFrame则改用setTimeout计时，延迟时间1000/60毫秒
            var startTime = Date.now();
            setInterval(function () {
                var curTime = Date.now();
                // 赋值timer
                self._timer = curTime - startTime;
                // 调用tick方法
                self.tick();
            }, 1000 / 60);
        }
        function onRequestAnimationFrame(timer) {
            // 赋值timer，这个方法里无法获取this，因此需要通过注入的静态属性取到自身实例
            self._timer = timer;
            // 调用tick方法
            self.tick();
            // 计划下一次执行
            requestAnimationFrame(onRequestAnimationFrame);
        }
    }
    /**
     * 获取从程序运行到当前所经过的毫秒数
     *
     * @returns {number} 毫秒数
     * @memberof System
     */
    System.prototype.getTimer = function () {
        return this._timer;
    };
    System.prototype.tick = function () {
        // 调用下一帧回调
        for (var i = 0, len = this._nextFrameList.length; i < len; i++) {
            var data = this._nextFrameList.shift();
            data[0].apply(data[1], data[2]);
        }
    };
    /**
     * 在下一帧执行某个方法
     *
     * @param {Function} handler 希望在下一帧执行的某个方法
     * @param {*} [thisArg] this指向
     * @param {...any[]} args 方法参数列表
     * @returns {ICancelable} 可取消的句柄
     * @memberof System
     */
    System.prototype.nextFrame = function (handler, thisArg) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var data = [handler, thisArg, args];
        this._nextFrameList.push(data);
        return {
            cancel: function () {
                var index = _this._nextFrameList.indexOf(data);
                if (index >= 0)
                    _this._nextFrameList.splice(index, 1);
            }
        };
    };
    /**
     * 每帧执行某个方法，直到取消为止
     *
     * @param {Function} handler 每帧执行的某个方法
     * @param {*} [thisArg] this指向
     * @param {...any[]} args 方法参数列表
     * @returns {ICancelable} 可取消的句柄
     * @memberof System
     */
    System.prototype.enterFrame = function (handler, thisArg) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var self = this;
        var cancelable = this.nextFrame.apply(this, [wrapHandler, thisArg].concat(args));
        return {
            cancel: function () {
                cancelable.cancel();
            }
        };
        function wrapHandler() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // 调用回调
            handler.apply(this, args);
            // 执行下一帧
            cancelable = self.nextFrame.apply(self, [wrapHandler, this].concat(args));
        }
    };
    /**
     * 设置延迟回调
     *
     * @param {number} duration 延迟毫秒值
     * @param {Function} handler 回调函数
     * @param {*} [thisArg] this指向
     * @param {...any[]} args 要传递的参数
     * @returns {ICancelable} 可取消的句柄
     * @memberof System
     */
    System.prototype.setTimeout = function (duration, handler, thisArg) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var startTimer = this._timer;
        // 启动计时器
        var nextFrame = this.nextFrame(tick, this);
        function tick() {
            var delta = this._timer - startTimer;
            if (delta >= duration) {
                nextFrame = null;
                handler.apply(thisArg, args);
            }
            else {
                nextFrame = this.nextFrame(tick, this);
            }
        }
        return {
            cancel: function () {
                nextFrame && nextFrame.cancel();
                nextFrame = null;
            }
        };
    };
    /**
     * 设置延时间隔
     *
     * @param {number} duration 延迟毫秒值
     * @param {Function} handler 回调函数
     * @param {*} [thisArg] this指向
     * @param {...any[]} args 要传递的参数
     * @returns {ICancelable} 可取消的句柄
     * @memberof System
     */
    System.prototype.setInterval = function (duration, handler, thisArg) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var timeout = this.setTimeout(duration, onTimeout, this);
        function onTimeout() {
            // 触发回调
            handler.apply(thisArg, args);
            // 继续下一次
            timeout = this.setTimeout(duration, onTimeout, this);
        }
        return {
            cancel: function () {
                timeout && timeout.cancel();
                timeout = null;
            }
        };
    };
    System = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
        __WEBPACK_IMPORTED_MODULE_2__core_injector_Injector__["Injectable"],
        __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [])
    ], System);
    return System;
}());
/* unused harmony default export */ var _unused_webpack_default_export = (System);
/** 再额外导出一个单例 */
var system = __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].getInject(System);


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_olympus_r_utils_ObjectUtil__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_olympus_r_engine_assets_AssetsManager__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_olympus_r_engine_system_System__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dom_mask_MaskEntity__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dom_utils_SkinUtil__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dom_panel_BackPanelPolicy__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dom_scene_FadeScenePolicy__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tweenjs_tween_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tweenjs_tween_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__tweenjs_tween_js__);
/// <amd-module name="DOMBridge"/>
/// <reference types="tween.js"/>








/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-18
 * @modify date 2017-09-18
 *
 * 基于DOM的表现层桥实现
*/
var DOMBridge = /** @class */ (function () {
    function DOMBridge(params) {
        /**
         * 获取默认弹窗策略
         *
         * @type {IPanelPolicy}
         * @memberof DOMBridge
         */
        this.defaultPanelPolicy = new __WEBPACK_IMPORTED_MODULE_5__dom_panel_BackPanelPolicy__["a" /* default */]();
        /**
         * 获取默认场景切换策略
         *
         * @type {IScenePolicy}
         * @memberof DOMBridge
         */
        this.defaultScenePolicy = new __WEBPACK_IMPORTED_MODULE_6__dom_scene_FadeScenePolicy__["a" /* default */]();
        this._listenerDict = {};
        this._initParams = params;
    }
    Object.defineProperty(DOMBridge.prototype, "type", {
        /**
         * 获取表现层类型名称
         *
         * @readonly
         * @type {string}
         * @memberof DOMBridge
         */
        get: function () {
            return DOMBridge.TYPE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DOMBridge.prototype, "htmlWrapper", {
        /**
         * 获取表现层HTML包装器，可以对其样式进行自定义调整
         *
         * @readonly
         * @type {HTMLElement}
         * @memberof DOMBridge
         */
        get: function () {
            return this._initParams.container;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DOMBridge.prototype, "root", {
        /**
         * 获取根显示节点
         *
         * @readonly
         * @type {HTMLElement}
         * @memberof DOMBridge
         */
        get: function () {
            return this._initParams.container;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DOMBridge.prototype, "stage", {
        /**
         * 获取舞台引用，DOM的舞台指向根节点
         *
         * @readonly
         * @type {HTMLElement}
         * @memberof DOMBridge
         */
        get: function () {
            return this._initParams.container;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DOMBridge.prototype, "bgLayer", {
        /**
         * 获取背景容器
         *
         * @readonly
         * @type {HTMLElement}
         * @memberof DOMBridge
         */
        get: function () {
            return this._bgLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DOMBridge.prototype, "sceneLayer", {
        /**
         * 获取场景容器
         *
         * @readonly
         * @type {HTMLElement}
         * @memberof DOMBridge
         */
        get: function () {
            return this._sceneLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DOMBridge.prototype, "frameLayer", {
        /**
         * 获取框架容器
         *
         * @readonly
         * @type {HTMLElement}
         * @memberof DOMBridge
         */
        get: function () {
            return this._frameLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DOMBridge.prototype, "panelLayer", {
        /**
         * 获取弹窗容器
         *
         * @readonly
         * @type {HTMLElement}
         * @memberof DOMBridge
         */
        get: function () {
            return this._panelLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DOMBridge.prototype, "maskLayer", {
        /**
         * 获取遮罩容器
         *
         * @readonly
         * @type {HTMLElement}
         * @memberof DOMBridge
         */
        get: function () {
            return this._maskLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DOMBridge.prototype, "topLayer", {
        /**
         * 获取顶级容器
         *
         * @readonly
         * @type {HTMLElement}
         * @memberof DOMBridge
         */
        get: function () {
            return this._topLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DOMBridge.prototype, "promptClass", {
        /**
         * 获取通用提示框
         *
         * @readonly
         * @type {IPromptPanelConstructor}
         * @memberof DOMBridge
         */
        get: function () {
            return this._initParams.promptClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DOMBridge.prototype, "maskEntity", {
        /**
         * 获取遮罩实体
         *
         * @readonly
         * @type {IMaskEntity}
         * @memberof DOMBridge
         */
        get: function () {
            return new __WEBPACK_IMPORTED_MODULE_3__dom_mask_MaskEntity__["a" /* default */](this._initParams.maskData);
        },
        enumerable: true,
        configurable: true
    });
    DOMBridge.prototype.createLayer = function () {
        // 生成一个父容器，不响应点击事件，但会撑起全屏幕范围
        var layer = document.createElement("div");
        layer.style.position = "fixed";
        layer.style.top = "0%";
        layer.style.left = "0%";
        layer.style.width = "100%";
        layer.style.height = "100%";
        layer.style.pointerEvents = "none";
        this.root.appendChild(layer);
        // 生成一个子容器，实际用来放置子对象，目的是响应点击事件
        var subLayer = document.createElement("div");
        subLayer.style.pointerEvents = "auto";
        layer.appendChild(subLayer);
        // 返回子容器
        return subLayer;
    };
    /**
     * 初始化表现层桥，可以没有该方法，没有该方法则表示该表现层无需初始化
     * @param {()=>void} complete 初始化完毕后的回调
     * @memberof DOMBridge
     */
    DOMBridge.prototype.init = function (complete) {
        // 如果是名称，则转变成引用
        if (typeof this._initParams.container == "string") {
            this._initParams.container = document.querySelector(this._initParams.container);
        }
        // 如果是空，则生成一个
        if (!this._initParams.container) {
            this._initParams.container = document.createElement("div");
            document.body.appendChild(this._initParams.container);
        }
        // 创建背景显示层
        this._bgLayer = this.createLayer();
        // 创建场景显示层
        this._sceneLayer = this.createLayer();
        // 创建框架显示层
        this._frameLayer = this.createLayer();
        // 创建弹出层
        this._panelLayer = this.createLayer();
        // 创建遮罩层
        this._maskLayer = this.createLayer();
        // 创建顶级显示层
        this._topLayer = this.createLayer();
        // 添加Tween.js驱动
        __WEBPACK_IMPORTED_MODULE_2_olympus_r_engine_system_System__["a" /* system */].enterFrame(function () {
            // 每次使用最新的当前运行毫秒数更新Tween.js
            __WEBPACK_IMPORTED_MODULE_7__tweenjs_tween_js__["update"](__WEBPACK_IMPORTED_MODULE_2_olympus_r_engine_system_System__["a" /* system */].getTimer());
        });
        // 调用回调
        complete(this);
    };
    /**
     * 判断皮肤是否是DOM显示节点
     *
     * @param {HTMLElement|string|string[]} skin 皮肤对象
     * @returns {boolean} 是否是DOM显示节点
     * @memberof DOMBridge
     */
    DOMBridge.prototype.isMySkin = function (skin) {
        if (skin instanceof HTMLElement)
            return true;
        if (typeof skin === "string" && (Object(__WEBPACK_IMPORTED_MODULE_4__dom_utils_SkinUtil__["b" /* isDOMPath */])(skin) || Object(__WEBPACK_IMPORTED_MODULE_4__dom_utils_SkinUtil__["c" /* isDOMStr */])(skin)))
            return true;
        if (skin instanceof Array) {
            // 数组里每一个元素都必须是皮肤
            var result = true;
            for (var _i = 0, skin_1 = skin; _i < skin_1.length; _i++) {
                var temp = skin_1[_i];
                if (!(typeof temp === "string" && (Object(__WEBPACK_IMPORTED_MODULE_4__dom_utils_SkinUtil__["b" /* isDOMPath */])(temp) || Object(__WEBPACK_IMPORTED_MODULE_4__dom_utils_SkinUtil__["c" /* isDOMStr */])(temp)))) {
                    result = false;
                    break;
                }
            }
            return result;
        }
        return false;
    };
    /**
     * 包装HTMLElement节点
     *
     * @param {IMediator} mediator 中介者
     * @param {HTMLElement|string|string[]} skin 原始HTMLElement节点
     * @returns {HTMLElement} 包装后的HTMLElement节点
     * @memberof DOMBridge
     */
    DOMBridge.prototype.wrapSkin = function (mediator, skin) {
        return Object(__WEBPACK_IMPORTED_MODULE_4__dom_utils_SkinUtil__["e" /* wrapSkin */])(mediator, skin);
    };
    /**
     * 替换皮肤，用于组件变身时不同表现层桥的处理
     *
     * @param {IMediator} mediator 中介者
     * @param {*} current 当前皮肤
     * @param {HTMLElement|string|string[]} target 要替换的皮肤
     * @returns {*} 替换完毕的皮肤
     * @memberof DOMBridge
     */
    DOMBridge.prototype.replaceSkin = function (mediator, current, target) {
        target = Object(__WEBPACK_IMPORTED_MODULE_4__dom_utils_SkinUtil__["d" /* toHTMLElement */])(target);
        // 如果有父节点，则用目标节点替换当前节点位置
        var parent = current.parentElement;
        if (parent) {
            parent.insertBefore(target, current);
            parent.removeChild(current);
        }
        // 重新包装节点
        this.wrapSkin(mediator, target);
        // 返回皮肤
        return target;
    };
    /**
     * 同步皮肤，用于组件变身后的重新定位
     *
     * @param {HTMLElement} current 当前皮肤
     * @param {HTMLElement} target 替换的皮肤
     * @memberof DOMBridge
     */
    DOMBridge.prototype.syncSkin = function (current, target) {
        if (!current || !target)
            return;
        // DOM无需特意同步，因为其样式都可以以css样式方式在外部表示，而仅有当前节点的style属性是需要同步的
        Object(__WEBPACK_IMPORTED_MODULE_0_olympus_r_utils_ObjectUtil__["b" /* extendObject */])(target.style, current.style);
    };
    /**
     * 创建一个空的显示对象
     *
     * @returns {HTMLElement}
     * @memberof DOMBridge
     */
    DOMBridge.prototype.createEmptyDisplay = function () {
        return document.createElement("div");
    };
    /**
     * 添加显示
     *
     * @param {Element} parent 要添加到的父容器
     * @param {Element} target 被添加的显示对象
     * @return {Element} 返回被添加的显示对象
     * @memberof DOMBridge
     */
    DOMBridge.prototype.addChild = function (parent, target) {
        return parent.appendChild(target);
    };
    /**
     * 按索引添加显示
     *
     * @param {Element} parent 要添加到的父容器
     * @param {Element} target 被添加的显示对象
     * @param {number} index 要添加到的父级索引
     * @return {Element} 返回被添加的显示对象
     * @memberof DOMBridge
     */
    DOMBridge.prototype.addChildAt = function (parent, target, index) {
        return parent.insertBefore(target, this.getChildAt(parent, index));
    };
    /**
     * 移除显示对象
     *
     * @param {Element} parent 父容器
     * @param {Element} target 被移除的显示对象
     * @return {Element} 返回被移除的显示对象
     * @memberof DOMBridge
     */
    DOMBridge.prototype.removeChild = function (parent, target) {
        if (parent && target && target.parentElement === parent)
            return parent.removeChild(target);
        else
            return target;
    };
    /**
     * 按索引移除显示
     *
     * @param {Element} parent 父容器
     * @param {number} index 索引
     * @return {Element} 返回被移除的显示对象
     * @memberof DOMBridge
     */
    DOMBridge.prototype.removeChildAt = function (parent, index) {
        return this.removeChild(parent, this.getChildAt(parent, index));
    };
    /**
     * 移除所有显示对象
     *
     * @param {Element} parent 父容器
     * @memberof DOMBridge
     */
    DOMBridge.prototype.removeChildren = function (parent) {
        for (var i = 0, len = parent.children.length; i < len; i++) {
            parent.removeChild(parent.children.item(i));
        }
    };
    /**
     * 获取父容器
     *
     * @param {Element} target 目标对象
     * @returns {Element} 父容器
     * @memberof DOMBridge
     */
    DOMBridge.prototype.getParent = function (target) {
        return target.parentElement;
    };
    /**
     * 获取指定索引处的显示对象
     *
     * @param {Element} parent 父容器
     * @param {number} index 指定父级索引
     * @return {Element} 索引处的显示对象
     * @memberof DOMBridge
     */
    DOMBridge.prototype.getChildAt = function (parent, index) {
        return parent.children.item(index);
    };
    /**
     * 获取显示索引
     *
     * @param {Element} parent 父容器
     * @param {Element} target 子显示对象
     * @return {number} target在parent中的索引
     * @memberof DOMBridge
     */
    DOMBridge.prototype.getChildIndex = function (parent, target) {
        for (var i = 0, len = parent.children.length; i < len; i++) {
            if (target === parent.children.item(i))
                return i;
        }
        return -1;
    };
    /**
     * 通过名称获取显示对象
     *
     * @param {Element} parent 父容器
     * @param {string} name 对象名称
     * @return {Element} 显示对象
     * @memberof DOMBridge
     */
    DOMBridge.prototype.getChildByName = function (parent, name) {
        return parent.children.namedItem(name);
    };
    /**
     * 获取子显示对象数量
     *
     * @param {Element} parent 父容器
     * @return {number} 子显示对象数量
     * @memberof DOMBridge
     */
    DOMBridge.prototype.getChildCount = function (parent) {
        return parent.childElementCount;
    };
    /**
     * 加载资源
     *
     * @param {string[]} assets 资源数组
     * @param {IMediator} mediator 资源列表
     * @param {(err?:Error)=>void} handler 回调函数
     * @memberof DOMBridge
     */
    DOMBridge.prototype.loadAssets = function (assets, mediator, handler) {
        // 开始加载皮肤列表
        if (assets)
            assets = assets.concat();
        loadNext();
        function loadNext() {
            if (!assets || assets.length <= 0) {
                // 调用回调
                handler();
            }
            else {
                var skin = assets.shift();
                __WEBPACK_IMPORTED_MODULE_1_olympus_r_engine_assets_AssetsManager__["b" /* assetsManager */].loadAssets(skin, function (result) {
                    if (result instanceof Error)
                        handler(result);
                    else
                        loadNext();
                });
            }
        }
    };
    /**
     * 监听事件，从这个方法监听的事件会在中介者销毁时被自动移除监听
     *
     * @param {EventTarget} target 事件目标对象
     * @param {string} type 事件类型
     * @param {(evt:Event)=>void} handler 事件处理函数
     * @param {*} [thisArg] this指向对象
     * @memberof DOMBridge
     */
    DOMBridge.prototype.mapListener = function (target, type, handler, thisArg) {
        var key = Object(__WEBPACK_IMPORTED_MODULE_0_olympus_r_utils_ObjectUtil__["e" /* getObjectHashs */])(target, type, handler, thisArg);
        // 判断是否已经存在该监听，如果存在则不再监听
        if (this._listenerDict[key])
            return;
        // 监听
        var listener = function (evt) {
            // 调用回调
            handler.call(thisArg || this, evt);
        };
        target.addEventListener(type, listener);
        // 记录监听
        this._listenerDict[key] = listener;
    };
    /**
     * 注销监听事件
     *
     * @param {EventTarget} target 事件目标对象
     * @param {string} type 事件类型
     * @param {(evt:Event)=>void} handler 事件处理函数
     * @param {*} [thisArg] this指向对象
     * @memberof DOMBridge
     */
    DOMBridge.prototype.unmapListener = function (target, type, handler, thisArg) {
        var key = Object(__WEBPACK_IMPORTED_MODULE_0_olympus_r_utils_ObjectUtil__["e" /* getObjectHashs */])(target, type, handler, thisArg);
        // 判断是否已经存在该监听，如果存在则移除监听
        var listener = this._listenerDict[key];
        if (listener) {
            target.removeEventListener(type, listener);
            // 移除记录
            delete this._listenerDict[key];
        }
    };
    /**
     * 为绑定的列表显示对象包装一个渲染器创建回调
     *
     * @param {HTMLElement} target BindFor指令指向的显示对象
     * @param {(key?:any, value?:any, renderer?:HTMLElement)=>void} handler 渲染器创建回调
     * @returns {*} 返回一个备忘录对象，会在赋值时提供
     * @memberof IBridge
     */
    DOMBridge.prototype.wrapBindFor = function (target, handler) {
        var parent = target.parentElement;
        // 生成一个from节点和一个to节点，用来占位
        var from = document.createElement("div");
        var to = document.createElement("div");
        parent && parent.insertBefore(from, target);
        parent && parent.insertBefore(to, target);
        // 移除显示
        parent && parent.removeChild(target);
        // 返回备忘录
        return { parent: parent, from: from, to: to, handler: handler };
    };
    /**
     * 为列表显示对象赋值
     *
     * @param {HTMLElement} target BindFor指令指向的显示对象
     * @param {*} datas 数据集合
     * @param {*} memento wrapBindFor返回的备忘录对象
     * @memberof IBridge
     */
    DOMBridge.prototype.valuateBindFor = function (target, datas, memento) {
        // 移除已有的列表项显示
        var parent = memento.parent;
        if (parent) {
            var fromIndex = this.getChildIndex(parent, memento.from);
            var toIndex = this.getChildIndex(parent, memento.to);
            for (var i = fromIndex + 1; i < toIndex; i++) {
                this.removeChildAt(parent, fromIndex + 1);
            }
        }
        // 添加新的渲染器
        for (var key in datas) {
            var newElement = target.cloneNode(true);
            // 拷贝子孙对象引用
            Object(__WEBPACK_IMPORTED_MODULE_4__dom_utils_SkinUtil__["a" /* copyRef */])(newElement, newElement);
            // 添加显示
            parent && parent.insertBefore(newElement, memento.to);
            // 使用cloneNode方法复制渲染器
            memento.handler(key, datas[key], newElement);
        }
    };
    /** 提供静态类型常量 */
    DOMBridge.TYPE = "DOM";
    return DOMBridge;
}());
/* harmony default export */ __webpack_exports__["default"] = (DOMBridge);


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */


var _Group = function () {
	this._tweens = {};
	this._tweensAddedDuringUpdate = {};
};

_Group.prototype = {
	getAll: function () {

		return Object.keys(this._tweens).map(function (tweenId) {
			return this._tweens[tweenId];
		}.bind(this));

	},

	removeAll: function () {

		this._tweens = {};

	},

	add: function (tween) {

		this._tweens[tween.getId()] = tween;
		this._tweensAddedDuringUpdate[tween.getId()] = tween;

	},

	remove: function (tween) {

		delete this._tweens[tween.getId()];
		delete this._tweensAddedDuringUpdate[tween.getId()];

	},

	update: function (time, preserve) {

		var tweenIds = Object.keys(this._tweens);

		if (tweenIds.length === 0) {
			return false;
		}

		time = time !== undefined ? time : TWEEN.now();

		// Tweens are updated in "batches". If you add a new tween during an update, then the
		// new tween will be updated in the next batch.
		// If you remove a tween during an update, it may or may not be updated. However,
		// if the removed tween was added during the current batch, then it will not be updated.
		while (tweenIds.length > 0) {
			this._tweensAddedDuringUpdate = {};

			for (var i = 0; i < tweenIds.length; i++) {

				var tween = this._tweens[tweenIds[i]];

				if (tween && tween.update(time) === false) {
					tween._isPlaying = false;

					if (!preserve) {
						delete this._tweens[tweenIds[i]];
					}
				}
			}

			tweenIds = Object.keys(this._tweensAddedDuringUpdate);
		}

		return true;

	}
};

var TWEEN = new _Group();

TWEEN.Group = _Group;
TWEEN._nextId = 0;
TWEEN.nextId = function () {
	return TWEEN._nextId++;
};


// Include a performance.now polyfill.
// In node.js, use process.hrtime.
if (typeof (window) === 'undefined' && typeof (process) !== 'undefined') {
	TWEEN.now = function () {
		var time = process.hrtime();

		// Convert [seconds, nanoseconds] to milliseconds.
		return time[0] * 1000 + time[1] / 1000000;
	};
}
// In a browser, use window.performance.now if it is available.
else if (typeof (window) !== 'undefined' &&
         window.performance !== undefined &&
		 window.performance.now !== undefined) {
	// This must be bound, because directly assigning this function
	// leads to an invocation exception in Chrome.
	TWEEN.now = window.performance.now.bind(window.performance);
}
// Use Date.now if it is available.
else if (Date.now !== undefined) {
	TWEEN.now = Date.now;
}
// Otherwise, use 'new Date().getTime()'.
else {
	TWEEN.now = function () {
		return new Date().getTime();
	};
}


TWEEN.Tween = function (object, group) {
	this._object = object;
	this._valuesStart = {};
	this._valuesEnd = {};
	this._valuesStartRepeat = {};
	this._duration = 1000;
	this._repeat = 0;
	this._repeatDelayTime = undefined;
	this._yoyo = false;
	this._isPlaying = false;
	this._reversed = false;
	this._delayTime = 0;
	this._startTime = null;
	this._easingFunction = TWEEN.Easing.Linear.None;
	this._interpolationFunction = TWEEN.Interpolation.Linear;
	this._chainedTweens = [];
	this._onStartCallback = null;
	this._onStartCallbackFired = false;
	this._onUpdateCallback = null;
	this._onCompleteCallback = null;
	this._onStopCallback = null;
	this._group = group || TWEEN;
	this._id = TWEEN.nextId();

};

TWEEN.Tween.prototype = {
	getId: function getId() {
		return this._id;
	},

	isPlaying: function isPlaying() {
		return this._isPlaying;
	},

	to: function to(properties, duration) {

		this._valuesEnd = properties;

		if (duration !== undefined) {
			this._duration = duration;
		}

		return this;

	},

	start: function start(time) {

		this._group.add(this);

		this._isPlaying = true;

		this._onStartCallbackFired = false;

		this._startTime = time !== undefined ? typeof time === 'string' ? TWEEN.now() + parseFloat(time) : time : TWEEN.now();
		this._startTime += this._delayTime;

		for (var property in this._valuesEnd) {

			// Check if an Array was provided as property value
			if (this._valuesEnd[property] instanceof Array) {

				if (this._valuesEnd[property].length === 0) {
					continue;
				}

				// Create a local copy of the Array with the start value at the front
				this._valuesEnd[property] = [this._object[property]].concat(this._valuesEnd[property]);

			}

			// If `to()` specifies a property that doesn't exist in the source object,
			// we should not set that property in the object
			if (this._object[property] === undefined) {
				continue;
			}

			// Save the starting value.
			this._valuesStart[property] = this._object[property];

			if ((this._valuesStart[property] instanceof Array) === false) {
				this._valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
			}

			this._valuesStartRepeat[property] = this._valuesStart[property] || 0;

		}

		return this;

	},

	stop: function stop() {

		if (!this._isPlaying) {
			return this;
		}

		this._group.remove(this);
		this._isPlaying = false;

		if (this._onStopCallback !== null) {
			this._onStopCallback(this._object);
		}

		this.stopChainedTweens();
		return this;

	},

	end: function end() {

		this.update(this._startTime + this._duration);
		return this;

	},

	stopChainedTweens: function stopChainedTweens() {

		for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
			this._chainedTweens[i].stop();
		}

	},

	group: function group(group) {
		this._group = group;
		return this;
	},

	delay: function delay(amount) {

		this._delayTime = amount;
		return this;

	},

	repeat: function repeat(times) {

		this._repeat = times;
		return this;

	},

	repeatDelay: function repeatDelay(amount) {

		this._repeatDelayTime = amount;
		return this;

	},

	yoyo: function yoyo(yy) {

		this._yoyo = yy;
		return this;

	},

	easing: function easing(eas) {

		this._easingFunction = eas;
		return this;

	},

	interpolation: function interpolation(inter) {

		this._interpolationFunction = inter;
		return this;

	},

	chain: function chain() {

		this._chainedTweens = arguments;
		return this;

	},

	onStart: function onStart(callback) {

		this._onStartCallback = callback;
		return this;

	},

	onUpdate: function onUpdate(callback) {

		this._onUpdateCallback = callback;
		return this;

	},

	onComplete: function onComplete(callback) {

		this._onCompleteCallback = callback;
		return this;

	},

	onStop: function onStop(callback) {

		this._onStopCallback = callback;
		return this;

	},

	update: function update(time) {

		var property;
		var elapsed;
		var value;

		if (time < this._startTime) {
			return true;
		}

		if (this._onStartCallbackFired === false) {

			if (this._onStartCallback !== null) {
				this._onStartCallback(this._object);
			}

			this._onStartCallbackFired = true;
		}

		elapsed = (time - this._startTime) / this._duration;
		elapsed = (this._duration === 0 || elapsed > 1) ? 1 : elapsed;

		value = this._easingFunction(elapsed);

		for (property in this._valuesEnd) {

			// Don't update properties that do not exist in the source object
			if (this._valuesStart[property] === undefined) {
				continue;
			}

			var start = this._valuesStart[property] || 0;
			var end = this._valuesEnd[property];

			if (end instanceof Array) {

				this._object[property] = this._interpolationFunction(end, value);

			} else {

				// Parses relative end values with start as base (e.g.: +10, -3)
				if (typeof (end) === 'string') {

					if (end.charAt(0) === '+' || end.charAt(0) === '-') {
						end = start + parseFloat(end);
					} else {
						end = parseFloat(end);
					}
				}

				// Protect against non numeric properties.
				if (typeof (end) === 'number') {
					this._object[property] = start + (end - start) * value;
				}

			}

		}

		if (this._onUpdateCallback !== null) {
			this._onUpdateCallback(this._object);
		}

		if (elapsed === 1) {

			if (this._repeat > 0) {

				if (isFinite(this._repeat)) {
					this._repeat--;
				}

				// Reassign starting values, restart by making startTime = now
				for (property in this._valuesStartRepeat) {

					if (typeof (this._valuesEnd[property]) === 'string') {
						this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
					}

					if (this._yoyo) {
						var tmp = this._valuesStartRepeat[property];

						this._valuesStartRepeat[property] = this._valuesEnd[property];
						this._valuesEnd[property] = tmp;
					}

					this._valuesStart[property] = this._valuesStartRepeat[property];

				}

				if (this._yoyo) {
					this._reversed = !this._reversed;
				}

				if (this._repeatDelayTime !== undefined) {
					this._startTime = time + this._repeatDelayTime;
				} else {
					this._startTime = time + this._delayTime;
				}

				return true;

			} else {

				if (this._onCompleteCallback !== null) {

					this._onCompleteCallback(this._object);
				}

				for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
					// Make the chained tweens start exactly at the time they should,
					// even if the `update()` method was called way past the duration of the tween
					this._chainedTweens[i].start(this._startTime + this._duration);
				}

				return false;

			}

		}

		return true;

	}
};


TWEEN.Easing = {

	Linear: {

		None: function (k) {

			return k;

		}

	},

	Quadratic: {

		In: function (k) {

			return k * k;

		},

		Out: function (k) {

			return k * (2 - k);

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k;
			}

			return - 0.5 * (--k * (k - 2) - 1);

		}

	},

	Cubic: {

		In: function (k) {

			return k * k * k;

		},

		Out: function (k) {

			return --k * k * k + 1;

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k;
			}

			return 0.5 * ((k -= 2) * k * k + 2);

		}

	},

	Quartic: {

		In: function (k) {

			return k * k * k * k;

		},

		Out: function (k) {

			return 1 - (--k * k * k * k);

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k;
			}

			return - 0.5 * ((k -= 2) * k * k * k - 2);

		}

	},

	Quintic: {

		In: function (k) {

			return k * k * k * k * k;

		},

		Out: function (k) {

			return --k * k * k * k * k + 1;

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k * k;
			}

			return 0.5 * ((k -= 2) * k * k * k * k + 2);

		}

	},

	Sinusoidal: {

		In: function (k) {

			return 1 - Math.cos(k * Math.PI / 2);

		},

		Out: function (k) {

			return Math.sin(k * Math.PI / 2);

		},

		InOut: function (k) {

			return 0.5 * (1 - Math.cos(Math.PI * k));

		}

	},

	Exponential: {

		In: function (k) {

			return k === 0 ? 0 : Math.pow(1024, k - 1);

		},

		Out: function (k) {

			return k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);

		},

		InOut: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			if ((k *= 2) < 1) {
				return 0.5 * Math.pow(1024, k - 1);
			}

			return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);

		}

	},

	Circular: {

		In: function (k) {

			return 1 - Math.sqrt(1 - k * k);

		},

		Out: function (k) {

			return Math.sqrt(1 - (--k * k));

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return - 0.5 * (Math.sqrt(1 - k * k) - 1);
			}

			return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);

		}

	},

	Elastic: {

		In: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);

		},

		Out: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;

		},

		InOut: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			k *= 2;

			if (k < 1) {
				return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
			}

			return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;

		}

	},

	Back: {

		In: function (k) {

			var s = 1.70158;

			return k * k * ((s + 1) * k - s);

		},

		Out: function (k) {

			var s = 1.70158;

			return --k * k * ((s + 1) * k + s) + 1;

		},

		InOut: function (k) {

			var s = 1.70158 * 1.525;

			if ((k *= 2) < 1) {
				return 0.5 * (k * k * ((s + 1) * k - s));
			}

			return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);

		}

	},

	Bounce: {

		In: function (k) {

			return 1 - TWEEN.Easing.Bounce.Out(1 - k);

		},

		Out: function (k) {

			if (k < (1 / 2.75)) {
				return 7.5625 * k * k;
			} else if (k < (2 / 2.75)) {
				return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
			} else if (k < (2.5 / 2.75)) {
				return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
			} else {
				return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
			}

		},

		InOut: function (k) {

			if (k < 0.5) {
				return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
			}

			return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;

		}

	}

};

TWEEN.Interpolation = {

	Linear: function (v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TWEEN.Interpolation.Utils.Linear;

		if (k < 0) {
			return fn(v[0], v[1], f);
		}

		if (k > 1) {
			return fn(v[m], v[m - 1], m - f);
		}

		return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);

	},

	Bezier: function (v, k) {

		var b = 0;
		var n = v.length - 1;
		var pw = Math.pow;
		var bn = TWEEN.Interpolation.Utils.Bernstein;

		for (var i = 0; i <= n; i++) {
			b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
		}

		return b;

	},

	CatmullRom: function (v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TWEEN.Interpolation.Utils.CatmullRom;

		if (v[0] === v[m]) {

			if (k < 0) {
				i = Math.floor(f = m * (1 + k));
			}

			return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);

		} else {

			if (k < 0) {
				return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
			}

			if (k > 1) {
				return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
			}

			return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);

		}

	},

	Utils: {

		Linear: function (p0, p1, t) {

			return (p1 - p0) * t + p0;

		},

		Bernstein: function (n, i) {

			var fc = TWEEN.Interpolation.Utils.Factorial;

			return fc(n) / fc(i) / fc(n - i);

		},

		Factorial: (function () {

			var a = [1];

			return function (n) {

				var s = 1;

				if (a[n]) {
					return a[n];
				}

				for (var i = n; i > 1; i--) {
					s *= i;
				}

				a[n] = s;
				return s;

			};

		})(),

		CatmullRom: function (p0, p1, p2, p3, t) {

			var v0 = (p2 - p0) * 0.5;
			var v1 = (p3 - p1) * 0.5;
			var t2 = t * t;
			var t3 = t * t2;

			return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

		}

	}

};

// UMD (Universal Module Definition)
(function (root) {

	if (true) {

		// AMD
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return TWEEN;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	} else if (typeof module !== 'undefined' && typeof exports === 'object') {

		// Node.js
		module.exports = TWEEN;

	} else if (root !== undefined) {

		// Global variable
		root.TWEEN = TWEEN;

	}

})(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_olympus_r_core_Core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_olympus_r_engine_module_ModuleMessage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_olympus_r_engine_scene_SceneMessage__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_olympus_r_engine_env_Environment__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_olympus_r_utils_URLUtil__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__egret_RenderMode__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__egret_AssetsLoader__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__egret_panel_BackPanelPolicy__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__egret_scene_FadeScenePolicy__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__egret_mask_MaskEntity__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__egret_utils_UIUtil__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__egret_command_UpdateScreenSizeCommand__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__egret_utils_SkinUtil__ = __webpack_require__(95);
/// <amd-module name="EgretBridge"/>













/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-18
 * @modify date 2017-09-18
 *
 * Egret的表现层桥实现，当前Egret版本：5.0.7
*/
var EgretBridge = /** @class */ (function () {
    function EgretBridge(params) {
        /**
         * 默认弹窗策略
         *
         * @type {IPanelPolicy}
         * @memberof EgretBridge
         */
        this.defaultPanelPolicy = new __WEBPACK_IMPORTED_MODULE_7__egret_panel_BackPanelPolicy__["a" /* default */]();
        /**
         * 默认场景切换策略
         *
         * @type {IScenePolicy}
         * @memberof EgretBridge
         */
        this.defaultScenePolicy = new __WEBPACK_IMPORTED_MODULE_8__egret_scene_FadeScenePolicy__["a" /* default */]();
        this._initParams = params;
    }
    Object.defineProperty(EgretBridge.prototype, "type", {
        /**
         * 获取表现层类型名称
         *
         * @readonly
         * @type {string}
         * @memberof EgretBridge
         */
        get: function () {
            return EgretBridge.TYPE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EgretBridge.prototype, "htmlWrapper", {
        /**
         * 获取表现层HTML包装器，可以对其样式进行自定义调整
         *
         * @readonly
         * @type {HTMLElement}
         * @memberof EgretBridge
         */
        get: function () {
            return this._initParams.container;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EgretBridge.prototype, "root", {
        /**
         * 获取根显示节点
         *
         * @readonly
         * @type {egret.DisplayObjectContainer}
         * @memberof EgretBridge
         */
        get: function () {
            return this._root;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EgretBridge.prototype, "stage", {
        /**
         * 获取舞台引用
         *
         * @readonly
         * @type {egret.Stage}
         * @memberof EgretBridge
         */
        get: function () {
            return this._stage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EgretBridge.prototype, "bgLayer", {
        /**
         * 获取背景容器
         *
         * @readonly
         * @type {egret.DisplayObjectContainer}
         * @memberof EgretBridge
         */
        get: function () {
            return this._bgLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EgretBridge.prototype, "sceneLayer", {
        /**
         * 获取场景容器
         *
         * @readonly
         * @type {egret.DisplayObjectContainer}
         * @memberof EgretBridge
         */
        get: function () {
            return this._sceneLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EgretBridge.prototype, "frameLayer", {
        /**
         * 获取框架容器
         *
         * @readonly
         * @type {egret.DisplayObjectContainer}
         * @memberof EgretBridge
         */
        get: function () {
            return this._frameLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EgretBridge.prototype, "panelLayer", {
        /**
         * 获取弹窗容器
         *
         * @readonly
         * @type {egret.DisplayObjectContainer}
         * @memberof EgretBridge
         */
        get: function () {
            return this._panelLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EgretBridge.prototype, "maskLayer", {
        /**
         * 获取遮罩容器
         *
         * @readonly
         * @type {egret.DisplayObjectContainer}
         * @memberof EgretBridge
         */
        get: function () {
            return this._maskLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EgretBridge.prototype, "topLayer", {
        /**
         * 获取顶级容器
         *
         * @readonly
         * @type {egret.DisplayObjectContainer}
         * @memberof EgretBridge
         */
        get: function () {
            return this._topLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EgretBridge.prototype, "promptClass", {
        /**
         * 获取通用提示框
         *
         * @readonly
         * @type {IPromptPanelConstructor}
         * @memberof EgretBridge
         */
        get: function () {
            return this._initParams.promptClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EgretBridge.prototype, "maskEntity", {
        /**
         * 获取遮罩实体
         *
         * @readonly
         * @type {IMaskEntity}
         * @memberof EgretBridge
         */
        get: function () {
            return new __WEBPACK_IMPORTED_MODULE_9__egret_mask_MaskEntity__["a" /* default */](this._initParams.maskData);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化表现层桥
     * @param {()=>void} complete 初始化完毕后的回调
     * @memberof EgretBridge
     */
    EgretBridge.prototype.init = function (complete) {
        // 生成html和body的样式节点
        var style = document.createElement("style");
        style.textContent = "\n            html, body {\n                -ms-touch-action: none;\n                background: " + egret.toColorString(this._initParams.backgroundColor || 0) + ";\n                padding: 0;\n                border: 0;\n                margin: 0;\n                height: 100%;\n            }\n        ";
        document.head.appendChild(style);
        // 统一容器
        if (typeof this._initParams.container == "string") {
            this._initParams.container = document.querySelector(this._initParams.container);
        }
        if (!this._initParams.container) {
            this._initParams.container = document.createElement("div");
            document.body.appendChild(this._initParams.container);
        }
        var container = this._initParams.container;
        // 构建容器参数
        container.style.margin = "auto";
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.position = "fixed";
        container.style.top = "0%";
        container.style.left = "0%";
        container.className = "egret-player";
        container.setAttribute("data-entry-class", "__EgretRoot__");
        container.setAttribute("data-orientation", "auto");
        container.setAttribute("data-scale-mode", this._initParams.scaleMode || egret.StageScaleMode.FIXED_NARROW);
        container.setAttribute("data-frame-rate", (this._initParams.frameRate || 60) + "");
        container.setAttribute("data-content-width", this._initParams.width + "");
        container.setAttribute("data-content-height", this._initParams.height + "");
        container.setAttribute("data-show-paint-rect", (this._initParams.showPaintRect || false) + "");
        container.setAttribute("data-multi-fingered", (this._initParams.multiFingered || 2) + "");
        container.setAttribute("data-show-fps", (this._initParams.showFPS || false) + "");
        container.setAttribute("data-show-fps-style", this._initParams.showFPSStyle || "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9");
        container.setAttribute("data-show-log", (this._initParams.showLog || false) + "");
        // 构建__EgretRoot__类，使得Egret引擎可以通过window寻址的方式找到该类，同时又可以让其将控制权转交给Application
        var self = this;
        window["__EgretRoot__"] = function () {
            eui.UILayer.call(this);
            this.touchEnabled = false;
        };
        window["__EgretRoot__"].prototype = new eui.UILayer();
        window["__EgretRoot__"].prototype.$onAddToStage = function (stage, nestLevel) {
            // 调用父类方法
            eui.UILayer.prototype.$onAddToStage.call(this, stage, nestLevel);
            // 移除引用
            delete window["__EgretRoot__"];
            // 将控制权移交给Application对象
            onRootInitialized(this);
        };
        // 根据渲染模式初始化Egret引擎
        switch (this._initParams.renderMode) {
            case __WEBPACK_IMPORTED_MODULE_5__egret_RenderMode__["a" /* default */].WEBGL:
                initEgret("webgl");
                break;
            case __WEBPACK_IMPORTED_MODULE_5__egret_RenderMode__["a" /* default */].CANVAS:
            default:
                initEgret("canvas");
                break;
        }
        function initEgret(renderMode) {
            if (window["eui"]) {
                // 篡改eui.DataGroup.commitProperties和getVirtualElementAt方法，为renderer添加一个标签以修复列表首项渲染多次的bug
                var oriCommitProperties = eui.DataGroup.prototype["commitProperties"];
                eui.DataGroup.prototype["commitProperties"] = function () {
                    this.__egret_datagroup_state__ = 1;
                    var result = oriCommitProperties.apply(this, arguments);
                    return result;
                };
                var oriGetVirtualElementAt = eui.DataGroup.prototype["getVirtualElementAt"];
                eui.DataGroup.prototype["getVirtualElementAt"] = function () {
                    this.__egret_datagroup_state__ = 2;
                    var result = oriGetVirtualElementAt.apply(this, arguments);
                    return result;
                };
                // 篡改eui.registerBindable方法，把__bindables__赋值变为不可遍历的属性
                var oriRegisterBindable = eui.registerBindable;
                eui.registerBindable = function (instance, property) {
                    var result = oriRegisterBindable.call(this, instance, property);
                    // 改变可遍历性
                    var desc = Object.getOwnPropertyDescriptor(instance, "__bindables__");
                    if (desc && desc.enumerable) {
                        desc.enumerable = false;
                        Object.defineProperty(instance, "__bindables__", desc);
                    }
                    // 返回结果
                    return result;
                };
                // 篡改Watcher.checkBindable方法，把__listeners__赋值变为不可遍历
                var oriCheckBindable = eui.Watcher["checkBindable"];
                eui.Watcher["checkBindable"] = function (host, property) {
                    var result = oriCheckBindable.call(this, host, property);
                    // 改变可遍历性
                    var desc = Object.getOwnPropertyDescriptor(host, "__listeners__");
                    if (desc && desc.enumerable) {
                        desc.enumerable = false;
                        Object.defineProperty(host, "__listeners__", desc);
                    }
                };
            }
            // 启动Egret引擎
            egret.runEgret({
                renderMode: renderMode,
                audioType: 0
            });
        }
        function onRootInitialized(root) {
            self._root = root;
            self._stage = root.stage;
            // 创建背景显示层
            self._bgLayer = new eui.UILayer();
            self._bgLayer.touchEnabled = false;
            root.addChild(self._bgLayer);
            // 创建场景显示层
            self._sceneLayer = new eui.UILayer();
            self._sceneLayer.touchEnabled = false;
            root.addChild(self._sceneLayer);
            // 创建框架显示层
            self._frameLayer = new eui.UILayer();
            self._frameLayer.touchEnabled = false;
            root.addChild(self._frameLayer);
            // 创建弹出层
            self._panelLayer = new eui.UILayer();
            self._panelLayer.touchEnabled = false;
            root.addChild(self._panelLayer);
            // 创建遮罩层
            self._maskLayer = new eui.UILayer();
            self._maskLayer.touchEnabled = false;
            root.addChild(self._maskLayer);
            // 创建顶级显示层
            self._topLayer = new eui.UILayer();
            self._topLayer.touchEnabled = false;
            root.addChild(self._topLayer);
            // 插入更新屏幕命令
            __WEBPACK_IMPORTED_MODULE_0_olympus_r_core_Core__["a" /* core */].mapCommand(__WEBPACK_IMPORTED_MODULE_2_olympus_r_engine_scene_SceneMessage__["a" /* default */].SCENE_BEFORE_CHANGE, __WEBPACK_IMPORTED_MODULE_11__egret_command_UpdateScreenSizeCommand__["a" /* default */]);
            // 设置资源和主题适配器
            egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
            egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter(self._initParams));
            // 加载资源配置
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, onConfigComplete, self);
            var url = Object(__WEBPACK_IMPORTED_MODULE_4_olympus_r_utils_URLUtil__["f" /* wrapAbsolutePath */])(self._initParams.pathPrefix + "resource/default.res.json", __WEBPACK_IMPORTED_MODULE_3_olympus_r_engine_env_Environment__["environment"].curCDNHost);
            RES.loadConfig(url, self._initParams.pathPrefix + "resource/");
        }
        function onConfigComplete(evt) {
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, onConfigComplete, self);
            // 加载主题配置
            var url = Object(__WEBPACK_IMPORTED_MODULE_4_olympus_r_utils_URLUtil__["f" /* wrapAbsolutePath */])(this._initParams.pathPrefix + "resource/default.thm.json", __WEBPACK_IMPORTED_MODULE_3_olympus_r_engine_env_Environment__["environment"].curCDNHost);
            var theme = new eui.Theme(url, self._root.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, onThemeLoadComplete, self);
        }
        function onThemeLoadComplete(evt) {
            evt.target.removeEventListener(eui.UIEvent.COMPLETE, onThemeLoadComplete, self);
            // 加载预加载资源组
            var preloadGroups = this._initParams.preloadGroups;
            self.loadAssets(preloadGroups, null, function (err) { return complete(self); });
        }
    };
    /**
     * 判断皮肤是否是Egret显示对象
     *
     * @param {*} skin 皮肤对象
     * @returns {boolean} 是否是Egret显示对象
     * @memberof EgretBridge
     */
    EgretBridge.prototype.isMySkin = function (skin) {
        if (skin instanceof egret.DisplayObject)
            return true;
        if (skin instanceof Function)
            return (skin.prototype instanceof egret.DisplayObject);
        if (typeof skin === "string")
            return (egret.getDefinitionByName(skin) != null);
    };
    /**
     * 包装HTMLElement节点
     *
     * @param {IMediator} mediator 中介者
     * @param {*} skin 原始皮肤
     * @returns {egret.DisplayObject} 包装后的皮肤
     * @memberof EgretBridge
     */
    EgretBridge.prototype.wrapSkin = function (mediator, skin) {
        return Object(__WEBPACK_IMPORTED_MODULE_12__egret_utils_SkinUtil__["a" /* wrapSkin */])(mediator, skin);
    };
    /**
     * 替换皮肤，用于组件变身时不同表现层桥的处理
     *
     * @param {IMediator} mediator 中介者
     * @param {*} current 当前皮肤
     * @param {*} target 要替换的皮肤
     * @returns {*} 替换完毕的皮肤
     * @memberof EgretBridge
     */
    EgretBridge.prototype.replaceSkin = function (mediator, current, target) {
        // Egret皮肤需要判断类型，进行不同处理
        if (current instanceof eui.Component) {
            if (target instanceof eui.Component) {
                // 两边都是eui组件，直接将右手皮肤赋值给左手
                current.skinName = target.skin;
            }
            else if (target instanceof egret.DisplayObject) {
                // 右手是普通显示对象，移除左手皮肤，添加右手显示到其中
                current.skinName = null;
                current.addChild(target);
            }
            else {
                // 其他情况都认为右手是皮肤数据
                current.skinName = target;
            }
            // 返回左手
            return current;
        }
        else {
            if (!(target instanceof egret.DisplayObject)) {
                // 右手不是显示对象，认为是皮肤数据，生成一个eui.Component包裹它
                var temp = new eui.Component();
                temp.skinName = target;
                target = temp;
            }
            // 右手替换左手位置
            var parent = current.parent;
            parent.addChildAt(target, parent.getChildIndex(current));
            parent.removeChild(current);
            // 返回右手
            return target;
        }
    };
    /**
     * 同步皮肤，用于组件变身后的重新定位
     *
     * @param {egret.DisplayObject} current 当前皮肤
     * @param {egret.DisplayObject} target 替换的皮肤
     * @memberof EgretBridge
     */
    EgretBridge.prototype.syncSkin = function (current, target) {
        if (!current || !target)
            return;
        // 设置属性
        // 下面是egret级别属性
        var props = [
            "matrix", "anchorOffsetX", "anchorOffsetY", "alpha", "visible"
        ];
        // 如果当前宽高不为0则同样设置宽高
        if (current.width > 0)
            props.push("width");
        if (current.height > 0)
            props.push("height");
        // 下面是eui级别属性
        if (current instanceof eui.Component && target instanceof eui.Component) {
            props.push.apply(props, [
                "horizontalCenter", "verticalCenter", "left", "right", "top", "bottom"
            ]);
        }
        // 全部赋值
        for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
            var prop = props_1[_i];
            target[prop] = current[prop];
        }
    };
    /**
     * 创建一个空的显示对象
     *
     * @returns {egret.Sprite}
     * @memberof EgretBridge
     */
    EgretBridge.prototype.createEmptyDisplay = function () {
        return new egret.Sprite();
    };
    /**
     * 添加显示
     *
     * @param {egret.DisplayObjectContainer} parent 要添加到的父容器
     * @param {egret.DisplayObject} target 被添加的显示对象
     * @return {egret.DisplayObject} 返回被添加的显示对象
     * @memberof EgretBridge
     */
    EgretBridge.prototype.addChild = function (parent, target) {
        if (parent && target)
            return parent.addChild(target);
        else
            return target;
    };
    /**
     * 按索引添加显示
     *
     * @param {egret.DisplayObjectContainer} parent 要添加到的父容器
     * @param {egret.DisplayObject} target 被添加的显示对象
     * @param {number} index 要添加到的父级索引
     * @return {egret.DisplayObject} 返回被添加的显示对象
     * @memberof EgretBridge
     */
    EgretBridge.prototype.addChildAt = function (parent, target, index) {
        if (parent && target)
            return parent.addChildAt(target, index);
        else
            return target;
    };
    /**
     * 移除显示对象
     *
     * @param {egret.DisplayObjectContainer} parent 父容器
     * @param {egret.DisplayObject} target 被移除的显示对象
     * @return {egret.DisplayObject} 返回被移除的显示对象
     * @memberof EgretBridge
     */
    EgretBridge.prototype.removeChild = function (parent, target) {
        if (parent && target && target.parent === parent)
            return parent.removeChild(target);
        else
            return target;
    };
    /**
     * 按索引移除显示
     *
     * @param {egret.DisplayObjectContainer} parent 父容器
     * @param {number} index 索引
     * @return {egret.DisplayObject} 返回被移除的显示对象
     * @memberof EgretBridge
     */
    EgretBridge.prototype.removeChildAt = function (parent, index) {
        if (parent && index >= 0)
            return parent.removeChildAt(index);
        else
            return null;
    };
    /**
     * 移除所有显示对象
     *
     * @param {egret.DisplayObjectContainer} parent 父容器
     * @memberof EgretBridge
     */
    EgretBridge.prototype.removeChildren = function (parent) {
        if (parent)
            parent.removeChildren();
    };
    /**
     * 获取父容器
     *
     * @param {egret.DisplayObject} target 目标对象
     * @returns {egret.DisplayObjectContainer} 父容器
     * @memberof EgretBridge
     */
    EgretBridge.prototype.getParent = function (target) {
        return target.parent;
    };
    /**
     * 获取指定索引处的显示对象
     *
     * @param {egret.DisplayObjectContainer} parent 父容器
     * @param {number} index 指定父级索引
     * @return {egret.DisplayObject} 索引处的显示对象
     * @memberof EgretBridge
     */
    EgretBridge.prototype.getChildAt = function (parent, index) {
        return parent.getChildAt(index);
    };
    /**
     * 获取显示索引
     *
     * @param {egret.DisplayObjectContainer} parent 父容器
     * @param {egret.DisplayObject} target 子显示对象
     * @return {number} target在parent中的索引
     * @memberof EgretBridge
     */
    EgretBridge.prototype.getChildIndex = function (parent, target) {
        return parent.getChildIndex(target);
    };
    /**
     * 通过名称获取显示对象
     *
     * @param {egret.DisplayObjectContainer} parent 父容器
     * @param {string} name 对象名称
     * @return {egret.DisplayObject} 显示对象
     * @memberof EgretBridge
     */
    EgretBridge.prototype.getChildByName = function (parent, name) {
        return parent.getChildByName(name);
    };
    /**
     * 获取子显示对象数量
     *
     * @param {egret.DisplayObjectContainer} parent 父容器
     * @return {number} 子显示对象数量
     * @memberof EgretBridge
     */
    EgretBridge.prototype.getChildCount = function (parent) {
        return parent.numChildren;
    };
    /**
     * 加载资源
     *
     * @param {string[]} assets 资源数组
     * @param {IMediator} mediator 资源列表
     * @param {(err?:Error)=>void} handler 回调函数
     * @memberof EgretBridge
     */
    EgretBridge.prototype.loadAssets = function (assets, mediator, handler) {
        var loader = new __WEBPACK_IMPORTED_MODULE_6__egret_AssetsLoader__["a" /* default */]({
            oneError: function (evt) {
                // 调用回调
                handler(new Error("资源加载失败"));
                // 派发加载错误事件
                __WEBPACK_IMPORTED_MODULE_0_olympus_r_core_Core__["a" /* core */].dispatch(__WEBPACK_IMPORTED_MODULE_1_olympus_r_engine_module_ModuleMessage__["default"].MODULE_LOAD_ASSETS_ERROR, evt);
            },
            complete: function (dict) {
                // 调用回调
                handler();
            }
        });
        loader.loadGroups(assets);
    };
    /**
     * 监听事件，从这个方法监听的事件会在中介者销毁时被自动移除监听
     *
     * @param {egret.EventDispatcher} target 事件目标对象
     * @param {string} type 事件类型
     * @param {Function} handler 事件处理函数
     * @param {*} [thisArg] this指向对象
     * @memberof EgretBridge
     */
    EgretBridge.prototype.mapListener = function (target, type, handler, thisArg) {
        target.addEventListener(type, handler, thisArg);
    };
    /**
     * 注销监听事件
     *
     * @param {egret.EventDispatcher} target 事件目标对象
     * @param {string} type 事件类型
     * @param {Function} handler 事件处理函数
     * @param {*} [thisArg] this指向对象
     * @memberof EgretBridge
     */
    EgretBridge.prototype.unmapListener = function (target, type, handler, thisArg) {
        target.removeEventListener(type, handler, thisArg);
    };
    /**
     * 为绑定的列表显示对象包装一个渲染器创建回调
     *
     * @param {eui.DataGroup} target BindFor指令指向的显示对象
     * @param {(key?:any, value?:any, renderer?:eui.IItemRenderer)=>void} rendererHandler 渲染器创建回调
     * @returns {*} 返回一个备忘录对象，会在赋值时提供
     * @memberof IBridge
     */
    EgretBridge.prototype.wrapBindFor = function (target, rendererHandler) {
        var memento = {};
        Object(__WEBPACK_IMPORTED_MODULE_10__egret_utils_UIUtil__["a" /* wrapEUIList */])(target, function (data, renderer) {
            // 取出key
            var key;
            var datas = memento.datas;
            // 遍历memento的datas属性（在valuateBindFor时被赋值）
            if (datas instanceof Array) {
                key = renderer.itemIndex;
            }
            else {
                for (var i in datas) {
                    if (datas[i] === data) {
                        // 这就是我们要找的key
                        key = i;
                        break;
                    }
                }
            }
            // 调用回调
            if (key != null) {
                if (memento.syncDict) {
                    if (!memento.syncDict[key]) {
                        if (target["__egret_datagroup_state__"] === 1 || target["__egret_datagroup_state__"] === 2) {
                            memento.syncDict[key] = data;
                            rendererHandler(key, data, renderer);
                        }
                    }
                }
                else {
                    rendererHandler(key, data, renderer);
                }
            }
        });
        return memento;
    };
    /**
     * 为列表显示对象赋值
     *
     * @param {eui.DataGroup} target BindFor指令指向的显示对象
     * @param {*} datas 数据集合
     * @param {*} memento wrapBindFor返回的备忘录对象
     * @memberof IBridge
     */
    EgretBridge.prototype.valuateBindFor = function (target, datas, memento) {
        var provider;
        // 初始化列表状态
        target["__egret_datagroup_state__"] = 0;
        // 设置memento
        memento.datas = datas;
        memento.syncDict = {};
        setTimeout(function () {
            // 一次渲染后解锁
            delete memento.syncDict;
        }, 0);
        // 复制datas
        if (datas instanceof Array) {
            provider = new eui.ArrayCollection(datas);
        }
        else {
            // 是字典，将其变为数组
            var list = [];
            for (var key in datas) {
                list.push(datas[key]);
            }
            provider = new eui.ArrayCollection(list);
        }
        // 赋值
        target.dataProvider = provider;
    };
    /** 提供静态类型常量 */
    EgretBridge.TYPE = "Egret";
    return EgretBridge;
}());
/* harmony default export */ __webpack_exports__["default"] = (EgretBridge);
var AssetAdapter = /** @class */ (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data)
                onGetRes(data);
            else
                RES.getResAsync(source, onGetRes, this);
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
    };
    return AssetAdapter;
}());
var ThemeAdapter = /** @class */ (function () {
    function ThemeAdapter(initParams) {
        this._initParams = initParams;
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param compFunc 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param errorFunc 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, compFunc, errorFunc, thisObject) {
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onError, null);
        RES.getResByUrl(url, onGetRes, this, RES.ResourceItem.TYPE_TEXT);
        function onGetRes(e) {
            try {
                // 需要为所有主题资源添加路径前缀
                var data = JSON.parse(e);
                for (var key in data.skins)
                    data.skins[key] = this._initParams.pathPrefix + data.skins[key];
                for (var key in data.exmls) {
                    // 如果只是URL则直接添加前缀，否则是内容集成方式，需要单独修改path属性
                    var exml = data.exmls[key];
                    if (typeof exml == "string")
                        data.exmls[key] = this._initParams.pathPrefix + exml;
                    else
                        exml.path = this._initParams.pathPrefix + exml.path;
                }
                e = JSON.stringify(data);
            }
            catch (err) { }
            compFunc.call(thisObject, e);
        }
        function onError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onError, null);
                errorFunc.call(thisObject);
            }
        }
    };
    return ThemeAdapter;
}());


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__message_CommonMessage__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__message_CoreMessage__ = __webpack_require__(31);


/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-10-31
 * @modify date 2017-10-31
 *
 * 可观察接口的默认实现对象，会将收到的消息通知给注册的回调
*/
var Observable = /** @class */ (function () {
    function Observable(parent) {
        this._listenerDict = {};
        this._commandDict = {};
        this._disposed = false;
        this.parent = parent && parent.observable;
    }
    Object.defineProperty(Observable.prototype, "observable", {
        /**
         * 获取到IObservable实体，若本身就是IObservable实体则返回本身
         *
         * @type {IObservable}
         * @memberof Observable
         */
        get: function () {
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Observable.prototype.handleMessages = function (msg) {
        var listeners1 = this._listenerDict[msg.__type];
        var listeners2 = this._listenerDict[msg.constructor.toString()];
        var listeners = (listeners1 && listeners2 ? listeners1.concat(listeners2) : listeners1 || listeners2);
        if (listeners) {
            listeners = listeners.concat();
            for (var _i = 0, listeners_1 = listeners; _i < listeners_1.length; _i++) {
                var temp = listeners_1[_i];
                // 调用处理函数
                if (msg instanceof __WEBPACK_IMPORTED_MODULE_0__message_CommonMessage__["a" /* default */])
                    // 如果是通用消息，则将参数结构后调用回调
                    (_a = temp.handler).call.apply(_a, [temp.thisArg].concat(msg.params));
                else
                    // 如果是其他消息，则直接将消息体传给回调
                    temp.handler.call(temp.thisArg, msg);
                // 如果是一次性监听则移除之
                if (temp.once) {
                    this.unlisten(msg.__type, temp.handler, temp.thisArg, temp.once);
                    this.unlisten(msg.constructor.toString(), temp.handler, temp.thisArg, temp.once);
                }
            }
        }
        var _a;
    };
    Observable.prototype.doDispatch = function (msg) {
        // 记录流转内核
        msg.__observables.push(this);
        // 触发命令
        this.handleCommands(msg);
        // 触发用listen形式监听的消息
        this.handleMessages(msg);
    };
    /** dispatch方法实现 */
    Observable.prototype.dispatch = function (typeOrMsg) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        // 销毁判断
        if (this._disposed)
            return;
        // 统一消息对象
        var msg = typeOrMsg;
        if (typeof typeOrMsg == "string") {
            msg = new __WEBPACK_IMPORTED_MODULE_0__message_CommonMessage__["a" /* default */](typeOrMsg);
            msg.params = params;
        }
        // 派发消息
        this.doDispatch(msg);
        // 额外派发一个通用事件
        this.doDispatch(new __WEBPACK_IMPORTED_MODULE_0__message_CommonMessage__["a" /* default */](__WEBPACK_IMPORTED_MODULE_1__message_CoreMessage__["a" /* default */].MESSAGE_DISPATCHED, msg));
        // 将事件转发到上一层
        this.parent && this.parent.dispatch(msg);
    };
    /**
     * 监听内核消息
     *
     * @param {string} type 消息类型
     * @param {Function} handler 消息处理函数
     * @param {*} [thisArg] 消息this指向
     * @param {boolean} [once=false] 是否一次性监听
     * @memberof Observable
     */
    Observable.prototype.listen = function (type, handler, thisArg, once) {
        if (once === void 0) { once = false; }
        // 销毁判断
        if (this._disposed)
            return;
        type = (typeof type == "string" ? type : type.toString());
        var listeners = this._listenerDict[type];
        if (!listeners)
            this._listenerDict[type] = listeners = [];
        // 检查存在性
        for (var i = 0, len = listeners.length; i < len; i++) {
            var temp = listeners[i];
            // 如果已经存在监听则直接返回
            if (temp.handler == handler && temp.thisArg == thisArg)
                return;
        }
        // 添加监听
        listeners.push({ handler: handler, thisArg: thisArg, once: once });
    };
    /**
     * 移除内核消息监听
     *
     * @param {string} type 消息类型
     * @param {Function} handler 消息处理函数
     * @param {*} [thisArg] 消息this指向
     * @param {boolean} [once=false] 是否一次性监听
     * @memberof Observable
     */
    Observable.prototype.unlisten = function (type, handler, thisArg, once) {
        if (once === void 0) { once = false; }
        // 销毁判断
        if (this._disposed)
            return;
        type = (typeof type == "string" ? type : type.toString());
        var listeners = this._listenerDict[type];
        // 检查存在性
        if (listeners) {
            for (var i = 0, len = listeners.length; i < len; i++) {
                var temp = listeners[i];
                // 如果已经存在监听则直接返回
                if (temp.handler == handler && temp.thisArg == thisArg && temp.once == once) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    };
    Observable.prototype.handleCommands = function (msg) {
        var commands = this._commandDict[msg.__type];
        if (commands) {
            commands = commands.concat();
            for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
                var cls = commands_1[_i];
                // 执行命令
                new cls(msg).exec();
            }
        }
    };
    /**
     * 注册命令到特定消息类型上，当这个类型的消息派发到框架内核时会触发Command运行
     *
     * @param {string} type 要注册的消息类型
     * @param {(ICommandConstructor)} cmd 命令处理器，可以是方法形式，也可以使类形式
     * @memberof Observable
     */
    Observable.prototype.mapCommand = function (type, cmd) {
        // 销毁判断
        if (this._disposed)
            return;
        var commands = this._commandDict[type];
        if (!commands)
            this._commandDict[type] = commands = [];
        if (commands.indexOf(cmd) < 0)
            commands.push(cmd);
    };
    /**
     * 注销命令
     *
     * @param {string} type 要注销的消息类型
     * @param {(ICommandConstructor)} cmd 命令处理器
     * @returns {void}
     * @memberof Observable
     */
    Observable.prototype.unmapCommand = function (type, cmd) {
        // 销毁判断
        if (this._disposed)
            return;
        var commands = this._commandDict[type];
        if (!commands)
            return;
        var index = commands.indexOf(cmd);
        if (index < 0)
            return;
        commands.splice(index, 1);
    };
    Object.defineProperty(Observable.prototype, "disposed", {
        /** 是否已经被销毁 */
        get: function () {
            return this._disposed;
        },
        enumerable: true,
        configurable: true
    });
    /** 销毁 */
    Observable.prototype.dispose = function () {
        // 销毁判断
        if (this._disposed)
            return;
        // 移除上一层观察者引用
        this.parent = null;
        // 清空所有消息监听
        this._listenerDict = null;
        // 清空所有命令
        this._commandDict = null;
        // 标记销毁
        this._disposed = true;
    };
    return Observable;
}());
/* harmony default export */ __webpack_exports__["a"] = (Observable);


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-18
 * @modify date 2017-09-18
 *
 * 消息基类
*/
var Message = /** @class */ (function () {
    function Message(type) {
        /**
         * 消息派发内核列表
         *
         * @type {IObservable}
         * @memberof Message
         */
        this.__observables = [];
        this._type = type;
    }
    Object.defineProperty(Message.prototype, "__type", {
        /**
         * 获取消息类型字符串
         *
         * @readonly
         * @type {string}
         * @memberof Message
         */
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "__observable", {
        /**
         * 消息当前所属内核
         *
         * @type {IObservable}
         * @memberof Message
         */
        get: function () {
            return this.__observables[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "__oriObservable", {
        /**
         * 消息所属的原始内核（第一个派发到的内核）
         *
         * @type {IObservable}
         * @memberof Message
         */
        get: function () {
            return this.__observables[this.__observables.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 再次发送消息，会使用首个内核重新发送该消息
     *
     * @memberof Message
     */
    Message.prototype.redispatch = function () {
        this.__oriObservable.dispatch(this);
    };
    return Message;
}());
/* harmony default export */ __webpack_exports__["a"] = (Message);


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-13
 * @modify date 2017-09-13
 *
 * 核心事件类型
*/
var CoreMessage = /** @class */ (function () {
    function CoreMessage() {
    }
    /**
     * 任何消息派发到框架后都会派发这个消息
     *
     * @static
     * @type {string}
     * @memberof CoreMessage
     */
    CoreMessage.MESSAGE_DISPATCHED = "messageDispatched";
    return CoreMessage;
}());
/* harmony default export */ __webpack_exports__["a"] = (CoreMessage);


/***/ }),
/* 32 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(21);

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-06
 * @modify date 2017-11-06
 *
 * 数据更新订阅者，当依赖的数据有更新时会触发callback通知外面
*/
var Watcher = /** @class */ (function () {
    function Watcher(bind, currentTarget, target, exp, callback, thisArg) {
        var scopes = [];
        for (var _i = 6; _i < arguments.length; _i++) {
            scopes[_i - 6] = arguments[_i];
        }
        this._disposed = false;
        // 记录Bind实例
        this._bind = bind;
        // 记录作用目标、表达式和作用域
        this._currentTarget = currentTarget;
        this._target = target;
        this._exp = exp;
        this._thisArg = thisArg;
        this._scopes = scopes;
        // 将表达式和作用域解析为一个Function
        this._expFunc = Object(__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* createEvalFunc */])(exp, 1 + scopes.length);
        // 记录回调函数
        this._callback = callback;
        // 进行首次更新
        this.update();
    }
    Object.defineProperty(Watcher.prototype, "disposed", {
        /**
         * 获取该观察者是否已经被销毁
         *
         * @readonly
         * @type {boolean}
         * @memberof Watcher
         */
        get: function () {
            return this._disposed;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取到表达式当前最新值
     * @returns {any} 最新值
     */
    Watcher.prototype.getValue = function () {
        if (this._disposed)
            return null;
        var value;
        // 记录自身
        Watcher.updating = this;
        // 设置通用属性
        var commonScope = {
            $this: this._bind.mediator,
            $data: this._bind.mediator.viewModel,
            $bridge: this._bind.mediator.bridge,
            $currentTarget: this._currentTarget,
            $target: this._target
        };
        // 表达式求值
        try {
            value = (_a = this._expFunc).call.apply(_a, [this._thisArg].concat(this._scopes, [commonScope]));
        }
        catch (err) {
            // 输出错误日志
            console.warn("表达式求值错误\nerr: " + err.toString() + "\nexp：" + this._exp);
        }
        // 移除自身记录
        Watcher.updating = null;
        return value;
        var _a;
    };
    /**
     * 当依赖的数据有更新时调用该方法
     * @param extra 可能的额外数据
     */
    Watcher.prototype.update = function (extra) {
        if (this._disposed)
            return;
        var value = this.getValue();
        if (!Watcher.isEqual(value, this._value)) {
            this._callback && this._callback(value, this._value, extra);
            this._value = Watcher.deepCopy(value);
        }
    };
    /** 销毁订阅者 */
    Watcher.prototype.dispose = function () {
        if (this._disposed)
            return;
        this._value = null;
        this._target = null;
        this._exp = null;
        this._scopes = null;
        this._expFunc = null;
        this._callback = null;
        this._disposed = true;
    };
    /**
     * 是否相等，包括基础类型和对象/数组的对比
     */
    Watcher.isEqual = function (a, b) {
        return (a == b || (Watcher.isObject(a) && Watcher.isObject(b)
            ? JSON.stringify(a) == JSON.stringify(b)
            : false));
    };
    /**
     * 是否为对象(包括数组、正则等)
     */
    Watcher.isObject = function (obj) {
        return (obj && typeof obj == "object");
    };
    /**
     * 复制对象，若为对象则深度复制
     */
    Watcher.deepCopy = function (from) {
        if (Watcher.isObject(from)) {
            try {
                // 复杂类型对象，先字符串化，再对象化
                return JSON.parse(JSON.stringify(from));
            }
            catch (err) { }
        }
        // 基本类型对象和无法复制的对象，直接返回之
        return from;
    };
    /** 记录当前正在执行update方法的Watcher引用 */
    Watcher.updating = null;
    Watcher._uid = 0;
    return Watcher;
}());
/* harmony default export */ __webpack_exports__["a"] = (Watcher);


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return bindManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_injector_Injector__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_Core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_Dictionary__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Bind__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Utils__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__net_NetManager__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_ObjectUtil__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils_DisplayUtil__ = __webpack_require__(40);









/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-06
 * @modify date 2017-11-06
 *
 * 绑定管理器，可以将数据和显示对象绑定到一起，MVVM书写界面
*/
var BindManager = /** @class */ (function () {
    function BindManager() {
        this._bindDict = new __WEBPACK_IMPORTED_MODULE_3__utils_Dictionary__["a" /* default */]();
        this._regExp = /^\s*(\w+)\s+((in)|(of))\s+(.+?)\s*$/;
    }
    /**
     * 绑定数据到UI上
     *
     * @param {IMediator} mediator 中介者
     * @returns {Bind} 返回绑定实例
     * @memberof BindManager
     */
    BindManager.prototype.bind = function (mediator) {
        var bindData = this._bindDict.get(mediator);
        if (!bindData) {
            this._bindDict.set(mediator, bindData = {
                bind: new __WEBPACK_IMPORTED_MODULE_4__Bind__["a" /* default */](mediator),
                callbacks: []
            });
        }
        // 重新绑定所有
        for (var _i = 0, _a = bindData.callbacks; _i < _a.length; _i++) {
            var callback = _a[_i];
            callback();
        }
        // 返回Bind对象
        return bindData.bind;
    };
    /**
     * 移除绑定
     *
     * @param {IMediator} mediator
     * @returns {Bind}
     * @memberof BindManager
     */
    BindManager.prototype.unbind = function (mediator) {
        var bindData = this._bindDict.get(mediator);
        if (bindData) {
            bindData.bind.dispose();
            this._bindDict.delete(mediator);
        }
        return bindData && bindData.bind;
    };
    BindManager.prototype.addBindHandler = function (mediator, callback) {
        var handler = function () {
            // 判断数据是否合法
            if (!mediator.viewModel)
                return;
            // 开始绑定
            callback();
        };
        // 添加绑定数据
        var bindData = this._bindDict.get(mediator);
        if (bindData.callbacks.indexOf(handler) < 0)
            bindData.callbacks.push(handler);
        // 立即调用一次
        handler();
    };
    BindManager.prototype.getNearestAncestor = function (bridge, target, propName) {
        if (!target || target[propName])
            return target;
        else
            return this.getNearestAncestor(bridge, bridge.getParent(target), propName);
    };
    /**
     * 绑定属性值
     *
     * @param {IMediator} mediator 中介者
     * @param {*} currentTarget 绑定到的target实体对象
     * @param {*} target 绑定命令本来所在的对象
     * @param {any[]} envModels 环境变量数组
     * @param {string} name 绑定的属性名
     * @param {(EvalExp)} exp 绑定的表达式或方法
     * @memberof BindManager
     */
    BindManager.prototype.bindValue = function (mediator, currentTarget, target, envModels, name, exp) {
        var watcher;
        var bindData = this._bindDict.get(mediator);
        this.addBindHandler(mediator, function () {
            // 如果之前绑定过，则要先销毁之
            if (watcher)
                watcher.dispose();
            // 绑定新的订阅者
            watcher = (_a = bindData.bind).createWatcher.apply(_a, [currentTarget, target, exp, function (value) {
                    currentTarget[name] = value;
                }, mediator.viewModel].concat(envModels, [mediator.viewModel]));
            var _a;
        });
    };
    /**
     * 绑定一个表达式，与bindValue类似，但不会给属性赋值
     *
     * @param {IMediator} mediator 中介者
     * @param {*} currentTarget 绑定到的target实体对象
     * @param {*} target 绑定命令本来所在的对象
     * @param {any[]} envModels 环境变量数组
     * @param {(EvalExp)} exp 绑定的表达式或方法
     * @memberof BindManager
     */
    BindManager.prototype.bindExp = function (mediator, currentTarget, target, envModels, exp) {
        var watcher;
        var bindData = this._bindDict.get(mediator);
        this.addBindHandler(mediator, function () {
            // 如果之前绑定过，则要先销毁之
            if (watcher)
                watcher.dispose();
            // 绑定新的订阅者
            watcher = (_a = bindData.bind).createWatcher.apply(_a, [currentTarget, target, exp, function (value) {
                    // 不干任何事情
                }, mediator.viewModel].concat(envModels, [mediator.viewModel]));
            var _a;
        });
    };
    /**
     * 绑定方法执行
     *
     * @param {IMediator} mediator 中介者
     * @param {*} currentTarget 绑定到的target实体对象
     * @param {*} target 绑定命令本来所在的对象
     * @param {any[]} envModels 环境变量数组
     * @param {string} name 绑定的方法名
     * @param {...(EvalExp)[]} argExps 执行方法的参数表达式或方法列表
     * @memberof BindManager
     */
    BindManager.prototype.bindFunc = function (mediator, currentTarget, target, envModels, name) {
        var _this = this;
        var argExps = [];
        for (var _i = 5; _i < arguments.length; _i++) {
            argExps[_i - 5] = arguments[_i];
        }
        var watchers = [];
        var bindData = this._bindDict.get(mediator);
        this.addBindHandler(mediator, function () {
            // 判断参数数量，无参数方法一次性执行即可，无需绑定，有参数的方法则需要每次参数改变就执行一次
            if (argExps.length > 0) {
                // 将表达式中所有undefined和null变为内部值
                var undefinedValue = Date.now() * Math.random() + "_undefined";
                var nullValue = Date.now() * Math.random() + "_null";
                argExps = argExps.map(function (exp) {
                    if (exp === undefined)
                        return "'" + undefinedValue + "'";
                    else if (exp === null)
                        return "'" + nullValue + "'";
                    else
                        return exp;
                });
                // 绑定表达式参数数组
                var initValue = {};
                var args = [];
                var argsInited = false;
                var handler = function (index, value) {
                    // 将value中的undefined和null恢复回去
                    if (value === undefinedValue)
                        value = undefined;
                    else if (value == nullValue)
                        value = null;
                    // 设置参数值
                    args[index] = value;
                    // 判断参数是否齐全
                    if (!argsInited) {
                        for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
                            var arg = args_1[_i];
                            // 如果列表里存在初始值，表示没有赋值完毕，直接返回
                            if (arg === initValue)
                                return;
                        }
                        // 设置初始化完毕状态
                        argsInited = true;
                    }
                    // 赋值已经完毕了，调用方法，this指向ui本身
                    currentTarget[name].apply(currentTarget, args);
                };
                // 清理旧的订阅者
                for (var i = 0, len = watchers.length; i < len; i++) {
                    watchers.shift().dispose();
                }
                // 循环绑定表达式到handler
                for (var i = 0, len = argExps.length; i < len; i++) {
                    // 记录一个初始值，用于判断参数列表是否已赋值完毕
                    args.push(initValue);
                }
                for (var i = 0, len = argExps.length; i < len; i++) {
                    // 绑定表达式
                    var watcher = (_a = bindData.bind).createWatcher.apply(_a, [currentTarget, target, argExps[i], handler.bind(_this, i), mediator.viewModel].concat(envModels, [mediator.viewModel]));
                    // 记录订阅者
                    watchers.push(watcher);
                }
            }
            else {
                // 无参数执行，无需绑定，一次性执行即可
                target[name]();
            }
            var _a;
        });
    };
    /**
     * 绑定事件
     *
     * @param {IMediator} mediator 中介者
     * @param {*} currentTarget 绑定到的target实体对象
     * @param {*} target 绑定命令本来所在的对象
     * @param {any[]} envModels 环境变量数组
     * @param {string} type 绑定的事件类型
     * @param {EvalExp} exp 绑定的事件回调表达式或方法
     * @memberof BindManager
     */
    BindManager.prototype.bindOn = function (mediator, currentTarget, target, envModels, type, exp) {
        var _this = this;
        this.addBindHandler(mediator, function () {
            var commonScope = {
                $this: mediator,
                $data: mediator.viewModel,
                $bridge: mediator.bridge,
                $currentTarget: currentTarget,
                $target: target
            };
            // 计算事件hash
            var onHash = Object(__WEBPACK_IMPORTED_MODULE_7__utils_ObjectUtil__["e" /* getObjectHashs */])(currentTarget, type, exp);
            // 如果之前添加过监听，则先移除之
            var handler = currentTarget[onHash];
            if (handler) {
                mediator.bridge.unmapListener(currentTarget, type, handler, mediator.viewModel);
                handler = null;
            }
            // 先尝试用exp当做方法名去viewModel里寻找，如果找不到则把exp当做一个执行表达式处理，外面包一层方法
            if (typeof exp === "string")
                handler = mediator.viewModel[exp];
            if (!(handler instanceof Function)) {
                var func = Object(__WEBPACK_IMPORTED_MODULE_5__Utils__["b" /* createRunFunc */])(exp, 3 + envModels.length);
                // 这里要转一手，记到闭包里一个副本，否则因为bindOn是延迟操作，到时envModel可能已被修改
                handler = function (event) {
                    func.call.apply(func, [this, commonScope].concat(envModels, [mediator.viewModel, { $event: event }]));
                };
            }
            mediator.bridge.mapListener(currentTarget, type, handler, mediator.viewModel);
            // 将事件回调记录到显示对象上
            currentTarget[onHash] = handler;
            // 如果__bind_sub_events__列表存在，则将事件记录到其上
            var nearestAncestor = _this.getNearestAncestor(mediator.bridge, target, "__bind_sub_events__");
            var events = (nearestAncestor || target).__bind_sub_events__;
            if (events) {
                events.push({
                    target: currentTarget,
                    type: type,
                    handler: handler,
                    thisArg: mediator.viewModel
                });
            }
        });
    };
    /**
     * 绑定显示
     *
     * @param {IMediator} mediator 中介者
     * @param {*} currentTarget 绑定到的target实体对象
     * @param {*} target 绑定命令本来所在的对象
     * @param {any[]} envModels 环境变量数组
     * @param {EvalExp} exp 绑定表达式或方法
     * @param {(value:boolean)=>void} [callback] 判断条件改变时会触发这个回调
     * @memberof BindManager
     */
    BindManager.prototype.bindIf = function (mediator, currentTarget, target, envModels, exp, callback) {
        var watcher;
        var bindData = this._bindDict.get(mediator);
        var replacer = mediator.bridge.createEmptyDisplay();
        this.addBindHandler(mediator, function () {
            // 如果之前绑定过，则要先销毁之
            if (watcher)
                watcher.dispose();
            // 绑定表达式
            watcher = (_a = bindData.bind).createWatcher.apply(_a, [currentTarget, target, exp, function (value) {
                    // 如果表达式为true则显示ui，否则移除ui
                    if (value)
                        Object(__WEBPACK_IMPORTED_MODULE_8__utils_DisplayUtil__["a" /* replaceDisplay */])(mediator.bridge, replacer, currentTarget);
                    else
                        Object(__WEBPACK_IMPORTED_MODULE_8__utils_DisplayUtil__["a" /* replaceDisplay */])(mediator.bridge, currentTarget, replacer);
                    // 触发回调
                    callback && callback(value);
                }, mediator.viewModel].concat(envModels, [mediator.viewModel]));
            var _a;
        });
    };
    /**
     * 绑定循环
     *
     * @param {IMediator} mediator 中介者
     * @param {*} currentTarget 绑定到的target实体对象
     * @param {*} target 绑定命令本来所在的对象
     * @param {any[]} envModels 环境变量数组
     * @param {string} exp 循环表达式，形如："a in b"（表示a遍历b中的key）或"a of b"（表示a遍历b中的值）。b可以是个表达式
     * @param {IMediatorConstructor} [mediatorCls] 提供该参数将使用提供的中介者包装每一个渲染器
     * @param {(data:any, renderer:any, envModels:any[])=>void} [callback] 每次生成新的renderer实例时调用这个回调
     * @memberof BindManager
     */
    BindManager.prototype.bindFor = function (mediator, currentTarget, target, envModels, exp, mediatorCls, callback) {
        var _this = this;
        var watcher;
        var bindData = this._bindDict.get(mediator);
        var replacer = mediator.bridge.createEmptyDisplay();
        var subMediatorCache = [];
        this.addBindHandler(mediator, function () {
            // 解析表达式
            var res = _this._regExp.exec(exp);
            if (!res)
                return;
            // 包装渲染器创建回调
            var memento = mediator.bridge.wrapBindFor(currentTarget, function (key, value, renderer) {
                // 设置环境变量
                var commonScope = {
                    $key: key,
                    $value: value,
                    $parent: envModels[0] || mediator.viewModel
                };
                // 填入用户声明的属性
                commonScope[res[1]] = (res[2] == "in" ? key : value);
                // 生成一个环境变量的副本
                var subEnvModels = envModels.concat();
                // 插入环境变量
                subEnvModels.unshift(commonScope);
                // 如果renderer已经有事件列表了，说明renderer是被重用的，删除所有事件
                var events = renderer.__bind_sub_events__;
                for (var i in events) {
                    var data = events.pop();
                    mediator.bridge.unmapListener(data.target, data.type, data.handler, data.thisArg);
                }
                // 为renderer设置子对象事件列表
                if (!events)
                    renderer.__bind_sub_events__ = [];
                // 为renderer套一个Mediator外壳
                if (mediatorCls) {
                    var subMediator = new mediatorCls(renderer);
                    // 更新渲染器
                    if (subMediator.skin && subMediator.bridge === mediator.bridge)
                        renderer = subMediator.skin;
                    // 托管子中介者
                    mediator.delegateMediator(subMediator);
                    // 使用当前所有的数据开启该中介者
                    subMediator.open(__WEBPACK_IMPORTED_MODULE_7__utils_ObjectUtil__["b" /* extendObject */].apply(void 0, [{}].concat(subEnvModels, [value])));
                    // 缓存子中介者
                    subMediatorCache.push(subMediator);
                }
                // 触发回调，进行内部编译
                callback && callback(value, renderer, subEnvModels);
            });
            // 如果之前绑定过，则要先销毁之
            if (watcher)
                watcher.dispose();
            // 获得要遍历的数据集合
            watcher = (_a = bindData.bind).createWatcher.apply(_a, [currentTarget, target, res[5], function (datas) {
                    // 如果遍历的对象是个数字，则伪造一个临时数组供使用
                    if (typeof datas === "number") {
                        var tempArr = [];
                        for (var i = 0; i < datas; i++) {
                            tempArr.push(i);
                        }
                        datas = tempArr;
                    }
                    // 清空已有的子中介者
                    for (var i = 0, len = subMediatorCache.length; i < len; i++) {
                        var subMediator = subMediatorCache.shift();
                        mediator.undelegateMediator(subMediator);
                        subMediator.dispose();
                    }
                    // 赋值
                    mediator.bridge.valuateBindFor(currentTarget, datas, memento);
                }, mediator.viewModel].concat(envModels, [mediator.viewModel]));
            var _a;
        });
    };
    /**
     * 绑定Message
     *
     * @param {IMediator} mediator 中介者
     * @param {*} currentTarget 绑定到的target实体对象
     * @param {*} target 绑定命令本来所在的对象
     * @param {any[]} envModels 环境变量数组
     * @param {IConstructor|string} type 绑定的消息类型字符串
     * @param {string} name 绑定的属性名
     * @param {EvalExp} exp 绑定的表达式或方法
     * @param {IObservable} [observable] 绑定的消息内核，默认是core
     * @memberof BindManager
     */
    BindManager.prototype.bindMessage = function (mediator, currentTarget, target, envModels, type, name, exp, observable) {
        if (!observable)
            observable = __WEBPACK_IMPORTED_MODULE_2__core_Core__["a" /* core */].observable;
        var bindData = this._bindDict.get(mediator);
        var handler = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (mediator.disposed) {
                // mediator已销毁，取消监听
                observable.unlisten(type, handler);
            }
            else {
                var msg;
                if (args.length == 1 && typeof args[0] == "object" && args[0].type)
                    msg = args[0];
                else
                    msg = { $arguments: args };
                // 设置通用属性
                var commonScope = {
                    $this: mediator,
                    $data: mediator.viewModel,
                    $bridge: mediator.bridge,
                    $currentTarget: currentTarget,
                    $target: target
                };
                currentTarget[name] = __WEBPACK_IMPORTED_MODULE_5__Utils__["c" /* evalExp */].apply(void 0, [exp, mediator.viewModel, msg].concat(envModels, [mediator.viewModel, commonScope]));
            }
        };
        // 添加监听
        observable.listen(type, handler);
    };
    /**
     * 绑定Response
     *
     * @param {IMediator} mediator 中介者
     * @param {*} currentTarget 绑定到的target实体对象
     * @param {*} target 绑定命令本来所在的对象
     * @param {any[]} envModels 环境变量数组
     * @param {IResponseDataConstructor|string} type 绑定的通讯消息类型
     * @param {string} name 绑定的属性名
     * @param {EvalExp} exp 绑定的表达式或方法
     * @param {IObservable} [observable] 绑定的消息内核，默认是core
     * @memberof BindManager
     */
    BindManager.prototype.bindResponse = function (mediator, currentTarget, target, envModels, type, name, exp, observable) {
        if (!observable)
            observable = __WEBPACK_IMPORTED_MODULE_2__core_Core__["a" /* core */].observable;
        var bindData = this._bindDict.get(mediator);
        var handler = function (response) {
            if (mediator.disposed) {
                // mediator已销毁，取消监听
                __WEBPACK_IMPORTED_MODULE_6__net_NetManager__["netManager"].unlistenResponse(type, handler, null, null, observable);
            }
            else {
                // 设置通用属性
                var commonScope = {
                    $this: mediator,
                    $data: mediator.viewModel,
                    $bridge: mediator.bridge,
                    $currentTarget: currentTarget,
                    $target: target
                };
                currentTarget[name] = __WEBPACK_IMPORTED_MODULE_5__Utils__["c" /* evalExp */].apply(void 0, [exp, mediator.viewModel, response].concat(envModels, [mediator.viewModel, commonScope]));
            }
        };
        // 添加监听
        __WEBPACK_IMPORTED_MODULE_6__net_NetManager__["netManager"].listenResponse(type, handler, null, null, observable);
        // 如果mediator所依赖的模块有初始化消息，则要额外触发初始化消息的绑定
        if (mediator["dependModuleInstance"]) {
            for (var _i = 0, _a = mediator["dependModuleInstance"].responses; _i < _a.length; _i++) {
                var response = _a[_i];
                handler(response);
            }
        }
    };
    BindManager = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
        __WEBPACK_IMPORTED_MODULE_1__core_injector_Injector__["Injectable"]
    ], BindManager);
    return BindManager;
}());
/* unused harmony default export */ var _unused_webpack_default_export = (BindManager);
/** 再额外导出一个单例 */
var bindManager = __WEBPACK_IMPORTED_MODULE_2__core_Core__["a" /* core */].getInject(BindManager);


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commonData", function() { return commonData; });
var RequestData = /** @class */ (function () {
    function RequestData() {
        /**
         * 用户参数，可以保存任意参数到Message中，该参数中的数据不会被发送
         *
         * @type {*}
         * @memberof RequestData
         */
        this.__userData = {};
        /**
         * 是否在接到返回前使用loading类型遮罩覆盖全屏，防止用户操作，默认是true
         *
         * @type {boolean}
         * @memberof RequestData
         */
        this.__useMask = true;
        /**
         * 消息派发内核列表
         *
         * @type {IObservable}
         * @memberof RequestData
         */
        this.__observables = [];
        // 禁掉部分本地变量的可遍历性
        Object.defineProperties(this, {
            __userData: {
                configurable: true,
                enumerable: false,
                writable: true,
                value: this.__userData
            },
            __observables: {
                configurable: true,
                enumerable: false,
                writable: true,
                value: this.__observables
            }
        });
    }
    Object.defineProperty(RequestData.prototype, "__observable", {
        /**
         * 消息当前所属内核
         *
         * @type {IObservable}
         * @memberof RequestData
         */
        get: function () {
            return this.__observables[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestData.prototype, "__oriObservable", {
        /**
         * 消息所属的原始内核（第一个派发到的内核）
         *
         * @type {IObservable}
         * @memberof RequestData
         */
        get: function () {
            return this.__observables[this.__observables.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestData.prototype, "__type", {
        /**
         * 获取请求消息类型字符串
         *
         * @readonly
         * @type {string}
         * @memberof RequestData
         */
        get: function () {
            return this.__params.type;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 再次发送消息，会使用首个内核重新发送该消息
     *
     * @memberof RequestData
     */
    RequestData.prototype.redispatch = function () {
        this.__oriObservable.dispatch(this);
    };
    return RequestData;
}());
/* harmony default export */ __webpack_exports__["default"] = (RequestData);
/** 导出公共消息参数对象 */
var commonData = {};


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-06
 * @modify date 2017-09-06
 *
 * 表现层消息
*/
var BridgeMessage = /** @class */ (function () {
    function BridgeMessage() {
    }
    /**
     * 初始化表现层实例前的消息
     *
     * @static
     * @type {string}
     * @memberof ViewMessage
     */
    BridgeMessage.BRIDGE_BEFORE_INIT = "bridgeBeforeInit";
    /**
     * 初始化表现层实例后的消息
     *
     * @static
     * @type {string}
     * @memberof ViewMessage
     */
    BridgeMessage.BRIDGE_AFTER_INIT = "bridgeAfterInit";
    /**
     * 所有表现层实例都初始化完毕的消息
     *
     * @static
     * @type {string}
     * @memberof ViewMessage
     */
    BridgeMessage.BRIDGE_ALL_INIT = "bridgeAllInit";
    return BridgeMessage;
}());
/* harmony default export */ __webpack_exports__["a"] = (BridgeMessage);


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return sceneManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_injector_Injector__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__NoneScenePolicy__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__SceneMessage__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_SyncUtil__ = __webpack_require__(67);






/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-08
 * @modify date 2017-09-08
 *
 * 弹窗管理器，包含切换场景、push场景、pop场景功能
*/
var SYNC_NAME = "SceneManager_sync";
var ChangeType;
(function (ChangeType) {
    ChangeType[ChangeType["Switch"] = 0] = "Switch";
    ChangeType[ChangeType["Push"] = 1] = "Push";
    ChangeType[ChangeType["Pop"] = 2] = "Pop";
})(ChangeType || (ChangeType = {}));
var SceneManager = /** @class */ (function () {
    function SceneManager() {
        this._sceneStack = [];
    }
    Object.defineProperty(SceneManager.prototype, "currentScene", {
        /**
         * 获取当前场景
         *
         * @readonly
         * @type {IScene}
         * @memberof SceneManager
         */
        get: function () {
            return this._sceneStack[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneManager.prototype, "activeCount", {
        /**
         * 获取活动场景个数
         *
         * @readonly
         * @type {number}
         * @memberof SceneManager
         */
        get: function () {
            return this._sceneStack.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取场景是否已经开启
     *
     * @param {IScene} scene 场景对象
     * @returns {boolean} 是否已经开启
     * @memberof SceneManager
     */
    SceneManager.prototype.isOpened = function (scene) {
        return (this._sceneStack.indexOf(scene) >= 0);
    };
    /**
     * 切换场景，替换当前场景，当前场景会被销毁
     *
     * @param {IScene} scene 要切换到的场景
     * @param {*} [data] 要携带给下一个场景的数据
     * @returns {IScene} 场景本体
     * @memberof SceneManager
     */
    SceneManager.prototype.switch = function (scene, data) {
        var _this = this;
        // 非空判断
        if (scene == null)
            return;
        // 如果切入的是第一个场景，则改用push操作
        if (this.activeCount == 0)
            return this.push(scene, data);
        // 同步执行
        Object(__WEBPACK_IMPORTED_MODULE_5__utils_SyncUtil__["b" /* wait */])(SYNC_NAME, this.doChange, this, this.currentScene, scene, data, scene.policy || scene.bridge.defaultScenePolicy || __WEBPACK_IMPORTED_MODULE_3__NoneScenePolicy__["a" /* default */], ChangeType.Switch, function () {
            var lastScene = _this._sceneStack[0];
            // 数据先行
            _this._sceneStack[0] = scene;
            // 派发消息
            __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].dispatch(__WEBPACK_IMPORTED_MODULE_4__SceneMessage__["a" /* default */].SCENE_STACK_CHANGE);
            // 销毁
            lastScene && lastScene.dispose();
        });
        return scene;
    };
    /**
     * 推入场景，当前场景不会销毁，而是进入场景栈保存，以后可以通过popScene重新展现
     *
     * @param {IScene} scene 要推入的场景
     * @param {*} [data] 要携带给下一个场景的数据
     * @returns {IScene} 场景本体
     * @memberof SceneManager
     */
    SceneManager.prototype.push = function (scene, data) {
        var _this = this;
        // 非空判断
        if (scene == null)
            return scene;
        // 同步执行
        Object(__WEBPACK_IMPORTED_MODULE_5__utils_SyncUtil__["b" /* wait */])(SYNC_NAME, this.doChange, this, this.currentScene, scene, data, scene.policy || scene.bridge.defaultScenePolicy || __WEBPACK_IMPORTED_MODULE_3__NoneScenePolicy__["a" /* default */], ChangeType.Push, function () {
            // 数据先行
            _this._sceneStack.unshift(scene);
            // 派发消息
            __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].dispatch(__WEBPACK_IMPORTED_MODULE_4__SceneMessage__["a" /* default */].SCENE_STACK_CHANGE);
        });
        return scene;
    };
    /**
     * 弹出场景，当前场景会被销毁，当前位于栈顶的场景会重新显示
     *
     * @param {IScene} scene 要切换出的场景，如果传入的场景不是当前场景则仅移除指定场景，不会进行切换操作
     * @param {*} [data] 要携带给下一个场景的数据
     * @returns {IScene} 场景本体
     * @memberof SceneManager
     */
    SceneManager.prototype.pop = function (scene, data) {
        // 非空判断
        if (scene == null)
            return scene;
        // 同步执行
        Object(__WEBPACK_IMPORTED_MODULE_5__utils_SyncUtil__["b" /* wait */])(SYNC_NAME, this.doPop, this, scene, data);
        return scene;
    };
    SceneManager.prototype.doPop = function (scene, data) {
        var _this = this;
        // 如果没有足够的场景储备则什么都不做
        if (this.activeCount <= 1) {
            console.log("场景栈中的场景数量不足，无法执行pop操作");
            // 完成步骤
            Object(__WEBPACK_IMPORTED_MODULE_5__utils_SyncUtil__["a" /* notify */])(SYNC_NAME);
            return;
        }
        // 验证是否是当前场景，不是则直接移除，不使用Policy
        var to = this._sceneStack[1];
        var policy = scene.policy || scene.bridge.defaultScenePolicy || __WEBPACK_IMPORTED_MODULE_3__NoneScenePolicy__["a" /* default */];
        if (this._sceneStack.indexOf(scene) != 0) {
            to = null;
            policy = __WEBPACK_IMPORTED_MODULE_3__NoneScenePolicy__["a" /* default */];
        }
        // 执行切换
        this.doChange(scene, to, data, policy, ChangeType.Pop, function () {
            // 数据先行
            _this._sceneStack.splice(_this._sceneStack.indexOf(scene), 1);
            // 派发消息
            __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].dispatch(__WEBPACK_IMPORTED_MODULE_4__SceneMessage__["a" /* default */].SCENE_STACK_CHANGE);
        }, function () {
            // 销毁
            scene.dispose();
        });
    };
    SceneManager.prototype.doChange = function (from, to, data, policy, type, begin, complete) {
        // 如果from和to有一个为null则policy为none
        if (!from || !to)
            policy = __WEBPACK_IMPORTED_MODULE_3__NoneScenePolicy__["a" /* default */];
        // to指定的场景必须要显示
        if (to)
            to.bridge.htmlWrapper.style.display = "";
        // 如果要交替的两个场景不是同一个类型的场景，则切换HTMLWrapper显示，且Policy也采用无切换策略
        if (from && to && to.bridge.type != from.bridge.type) {
            from.bridge.htmlWrapper.style.display = "none";
            policy = __WEBPACK_IMPORTED_MODULE_3__NoneScenePolicy__["a" /* default */];
        }
        // 调用回调
        begin && begin();
        // 获取接口引用
        var prepareFunc;
        var doFunc;
        switch (type) {
            case ChangeType.Switch:
                prepareFunc = policy.prepareSwitch;
                doFunc = policy.switch;
                break;
            case ChangeType.Push:
                prepareFunc = policy.preparePush || policy.prepareSwitch;
                doFunc = policy.push || policy.switch;
                break;
            case ChangeType.Pop:
                prepareFunc = policy.preparePop || policy.prepareSwitch;
                doFunc = policy.pop || policy.switch;
                break;
        }
        // 前置处理
        to && from && from.onBeforeOut(to, data);
        to && to.onBeforeIn(from, data);
        // 派发事件
        to && __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].dispatch(__WEBPACK_IMPORTED_MODULE_4__SceneMessage__["a" /* default */].SCENE_BEFORE_CHANGE, to, from);
        // 调用准备接口
        prepareFunc && prepareFunc.call(policy, from, to);
        // 添加显示
        to && to.bridge.addChild(to.bridge.sceneLayer, to.skin);
        // 调用切换接口
        doFunc.call(policy, from, to, function () {
            // 移除显示
            to && from && from.bridge.removeChild(from.bridge.sceneLayer, from.skin);
            // 后置处理
            to && from && from.onAfterOut(to, data);
            to && to.onAfterIn(from, data);
            // 派发事件
            to && __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].dispatch(__WEBPACK_IMPORTED_MODULE_4__SceneMessage__["a" /* default */].SCENE_AFTER_CHANGE, to, from);
            // 调用回调
            complete && complete();
            // 完成步骤
            Object(__WEBPACK_IMPORTED_MODULE_5__utils_SyncUtil__["a" /* notify */])(SYNC_NAME);
        });
    };
    SceneManager = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
        __WEBPACK_IMPORTED_MODULE_2__core_injector_Injector__["Injectable"]
    ], SceneManager);
    return SceneManager;
}());
/* unused harmony default export */ var _unused_webpack_default_export = (SceneManager);
/** 再额外导出一个单例 */
var sceneManager = __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].getInject(SceneManager);


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-08
 * @modify date 2017-09-08
 *
 * 场景相关的消息
*/
var SceneMessage = /** @class */ (function () {
    function SceneMessage() {
    }
    /**
     * 切换场景前的消息
     *
     * @static
     * @type {string}
     * @memberof SceneMessage
     */
    SceneMessage.SCENE_BEFORE_CHANGE = "sceneBeforeChange";
    /**
     * 切换场景后的消息
     *
     * @static
     * @type {string}
     * @memberof SceneMessage
     */
    SceneMessage.SCENE_AFTER_CHANGE = "sceneAfterChange";
    /**
     * 场景栈数据变化消息
     *
     * @static
     * @type {string}
     * @memberof SceneMessage
     */
    SceneMessage.SCENE_STACK_CHANGE = "sceneStackChange";
    return SceneMessage;
}());
/* harmony default export */ __webpack_exports__["a"] = (SceneMessage);


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModuleOpenStatus; });
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2018-01-30
 * @modify date 2018-01-30
 *
 * 该接口规定了中介者具有的模块部分功能
*/
var ModuleOpenStatus;
(function (ModuleOpenStatus) {
    ModuleOpenStatus[ModuleOpenStatus["Stop"] = 0] = "Stop";
    ModuleOpenStatus[ModuleOpenStatus["BeforeOpen"] = 1] = "BeforeOpen";
    ModuleOpenStatus[ModuleOpenStatus["AfterOpen"] = 2] = "AfterOpen";
})(ModuleOpenStatus || (ModuleOpenStatus = {}));


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = replaceDisplay;
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2018-03-22
 * @modify date 2018-03-22
 *
 * 显示工具
*/
/**
 * 替换显示
 *
 * @export
 * @param {IBridge} bridge 要使用的桥
 * @param {*} current 被替换的显示
 * @param {*} target 替换成为的显示
 */
function replaceDisplay(bridge, current, target) {
    // 两个皮肤必须都是隶属桥的皮肤
    if (bridge.isMySkin(target) && bridge.isMySkin(current)) {
        var parent = bridge.getParent(current);
        if (parent) {
            var index = bridge.getChildIndex(parent, current);
            bridge.addChildAt(parent, target, index);
            bridge.removeChild(parent, current);
        }
    }
}


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = load;
/* unused harmony export toFormParams */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_env_Environment__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__URLUtil__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ObjectUtil__ = __webpack_require__(3);



/**
 * 发送一个或多个HTTP请求
 *
 * @export
 * @param {IHTTPRequestParams} params 请求参数
 */
function load(params) {
    // 非空判断
    if (!params.url) {
        // 成功回调
        params.onResponse && params.onResponse();
        return;
    }
    // 数组判断
    if (params.url instanceof Array) {
        // 一次请求多个地址，需要做一个队列加载，然后一次性回调
        var urls = params.url;
        var results = [];
        var newParams = Object(__WEBPACK_IMPORTED_MODULE_2__ObjectUtil__["a" /* cloneObject */])(params);
        newParams.onResponse = function (result) {
            results.push(result);
            loadNext();
        };
        var loadNext = function () {
            if (urls.length <= 0) {
                // 成功回调
                params.onResponse && params.onResponse(results);
                return;
            }
            newParams.url = urls.shift();
            load(newParams);
        };
        loadNext();
        return;
    }
    // 一次请求一个地址
    var retryTimes = params.retryTimes || 2;
    var timeout = params.timeout || 10000;
    var method = params.method || "GET";
    var timeoutId = 0;
    var data = params.data || {};
    // 取到url
    var url = params.url;
    if (params.useCDN) {
        // 如果使用CDN则改用cdn域名
        url = __WEBPACK_IMPORTED_MODULE_0__engine_env_Environment__["environment"].toCDNHostURL(url);
    }
    else {
        // 合法化protocol
        url = Object(__WEBPACK_IMPORTED_MODULE_1__URLUtil__["e" /* validateProtocol */])(url, params.forceHTTPS ? "https:" : null);
        // 规整一下url
        url = Object(__WEBPACK_IMPORTED_MODULE_1__URLUtil__["d" /* trimURL */])(url);
    }
    // 生成xhr
    var xhr = (window["XDomainRequest"] && navigator.userAgent.indexOf("MSIE 10.") < 0 ? new window["XDomainRequest"]() : window["XMLHttpRequest"] ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
    // 发送
    send();
    function send() {
        var sendData = null;
        // 根据发送方式组织数据格式
        switch (method) {
            case "POST":
                switch (params.headerDict && params.headerDict["Content-Type"]) {
                    case "application/x-www-form-urlencoded":
                        sendData = toFormParams(data);
                        break;
                    default:
                        sendData = JSON.stringify(data);
                        break;
                }
                break;
            case "GET":
                // 将数据添加到url上
                url = Object(__WEBPACK_IMPORTED_MODULE_1__URLUtil__["c" /* joinQueryParams */])(url, data);
                break;
            default:
                throw new Error("暂不支持的HTTP Method：" + method);
        }
        // 打开XHR
        xhr.open(method, url, true);
        // 初始化，responseType必须在open之后设置，否则IE10和IE11会报错
        if (params.responseType)
            xhr.responseType = params.responseType;
        // 如果需要withCredentials，则设置之
        if (params.withCredentials)
            xhr.withCredentials = true;
        xhr.onload = onLoad;
        xhr.onerror = onError;
        // 添加自定义请求头，如果可以的话
        if (xhr.setRequestHeader) {
            for (var key in params.headerDict) {
                xhr.setRequestHeader(key, params.headerDict[key]);
            }
        }
        // 开始发送
        xhr.send(sendData);
        // 开始计时
        timeoutId = window.setTimeout(abortAndRetry, timeout);
    }
    function onLoad(evt) {
        // 即使是onLoad也要判断下状态码，但如果没有状态码，比如说XDomainRequest就直接认为成功了
        var statusHead = xhr.status ? Math.floor(xhr.status * 0.01) : 2;
        switch (statusHead) {
            case 2:
            case 3:
                // 2xx和3xx的状态码认为是成功
                timeoutId && clearTimeout(timeoutId);
                timeoutId = 0;
                // 成功回调
                params.onResponse && params.onResponse(xhr.response || xhr.responseText);
                break;
            case 4:
            case 5:
                // 4xx和5xx的状态码认为是错误，转调错误回调
                onError();
                break;
        }
    }
    function onError() {
        // 停止计时
        timeoutId && clearTimeout(timeoutId);
        timeoutId = 0;
        // 失败重试
        if (retryTimes > 0) {
            // 没有超过重试上限则重试
            abortAndRetry();
        }
        else {
            // 出错，如果使用CDN功能则尝试切换
            if (params.useCDN && !__WEBPACK_IMPORTED_MODULE_0__engine_env_Environment__["environment"].nextCDN()) {
                // 还没切换完，重新加载
                load(params);
            }
            else {
                // 切换完了还失败，则汇报错误
                var err = new Error(xhr.status ? xhr.status + " " + xhr.statusText : "请求错误，且无法获取错误信息");
                params.onError && params.onError(err);
            }
        }
    }
    function abortAndRetry() {
        // 重试次数递减
        retryTimes--;
        // 中止xhr
        xhr.abort();
        // 添加时间戳作为随机版本号
        url = Object(__WEBPACK_IMPORTED_MODULE_1__URLUtil__["c" /* joinQueryParams */])(url, { _r: Date.now() });
        // 重新发送
        send();
    }
}
/**
 * 将数据转换为form形式
 *
 * @export
 * @param {*} data 要转换的数据
 * @returns {string} 转换结果字符串
 */
function toFormParams(data) {
    var keys = Object.keys(data);
    var params = keys.map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    });
    return params.join("&");
}


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export shuffle */
/* unused harmony export randomize */
/* unused harmony export randomizeWeight */
/* harmony export (immutable) */ __webpack_exports__["a"] = unique;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Dictionary__ = __webpack_require__(4);

/**
 * 简单数组乱序
 *
 * @export
 * @template T
 * @param {T} a
 * @returns {T}
 */
function shuffle(a) {
    var len = a.length;
    for (var i = 1; i < len; i++) {
        var end = len - i;
        var index = (Math.random() * (end + 1)) >> 0;
        var t = a[end];
        a[end] = a[index];
        a[index] = t;
    }
    return a;
}
/**
 * 从数组指定范围内随机取出指定数量的不重复元素
 * ArrayUtils.randomize([0,1,2,3,4,5,6,7,8,9], 3, 2, 7);
 * //返回[6,2,3]
 *
 * @param arr 		原始数组
 * @param count	    数量，默认为范围内全部元素
 * @param begin 	起始位置，默认为0
 * @param end		结束位置，默认为数组长度
 */
function randomize(arr, count, begin, end) {
    if (!arr || begin < 0)
        throw new Error("invalid argument");
    arr = arr.concat();
    var len = arr.length;
    end = end >> 0;
    if (!(end >= 0 && end <= len)) {
        end = len;
    }
    begin = begin >> 0;
    if (!(begin > 0)) {
        begin = 0;
    }
    count = count >> 0;
    if (!(count >= 0 && count < end - begin)) {
        count = end - begin;
    }
    var arr2 = [];
    var end2 = begin + count;
    for (var i = begin; i < end2; i++) {
        var index = (Math.random() * (end - i) + i) >> 0;
        arr2[i - begin] = arr[index];
        arr[index] = arr[i];
    }
    return arr2;
}
/**
 * 进行权重随机
 *
 * @export
 * @template T
 * @param {T[]} arr 原始数组
 * @param {number[]} weight 权重数组，应保证权重数组的元素数量不小于原始数组的元素数量
 * @returns {T} 选取的结果
 */
function randomizeWeight(arr, weight) {
    if (!arr || !weight)
        throw new Error("invalid argument");
    if (weight.length < arr.length)
        throw new Error("权重数组的元素数量不应小于原始数组的元素数量");
    // 根据权重数组建立一个区间数组
    var regions = [];
    var sum = 0;
    for (var i in arr) {
        sum += weight[i];
        regions.push(sum);
    }
    // 随机一个位置
    var ran = Math.random() * sum;
    // 搜索该位置所属区间索引
    var index;
    for (var i = 0, len = regions.length; i < len; i++) {
        if (ran < regions[i]) {
            index = i;
            break;
        }
    }
    // 返回索引处的原始数组元素
    return arr[index];
}
/**
 * 数组去重，不会修改原数组
 *
 * @export
 * @param {any[]} list
 * @returns {any[]}
 */
function unique(list) {
    if (!list)
        return list;
    // 初始化
    var hash = new __WEBPACK_IMPORTED_MODULE_0__Dictionary__["a" /* default */](), result = [];
    // 遍历当前数组
    for (var i = 0, len = list.length; i < len; i++) {
        // 如果hash表中没有当前项
        if (!hash.get(list[i])) {
            // 存入hash表
            hash.set(list[i], true);
            // 把当前数组的当前项push到临时数组里面
            result.push(list[i]);
        }
    }
    return result;
}


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DataType__ = __webpack_require__(44);


var ResponseData = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](ResponseData, _super);
    function ResponseData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResponseData;
}(__WEBPACK_IMPORTED_MODULE_1__DataType__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (ResponseData);


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-11
 * @modify date 2017-09-11
 *
 * 请求或返回数据结构体
*/
var DataType = /** @class */ (function () {
    function DataType() {
    }
    /**
     * 解析后端返回的JSON对象，生成结构体
     *
     * @param {any} data 后端返回的JSON对象
     * @returns {DataType} 结构体对象
     * @memberof DataType
     */
    DataType.prototype.parse = function (data) {
        this.__rawData = this.doParse(data);
        return this;
    };
    return DataType;
}());
/* harmony default export */ __webpack_exports__["default"] = (DataType);


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["pushCompileCommand"] = pushCompileCommand;
/* harmony export (immutable) */ __webpack_exports__["unshiftCompileCommand"] = unshiftCompileCommand;
/* harmony export (immutable) */ __webpack_exports__["compile"] = compile;
/* harmony export (immutable) */ __webpack_exports__["compileValue"] = compileValue;
/* harmony export (immutable) */ __webpack_exports__["compileExp"] = compileExp;
/* harmony export (immutable) */ __webpack_exports__["compileFunc"] = compileFunc;
/* harmony export (immutable) */ __webpack_exports__["compileOn"] = compileOn;
/* harmony export (immutable) */ __webpack_exports__["compileIf"] = compileIf;
/* harmony export (immutable) */ __webpack_exports__["compileFor"] = compileFor;
/* harmony export (immutable) */ __webpack_exports__["compileMessage"] = compileMessage;
/* harmony export (immutable) */ __webpack_exports__["compileResponse"] = compileResponse;
/* harmony export (immutable) */ __webpack_exports__["searchUI"] = searchUI;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bind_BindManager__ = __webpack_require__(34);

function getBindParams(currentTarget) {
    var bindParams = currentTarget.__bind_commands__;
    if (!bindParams) {
        bindParams = [];
        Object.defineProperty(currentTarget, "__bind_commands__", {
            configurable: true,
            enumerable: false,
            writable: true,
            value: bindParams
        });
    }
    return bindParams;
}
/**
 * 添加编译命令到显示对象上（正向）
 *
 * @export
 * @param {ICompileTarget} currentTarget 显示对象
 * @param {*} target 编译命令本来所在的对象
 * @param {IBindCommand} cmd 命令函数
 * @param {...any[]} args 命令参数列表
 */
function pushCompileCommand(currentTarget, target, cmd) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    // 添加编译指令
    getBindParams(currentTarget).push({ cmd: cmd, target: target, args: args });
}
/**
 * 添加编译命令到显示对象上（反向）
 *
 * @export
 * @param {ICompileTarget} currentTarget 显示对象
 * @param {*} target 编译命令本来所在的对象
 * @param {IBindCommand} cmd 命令函数
 * @param {...any[]} args 命令参数列表
 */
function unshiftCompileCommand(currentTarget, target, cmd) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    getBindParams(currentTarget).unshift({ cmd: cmd, target: target, args: args });
}
/**
 * 编译显示对象，会先编译自身，然后再递归编译子对象
 *
 * @export
 * @param {IMediator} mediator 显示对象所属的中介者
 * @param {ICompileTarget} currentTarget 显示对象
 * @param {any[]} [envModels] 环境变量数组
 */
function compile(mediator, currentTarget, envModels) {
    // 取到编译参数列表
    var bindParams = currentTarget.__bind_commands__;
    // 编译currentTarget自身
    if (bindParams) {
        // 这里没有提前读取出length属性，因为需要动态判断数组长度
        for (var i = 0; i < bindParams.length;) {
            // 使用shift按顺序取出编译命令
            var params = bindParams.shift();
            // 调用编译命令，并且更新中止状态
            params.cmd.apply(params, [mediator, currentTarget, params.target, envModels || []].concat(params.args));
        }
    }
}
/**
 * 编译bindValue命令，不会中止编译
 */
function compileValue(mediator, currentTarget, target, envModels, name, exp) {
    __WEBPACK_IMPORTED_MODULE_0__bind_BindManager__["a" /* bindManager */].bindValue(mediator, currentTarget, target, envModels, name, exp);
}
/**
 * 编译bindExp命令，不会中止编译
 */
function compileExp(mediator, currentTarget, target, envModels, exp) {
    __WEBPACK_IMPORTED_MODULE_0__bind_BindManager__["a" /* bindManager */].bindExp(mediator, currentTarget, target, envModels, exp);
}
/**
 * 编译bindFunc命令，不会中止编译
 */
function compileFunc(mediator, currentTarget, target, envModels, name) {
    var argExps = [];
    for (var _i = 5; _i < arguments.length; _i++) {
        argExps[_i - 5] = arguments[_i];
    }
    __WEBPACK_IMPORTED_MODULE_0__bind_BindManager__["a" /* bindManager */].bindFunc.apply(__WEBPACK_IMPORTED_MODULE_0__bind_BindManager__["a" /* bindManager */], [mediator, currentTarget, target, envModels, name].concat(argExps));
}
/**
 * 编译bindOn命令，不会中止编译
 */
function compileOn(mediator, currentTarget, target, envModels, type, exp) {
    __WEBPACK_IMPORTED_MODULE_0__bind_BindManager__["a" /* bindManager */].bindOn(mediator, currentTarget, target, envModels, type, exp);
}
function isPosterity(mediator, target, parent) {
    var tempParent = mediator.bridge.getParent(target);
    if (!tempParent)
        return false;
    else if (tempParent === parent)
        return true;
    else
        return isPosterity(mediator, tempParent, parent);
}
function getAllSubTargets(mediator, target) {
    var bindTargets = mediator.bindTargets;
    var subTargets = [];
    for (var _i = 0, bindTargets_1 = bindTargets; _i < bindTargets_1.length; _i++) {
        var bindTarget = bindTargets_1[_i];
        bindTarget && bindTarget.forEach(function (tempTarget) {
            if (isPosterity(mediator, tempTarget, target))
                subTargets.push(tempTarget);
        });
    }
    return subTargets;
}
/**
 * 编译bindIf命令，会中止编译，直到判断条件为true时才会启动以继续编译
 */
function compileIf(mediator, currentTarget, target, envModels, exp) {
    // 将后面的编译命令缓存起来
    var bindParams = currentTarget.__bind_commands__;
    var caches = [{ target: currentTarget, params: bindParams.splice(0, bindParams.length) }];
    // 后代节点的也要缓存住
    var subTargets = getAllSubTargets(mediator, currentTarget);
    for (var _i = 0, subTargets_1 = subTargets; _i < subTargets_1.length; _i++) {
        var subTarget = subTargets_1[_i];
        var subBindParams = subTarget.__bind_commands__;
        caches.push({ target: subTarget, params: subBindParams.splice(0, subBindParams.length) });
    }
    // 绑定if命令
    var terminated = false;
    __WEBPACK_IMPORTED_MODULE_0__bind_BindManager__["a" /* bindManager */].bindIf(mediator, currentTarget, target, envModels, exp, function (value) {
        // 如果条件为true，则启动继续编译，但只编译一次，编译过就不需要再编译了
        if (!terminated && value) {
            // 恢复后面的命令
            for (var _i = 0, caches_1 = caches; _i < caches_1.length; _i++) {
                var cache = caches_1[_i];
                cache.target.__bind_commands__ = cache.params;
                // 继续编译
                compile(mediator, cache.target, envModels);
            }
            // 设置已终结标识
            terminated = true;
        }
    });
}
/**
 * 编译bindFor命令，会中止编译，直到生成新的renderer实例时才会继续编译新实例
 */
function compileFor(mediator, currentTarget, target, envModels, exp, mediatorCls) {
    // 将后面的编译命令缓存起来
    var leftHandlers = target.__stop_left_handlers__;
    // 绑定for命令
    __WEBPACK_IMPORTED_MODULE_0__bind_BindManager__["a" /* bindManager */].bindFor(mediator, currentTarget, target, envModels, exp, mediatorCls, function (data, renderer, subEnvModels) {
        var subLeftHandlers = leftHandlers.concat();
        var bindTargets = [];
        // 针对每一个renderer赋值后续编译指令
        for (var _i = 0, subLeftHandlers_1 = subLeftHandlers; _i < subLeftHandlers_1.length; _i++) {
            var leftHandler = subLeftHandlers_1[_i];
            leftHandler(renderer, bindTargets, subLeftHandlers);
        }
        // 编译renderer实例
        for (var depth in bindTargets) {
            var dict = bindTargets[depth];
            dict.forEach(function (currentTarget) { return compile(mediator, currentTarget, subEnvModels); });
        }
    });
}
/**
 * 编译bindMessage命令，不会中止编译
 */
function compileMessage(mediator, currentTarget, target, envModels, type, name, exp, observable) {
    __WEBPACK_IMPORTED_MODULE_0__bind_BindManager__["a" /* bindManager */].bindMessage(mediator, currentTarget, target, envModels, type, name, exp, observable);
}
/**
 * 编译bindResponse命令，不会中止编译
 */
function compileResponse(mediator, currentTarget, target, envModels, type, name, exp, observable) {
    __WEBPACK_IMPORTED_MODULE_0__bind_BindManager__["a" /* bindManager */].bindResponse(mediator, currentTarget, target, envModels, type, name, exp, observable);
}
/**
 * 搜索UI，取到目标节点，执行回调
 *
 * @export
 * @param {*} values 值结构字典
 * @param {*} ui ui实体
 * @param {(ui:any, key:string, value:any, depth?:number)=>void} callback 回调
 * @param {number} [depth=0] 遍历深度，方法会继续增加这个深度
 */
function searchUI(values, ui, callback, depth) {
    if (depth === void 0) { depth = 0; }
    for (var key in values) {
        var value = values[key];
        var index = key.indexOf(".");
        if (index >= 0) {
            // 是表达式寻址，递归寻址
            var newValue = {};
            newValue[key.substr(index + 1)] = value;
            searchUI(newValue, ui[key.substring(0, index)], callback, depth + 1);
        }
        else if (typeof value == "object" && !(value instanceof Array)) {
            // 是子对象寻址，递归寻址
            searchUI(value, ui[key], callback, depth + 1);
        }
        else {
            // 是表达式，调用回调，将调用层级也传递回去
            callback(ui, key, value, depth);
        }
    }
}


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_Core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AudioMessage__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__env_Environment__ = __webpack_require__(5);



/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-10-30
 * @modify date 2017-10-30
 *
 * 使用Audio标签实现IAudio接口的实现类
*/
var AudioTagImpl = /** @class */ (function () {
    function AudioTagImpl() {
        this._mute = false;
        this._playingDict = {};
        this._audioCache = {};
    }
    Object.defineProperty(AudioTagImpl.prototype, "mute", {
        /**
         * 静音状态
         *
         * @type {boolean}
         * @memberof AudioTagImpl
         */
        get: function () {
            return this._mute;
        },
        set: function (value) {
            this._mute = value;
            // 静音，暂停所有声音
            for (var url in this._playingDict) {
                if (value) {
                    // 静音，停止音频，不可调用stop方法，因为要保持播放中的音频状态
                    this._doStop(url);
                }
                else {
                    // 非静音，播放音频
                    var params = this._playingDict[url];
                    this.play(params);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 加载音频
     *
     * @param {string} url 音频地址
     * @memberof AudioTagImpl
     */
    AudioTagImpl.prototype.load = function (url) {
        var toUrl = __WEBPACK_IMPORTED_MODULE_2__env_Environment__["environment"].toCDNHostURL(url);
        // 尝试获取缓存数据
        var data = this._audioCache[toUrl];
        // 如果没有缓存才去加载
        if (!data) {
            // 使用Audio标签加载
            var node = document.createElement("audio");
            // 这里强制使用autoplay，因为在IOS的safari上如果没这个参数，则根本不会触发onloadeddata事件
            node.autoplay = true;
            node.src = toUrl;
            // 保存数据
            this._audioCache[toUrl] = data = { node: node, status: AudioStatus.LOADING, playParams: null };
            // 监听加载
            node.onloadeddata = function () {
                // 记录加载完毕
                data.status = AudioStatus.PAUSED;
                // 如果不自动播放则暂停
                if (!data.playParams)
                    node.pause();
            };
            node.onended = function () {
                // 派发播放完毕事件
                __WEBPACK_IMPORTED_MODULE_0__core_Core__["a" /* core */].dispatch(__WEBPACK_IMPORTED_MODULE_1__AudioMessage__["a" /* default */].AUDIO_PLAY_ENDED, url);
            };
        }
    };
    /**
     * 播放音频，如果音频没有加载则先加载再播放
     *
     * @param {AudioPlayParams} params 音频播放参数
     * @returns {void}
     * @memberof AudioTagImpl
     */
    AudioTagImpl.prototype.play = function (params) {
        var toUrl = __WEBPACK_IMPORTED_MODULE_2__env_Environment__["environment"].toCDNHostURL(params.url);
        // 尝试获取缓存数据
        var data = this._audioCache[toUrl];
        if (!data) {
            // 没有加载过，开始加载音频
            this.load(params.url);
            // 设置播放参数
            this._audioCache[toUrl].playParams = params;
        }
        else {
            switch (data.status) {
                case AudioStatus.LOADING:
                    // 正在加载中，替换自动播放参数
                    data.playParams = params;
                    break;
                case AudioStatus.PLAYING:
                    // 正在播放，关闭后再播放
                    this.stop(params.url);
                    this.play(params);
                    break;
                case AudioStatus.PAUSED:
                    // 已经加载完毕，暂停中，直接播放
                    if (params.stopOthers)
                        this.stopAll();
                    if (params.loop != null)
                        data.node.loop = params.loop;
                    if (params.time != null)
                        data.node.currentTime = params.time * 0.001;
                    // 监听播放进度
                    data.node.ontimeupdate = function (evt) {
                        // 只有播放状态可以派发PROGRESS事件
                        if (data.status == AudioStatus.PLAYING) {
                            // 我们规定使用毫秒值作为单位
                            var curTime = data.node.currentTime * 1000;
                            var totalTime = data.node.duration * 1000;
                            // 派发播放进度事件
                            __WEBPACK_IMPORTED_MODULE_0__core_Core__["a" /* core */].dispatch(__WEBPACK_IMPORTED_MODULE_1__AudioMessage__["a" /* default */].AUDIO_PLAY_PROGRESS, params.url, curTime, totalTime);
                        }
                    };
                    // 开始播放，safari不支持直接play(WTF?)所以要用autoplay加load进行播放
                    data.node.autoplay = true;
                    data.node.load();
                    // 设置状态
                    data.status = AudioStatus.PLAYING;
                    // 记录播放中
                    this._playingDict[toUrl] = params;
                    // 派发播放开始事件
                    __WEBPACK_IMPORTED_MODULE_0__core_Core__["a" /* core */].dispatch(__WEBPACK_IMPORTED_MODULE_1__AudioMessage__["a" /* default */].AUDIO_PLAY_STARTED, params.url);
                    break;
            }
        }
    };
    AudioTagImpl.prototype._doStop = function (url, time) {
        var toUrl = __WEBPACK_IMPORTED_MODULE_2__env_Environment__["environment"].toCDNHostURL(url);
        var data = this._audioCache[toUrl];
        if (data) {
            data.node.autoplay = false;
            data.node.pause();
            // 设置停止时间
            if (time != null)
                data.node.currentTime = time * 0.001;
            // 设置状态
            data.status = AudioStatus.PAUSED;
            // 派发播放停止事件
            __WEBPACK_IMPORTED_MODULE_0__core_Core__["a" /* core */].dispatch(__WEBPACK_IMPORTED_MODULE_1__AudioMessage__["a" /* default */].AUDIO_PLAY_STOPPED, url);
        }
    };
    /**
     * 暂停音频（不会重置进度）
     *
     * @param {string} url 音频URL
     * @memberof AudioTagImpl
     */
    AudioTagImpl.prototype.pause = function (url) {
        this._doStop(url);
        // 移除播放中
        var toUrl = __WEBPACK_IMPORTED_MODULE_2__env_Environment__["environment"].toCDNHostURL(url);
        delete this._playingDict[toUrl];
    };
    /**
     * 停止音频（会重置进度）
     *
     * @param {string} url 音频URL
     * @memberof AudioTagImpl
     */
    AudioTagImpl.prototype.stop = function (url) {
        this._doStop(url, 0);
        // 移除播放中
        var toUrl = __WEBPACK_IMPORTED_MODULE_2__env_Environment__["environment"].toCDNHostURL(url);
        delete this._playingDict[toUrl];
    };
    /**
     * 停止所有音频
     *
     * @memberof AudioTagImpl
     */
    AudioTagImpl.prototype.stopAll = function () {
        for (var url in this._audioCache) {
            this.stop(url);
        }
    };
    /**
     * 跳转音频进度
     *
     * @param {string} url 音频URL
     * @param {number} time 要跳转到的音频位置，毫秒值
     * @memberof AudioTagImpl
     */
    AudioTagImpl.prototype.seek = function (url, time) {
        var data = this._audioCache[url];
        if (data)
            data.node.currentTime = time * 0.001;
    };
    return AudioTagImpl;
}());
/* harmony default export */ __webpack_exports__["a"] = (AudioTagImpl);
var AudioStatus;
(function (AudioStatus) {
    /**
     * 加载中
     */
    AudioStatus[AudioStatus["LOADING"] = 0] = "LOADING";
    /**
     * 已暂停
     */
    AudioStatus[AudioStatus["PAUSED"] = 1] = "PAUSED";
    /**
     * 播放中
     */
    AudioStatus[AudioStatus["PLAYING"] = 2] = "PLAYING";
})(AudioStatus || (AudioStatus = {}));


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-10-30
 * @modify date 2017-10-30
 *
 * 音频消息
*/
var AudioMessage = /** @class */ (function () {
    function AudioMessage() {
    }
    /**
     * 音频播放开始事件
     *
     * @static
     * @type {string}
     * @memberof AudioMessage
     */
    AudioMessage.AUDIO_PLAY_STARTED = "audioPlayStarted";
    /**
     * 音频播放停止事件
     *
     * @static
     * @type {string}
     * @memberof AudioMessage
     */
    AudioMessage.AUDIO_PLAY_STOPPED = "audioPlayStopped";
    /**
     * 音频播放完毕事件
     *
     * @static
     * @type {string}
     * @memberof AudioMessage
     */
    AudioMessage.AUDIO_PLAY_ENDED = "audioPlayEnded";
    /**
     * 音频播放进度事件
     *
     * @static
     * @type {string}
     * @memberof AudioMessage
     */
    AudioMessage.AUDIO_PLAY_PROGRESS = "audioPlayProgress";
    return AudioMessage;
}());
/* harmony default export */ __webpack_exports__["a"] = (AudioMessage);


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2018-01-08
 * @modify date 2018-01-08
 *
 * 引擎消息类型
*/
var EngineMessage = /** @class */ (function () {
    function EngineMessage() {
    }
    /**
     * 引擎初始化完毕消息
     *
     * @static
     * @type {string}
     * @memberof EngineMessage
     */
    EngineMessage.INITIALIZED = "initialized";
    return EngineMessage;
}());
/* harmony default export */ __webpack_exports__["a"] = (EngineMessage);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2), __webpack_require__(50), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Injector_1, Hash_1, Injector_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IFuckModel = /** @class */ (function () {
        function IFuckModel() {
        }
        Object.defineProperty(IFuckModel.prototype, "fuck", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        return IFuckModel;
    }());
    exports.IFuckModel = IFuckModel;
    var FuckModel = /** @class */ (function () {
        function FuckModel() {
            this._fuck = "Fuck";
            this.shit = "Shit";
            console.log("Fuck Model Constructed!");
        }
        Object.defineProperty(FuckModel.prototype, "fuck", {
            get: function () {
                return this._fuck;
            },
            set: function (value) {
                this._fuck = value;
            },
            enumerable: true,
            configurable: true
        });
        FuckModel.prototype.fuckYou = function () {
            return "Oye!";
        };
        __decorate([
            Injector_1.Inject,
            __metadata("design:type", Hash_1.default)
        ], FuckModel.prototype, "hash", void 0);
        FuckModel = __decorate([
            Injector_2.ModelClass(1, IFuckModel),
            __metadata("design:paramtypes", [])
        ], FuckModel);
        return FuckModel;
    }());
    exports.default = FuckModel;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRnVja01vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRnVja01vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUlBO1FBQUE7UUFNQSxDQUFDO1FBSkcsc0JBQVcsNEJBQUk7aUJBQWY7Z0JBRUksTUFBTSxDQUFDLElBQUksQ0FBQztZQUNoQixDQUFDOzs7V0FBQTtRQUNMLGlCQUFDO0lBQUQsQ0FBQyxBQU5ELElBTUM7SUFOWSxnQ0FBVTtJQVN2QjtRQWlCSTtZQVpRLFVBQUssR0FBVSxNQUFNLENBQUM7WUFVdkIsU0FBSSxHQUFVLE1BQU0sQ0FBQztZQUl4QixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDM0MsQ0FBQztRQWRELHNCQUFXLDJCQUFJO2lCQUFmO2dCQUVJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RCLENBQUM7aUJBQ0QsVUFBZ0IsS0FBWTtnQkFFeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDdkIsQ0FBQzs7O1dBSkE7UUFhTSwyQkFBTyxHQUFkO1lBRUksTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBdEJEO1lBREMsaUJBQU07c0NBQ00sY0FBSTsrQ0FBQztRQUhELFNBQVM7WUFEN0IscUJBQVUsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDOztXQUNMLFNBQVMsQ0EwQjdCO1FBQUQsZ0JBQUM7S0FBQSxBQTFCRCxJQTBCQztzQkExQm9CLFNBQVMifQ==

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hash", function() { return hash; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_injector_Injector__ = __webpack_require__(2);



/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-06
 * @modify date 2017-09-06
 *
 * Hash类是地址路由（网页哈希）管理器，规定哈希格式为：#[模块名]?[参数名]=[参数值]&[参数名]=[参数值]&...
*/
var Hash = /** @class */ (function () {
    function Hash() {
        this._keepHash = false;
        this._hash = window.location.hash;
        this._moduleDataDict = {};
        this._moduleDatas = [];
        var reg = /#([^\?&#]+)?(\?([^\?&=#]+=[^\?&=#]+)(&([^\?&=#]+=[^\?&=#]+))*)?/g;
        var result;
        while (result = reg.exec(this._hash)) {
            var data = {
                name: result[1],
                params: {},
                direct: false
            };
            // 解析模块参数
            var paramsStr = result[2];
            if (paramsStr != null) {
                paramsStr = paramsStr.substr(1);
                var params = paramsStr.split("&");
                for (var i = 0, len = params.length; i < len; i++) {
                    var pair = params[i];
                    if (pair != null) {
                        var temp = pair.split("=");
                        // 键和值都要做一次URL解码
                        var key = decodeURIComponent(temp[0]);
                        var value = decodeURIComponent(temp[1]);
                        data.params[key] = value;
                    }
                }
            }
            // 处理direct参数
            data.direct = (data.params.direct == "true");
            delete data.params.direct;
            // 处理keepHash参数
            this._keepHash = this._keepHash || (data.params.keepHash == "true");
            delete data.params.keepHash;
            // 记录模块跳转数据
            this._moduleDataDict[data.name] = data;
            this._moduleDatas.push(data);
        }
        // 如果keepHash不是true，则移除哈希值
        if (!this._keepHash) {
            // 要使用window.location.replace方法，不能直接设置hash属性，否则会产生历史记录
            var url = window.location.href;
            var index = url.indexOf("#");
            if (index >= 0)
                window.location.replace(url.substr(0, index + 1));
        }
    }
    Object.defineProperty(Hash.prototype, "hash", {
        /**
         * 获取原始的哈希字符串
         *
         * @readonly
         * @type {string}
         * @memberof Hash
         */
        get: function () {
            return this._hash;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hash.prototype, "moduleDatas", {
        /**
         * 获取模块跳转数据数组
         *
         * @readonly
         * @type {IHashModuleData[]}
         * @memberof Hash
         */
        get: function () {
            return this._moduleDatas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hash.prototype, "firstModuleParams", {
        /**
         * 获取传递给首模块的参数，首模块数据的传递方式为位于第一个#后且不填写模块名
         *
         * @readonly
         * @type {*}
         * @memberof Hash
         */
        get: function () {
            var data = this._moduleDatas[0];
            if (!data)
                return undefined;
            // 如果传递的第一个模块有名字，则不认为是传递给首模块的
            return (data.name ? undefined : data.params);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hash.prototype, "keepHash", {
        /**
         * 获取是否保持哈希值
         *
         * @readonly
         * @type {boolean}
         * @memberof Hash
         */
        get: function () {
            return this._keepHash;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取指定哈希参数
     *
     * @param {string} key 参数名
     * @param {string} [moduleName] 参数所属模块名，不传则获取第一个模块的参数
     * @returns {string} 参数值
     * @memberof Hash
     */
    Hash.prototype.getParam = function (key, moduleName) {
        var data = (moduleName ? this._moduleDataDict[moduleName] : this._moduleDatas[0]);
        return (data && data.params[key]);
    };
    Hash = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
        __WEBPACK_IMPORTED_MODULE_2__core_injector_Injector__["Injectable"],
        __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [])
    ], Hash);
    return Hash;
}());
/* harmony default export */ __webpack_exports__["default"] = (Hash);
/** 再额外导出一个单例 */
var hash = __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].getInject(Hash);


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(76), __webpack_require__(43), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Test_1, ResponseData_1, NetManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @author TemplateGenerator
     * @email initial_r@qq.com
     * @modify date 10/9/2017
     *
     * 测试
    */
    var TestResponse = /** @class */ (function (_super) {
        __extends(TestResponse, _super);
        function TestResponse() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(TestResponse.prototype, "__params", {
            get: function () {
                return {
                    type: "Test",
                    protocol: "http",
                    method: "GET"
                };
            },
            enumerable: true,
            configurable: true
        });
        ;
        TestResponse.prototype.doParse = function (data) {
            if (data == null)
                return;
            this.__params.success = data.success;
            this.test = new Test_1.default().parse(data.test);
        };
        TestResponse.prototype.pack = function () {
            return {
                test: this.test.pack()
            };
        };
        TestResponse.type = "Test";
        return TestResponse;
    }(ResponseData_1.default));
    exports.default = TestResponse;
    /** 注册返回体 */
    NetManager_1.netManager.registerResponse(TestResponse);
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdFJlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVGVzdFJlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFJQTs7Ozs7O01BTUU7SUFDRjtRQUEwQyxnQ0FBWTtRQUF0RDs7UUFrQ0EsQ0FBQztRQXhCRyxzQkFBVyxrQ0FBUTtpQkFBbkI7Z0JBRUksTUFBTSxDQUFDO29CQUNILElBQUksRUFBRSxNQUFNO29CQUNaLFFBQVEsRUFBRSxNQUFNO29CQUNoQixNQUFNLEVBQUUsS0FBSztpQkFDaEIsQ0FBQztZQUNOLENBQUM7OztXQUFBO1FBQUEsQ0FBQztRQUlRLDhCQUFPLEdBQWpCLFVBQWtCLElBQVE7WUFFdEIsRUFBRSxDQUFBLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztnQkFBQyxNQUFNLENBQUM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFTLElBQUksY0FBSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBRU0sMkJBQUksR0FBWDtZQUVJLE1BQU0sQ0FBQztnQkFDSCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7YUFDekIsQ0FBQztRQUNOLENBQUM7UUFkYSxpQkFBSSxHQUFVLE1BQU0sQ0FBQztRQWV2QyxtQkFBQztLQUFBLEFBbENELENBQTBDLHNCQUFZLEdBa0NyRDtzQkFsQ29CLFlBQVk7SUFvQ2pDLFlBQVk7SUFDWix1QkFBVSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDIn0=

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(14), __webpack_require__(7), __webpack_require__(53), __webpack_require__(78), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, SceneMediator_1, Injector_1, Injector_2, TestComp_1, ModuleManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @author Raykid
     * @email initial_r@qq.com
     * @create date 2017-09-18
     * @modify date 2017-09-18
     *
     * 测试第二个模块
    */
    var Second = /** @class */ (function (_super) {
        __extends(Second, _super);
        function Second() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Second.prototype.listAssets = function () {
            return ["preload"];
        };
        Second.prototype.onOpen = function () {
            var _this = this;
            this.mapListener(this.btn, egret.TouchEvent.TOUCH_TAP, function () {
                // moduleManager.close(Second);
                _this.dispatch("FuckMsg", "Shit!!!");
            });
            this.viewModel = {
                onMsg: function (msg) {
                    // 表达式里使用函数可以在函数里执行复杂逻辑，并且具有代码提示
                    console.log(msg);
                    ModuleManager_1.moduleManager.close(_this);
                    return msg + " - 1";
                },
                fuck: "you",
                fuckList: ["fuck", "shit", "you", "!!!"]
            };
            // 测试消息
            this.dispatch("fuck", 123);
        };
        Second.prototype.onFuck = function (a) {
            console.log("message at Second: " + a);
        };
        Second.prototype.onTestCompMsg = function () {
            console.log("TestCompMsg Received");
        };
        Second.prototype.onTestCompMsgGlobal = function () {
            console.log("TestCompMsg Received Global");
        };
        Second.moduleName = "Second";
        __decorate([
            Injector_1.SubMediator,
            __metadata("design:type", TestComp_1.default)
        ], Second.prototype, "_testComp", void 0);
        __decorate([
            Injector_1.BindMessage("FuckMsg", { label: "onMsg($arguments[0])" }),
            Injector_1.BindFunc("getCurrentState", ["fuck", "onMsg", undefined]),
            __metadata("design:type", eui.Button)
        ], Second.prototype, "btn", void 0);
        __decorate([
            Injector_1.BindFor("i of fuckList.concat(fuckList).concat(fuckList).concat(fuckList)"),
            Injector_1.BindValue("txt.text", function (scope) {
                return scope.i;
            }),
            Injector_1.BindFor("lst", "j of fuckList"),
            Injector_1.BindValue({
                txt: {
                    text: "'i=' + i + ' & ' + 'j=' + j"
                }
            }),
            __metadata("design:type", eui.DataGroup)
        ], Second.prototype, "lst", void 0);
        __decorate([
            Injector_1.MessageHandler("fuck"),
            Injector_1.GlobalMessageHandler("fuck"),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], Second.prototype, "onFuck", null);
        __decorate([
            Injector_1.MessageHandler("TestCompMsg"),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], Second.prototype, "onTestCompMsg", null);
        __decorate([
            Injector_1.GlobalMessageHandler("TestCompMsg"),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], Second.prototype, "onTestCompMsgGlobal", null);
        Second = __decorate([
            Injector_2.EgretMediatorClass("Second", "Fuck2Skin")
        ], Second);
        return Second;
    }(SceneMediator_1.default));
    exports.default = Second;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vjb25kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2Vjb25kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFNQTs7Ozs7OztNQU9FO0lBR0Y7UUFBb0MsMEJBQWE7UUFBakQ7O1FBa0VBLENBQUM7UUE1Q1UsMkJBQVUsR0FBakI7WUFFSSxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QixDQUFDO1FBRU0sdUJBQU0sR0FBYjtZQUFBLGlCQW1CQztZQWpCRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUU7Z0JBQ25ELCtCQUErQjtnQkFFL0IsS0FBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDeEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsU0FBUyxHQUFHO2dCQUNiLEtBQUssRUFBRSxVQUFBLEdBQUc7b0JBQ04sZ0NBQWdDO29CQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNqQiw2QkFBYSxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsQ0FBQztvQkFDMUIsTUFBTSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7Z0JBQ3hCLENBQUM7Z0JBQ0QsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO2FBQzNDLENBQUM7WUFDRixPQUFPO1lBQ1AsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUlPLHVCQUFNLEdBQWQsVUFBZSxDQUFDO1lBRVosT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBR08sOEJBQWEsR0FBckI7WUFFSSxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUdPLG9DQUFtQixHQUEzQjtZQUVJLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBL0RhLGlCQUFVLEdBQVUsUUFBUSxDQUFDO1FBRzNDO1lBREMsc0JBQVc7c0NBQ00sa0JBQVE7aURBQUM7UUFJM0I7WUFGQyxzQkFBVyxDQUFDLFNBQVMsRUFBRSxFQUFDLEtBQUssRUFBRSxzQkFBc0IsRUFBQyxDQUFDO1lBQ3ZELG1CQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO3NDQUMvQyxHQUFHLENBQUMsTUFBTTsyQ0FBQztRQVd0QjtZQVZDLGtCQUFPLENBQUMsa0VBQWtFLENBQUM7WUFDM0Usb0JBQVMsQ0FBQyxVQUFVLEVBQUUsVUFBUyxLQUFTO2dCQUNyQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUM7WUFDRCxrQkFBTyxDQUFDLEtBQUssRUFBRSxlQUFlLENBQUM7WUFDL0Isb0JBQVMsQ0FBQztnQkFDUCxHQUFHLEVBQUU7b0JBQ0QsSUFBSSxFQUFFLDZCQUE2QjtpQkFDdEM7YUFDSixDQUFDO3NDQUNTLEdBQUcsQ0FBQyxTQUFTOzJDQUFDO1FBOEJ6QjtZQUZDLHlCQUFjLENBQUMsTUFBTSxDQUFDO1lBQ3RCLCtCQUFvQixDQUFDLE1BQU0sQ0FBQzs7Ozs0Q0FJNUI7UUFHRDtZQURDLHlCQUFjLENBQUMsYUFBYSxDQUFDOzs7O21EQUk3QjtRQUdEO1lBREMsK0JBQW9CLENBQUMsYUFBYSxDQUFDOzs7O3lEQUluQztRQWpFZ0IsTUFBTTtZQUQxQiw2QkFBa0IsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDO1dBQ3JCLE1BQU0sQ0FrRTFCO1FBQUQsYUFBQztLQUFBLEFBbEVELENBQW9DLHVCQUFhLEdBa0VoRDtzQkFsRW9CLE1BQU0ifQ==

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["EgretSkin"] = EgretSkin;
/* harmony export (immutable) */ __webpack_exports__["EgretMediatorClass"] = EgretMediatorClass;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_olympus_r_utils_ConstructUtil__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_olympus_r_engine_injector_Injector__ = __webpack_require__(7);


/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-10-09
 * @modify date 2017-10-09
 *
 * 负责注入的模块
*/
function EgretSkin(skin) {
    return function (cls) {
        // 监听类型实例化，转换皮肤格式
        Object(__WEBPACK_IMPORTED_MODULE_0_olympus_r_utils_ConstructUtil__["c" /* listenConstruct */])(cls, function (mediator) { return mediator.skin = skin; });
    };
}
function EgretMediatorClass(moduleName, skin) {
    return function (cls) {
        // 调用MediatorClass方法
        cls = Object(__WEBPACK_IMPORTED_MODULE_1_olympus_r_engine_injector_Injector__["MediatorClass"])(moduleName)(cls);
        // 监听类型实例化，转换皮肤格式
        Object(__WEBPACK_IMPORTED_MODULE_0_olympus_r_utils_ConstructUtil__["c" /* listenConstruct */])(cls, function (mediator) { return mediator.skin = skin; });
        // 返回结果类型
        return cls;
    };
}


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(7), __webpack_require__(80), __webpack_require__(18), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Injector_1, PanelMediator_1, Injector_2, ModuleManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TestPanel = /** @class */ (function (_super) {
        __extends(TestPanel, _super);
        function TestPanel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TestPanel_1 = TestPanel;
        TestPanel.prototype.onOpen = function () {
            this.viewModel = {
                onClick: function () {
                    ModuleManager_1.moduleManager.close(TestPanel_1);
                }
            };
        };
        TestPanel.moduleName = "TestPanel";
        __decorate([
            Injector_1.BindOn("click", "onClick"),
            __metadata("design:type", HTMLElement)
        ], TestPanel.prototype, "skin", void 0);
        TestPanel = TestPanel_1 = __decorate([
            Injector_2.DOMMediatorClass("TestPanel", "\n    <div style=\"background:#ffffff; width:400px; height: 250px;\">\n        jlk124kl1j2\n    </div>\n")
        ], TestPanel);
        return TestPanel;
        var TestPanel_1;
    }(PanelMediator_1.default));
    exports.default = TestPanel;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdFBhbmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVGVzdFBhbmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFVQTtRQUF1Qyw2QkFBYTtRQUFwRDs7UUFlQSxDQUFDO3NCQWZvQixTQUFTO1FBT25CLDBCQUFNLEdBQWI7WUFFSSxJQUFJLENBQUMsU0FBUyxHQUFHO2dCQUNiLE9BQU8sRUFBRTtvQkFDTCw2QkFBYSxDQUFDLEtBQUssQ0FBQyxXQUFTLENBQUMsQ0FBQztnQkFDbkMsQ0FBQzthQUNKLENBQUM7UUFDTixDQUFDO1FBWmEsb0JBQVUsR0FBVSxXQUFXLENBQUM7UUFHOUM7WUFEQyxpQkFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7c0NBQ2YsV0FBVzsrQ0FBQztRQUxQLFNBQVM7WUFMN0IsMkJBQWdCLENBQUMsV0FBVyxFQUFFLDBHQUk5QixDQUFDO1dBQ21CLFNBQVMsQ0FlN0I7UUFBRCxnQkFBQzs7S0FBQSxBQWZELENBQXVDLHVCQUFhLEdBZW5EO3NCQWZvQixTQUFTIn0=

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/// <reference types="olympus-r"/>
/// <reference types="olympus-r-dom"/>
/// <reference types="olympus-r-egret"/>
/// <reference path="./egret/libs/modules/egret/egret.d.ts"/>
/// <reference path="./egret/libs/modules/res/res.d.ts"/>
/// <reference path="./egret/libs/modules/eui/eui.d.ts"/>
/// <reference path="./egret/libs/modules/tween/tween.d.ts"/>
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(56), __webpack_require__(82), __webpack_require__(5), __webpack_require__(26), __webpack_require__(28)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, First_1, Olympus_1, Environment_1, DOMBridge_1, EgretBridge_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @author Raykid
     * @email initial_r@qq.com
     * @create date 2017-08-31
     * @modify date 2017-09-01
     *
     * 测试项目
    */
    Olympus_1.default.startup({
        bridges: [
            new DOMBridge_1.default({
                container: "#rootDOM"
            }),
            new EgretBridge_1.default({
                width: 720,
                height: 1280,
                pathPrefix: "egret/",
                container: "#rootEgret",
                backgroundColor: 0,
            })
        ],
        firstModule: First_1.default,
        loadElement: "#loading",
        hostsDict: {
            dev: ["http://www.test.17zuoye.net/"],
            test: ["https://www.test.17zuoye.net/"],
            staging: ["https://www.staging.17zuoye.net/"],
            prod: ["https://www.17zuoye.com/"]
        },
        cdnsDict: {
            test: ["https://cdn-cnc.test.17zuoye.net/"],
            staging: ["https://cdn-cnc.staging.17zuoye.net/"],
            prod: ["https://cdn-cnc.17zuoye.com/"]
        },
        pathDict: {
            a: "test1.js",
            b: "test2.js"
        },
        preloads: ["a", "b"],
        onInited: function () {
            // bridgeManager.getBridge("Egret").defaultScenePolicy = none;
            console.log(Environment_1.environment.env, Environment_1.environment.getHost(), Environment_1.environment.curCDNHost);
        },
        onInitProgress: function (prg, step) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            console.log.apply(console, [prg, step].concat(args));
        }
    });
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0NBQWtDO0FBQ2xDLHNDQUFzQztBQUN0Qyx3Q0FBd0M7QUFDeEMsNkRBQTZEO0FBQzdELHlEQUF5RDtBQUN6RCx5REFBeUQ7QUFDekQsNkRBQTZEOzs7O0lBVzdEOzs7Ozs7O01BT0U7SUFDRixpQkFBTyxDQUFDLE9BQU8sQ0FBQztRQUNaLE9BQU8sRUFBRTtZQUNMLElBQUksbUJBQVMsQ0FBQztnQkFDVixTQUFTLEVBQUUsVUFBVTthQUN4QixDQUFDO1lBQ0YsSUFBSSxxQkFBVyxDQUFDO2dCQUNaLEtBQUssRUFBRSxHQUFHO2dCQUNWLE1BQU0sRUFBRSxJQUFJO2dCQUNaLFVBQVUsRUFBRSxRQUFRO2dCQUNwQixTQUFTLEVBQUUsWUFBWTtnQkFDdkIsZUFBZSxFQUFFLENBQUM7YUFFckIsQ0FBQztTQUNMO1FBQ0QsV0FBVyxFQUFFLGVBQUs7UUFDbEIsV0FBVyxFQUFFLFVBQVU7UUFDdkIsU0FBUyxFQUFFO1lBQ1AsR0FBRyxFQUFFLENBQUMsOEJBQThCLENBQUM7WUFDckMsSUFBSSxFQUFFLENBQUMsK0JBQStCLENBQUM7WUFDdkMsT0FBTyxFQUFFLENBQUMsa0NBQWtDLENBQUM7WUFDN0MsSUFBSSxFQUFFLENBQUMsMEJBQTBCLENBQUM7U0FDckM7UUFDRCxRQUFRLEVBQUU7WUFDTixJQUFJLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztZQUMzQyxPQUFPLEVBQUUsQ0FBQyxzQ0FBc0MsQ0FBQztZQUNqRCxJQUFJLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztTQUN6QztRQUNELFFBQVEsRUFBRTtZQUNOLENBQUMsRUFBRSxVQUFVO1lBQ2IsQ0FBQyxFQUFFLFVBQVU7U0FDaEI7UUFDRCxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ3BCLFFBQVEsRUFBRTtZQUVOLDhEQUE4RDtZQUM5RCxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUFXLENBQUMsR0FBRyxFQUFFLHlCQUFXLENBQUMsT0FBTyxFQUFFLEVBQUUseUJBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoRixDQUFDO1FBQ0QsY0FBYyxFQUFFLFVBQUMsR0FBVSxFQUFFLElBQWE7WUFBRSxjQUFPO2lCQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87Z0JBQVAsNkJBQU87O1lBQy9DLE9BQU8sQ0FBQyxHQUFHLE9BQVgsT0FBTyxHQUFLLEdBQUcsRUFBRSxJQUFJLFNBQUssSUFBSSxHQUFFO1FBQ3BDLENBQUM7S0FDSixDQUFDLENBQUMifQ==

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(18), __webpack_require__(2), __webpack_require__(72), __webpack_require__(7), __webpack_require__(10), __webpack_require__(16), __webpack_require__(14), __webpack_require__(49), __webpack_require__(75), __webpack_require__(51), __webpack_require__(52), __webpack_require__(79), __webpack_require__(81)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Injector_1, Injector_2, AudioManager_1, Injector_3, ModuleManager_1, ModuleMessage_1, SceneMediator_1, FuckModel_1, TestRequest_1, TestResponse_1, Second_1, TestForMediator_1, Third_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @author Raykid
     * @email initial_r@qq.com
     * @create date 2017-09-18
     * @modify date 2017-09-18
     *
     * 测试首个模块
    */
    var First = /** @class */ (function (_super) {
        __extends(First, _super);
        function First() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        First_1 = First;
        First.prototype.listAssets = function () {
            return ["./modules/test.html"];
        };
        First.prototype.listJsFiles = function () {
            return ["test1.js", "./test2.js"];
        };
        First.prototype.onOpen = function () {
            var _this = this;
            // this.mapListener(this.btn, "click", function():void
            // {
            //     this.txt.textContent = "Fuck you!!!";
            //     this.moduleManager.open(Second);
            // }, this);
            console.log(this.fuckModel1.fuck, this.fuckModel1 === this.fuckModel2, this.fuckModel1 === this.fuckModel3);
            this.viewModel = {
                fuckList: [1, 2, "shit", "you"],
                fuckText: "fuck you",
                onClickBtn: function () {
                    _this.viewModel.fuckText = "clicked";
                    // this.moduleManager.open(Second);
                    new Second_1.default().open();
                },
                onClickFuck: function () {
                    _this.moduleManager.open(Third_1.default);
                },
                fuckModel: this.fuckModel1
            };
            AudioManager_1.audioManager.playMusic({
                url: "./test.mp3"
            });
            setTimeout(function () {
                _this.viewModel.fuckText = "1234";
                // this.viewModel.fuckList = ["hello", "world"];
                _this.viewModel.fuckList.push("jfksdjlf");
                _this.fuckModel1.fuck = "You!!!";
            }, 3000);
            this.dispatch(new TestRequest_1.default());
        };
        First.prototype.onModuleChange = function (to, from) {
            if (to == First_1)
                console.log("change to first module!");
            else if (to == Second_1.default)
                console.log("change to second module!");
        };
        First.prototype.onResponse = function (res, req) {
            alert("123");
        };
        First.prototype.onFuck = function (a) {
            console.log("message at FirstModule: " + a);
        };
        First.moduleName = "First";
        __decorate([
            Injector_2.Inject,
            __metadata("design:type", ModuleManager_1.default)
        ], First.prototype, "moduleManager", void 0);
        __decorate([
            Injector_2.Inject,
            __metadata("design:type", FuckModel_1.default)
        ], First.prototype, "fuckModel1", void 0);
        __decorate([
            Injector_2.Inject,
            __metadata("design:type", FuckModel_1.IFuckModel)
        ], First.prototype, "fuckModel2", void 0);
        __decorate([
            Injector_2.Inject(1),
            __metadata("design:type", FuckModel_1.IFuckModel)
        ], First.prototype, "fuckModel3", void 0);
        __decorate([
            Injector_3.BindOn({ click: "onClickBtn" }),
            Injector_3.BindIf("fuckText == '1234'"),
            __metadata("design:type", HTMLElement)
        ], First.prototype, "btn", void 0);
        __decorate([
            Injector_3.BindFor("fuck of fuckList", TestForMediator_1.default),
            __metadata("design:type", HTMLElement)
        ], First.prototype, "txt", void 0);
        __decorate([
            Injector_3.BindOn("click", "onClickFuck"),
            Injector_3.BindValue("textContent", "fuckModel.fuck"),
            __metadata("design:type", HTMLElement)
        ], First.prototype, "fuck", void 0);
        __decorate([
            Injector_3.MessageHandler(ModuleMessage_1.default.MODULE_CHANGE),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object, Object]),
            __metadata("design:returntype", void 0)
        ], First.prototype, "onModuleChange", null);
        __decorate([
            Injector_3.ResponseHandler,
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [TestResponse_1.default, TestRequest_1.default]),
            __metadata("design:returntype", void 0)
        ], First.prototype, "onResponse", null);
        __decorate([
            Injector_3.MessageHandler("fuck"),
            Injector_3.GlobalMessageHandler("fuck"),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], First.prototype, "onFuck", null);
        First = First_1 = __decorate([
            Injector_1.DOMMediatorClass("First", "./modules/test.html")
        ], First);
        return First;
        var First_1;
    }(SceneMediator_1.default));
    exports.default = First;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlyc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJGaXJzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBY0E7Ozs7Ozs7TUFPRTtJQUdGO1FBQW1DLHlCQUFhO1FBQWhEOztRQXdGQSxDQUFDO2tCQXhGb0IsS0FBSztRQXNCZiwwQkFBVSxHQUFqQjtZQUVJLE1BQU0sQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUVNLDJCQUFXLEdBQWxCO1lBRUksTUFBTSxDQUFDLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFTSxzQkFBTSxHQUFiO1lBQUEsaUJBbUNDO1lBakNHLHNEQUFzRDtZQUN0RCxJQUFJO1lBQ0osNENBQTRDO1lBQzVDLHVDQUF1QztZQUN2QyxZQUFZO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxLQUFLLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFNUcsSUFBSSxDQUFDLFNBQVMsR0FBRztnQkFDYixRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUM7Z0JBQy9CLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixVQUFVLEVBQUU7b0JBQ1IsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO29CQUNwQyxtQ0FBbUM7b0JBQ25DLElBQUksZ0JBQU0sRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN4QixDQUFDO2dCQUNELFdBQVcsRUFBRTtvQkFDVCxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxlQUFLLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztnQkFDRCxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVU7YUFDN0IsQ0FBQztZQUVGLDJCQUFZLENBQUMsU0FBUyxDQUFDO2dCQUNuQixHQUFHLEVBQUUsWUFBWTthQUNwQixDQUFDLENBQUM7WUFFSCxVQUFVLENBQUM7Z0JBQ1AsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO2dCQUNqQyxnREFBZ0Q7Z0JBQ2hELEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDekMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1lBQ3BDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVULElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxxQkFBVyxFQUFFLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBR08sOEJBQWMsR0FBdEIsVUFBdUIsRUFBTSxFQUFFLElBQVE7WUFFbkMsRUFBRSxDQUFBLENBQUMsRUFBRSxJQUFJLE9BQUssQ0FBQztnQkFBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLEVBQUUsSUFBSSxnQkFBTSxDQUFDO2dCQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNsRSxDQUFDO1FBR08sMEJBQVUsR0FBbEIsVUFBbUIsR0FBZ0IsRUFBRSxHQUFlO1lBRWhELEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQixDQUFDO1FBSU8sc0JBQU0sR0FBZCxVQUFlLENBQUM7WUFFWixPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFyRmEsZ0JBQVUsR0FBVSxPQUFPLENBQUM7UUFHMUM7WUFEQyxpQkFBTTtzQ0FDZSx1QkFBYTtvREFBQztRQUVwQztZQURDLGlCQUFNO3NDQUNZLG1CQUFTO2lEQUFDO1FBRTdCO1lBREMsaUJBQU07c0NBQ1ksc0JBQVU7aURBQUM7UUFFOUI7WUFEQyxpQkFBTSxDQUFDLENBQUMsQ0FBQztzQ0FDUyxzQkFBVTtpREFBQztRQUk5QjtZQUZDLGlCQUFNLENBQUMsRUFBQyxLQUFLLEVBQUUsWUFBWSxFQUFDLENBQUM7WUFDN0IsaUJBQU0sQ0FBQyxvQkFBb0IsQ0FBQztzQ0FDbEIsV0FBVzswQ0FBQTtRQUV0QjtZQURDLGtCQUFPLENBQUMsa0JBQWtCLEVBQUUseUJBQWUsQ0FBQztzQ0FDbEMsV0FBVzswQ0FBQztRQUd2QjtZQUZDLGlCQUFNLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQztZQUM5QixvQkFBUyxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQztzQ0FDL0IsV0FBVzsyQ0FBQztRQWtEeEI7WUFEQyx5QkFBYyxDQUFDLHVCQUFhLENBQUMsYUFBYSxDQUFDOzs7O21EQUszQztRQUdEO1lBREMsMEJBQWU7OzZDQUNPLHNCQUFZLEVBQU0scUJBQVc7OytDQUduRDtRQUlEO1lBRkMseUJBQWMsQ0FBQyxNQUFNLENBQUM7WUFDdEIsK0JBQW9CLENBQUMsTUFBTSxDQUFDOzs7OzJDQUk1QjtRQXZGZ0IsS0FBSztZQUR6QiwyQkFBZ0IsQ0FBQyxPQUFPLEVBQUUscUJBQXFCLENBQUM7V0FDNUIsS0FBSyxDQXdGekI7UUFBRCxZQUFDOztLQUFBLEFBeEZELENBQW1DLHVCQUFhLEdBd0YvQztzQkF4Rm9CLEtBQUsifQ==

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Message__ = __webpack_require__(30);


/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-01
 * @modify date 2017-09-01
 *
 * 框架内核通用消息
*/
var CommonMessage = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](CommonMessage, _super);
    /**
     * Creates an instance of Message.
     * @param {string} type 消息类型
     * @param {...any[]} params 可能的消息参数列表
     * @memberof Message
     */
    function CommonMessage(type) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var _this = _super.call(this, type) || this;
        _this.params = params;
        return _this;
    }
    return CommonMessage;
}(__WEBPACK_IMPORTED_MODULE_1__Message__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (CommonMessage);


/***/ }),
/* 58 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = mutate;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_ObjectUtil__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Dep__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Watcher__ = __webpack_require__(33);



/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-06
 * @modify date 2017-11-06
 *
 * 变异器，将ViewModel变异为具有依赖功能的形式，也可以认为是编译过程
*/
// 记录数组中会造成数据更新的所有方法名
var arrMethods = [
    "push",
    "pop",
    "unshift",
    "shift",
    "splice",
    "sort",
    "reverse"
];
/**
 * 将用户传进来的数据“变异”成为具有截获数据变更能力的数据
 * @param data 原始数据
 * @returns {any} 变异后的数据
 */
function mutate(data) {
    // 如果是简单类型，则啥也不做
    if (!data || typeof data != "object")
        return data;
    // 递归变异所有内部变量，及其__proto__下的属性，因为getter/setter会被定义在__proto__上，而不是当前对象上
    var keys = Object.keys(data).concat(Object.keys(data.__proto__ || {}));
    // 去重
    var temp = {};
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        if (!temp[key]) {
            temp[key] = key;
            // 递归变异
            mutateObject(data, key);
        }
    }
    return data;
}
function onGet(dep, result, mutateSub) {
    // 如果Watcher.updating不是null，说明当前正在执行表达式，那么获取的变量自然是其需要依赖的
    var watcher = __WEBPACK_IMPORTED_MODULE_2__Watcher__["a" /* default */].updating;
    if (watcher)
        dep.watch(watcher);
    // 首次获取需要变异
    if (mutateSub) {
        // 如果是数组就走专门的数组变异方法，否则递归变异对象
        if (Array.isArray(result))
            mutateArray(result, dep);
        else
            mutate(result);
    }
}
function onSet(dep, value) {
    // 如果是数组就走专门的数组变异方法，否则递归变异对象
    if (Array.isArray(value))
        mutateArray(value, dep);
    else
        mutate(value);
    // 触发通知
    dep.notify();
}
function mutateObject(data, key) {
    var depKey = Object(__WEBPACK_IMPORTED_MODULE_0__utils_ObjectUtil__["e" /* getObjectHashs */])(data, key);
    // 对每个复杂类型对象都要有一个对应的依赖列表
    var dep = data[depKey];
    var mutateSub = true;
    if (!dep) {
        dep = new __WEBPACK_IMPORTED_MODULE_1__Dep__["a" /* default */]();
        // 判断本来这个属性是值属性还是getter/setter属性，要有不同的操作方式
        var desc = Object.getOwnPropertyDescriptor(data, key) || Object.getOwnPropertyDescriptor(data.__proto__ || {}, key);
        if (desc) {
            // 开始变异当前属性
            if (desc.hasOwnProperty("value")) {
                // 值属性的变异过程
                Object.defineProperty(data, key, {
                    enumerable: true,
                    configurable: true,
                    get: function () {
                        // 利用闭包保存原始值
                        var result = desc.value;
                        // 执行处理
                        onGet(dep, result, mutateSub);
                        // 设置标记
                        mutateSub = false;
                        // 返回值
                        return result;
                    },
                    set: function (value) {
                        if (!desc.writable || value === desc.value)
                            return;
                        desc.value = value;
                        // 执行处理
                        onSet(dep, value);
                    }
                });
            }
            else {
                // getter/setter属性的变异过程
                Object.defineProperty(data, key, {
                    enumerable: true,
                    configurable: false,
                    get: function () {
                        if (!desc.get)
                            return;
                        // 获取get方法结果
                        var result = desc.get.call(data);
                        // 执行处理
                        onGet(dep, result, mutateSub);
                        // 设置标记
                        mutateSub = false;
                        // 返回值
                        return result;
                    },
                    set: function (value) {
                        if (!desc.set)
                            return;
                        // 设置
                        desc.set.call(data, value);
                        // 执行处理
                        onSet(dep, value);
                    }
                });
            }
        }
        // 打一个标记表示已经变异过了
        Object.defineProperty(data, depKey, {
            value: dep,
            writable: false,
            enumerable: false,
            configurable: false
        });
    }
}
function mutateArray(arr, dep) {
    // 变异当前数组
    Object.setPrototypeOf(arr, defineReactiveArray(dep));
    // 遍历当前数组，将内容对象全部变异
    for (var i = 0, len = arr.length; i < len; i++) {
        mutate(arr[i]);
    }
}
function defineReactiveArray(dep) {
    var proto = Array.prototype;
    var result = Object.create(proto);
    // 遍历所有方法，一个一个地变异
    arrMethods.forEach(function (method) {
        // 利用闭包记录一个原始方法
        var oriMethod = proto[method];
        // 开始变异
        Object.defineProperty(result, method, {
            value: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                // 首先调用原始方法，获取返回值
                var result = oriMethod.apply(this, args);
                // 数组插入项
                var inserted;
                switch (method) {
                    case "push":
                    case "unshift":
                        inserted = args;
                        break;
                    case "splice":
                        inserted = args.slice(2);
                        break;
                }
                // 监视数组插入项，而不是重新监视整个数组
                if (inserted && inserted.length) {
                    mutateArray(inserted, dep);
                }
                // 触发更新
                dep.notify({ method: args });
                // 返回值
                return result;
            }
        });
    });
    // 提供替换数组设置的方法，因为直接设置数组下标的方式无法变异
    Object.defineProperty(result, "$set", {
        value: function (index, value) {
            // 超出数组长度默认追加到最后
            if (index >= this.length)
                index = this.length;
            return this.splice(index, 1, value)[0];
        }
    });
    // 提供替换数组移除的方法，因为直接移除的方式无法变异
    Object.defineProperty(result, "$remove", {
        value: function (item) {
            var index = this.indexOf(item);
            if (index > -1)
                return this.splice(index, 1);
            return null;
        }
    });
    return result;
}


/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Dictionary__ = __webpack_require__(4);

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-06
 * @modify date 2017-11-06
 *
 * 定义一个依赖，一个观察者实现
*/
var Dep = /** @class */ (function () {
    function Dep() {
        this._map = new __WEBPACK_IMPORTED_MODULE_0__utils_Dictionary__["a" /* default */]();
    }
    /**
     * 添加数据变更订阅者
     * @param watcher 数据变更订阅者
     */
    Dep.prototype.watch = function (watcher) {
        this._map.set(watcher, watcher);
    };
    /**
     * 数据变更，通知所有订阅者
     * @param extra 可能的额外数据
     */
    Dep.prototype.notify = function (extra) {
        var _this = this;
        this._map.forEach(function (watcher) {
            if (watcher.disposed)
                // 观察者已经销毁，移除监听
                _this._map.delete(watcher);
            else
                // 观察者依然生效，更新之
                watcher.update(extra);
        });
    };
    return Dep;
}());
/* harmony default export */ __webpack_exports__["a"] = (Dep);


/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_ObjectUtil__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Watcher__ = __webpack_require__(33);


/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-11-06
 * @modify date 2017-11-06
 *
 * 一个绑定
*/
var Bind = /** @class */ (function () {
    function Bind(mediator) {
        this._watcherDict = {};
        this._mediator = mediator;
    }
    Object.defineProperty(Bind.prototype, "mediator", {
        /**
         * 获取已绑定的中介者实例
         *
         * @readonly
         * @type {IMediator}
         * @memberof Bind
         */
        get: function () {
            return this._mediator;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 创建一个观察者，在数值变更时会通知回调进行更新
     *
     * @param {*} currentTarget 作用目标，指表达式所在的显示对象
     * @param {*} target 绑定表达式本来所在的对象
     * @param {EvalExp} exp 表达式或方法
     * @param {WatcherCallback} callback 订阅器回调
     * @param {*} thisArg this指向
     * @param {...any[]} scopes 作用域列表，最后一个作用域会被当做this指向
     * @returns {IWatcher} 返回观察者本身
     * @memberof Bind
     */
    Bind.prototype.createWatcher = function (currentTarget, target, exp, callback, thisArg) {
        var scopes = [];
        for (var _i = 5; _i < arguments.length; _i++) {
            scopes[_i - 5] = arguments[_i];
        }
        var key = __WEBPACK_IMPORTED_MODULE_0__utils_ObjectUtil__["e" /* getObjectHashs */].apply(void 0, [currentTarget, exp].concat(scopes));
        var watcher = this._watcherDict[key];
        if (!watcher)
            this._watcherDict[key] = watcher = new (__WEBPACK_IMPORTED_MODULE_1__Watcher__["a" /* default */].bind.apply(__WEBPACK_IMPORTED_MODULE_1__Watcher__["a" /* default */], [void 0, this, currentTarget, target, exp, callback, thisArg].concat(scopes)))();
        return watcher;
    };
    /**
     * 销毁绑定关系
     *
     * @memberof Bind
     */
    Bind.prototype.dispose = function () {
        for (var key in this._watcherDict) {
            var watcher = this._watcherDict[key];
            watcher.dispose();
            delete this._watcherDict[key];
        }
    };
    return Bind;
}());
/* harmony default export */ __webpack_exports__["a"] = (Bind);


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-11
 * @modify date 2017-09-11
 *
 * 通讯相关的消息
*/
var NetMessage = /** @class */ (function () {
    function NetMessage() {
    }
    /**
     * 发送网络请求消息
     *
     * @static
     * @type {string}
     * @memberof NetMessage
     */
    NetMessage.NET_REQUEST = "netRequest";
    /**
     * 接受网络返回消息
     *
     * @static
     * @type {string}
     * @memberof NetMessage
     */
    NetMessage.NET_RESPONSE = "netResponse";
    /**
     * 网络请求错误消息
     *
     * @static
     * @type {string}
     * @memberof NetMessage
     */
    NetMessage.NET_ERROR = "netError";
    return NetMessage;
}());
/* harmony default export */ __webpack_exports__["a"] = (NetMessage);


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NonePanelPolicy */
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-06
 * @modify date 2017-09-06
 *
 * 无任何动画的弹出策略，可应用于任何显示层实现
*/
var NonePanelPolicy = /** @class */ (function () {
    function NonePanelPolicy() {
    }
    NonePanelPolicy.prototype.pop = function (panel, callback, from) {
        setTimeout(callback, 0);
    };
    NonePanelPolicy.prototype.drop = function (panel, callback, from) {
        setTimeout(callback, 0);
    };
    return NonePanelPolicy;
}());

/** 默认导出实例 */
/* harmony default export */ __webpack_exports__["a"] = (new NonePanelPolicy());


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-06
 * @modify date 2017-09-06
 *
 * 弹窗相关的消息
*/
var PanelMessage = /** @class */ (function () {
    function PanelMessage() {
    }
    /**
     * 打开弹窗前的消息
     *
     * @static
     * @type {string}
     * @memberof PanelMessage
     */
    PanelMessage.PANEL_BEFORE_POP = "panelBeforePop";
    /**
     * 打开弹窗后的消息
     *
     * @static
     * @type {string}
     * @memberof PanelMessage
     */
    PanelMessage.PANEL_AFTER_POP = "panelAfterPop";
    /**
     * 关闭弹窗前的消息
     *
     * @static
     * @type {string}
     * @memberof PanelMessage
     */
    PanelMessage.PANEL_BEFORE_DROP = "panelBeforeDrop";
    /**
     * 关闭弹窗后的消息
     *
     * @static
     * @type {string}
     * @memberof PanelMessage
     */
    PanelMessage.PANEL_AFTER_DROP = "panelAfterDrop";
    return PanelMessage;
}());
/* harmony default export */ __webpack_exports__["a"] = (PanelMessage);


/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ButtonType; });
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-21
 * @modify date 2017-09-21
 *
 * 通用弹窗的各种接口
*/
var ButtonType;
(function (ButtonType) {
    ButtonType[ButtonType["normal"] = 0] = "normal";
    ButtonType[ButtonType["important"] = 1] = "important";
})(ButtonType || (ButtonType = {}));


/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NoneScenePolicy */
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-08
 * @modify date 2017-09-08
 *
 * 无任何动画的场景策略，可应用于任何显示层实现
*/
var NoneScenePolicy = /** @class */ (function () {
    function NoneScenePolicy() {
    }
    /**
     * 准备切换场景时调度
     * @param from 切出的场景
     * @param to 切入的场景
     */
    NoneScenePolicy.prototype.prepareSwitch = function (from, to) {
        // 这个策略里啥也不用准备
    };
    /**
     * 切换场景时调度
     * @param from 切出的场景
     * @param to 切入的场景
     * @param callback 切换完毕的回调方法
     */
    NoneScenePolicy.prototype.switch = function (from, to, callback) {
        // 直接延迟到下一帧回调（不能同步回调，否则可能会出问题）
        setTimeout(callback, 0);
    };
    return NoneScenePolicy;
}());

/** 默认导出实例 */
/* harmony default export */ __webpack_exports__["a"] = (new NoneScenePolicy());


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isOperating */
/* harmony export (immutable) */ __webpack_exports__["b"] = wait;
/* harmony export (immutable) */ __webpack_exports__["a"] = notify;
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-08
 * @modify date 2017-09-08
 *
 * 同步工具集，用于对多个
*/
var _cache = {};
/**
 * 判断是否正在进行操作
 *
 * @export
 * @param {string} name 队列名
 * @returns {boolean} 队列是否正在操作
 */
function isOperating(name) {
    var ctx = _cache[name];
    return (ctx != null && ctx.operating);
}
/**
 * 开始同步操作，所有传递了相同name的操作会被以队列方式顺序执行
 *
 * @export
 * @param name 一个队列的名字
 * @param {Function} fn 要执行的方法
 * @param {*} [thisArg] 方法this对象
 * @param {...any[]} [args] 方法参数
 */
function wait(name, fn, thisArg) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    var ctx = _cache[name];
    if (ctx == null) {
        _cache[name] = ctx = { operating: false, datas: [] };
    }
    if (ctx.operating) {
        // 队列正在执行，推入缓存
        ctx.datas.push({ fn: fn, thisArg: thisArg, args: args });
    }
    else {
        // 队列没有在执行，直接执行
        ctx.operating = true;
        fn.apply(thisArg, args);
    }
}
/**
 * 完成一步操作并唤醒后续操作
 *
 * @export
 * @param {string} name 队列名字
 * @returns {void}
 */
function notify(name) {
    var ctx = _cache[name];
    if (ctx == null || ctx.datas.length <= 0) {
        // 队列执行完了，直接结束
        ctx.operating = false;
        return;
    }
    var data = ctx.datas.shift();
    data.fn.apply(data.thisArg, data.args);
}


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_olympus_r_engine_bridge_BridgeManager__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_olympus_r_utils_Dictionary__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DOMBridge__ = __webpack_require__(26);



/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-10-25
 * @modify date 2017-10-25
 *
 * DOM遮罩实现
*/
var MaskEntityImpl = /** @class */ (function () {
    function MaskEntityImpl(params) {
        this._maskAlpha = 0.5;
        this._loadingAlpha = 0.5;
        this._modalPanelAlpha = 0.5;
        this._showingMask = false;
        this._showingLoading = false;
        if (params != null) {
            this._maskAlpha = (params.maskAlpha != null ? params.maskAlpha : 0.5);
            this._loadingAlpha = (params.loadingAlpha != null ? params.loadingAlpha : 0.5);
            this._modalPanelAlpha = (params.modalPanelAlpha != null ? params.modalPanelAlpha : 0.5);
            // 初始化loading皮肤
            if (typeof params.loadingSkin == "string") {
                var temp = document.createElement("div");
                temp.innerHTML = params.loadingSkin;
                params.loadingSkin = temp;
            }
            this.loadingSkin = params.loadingSkin;
        }
        this.maskData = params || {};
        this._mask = document.createElement("div");
        this._loadingMask = document.createElement("div");
        this._modalPanelDict = new __WEBPACK_IMPORTED_MODULE_1_olympus_r_utils_Dictionary__["a" /* default */]();
        this._modalPanelList = [];
        this._modalPanelMask = document.createElement("div");
    }
    /**
     * 显示遮罩
     */
    MaskEntityImpl.prototype.showMask = function (alpha) {
        if (this._showingMask)
            return;
        this._showingMask = true;
        // 显示
        var bridge = __WEBPACK_IMPORTED_MODULE_0_olympus_r_engine_bridge_BridgeManager__["a" /* bridgeManager */].getBridge(__WEBPACK_IMPORTED_MODULE_2__DOMBridge__["default"].TYPE);
        // 绘制遮罩
        if (alpha == null)
            alpha = this._maskAlpha;
        this._mask.style.backgroundColor = "#000";
        this._mask.style.opacity = alpha.toString();
        this._mask.style.width = "100%";
        this._mask.style.height = "100%";
        // 添加显示
        bridge.maskLayer.appendChild(this._mask);
    };
    /**
     * 隐藏遮罩
     */
    MaskEntityImpl.prototype.hideMask = function () {
        if (!this._showingMask)
            return;
        this._showingMask = false;
        // 隐藏
        if (this._mask.parentElement != null)
            this._mask.parentElement.removeChild(this._mask);
    };
    /**当前是否在显示遮罩*/
    MaskEntityImpl.prototype.isShowingMask = function () {
        return this._showingMask;
    };
    /**
     * 显示加载图
     */
    MaskEntityImpl.prototype.showLoading = function (alpha) {
        if (this._showingLoading)
            return;
        this._showingLoading = true;
        // 显示
        var bridge = __WEBPACK_IMPORTED_MODULE_0_olympus_r_engine_bridge_BridgeManager__["a" /* bridgeManager */].getBridge(__WEBPACK_IMPORTED_MODULE_2__DOMBridge__["default"].TYPE);
        // 绘制遮罩
        if (alpha == null)
            alpha = this._loadingAlpha;
        this._loadingMask.style.backgroundColor = "#000";
        this._loadingMask.style.opacity = alpha.toString();
        this._loadingMask.style.width = "100%";
        this._loadingMask.style.height = "100%";
        // 添加显示
        bridge.maskLayer.appendChild(this._loadingMask);
        // 添加loading皮肤
        if (this.loadingSkin)
            bridge.maskLayer.appendChild(this.loadingSkin);
    };
    /**
     * 隐藏加载图
     */
    MaskEntityImpl.prototype.hideLoading = function () {
        if (!this._showingLoading)
            return;
        this._showingLoading = false;
        // 隐藏
        if (this._loadingMask.parentElement != null)
            this._loadingMask.parentElement.removeChild(this._loadingMask);
        if (this.loadingSkin != null && this.loadingSkin.parentElement != null)
            this.loadingSkin.parentElement.removeChild(this.loadingSkin);
    };
    /**当前是否在显示loading*/
    MaskEntityImpl.prototype.isShowingLoading = function () {
        return this._showingLoading;
    };
    /** 显示模态窗口遮罩 */
    MaskEntityImpl.prototype.showModalMask = function (panel, alpha) {
        if (this.isShowingModalMask(panel))
            return;
        this._modalPanelDict.set(panel, panel);
        this._modalPanelList.push(panel);
        // 绘制遮罩
        if (alpha == null)
            alpha = this._modalPanelAlpha;
        this._modalPanelMask.style.backgroundColor = "#000";
        this._modalPanelMask.style.opacity = alpha.toString();
        this._modalPanelMask.style.width = "100%";
        this._modalPanelMask.style.height = "100%";
        // 添加显示
        var entity = panel.skin;
        var parent = entity.parentElement;
        if (parent != null) {
            if (this._modalPanelMask.parentElement) {
                this._modalPanelMask.parentElement.removeChild(this._modalPanelMask);
            }
            var bridge = __WEBPACK_IMPORTED_MODULE_0_olympus_r_engine_bridge_BridgeManager__["a" /* bridgeManager */].getBridge(__WEBPACK_IMPORTED_MODULE_2__DOMBridge__["default"].TYPE);
            var index = bridge.getChildIndex(parent, entity);
            bridge.addChildAt(parent, this._modalPanelMask, index);
        }
    };
    /** 隐藏模态窗口遮罩 */
    MaskEntityImpl.prototype.hideModalMask = function (panel) {
        if (!this.isShowingModalMask(panel))
            return;
        this._modalPanelDict.delete(panel);
        this._modalPanelList.splice(this._modalPanelList.indexOf(panel), 1);
        // 判断是否还需要Mask
        if (this._modalPanelList.length <= 0) {
            // 隐藏
            if (this._modalPanelMask.parentElement != null)
                this._modalPanelMask.parentElement.removeChild(this._modalPanelMask);
        }
        else {
            // 移动Mask
            var entity = this._modalPanelList[this._modalPanelList.length - 1].skin;
            var parent = entity.parentElement;
            if (parent != null) {
                if (this._modalPanelMask.parentElement) {
                    this._modalPanelMask.parentElement.removeChild(this._modalPanelMask);
                }
                var bridge = __WEBPACK_IMPORTED_MODULE_0_olympus_r_engine_bridge_BridgeManager__["a" /* bridgeManager */].getBridge(__WEBPACK_IMPORTED_MODULE_2__DOMBridge__["default"].TYPE);
                var index = bridge.getChildIndex(parent, entity);
                bridge.addChildAt(parent, this._modalPanelMask, index);
            }
        }
    };
    /** 当前是否在显示模态窗口遮罩 */
    MaskEntityImpl.prototype.isShowingModalMask = function (panel) {
        return (this._modalPanelDict.get(panel) != null);
    };
    return MaskEntityImpl;
}());
/* harmony default export */ __webpack_exports__["a"] = (MaskEntityImpl);


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = wrapSkin;
/* harmony export (immutable) */ __webpack_exports__["c"] = isDOMStr;
/* harmony export (immutable) */ __webpack_exports__["b"] = isDOMPath;
/* harmony export (immutable) */ __webpack_exports__["a"] = copyRef;
/* harmony export (immutable) */ __webpack_exports__["d"] = toHTMLElement;
/* unused harmony export getHTMLContent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_olympus_r_engine_assets_AssetsManager__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_olympus_r_engine_mediator_MediatorStatus__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_olympus_r_utils_ConstructUtil__ = __webpack_require__(6);



/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-10-26
 * @modify date 2017-10-26
 *
 * 为DOM提供皮肤转换的工具集
*/
/**
 * 为中介者包装皮肤
 *
 * @export
 * @param {IMediator} mediator 中介者
 * @param {(HTMLElement|string|string[])} skin 皮肤，可以是HTMLElement，也可以是皮肤字符串，也可以是皮肤模板地址或地址数组
 * @returns {HTMLElement} 皮肤的HTMLElement形式，可能会稍后再填充内容，如果想在皮肤加载完毕后再拿到皮肤请使用complete参数
 */
function wrapSkin(mediator, skin) {
    var result = (skin instanceof HTMLElement ? skin : document.createElement("div"));
    // 判断中介者当前状态
    if (mediator.status < __WEBPACK_IMPORTED_MODULE_1_olympus_r_engine_mediator_MediatorStatus__["a" /* default */].OPENING) {
        Object(__WEBPACK_IMPORTED_MODULE_2_olympus_r_utils_ConstructUtil__["b" /* listenApply */])(mediator, "onOpen", doWrapSkin);
    }
    else {
        // 直接执行要执行的
        doWrapSkin();
    }
    // 同步返回皮肤
    return result;
    function doWrapSkin() {
        if (skin instanceof HTMLElement) {
            // 拷贝引用
            doCopyRef(result, skin.innerHTML, mediator);
        }
        else {
            // 转换皮肤
            skin = getHTMLContent(skin);
            // 赋值皮肤内容
            result.innerHTML = skin;
            // 拷贝引用
            doCopyRef(result, skin, mediator);
        }
    }
}
/**
 * 判断是否是DOM字符串
 *
 * @export
 * @param {string} str 字符串
 * @returns {boolean}
 */
function isDOMStr(str) {
    return str && (str.indexOf("<") >= 0 && str.indexOf(">") >= 0);
}
var reg = /(\.htm|\.html|\.tpl)$/;
/**
 * 判断是否是DOM模板路径
 *
 * @export
 * @param {string} path 路径字符串
 * @returns {boolean}
 */
function isDOMPath(path) {
    return path && reg.test(path);
}
/**
 * 将from中的所有拥有id属性的节点引用复制到to对象上
 *
 * @export
 * @param {HTMLElement} from 复制源DOM节点
 * @param {*} to 复制目标对象
 */
function copyRef(from, to) {
    doCopyRef(from, from.innerHTML, to);
}
function doCopyRef(fromEle, fromStr, to) {
    // 使用正则表达式将拥有id的节点赋值给mediator
    var reg = /id=("([^"]+)"|'([^']+)')/g;
    var res;
    while (res = reg.exec(fromStr)) {
        var id = res[2] || res[3];
        to[id] = fromEle.querySelector("#" + id);
    }
}
/**
 * 转换皮肤为HTMLElement
 *
 * @export
 * @param {(HTMLElement|string|string[])} skin 皮肤
 * @returns {HTMLElement}
 */
function toHTMLElement(skin) {
    if (skin instanceof HTMLElement)
        return skin;
    var result = document.createElement("div");
    result.innerHTML = getHTMLContent(skin);
    return result;
}
/**
 * 将皮肤字符串/字符串数组或皮肤路径转变为HTML内容字符串
 *
 * @export
 * @param {(string|string[])} skin 可以是皮肤字符串、皮肤字符串数组或皮肤路径
 * @returns {string}
 */
function getHTMLContent(skin) {
    if (skin instanceof Array) {
        // 是字符串数组，拆分后皮肤化再连接起来
        return skin.map(getHTMLContent).join("");
    }
    else if (isDOMStr(skin)) {
        // 是皮肤字符串，直接返回
        return skin;
    }
    else {
        // 是皮肤路径或路径短名称，获取后返回
        return __WEBPACK_IMPORTED_MODULE_0_olympus_r_engine_assets_AssetsManager__["b" /* assetsManager */].getAssets(skin);
    }
}


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tweenjs_tween_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tweenjs_tween_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__tweenjs_tween_js__);

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-22
 * @modify date 2017-09-22
 *
 * 回弹效果
*/
var BackPanelPolicy = /** @class */ (function () {
    function BackPanelPolicy() {
        this._reg = /(\w*)(\d+)(\w*)/;
    }
    /**
     * 显示时调用
     * @param panel 弹出框对象
     * @param callback 完成回调，必须调用
     * @param from 动画起始点
     */
    BackPanelPolicy.prototype.pop = function (panel, callback, from) {
        var entity = panel.skin;
        var curStyle = getComputedStyle(entity);
        var tween = new __WEBPACK_IMPORTED_MODULE_0__tweenjs_tween_js__["Tween"](entity).end().stop();
        entity.style.position = "fixed";
        entity.style.left = "calc(50% - " + curStyle.width + " * 0.5)";
        entity.style.top = "calc(50% - " + curStyle.height + " * 0.5)";
        entity.style.transform = "scale(0, 0)";
        // 开始缓动
        var key = "__tween__step__";
        entity[key] = 0;
        var props = {};
        props[key] = 1;
        tween.to(props, 300).easing(__WEBPACK_IMPORTED_MODULE_0__tweenjs_tween_js__["Easing"].Back.Out).onUpdate(function () {
            entity.style.transform = "scale(" + entity[key] + ", " + entity[key] + ")";
        }).onComplete(function () {
            delete entity[key];
            entity.style.transform = "";
            callback();
        }).start();
    };
    /**
     * 关闭时调用
     * @param popup 弹出框对象
     * @param callback 完成回调，必须调用
     * @param to 动画完结点
     */
    BackPanelPolicy.prototype.drop = function (panel, callback, to) {
        var entity = panel.skin;
        var tween = new __WEBPACK_IMPORTED_MODULE_0__tweenjs_tween_js__["Tween"](entity).end().stop();
        entity.style.transform = "scale(1, 1)";
        // 开始缓动
        var key = "__tween__step__";
        entity[key] = 1;
        var props = {};
        props[key] = 0;
        tween.to(props, 300).easing(__WEBPACK_IMPORTED_MODULE_0__tweenjs_tween_js__["Easing"].Back.In).onUpdate(function () {
            entity.style.transform = "scale(" + entity[key] + ", " + entity[key] + ")";
        }).onComplete(function () {
            delete entity[key];
            entity.style.transform = "";
            callback();
        }).start();
    };
    return BackPanelPolicy;
}());
/* harmony default export */ __webpack_exports__["a"] = (BackPanelPolicy);


/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tweenjs_tween_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tweenjs_tween_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__tweenjs_tween_js__);

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-22
 * @modify date 2017-09-22
 *
 * 淡入淡出场景切换策略
*/
var FadeScenePolicy = /** @class */ (function () {
    function FadeScenePolicy() {
    }
    /**
     * 准备切换场景时调度
     * @param from 切出的场景
     * @param to 切入的场景
     */
    FadeScenePolicy.prototype.prepareSwitch = function (from, to) {
        if (from != null) {
            // 移除克隆节点
            if (this._stageClone && this._stageClone.parentElement) {
                this._stageClone.parentElement.removeChild(this._stageClone);
            }
            // 克隆当前屏幕
            var stage = from.bridge.stage;
            this._stageClone = stage.cloneNode(true);
            this._stageClone.style.position = "fixed";
            this._stageClone.style.left = "0%";
            this._stageClone.style.top = "0%";
            this._stageClone.style.zIndex = "2147483647"; // 层级要最高
            this._stageClone.style.pointerEvents = "none"; // 要屏蔽点击事件
            // 添加克隆节点
            from.bridge.htmlWrapper.appendChild(this._stageClone);
            // 移除from
            var fromDisplay = from.skin;
            if (fromDisplay.parentElement != null) {
                fromDisplay.parentElement.removeChild(fromDisplay);
            }
        }
    };
    /**
     * 切换场景时调度
     * @param from 切出的场景
     * @param to 切入的场景
     * @param callback 切换完毕的回调方法
     */
    FadeScenePolicy.prototype.switch = function (from, to, callback) {
        var _this = this;
        if (from != null) {
            // 开始淡出
            var key = "__tween__step__";
            this._stageClone[key] = 1;
            var props = {};
            props[key] = 0;
            new __WEBPACK_IMPORTED_MODULE_0__tweenjs_tween_js__["Tween"](this._stageClone)
                .end()
                .stop()
                .to(props, 300)
                .easing(__WEBPACK_IMPORTED_MODULE_0__tweenjs_tween_js__["Easing"].Linear.None)
                .onUpdate(function () {
                _this._stageClone.style.opacity = _this._stageClone[key];
            })
                .onComplete(function () {
                delete _this._stageClone[key];
                // 移除截屏
                if (_this._stageClone.parentElement != null) {
                    _this._stageClone.parentElement.removeChild(_this._stageClone);
                }
                // 调用回调
                callback();
            })
                .start();
        }
        else {
            // 移除克隆节点
            if (this._stageClone && this._stageClone.parentElement) {
                this._stageClone.parentElement.removeChild(this._stageClone);
            }
            // 调用回调
            callback();
        }
    };
    return FadeScenePolicy;
}());
/* harmony default export */ __webpack_exports__["a"] = (FadeScenePolicy);


/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "audioManager", function() { return audioManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_injector_Injector__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_Core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__env_Shell__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AudioTagImpl__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__AudioContextImpl__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__message_EngineMessage__ = __webpack_require__(48);







/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-10-30
 * @modify date 2017-10-30
 *
 * 音频管理器，音频接口被强行分为两部分：Sound和Music。
 * Sound：使用Audio标签播放，可以跨域播放但可能会被某些浏览器限制，必须在点击事件处理函数中播放
 * Music：使用AudioContext播放，可以一定程度上越过点击事件检查，但无法跨域播放，适合播放背景音乐
*/
var AudioManager = /** @class */ (function () {
    function AudioManager() {
        var _this = this;
        this._soundImpl = new __WEBPACK_IMPORTED_MODULE_4__AudioTagImpl__["a" /* default */]();
        // 为WebAudio做兼容处理
        window["AudioContext"] = window["AudioContext"] || window["webkitAudioContext"] || window["mozAudioContext"] || window["msAudioContext"];
        // 由于IE可能不支持AudioContext，因此如果是IE则要改用Audio标签实现
        this._musicImpl = (window["AudioContext"] ? new __WEBPACK_IMPORTED_MODULE_5__AudioContextImpl__["a" /* default */]() : this._soundImpl);
        __WEBPACK_IMPORTED_MODULE_2__core_Core__["a" /* core */].listen(__WEBPACK_IMPORTED_MODULE_6__message_EngineMessage__["a" /* default */].INITIALIZED, function () {
            // 读取持久化记录
            var shell = __WEBPACK_IMPORTED_MODULE_2__core_Core__["a" /* core */].getInject(__WEBPACK_IMPORTED_MODULE_3__env_Shell__["a" /* default */]);
            _this.muteSound = (shell.localStorageGet(AudioManager_1.STORAGE_KEY_MUTE_SOUND) === "true");
            _this.muteMusic = (shell.localStorageGet(AudioManager_1.STORAGE_KEY_MUTE_MUSIC) === "true");
        });
    }
    AudioManager_1 = AudioManager;
    /**
     * 注册Sound音频实现对象
     *
     * @param {IAudio} soundImpl Sound音频实现对象
     * @memberof AudioManager
     */
    AudioManager.prototype.registerSoundImpl = function (soundImpl) {
        this._soundImpl = soundImpl;
    };
    Object.defineProperty(AudioManager.prototype, "muteSound", {
        /**
         * 获取或设置Sound类型音频静音属性
         *
         * @type {boolean}
         * @memberof AudioManager
         */
        get: function () {
            return this._soundImpl.mute;
        },
        set: function (value) {
            if (value === this._soundImpl.mute)
                return;
            this._soundImpl.mute = value;
            // 持久化
            var shell = __WEBPACK_IMPORTED_MODULE_2__core_Core__["a" /* core */].getInject(__WEBPACK_IMPORTED_MODULE_3__env_Shell__["a" /* default */]);
            shell.localStorageSet(AudioManager_1.STORAGE_KEY_MUTE_SOUND, value + "");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 加载Sound音频
     *
     * @param {string} url 音频地址
     * @memberof AudioManager
     */
    AudioManager.prototype.loadSound = function (url) {
        this._soundImpl.load(url);
    };
    /**
     * 播放Sound音频，如果没有加载则会先行加载
     *
     * @param {AudioPlayParams} params 音频播放参数
     * @memberof AudioManager
     */
    AudioManager.prototype.playSound = function (params) {
        // 判断静音
        if (this.muteSound)
            return;
        // 停止其他音频
        if (params.stopOthers) {
            this.stopAllSound();
            this.stopAllMusics();
        }
        this._soundImpl.play(params);
    };
    /**
     * 跳转Sound音频进度
     *
     * @param {string} url 音频URL
     * @param {number} time 要跳转到的音频位置，毫秒值
     * @memberof AudioManager
     */
    AudioManager.prototype.seekSound = function (url, time) {
        this._soundImpl.seek(url, time);
    };
    /**
     * 停止Sound音频
     *
     * @param {string} url 音频地址
     * @memberof AudioManager
     */
    AudioManager.prototype.stopSound = function (url) {
        this._soundImpl.stop(url);
    };
    /**
     * 暂停Sound音频
     *
     * @param {string} url 音频地址
     * @memberof AudioManager
     */
    AudioManager.prototype.pauseSound = function (url) {
        this._soundImpl.pause(url);
    };
    /**
     * 停止所有Sound音频
     *
     * @memberof AudioManager
     */
    AudioManager.prototype.stopAllSound = function () {
        this._soundImpl.stopAll();
    };
    /**
     * 注册Music音频实现对象
     *
     * @param {IAudio} musicImpl Music音频实现对象
     * @memberof AudioManager
     */
    AudioManager.prototype.registerMusicImpl = function (musicImpl) {
        this._musicImpl = musicImpl;
    };
    Object.defineProperty(AudioManager.prototype, "muteMusic", {
        /**
         * 获取或设置Music类型音频静音属性
         *
         * @type {boolean}
         * @memberof AudioManager
         */
        get: function () {
            return this._musicImpl.mute;
        },
        set: function (value) {
            if (value === this._musicImpl.mute)
                return;
            this._musicImpl.mute = value;
            // 持久化
            var shell = __WEBPACK_IMPORTED_MODULE_2__core_Core__["a" /* core */].getInject(__WEBPACK_IMPORTED_MODULE_3__env_Shell__["a" /* default */]);
            shell.localStorageSet(AudioManager_1.STORAGE_KEY_MUTE_MUSIC, value + "");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 加载Music音频
     *
     * @param {string} url 音频地址
     * @memberof AudioManager
     */
    AudioManager.prototype.loadMusic = function (url) {
        this._musicImpl.load(url);
    };
    /**
     * 播放Music音频，如果没有加载则会先行加载
     *
     * @param {AudioPlayParams} [params] 音频参数
     * @memberof AudioManager
     */
    AudioManager.prototype.playMusic = function (params) {
        // 判断静音
        if (this.muteMusic)
            return;
        // 停止其他音频
        if (params.stopOthers) {
            this.stopAllSound();
            this.stopAllMusics();
        }
        this._musicImpl.play(params);
    };
    /**
     * 跳转Music音频进度
     *
     * @param {string} url 音频URL
     * @param {number} time 要跳转到的音频位置，毫秒值
     * @memberof AudioManager
     */
    AudioManager.prototype.seekMusic = function (url, time) {
        this._musicImpl.seek(url, time);
    };
    /**
     * 停止Music音频
     *
     * @param {string} url 音频地址
     * @memberof AudioManager
     */
    AudioManager.prototype.stopMusic = function (url) {
        this._musicImpl.stop(url);
    };
    /**
     * 暂停Music音频
     *
     * @param {string} url 音频地址
     * @memberof AudioManager
     */
    AudioManager.prototype.pauseMusic = function (url) {
        this._musicImpl.pause(url);
    };
    /**
     * 停止所有Music音频
     *
     * @memberof AudioManager
     */
    AudioManager.prototype.stopAllMusics = function () {
        this._musicImpl.stopAll();
    };
    AudioManager.STORAGE_KEY_MUTE_SOUND = "AudioManager::muteSound";
    AudioManager.STORAGE_KEY_MUTE_MUSIC = "AudioManager::muteMusic";
    AudioManager = AudioManager_1 = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
        __WEBPACK_IMPORTED_MODULE_1__core_injector_Injector__["Injectable"],
        __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __metadata */]("design:paramtypes", [])
    ], AudioManager);
    return AudioManager;
    var AudioManager_1;
}());
/* harmony default export */ __webpack_exports__["default"] = (AudioManager);
/** 再额外导出一个单例 */
var audioManager = __WEBPACK_IMPORTED_MODULE_2__core_Core__["a" /* core */].getInject(AudioManager);


/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export shell */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_injector_Injector__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_Core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_AssetsManager__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__audio_AudioTagImpl__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Environment__ = __webpack_require__(5);






/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-10-23
 * @modify date 2017-10-23
 *
 * 外壳接口，该类既作为外壳接口的注入基类，也作为标准浏览器的实现使用
*/
var Shell = /** @class */ (function () {
    function Shell() {
    }
    Object.defineProperty(Shell.prototype, "proxy", {
        /**
         * 设置外壳代理，如果条件命中了该代理类型，则生成该代理实例并替代外壳行为
         *
         * @memberof Shell
         */
        set: function (value) {
            if (value.hit)
                this._proxy = new value();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shell.prototype, "type", {
        /**
         * 获取当前外壳类型
         *
         * @readonly
         * @type {string}
         * @memberof Shell
         */
        get: function () {
            if (this._proxy)
                return this._proxy.type;
            else
                return "web";
        },
        enumerable: true,
        configurable: true
    });
    /*************************** 下面是页面跳转接口 ***************************/
    /**
     * 刷新页面
     *
     * @param {{
     *         forcedReload?:boolean, // false表示允许从缓存取，true表示强制从服务器取，默认是false
     *         url?:string, // 传递则使用新URL刷新页面
     *         replace?:boolean // 如果有新url，则表示是否要替换当前浏览历史
     *     }} [params]
     * @memberof Shell
     */
    Shell.prototype.reload = function (params) {
        if (this._proxy) {
            this._proxy.reload(params);
        }
        else {
            if (!params)
                window.location.reload();
            else if (!params.url)
                window.location.reload(params.forcedReload);
            else if (!params.replace)
                window.location.href = params.url;
            else
                window.location.replace(params.url);
        }
    };
    /**
     * 打开一个新页面
     *
     * @param {{
     *         url?:string, // 新页面地址，不传则不更新地址
     *         name?:string, // 给新页面命名，或导航到已有页面
     *         replace?:boolean, // 是否替换当前浏览历史条目，默认false
     *         features:{[key:string]:any} // 其他可能的参数
     *     }} [params]
     * @memberof Shell
     */
    Shell.prototype.open = function (params) {
        if (this._proxy) {
            this._proxy.open(params);
        }
        else {
            if (!params) {
                window.open();
            }
            else {
                var features = undefined;
                if (params.features) {
                    features = [];
                    for (var key in params.features) {
                        features.push(key + "=" + params.features[key]);
                    }
                }
                window.open(params.url, params.name, features && features.join(","), params.replace);
            }
        }
    };
    /**
     * 关闭窗口
     *
     * @memberof Shell
     */
    Shell.prototype.close = function () {
        if (this._proxy)
            this._proxy.close();
        else
            window.close();
    };
    /*************************** 下面是本地存储接口 ***************************/
    /**
     * 获取本地存储
     *
     * @param {string} key 要获取值的键
     * @returns {string} 获取的值
     * @memberof Shell
     */
    Shell.prototype.localStorageGet = function (key) {
        if (this._proxy)
            return this._proxy.localStorageGet(key);
        else
            return window.localStorage.getItem(key);
    };
    /**
     * 设置本地存储
     *
     * @param {string} key 要设置的键
     * @param {string} value 要设置的值
     * @memberof Shell
     */
    Shell.prototype.localStorageSet = function (key, value) {
        if (this._proxy)
            this._proxy.localStorageSet(key, value);
        else
            window.localStorage.setItem(key, value);
    };
    /**
     * 移除本地存储
     *
     * @param {string} key 要移除的键
     * @memberof Shell
     */
    Shell.prototype.localStorageRemove = function (key) {
        if (this._proxy)
            this._proxy.localStorageRemove(key);
        else
            window.localStorage.removeItem(key);
    };
    /**
     * 清空本地存储
     *
     * @memberof Shell
     */
    Shell.prototype.localStorageClear = function () {
        if (this._proxy)
            this._proxy.localStorageClear();
        else
            window.localStorage.clear();
    };
    Shell = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
        __WEBPACK_IMPORTED_MODULE_1__core_injector_Injector__["Injectable"]
    ], Shell);
    return Shell;
}());
/* harmony default export */ __webpack_exports__["a"] = (Shell);
/**
 * 这是Shell在微信浏览器下的一个变形代理
 *
 * @class ShellWX
 * @extends {Shell}
 */
var ShellWX = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](ShellWX, _super);
    function ShellWX() {
        var _this = _super.call(this) || this;
        // 用来记录加载微信js间隙的音频加载请求
        var loadCache = [];
        var loadFlag = false;
        // 变异AudioTagImpl，在微信里的Audio标签需要从微信触发加载
        var oriLoad = __WEBPACK_IMPORTED_MODULE_4__audio_AudioTagImpl__["a" /* default */].prototype.load;
        __WEBPACK_IMPORTED_MODULE_4__audio_AudioTagImpl__["a" /* default */].prototype.load = function (url) {
            var _this = this;
            // 第一次进行了音频加载，如果还没加载过js，则去加载之
            if (!loadFlag) {
                loadFlag = true;
                // 去加载微信js
                __WEBPACK_IMPORTED_MODULE_3__assets_AssetsManager__["b" /* assetsManager */].loadJsFiles([{
                        url: "http://res.wx.qq.com/open/js/jweixin-1.2.0.js",
                        mode: __WEBPACK_IMPORTED_MODULE_3__assets_AssetsManager__["a" /* JSLoadMode */].TAG
                    }], function (err) {
                    if (err) {
                        // 发生错误了，恢复原始的操作
                        __WEBPACK_IMPORTED_MODULE_4__audio_AudioTagImpl__["a" /* default */].prototype.load = oriLoad;
                        // 移除闭包数据
                        oriLoad = null;
                    }
                    // 重新启动缓存的加载请求
                    for (var _i = 0, loadCache_1 = loadCache; _i < loadCache_1.length; _i++) {
                        var cache = loadCache_1[_i];
                        cache[1].load(cache[0]);
                    }
                    // 移除闭包数据
                    loadCache = null;
                });
            }
            // 处理url
            var toUrl = __WEBPACK_IMPORTED_MODULE_5__Environment__["environment"].toCDNHostURL(url);
            // 尝试获取缓存数据
            var data = this._audioCache[toUrl];
            // 如果没有缓存才去加载
            if (!data || data.__from_cache__) {
                // 先调用原始方法，否则行为就变了
                if (!data)
                    oriLoad.call(this, url);
                else
                    delete data.__from_cache__;
                // 如果js还没加载好则等待加载
                if (!window["wx"]) {
                    loadCache.push([url, this]);
                    // 这里记录一个从缓存来的标记
                    data = this._audioCache[toUrl];
                    data.__from_cache__ = true;
                    return;
                }
                // 从微信里触发加载操作
                window["wx"].checkJsApi({
                    jsApiList: ["checkJsApi"],
                    success: function () {
                        var data = _this._audioCache[toUrl];
                        var node = data.node;
                        node.load();
                    }
                });
            }
        };
        return _this;
    }
    Object.defineProperty(ShellWX, "hit", {
        get: function () {
            return (window.top === window &&
                /MicroMessenger/i.test(navigator.userAgent));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShellWX.prototype, "type", {
        get: function () {
            return "weixin";
        },
        enumerable: true,
        configurable: true
    });
    ShellWX.prototype.close = function () {
        window["WeixinJSBridge"].invoke("closeWindow");
    };
    return ShellWX;
}(Shell));
/** 再额外导出一个单例 */
var shell = __WEBPACK_IMPORTED_MODULE_2__core_Core__["a" /* core */].getInject(Shell);
/** 尝试添加微信外壳代理 */
shell.proxy = ShellWX;


/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_AssetsManager__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AudioMessage__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__env_Environment__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__system_System__ = __webpack_require__(25);





/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-10-30
 * @modify date 2017-10-30
 *
 * 使用AudioContext实现IAudio接口的实现类
*/
var AudioContextImpl = /** @class */ (function () {
    function AudioContextImpl() {
        var _this = this;
        this._mute = false;
        this._playingDict = {};
        this._inited = false;
        this._audioCache = {};
        this._context = new (window["AudioContext"] || window["webkitAudioContext"])();
        var onInit = function () {
            window.removeEventListener("touchstart", onInit);
            window.removeEventListener("mousedown", onInit);
            // 生成一个空的音频，播放并停止，用以解除限制
            var source = _this._context.createBufferSource();
            source.buffer = _this._context.createBuffer(1, 1, 44100);
            source.connect(_this._context.destination);
            source.start();
            source.stop();
            // 设置标识符
            _this._inited = true;
            // 如果当前有正在播放的音频，全部再播放一次
            for (var url in _this._audioCache) {
                var data = _this._audioCache[url];
                if (data.status == AudioStatus.PLAYING) {
                    // 停止播放
                    _this.stop(data.playParams.url);
                    // 重新播放
                    _this.play(data.playParams);
                }
            }
        };
        window.addEventListener("touchstart", onInit);
        window.addEventListener("mousedown", onInit);
    }
    Object.defineProperty(AudioContextImpl.prototype, "mute", {
        /**
         * 静音状态
         *
         * @type {boolean}
         * @memberof AudioTagImpl
         */
        get: function () {
            return this._mute;
        },
        set: function (value) {
            this._mute = value;
            // 静音，暂停所有声音
            for (var url in this._playingDict) {
                if (value) {
                    // 静音，停止音频，不可调用stop方法，因为要保持播放中的音频状态
                    this._doStop(url);
                }
                else {
                    // 非静音，播放音频
                    var params = this._playingDict[url];
                    this.play(params);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 加载音频
     *
     * @param {string} url 音频地址
     * @memberof AudioContextImpl
     */
    AudioContextImpl.prototype.load = function (url) {
        var _this = this;
        var toUrl = __WEBPACK_IMPORTED_MODULE_3__env_Environment__["environment"].toCDNHostURL(url);
        // 尝试获取缓存数据
        var data = this._audioCache[toUrl];
        // 如果没有缓存才去加载
        if (!data) {
            // 使用AudioContext加载
            this._audioCache[toUrl] = data = { buffer: null, status: AudioStatus.LOADING, playParams: null, progress: null };
            // 开始加载
            __WEBPACK_IMPORTED_MODULE_0__assets_AssetsManager__["b" /* assetsManager */].loadAssets(toUrl, function (result) {
                if (result instanceof ArrayBuffer) {
                    _this._context.decodeAudioData(result, function (buffer) {
                        data.buffer = buffer;
                        // 设置状态
                        data.status = AudioStatus.PAUSED;
                        // 如果自动播放则播放
                        if (data.playParams)
                            _this.play(data.playParams);
                    });
                }
            }, "arraybuffer");
        }
    };
    /**
     * 播放音频，如果音频没有加载则先加载再播放
     *
     * @param {AudioPlayParams} params 音频播放参数
     * @returns {void}
     * @memberof AudioContextImpl
     */
    AudioContextImpl.prototype.play = function (params) {
        var _this = this;
        var toUrl = __WEBPACK_IMPORTED_MODULE_3__env_Environment__["environment"].toCDNHostURL(params.url);
        // 尝试获取缓存数据
        var data = this._audioCache[toUrl];
        if (!data) {
            // 没有加载过，开始加载音频
            this.load(params.url);
            // 设置播放参数
            this._audioCache[toUrl].playParams = params;
        }
        else {
            switch (data.status) {
                case AudioStatus.LOADING:
                    // 正在加载中，替换自动播放参数
                    data.playParams = params;
                    break;
                case AudioStatus.PLAYING:
                    // 正在播放，关闭后再播放
                    this.stop(params.url);
                    this.play(params);
                    break;
                case AudioStatus.PAUSED:
                    // 设置状态
                    data.status = AudioStatus.PLAYING;
                    // 记录播放中
                    this._playingDict[toUrl] = params;
                    // 已经加载完毕，直接播放
                    if (this._inited) {
                        data.node = this._context.createBufferSource();
                        data.node.buffer = data.buffer;
                        if (params.loop != null)
                            data.node.loop = params.loop;
                        data.node.connect(this._context.destination);
                        // 监听播放完毕
                        data.node.onended = function () {
                            var data = _this._audioCache[toUrl];
                            if (data) {
                                // 停止播放
                                _this.stop(params.url);
                                // 派发播放完毕事件
                                __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].dispatch(__WEBPACK_IMPORTED_MODULE_2__AudioMessage__["a" /* default */].AUDIO_PLAY_ENDED, params.url);
                            }
                        };
                        // 开始播放，优先取参数中的时间，没有就取默认开始时间
                        var playTime;
                        if (params && params.time != null)
                            playTime = params.time * 0.001;
                        else
                            playTime = data.playTime;
                        delete data.playTime;
                        data.node.start(playTime);
                        // 开始播放进度监测
                        var lastTime = this._context.currentTime;
                        var curTime = playTime || 0;
                        data.progress = __WEBPACK_IMPORTED_MODULE_4__system_System__["a" /* system */].enterFrame(function () {
                            var nowTime = _this._context.currentTime;
                            var deltaTime = nowTime - lastTime;
                            lastTime = nowTime;
                            if (data.status == AudioStatus.PLAYING) {
                                curTime += deltaTime * 1000;
                                var totalTime = data.node.buffer.duration * 1000;
                                __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].dispatch(__WEBPACK_IMPORTED_MODULE_2__AudioMessage__["a" /* default */].AUDIO_PLAY_PROGRESS, params.url, curTime, totalTime);
                            }
                        });
                        // 派发播放开始事件
                        __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].dispatch(__WEBPACK_IMPORTED_MODULE_2__AudioMessage__["a" /* default */].AUDIO_PLAY_STARTED, params.url);
                    }
                    break;
            }
        }
    };
    AudioContextImpl.prototype._doStop = function (url, time) {
        var toUrl = __WEBPACK_IMPORTED_MODULE_3__env_Environment__["environment"].toCDNHostURL(url);
        var data = this._audioCache[toUrl];
        if (data) {
            // 设置状态
            data.status = AudioStatus.PAUSED;
            // 取消进度监测
            if (data.progress)
                data.progress.cancel();
            // 结束播放
            if (data.node) {
                data.node.stop(time);
                // 派发播放停止事件
                __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].dispatch(__WEBPACK_IMPORTED_MODULE_2__AudioMessage__["a" /* default */].AUDIO_PLAY_STOPPED, url);
            }
        }
    };
    /**
     * 暂停音频（不会重置进度）
     *
     * @param {string} url 音频URL
     * @memberof AudioContextImpl
     */
    AudioContextImpl.prototype.pause = function (url) {
        this._doStop(url);
        // 移除播放中
        var toUrl = __WEBPACK_IMPORTED_MODULE_3__env_Environment__["environment"].toCDNHostURL(url);
        delete this._playingDict[toUrl];
    };
    /**
     * 停止音频（会重置进度）
     *
     * @param {string} url 音频URL
     * @memberof AudioContextImpl
     */
    AudioContextImpl.prototype.stop = function (url) {
        this._doStop(url, 0);
        // 移除播放中
        var toUrl = __WEBPACK_IMPORTED_MODULE_3__env_Environment__["environment"].toCDNHostURL(url);
        delete this._playingDict[toUrl];
    };
    /**
     * 停止所有音频
     *
     * @memberof AudioContextImpl
     */
    AudioContextImpl.prototype.stopAll = function () {
        for (var url in this._audioCache) {
            this.stop(url);
        }
    };
    /**
     * 跳转音频进度
     *
     * @param {string} url 音频URL
     * @param {number} time 要跳转到的音频位置，毫秒值
     * @memberof AudioContextImpl
     */
    AudioContextImpl.prototype.seek = function (url, time) {
        var toUrl = __WEBPACK_IMPORTED_MODULE_3__env_Environment__["environment"].toCDNHostURL(url);
        var data = this._audioCache[toUrl];
        if (data) {
            var params = data.playParams;
            if (data.status == AudioStatus.PLAYING) {
                // 停止重新播放
                this.stop(url);
                params.time = time;
                this.play(params);
            }
            else {
                data.playTime = time;
            }
        }
    };
    return AudioContextImpl;
}());
/* harmony default export */ __webpack_exports__["a"] = (AudioContextImpl);
var AudioStatus;
(function (AudioStatus) {
    /**
     * 加载中
     */
    AudioStatus[AudioStatus["LOADING"] = 0] = "LOADING";
    /**
     * 已暂停
     */
    AudioStatus[AudioStatus["PAUSED"] = 1] = "PAUSED";
    /**
     * 播放中
     */
    AudioStatus[AudioStatus["PLAYING"] = 2] = "PLAYING";
})(AudioStatus || (AudioStatus = {}));


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(51), __webpack_require__(35), __webpack_require__(77)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, TestResponse_1, RequestData_1, HTTPRequestPolicy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @author TemplateGenerator
     * @email initial_r@qq.com
     * @modify date 10/9/2017
     *
     * 测试
    */
    var TestRequest = /** @class */ (function (_super) {
        __extends(TestRequest, _super);
        function TestRequest() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.__policy = HTTPRequestPolicy_1.default;
            return _this;
        }
        Object.defineProperty(TestRequest.prototype, "__params", {
            get: function () {
                return {
                    type: "Test",
                    path: "/test",
                    protocol: "http",
                    response: TestResponse_1.default,
                    data: {
                        test: this.test // string - 测试
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        ;
        return TestRequest;
    }(RequestData_1.default));
    exports.default = TestRequest;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdFJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJUZXN0UmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBS0E7Ozs7OztNQU1FO0lBQ0Y7UUFBeUMsK0JBQVc7UUFBcEQ7WUFBQSxxRUF1QkM7WUFEVSxjQUFRLEdBQWtCLDJCQUFNLENBQUM7O1FBQzVDLENBQUM7UUFiRyxzQkFBVyxpQ0FBUTtpQkFBbkI7Z0JBRUksTUFBTSxDQUFDO29CQUNILElBQUksRUFBRSxNQUFNO29CQUNyQixJQUFJLEVBQUUsT0FBTztvQkFDSixRQUFRLEVBQUUsTUFBTTtvQkFDaEIsUUFBUSxFQUFFLHNCQUFZO29CQUN0QixJQUFJLEVBQUU7d0JBQ0YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUEsY0FBYztxQkFDaEM7aUJBQ0osQ0FBQztZQUNOLENBQUM7OztXQUFBO1FBQUEsQ0FBQztRQUVOLGtCQUFDO0lBQUQsQ0FBQyxBQXZCRCxDQUF5QyxxQkFBVyxHQXVCbkQifQ==

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(44)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, DataType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @author TemplateGenerator
     * @email initial_r@qq.com
     * @modify date 10/9/2017
     *
     * 测试
    */
    var Test = /** @class */ (function (_super) {
        __extends(Test, _super);
        function Test() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Test.prototype.doParse = function (data) {
            if (data == null)
                return;
            this.test = data.test;
        };
        Test.prototype.pack = function () {
            return {
                test: this.test
            };
        };
        return Test;
    }(DataType_1.default));
    exports.default = Test;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUVBOzs7Ozs7TUFNRTtJQUNGO1FBQWtDLHdCQUFRO1FBQTFDOztRQXNCQSxDQUFDO1FBWmEsc0JBQU8sR0FBakIsVUFBa0IsSUFBUTtZQUV0QixFQUFFLENBQUEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO2dCQUFDLE1BQU0sQ0FBQztZQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDMUIsQ0FBQztRQUVNLG1CQUFJLEdBQVg7WUFFSSxNQUFNLENBQUM7Z0JBQ0gsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2FBQ2xCLENBQUM7UUFDTixDQUFDO1FBQ0wsV0FBQztJQUFELENBQUMsQUF0QkQsQ0FBa0Msa0JBQVEsR0FzQnpDIn0=

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HTTPRequestPolicy", function() { return HTTPRequestPolicy; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_HTTPUtil__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__env_Environment__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__NetManager__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_ObjectUtil__ = __webpack_require__(3);




/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-11
 * @modify date 2017-09-11
 *
 * HTTP请求策略
*/
var HTTPRequestPolicy = /** @class */ (function () {
    function HTTPRequestPolicy() {
    }
    /**
     * 发送请求逻辑
     *
     * @param {RequestData} request 请求数据
     * @memberof HTTPRequestPolicy
     */
    HTTPRequestPolicy.prototype.sendRequest = function (request) {
        // 取到参数
        var params = request.__params;
        // 修改数据
        var httpParams = Object(__WEBPACK_IMPORTED_MODULE_3__utils_ObjectUtil__["b" /* extendObject */])({
            url: __WEBPACK_IMPORTED_MODULE_1__env_Environment__["environment"].toHostURL(params.path, params.hostIndex),
            onResponse: function (result) { return __WEBPACK_IMPORTED_MODULE_2__NetManager__["netManager"].__onResponse(request.__params.response.type, result, request); },
            onError: function (err) { return __WEBPACK_IMPORTED_MODULE_2__NetManager__["netManager"].__onError(request.__params.response.type, err, request); },
            headerDict: {}
        }, params);
        // 发送
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_HTTPUtil__["a" /* load */])(httpParams);
    };
    return HTTPRequestPolicy;
}());

/** 再额外导出一个实例 */
/* harmony default export */ __webpack_exports__["default"] = (new HTTPRequestPolicy());


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(8), __webpack_require__(53)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Mediator_1, Injector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TestComp = /** @class */ (function (_super) {
        __extends(TestComp, _super);
        function TestComp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TestComp.prototype.onOpen = function () {
            this.skin.x = 100;
            this.skin.y = 100;
            this.parent.skin.addChild(this.skin);
            this.dispatch("TestCompMsg");
        };
        TestComp.prototype.onDispose = function () {
            this.parent.skin.removeChild(this.skin);
        };
        TestComp = __decorate([
            Injector_1.EgretMediatorClass("TestComp", "TestCompSkin")
        ], TestComp);
        return TestComp;
    }(Mediator_1.default));
    exports.default = TestComp;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdENvbXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJUZXN0Q29tcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBSUE7UUFBc0MsNEJBQVE7UUFBOUM7O1FBZUEsQ0FBQztRQWJVLHlCQUFNLEdBQWI7WUFFSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBRU0sNEJBQVMsR0FBaEI7WUFFSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFkZ0IsUUFBUTtZQUQ1Qiw2QkFBa0IsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDO1dBQzFCLFFBQVEsQ0FlNUI7UUFBRCxlQUFDO0tBQUEsQUFmRCxDQUFzQyxrQkFBUSxHQWU3QztzQkFmb0IsUUFBUSJ9

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(18), __webpack_require__(7), __webpack_require__(8), __webpack_require__(10), __webpack_require__(54)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Injector_1, Injector_2, Mediator_1, ModuleManager_1, TestPanel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TestForMediator = /** @class */ (function (_super) {
        __extends(TestForMediator, _super);
        function TestForMediator(skin) {
            return _super.call(this, skin) || this;
        }
        TestForMediator.prototype.onOpen = function (data) {
            this.viewModel = {
                data: data,
                onClickText: function () {
                    ModuleManager_1.moduleManager.open(TestPanel_1.default);
                }
            };
            console.log("asdfasdf - " + data);
        };
        __decorate([
            Injector_2.BindOn("click", "onClickText"),
            __metadata("design:type", Object)
        ], TestForMediator.prototype, "skin", void 0);
        __decorate([
            Injector_2.BindValue({ innerHTML: "'这是替换后的渲染器内层 - ' + data.fuck + '<br/>'" }),
            __metadata("design:type", HTMLElement)
        ], TestForMediator.prototype, "asdf", void 0);
        TestForMediator = __decorate([
            Injector_1.DOMMediatorClass("TestForMediator", "<div>这是替换后的渲染器外层<div id='asdf'></div></div>"),
            __metadata("design:paramtypes", [Object])
        ], TestForMediator);
        return TestForMediator;
    }(Mediator_1.default));
    exports.default = TestForMediator;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdEZvck1lZGlhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVGVzdEZvck1lZGlhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFPQTtRQUE2QyxtQ0FBUTtRQVFqRCx5QkFBbUIsSUFBSTttQkFFbkIsa0JBQU0sSUFBSSxDQUFDO1FBQ2YsQ0FBQztRQUVNLGdDQUFNLEdBQWIsVUFBYyxJQUFJO1lBRWQsSUFBSSxDQUFDLFNBQVMsR0FBRztnQkFDYixJQUFJLEVBQUUsSUFBSTtnQkFDVixXQUFXLEVBQUU7b0JBQ1QsNkJBQWEsQ0FBQyxJQUFJLENBQUMsbUJBQVMsQ0FBQyxDQUFDO2dCQUNsQyxDQUFDO2FBQ0osQ0FBQTtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFuQkQ7WUFEQyxpQkFBTSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUM7O3FEQUNmO1FBR2hCO1lBREMsb0JBQVMsQ0FBQyxFQUFDLFNBQVMsRUFBRSx3Q0FBd0MsRUFBQyxDQUFDO3NDQUNyRCxXQUFXO3FEQUFDO1FBTlAsZUFBZTtZQURuQywyQkFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSw2Q0FBNkMsQ0FBQzs7V0FDOUQsZUFBZSxDQXVCbkM7UUFBRCxzQkFBQztLQUFBLEFBdkJELENBQTZDLGtCQUFRLEdBdUJwRDtzQkF2Qm9CLGVBQWUifQ==

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mediator_Mediator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PanelManager__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mediator_MediatorMessage__ = __webpack_require__(24);




/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-06
 * @modify date 2017-09-06
 *
 * 实现了IPanel接口的弹窗中介者基类
*/
var PanelMediator = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](PanelMediator, _super);
    function PanelMediator(skin, policy) {
        var _this = _super.call(this, skin) || this;
        _this.policy = policy;
        return _this;
    }
    PanelMediator.prototype.__afterOnOpen = function (data, isModel, from) {
        __WEBPACK_IMPORTED_MODULE_2__PanelManager__["a" /* panelManager */].pop(this, data, isModel, from);
    };
    PanelMediator.prototype.__afterOnClose = function (data, to) {
        var _this = this;
        // 篡改onAfterDrop，等待关闭动画结束后再执行
        var oriOnAfterDrop = this.onAfterDrop;
        this.onAfterDrop = function (data, to) {
            oriOnAfterDrop.call(_this, data, to);
            // 派发关闭事件
            _this.dispatch(__WEBPACK_IMPORTED_MODULE_3__mediator_MediatorMessage__["a" /* default */].MEDIATOR_CLOSED, _this);
        };
        __WEBPACK_IMPORTED_MODULE_2__PanelManager__["a" /* panelManager */].drop(this, data, to);
    };
    /** 在弹出前调用的方法 */
    PanelMediator.prototype.onBeforePop = function (data, isModel, from) {
        // 可重写
    };
    /** 在弹出后调用的方法 */
    PanelMediator.prototype.onAfterPop = function (data, isModel, from) {
        // 可重写
    };
    /** 在关闭前调用的方法 */
    PanelMediator.prototype.onBeforeDrop = function (data, to) {
        // 可重写
    };
    /** 在关闭后调用的方法 */
    PanelMediator.prototype.onAfterDrop = function (data, to) {
        // 可重写
    };
    return PanelMediator;
}(__WEBPACK_IMPORTED_MODULE_1__mediator_Mediator__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (PanelMediator);


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(52), __webpack_require__(49), __webpack_require__(14), __webpack_require__(2), __webpack_require__(10), __webpack_require__(7), __webpack_require__(18), __webpack_require__(54)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Second_1, FuckModel_1, SceneMediator_1, Injector_1, ModuleManager_1, Injector_2, Injector_3, TestPanel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @author Raykid
     * @email initial_r@qq.com
     * @create date 2017-09-18
     * @modify date 2017-09-18
     *
     * 测试首个模块
    */
    var Third = /** @class */ (function (_super) {
        __extends(Third, _super);
        function Third() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Third_1 = Third;
        Third.prototype.listAssets = function () {
            return ["./modules/test.html"];
        };
        Third.prototype.onOpen = function () {
            var _this = this;
            this.viewModel = {
                fuckList: [1, 2, "shit", "you"],
                fuckText: "fuck you",
                onClickBtn: function () {
                    _this.viewModel.fuckText = "clicked";
                    _this.moduleManager.open(Second_1.default, null, true);
                },
                onClickText: function () {
                    _this.moduleManager.open(TestPanel_1.default);
                },
                onClickFuck: function () {
                    _this.moduleManager.close(Third_1);
                },
                fuckModel: this.fuckModel1
            };
        };
        Third.moduleName = "Third";
        __decorate([
            Injector_1.Inject,
            __metadata("design:type", ModuleManager_1.default)
        ], Third.prototype, "moduleManager", void 0);
        __decorate([
            Injector_1.Inject,
            __metadata("design:type", FuckModel_1.default)
        ], Third.prototype, "fuckModel1", void 0);
        __decorate([
            Injector_1.Inject,
            __metadata("design:type", FuckModel_1.IFuckModel)
        ], Third.prototype, "fuckModel2", void 0);
        __decorate([
            Injector_1.Inject(1),
            __metadata("design:type", FuckModel_1.IFuckModel)
        ], Third.prototype, "fuckModel3", void 0);
        __decorate([
            Injector_2.BindOn({ click: "onClickBtn" }),
            Injector_2.BindIf("fuckText == '1234'"),
            __metadata("design:type", HTMLElement)
        ], Third.prototype, "btn", void 0);
        __decorate([
            Injector_2.BindFor("fuck in fuckList"),
            Injector_2.BindValue({ textContent: "fuck + ' - ' + fuckText + ' - 1'" }),
            Injector_2.BindOn("click", "onClickText"),
            __metadata("design:type", HTMLElement)
        ], Third.prototype, "txt", void 0);
        __decorate([
            Injector_2.BindOn("click", "onClickFuck"),
            Injector_2.BindValue("textContent", "fuckModel.fuck"),
            __metadata("design:type", HTMLElement)
        ], Third.prototype, "fuck", void 0);
        Third = Third_1 = __decorate([
            Injector_3.DOMMediatorClass("Third", "./modules/test.html")
        ], Third);
        return Third;
        var Third_1;
    }(SceneMediator_1.default));
    exports.default = Third;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGhpcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJUaGlyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBYUE7Ozs7Ozs7TUFPRTtJQUdGO1FBQW1DLHlCQUFhO1FBQWhEOztRQStDQSxDQUFDO2tCQS9Db0IsS0FBSztRQXdCZiwwQkFBVSxHQUFqQjtZQUVJLE1BQU0sQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUVNLHNCQUFNLEdBQWI7WUFBQSxpQkFpQkM7WUFmRyxJQUFJLENBQUMsU0FBUyxHQUFHO2dCQUNiLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQztnQkFDL0IsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFVBQVUsRUFBRTtvQkFDUixLQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7b0JBQ3BDLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGdCQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNoRCxDQUFDO2dCQUNELFdBQVcsRUFBRTtvQkFDVCxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxtQkFBUyxDQUFDLENBQUM7Z0JBQ3ZDLENBQUM7Z0JBQ0QsV0FBVyxFQUFFO29CQUNULEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQUssQ0FBQyxDQUFDO2dCQUNwQyxDQUFDO2dCQUNELFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVTthQUM3QixDQUFDO1FBQ04sQ0FBQztRQTVDYSxnQkFBVSxHQUFVLE9BQU8sQ0FBQztRQUcxQztZQURDLGlCQUFNO3NDQUNlLHVCQUFhO29EQUFDO1FBRXBDO1lBREMsaUJBQU07c0NBQ1ksbUJBQVM7aURBQUM7UUFFN0I7WUFEQyxpQkFBTTtzQ0FDWSxzQkFBVTtpREFBQztRQUU5QjtZQURDLGlCQUFNLENBQUMsQ0FBQyxDQUFDO3NDQUNTLHNCQUFVO2lEQUFDO1FBSTlCO1lBRkMsaUJBQU0sQ0FBQyxFQUFDLEtBQUssRUFBRSxZQUFZLEVBQUMsQ0FBQztZQUM3QixpQkFBTSxDQUFDLG9CQUFvQixDQUFDO3NDQUNsQixXQUFXOzBDQUFBO1FBSXRCO1lBSEMsa0JBQU8sQ0FBQyxrQkFBa0IsQ0FBQztZQUMzQixvQkFBUyxDQUFDLEVBQUMsV0FBVyxFQUFFLGtDQUFrQyxFQUFDLENBQUM7WUFDNUQsaUJBQU0sQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDO3NDQUNwQixXQUFXOzBDQUFDO1FBR3ZCO1lBRkMsaUJBQU0sQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDO1lBQzlCLG9CQUFTLENBQUMsYUFBYSxFQUFFLGdCQUFnQixDQUFDO3NDQUMvQixXQUFXOzJDQUFDO1FBdEJQLEtBQUs7WUFEekIsMkJBQWdCLENBQUMsT0FBTyxFQUFFLHFCQUFxQixDQUFDO1dBQzVCLEtBQUssQ0ErQ3pCO1FBQUQsWUFBQzs7S0FBQSxBQS9DRCxDQUFtQyx1QkFBYSxHQStDL0M7c0JBL0NvQixLQUFLIn0=

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_Engine__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Core__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "core", function() { return __WEBPACK_IMPORTED_MODULE_1__core_Core__["a"]; });


/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-18
 * @modify date 2017-09-18
 *
 * Olympus框架便捷启动与框架外观模块
*/
var Olympus = /** @class */ (function () {
    function Olympus() {
    }
    /**
     * 启动Olympus框架
     *
     * @static
     * @param {IInitParams} params 启动参数
     * @memberof Olympus
     */
    Olympus.startup = function (params) {
        // 初始化引擎模块
        __WEBPACK_IMPORTED_MODULE_0__engine_Engine__["a" /* engine */].initialize(params);
    };
    return Olympus;
}());
/* harmony default export */ __webpack_exports__["default"] = (Olympus);


/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return engine; });
/* unused harmony export InitStep */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_injector_Injector__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bridge_BridgeManager__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bridge_BridgeMessage__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__module_ModuleManager__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_AssetsManager__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__env_Environment__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__env_Hash__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__version_Version__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__module_ModuleMessage__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__message_EngineMessage__ = __webpack_require__(48);












/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-06
 * @modify date 2017-09-06
 *
 * Engine模组是开发框架的引擎部分，包括业务模块系统、应用程序启动和初始化、弹窗和场景管理器等与项目开发相关的逻辑都在这个模组中
 * 这个模组的逻辑都高度集成在子模组中了，因此也只是收集相关子模组
*/
var Engine = /** @class */ (function () {
    function Engine() {
    }
    /**
     * 初始化Engine
     *
     * @param {IInitParams} params 初始化参数
     * @memberof Engine
     */
    Engine.prototype.initialize = function (params) {
        var self = this;
        // 调用进度回调，初始化为0%
        params.onInitProgress && params.onInitProgress(0, InitStep.ReadyToInit);
        // 执行初始化
        if (document.readyState == "loading")
            document.addEventListener("readystatechange", doInitialize);
        else
            doInitialize();
        function doInitialize() {
            // 调用进度回调，开始初始化为10%
            params.onInitProgress && params.onInitProgress(0.1, InitStep.StartInit);
            // 移除事件
            if (this == document)
                document.removeEventListener("readystatechange", doInitialize);
            // 要判断document是否初始化完毕
            self._initParams = params;
            // 加载页
            self._loadElement = (typeof params.loadElement == "string" ? document.querySelector(params.loadElement) : params.loadElement);
            // 监听错误事件
            if (params.onError)
                self.listenError(params.onError);
            // 初始化环境参数
            __WEBPACK_IMPORTED_MODULE_7__env_Environment__["environment"].initialize(params.env, params.hostsDict, params.cdnsDict);
            // 初始化版本号工具
            __WEBPACK_IMPORTED_MODULE_9__version_Version__["a" /* version */].initialize(function () {
                // 调用进度回调，版本号初始化完毕为20%
                params.onInitProgress && params.onInitProgress(0.2, InitStep.VersionInited);
                // 监听Bridge初始化完毕事件，显示第一个模块
                __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].listen(__WEBPACK_IMPORTED_MODULE_4__bridge_BridgeMessage__["a" /* default */].BRIDGE_ALL_INIT, self.onAllBridgesInit, self);
                // 注册并初始化表现层桥实例
                __WEBPACK_IMPORTED_MODULE_3__bridge_BridgeManager__["a" /* bridgeManager */].registerBridge.apply(__WEBPACK_IMPORTED_MODULE_3__bridge_BridgeManager__["a" /* bridgeManager */], params.bridges);
            }, params.version);
        }
    };
    /**
     * 添加错误监听函数
     *
     * @param {(evt?:ErrorEvent)=>void} handler 错误监听函数
     * @memberof Engine
     */
    Engine.prototype.listenError = function (handler) {
        if (handler)
            window.addEventListener("error", handler);
    };
    Engine.prototype.onAllBridgesInit = function () {
        var _this = this;
        // 调用进度回调，表现层桥初始化完毕为30%
        this._initParams.onInitProgress && this._initParams.onInitProgress(0.3, InitStep.BridgesInited);
        // 注销监听
        __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].unlisten(__WEBPACK_IMPORTED_MODULE_4__bridge_BridgeMessage__["a" /* default */].BRIDGE_ALL_INIT, this.onAllBridgesInit, this);
        // 初始化插件
        if (this._initParams.plugins) {
            for (var _i = 0, _a = this._initParams.plugins; _i < _a.length; _i++) {
                var plugin = _a[_i];
                plugin.initPlugin();
            }
        }
        // 注册短名称
        __WEBPACK_IMPORTED_MODULE_6__assets_AssetsManager__["b" /* assetsManager */].configPath(this._initParams.pathDict);
        // 开始预加载过程
        var preloads = this._initParams.preloads;
        if (preloads) {
            // 去加载
            var curIndex = 0;
            var totalCount = preloads.length;
            __WEBPACK_IMPORTED_MODULE_6__assets_AssetsManager__["b" /* assetsManager */].loadAssets(preloads, this.onPreloadOK.bind(this), null, function (key, value) {
                curIndex++;
                // 调用进度回调，每个预加载文件平分30%-90%的进度
                var progress = 0.3 + 0.6 * curIndex / totalCount;
                // 保留2位小数
                progress = Math.round(progress * 100) * 0.01;
                _this._initParams.onInitProgress && _this._initParams.onInitProgress(progress, InitStep.Preload, key, value);
            });
        }
        else {
            // 没有预加载，直接完成
            this.onPreloadOK();
        }
    };
    Engine.prototype.onPreloadOK = function () {
        // 调用进度回调，打开首个模块为90%
        this._initParams.onInitProgress && this._initParams.onInitProgress(0.9, InitStep.OpenFirstModule);
        // 派发事件
        __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].dispatch(__WEBPACK_IMPORTED_MODULE_11__message_EngineMessage__["a" /* default */].INITIALIZED);
        // 调用初始化完成回调
        this._initParams.onInited && this._initParams.onInited();
        // 监听首个模块开启
        __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].listen(__WEBPACK_IMPORTED_MODULE_10__module_ModuleMessage__["default"].MODULE_CHANGE, this.onModuleChange, this);
        // 打开首个模块
        __WEBPACK_IMPORTED_MODULE_5__module_ModuleManager__["moduleManager"].open(this._initParams.firstModule, __WEBPACK_IMPORTED_MODULE_8__env_Hash__["hash"].firstModuleParams);
        // 如果有哈希模块则打开之
        for (var i in __WEBPACK_IMPORTED_MODULE_8__env_Hash__["hash"].moduleDatas) {
            var data = __WEBPACK_IMPORTED_MODULE_8__env_Hash__["hash"].moduleDatas[i];
            // 如果模块没有名字则不进行操作
            if (data.name)
                __WEBPACK_IMPORTED_MODULE_5__module_ModuleManager__["moduleManager"].open(data.name, data.params, data.direct);
        }
    };
    Engine.prototype.onModuleChange = function (from) {
        // 调用进度回调，全部过程完毕，100%
        this._initParams.onInitProgress && this._initParams.onInitProgress(1, InitStep.Inited);
        // 注销监听
        __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].unlisten(__WEBPACK_IMPORTED_MODULE_10__module_ModuleMessage__["default"].MODULE_CHANGE, this.onModuleChange, this);
        // 移除loadElement显示
        if (this._loadElement) {
            var parent = this._loadElement.parentElement;
            parent && parent.removeChild(this._loadElement);
        }
    };
    Engine = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
        __WEBPACK_IMPORTED_MODULE_2__core_injector_Injector__["Injectable"]
    ], Engine);
    return Engine;
}());
/* unused harmony default export */ var _unused_webpack_default_export = (Engine);
/** 再额外导出一个单例 */
var engine = __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].getInject(Engine);
var InitStep;
(function (InitStep) {
    /** 框架已准备好初始化 */
    InitStep[InitStep["ReadyToInit"] = 0] = "ReadyToInit";
    /** 开始执行初始化 */
    InitStep[InitStep["StartInit"] = 1] = "StartInit";
    /** 版本号系统初始化完毕 */
    InitStep[InitStep["VersionInited"] = 2] = "VersionInited";
    /** 表现层桥初始化完毕 */
    InitStep[InitStep["BridgesInited"] = 3] = "BridgesInited";
    /** 预加载，可能会触发多次，每次传递两个参数：预加载文件名或路径、预加载文件内容 */
    InitStep[InitStep["Preload"] = 4] = "Preload";
    /** 开始打开首个模块 */
    InitStep[InitStep["OpenFirstModule"] = 5] = "OpenFirstModule";
    /** 首个模块打开完毕，初始化流程完毕 */
    InitStep[InitStep["Inited"] = 6] = "Inited";
})(InitStep || (InitStep = {}));


/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-19
 * @modify date 2017-09-19
 *
 * 渲染模式枚举
*/
var RenderMode;
(function (RenderMode) {
    RenderMode[RenderMode["AUTO"] = 0] = "AUTO";
    RenderMode[RenderMode["CANVAS"] = 1] = "CANVAS";
    RenderMode[RenderMode["WEBGL"] = 2] = "WEBGL";
})(RenderMode || (RenderMode = {}));
/* harmony default export */ __webpack_exports__["a"] = (RenderMode);


/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ResourceVersionController */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_olympus_r_engine_env_Environment__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_olympus_r_engine_panel_PanelManager__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_olympus_r_engine_platform_PlatformManager__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_olympus_r_engine_version_Version__ = __webpack_require__(23);





var ResourceVersionController = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](ResourceVersionController, _super);
    function ResourceVersionController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceVersionController.prototype.getVirtualUrl = function (url) {
        // 添加imgDomain
        url = __WEBPACK_IMPORTED_MODULE_1_olympus_r_engine_env_Environment__["environment"].toCDNHostURL(url);
        // 添加版本号，有哈希值就用哈希值加载，没有就用编译版本号加载
        url = __WEBPACK_IMPORTED_MODULE_4_olympus_r_engine_version_Version__["a" /* version */].wrapHashUrl(url);
        // 返回url
        return url;
    };
    return ResourceVersionController;
}(RES.VersionController));

// 这里直接注册一下
RES.registerVersionController(new ResourceVersionController());
var AssetsLoader = /** @class */ (function () {
    function AssetsLoader(handler) {
        this._retryDict = {};
        this._handler = handler;
    }
    AssetsLoader.prototype.loadGroups = function (groups) {
        // 调用回调
        this._handler.start && this._handler.start();
        // 组名如果是空字符串则会导致Egret什么都不干，所以要移除空字符串的组名
        groups = groups && groups.filter(function (group) {
            if (typeof group == "string")
                return (group != "");
            else
                return (group.name != "");
        });
        // 开始加载
        var groupDict = {};
        var pgsDict;
        var len = groups ? groups.length : 0;
        if (len == 0) {
            this._handler.complete && this._handler.complete(groupDict);
        }
        else {
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, onProgress, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onOneComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onOneError, this);
            var temp = groups.concat();
            pgsDict = {};
            for (var i in groups) {
                var group = groups[i];
                if (typeof group == "string") {
                    pgsDict[group] = 0;
                    RES.loadGroup(group);
                }
                else {
                    pgsDict[group.name] = 0;
                    RES.loadGroup(group.name, group.priority);
                }
            }
        }
        function onProgress(evt) {
            // 填充资源字典
            var itemDict = groupDict[evt.groupName];
            if (!itemDict)
                groupDict[evt.groupName] = itemDict = {};
            itemDict[evt.resItem.name] = evt.resItem;
            // 计算总进度
            pgsDict[evt.groupName] = evt.itemsLoaded / evt.itemsTotal;
            var pgs = 0;
            for (var key in pgsDict) {
                pgs += pgsDict[key];
            }
            pgs /= len;
            // 回调
            this._handler.progress && this._handler.progress(evt.resItem, pgs);
        }
        function onOneComplete(evt) {
            // 调用单一完毕回调
            this._handler.oneComplete && this._handler.oneComplete(groupDict[evt.groupName]);
            // 测试是否全部完毕
            var index = temp.indexOf(evt.groupName);
            if (index >= 0) {
                // 移除加载组名
                temp.splice(index, 1);
                // 判断是否全部完成
                if (temp.length == 0) {
                    // 移除事件监听
                    RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, onProgress, this);
                    RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onOneComplete, this);
                    RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onOneError, this);
                    // 调用回调
                    this._handler.complete && this._handler.complete(groupDict);
                }
            }
        }
        function onOneError(evt) {
            var groupName = evt.groupName;
            var retryTimes = this._retryDict[groupName];
            if (retryTimes == null)
                retryTimes = 0;
            if (retryTimes < 3) {
                this._retryDict[groupName] = ++retryTimes;
                // 打印日志
                console.warn("加载失败，重试第" + retryTimes + "次: " + groupName);
                // 没到最大重试次数，将为url添加一个随机时间戳重新加回加载队列
                RES.loadGroup(evt.groupName);
            }
            else {
                // 打印日志
                console.warn("加载失败3次，正在尝试切换CDN...");
                // 尝试切换CDN
                var allDone = __WEBPACK_IMPORTED_MODULE_1_olympus_r_engine_env_Environment__["environment"].nextCDN();
                if (!allDone) {
                    // 重新加载
                    RES.loadGroup(evt.groupName);
                }
                else {
                    // 移除事件监听
                    RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, onProgress, this);
                    RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onOneComplete, this);
                    RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onOneError, this);
                    // 调用模板方法
                    this._handler.oneError && this._handler.oneError(evt);
                    // 切换CDN失败了，弹出提示，使用户可以手动刷新页面
                    __WEBPACK_IMPORTED_MODULE_2_olympus_r_engine_panel_PanelManager__["a" /* panelManager */].confirm("资源组加载失败[" + groupName + "]，点击确定刷新页面", function () {
                        __WEBPACK_IMPORTED_MODULE_3_olympus_r_engine_platform_PlatformManager__["a" /* platformManager */].reload();
                    });
                }
            }
        }
    };
    return AssetsLoader;
}());
/* harmony default export */ __webpack_exports__["a"] = (AssetsLoader);


/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return platformManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_injector_Injector__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__WebPlatform__ = __webpack_require__(87);




/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-21
 * @modify date 2017-09-21
 *
 * 平台接口管理器，通过桥接模式统一不同平台的不同接口，从而实现对框架其他模块透明化
*/
var PlatformManager = /** @class */ (function () {
    function PlatformManager() {
        /**
         * 平台接口实现对象，默认是普通网页平台，也可以根据需要定制
         *
         * @type {IPlatform}
         * @memberof PlatformManager
         */
        this.platform = new __WEBPACK_IMPORTED_MODULE_3__WebPlatform__["a" /* default */]();
    }
    /**
     * 刷新当前页面
     *
     * @memberof PlatformManager
     */
    PlatformManager.prototype.reload = function () {
        this.platform.reload();
    };
    PlatformManager = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
        __WEBPACK_IMPORTED_MODULE_2__core_injector_Injector__["Injectable"]
    ], PlatformManager);
    return PlatformManager;
}());
/* unused harmony default export */ var _unused_webpack_default_export = (PlatformManager);
/** 再额外导出一个单例 */
var platformManager = __WEBPACK_IMPORTED_MODULE_1__core_Core__["a" /* core */].getInject(PlatformManager);


/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-21
 * @modify date 2017-09-21
 *
 * 网页平台接口实现类，也是平台接口的默认类
*/
var WebPlatform = /** @class */ (function () {
    function WebPlatform() {
    }
    WebPlatform.prototype.reload = function () {
        window.location.reload(true);
    };
    return WebPlatform;
}());
/* harmony default export */ __webpack_exports__["a"] = (WebPlatform);


/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_TweenUtil__ = __webpack_require__(89);

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-22
 * @modify date 2017-09-22
 *
 * 回弹效果
*/
var BackPanelPolicy = /** @class */ (function () {
    function BackPanelPolicy() {
    }
    /**
     * 显示时调用
     * @param panel 弹出框对象
     * @param callback 完成回调，必须调用
     * @param from 动画起始点
     */
    BackPanelPolicy.prototype.pop = function (panel, callback, from) {
        // 开始动画弹出
        var entity = panel.skin;
        egret.Tween.removeTweens(entity);
        // 恢复体积
        entity.scaleX = 1;
        entity.scaleY = 1;
        var fromX = 0;
        var fromY = 0;
        if (from != null) {
            fromX = from.x;
            fromY = from.y;
        }
        else {
            fromX = entity.stage.stageWidth * 0.5;
            fromY = entity.stage.stageHeight * 0.5;
        }
        // 更新弹出后位置
        entity.x = fromX - entity.width * 0.5;
        entity.y = fromY - entity.height * 0.5;
        // 开始缓动
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_TweenUtil__["a" /* tweenFrom */])(entity, {
            x: fromX,
            y: fromY,
            scaleX: 0,
            scaleY: 0
        }, 300, egret.Ease.backOut).call(callback);
    };
    /**
     * 关闭时调用
     * @param popup 弹出框对象
     * @param callback 完成回调，必须调用
     * @param to 动画完结点
     */
    BackPanelPolicy.prototype.drop = function (panel, callback, to) {
        // 开始动画关闭
        var entity = panel.skin;
        egret.Tween.removeTweens(entity);
        var toX = 0;
        var toY = 0;
        if (to != null) {
            toX = to.x;
            toY = to.y;
        }
        else {
            toX = entity.x + entity.width * 0.5;
            toY = entity.y + entity.height * 0.5;
        }
        Object(__WEBPACK_IMPORTED_MODULE_0__utils_TweenUtil__["b" /* tweenTo */])(entity, {
            x: toX,
            y: toY,
            scaleX: 0,
            scaleY: 0
        }, 300, egret.Ease.backIn).call(function () {
            // 恢复体积
            entity.scaleX = 1;
            entity.scaleY = 1;
            if (callback != null)
                callback();
        });
    };
    return BackPanelPolicy;
}());
/* harmony default export */ __webpack_exports__["a"] = (BackPanelPolicy);


/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = tweenTo;
/* harmony export (immutable) */ __webpack_exports__["a"] = tweenFrom;
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-22
 * @modify date 2017-09-22
 *
 * Egret缓动工具集，用来弥补Egret的Tween的不足
*/
function tweenTo(target, props, duration, ease) {
    return egret.Tween.get(target).to(props, duration, ease);
}
function tweenFrom(target, props, duration, ease) {
    // 对换参数状态
    var toProps = {};
    for (var key in props) {
        toProps[key] = target[key];
        target[key] = props[key];
    }
    // 开始缓动
    return egret.Tween.get(target).to(toProps, duration, ease);
}


/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-22
 * @modify date 2017-09-22
 *
 * 淡入淡出场景切换策略
*/
var FadeScenePolicy = /** @class */ (function () {
    function FadeScenePolicy() {
        this._tempSnapshot = new egret.Bitmap();
    }
    /**
     * 准备切换场景时调度
     * @param from 切出的场景
     * @param to 切入的场景
     */
    FadeScenePolicy.prototype.prepareSwitch = function (from, to) {
        if (from != null) {
            var root = from.bridge.root;
            // 截取当前屏幕
            var texture = new egret.RenderTexture();
            texture.drawToTexture(root);
            this._tempSnapshot.texture = texture;
            this._tempSnapshot.alpha = 1;
            root.addChild(this._tempSnapshot);
            // 移除from
            var fromDisplay = from.skin;
            if (fromDisplay.parent != null) {
                fromDisplay.parent.removeChild(fromDisplay);
            }
        }
    };
    /**
     * 切换场景时调度
     * @param from 切出的场景
     * @param to 切入的场景
     * @param callback 切换完毕的回调方法
     */
    FadeScenePolicy.prototype.switch = function (from, to, callback) {
        if (from != null) {
            // 开始淡出
            egret.Tween.removeTweens(this._tempSnapshot);
            egret.Tween.get(this._tempSnapshot).to({
                alpha: 0
            }, 300).call(function () {
                // 移除截屏
                if (this._tempSnapshot.parent != null) {
                    this._tempSnapshot.parent.removeChild(this._tempSnapshot);
                }
                // 回收资源
                if (this._tempSnapshot.texture != null) {
                    this._tempSnapshot.texture.dispose();
                    this._tempSnapshot.texture = null;
                }
                // 调用回调
                callback();
            }, this);
        }
        else {
            // 移除截屏
            if (this._tempSnapshot.parent != null) {
                this._tempSnapshot.parent.removeChild(this._tempSnapshot);
            }
            // 调用回调
            callback();
        }
    };
    return FadeScenePolicy;
}());
/* harmony default export */ __webpack_exports__["a"] = (FadeScenePolicy);


/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_olympus_r_engine_bridge_BridgeManager__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_olympus_r_utils_Dictionary__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__EgretBridge__ = __webpack_require__(28);



/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-10-25
 * @modify date 2017-10-25
 *
 * Egret遮罩实现
*/
var MaskEntityImpl = /** @class */ (function () {
    function MaskEntityImpl(params) {
        this._maskAlpha = 0.5;
        this._loadingAlpha = 0.5;
        this._modalPanelAlpha = 0.5;
        this._showingMask = false;
        this._showingLoading = false;
        if (params != null) {
            this._maskAlpha = (params.maskAlpha != null ? params.maskAlpha : 0.5);
            this._loadingAlpha = (params.loadingAlpha != null ? params.loadingAlpha : 0.5);
            this._modalPanelAlpha = (params.modalPanelAlpha != null ? params.modalPanelAlpha : 0.5);
            this._loadingSkinFactory = params.loadingSkinFactory;
        }
        this.maskData = params || {};
        this._mask = new egret.Shape();
        this._mask.touchEnabled = true;
        this._loadingMask = new egret.Shape();
        this._loadingMask.touchEnabled = true;
        this._modalPanelDict = new __WEBPACK_IMPORTED_MODULE_1_olympus_r_utils_Dictionary__["a" /* default */]();
        this._modalPanelList = [];
        this._modalPanelMask = new egret.Shape();
        this._modalPanelMask.touchEnabled = true;
    }
    Object.defineProperty(MaskEntityImpl.prototype, "loadingSkin", {
        get: function () {
            // 初始化皮肤
            if (!this._loadingSkin && this._loadingSkinFactory)
                this._loadingSkin = this._loadingSkinFactory();
            return this._loadingSkin;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 显示遮罩
     */
    MaskEntityImpl.prototype.showMask = function (alpha) {
        if (this._showingMask)
            return;
        this._showingMask = true;
        // 显示
        var bridge = __WEBPACK_IMPORTED_MODULE_0_olympus_r_engine_bridge_BridgeManager__["a" /* bridgeManager */].getBridge(__WEBPACK_IMPORTED_MODULE_2__EgretBridge__["default"].TYPE);
        // 绘制遮罩
        if (alpha == null)
            alpha = this._maskAlpha;
        this._mask.graphics.clear();
        this._mask.graphics.beginFill(0, alpha);
        this._mask.graphics.drawRect(0, 0, bridge.root.stage.stageWidth, bridge.root.stage.stageHeight);
        this._mask.graphics.endFill();
        // 添加显示
        bridge.maskLayer.addChild(this._mask);
    };
    /**
     * 隐藏遮罩
     */
    MaskEntityImpl.prototype.hideMask = function () {
        if (!this._showingMask)
            return;
        this._showingMask = false;
        // 隐藏
        if (this._mask.parent != null)
            this._mask.parent.removeChild(this._mask);
    };
    /**当前是否在显示遮罩*/
    MaskEntityImpl.prototype.isShowingMask = function () {
        return this._showingMask;
    };
    /**
     * 显示加载图
     */
    MaskEntityImpl.prototype.showLoading = function (alpha) {
        if (this._showingLoading)
            return;
        this._showingLoading = true;
        // 显示
        var bridge = __WEBPACK_IMPORTED_MODULE_0_olympus_r_engine_bridge_BridgeManager__["a" /* bridgeManager */].getBridge(__WEBPACK_IMPORTED_MODULE_2__EgretBridge__["default"].TYPE);
        // 绘制遮罩
        if (alpha == null)
            alpha = this._loadingAlpha;
        this._loadingMask.graphics.clear();
        this._loadingMask.graphics.beginFill(0, alpha);
        this._loadingMask.graphics.drawRect(0, 0, bridge.root.stage.stageWidth, bridge.root.stage.stageHeight);
        this._loadingMask.graphics.endFill();
        // 添加显示
        bridge.maskLayer.addChild(this._loadingMask);
        // 添加loading皮肤
        if (this.loadingSkin)
            bridge.maskLayer.addChild(this.loadingSkin);
    };
    /**
     * 隐藏加载图
     */
    MaskEntityImpl.prototype.hideLoading = function () {
        if (!this._showingLoading)
            return;
        this._showingLoading = false;
        // 隐藏
        if (this._loadingMask.parent != null)
            this._loadingMask.parent.removeChild(this._loadingMask);
        if (this.loadingSkin != null && this.loadingSkin.parent != null)
            this.loadingSkin.parent.removeChild(this._loadingSkin);
    };
    /**当前是否在显示loading*/
    MaskEntityImpl.prototype.isShowingLoading = function () {
        return this._showingLoading;
    };
    /** 显示模态窗口遮罩 */
    MaskEntityImpl.prototype.showModalMask = function (panel, alpha) {
        if (this.isShowingModalMask(panel))
            return;
        this._modalPanelDict.set(panel, panel);
        this._modalPanelList.push(panel);
        // 显示
        var bridge = __WEBPACK_IMPORTED_MODULE_0_olympus_r_engine_bridge_BridgeManager__["a" /* bridgeManager */].getBridge(__WEBPACK_IMPORTED_MODULE_2__EgretBridge__["default"].TYPE);
        // 绘制遮罩
        if (alpha == null)
            alpha = this._modalPanelAlpha;
        this._modalPanelMask.graphics.clear();
        this._modalPanelMask.graphics.beginFill(0, alpha);
        this._modalPanelMask.graphics.drawRect(0, 0, bridge.root.stage.stageWidth, bridge.root.stage.stageHeight);
        this._modalPanelMask.graphics.endFill();
        // 添加显示
        var entity = panel.skin;
        var parent = entity.parent;
        if (parent != null) {
            if (this._modalPanelMask.parent) {
                this._modalPanelMask.parent.removeChild(this._modalPanelMask);
            }
            var index = parent.getChildIndex(entity);
            parent.addChildAt(this._modalPanelMask, index);
        }
    };
    /** 隐藏模态窗口遮罩 */
    MaskEntityImpl.prototype.hideModalMask = function (panel) {
        if (!this.isShowingModalMask(panel))
            return;
        this._modalPanelDict.delete(panel);
        this._modalPanelList.splice(this._modalPanelList.indexOf(panel), 1);
        // 判断是否还需要Mask
        if (this._modalPanelList.length <= 0) {
            // 隐藏
            if (this._modalPanelMask.parent != null)
                this._modalPanelMask.parent.removeChild(this._modalPanelMask);
        }
        else {
            // 移动Mask
            var entity = this._modalPanelList[this._modalPanelList.length - 1].skin;
            var parent = entity.parent;
            if (parent != null) {
                if (this._modalPanelMask.parent) {
                    this._modalPanelMask.parent.removeChild(this._modalPanelMask);
                }
                var index = parent.getChildIndex(entity);
                parent.addChildAt(this._modalPanelMask, index);
            }
        }
    };
    /** 当前是否在显示模态窗口遮罩 */
    MaskEntityImpl.prototype.isShowingModalMask = function (panel) {
        return (this._modalPanelDict.get(panel) != null);
    };
    return MaskEntityImpl;
}());
/* harmony default export */ __webpack_exports__["a"] = (MaskEntityImpl);


/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = wrapEUIList;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-10-17
 * @modify date 2017-10-17
 *
 * UI工具集
*/

/**
 * 包装EUI的DataGroup组件，使用传入的处理函数处理每个渲染器更新的逻辑
 *
 * @export
 * @param {eui.DataGroup} group 被包装的DataGroup组件
 * @param {(data?:any, renderer?:any)=>void} rendererHandler 渲染器处理函数，每次数据更新时会被调用，处理单个渲染器的渲染逻辑
 * @param {(datas?:eui.ICollection, group?:eui.DataGroup)=>void} [updateHandler] 数据更新处理函数，每次显示更新时会被调用，处理列表显示更新后的渲染逻辑
 */
function wrapEUIList(group, rendererHandler, updateHandler) {
    group.itemRenderer = ItemRenderer.bind(null, group.itemRendererSkinName, rendererHandler);
    if (updateHandler) {
        // 监听group尺寸是否改变
        var enterFrameHandler = function () {
            if (group.contentWidth > 0 || group.contentHeight > 0) {
                // 移除事件监听
                group.removeEventListener(egret.Event.ENTER_FRAME, enterFrameHandler, this);
                // 调用回调
                updateHandler(group.dataProvider, group);
            }
        };
        group.addEventListener(egret.Event.ENTER_FRAME, enterFrameHandler, this);
    }
}
var ItemRenderer = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](ItemRenderer, _super);
    function ItemRenderer(skinName, rendererHandler) {
        var _this = _super.call(this) || this;
        _this.skinName = skinName;
        _this._rendererHandler = rendererHandler;
        return _this;
    }
    ItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this._rendererHandler(this.data, this);
    };
    return ItemRenderer;
}(eui.ItemRenderer));


/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_olympus_r_core_command_Command__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__EgretBridge__ = __webpack_require__(28);



/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2018-02-05
 * @modify date 2018-02-05
 *
 * 这个命令是为了修复egret在display==none时获取自身尺寸是空尺寸的bug
*/
var UpdateScreenSizeCommand = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](UpdateScreenSizeCommand, _super);
    function UpdateScreenSizeCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpdateScreenSizeCommand.prototype.exec = function () {
        var params = this.msg.params;
        var to = params[0];
        var from = params[1];
        if (to && to.bridge.type === __WEBPACK_IMPORTED_MODULE_2__EgretBridge__["default"].TYPE && from && from.bridge.type !== __WEBPACK_IMPORTED_MODULE_2__EgretBridge__["default"].TYPE) {
            // 是从其他类型场景跳转回来的，为了防止在其他场景触发过resize导致egret尺寸失效，更新一次屏幕尺寸
            egret.updateAllScreens();
        }
    };
    return UpdateScreenSizeCommand;
}(__WEBPACK_IMPORTED_MODULE_1_olympus_r_core_command_Command__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (UpdateScreenSizeCommand);


/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Core__ = __webpack_require__(0);

/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-09-01
 * @modify date 2017-09-01
 *
 * 内核命令类，内核命令在注册了消息后可以在消息派发时被执行
*/
var Command = /** @class */ (function () {
    function Command(msg) {
        this.msg = msg;
    }
    Command.prototype.dispatch = function (typeOrMsg) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        __WEBPACK_IMPORTED_MODULE_0__Core__["a" /* core */].dispatch.apply(__WEBPACK_IMPORTED_MODULE_0__Core__["a" /* core */], [typeOrMsg].concat(params));
    };
    return Command;
}());
/* harmony default export */ __webpack_exports__["a"] = (Command);


/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = wrapSkin;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_olympus_r_engine_mediator_MediatorStatus__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_olympus_r_engine_scene_SceneMediator__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_olympus_r_utils_ConstructUtil__ = __webpack_require__(6);



/**
 * @author Raykid
 * @email initial_r@qq.com
 * @create date 2017-10-09
 * @modify date 2017-10-09
 *
 * Egret皮肤工具集
*/
function wrapSkin(mediator, skin) {
    var result;
    var comp = getComponent(skin);
    if (!comp && !(skin instanceof egret.DisplayObject)) {
        var compCls = ((mediator.skin instanceof eui.Component && mediator.skin.constructor) || eui.Component);
        comp = new compCls();
        comp.skinName = skin;
        result = comp;
    }
    else {
        result = skin;
    }
    // 判断中介者当前状态
    if (mediator.status < __WEBPACK_IMPORTED_MODULE_0_olympus_r_engine_mediator_MediatorStatus__["a" /* default */].OPENING) {
        Object(__WEBPACK_IMPORTED_MODULE_2_olympus_r_utils_ConstructUtil__["b" /* listenApply */])(mediator, "onOpen", doWrapSkin);
    }
    else {
        // 直接执行要执行的
        doWrapSkin();
    }
    return result;
    function doWrapSkin() {
        // 场景需要拉伸到与stage同宽高
        if (mediator instanceof __WEBPACK_IMPORTED_MODULE_1_olympus_r_engine_scene_SceneMediator__["default"]) {
            comp.percentWidth = 100;
            comp.percentHeight = 100;
        }
        // 启动引用转发
        if (result instanceof egret.DisplayObjectContainer && comp && comp.skin) {
            // 转发ui引用，如果传入的是显示对象，则需要判断目标是否属于该对象的后裔
            var needJudgeDescendant = (skin instanceof egret.DisplayObjectContainer);
            for (var _i = 0, _a = comp.skin.skinParts; _i < _a.length; _i++) {
                var name = _a[_i];
                var target = comp[name];
                if (!needJudgeDescendant || isDescendant(target, skin))
                    mediator[name] = target;
            }
        }
    }
}
function getComponent(skin) {
    if (!(skin instanceof egret.DisplayObject))
        return null;
    if (skin instanceof eui.Component && skin.skin)
        return skin;
    return getComponent(skin.parent);
}
function isDescendant(descendant, ascendant) {
    return (descendant !== ascendant && contains(descendant, ascendant));
}
function contains(target, parent) {
    if (!target || !parent)
        return false;
    if (target === parent)
        return true;
    return contains(target.parent, parent);
}


/***/ })
/******/ ]);
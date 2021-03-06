(function(FuseBox){FuseBox.$fuse$=FuseBox;
FuseBox.target = "browser";
FuseBox.pkg("default", {}, function(___scope___){
___scope___.file("index.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_dom_1 = require("react-dom");
var store_1 = require("./store");
var mobx_react_1 = require("mobx-react");
var typestyle_1 = require("typestyle");
var csx_1 = require("csx");
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Styles = {
            form: typestyle_1.style({
                display: "inline-block",
                padding: csx_1.rem(1),
                backgroundColor: "#fca6a6"
            }),
            btn: typestyle_1.style({
                backgroundColor: "#b4cef7",
                border: "none",
                color: "white",
                padding: csx_1.rem(1) + " " + csx_1.rem(2),
                textAlign: "center",
                display: "inline-block",
                cursor: "pointer",
                fontSize: csx_1.rem(1),
                marginTop: csx_1.rem(2),
                borderRadius: csx_1.rem(0.3)
            }),
            submitBtn: typestyle_1.style({
                float: "right"
            }),
            resetBtn: typestyle_1.style({
                float: "left"
            }),
            table: typestyle_1.style({
                borderCollapse: "collapse",
                height: csx_1.rem(20),
                width: csx_1.rem(20)
            }),
            section: typestyle_1.style({
                border: "solid medium"
            })
        };
        _this.solve = function (ev) {
            ev.preventDefault();
            if (!_this.props.store) {
                return;
            }
            _this.props.store.solve();
        };
        return _this;
    }
    Grid.prototype.render = function () {
        if (!this.props.store) {
            return null;
        }
        var boxes = [];
        var rows = [];
        for (var r = 1; r <= 9; r++) {
            rows.push(React.createElement(Row, { store: this.props.store, key: r, r: r }));
            if (r % 3 === 0) {
                boxes.push(React.createElement("tbody", { className: this.Styles.section, key: r / 3 }, rows));
                rows = [];
            }
        }
        return React.createElement("form", { className: this.Styles.form, onSubmit: this.solve },
            React.createElement("h2", null, "Sudoku Solver"),
            React.createElement("h3", null,
                "(",
                React.createElement("a", { href: "http://norvig.com/sudoku.html" }, "http://norvig.com/sudoku.html"),
                ")"),
            React.createElement("table", { className: this.Styles.table }, boxes),
            React.createElement("button", { onClick: this.props.store.reset, className: typestyle_1.classes(this.Styles.btn, this.Styles.resetBtn), type: "reset" }, "Reset"),
            React.createElement("button", { className: typestyle_1.classes(this.Styles.btn, this.Styles.submitBtn), disabled: this.props.store.solved, type: "submit" }, "Solve"));
    };
    Grid = __decorate([
        mobx_react_1.inject(function () { return ({
            store: new store_1.Store()
        }); }),
        mobx_react_1.observer
    ], Grid);
    return Grid;
}(React.Component));
var Row = /** @class */ (function (_super) {
    __extends(Row, _super);
    function Row() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Styles = {
            cell: typestyle_1.style({
                border: "solid thin",
                height: csx_1.rem(3),
                width: csx_1.rem(3),
                textAlign: "center",
                $nest: {
                    "input": {
                        width: csx_1.rem(3),
                        height: csx_1.rem(3),
                        border: 0,
                        textAlign: "center",
                        fontSize: csx_1.rem(2)
                    }
                }
            }),
            row: typestyle_1.style({
                $nest: {
                    "td:nth-child(3n)": {
                        borderRight: "solid medium"
                    }
                }
            })
        };
        return _this;
    }
    Row.prototype.render = function () {
        var cells = [];
        for (var c = 1; c <= 9; c++) {
            cells.push(React.createElement("td", { className: this.Styles.cell, key: c },
                React.createElement(Input, { r: this.props.r, c: c, store: this.props.store })));
        }
        return React.createElement("tr", { className: this.Styles.row }, cells);
    };
    Row = __decorate([
        mobx_react_1.observer
    ], Row);
    return Row;
}(React.Component));
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.select = function (elem) {
            _this.elem = elem;
        };
        _this.onKeyPress = function (ev) {
            var _a = _this.props, r = _a.r, c = _a.c, store = _a.store;
            switch (ev.key) {
                case "ArrowUp":
                    if (r > 1) {
                        store.setFocusCell(store.cell(r - 1, c));
                    }
                    break;
                case "ArrowDown":
                    if (r < 9) {
                        store.setFocusCell(store.cell(r + 1, c));
                    }
                    break;
                case "ArrowLeft":
                    if (c > 1) {
                        store.setFocusCell(store.cell(r, c - 1));
                    }
                    break;
                case "ArrowRight":
                    if (c < 9) {
                        store.setFocusCell(store.cell(r, c + 1));
                    }
                    break;
            }
        };
        return _this;
    }
    Input.prototype.render = function () {
        var _a = this.props, r = _a.r, c = _a.c, store = _a.store;
        var onChange = function (ev) {
            store.updateGrid(store.cell(r, c), parseInt(ev.currentTarget.value, 10));
        };
        var val = store.gridVal(store.cell(r, c));
        if (store.focusCell === store.cell(r, c) && this.elem) {
            this.elem.focus();
        }
        return React.createElement("input", { ref: this.select, className: val && val.solved ? typestyle_1.style({ fontWeight: "bolder" }) : "", type: "text", disabled: store.solved, onChange: onChange, value: val === undefined ? "" : val.val, onKeyDown: this.onKeyPress });
    };
    Input = __decorate([
        mobx_react_1.observer
    ], Input);
    return Input;
}(React.Component));
typestyle_1.cssRule("body", {
    fontFamily: "Open Sans, sans-serif"
});
typestyle_1.forceRenderStyles();
react_dom_1.render(React.createElement(Grid, null), document.getElementById("root"));

});
___scope___.file("store.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var Store = /** @class */ (function () {
    function Store() {
        var _this = this;
        this.digits = "123456789";
        this.rows = "ABCDEFGHI";
        this.columns = this.digits;
        this.squares = [];
        this.unitlist = [];
        this.units = {};
        this.peers = {};
        this.solutionPromise = undefined;
        this.reset = function () {
            _this.state = {
                grid: new mobx_1.ObservableMap(),
                solved: false,
                potentialSolutions: {},
                focusCell: ""
            };
        };
        this.setFocusCell = function (val) {
            _this.state.focusCell = val;
        };
        this.updateGrid = function (cell, val) {
            if (!_this.peers[cell]) {
                alert("Invalid Cell");
                _this.parsePossibleSolutions();
                return;
            }
            val = val % 10;
            if (isNaN(val) || val === 0) {
                _this.state.grid.delete(cell);
                _this.parsePossibleSolutions();
                return;
            }
            var invalid = _this.peers[cell].some(function (p) {
                if (_this.state.grid.has(p) && _this.state.grid.get(p).val === val) {
                    return true;
                }
                return false;
            });
            if (invalid) {
                alert("Invalid Sudoku");
                _this.parsePossibleSolutions();
                return;
            }
            _this.state.grid.set(cell, {
                val: val,
                solved: false,
            });
            var calcSolutions = function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.solutionPromise) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.solutionPromise];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            this.solutionPromise = this.parsePossibleSolutions();
                            return [2 /*return*/];
                    }
                });
            }); };
            calcSolutions();
        };
        this.parsePossibleSolutions = function () { return __awaiter(_this, void 0, void 0, function () {
            var valid;
            var _this = this;
            return __generator(this, function (_a) {
                this.squares.forEach(function (s) {
                    _this.state.potentialSolutions[s] = _this.digits;
                });
                valid = this.state.grid.keys().every(function (key) {
                    if (!_this.assign(_this.state.potentialSolutions, key, _this.state.grid.get(key).val)) {
                        return false;
                    }
                    return true;
                });
                if (!valid) {
                    alert("Contradiction detected");
                    return [2 /*return*/];
                }
                return [2 /*return*/];
            });
        }); };
        this.search = function (values) {
            if (!values) {
                return false;
            }
            if (_this.isSolved(values)) {
                return values;
            }
            var min = 11;
            var square;
            _this.squares.forEach(function (s) {
                if (values[s].length > 1 && values[s].length < min) {
                    square = s;
                    min = values[s].length;
                }
            });
            var valid = values[square].split("").some(function (v) {
                if (!values) {
                    return false;
                }
                var val = _this.search(_this.assign(Object.assign({}, values), square, parseInt(v)));
                if (!val) {
                    return false;
                }
                values = val;
                return true;
            });
            if (!valid) {
                return false;
            }
            return values;
        };
        this.isSolved = function (values) {
            return _this.squares.every(function (s) { return values[s].length === 1; });
        };
        this.assign = function (values, key, val) {
            var otherVals = values[key].replace(val.toString(), "");
            if (!otherVals.split("").every(function (v) { return _this.eliminate(values, key, v); })) {
                return false;
            }
            return values;
        };
        this.eliminate = function (values, key, val) {
            if (values[key].indexOf(val) === -1) {
                return true;
            }
            values[key] = values[key].replace(val, "");
            if (values[key].length === 0) {
                return false;
            }
            else if (values[key].length === 1) {
                if (!_this.peers[key].every(function (p) { return _this.eliminate(values, p, values[key]); })) {
                    return false;
                }
            }
            return _this.units[key].every(function (unit) {
                var ss = unit.filter(function (s) { return values[s].indexOf(val) !== -1; });
                if (ss.length === 0) {
                    return false;
                }
                else if (ss.length === 1) {
                    if (!_this.assign(values, ss[0], parseInt(val))) {
                        return false;
                    }
                }
                return true;
            });
        };
        this.gridVal = function (cell) {
            return _this.state.grid.get(cell);
        };
        this.cell = function (r, c) {
            return _this.rows.charAt(r - 1) + _this.columns.charAt(c - 1);
        };
        this.solve = function () { return __awaiter(_this, void 0, void 0, function () {
            var val;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.solutionPromise) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.solutionPromise];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        val = this.search(this.state.potentialSolutions);
                        if (!val) {
                            alert("No solution found");
                        }
                        else {
                            this.state.potentialSolutions = val;
                        }
                        this.squares.forEach(function (s) {
                            if (!_this.state.grid.has(s)) {
                                _this.state.grid.set(s, {
                                    val: parseInt(_this.state.potentialSolutions[s]),
                                    solved: true
                                });
                            }
                        });
                        this.state.solved = true;
                        return [2 /*return*/];
                }
            });
        }); };
        this.squares = this.cross(this.rows, this.columns);
        for (var i = 0; i < 9; i++) {
            this.unitlist.push(this.cross(this.rows.charAt(i), this.columns));
        }
        for (var i = 0; i < 9; i++) {
            this.unitlist.push(this.cross(this.rows, this.columns.charAt(i)));
        }
        var boxRows = ["ABC", "DEF", "GHI"];
        var boxCols = ["123", "456", "789"];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                this.unitlist.push(this.cross(boxRows[i], boxCols[j]));
            }
        }
        this.squares.forEach(function (s) {
            _this.units[s] = [];
            _this.unitlist.forEach(function (units) {
                units.some(function (u) {
                    if (u === s) {
                        _this.units[s].push(units);
                        return true;
                    }
                    return false;
                });
            });
        });
        this.squares.forEach(function (s) {
            _this.peers[s] = [];
            var visited = {};
            _this.units[s].forEach(function (units) {
                units.forEach(function (u) {
                    if (visited[u] || u === s) {
                        return;
                    }
                    _this.peers[s].push(u);
                    visited[u] = true;
                });
            });
        });
        this.reset();
    }
    Object.defineProperty(Store.prototype, "focusCell", {
        get: function () {
            return this.state.focusCell;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Store.prototype, "solved", {
        get: function () {
            return this.state.solved;
        },
        enumerable: true,
        configurable: true
    });
    Store.prototype.cross = function (A, B) {
        var cross = [];
        for (var i = 0; i < A.length; i++) {
            for (var j = 0; j < B.length; j++) {
                cross.push(A.charAt(i) + B.charAt(j));
            }
        }
        return cross;
    };
    __decorate([
        mobx_1.observable
    ], Store.prototype, "state", void 0);
    __decorate([
        mobx_1.action
    ], Store.prototype, "reset", void 0);
    __decorate([
        mobx_1.computed
    ], Store.prototype, "focusCell", null);
    __decorate([
        mobx_1.computed
    ], Store.prototype, "solved", null);
    __decorate([
        mobx_1.action
    ], Store.prototype, "setFocusCell", void 0);
    __decorate([
        mobx_1.action
    ], Store.prototype, "updateGrid", void 0);
    __decorate([
        mobx_1.action
    ], Store.prototype, "parsePossibleSolutions", void 0);
    __decorate([
        mobx_1.action
    ], Store.prototype, "search", void 0);
    __decorate([
        mobx_1.action
    ], Store.prototype, "assign", void 0);
    __decorate([
        mobx_1.action
    ], Store.prototype, "eliminate", void 0);
    __decorate([
        mobx_1.action
    ], Store.prototype, "solve", void 0);
    return Store;
}());
exports.Store = Store;

});
return ___scope___.entry = "index.jsx";
});
FuseBox.pkg("events", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
if (FuseBox.isServer) {
	module.exports = global.require("events");
} else {
	function EventEmitter() {
		this._events = this._events || {};
		this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
		if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError("n must be a positive number");
		this._maxListeners = n;
		return this;
	};

	EventEmitter.prototype.emit = function(type) {
		var er, handler, len, args, i, listeners;

		if (!this._events) this._events = {};

		// If there is no 'error' event listener then throw.
		if (type === "error") {
			if (!this._events.error || (isObject(this._events.error) && !this._events.error.length)) {
				er = arguments[1];
				if (er instanceof Error) {
					throw er; // Unhandled 'error' event
				}
				throw TypeError('Uncaught, unspecified "error" event.');
			}
		}

		handler = this._events[type];

		if (isUndefined(handler)) return false;

		if (isFunction(handler)) {
			switch (arguments.length) {
				// fast cases
				case 1:
					handler.call(this);
					break;
				case 2:
					handler.call(this, arguments[1]);
					break;
				case 3:
					handler.call(this, arguments[1], arguments[2]);
					break;
				// slower
				default:
					args = Array.prototype.slice.call(arguments, 1);
					handler.apply(this, args);
			}
		} else if (isObject(handler)) {
			args = Array.prototype.slice.call(arguments, 1);
			listeners = handler.slice();
			len = listeners.length;
			for (i = 0; i < len; i++) listeners[i].apply(this, args);
		}

		return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
		var m;

		if (!isFunction(listener)) throw TypeError("listener must be a function");

		if (!this._events) this._events = {};

		// To avoid recursion in the case that type === "newListener"! Before
		// adding it to the listeners, first emit "newListener".
		if (this._events.newListener) this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener);

		if (!this._events[type])
			// Optimize the case of one listener. Don't need the extra array object.
			this._events[type] = listener;
		else if (isObject(this._events[type]))
			// If we've already got an array, just append.
			this._events[type].push(listener);
		// Adding the second element, need to change to array.
		else this._events[type] = [this._events[type], listener];

		// Check for listener leak
		if (isObject(this._events[type]) && !this._events[type].warned) {
			if (!isUndefined(this._maxListeners)) {
				m = this._maxListeners;
			} else {
				m = EventEmitter.defaultMaxListeners;
			}

			if (m && m > 0 && this._events[type].length > m) {
				this._events[type].warned = true;
				console.error(
					"(node) warning: possible EventEmitter memory " + "leak detected. %d listeners added. " + "Use emitter.setMaxListeners() to increase limit.",
					this._events[type].length
				);
				if (typeof console.trace === "function") {
					// not supported in IE 10
					console.trace();
				}
			}
		}

		return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
		if (!isFunction(listener)) throw TypeError("listener must be a function");

		var fired = false;

		function g() {
			this.removeListener(type, g);

			if (!fired) {
				fired = true;
				listener.apply(this, arguments);
			}
		}

		g.listener = listener;
		this.on(type, g);

		return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
		var list, position, length, i;

		if (!isFunction(listener)) throw TypeError("listener must be a function");

		if (!this._events || !this._events[type]) return this;

		list = this._events[type];
		length = list.length;
		position = -1;

		if (list === listener || (isFunction(list.listener) && list.listener === listener)) {
			delete this._events[type];
			if (this._events.removeListener) this.emit("removeListener", type, listener);
		} else if (isObject(list)) {
			for (i = length; i-- > 0; ) {
				if (list[i] === listener || (list[i].listener && list[i].listener === listener)) {
					position = i;
					break;
				}
			}

			if (position < 0) return this;

			if (list.length === 1) {
				list.length = 0;
				delete this._events[type];
			} else {
				list.splice(position, 1);
			}

			if (this._events.removeListener) this.emit("removeListener", type, listener);
		}

		return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
		var key, listeners;

		if (!this._events) return this;

		// not listening for removeListener, no need to emit
		if (!this._events.removeListener) {
			if (arguments.length === 0) this._events = {};
			else if (this._events[type]) delete this._events[type];
			return this;
		}

		// emit removeListener for all listeners on all events
		if (arguments.length === 0) {
			for (key in this._events) {
				if (key === "removeListener") continue;
				this.removeAllListeners(key);
			}
			this.removeAllListeners("removeListener");
			this._events = {};
			return this;
		}

		listeners = this._events[type];

		if (isFunction(listeners)) {
			this.removeListener(type, listeners);
		} else if (listeners) {
			// LIFO order
			while (listeners.length) this.removeListener(type, listeners[listeners.length - 1]);
		}
		delete this._events[type];

		return this;
	};

	EventEmitter.prototype.listeners = function(type) {
		var ret;
		if (!this._events || !this._events[type]) ret = [];
		else if (isFunction(this._events[type])) ret = [this._events[type]];
		else ret = this._events[type].slice();
		return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
		if (this._events) {
			var evlistener = this._events[type];

			if (isFunction(evlistener)) return 1;
			else if (evlistener) return evlistener.length;
		}
		return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
		return emitter.listenerCount(type);
	};

	function isFunction(arg) {
		return typeof arg === "function";
	}

	function isNumber(arg) {
		return typeof arg === "number";
	}

	function isObject(arg) {
		return typeof arg === "object" && arg !== null;
	}

	function isUndefined(arg) {
		return arg === void 0;
	}
}

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("fusebox-hot-reload", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

"use strict";
/**
 * @module listens to `source-changed` socket events and actions hot reload
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Client = require("fusebox-websocket").SocketClient, bundleErrors = {}, outputElement = document.createElement("div"), styleElement = document.createElement("style"), minimizeToggleId = "fuse-box-toggle-minimized", hideButtonId = "fuse-box-hide", expandedOutputClass = "fuse-box-expanded-output", localStoragePrefix = "__fuse-box_";
function storeSetting(key, value) {
    localStorage[localStoragePrefix + key] = value;
}
function getSetting(key) {
    return localStorage[localStoragePrefix + key] === "true" ? true : false;
}
var outputInBody = false, outputMinimized = getSetting(minimizeToggleId), outputHidden = false;
outputElement.id = "fuse-box-output";
styleElement.innerHTML = "\n    #" + outputElement.id + ", #" + outputElement.id + " * {\n        box-sizing: border-box;\n    }\n    #" + outputElement.id + " {\n        z-index: 999999999999;\n        position: fixed;\n        top: 10px;\n        right: 10px;\n        width: 400px;\n        overflow: auto;\n        background: #fdf3f1;\n        border: 1px solid #eca494;\n        border-radius: 5px;\n        font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n        box-shadow: 0px 3px 6px 1px rgba(0,0,0,.15);\n    }\n    #" + outputElement.id + "." + expandedOutputClass + " {\n        height: auto;\n        width: auto;\n        left: 10px;\n        max-height: calc(100vh - 50px);\n    }\n    #" + outputElement.id + " .fuse-box-errors {\n        display: none;\n    }\n    #" + outputElement.id + "." + expandedOutputClass + " .fuse-box-errors {\n        display: block;\n        border-top: 1px solid #eca494;\n        padding: 0 10px;\n    }\n    #" + outputElement.id + " button {\n        border: 1px solid #eca494;\n        padding: 5px 10px;\n        border-radius: 4px;\n        margin-left: 5px;\n        background-color: white;\n        color: black;\n        box-shadow: 0px 2px 2px 0px rgba(0,0,0,.05);\n    }\n    #" + outputElement.id + " .fuse-box-header {\n        padding: 10px;\n    }\n    #" + outputElement.id + " .fuse-box-header h4 {\n        display: inline-block;\n        margin: 4px;\n    }";
styleElement.type = "text/css";
document.getElementsByTagName("head")[0].appendChild(styleElement);
function displayBundleErrors() {
    var errorMessages = Object.keys(bundleErrors).reduce(function (allMessages, bundleName) {
        var bundleMessages = bundleErrors[bundleName];
        return allMessages.concat(bundleMessages.map(function (message) {
            var messageOutput = message
                .replace(/\n/g, "<br>")
                .replace(/\t/g, "&nbsp;&nbps;&npbs;&nbps;")
                .replace(/ /g, "&nbsp;");
            return "<pre>" + messageOutput + "</pre>";
        }));
    }, []), errorOutput = errorMessages.join("");
    if (errorOutput && !outputHidden) {
        outputElement.innerHTML = "\n        <div class=\"fuse-box-header\" style=\"\">\n            <h4 style=\"\">Fuse Box Bundle Errors (" + errorMessages.length + "):</h4>\n            <div style=\"float: right;\">\n                <button id=\"" + minimizeToggleId + "\">" + (outputMinimized ? "Expand" : "Minimize") + "</button>\n                <button id=\"" + hideButtonId + "\">Hide</button>\n            </div>\n        </div>\n        <div class=\"fuse-box-errors\">\n            " + errorOutput + "\n        </div>\n        ";
        document.body.appendChild(outputElement);
        outputElement.className = outputMinimized ? "" : expandedOutputClass;
        outputInBody = true;
        document.getElementById(minimizeToggleId).onclick = function () {
            outputMinimized = !outputMinimized;
            storeSetting(minimizeToggleId, outputMinimized);
            displayBundleErrors();
        };
        document.getElementById(hideButtonId).onclick = function () {
            outputHidden = true;
            displayBundleErrors();
        };
    }
    else if (outputInBody) {
        document.body.removeChild(outputElement);
        outputInBody = false;
    }
}
exports.connect = function (port, uri, reloadFullPage) {
    if (FuseBox.isServer) {
        return;
    }
    port = port || window.location.port;
    var client = new Client({
        port: port,
        uri: uri
    });
    client.connect();
    client.on("page-reload", function (data) {
        return window.location.reload();
    });
    client.on("page-hmr", function (data) {
        FuseBox.flush();
        FuseBox.dynamic(data.path, data.content);
        if (FuseBox.mainFile) {
            try {
                FuseBox.import(FuseBox.mainFile);
            }
            catch (e) {
                if (typeof e === "string") {
                    if (/not found/.test(e)) {
                        return window.location.reload();
                    }
                }
                console.error(e);
            }
        }
    });
    client.on("source-changed", function (data) {
        console.info("%cupdate \"" + data.path + "\"", "color: #237abe");
        if (reloadFullPage) {
            return window.location.reload();
        }
        /**
         * If a plugin handles this request then we don't have to do anything
         **/
        for (var index = 0; index < FuseBox.plugins.length; index++) {
            var plugin = FuseBox.plugins[index];
            if (plugin.hmrUpdate && plugin.hmrUpdate(data)) {
                return;
            }
        }
        if (data.type === "hosted-css") {
            var fileId = data.path.replace(/^\//, "").replace(/[\.\/]+/g, "-");
            var existing = document.getElementById(fileId);
            if (existing) {
                existing.setAttribute("href", data.path + "?" + new Date().getTime());
            }
            else {
                var node = document.createElement("link");
                node.id = fileId;
                node.type = "text/css";
                node.rel = "stylesheet";
                node.href = data.path;
                document.getElementsByTagName("head")[0].appendChild(node);
            }
        }
        if (data.type === "js" || data.type === "css") {
            FuseBox.flush();
            FuseBox.dynamic(data.path, data.content);
            if (FuseBox.mainFile) {
                try {
                    FuseBox.import(FuseBox.mainFile);
                }
                catch (e) {
                    if (typeof e === "string") {
                        if (/not found/.test(e)) {
                            return window.location.reload();
                        }
                    }
                    console.error(e);
                }
            }
        }
    });
    client.on("error", function (error) {
        console.log(error);
    });
    client.on("bundle-error", function (_a) {
        var bundleName = _a.bundleName, message = _a.message;
        console.error("Bundle error in " + bundleName + ": " + message);
        var errorsForBundle = bundleErrors[bundleName] || [];
        errorsForBundle.push(message);
        bundleErrors[bundleName] = errorsForBundle;
        displayBundleErrors();
    });
    client.on("update-bundle-errors", function (_a) {
        var bundleName = _a.bundleName, messages = _a.messages;
        messages.forEach(function (message) { return console.error("Bundle error in " + bundleName + ": " + message); });
        bundleErrors[bundleName] = messages;
        displayBundleErrors();
    });
};

});
return ___scope___.entry = "index.js";
});
FuseBox.pkg("fusebox-websocket", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events = require("events");
var SocketClient = /** @class */ (function () {
    function SocketClient(opts) {
        opts = opts || {};
        var port = opts.port || window.location.port;
        var protocol = location.protocol === "https:" ? "wss://" : "ws://";
        var domain = location.hostname || "localhost";
        this.url = opts.host || "" + protocol + domain + ":" + port;
        if (opts.uri) {
            this.url = opts.uri;
        }
        this.authSent = false;
        this.emitter = new events.EventEmitter();
    }
    SocketClient.prototype.reconnect = function (fn) {
        var _this = this;
        setTimeout(function () {
            _this.emitter.emit("reconnect", { message: "Trying to reconnect" });
            _this.connect(fn);
        }, 5000);
    };
    SocketClient.prototype.on = function (event, fn) {
        this.emitter.on(event, fn);
    };
    SocketClient.prototype.connect = function (fn) {
        var _this = this;
        console.log("%cConnecting to fusebox HMR at " + this.url, "color: #237abe");
        setTimeout(function () {
            _this.client = new WebSocket(_this.url);
            _this.bindEvents(fn);
        }, 0);
    };
    SocketClient.prototype.close = function () {
        this.client.close();
    };
    SocketClient.prototype.send = function (eventName, data) {
        if (this.client.readyState === 1) {
            this.client.send(JSON.stringify({ event: eventName, data: data || {} }));
        }
    };
    SocketClient.prototype.error = function (data) {
        this.emitter.emit("error", data);
    };
    /** Wires up the socket client messages to be emitted on our event emitter */
    SocketClient.prototype.bindEvents = function (fn) {
        var _this = this;
        this.client.onopen = function (event) {
            console.log("%cConnected", "color: #237abe");
            if (fn) {
                fn(_this);
            }
        };
        this.client.onerror = function (event) {
            _this.error({ reason: event.reason, message: "Socket error" });
        };
        this.client.onclose = function (event) {
            _this.emitter.emit("close", { message: "Socket closed" });
            if (event.code !== 1011) {
                _this.reconnect(fn);
            }
        };
        this.client.onmessage = function (event) {
            var data = event.data;
            if (data) {
                var item = JSON.parse(data);
                _this.emitter.emit(item.type, item.data);
                _this.emitter.emit("*", item);
            }
        };
    };
    return SocketClient;
}());
exports.SocketClient = SocketClient;

});
return ___scope___.entry = "index.js";
});
FuseBox.import("fusebox-hot-reload").connect(8080, "", false)
var $fsmp$ = (function() {
	function loadRemoteScript(url) {
		return Promise.resolve().then(function() {
			if (FuseBox.isBrowser) {
				var d = document;
				var head = d.getElementsByTagName("head")[0];
				var target;
				if (/\.css$/.test(url)) {
					target = d.createElement("link");
					target.rel = "stylesheet";
					target.type = "text/css";
					target.href = url;
				} else {
					target = d.createElement("script");
					target.type = "text/javascript";
					target.src = url;
					target.async = true;
				}
				head.insertBefore(target, head.firstChild);
			}
		});
	}

	function request(url, cb) {
		if (FuseBox.isServer) {
			try {
				if (/^http(s)?\:/.test(url)) {
					return require("request")(url, function(error, response, body) {
						if (error) {
							return cb(error);
						}
						return cb(null, body, response.headers["content-type"]);
					});
				}
				if (/\.(js|json)$/.test(url)) {
					cb(null, require(url));
				} else {
					cb(
						null,
						require("fs")
							.readFileSync(require("path").join(__dirname, url))
							.toString()
					);
				}
			} catch (e) {
				cb(e);
			}
		} else {
			var request = new XMLHttpRequest();
			request.onreadystatechange = function() {
				var err;
				if (this.readyState == 4) {
					if (this.status !== 200) {
						err = { code: this.status, msg: this.statusText };
					}
					cb(err, this.responseText, request.getResponseHeader("Content-Type"));
				}
			};
			request.open("GET", url, true);
			request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			request.send();
		}
	}

	function evaluateModule(id, code) {
		var fn = new Function("module", "exports", code);
		var moduleExports = {};
		var moduleObject = { exports: moduleExports };
		fn(moduleObject, moduleExports);
		return moduleObject.exports;
	}

	return function(id) {
		return new Promise(function(resolve, reject) {
			if (FuseBox.exists(id)) {
				return resolve(FuseBox.import(id));
			}

			var isCSS = /\.css$/.test(id);
			if (FuseBox.isServer) {
				if (isCSS) {
					return reject("Can't load CSS on server!");
				}
			}
			// id.charCodeAt(4) = : which means http
			if (FuseBox.isBrowser) {
				if (name.charCodeAt(4) === 58 || name.charCodeAt(5) === 58 || isCSS) {
					return loadRemoteScript(id);
				}
			}
			var splitConfig = FuseBox.global("__fsbx__bundles__");

			if (splitConfig && splitConfig.bundles) {
				if (splitConfig.bundles[id]) {
					return resolve(FuseBox.import("~/" + splitConfig.bundles[id].main));
				}
			}

			request(id, function(error, contents, type) {
				if (error) {
					return reject(error);
				}
				var data;

				if (type) {
					if (/javascript/.test(type)) {
						data = evaluateModule(id, contents);
					} else if (/json/.test(type)) {
						data = JSON.parse(contents);
					} else if (!/javascript/.test(type)) {
						data = contents;
					} else {
						data = contents;
					}
				} else {
					data = contents;
				}

				return resolve(data);
			});
		});
	};
})();
if (FuseBox.isBrowser) {
	window.$fsmp$ = $fsmp$;
}


FuseBox.import("default/index.jsx");
FuseBox.main("default/index.jsx");
})
(function(e){function r(e){var r=e.charCodeAt(0),n=e.charCodeAt(1);if((m||58!==n)&&(r>=97&&r<=122||64===r)){if(64===r){var t=e.split("/"),i=t.splice(2,t.length).join("/");return[t[0]+"/"+t[1],i||void 0]}var o=e.indexOf("/");if(o===-1)return[e];var a=e.substring(0,o),f=e.substring(o+1);return[a,f]}}function n(e){return e.substring(0,e.lastIndexOf("/"))||"./"}function t(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];for(var n=[],t=0,i=arguments.length;t<i;t++)n=n.concat(arguments[t].split("/"));for(var o=[],t=0,i=n.length;t<i;t++){var a=n[t];a&&"."!==a&&(".."===a?o.pop():o.push(a))}return""===n[0]&&o.unshift(""),o.join("/")||(o.length?"/":".")}function i(e){var r=e.match(/\.(\w{1,})$/);return r&&r[1]?e:e+".js"}function o(e){if(m){var r,n=document,t=n.getElementsByTagName("head")[0];/\.css$/.test(e)?(r=n.createElement("link"),r.rel="stylesheet",r.type="text/css",r.href=e):(r=n.createElement("script"),r.type="text/javascript",r.src=e,r.async=!0),t.insertBefore(r,t.firstChild)}}function a(e,r){for(var n in e)e.hasOwnProperty(n)&&r(n,e[n])}function f(e){return{server:require(e)}}function u(e,n){var o=n.path||"./",a=n.pkg||"default",u=r(e);if(u&&(o="./",a=u[0],n.v&&n.v[a]&&(a=a+"@"+n.v[a]),e=u[1]),e)if(126===e.charCodeAt(0))e=e.slice(2,e.length),o="./";else if(!m&&(47===e.charCodeAt(0)||58===e.charCodeAt(1)))return f(e);var s=x[a];if(!s){if(m&&"electron"!==_.target)throw"Package not found "+a;return f(a+(e?"/"+e:""))}e=e?e:"./"+s.s.entry;var l,d=t(o,e),c=i(d),p=s.f[c];return!p&&c.indexOf("*")>-1&&(l=c),p||l||(c=t(d,"/","index.js"),p=s.f[c],p||"."!==d||(c=s.s&&s.s.entry||"index.js",p=s.f[c]),p||(c=d+".js",p=s.f[c]),p||(p=s.f[d+".jsx"]),p||(c=d+"/index.jsx",p=s.f[c])),{file:p,wildcard:l,pkgName:a,versions:s.v,filePath:d,validPath:c}}function s(e,r,n){if(void 0===n&&(n={}),!m)return r(/\.(js|json)$/.test(e)?h.require(e):"");if(n&&n.ajaxed===e)return console.error(e,"does not provide a module");var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState)if(200==i.status){var n=i.getResponseHeader("Content-Type"),o=i.responseText;/json/.test(n)?o="module.exports = "+o:/javascript/.test(n)||(o="module.exports = "+JSON.stringify(o));var a=t("./",e);_.dynamic(a,o),r(_.import(e,{ajaxed:e}))}else console.error(e,"not found on request"),r(void 0)},i.open("GET",e,!0),i.send()}function l(e,r){var n=y[e];if(n)for(var t in n){var i=n[t].apply(null,r);if(i===!1)return!1}}function d(e){if(null!==e&&["function","object","array"].indexOf(typeof e)!==-1&&!e.hasOwnProperty("default"))return Object.isFrozen(e)?void(e.default=e):void Object.defineProperty(e,"default",{value:e,writable:!0,enumerable:!1})}function c(e,r){if(void 0===r&&(r={}),58===e.charCodeAt(4)||58===e.charCodeAt(5))return o(e);var t=u(e,r);if(t.server)return t.server;var i=t.file;if(t.wildcard){var a=new RegExp(t.wildcard.replace(/\*/g,"@").replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&").replace(/@@/g,".*").replace(/@/g,"[a-z0-9$_-]+"),"i"),f=x[t.pkgName];if(f){var p={};for(var v in f.f)a.test(v)&&(p[v]=c(t.pkgName+"/"+v));return p}}if(!i){var g="function"==typeof r,y=l("async",[e,r]);if(y===!1)return;return s(e,function(e){return g?r(e):null},r)}var w=t.pkgName;if(i.locals&&i.locals.module)return i.locals.module.exports;var b=i.locals={},j=n(t.validPath);b.exports={},b.module={exports:b.exports},b.require=function(e,r){var n=c(e,{pkg:w,path:j,v:t.versions});return _.sdep&&d(n),n},m||!h.require.main?b.require.main={filename:"./",paths:[]}:b.require.main=h.require.main;var k=[b.module.exports,b.require,b.module,t.validPath,j,w];return l("before-import",k),i.fn.apply(k[0],k),l("after-import",k),b.module.exports}if(e.FuseBox)return e.FuseBox;var p="undefined"!=typeof ServiceWorkerGlobalScope,v="undefined"!=typeof WorkerGlobalScope,m="undefined"!=typeof window&&"undefined"!=typeof window.navigator||v||p,h=m?v||p?{}:window:global;m&&(h.global=v||p?{}:window),e=m&&"undefined"==typeof __fbx__dnm__?e:module.exports;var g=m?v||p?{}:window.__fsbx__=window.__fsbx__||{}:h.$fsbx=h.$fsbx||{};m||(h.require=require);var x=g.p=g.p||{},y=g.e=g.e||{},_=function(){function r(){}return r.global=function(e,r){return void 0===r?h[e]:void(h[e]=r)},r.import=function(e,r){return c(e,r)},r.on=function(e,r){y[e]=y[e]||[],y[e].push(r)},r.exists=function(e){try{var r=u(e,{});return void 0!==r.file}catch(e){return!1}},r.remove=function(e){var r=u(e,{}),n=x[r.pkgName];n&&n.f[r.validPath]&&delete n.f[r.validPath]},r.main=function(e){return this.mainFile=e,r.import(e,{})},r.expose=function(r){var n=function(n){var t=r[n].alias,i=c(r[n].pkg);"*"===t?a(i,function(r,n){return e[r]=n}):"object"==typeof t?a(t,function(r,n){return e[n]=i[r]}):e[t]=i};for(var t in r)n(t)},r.dynamic=function(r,n,t){this.pkg(t&&t.pkg||"default",{},function(t){t.file(r,function(r,t,i,o,a){var f=new Function("__fbx__dnm__","exports","require","module","__filename","__dirname","__root__",n);f(!0,r,t,i,o,a,e)})})},r.flush=function(e){var r=x.default;for(var n in r.f)e&&!e(n)||delete r.f[n].locals},r.pkg=function(e,r,n){if(x[e])return n(x[e].s);var t=x[e]={};return t.f={},t.v=r,t.s={file:function(e,r){return t.f[e]={fn:r}}},n(t.s)},r.addPlugin=function(e){this.plugins.push(e)},r.packages=x,r.isBrowser=m,r.isServer=!m,r.plugins=[],r}();return m||(h.FuseBox=_),e.FuseBox=_}(this))
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/scanf/index.js":
/*!*************************************!*\
  !*** ./node_modules/scanf/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! ./lib/scanf */ \"./node_modules/scanf/lib/scanf.js\");\n\n\n//# sourceURL=webpack://task-poo-ts/./node_modules/scanf/index.js?");

/***/ }),

/***/ "./node_modules/scanf/lib/gets.js":
/*!****************************************!*\
  !*** ./node_modules/scanf/lib/gets.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*\n * http://stackoverflow.com/questions/3430939/node-js-readsync-from-stdin\n * @mklement0\n */\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar BUFSIZE = 256;\nvar buf = Buffer.alloc ? Buffer.alloc(BUFSIZE) : new Buffer(BUFSIZE);\nvar bytesRead;\n\nmodule.exports = function() {\n  var fd =\n    'win32' === process.platform\n      ? process.stdin.fd\n      : fs.openSync('/dev/stdin', 'rs');\n  bytesRead = 0;\n\n  try {\n    bytesRead = fs.readSync(fd, buf, 0, BUFSIZE);\n  } catch (e) {\n    if (e.code === 'EAGAIN') {\n      // 'resource temporarily unavailable'\n      // Happens on OS X 10.8.3 (not Windows 7!), if there's no\n      // stdin input - typically when invoking a script without any\n      // input (for interactive stdin input).\n      // If you were to just continue, you'd create a tight loop.\n      console.error('ERROR: interactive stdin input not supported.');\n      process.exit(1);\n    } else if (e.code === 'EOF') {\n      // Happens on Windows 7, but not OS X 10.8.3:\n      // simply signals the end of *piped* stdin input.\n      return '';\n    }\n    throw e; // unexpected exception\n  }\n\n  if (bytesRead === 0) {\n    // No more stdin input available.\n    // OS X 10.8.3: regardless of input method, this is how the end\n    //   of input is signaled.\n    // Windows 7: this is how the end of input is signaled for\n    //   *interactive* stdin input.\n    return '';\n  }\n  // Process the chunk read.\n\n  var content = buf.toString(undefined, 0, bytesRead - 1);\n\n  return content;\n};\n\n\n//# sourceURL=webpack://task-poo-ts/./node_modules/scanf/lib/gets.js?");

/***/ }),

/***/ "./node_modules/scanf/lib/scanf.js":
/*!*****************************************!*\
  !*** ./node_modules/scanf/lib/scanf.js ***!
  \*****************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("var utils = __webpack_require__(/*! ./utils */ \"./node_modules/scanf/lib/utils.js\");\nvar gets = __webpack_require__(/*! ./gets */ \"./node_modules/scanf/lib/gets.js\");\n\nvar input = '';\nvar stdin_flag = true;\n\nexports[\"throw\"] = true;\n\nvar scanf = (module.exports = function(format) {\n  var re = new RegExp('[^%]*%[0-9]*[A-Za-z][^%]*', 'g');\n  var selector = format.match(re);\n\n  if (selector === null) {\n    throw new Error('Unable to parse scanf selector.');\n  }\n\n  var result,\n    len = selector.length;\n  var json_flag = false,\n    count = 0,\n    keys = Array.prototype.slice.call(arguments, 1);\n\n  if (!this.sscanf) {\n    // clear sscanf cache\n    if (!stdin_flag) input = '';\n    stdin_flag = true;\n  }\n\n  if (keys.length > 0) {\n    result = {};\n    json_flag = true;\n  } else if (len > 1) {\n    result = [];\n  } else {\n    return dealType(selector[0]);\n  }\n\n  selector.forEach(function(val) {\n    if (json_flag) {\n      result[keys.shift() || count++] = dealType(val);\n    } else {\n      result.push(dealType(val));\n    }\n  });\n\n  return result;\n});\n\nmodule.exports.sscanf = function(str, format) {\n  if (typeof str !== 'string' || !str.length) {\n    return null;\n  }\n\n  // clear scanf cache\n  if (stdin_flag) input = '';\n\n  input = str;\n  stdin_flag = false;\n\n  return scanf.apply(\n    { sscanf: true },\n    Array.prototype.slice.call(arguments, 1)\n  );\n};\n\nvar getInput = function(pre, next, match, type) {\n  var result;\n  if (!input.length || input === '\\r') {\n    if (stdin_flag) {\n      input = gets();\n    } else {\n      return null;\n    }\n  }\n\n  // match format\n  var replace = '(' + match + ')';\n  var tmp = input;\n\n  // while scan string, replace before and after\n  if (type === 'STR' && next.trim().length > 0) {\n    var before_macth = utils.regslashes(pre);\n    var after_match = utils.regslashes(next) + '[\\\\w\\\\W]*';\n    if (before_macth.length) {\n      tmp = tmp.replace(new RegExp(before_macth), '');\n    }\n    tmp = tmp.replace(new RegExp(after_match), '');\n  } else {\n    replace = utils.regslashes(pre) + replace;\n  }\n\n  var m = tmp.match(new RegExp(replace));\n\n  if (!m) {\n    // todo strip match\n    return null;\n  }\n  result = m[1];\n\n  // strip match content\n  input = input\n    .substr(input.indexOf(result))\n    .replace(result, '')\n    .replace(next, '');\n\n  if (type === 'HEXFLOAT') {\n    return m;\n  }\n  return result;\n};\n\nvar getInteger = function(pre, next) {\n  var text = getInput(pre, next, '[-]?[A-Za-z0-9]+');\n  if (!text) {\n    return null;\n  }\n  if (text.length > 2) {\n    if (text[0] === '0') {\n      if (text[1].toLowerCase() === 'x') {\n        try {\n          return utils.hex2int(text);\n        }\n        catch(e) {\n          if(exports.throw) return NaN\n\n          return null\n        }\n      }\n      // parse Integer (%d %ld %u %lu %llu) should be precise for octal\n      if (text[1].toLowerCase() === 'o') {\n        try {\n          return utils.octal2int(text);\n        }\n        catch(e) {\n          if(exports.throw) return NaN\n\n          return null\n        }\n      }\n    }\n  }\n  return parseInt(text);\n};\n\nvar getFloat = function(pre, next) {\n  var text = getInput(pre, next, '[-]?[0-9]+[.]?[0-9]*');\n  return parseFloat(text);\n};\n\nvar getHexFloat = function(pre, next) {\n  var hfParams = getInput(\n    pre,\n    next,\n    '^([+-]?)0x([0-9a-f]*)(.[0-9a-f]*)?(p[+-]?[0-9a-f]+)?',\n    'HEXFLOAT'\n  );\n  var sign = hfParams[2];\n  var sint = hfParams[3];\n  var spoint = hfParams[4];\n  var sexp = hfParams[5] || 'p0';\n  // We glue the integer and point parts together when parsing\n  var integer = parseInt(\n    sign + sint + (spoint !== undefined ? spoint.slice(1) : ''),\n    16\n  );\n  // The actual exponent is the specified exponent minus the de..heximal points we shifted away\n  var exponent =\n    parseInt(sexp.slice(1), 16) -\n    4 * (spoint !== undefined ? spoint.length - 1 : 0);\n  return integer * Math.pow(2, exponent);\n};\n\nvar getHex = function(pre, next) {\n  var text = getInput(pre, next, '[A-Za-z0-9]+');\n  try {\n    return utils.hex2int(text);\n  }\n  catch(e) {\n    if(exports.throw) return NaN\n\n    return null\n  }\n};\n\nvar getOctal = function(pre, next) {\n  var text = getInput(pre, next, '[A-Za-z0-9]+');\n  try {\n    return utils.octal2int(text);\n  }\n  catch(e) {\n    if(exports.throw) return NaN\n\n    return null\n  }\n};\n\nvar getString = function(pre, next) {\n  var text = getInput(\n    pre,\n    next,\n    // Match repeat string\n    '(' +\n    '[\\\\w\\\\]=-]' +\n    '|' +\n    '\\\\S+[^\\\\ ]' + // Match string witch \\SPC like 'Alan\\ Bob'\n      ')' +\n      // Match after\n      '+(\\\\\\\\[\\\\w\\\\ ][\\\\w\\\\:]*)*',\n    'STR'\n  );\n  if (/\\\\/.test(text)) text = utils.stripslashes(text);\n  return text;\n};\n\nvar getLine = function(pre, next) {\n  var text = getInput(pre, next, '[^\\n\\r]*');\n  if (/\\\\/.test(text)) text = utils.stripslashes(text);\n  return text;\n};\n\nvar dealType = function(format) {\n  var ret;\n  var res = format.match(/%(0[1-9]+)?[A-Za-z]+/);\n  var res2 = format.match(/[^%]*/);\n  if (!res) {\n    // DID NOT throw error here to stay compatible with old version\n    console.warn('Invalid scanf selector: [%s]', format);\n    return null;\n  }\n\n  var type = res[0].replace(res[1], '');\n  var pre = !!res2 ? res2[0] : null;\n  var next = format.substr(format.indexOf(type) + type.length);\n\n  switch (type) {\n    case '%d':\n    case '%ld':\n    case '%llu':\n    case '%lu':\n    case '%u':\n      ret = getInteger(pre, next);\n      break;\n    case '%c': // TODO getChar\n    case '%s':\n      ret = getString(pre, next);\n      break;\n    case '%S':\n      ret = getLine(pre, next);\n      break;\n    case '%X':\n    case '%x':\n      ret = getHex(pre, next);\n      break;\n    case '%O':\n    case '%o':\n      ret = getOctal(pre, next);\n      break;\n    case '%a':\n      ret = getHexFloat(pre, next);\n      break;\n    case '%f':\n      ret = getFloat(pre, next);\n      break;\n\n    default:\n      throw new Error('Unknown type \"' + type + '\"');\n  }\n  return ret;\n};\n\n\n//# sourceURL=webpack://task-poo-ts/./node_modules/scanf/lib/scanf.js?");

/***/ }),

/***/ "./node_modules/scanf/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/scanf/lib/utils.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("var ASCII = {\n  a: 'a'.charCodeAt(),\n  f: 'f'.charCodeAt(),\n  A: 'A'.charCodeAt(),\n  F: 'F'.charCodeAt(),\n  0: '0'.charCodeAt(),\n  7: '7'.charCodeAt(),\n  9: '9'.charCodeAt()\n};\n\nexports.hex2int = function(str) {\n  str = str.replace(/^[0Oo][Xx]/, '');\n  var ret = 0,\n    digit = 0;\n\n  for (var i = str.length - 1; i >= 0; i--) {\n    ret += intAtHex(str[i], digit++);\n  }\n\n  return ret;\n};\n\nvar intAtHex = function(c, digit) {\n  var ret = null;\n  var ascii = c.charCodeAt();\n\n  if (ASCII.a <= ascii && ascii <= ASCII.f) {\n    ret = ascii - ASCII.a + 10;\n  } else if (ASCII.A <= ascii && ascii <= ASCII.F) {\n    ret = ascii - ASCII.A + 10;\n  } else if (ASCII[0] <= ascii && ascii <= ASCII[9]) {\n    ret = ascii - ASCII[0];\n  } else {\n    throw new Error('Invalid ascii [' + c + ']');\n  }\n\n  while (digit--) {\n    ret *= 16;\n  }\n  return ret;\n};\n\nexports.octal2int = function(str) {\n  str = str.replace(/^0[Oo]?/, '');\n  var ret = 0,\n    digit = 0;\n\n  for (var i = str.length - 1; i >= 0; i--) {\n    ret += intAtOctal(str[i], digit++);\n  }\n\n  return ret;\n};\n\nvar intAtOctal = function(c, digit) {\n  var num = null;\n  var ascii = c.charCodeAt();\n\n  if (ascii >= ASCII[0] && ascii <= ASCII[7]) {\n    num = ascii - ASCII[0];\n  } else {\n    throw new Error('Invalid char to Octal [' + c + ']');\n  }\n\n  while (digit--) {\n    num *= 8;\n  }\n  return num;\n};\n\nexports.regslashes = function(pre) {\n  return pre\n    .replace(/\\[/g, '\\\\[')\n    .replace(/\\]/g, '\\\\]')\n    .replace(/\\(/g, '\\\\(')\n    .replace(/\\)/g, '\\\\)')\n    .replace(/\\|/g, '\\\\|');\n};\n\nexports.stripslashes = function(str) {\n  return str.replace(/\\\\([\\sA-Za-z\\\\]|[0-7]{1,3})/g, function(str, c) {\n    switch (c) {\n      case '\\\\':\n        return '\\\\';\n      case '0':\n        return '\\u0000';\n      default:\n        if (/^\\w$/.test(c)) {\n          return getSpecialChar(c);\n        } else if (/^\\s$/.test(c)) {\n          return c;\n        } else if (/([0-7]{1,3})/.test(c)) {\n          return getASCIIChar(c);\n        }\n        return str;\n    }\n  });\n};\n\nvar getASCIIChar = function(str) {\n  var num = exports.octal2int(str);\n  return String.fromCharCode(num);\n};\n\nvar getSpecialChar = function(letter) {\n  switch (letter.toLowerCase()) {\n    case 'b':\n      return '\\b';\n    case 'f':\n      return '\\f';\n    case 'n':\n      return '\\n';\n    case 'r':\n      return '\\r';\n    case 't':\n      return '\\t';\n    case 'v':\n      return '\\v';\n    default:\n      return letter;\n  }\n};\n\n\n//# sourceURL=webpack://task-poo-ts/./node_modules/scanf/lib/utils.js?");

/***/ }),

/***/ "./src/app/main.ts":
/*!*************************!*\
  !*** ./src/app/main.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst Task_1 = __webpack_require__(/*! ../core/Task */ \"./src/core/Task.ts\");\r\nconst Menu_1 = __webpack_require__(/*! ../core/Menu */ \"./src/core/Menu.ts\");\r\nlet scanf = __webpack_require__(/*! scanf */ \"./node_modules/scanf/index.js\");\r\nconst taskManager = new Task_1.Task();\r\nlet op;\r\nlet salir = 5;\r\nlet index;\r\nlet task;\r\ndo {\r\n    (0, Menu_1.menuApp)();\r\n    console.log('Digite opción: ');\r\n    op = scanf('%d');\r\n    if (op == 1) {\r\n        console.clear();\r\n        console.log('Ingrese tarea: ');\r\n        task = scanf('%S');\r\n        if (task === '') {\r\n            console.log('Espacio vacío', '\\n', 'Ingrese nuevamente:');\r\n            task = scanf('%S');\r\n            console.clear();\r\n        }\r\n        if (!taskManager.taskList.find((repeat) => repeat.description == task)) {\r\n            let myTask = { description: task };\r\n            taskManager.create(myTask);\r\n            console.log('\\n', 'Tarea guardada', '\\n');\r\n        }\r\n        else\r\n            console.log('\\n', 'Tarea repetida', '\\n');\r\n        (0, Menu_1.enter)();\r\n    }\r\n    else if (op == 2) {\r\n        console.clear();\r\n        taskManager.read().forEach((task, index) => console.log(`${index + 1}. ${task.description}`));\r\n        ;\r\n        console.table(taskManager.taskList);\r\n        (0, Menu_1.enter)();\r\n    }\r\n    else if (op == 3) {\r\n        console.clear();\r\n        console.table(taskManager.taskList);\r\n        console.log(`Digite el indice de tarea a actualizar (0 - ${taskManager.taskList.length - 1}):`);\r\n        index = scanf('%d');\r\n        if (index <= taskManager.taskList.length) {\r\n            console.log('Actulice:');\r\n            let newTask = scanf('%S');\r\n            if (newTask === '') {\r\n                console.log('Espacio vacío', '\\n', 'Ingrese nuevamente:');\r\n                newTask = scanf('%S');\r\n                console.clear();\r\n            }\r\n            if (!taskManager.taskList.find((repeat) => repeat.description == newTask)) {\r\n                let myNewTask = { description: newTask };\r\n                taskManager.taskList[index] = myNewTask;\r\n                taskManager.update(index, myNewTask);\r\n                console.table(taskManager.taskList);\r\n                (0, Menu_1.enter)();\r\n            }\r\n            else {\r\n                console.log('Tarea repetida');\r\n                console.table(taskManager.taskList);\r\n                (0, Menu_1.enter)();\r\n            }\r\n        }\r\n        else\r\n            console.log('\\n', 'Índice inválido', '\\n');\r\n    }\r\n    else if (op == 4) {\r\n        console.clear();\r\n        console.table(taskManager.taskList);\r\n        console.log('\\n', 'Digite el indice de tarea a eliminar:');\r\n        index = scanf('%d');\r\n        if (index <= taskManager.taskList.length - 1) {\r\n            console.log('¿Seguro que quiere elimnar la tarea seleccionada? (y/n)');\r\n            op = scanf('%S');\r\n            if (op == 'n') {\r\n                console.clear();\r\n                console.table(taskManager.taskList);\r\n                console.log('Regresando');\r\n                (0, Menu_1.enter)();\r\n            }\r\n            else if (op == 'y') {\r\n                console.clear();\r\n                taskManager.delete(index);\r\n                console.table(taskManager.taskList);\r\n                console.log('Eliminado');\r\n                (0, Menu_1.enter)();\r\n            }\r\n        }\r\n        else\r\n            console.log('\\n', 'Índice inválido', '\\n');\r\n    }\r\n    else if (op == 5) {\r\n        console.clear();\r\n        console.log('Finalizando...');\r\n    }\r\n} while (op != salir);\r\n\n\n//# sourceURL=webpack://task-poo-ts/./src/app/main.ts?");

/***/ }),

/***/ "./src/core/Menu.ts":
/*!**************************!*\
  !*** ./src/core/Menu.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.enter = exports.menuApp = void 0;\r\nlet scanf = __webpack_require__(/*! scanf */ \"./node_modules/scanf/index.js\");\r\nconst menuApp = () => {\r\n    console.log(`------------\r\n    Menú de tareas:\r\n    1. Crear tarea\r\n    2. Ver tarea\r\n    3. Actualizar tarea\r\n    4. Eliminar tarea\r\n    5. Cerrar\r\n    ------------`);\r\n};\r\nexports.menuApp = menuApp;\r\nconst enter = () => {\r\n    console.log('[Enter]');\r\n    const op = scanf('%s');\r\n    console.clear();\r\n};\r\nexports.enter = enter;\r\n\n\n//# sourceURL=webpack://task-poo-ts/./src/core/Menu.ts?");

/***/ }),

/***/ "./src/core/Task.ts":
/*!**************************!*\
  !*** ./src/core/Task.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Task = void 0;\r\nconst ToDo_1 = __webpack_require__(/*! ./ToDo */ \"./src/core/ToDo.ts\");\r\nclass Task extends ToDo_1.ToDo {\r\n    constructor() {\r\n        super(...arguments);\r\n        this.taskList = [];\r\n    }\r\n    create(task) {\r\n        this.taskList.push(task);\r\n        return true;\r\n    }\r\n    read() {\r\n        return this.taskList;\r\n    }\r\n    update(id, task) {\r\n        this.taskList.splice(id, 1, task);\r\n        return true;\r\n    }\r\n    delete(id) {\r\n        this.taskList.splice(id, 1);\r\n        return true;\r\n    }\r\n}\r\nexports.Task = Task;\r\n\n\n//# sourceURL=webpack://task-poo-ts/./src/core/Task.ts?");

/***/ }),

/***/ "./src/core/ToDo.ts":
/*!**************************!*\
  !*** ./src/core/ToDo.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.ToDo = void 0;\r\nclass ToDo {\r\n}\r\nexports.ToDo = ToDo;\r\n\n\n//# sourceURL=webpack://task-poo-ts/./src/core/ToDo.ts?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app/main.ts");
/******/ 	
/******/ })()
;
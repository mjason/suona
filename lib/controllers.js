var util = require("util")
var ApiController = require("./controller").ApiController
var app = require("./controller").app

// 多路由lib
var ApiControllers = function(name, version) {
  if (arguments.length == 3) {
    ApiController.call(this, name, version, arguments[2])
  } else {
    ApiController.call(this, name, version)
  }
  this.__path1__ = "/api/" + version + "/" + name + "/:id" + this.suffix
}
util.inherits(ApiControllers, ApiController)

ApiControllers.prototype.mapFunc = function() {
  var callback = Array.prototype.slice.call(arguments)
  var key = callback.shift()
  switch (key) {
    case 'index':
      this.__route__('get', 'index', this.__path__, callback)
      break
    case 'show':
      this.__route__('get', 'show', this.__path1__, callback)
      break
    case 'update':
      this.__route__('put', 'update', this.__path1__, callback)
      break
    case 'create':
      this.__route__('get', 'create', this.__path__, callback)
      break
    case 'destroy':
      this.__route__('get', 'destroy', this.__path1__, callback)
      break
  }
}

var Controllers = function(name) {
  ApiController.call(this, name)
  this.__path__ = "/" + name
  this.__path1__ = "/" + name + "/:id"
}
util.inherits(Controllers, ApiControllers)

exports.ApiControllers = ApiControllers
exports.Controllers = Controllers
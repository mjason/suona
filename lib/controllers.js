var util = require("util")
var Controller = require("./controller").Controller
var app = require("./controller").app

// 多路由lib
var Controllers = function(name, version) {
  if (arguments.length == 3) {
    Controller.call(this, name, version, arguments[2])
  } else {
    Controller.call(this, name, version)
  }
  this.__path1__ = "/api/" + version + "/" + name + "/:id" + this.suffix
}
util.inherits(Controllers, Controller)

Controllers.prototype.mapFunc = function() {
  var callback = Array.prototype.slice.call(arguments)
  var key = callback.shift()
  switch (key) {
    case 'index':
      app.get(this.__path__, callback)
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

exports.Controllers = Controllers
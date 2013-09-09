var express = require("express")
var app = express()

var Controller = function(name, version) {
  args = Array.prototype.slice.call(arguments)
  this.name = name
  this.version = version
  this.suffix = args.pop()
  this.__path__ = "/api/" + version + "/" + name + this.suffix
}

Controller.prototype.MapFunc = function(key, callback) {
  switch (key) {
    case 'show':
      app.get(this.__path__, callback)
      break
    case 'update':
      app.put(this.__path__, callback)
      break
    case 'create':
      app.post(this.__path__, callback)
      break
    case 'destroy':
      app.delete(this.__path__, callback)
      break
  }
}
Controller.prototype.on = function(action, callback) {
  this.MapFunc(action, callback)
}

var json = function(obj) {
  args = Array.prototype.slice.call(arguments)
  _obj = {}
  for(var i = 1; i < args.length; i++) {
    _obj[args[i]] = obj[args[i]]
  }
  return _obj
}

exports.Controller = Controller
exports.app = app
exports.json = json
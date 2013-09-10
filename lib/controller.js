var express = require("express")
var app = express()

// 单陆游
var Controller = function(name, version) {
  var args = Array.prototype.slice.call(arguments)
  this.name = name
  this.version = version
  this.suffix = arguments.length == 3 ? arguments[2] : ""
  this.__path__ = "/api/" + version + "/" + name + this.suffix
  this.beforeMap = {
    all: [],
    show: [],
    index: [],
    update: [],
    destroy: [],
    create: []
  }
}

Controller.prototype.__route__ = function() {
  var args = Array.prototype.slice.call(arguments)
  var method = args.shift()
  var key = args.shift()
  var path = args.shift()
  var beforeMap = this.beforeMap[key]
  for(var i = 0; i < this.beforeMap["all"].length; i++ ){
    beforeMap.push(this.beforeMap["all"][i])
  }
  switch(method) {
    case 'get':
      app.get(path, beforeMap, args)
      break
    case 'put':
      app.put(path, beforeMap, args)
      break
    case 'delete':
      app.delete(path, beforeMap, args)
      break
    case 'post':
      app.post(path, beforeMap, args)
      break
  }
}

Controller.prototype.mapFunc = function() {
  var callback = Array.prototype.slice.call(arguments)
  var key = callback.shift()
  switch (key) {
    case 'show':
      this.__route__('get', 'show', this.__path__, callback)
      break
    case 'update':
      this.__route__('put', 'update', this.__path__, callback)
      break
    case 'create':
      this.__route__('post', 'create', this.__path__, callback)
      break
    case 'destroy':
      this.__route__('delete', 'destroy', this.__path__, callback)
      break
  }
}
Controller.prototype.on = function() {
  var args = Array.prototype.slice.call(arguments)
  var action= args.shift()
  this.mapFunc(action, args)
}
Controller.prototype.before = function() {
  var args = Array.prototype.slice.call(arguments)
  var key = args.shift()
  if (key == "all") {
    this.beforeMap["all"] = args
  } else {
    var keys = key.split(":")
    if(keys[0] != "only") {
      throw "this before not all and only"
    }
    for(var i=1; i < keys.length; i++){
      this.beforeMap[keys[i]] = args
    }
  }
}

exports.Controller = Controller
exports.app = app
var json = function(obj) {
  var args = Array.prototype.slice.call(arguments)
  var _obj = {}
  for(var i = 1; i < args.length; i++) {
    _obj[args[i]] = obj[args[i]]
  }
  return _obj
}
exports.json = json

var jsonArray = function() {
  var args = Array.prototype.slice.call(arguments)
  var obj = args.shift()
  var _objArray
  for (var i=0; i< obj.length; i++) {
    _objArray.push(json(obj[i], args))
  }
  return _objArray
}
exports.jsonArray = jsonArray
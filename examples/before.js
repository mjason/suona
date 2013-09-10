var suona = require("../")

var userController = new suona.Controller("user/:user_id/pages", "v1", ".json")

userController.before("only:show:create", function(req, res, next) {
  if(req.get("token") != "123123123") {
    res.json(401, {message: "无权访问"})
  } else {
    next()
  }
})

userController.before("all", function(req, res, next) {
  if (req.get("app_key") != "123123") {
    res.json(401, {message: "密钥错误"})
  } else {
    next()
  }
})

userController.on("show", function(req, res){
  res.json(200, {message: "test1"})
})

userController.on("create", function(req, res){
  res.json(200, {message: "test2"})
})

var temp = {name: "manjia", age: "asdf", password: "manjia"}
var temp1 = suona.json(temp1, "name", "age")
console.log(temp1)

console.log(suona.app.routes)

suona.app.listen("5000")
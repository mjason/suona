var suona = require("../")

var Controllers = suona.Controllers

var auth = function(req, res, next) {
  if(req.get("token") != "123123123") {
    res.json(401, {message: "无权访问"})
  } else {
    next()
  }
}

// 单独路由
var usersController = new Controllers("users", "v1", ".json")

usersController.on("show", function(req, res) {
  res.json(200, {message: "show" + req.params.id })
})

usersController.on("index", function(req, res) {
  res.json(200, {message: "hello index"})
})

usersController.on("create", auth, function(req, res) {
  res.json(200, {message: "create"})
})

usersController.on("update", auth, function(req, res) {
  res.json(200, {message: "update"})
})

usersController.on("destroy", auth, function(req, res) {
  res.json(200, {message: "destroy"})
})

// 复数路由
var userController = new suona.Controller("user", "v1", ".json")

userController.on("show", function(req, res) {
  res.json(200, {message: "show" + req.params.id })
})

userController.on("create", auth, function(req, res) {
  res.json(200, {message: "create"})
})

userController.on("update", auth, function(req, res) {
  res.json(200, {message: "update"})
})

userController.on("destroy", auth, function(req, res) {
  res.json(200, {message: "destroy"})
})

console.log(suona.app.routes)
suona.app.listen("5000")
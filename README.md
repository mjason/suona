suona
=====

一个十分简单的express封装, restful风格

##　开始
-------

安装 ```npm install suona```

```javascipt
var suona = require("suona")

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
```

## before方法的使用

```javascipt
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
```
注意: before 的调用顺序是先调用only再调用all

## 提供一个简单的json处理方式
```
var temp = {name: "mj", age: "21", password: "123123123"}
var temp1 = suona.json(temp1, "name", "age")
#=> {name: "mj", age: "21"}
``

处理数组可以使用jsonArray
```
var temp = [{name: "mj1", age: "21"}, {name: "mj2", age: "21"}]
var temp1 = suona.jsonArray(temp, "name")
#=> [{name: "mj1"}, {name: "mj2"}]
```
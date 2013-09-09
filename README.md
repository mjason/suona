suona
=====

一个简单的nodejs web api开发框架

使用例子

```javascipt
suona = require("suona")

var user = new suona.Controller("users", "v1", ".json")

user.on("show", function(req, res) {
  res.json(suona.json({name: "manjia", id: "1233"}, "name"))
})

console.log()

suona.app.listen("5000")
```
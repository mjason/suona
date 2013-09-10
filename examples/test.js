var express = require("express")
var app = express()

var c = function(fn, callback) {
  fn("/", callback)
}
var get = app.get
// c(get, function(req, res){
//   res.sned("123")
// })

get("/", function(req, res) {
  res.send("123")
})

app.listen("5000")
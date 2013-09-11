var suna = require("../")

// var user = new suna.Controller("user")

// user.on("show", function(req, res) {
//   res.send("show")
// })

var users = new suna.Controllers("users")

users.on("index", function(req, res){
  res.send("index")
})

users.on("show", function(req, res) {
  res.send("show")
})

console.log(suna.app.routes)

suna.app.listen(5000)
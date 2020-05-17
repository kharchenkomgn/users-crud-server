const Users = require("./users.controller");

function routes(router) {
  router.post("/user", Users.addUser);
  router.put("/user", Users.updateUser);
  router.get("/user", Users.getUserDetails);
  router.get("/users", Users.getAllUsers);
}

module.exports = routes;

// user_routes.js

var ObjectID = require("mongodb").ObjectID;

module.exports = function(app, db) {
  const collection = app.post("/users/new", (req, res) => {
    const user = { userName: req.body.userName, password: req.body.password };
    db.collection("users").insert(user, (err, result) => {
      if (err) {
        res.send({ err });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.get("/user/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.collection("users").findOne(details, (err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.send(user);
      }
    });
  });

  app.delete("/user/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.collection("users").remove(details, (err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.send("User " + id + " deleted.");
      }
    });
  });

  app.put('/user/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const user = { userName: req.body.userName, password: req.body.password };
    db.collection('users').update(details, note, (err, user) => {
      if (err) {
          res.send(err);
      } else {
          res.send(user);
      } 
    });
  });
};

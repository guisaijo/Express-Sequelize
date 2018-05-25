'use strict';

module.exports = (app, db) => {

  // GET health
  app.get('/health', (req, res) => {
    res.status(200).send('OK');
  });

  // GET all users
  app.get('/users', (req, res) => {
    db.users.findAll()
      .then(users => {
        res.json(users);
      });
  });

  // GET one user by id
  app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    db.users.find({
      where: { id: id}
    })
      .then(user => {
        res.json(user);
      });
  });

  // POST single user
  app.post('/user', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    db.users.create({
      name: name,
      age: age
    }).then(newUser => {
      res.json(newUser);
    })
  });

  // PATCH single user
  app.patch('/user/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    db.users.find({
      where: { id: id }
    })
      .then(user => {
        return user.updateAttributes(updates)
      }).then(updatedUser => {
        res.json(updatedUser);
      });
  });

  // DELETE single user
  app.delete('/user/:id', (req, res) => {
    const id = req.params.id;
    db.users.destroy({
      where: { id: id }
    })
      .then(deletedUser => {
        res.json(deletedUser);
      });
  });
};

'use strict';

const { checkSchema, validationResult } = require('express-validator/check');

module.exports = (app, db) => {

  // GET health
  app.get('/health', (req, res) => {
    return res.status(200).send('OK');
  });

  // GET all users
  app.get('/users', (req, res) => {
    db.users.findAll().then(users => {
      return res.json(users);
    });
  });

  // GET one user by id
  app.get('/user/:id', (req, res) => {
      const id = req.params.id;
      if (id.length != 36){
        return res.status(422).json({'Errors': 'ID must have 36 characters'});
      }
      db.users.find({
        where: { id: id}
      }).then(user => {
        return res.json(user);
      });
  });

  // POST single user
  app.post('/user', checkSchema({
      name: {
        in: ['body'],
        exists: {
          errorMessage: 'Name is empty!'
        }
      },
      age: {
        in: ['body'],
        errorMessage: 'Age is not a number!',
        isInt: true,
        exists: {
          errorMessage: 'Age is empty!'
        }
      }
    }), (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ 'Errors': errors.array() });
      }

      const name = req.body.name;
      const age = req.body.age;

      db.users.create({
        name: name,
        age: age
      }).then(newUser => {
        return res.json(newUser);
      })
  });

  // PATCH single user
  app.patch('/user/:id', checkSchema({
      name: {
        in: ['body'],
        exists: {
          errorMessage: 'Name is empty!'
        }
      },
      age: {
        in: ['body'],
        errorMessage: 'Age is not a number!',
        isInt: true,
        exists: {
          errorMessage: 'Age is empty!'
        }
      }
    }), (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ 'Errors': errors.array() });
      }

      const id = req.params.id;
      if (id.length != 36){
        return res.status(422).json({'Errors': 'ID must have 36 characters'})
      }

      const updates = req.body;
      db.users.find({
        where: { id: id }
      }).then(user => {
          return user.updateAttributes(updates)
        }).then(updatedUser => {
          return res.json(updatedUser);
        });
  });

  // DELETE single user
  app.delete('/user/:id', (req, res) => {
    const id = req.params.id;
    if (id.length != 36){
      return res.status(422).json({'Errors': 'ID must have 36 characters'})
    }

    db.users.destroy({
      where: { id: id }
    }).then(deletedUser => {
        return res.json(deletedUser);
    });
  });
};

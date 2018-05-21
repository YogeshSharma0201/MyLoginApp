require('./config/config.js');

const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Posts} = require('./models/posts');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.get('/posts', (req,res) => {
  Posts.find({}).then((posts)=>{
    res.send(posts);
  });
});

app.post('/users', (req, res)=>{
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });

  console.log(req.body.username, req.body.password);
  user.save().then((user)=>{
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth', token).send(user);
  }).catch((e)=>{
    res.status(400).send(e);
  });

});

app.get('/users/me', authenticate, (req, res)=>{
  res.send(req.user);
});

app.post('/users/login', (req, res)=>{
  var body = _.pick(req.body, ['username', 'password']);

  console.log(body);
  User.findByCredentials(body.username, body.password).then((user)=>{
    user.generateAuthToken().then((token)=> {
      res.send({user, token});
    });
  }).catch(e => res.status(400).send());
});



app.listen(port, ()=>{
  console.log(`Started on port ${port}`);
});

module.exports = {app};

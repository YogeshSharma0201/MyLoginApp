var express = require('express');
var bodyPareser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyPareser.json());

app.post('/todos', (req,res)=>{
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  })
});

app.get('/todos', (req, res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  }, (e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req,res)=>{
  var id = req.params.id;
  // validate id using isValid
    //404 - send back empty send
  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }

  //findById
    //success
      //if todo - send it back
      //if no todo - send 404 with empth body
    //error
      //400 - send back nothing
  Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }, (e)=>{
    res.status(400).send();
  });
});

app.listen(port, ()=>{
  console.log(`Started on port ${port}`);
});

module.exports = {app};

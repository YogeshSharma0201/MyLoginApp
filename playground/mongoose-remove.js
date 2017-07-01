const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result)=>{
//   console.log(result);
// });

// Todo.findOneAndRemove()
// Todo.findByIdAndRemove()

Todo.findByIdAndRemove('59572bb49c501d263ff89e27').then((todo)=>{
  console.log(todo);
});

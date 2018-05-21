var mongoose = require('mongoose');
var {Posts} = require('../models/posts');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("connected to db");
}, (err)=>{
    console.log(err);
});

Posts.insertMany([{
    title: 'abc',
    description: 'adfc',
    subject: 'asdf',
}, {
    title: 'abcd',
    description: 'adfc',
    subject: 'asdf',
}, {
    title: 'abce',
    description: 'adfc',
    subject: 'asdf',
}])
    .then(posts => {
        console.log(`${posts.length} posts created`);
    })
    .catch((err) => {
        console.log(err);
    })

// mongoose.connect('mongodb://yogesh0201:#9188661#@ds143542.mlab.com:43542/todo-api');
module.exports = {mongoose};

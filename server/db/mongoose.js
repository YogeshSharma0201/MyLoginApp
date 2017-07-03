var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

// mongoose.connect('mongodb://yogesh0201:#9188661#@ds143542.mlab.com:43542/todo-api');
module.exports = {mongoose};

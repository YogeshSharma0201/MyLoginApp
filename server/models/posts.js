const mongoose = require('mongoose');


var Posts = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
    },
    subject: {
        type: String,
        minlength: 1
    },
    description:{
        type: String,
        minlength: 1,
    }
}, {
    usePushEach: true
});


var Posts = mongoose.model('posts', Posts);

module.exports = {Posts};

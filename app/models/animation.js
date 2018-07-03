var mongoose = require('mongoose');

module.exports = mongoose.model('Animation', {    
    name:{
        type: String,
        default: ''
    },
    animation:[]
});
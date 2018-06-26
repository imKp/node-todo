var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
order: [],    
text: {
        type: String,
        default: ''
    },
pixel: []


});

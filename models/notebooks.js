const mongoose = require('mongoose')

const notebook_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    user: {
        type:  mongoose.Schema.Types.ObjectId
        
    },

    date: {
        type: Date,
        default: Date.now()
    }
  
    
    


})

const notebook_model = mongoose.model('notebook',notebook_schema)



module.exports = notebook_model
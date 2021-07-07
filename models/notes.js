const mongoose = require('mongoose')

const notes_schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
  
    notebook: {
        type: String
    }, 
    date: {
        type: Date,
        default: Date.now()
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId
    }
    
    


})

const notes_model = mongoose.model('note',notes_schema)



module.exports = notes_model
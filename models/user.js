const mongoose = require('mongoose')
const validator = require('validator')
const user_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('The Email is Invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,

    },
    confirmationCode: { 
        type: String, 
        unique: true
     },

     status: {
         type: String,
         default: 'pending'}
         
     

})

const user_model = mongoose.model('user',user_schema)



module.exports = user_model
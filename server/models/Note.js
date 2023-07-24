const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NotesSchema = new Schema({
    
    Name :{
        type : String,
        required : true
    },
    Age :{
        type : String,
        required : true,
    },
    Gender :{
        type : String,
        required : true,
    },
    Fav_Number:{
        type : String,
        required : true,
    }
})

module.exports = mongoose.model('notes',NotesSchema);
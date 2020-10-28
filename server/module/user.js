const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Register',{ useNewUrlParser: true ,useUnifiedTopology:true});
const Schema = mongoose.Schema;

var User = new Schema({
    name : String,
    email : String,
    phone : Number,
    password : String
});
var Userdata = mongoose.model('user',User);
module.exports = Userdata;
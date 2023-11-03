const mongoose = require ('mongoose')
const passportLocalMongoose = require ('passport-local-mongoose')
module.exports=mongoose.connect('mongodb+srv://bamiodunlami:' + process.env.MONGODB_CODE + '@cluster0.cqoyphm.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser:true})

const userSchema = new mongoose.Schema({
    username:"string",
    profile:{
        fname:"string",
        lname:"string",
        dob:"date",
        phone:"string",
        address:"string",
        city:"string",
        state:"string",
        country:"string"
    },
    active:Boolean,
})

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model('User', userSchema);

module.exports = User
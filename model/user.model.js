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

const interestFormSchema = new mongoose.Schema({
    fname:"string",
    lname:"string",
    email:"string",
    phone:"string",
    interest:"string",
    country:"string"
})

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model('User', userSchema);
const InterestForm = new mongoose.model('InterestForm', interestFormSchema)

module.exports = {
    Usr:User,
    InterestForm:InterestForm
}
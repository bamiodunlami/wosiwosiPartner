const mongoose = require ('mongoose')
module.exports=mongoose.connect('mongodb+srv://bamiodunlami:' + process.env.MONGODB_CODE + '@cluster0.cqoyphm.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser:true})


const interestFormSchema = new mongoose.Schema({
    fname:"string",
    lname:"string",
    email:"string",
    phone:"string",
    interest:"string",
    address:"string",
    postcode:"string",
    country:"string"
})

const InterestForm = new mongoose.model('InterestForm', interestFormSchema)

module.exports = {
    mongoose:mongoose,
    InterestForm:InterestForm
} 

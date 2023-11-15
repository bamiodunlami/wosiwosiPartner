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

const subscriptionFormSchema = new mongoose.Schema({
    fname:"string",
    lname:"string",
    email:"string",
    phone:"string",
    address:"string",
    postcode:"string",
    country:"string",
    interest:"string",
    startDate:"string",
    nextOfKin:"string",
    nextOfKinEmail:"string",
    nextOfKinPhone:"string",
})


const InterestForm = new mongoose.model('InterestForm', interestFormSchema);

const SubscriptionForm = new mongoose.model('SubscriptionForm', subscriptionFormSchema);

module.exports = {
    mongoose:mongoose,
    InterestForm:InterestForm,
    SubscriptionForm:SubscriptionForm
} 

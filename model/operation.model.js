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
    country:"string",
    startDate:"string"
});

const followupSchema = new mongoose.Schema({
    fname:"string",
    lname:"string",
    email:"string",
    phone:"string",
    interest:"string",
    address:"string",
    postcode:"string",
    country:"string",
    startDate:"string"
});

const toSubscribeSchema = new mongoose.Schema({
    fname:"string",
    lname:"string",
    email:"string",
    phone:"string",
    interest:"string",
    address:"string",
    postcode:"string",
    country:"string",
    startDate:"string"
});

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

const Followup = new mongoose.model('Followup', followupSchema);

const Tosubscribe = new mongoose.model('Tosubscribe', toSubscribeSchema);

const SubscriptionForm = new mongoose.model('SubscriptionForm', subscriptionFormSchema);

module.exports = {
    mongoose:mongoose,
    InterestForm:InterestForm,
    SubscriptionForm:SubscriptionForm,
    Followup:Followup,
    Tosubscribe:Tosubscribe,
} 

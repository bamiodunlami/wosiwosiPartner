const mongoose = require ('mongoose')
const passportLocalMongoose = require ('passport-local-mongoose')
module.exports=mongoose.connect('mongodb+srv://bamiodunlami:' + process.env.MONGODB_CODE + '@cluster0.cqoyphm.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser:true})

const investorSchema = new mongoose.Schema({
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
    accessCode:"string",
    active:Boolean,
})

investorSchema.plugin(passportLocalMongoose);
const Investor = new mongoose.model('Investor', investorSchema);

   async function saveInvestor(){
        const investorDB = new Investor({
            username:"odunlamibamidelejohn@gmail.com",
            profile:{
                fname:"Bamidele",
                lname:"Odunlami",
                dob:"",
                phone:"07487622295",
                address:"string",
                city:"string",
                state:"string",
                country:"string"
            },
            accessCode:"",
            active:true,

        })
        investorDB.save() 
    }

//  saveInvestor()


module.exports = {
    Investor:Investor,
}
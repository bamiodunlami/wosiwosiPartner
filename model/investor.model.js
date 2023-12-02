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
        postcode:"string",
        country:"string"
    },
    bank:{
        sortCode:"string",
        account:"string"
    },
    investment:[],
    upline:[],
    downline:[],
    active:Boolean,
})

investorSchema.plugin(passportLocalMongoose);
const Investor = new mongoose.model('Investor', investorSchema);


//DB Update and migration
async function migrateUsers() {
    try {
  
      // const savePromo = new Promo({
      //   codeType:"promo",
      //   code:"firsUse",
      //   startDate:"",
      //   endDate:"",
      //   active:true,
      //   value:5,
      //   maxUse:1
      // })

      // savePromo.save()
      const mig = await Investor.find();

  
      // Update each user record with the new field
      for (let i=0; i<mig.length; i++) {
        mig[i].investment=[{
            amount:"25,000",
            startDate:"2023-12-02",
            endDate:"2024-12-02",
            interest:""
          }]
        // let mig2 = new RedundantDB({
        //     fname:mig[i].fname,
        //     lname:mig[i].lname,
        //     email:mig[i].email,
        //     phone:mig[i].phone,
        //     interest:mig[i].interest,
        //     address:mig[i].address,
        //     postcode:mig[i].postcode,
        //     country:mig[i].country,
        //     startDate:mig[i].startDate,
        //     action:false,
        //     comment:mig[i].comment,
        //     codeStatus:false,
        //     code:"noCode",
        // })
        // await mig[i].save(); // Save the updated user record
        await mig[i].save()
      }
  
      console.log('Data migration completed successfully.');
      console.log(mig);
  
      // Disconnect from MongoDB
      await mongoose.disconnect();
    } catch (error) {
      console.error('Data migration failed:', error);
    }
  }
//   migrateUsers();

//    async function saveInvestor(){
//         const investorDB = new Investor({
//             username:"odunlamibamidelejohn@gmail.com",
//             profile:{
//                 fname:"Bamidele",
//                 lname:"Odunlami",
//                 dob:"",
//                 phone:"07487622295",
//                 address:"string",
//                 city:"string",
//                 state:"string",
//                 country:"string"
//             },
//             accessCode:"",
//             active:true,

//         })
//         investorDB.save() 
//     }

//  saveInvestor()


module.exports = {
    Investor:Investor,
}
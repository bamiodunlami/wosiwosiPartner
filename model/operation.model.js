const mongoose = require ('mongoose')
module.exports=mongoose.connect('mongodb+srv://bamiodunlami:' + process.env.MONGODB_CODE + '@cluster0.cqoyphm.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser:true})


const interestFormSchema = new mongoose.Schema({
    fname:"string",
    lname:"string",
    email:"string",
    phone:"string",
    status:Boolean,
    interest:"string",
    address:"string",
    postcode:"string",
    country:"string",
    startDate:"string",
    action:"string",
    comment:"string",
    codeStatus:Boolean,
    code:"string"

});

const redundantSchema = new mongoose.Schema({
  fname:"string",
  lname:"string",
  email:"string",
  phone:"string",
  interest:"string",
  address:"string",
  postcode:"string",
  country:"string",
  startDate:"string",
  action:Boolean,
  comment:"string",
  codeStatus:Boolean,
  code:"string"
});

// const followupSchema = new mongoose.Schema({
//     fname:"string",
//     lname:"string",
//     email:"string",
//     phone:"string",
//     interest:"string",
//     address:"string",
//     postcode:"string",
//     country:"string",
//     startDate:"string",
//     action:Boolean,
//     comment:"string"
// });

// const toSubscribeSchema = new mongoose.Schema({
//     fname:"string",
//     lname:"string",
//     email:"string",
//     phone:"string",
//     interest:"string",
//     address:"string",
//     postcode:"string",
//     country:"string",
//     startDate:"string",
//     action:Boolean,
//     comment:"string"
// });

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

const accessCodes = new mongoose.Schema({
  userMail:"string",
  status:Boolean,
  code:"string"
})


const InterestForm = new mongoose.model('InterestForm', interestFormSchema);

const RedundantDB = new mongoose.model('RedundantDB', redundantSchema);

// const Followup = new mongoose.model('Followup', followupSchema);

// const Tosubscribe = new mongoose.model('Tosubscribe', toSubscribeSchema);

const SubscriptionForm = new mongoose.model('SubscriptionForm', subscriptionFormSchema);

const AccessCode = new mongoose.model('AccessCode', accessCodes);


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
      const mig = await InterestForm.find();

  
      // Update each user record with the new field
      for (let i=0; i<mig.length; i++) {
        mig[i].status=true,
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
  // migrateUsers();
function accessCodeGen(){
  for(let i=0; i<150; i++){
    let coded = Math.floor(Math.random()*912230)
    const saveCode = new AccessCode({
      userMail:"",
      status:true,
      code:coded
    })
    console.log(saveCode)
    saveCode.save()

  }
}
// accessCodeGen()



module.exports = {
    mongoose:mongoose,
    InterestForm:InterestForm,
    SubscriptionForm:SubscriptionForm,
    // Followup:Followup,
    // Tosubscribe:Tosubscribe,
    AccessCode:AccessCode,
    RedundantDB:RedundantDB
} 

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
    startDate:"string",
    action:Boolean,
    comment:"string"
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
    startDate:"string",
    action:Boolean,
    comment:"string"
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
    startDate:"string",
    action:Boolean,
    comment:"string"
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

const accessCodes = new mongoose.Schema({
  userMail:"string",
  status:Boolean,
  code:"string"
})


const InterestForm = new mongoose.model('InterestForm', interestFormSchema);

const Followup = new mongoose.model('Followup', followupSchema);

const Tosubscribe = new mongoose.model('Tosubscribe', toSubscribeSchema);

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
      const mig = await Tosubscribe.find();

  
      // Update each user record with the new field
      for (let i=0; i<mig.length; i++) {
        // mig[i].action=false,
        let mig2 = new InterestForm({
            fname:mig[i].fname,
            lname:mig[i].lname,
            email:mig[i].email,
            phone:mig[i].phone,
            interest:mig[i].interest,
            address:mig[i].address,
            postcode:mig[i].postcode,
            country:mig[i].country,
            startDate:mig[i].startDate,
            action:false,
            comment:mig[i].comment
        })
        // await mig[i].save(); // Save the updated user record
        await mig2.save()
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


      const saveCode = new AccessCode({
        userMail:"bamidele",
        status:true,
        code:"788732"
      })

      // saveCode.save()


module.exports = {
    mongoose:mongoose,
    InterestForm:InterestForm,
    SubscriptionForm:SubscriptionForm,
    Followup:Followup,
    Tosubscribe:Tosubscribe,
    AccessCode:AccessCode
} 

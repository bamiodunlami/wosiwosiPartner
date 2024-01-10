const mongoose = require ('mongoose')
const passportLocalMongoose = require ('passport-local-mongoose')

const appRoot = require ('app-root-path')
const path = require ('path');
const rootPath = path.resolve(process.cwd())
appRoot.setPath(rootPath)

const passport = require (appRoot + '/util/passport.util.js');

module.exports=mongoose.connect('mongodb+srv://bamiodunlami:' + process.env.MONGODB_CODE + '@cluster0.cqoyphm.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser:true})


const userSchema = new mongoose.Schema({
    username:"string",
    category:String,
    passChange:Boolean,
    profile:{
        fname:"string",
        lname:"string",
        dob:"string",
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
    doc:[],
    upline:[],
    downline:[],
    active:Boolean,
    role:"string",
    level:Number,
    kyc:Boolean,
    wosiwosiAs:"string"
})

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model('User', userSchema);

//  const investorPass= `${investor.fname.slice(0,3)}${investor.lname.slice(0,3)}${investor.phone.slice(9,11)}` //pasword form
//DB Update and migration
async function migrateUsers() {
    try {
      const mig = await User.find();
      // Update each user record with the new field
      for (let i=0; i<mig.length; i++) {
        mig[i].kyc = false;
        await mig[i].save()
      }
      // await mig.setPassword("AdeOgun078");// create password
      // await mig.save() //save password
  
      console.log('Data migration completed successfully.');
      console.log(mig);
  
      // Disconnect from MongoDB
      await mongoose.disconnect();
    } catch (error) {
      console.error('Data migration failed:', error);
    }
  }
  // migrateUsers();

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = {
    User:User,
}
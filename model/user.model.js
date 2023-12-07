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
    role:"string",
    level:Number,
})

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model('User', userSchema);


//DB Update and migration
async function migrateUsers() {
    try {
      const mig = await Investor.find();
      // Update each user record with the new field
      for (let i=0; i<mig.length; i++) {
        mig[i].setPassword("Adeogu12#")
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

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = {
    User:User,
}
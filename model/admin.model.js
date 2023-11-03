const mongoose = require ('mongoose')
const passportLocalMongoose = require ('passport-local-mongoose')
const appRoot = require ('app-root-path')
const path = require ('path');
const rootPath = path.resolve(process.cwd())
appRoot.setPath(rootPath)

const passport = require (appRoot + '/util/passport.util.js');
mongoose.connect('mongodb+srv://bamiodunlami:' + process.env.MONGODB_CODE + '@cluster0.cqoyphm.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser:true})

const adminShema = new  mongoose.Schema({
    active:Boolean,
    level:'number',
    fname:'string',
    lname:'string',
    username:'string'
})

adminShema.plugin(passportLocalMongoose);

const Admin = new  mongoose.model('Admin', adminShema);

passport.use(Admin.createStrategy());
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

module.exports= Admin
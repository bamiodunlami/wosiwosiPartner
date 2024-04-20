const mongoose = require ("mongoose")

const appRoot = require ('app-root-path')
const path = require ("path")
const rootPath = path.resolve(process.cwd())
appRoot.setPath(rootPath)

const passport = require(appRoot + '/util/passport.util.js')

const passportLocalMongoose = require ("passport-local-mongoose")
mongoose.connect('mongodb+srv://bamiodunlami:' + process.env.MONGODB_CODE + '@cluster0.cqoyphm.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser:true})
const influenceSchema = mongoose.Schema({
    username:String,
    promoCode:String,
    useage:[]
})

influenceSchema.plugin(passportLocalMongoose)

module.exports = new mongoose.model("Influencer", influenceSchema)

// passport.use(Influencer.createStrategy());
// passport.serializeUser(Influencer.serializeUser());
// passport.deserializeUser(Influencer.deserializeUser());

// module.exports = {
//     Influencer:Influencer,
// }
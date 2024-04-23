const appRoot = require ("app-root-path")
const path = require ("path")
const { title } = require("process")
const rootPath = path.resolve(process.cwd())
appRoot.setPath(rootPath)

const passport = require (appRoot + "/util/passport.util.js")

const influencerDB = require(appRoot + "/model/user.model.js")

const woo= require (appRoot + "/util/woo.util.js")

// influencer dashboard
const influencerDashboard = async (req, res)=>{
    if(req.isAuthenticated()){
        const coupon = await woo.get(`coupons/${33528}`,{
        })
        res.render('influencer/dashboard', {
            title:"Influencer",
            user:req.user,
            coupon:coupon
        })
    }else{
        res.redirect("/login")
    }
}

// coupon used by
const usedBy = async (req, res)=>{
    if(req.isAuthenticated()){
        // console.log(req.query.number)
        try{
            const customer = await woo.get(`customers/${req.query.number}`)
            res.render("influencer/order",{
                title:"Used By",
                customer:customer
            })
        }catch(e){
            res.redirect(req.headers.referer)
        }

    }else{
        res.redirect("/login")
    }

}

module.exports={
    influencerDashboard:influencerDashboard,
    usedBy:usedBy
}
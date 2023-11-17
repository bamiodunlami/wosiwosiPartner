const express = require ('express');
const router = express.Router();
const appRoot = require ('app-root-path')
const path = require ('path');

const rootPath = path.resolve(process.cwd())
appRoot.setPath(rootPath)

const passport = require(appRoot + "/util/passport.util.js");
const interestDB = require(appRoot + "/model/operation.model.js").InterestForm;
const subscrberDB = require(appRoot + "/model/operation.model.js").SubscriptionForm;
const Admin = require(appRoot + "/model/admin.model.js");

// render admin dashboard
const adashboard = (req, res) => {
    if (req.isAuthenticated()) {
      res.render("admin/adashboard", {
        title: "Admin Dashboard",
        user: req.user,
      });
    } else {
      res.redirect("/adminlogin");
    }
  };
  
// get each route after path
const adminOperation = async (req, res) => {
if (req.isAuthenticated()) {
    const operation = req.params.operation;
    switch (operation) {
        // redner edit partner
    case "editpartner":
       const subscriberData = await subscrberDB.find()
        res.render('admin/partner', {
            user:req.user,
            subscrber:subscriberData,
            title:"Edit Patner"
        });
        break;
    
        // render interest
    case "interest":
        const interest= await interestDB.find()
        res.render('admin/interest', {
            int:interest,
            title:"Interests"
        });
        break; 
    
    // default
    default:
        console.log("nooo");
        break;
    }
} else {
    res.redirect("/adminLogin");
}
};

// create user
const createUser = async (req, res)=>{
  console.log(req.body)
}

const fetchSubscriberDetails = async (req, res)=>{
  const sdetails = await subscrberDB.findOne({email:req.body.email})
  res.json(sdetails)
}

  module.exports = {
    adashboard: adashboard,
    adminOperation: adminOperation,
    createUser:createUser,
    fetchSubscriberDetails:fetchSubscriberDetails,
  };
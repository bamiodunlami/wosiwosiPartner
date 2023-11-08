const express = require ('express');
const router = express.Router();
const appRoot = require ('app-root-path')
const path = require ('path');

const rootPath = path.resolve(process.cwd())
appRoot.setPath(rootPath)

const passport = require(appRoot + "/util/passport.util.js");
const interestDB = require(appRoot + "/model/operation.model.js").InterestForm;
const Admin = require(appRoot + "/model/admin.model.js");

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
  
const adminOperation = async (req, res) => {
if (req.isAuthenticated()) {
    const operation = req.params.operation;
    switch (operation) {
        // redner edit partner
    case "editpartner":
        res.render('admin/partner', {
            user:req.user,
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

// const renderInterest =async (req, res)=>{
//     if(req.isAuthenticated()){
//         // const interest= await interest.find()
//         // console.log(interest)
//         res.render('interest', {
//             title:"Interests",
//             // int:interest
//         })
//     }else{
//         res.redirect("/adminLogin");
//     }
// }


  module.exports = {
    adashboard: adashboard,
    adminOperation: adminOperation,
  };
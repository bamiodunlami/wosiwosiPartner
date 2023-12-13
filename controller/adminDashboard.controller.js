const express = require("express");
const router = express.Router();

const appRoot = require("app-root-path");
const path = require("path");
const rootPath = path.resolve(process.cwd());
appRoot.setPath(rootPath);

const passport = require(appRoot + "/util/passport.util.js");
const interestDB = require(appRoot + "/model/operation.model.js").InterestForm;
const subscrberDB = require(appRoot +"/model/operation.model.js").SubscriptionForm;
const accessCodesDB = require(appRoot +"/model/operation.model.js").AccessCode;
const UserDB = require(appRoot +"/model/user.model.js").User;

const mailer = require(appRoot + "/util/mailer.util.js");

const cron = require (appRoot + "/util/task.util.js")

// render admin dashboard
const adashboard = (req, res) => {
  if (req.isAuthenticated()) {
      if(req.user.role == "admin"){
        res.render("admin/adashboard", {
          title: "Admin Dashboard",
          user: req.user,
        });
      }else{
        req.session.destroy()
        res.redirect("/login")
      }
  } else {
    res.redirect("/adminlogin");
  }
};

// get each route after path
const adminOperation = async (req, res) => {
  if (req.isAuthenticated()) {
    const operation = req.params.operation;
    switch (operation) {
      // redner edit investor
      case "editpartner":
        const investorData = await UserDB.find({role:"investor"});
        res.render("admin/investor", {
          user: req.user,
          investor: investorData,
          title: "Edit Investor",
        });
        break;

      // render interest
      case "interest":
        const interest = await interestDB.find();
        // console.log(interest)
        res.render("admin/interest", {
          int: interest,
          //  removeThreeButton:true,
          //  removeTwoButton:false,
          removeButton: false,
          title: "Interests",
        });
        break;

      // access codes
      case "access":
        const codes = await accessCodesDB.find();
        res.render("admin/access", {
          codes: codes,
          //  removeThreeButton:true,
          //  removeTwoButton:false,
          removeButton: false,
          title: "Access Codes",
        });
        break;

      // default
      default:
        console.log("nooo");
        break;
    }
  } else {
    res.redirect("/adminlogin");
  }
};

// create user
const createInvestor = async (req, res) => {
  const investor = await subscrberDB.findOne({email:req.body.email})
  const investmentAmount = investor.interest.split(" ")[0]; // amount invested
  const investmentInterest = investmentAmount * 0.20; //interest
  console.log(investor);
  const investorPass= `${investor.fname.slice(0,3)}${investor.lname.slice(0,3)}${investor.phone.slice(9,11)}` //pasword form
  const investorDetails = new UserDB({
    username:investor.email,
    profile:{
        fname:investor.fname,
        lname:investor.lname,
        dob:"",
        phone:investor.phone,
        address:investor.address,
        city:"",
        state:"",
        postcode:investor.postcode,
        country:investor.country
    },
    investment:[{
      amount:investmentAmount,
      currency: investor.currency,
      startDate:req.body.startDate,
      endDate:req.body.endDate,
      interest:investmentInterest
    }],
    bank:{
      sortCode:"",
      account:""
  },
    upline:[],
    downline:[],
    active:true,
    role:"investor"
  })
  // save investor
  const savedInvestor = await investorDetails.save();
  // create investor password
  const newInvestor = await UserDB.findOne({username:req.body.email});
  await newInvestor.setPassword(investorPass);// create password
  await newInvestor.save() //save password
  if(newInvestor){
     await subscrberDB.deleteOne({email:req.body.email})
     mailer.mailPassToAdmin("bamidele@wosiwosi.co.uk", investor.fname, investorPass);
     mailer.paymentConfirmation(req.body.email, "bamidele@wosiwosi.co.uk", investor.fname,investor.currency,investmentAmount)
     mailer.ceoWelcoming(req.body.email, "bamidele@wosiwosi.co.uk", investor.fname)
     res.redirect(req.headers.referer)
  }

};

// fetch subsbccriber details
const fetchInvestorDetails = async (req, res) => {
  if (req.isAuthenticated()) {
    const idetails = await subscrberDB.findOne({email:req.body.email});
    res.send(idetails);
  } else res.redirect("/adminlogin");
};

// insterest operations
const interestOperation = async (req, res) => {
  if (req.isAuthenticated()) {
    switch (req.params.request) {
      // not interested
      case "deleteinterest":
       await mailer.accessRevoke(req.body.email)
       await accessCodesDB.deleteOne({userMail:req.body.email});
        await interestDB.deleteOne({ email: req.body.email });
        await subscrberDB.deleteOne({ email: req.body.email });
        res.redirect(req.headers.referer);
        break;

        // update interest comment
      case "interest_comment":
        // safe comment 
        const saveComment = await subscrberDB.updateOne({ email: req.body.email },{
          $set:{
            comment:req.body.comment
          }
        });
        res.redirect(req.headers.referer);


          // first confirm if the email is already in followup
          // const checkFollowup = await followupDB.findOne({ email: req.body.email })
          // if(checkFollowup){
          //   console.log("already available");
          //     // update tosubbscribe db to false
          //     await toSubscribeDB.updateOne({ email: req.body.email },
          //       {
          //         $set: {
          //           action: false,
          //         },
          //       });
          //       // update followup db to true
          //     await followupDB.updateOne({ email: req.body.email },
          //       {
          //         $set: {
          //           action: true,
          //         },
          //       });
          //       res.redirect(req.headers.referer);
          // }else{
          //   console.log("not exist")
          //   // update interestDB to false
          //   const updateInterest = await interestDB.updateOne({ email: req.body.email },
          //     {
          //       $set: {
          //         action: false,
          //       },
          //     });
          //     // update tosubbscribe db to false
          //     await toSubscribeDB.updateOne({ email: req.body.email },
          //       {
          //         $set: {
          //           action: false,
          //         },
          //       });
          //   if (updateInterest) {
          //     const details = await interestDB.findOne({ email: req.body.email });
          //     // console.log(updateInterest);
          //     const saveFollowup = new followupDB({
          //       fname: details.fname,
          //       lname: details.lname,
          //       email: details.email,
          //       phone: details.phone,
          //       // interest:req.body.interest,
          //       address: details.address,
          //       postcode: details.postcode,
          //       country: details.country,
          //       // startDate:req.body.startDate
          //       action: details.action,
          //       comment: req.body.comment,
          //     });
          //     await saveFollowup.save();
          //     // update followup db to true
          //     await followupDB.updateOne({ email: req.body.email },
          //       {
          //         $set: {
          //           action: true,
          //         },
          //       });
          //     res.redirect(req.headers.referer);
          // }}
      break;

        // update subscriber comment
        case "subscriber_comment":
          // console.log(req.body)
          // safe comment 
          const saveSubscriverComment = await subscrberDB.updateOne({ email: req.body.email },{
            $set:{
              comment:req.body.comment
            }
          });
          res.redirect(req.headers.referer);
  
  
            // first confirm if the email is already in followup
            // const checkFollowup = await followupDB.findOne({ email: req.body.email })
            // if(checkFollowup){
            //   console.log("already available");
            //     // update tosubbscribe db to false
            //     await toSubscribeDB.updateOne({ email: req.body.email },
            //       {
            //         $set: {
            //           action: false,
            //         },
            //       });
            //       // update followup db to true
            //     await followupDB.updateOne({ email: req.body.email },
            //       {
            //         $set: {
            //           action: true,
            //         },
            //       });
            //       res.redirect(req.headers.referer);
            // }else{
            //   console.log("not exist")
            //   // update interestDB to false
            //   const updateInterest = await interestDB.updateOne({ email: req.body.email },
            //     {
            //       $set: {
            //         action: false,
            //       },
            //     });
            //     // update tosubbscribe db to false
            //     await toSubscribeDB.updateOne({ email: req.body.email },
            //       {
            //         $set: {
            //           action: false,
            //         },
            //       });
            //   if (updateInterest) {
            //     const details = await interestDB.findOne({ email: req.body.email });
            //     // console.log(updateInterest);
            //     const saveFollowup = new followupDB({
            //       fname: details.fname,
            //       lname: details.lname,
            //       email: details.email,
            //       phone: details.phone,
            //       // interest:req.body.interest,
            //       address: details.address,
            //       postcode: details.postcode,
            //       country: details.country,
            //       // startDate:req.body.startDate
            //       action: details.action,
            //       comment: req.body.comment,
            //     });
            //     await saveFollowup.save();
            //     // update followup db to true
            //     await followupDB.updateOne({ email: req.body.email },
            //       {
            //         $set: {
            //           action: true,
            //         },
            //       });
            //     res.redirect(req.headers.referer);
            // }}
        break;

        // resend subscription form
      case "tosubscribed":
        mailer.sendSubscriptionForm(
          req.body.email ,
          "tinukeawo@wosiwosi.co.uk"
        );
        res.redirect(req.headers.referer);
        // const checkTosub = await toSubscribeDB.findOne({ email: req.body.email })
        // if(checkTosub){
        //   console.log("already available");
        //   console.log(checkTosub.email);
        //     // update tosubbscribe db to false
        //     await toSubscribeDB.updateOne({ email: req.body.email },
        //       {
        //         $set: {
        //           action: true,
        //         },
        //       });
        //       // update followup db to true
        //     await followupDB.updateOne({ email: req.body.email },
        //       {
        //         $set: {
        //           action: false,
        //         },
        //       });
        //       mailer.sendSubscriptionForm(
        //         checkTosub.email,
        //         "tinukeawo@wosiwosi.co.uk",
        //         checkTosub.fname
        //       );
        //     res.redirect(req.headers.referer);
        // }else{
        //   //  update inerest db false
        //   const updateInterestTwo = await interestDB.updateOne({ email: req.body.email},
        //     {
        //       $set: {
        //         action: false,
        //       },
        //     });
        //     // update follow up db to false
        //     await followupDB.updateOne({ email: req.body.email },
        //       {
        //         $set: {
        //           action: false,
        //         },
        //     });

        //     if(updateInterestTwo){
        //       const toSubscribDetails = await interestDB.findOne({email: req.body.email});
        //       const saveToSubscribe = new toSubscribeDB({
        //         fname: toSubscribDetails.fname,
        //         lname: toSubscribDetails.lname,
        //         email: toSubscribDetails.email,
        //         phone: toSubscribDetails.phone,
        //         // interest:req.body.interest,
        //         address: toSubscribDetails.address,
        //         postcode: toSubscribDetails.postcode,
        //         country: toSubscribDetails.country,
        //         // startDate:req.body.startDate
        //         action: toSubscribDetails.action,
        //         comment: req.body.comment,
        //       });
        //       const toSubscribeResponse = await saveToSubscribe.save();
        //       mailer.sendSubscriptionForm(
        //         toSubscribeResponse.email,
        //         "tinukeawo@wosiwosi.co.uk",
        //         toSubscribeResponse.fname
        //       );
        //       // update to subscribe truw
        //       await toSubscribeDB.updateOne({ email: req.body.email},
        //         {
        //           $set: {
        //             action: true,
        //           },
        //       });
        //       res.redirect(req.headers.referer);
        //     }
        //   }
      break;

      // resend contract
      // case "resend":
      //   const tosubscribe = await interestDB.findOne({email: req.body.email});
      //   mailer.sendSubscriptionForm(
      //     req.body.email ,
      //     "tinukeawo@wosiwosi.co.uk"
      //   );
      //   res.redirect(req.headers.referer);
      // break;

      default:
        break;
    }
  } else {
    res.redirect("/adminlogin");
  }
};

// delete interest form submitted
const interestSectionOperation = async (req, res) => {
  if (req.isAuthenticated()) {
    switch (req.params.request) {
      case "subscribers":
        const toSubscribeResponse = await subscrberDB.find();
        res.render("admin/subscribers", {
          int: toSubscribeResponse,
          removeButton: true,
          title: "Subscribers",
        });
        break;

      default:
        break;
    }
  } else {
    res.redirect("/adminlogin");
  }
};

// render investor page
const renderInvestorPage= async (req, res)=>{
  console.log(req.body)
}


module.exports = {
  adashboard: adashboard,
  adminOperation: adminOperation,
  createInvestor: createInvestor,
  fetchInvestorDetails: fetchInvestorDetails,
  interestOperation: interestOperation,
  interestSectionOperation: interestSectionOperation,
  renderInvestorPage:renderInvestorPage,
};

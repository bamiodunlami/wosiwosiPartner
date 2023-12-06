const express = require("express");
const router = express.Router();

const appRoot = require("app-root-path");
const path = require("path");

const rootPath = path.resolve(process.cwd());
appRoot.setPath(rootPath);

const model = require(appRoot + "/model/operation.model.js");
const investorModel = require(appRoot + "/model/investor.model.js");

const InterestForm = model.InterestForm;
const SubscriptionForm = model.SubscriptionForm;
const accessDB = model.AccessCode;
const redundantDB = model.RedundantDB;
const investorDB = investorModel.Investor
const mailer = require(appRoot + "/util/mailer.util.js");

const date = new Date()

// const interestForm = (req, res) => {
//   res.render("user/interest", {
//     title: "Partner Subscription Form",
//   });
// };

// const interestFormSubmitted = async (req, res) => {
//   try {
//     const saveInterest = new InterestForm({
//       fname: req.body.fname,
//       lname: req.body.lname,
//       email: req.body.email,
//       phone: req.body.phone,
//       interest: req.body.interest,
//       address: req.body.address,
//       postcode: req.body.postcode,
//       country: req.body.country,
//       startDate: req.body.startDate,
//       action: true,
//       comment: "",
//     });
//     response = await InterestForm.find({ email: req.body.email });
//     if (response.length > 0) {
//       mailer.interestFormResponse(req.body.email, req.body.fname);
//       res.render("user/interestFormSuccess", {
//         data: false,
//         title: "Response",
//       });
//     } else {
//       saveInterest.save();
//       mailer.interestFormResponse(req.body.email, req.body.fname);
//       mailer.adminInterestNotification("partners@mywosiwosi.co.uk");
//       res.render("user/interestFormSuccess", {
//         data: true,
//         title: "Success",
//       });
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };

const subscriptionForm = (req, res) => {
  res.render("user/subscriptionForm", {
    title: "Subscription Form",
  });
};

const subscriptionFormSumitted = async (req, res) => {
  try {
    const saveSubscription = new SubscriptionForm({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      postcode: req.body.postcode,
      city: req.body.city,
      country: req.body.country,
      interest: req.body.interest,
      category:req.body.category
      // startDate: req.body.startDate,
      // nextOfKin: req.body.nextOfKinName,
      // nextOfKinEmail: req.body.nextOfKinEmail,
      // nextOfKinPhone: req.body.nextOfKinPhone,
    });
    // check if already subscribed
    response = await SubscriptionForm.find({ email: req.body.email });
    if (response.length > 0) {
      res.render("user/interestFormSuccess", {
        data: false,
        title: "Response",
      });
    } else {
      // check if this person have access
      const checkEmail = await accessDB.findOne({userMail:req.body.email});
      if(checkEmail){
        // if access is valid
        saveSubscription.save();
        mailer.subscriptionFormResponse(
          req.body.email,
          "bamidele@wosiwosi.co.uk",
          req.body.fname,
          req.body.interest,
        );
          mailer.adminSubscribeNotification("partners@mywosiwosi.co.uk");
          const deleteInterest=await InterestForm.deleteOne({ email: req.body.email });
          res.render("user/interestFormSuccess", {
            data: true,
            title: "Success",
          });
      }else{
        // no access
        res.render("user/interestFormSuccess", {
          data: "noAccess",
          title: "Success",
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const access = async (req, res) => {
  res.render("user/access", {
    status:"true"
  });
};

const checkAccess = async (req, res) => {
  try {
    let accessCode = req.body.code;
    let email = req.body.email; 
    let phone = req.body.phone       
    if (accessCode.length != 6) {
        // access code more than 6
        res.render('user/access',{
            status:false,
            message:"Code expired or doesn't exist"
        })
    } else {
        // check if the code exist and valid
      const result = await accessDB.findOne({ code: accessCode });
    //   If code exist
      if(result){
        if (result.status == true) {
            // if code exit, update the status to false and input the email
            const updateResult = await accessDB.updateOne({code:accessCode}, {$set:{status:false, userMail:email}});
            // save to email and code to interest db
            newInterest = new InterestForm ({
                fname:"",
                lname:"",
                email:email,
                phone:phone,
                status:true,
                interest:"",
                address:"",
                postcode:"",
                country:"",
                startDate:"",
                action:"awaitSub",
                comment:"",
                codeStatus:false,
                code:accessCode
            })
            newInterest.save();
            mailer.interestFormResponse(email,"bamidele@wosiwosi.co.uk");
            res.redirect("https://www.main.mywosiwosi.co.uk")
        } else if (result.status == false && result.userMail == email){
                // if code has been used, look if the email has already been registered
                // console.log(email)
                // const checkInterestForm = await InterestForm.findOne({email:req.body.email})
                // console.log(checkInterestForm)
                // if(checkInterestForm){
                    res.redirect("https://www.main.mywosiwosi.co.uk")
                // } 
        }else{
          res.render('user/access',{
              status:false,
              message:"Access code or email not correct"
          });
        }
      }else{
        res.render('user/access',{
            status:false,
            message:"Error kindly contact us"
        })
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const redundant = async (req, res) =>{
  let query = req.query;
  // console.log(query)
  let result = await redundantDB.find({comment:req.query.comment}).sort(req.query.sort)
  console.log(result)
      res.render('admin/red', {
    title: "Redundant",
    int:result
    })
  // if(req.query.comment){
  //   let result = await redundantDB.find({comment:{$gt:req.query.comment}})
  //   // .sort(req.query.comment)
  //   // .sort([['fname', '-1']])
  //   // ((a, b) => a.fname.localeCompare(b.fname));
  //   res.render('admin/red', {
  //   title: "Redundant",
  //   int:result
  //   })
  // }

}

module.exports = {
  // interestForm: interestForm,
  // interestFormSubmitted: interestFormSubmitted,
  subscriptionForm: subscriptionForm,
  subscriptionFormSumitted,
  access: access,
  checkAccess: checkAccess,
  redundant:redundant
};

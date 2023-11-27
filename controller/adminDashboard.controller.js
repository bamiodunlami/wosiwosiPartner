const express = require("express");
const router = express.Router();
const appRoot = require("app-root-path");
const path = require("path");

const rootPath = path.resolve(process.cwd());
appRoot.setPath(rootPath);

const passport = require(appRoot + "/util/passport.util.js");
const interestDB = require(appRoot + "/model/operation.model.js").InterestForm;
const subscrberDB = require(appRoot +"/model/operation.model.js").SubscriptionForm;
const followupDB = require(appRoot + "/model/operation.model.js").Followup;
const toSubscribeDB = require(appRoot +"/model/operation.model.js").Tosubscribe;
const Admin = require(appRoot + "/model/admin.model.js");

const mailer = require(appRoot + "/util/mailer.util.js");

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
        const subscriberData = await subscrberDB.find();
        res.render("admin/partner", {
          user: req.user,
          subscrber: subscriberData,
          title: "Edit Patner",
        });
        break;

      // render interest
      case "interest":
        const interest = await interestDB.find();
        res.render("admin/interest", {
          int: interest,
          //  removeThreeButton:true,
          //  removeTwoButton:false,
          removeButton: false,
          title: "Interests",
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
const createUser = async (req, res) => {
  console.log(req.body);
};

// fetch subsbccriber details
const fetchSubscriberDetails = async (req, res) => {
  if (req.isAuthenticated()) {
    const sdetails = await subscrberDB.findOne({ email: req.body.email });
    res.send(sdetails);
  } else res.redirect("/adminlogin");
};

// insterest operations
const interestOperation = async (req, res) => {
  if (req.isAuthenticated()) {
    switch (req.params.request) {
      // not interested
      case "deleteinterest":
        await interestDB.deleteOne({ email: req.body.email });
        await followupDB.deleteOne({ email: req.body.email });
        await toSubscribeDB.deleteOne({ email: req.body.email });
        res.redirect(req.headers.referer);
        break;

        // followup
      case "notsure":
          // first confirm if the email is already in followup
          const checkFollowup = await followupDB.findOne({ email: req.body.email })
          if(checkFollowup){
            console.log("already available");
              // update tosubbscribe db to false
              await toSubscribeDB.updateOne({ email: req.body.email },
                {
                  $set: {
                    action: false,
                  },
                });
                // update followup db to true
              await followupDB.updateOne({ email: req.body.email },
                {
                  $set: {
                    action: true,
                  },
                });
                res.redirect(req.headers.referer);
          }else{
            console.log("not exist")
            // update interestDB to false
            const updateInterest = await interestDB.updateOne({ email: req.body.email },
              {
                $set: {
                  action: false,
                },
              });
              // update tosubbscribe db to false
              await toSubscribeDB.updateOne({ email: req.body.email },
                {
                  $set: {
                    action: false,
                  },
                });
            if (updateInterest) {
              const details = await interestDB.findOne({ email: req.body.email });
              // console.log(updateInterest);
              const saveFollowup = new followupDB({
                fname: details.fname,
                lname: details.lname,
                email: details.email,
                phone: details.phone,
                // interest:req.body.interest,
                address: details.address,
                postcode: details.postcode,
                country: details.country,
                // startDate:req.body.startDate
                action: details.action,
                comment: req.body.comment,
              });
              await saveFollowup.save();
              // update followup db to true
              await followupDB.updateOne({ email: req.body.email },
                {
                  $set: {
                    action: true,
                  },
                });
              res.redirect(req.headers.referer);
          }}
      break;

        // send contract
      case "tosubscribed":
        const checkTosub = await toSubscribeDB.findOne({ email: req.body.email })
        if(checkTosub){
          console.log("already available");
          console.log(checkTosub.email);
            // update tosubbscribe db to false
            await toSubscribeDB.updateOne({ email: req.body.email },
              {
                $set: {
                  action: true,
                },
              });
              // update followup db to true
            await followupDB.updateOne({ email: req.body.email },
              {
                $set: {
                  action: false,
                },
              });
              mailer.sendSubscriptionForm(
                checkTosub.email,
                "tinukeawo@wosiwosi.co.uk",
                checkTosub.fname
              );
            res.redirect(req.headers.referer);
        }else{
          //  update inerest db false
          const updateInterestTwo = await interestDB.updateOne({ email: req.body.email},
            {
              $set: {
                action: false,
              },
            });
            // update follow up db to false
            await followupDB.updateOne({ email: req.body.email },
              {
                $set: {
                  action: false,
                },
            });

            if(updateInterestTwo){
              const toSubscribDetails = await interestDB.findOne({email: req.body.email});
              const saveToSubscribe = new toSubscribeDB({
                fname: toSubscribDetails.fname,
                lname: toSubscribDetails.lname,
                email: toSubscribDetails.email,
                phone: toSubscribDetails.phone,
                // interest:req.body.interest,
                address: toSubscribDetails.address,
                postcode: toSubscribDetails.postcode,
                country: toSubscribDetails.country,
                // startDate:req.body.startDate
                action: toSubscribDetails.action,
                comment: req.body.comment,
              });
              const toSubscribeResponse = await saveToSubscribe.save();
              mailer.sendSubscriptionForm(
                toSubscribeResponse.email,
                "tinukeawo@wosiwosi.co.uk",
                toSubscribeResponse.fname
              );
              // update to subscribe truw
              await toSubscribeDB.updateOne({ email: req.body.email},
                {
                  $set: {
                    action: true,
                  },
              });
              res.redirect(req.headers.referer);
            }
          }
      break;

      // resend contract
      case "resend":
        const tosubscribe = await interestDB.findOne({email: req.body.email});
        mailer.sendSubscriptionForm(
          tosubscribe.email,
          "tinukeawo@wosiwosi.co.uk",
          tosubscribe.fname
        );
        res.redirect(req.headers.referer);
      break;

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
      case "followup":
        const followUpResponse = await followupDB.find();
        res.render("admin/followup", {
          int: followUpResponse,
          //  removeThreeButton:true,
          //  removeTwoButton:false,
          removeButton: true,
          title: "Interests",
        });
        break;

      case "subscription":
        const toSubscribeResponse = await toSubscribeDB.find();
        res.render("admin/interested", {
          int: toSubscribeResponse,
          //  removeThreeButton:true,
          //  removeTwoButton:false,
          removeButton: true,
          title: "Interests",
        });
        break;

      default:
        break;
    }
  } else {
    res.redirect("/adminlogin");
  }
};

module.exports = {
  adashboard: adashboard,
  adminOperation: adminOperation,
  createUser: createUser,
  fetchSubscriberDetails: fetchSubscriberDetails,
  interestOperation: interestOperation,
  interestSectionOperation: interestSectionOperation,
};

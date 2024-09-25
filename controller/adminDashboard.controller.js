const express = require("express");
const router = express.Router();

const appRoot = require("app-root-path");
const path = require("path");
const rootPath = path.resolve(process.cwd());
appRoot.setPath(rootPath);

const excelJS = require("exceljs");

const passport = require(appRoot + "/util/passport.util.js");
const interestDB = require(appRoot + "/model/operation.model.js").InterestForm;
const subscrberDB = require(appRoot +
  "/model/operation.model.js").SubscriptionForm;
const UserDB = require(appRoot + "/model/user.model.js");

const mailer = require(appRoot + "/util/mailer.util.js");

const cron = require(appRoot + "/util/task.util.js");

// render admin dashboard
const adashboard = (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.role == "admin") {
      res.render("admin/adashboard", {
        title: "Admin Dashboard",
        user: req.user,
      });
    } else {
      req.session.destroy();
      res.redirect("/login");
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
        const investorData = await UserDB.find({ role: "investor" });
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
      case "influencer":
        const influence = await UserDB.find({ role: "influencer" });
        // console.log(influence)
        res.render("admin/influencer", {
          title: "Influencer",
          influencer: influence,
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

// insterest/subscribe  action operation (POST Methods)
const interestOperation = async (req, res) => {
  if (req.isAuthenticated()) {
    switch (req.params.request) {
      // not interested
      case "deleteinterest":
        await mailer.accessRevoke(req.body.email);
        await accessCodesDB.deleteOne({ userMail: req.body.email });
        await interestDB.deleteOne({ email: req.body.email });
        await subscrberDB.deleteOne({ email: req.body.email });
        res.redirect(req.headers.referer);
        break;

      // update interest comment
      case "interest_comment":
        // safe comment
        const saveComment = await subscrberDB.updateOne(
          { email: req.body.email },
          {
            $set: {
              comment: req.body.comment,
            },
          }
        );
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
        const saveSubscriverComment = await subscrberDB.updateOne(
          { email: req.body.email },
          {
            $set: {
              comment: req.body.comment,
            },
          }
        );
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
        mailer.sendSubscriptionForm(req.body.email, "tinukeawo@wosiwosi.co.uk");
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

// Interest/Subscribe action operation (Get Method)
const interestOperationGet = async (req, res) => {
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

// fetch subsbcriber details to be sent via ajax
const fetchInvestorDetails = async (req, res) => {
  if (req.isAuthenticated()) {
    const idetails = await subscrberDB.findOne({ email: req.body.email });
    res.send(idetails);
  } else res.redirect("/adminlogin");
};

// create investor from subscriber details
const createInvestor = async (req, res) => {
  // check if investor already has investment
  // if investor already invested
  const alreadyInvestor = await UserDB.findOne({ username: req.body.email });
  if (alreadyInvestor) {
    const investor = await subscrberDB.findOne({ email: req.body.email });
    const investmentAmount = investor.capital; // amount invested
    const roiOption = investor.roiOption / 100;
    const investmentInterest = investmentAmount * roiOption; //interest
    const insertNewInvestment = await UserDB.updateOne(
      { username: req.body.email },
      {
        $push: {
          investment: {
            amount: investmentAmount,
            currency: investor.currency,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            interest: investmentInterest.toFixed(2),
            roiOption: investor.roiOption,
            roiTime: investor.roiTime,
            payout: 0,
            payOutDay: req.body.payOutDay,
            status: true,
            id: Math.floor(Math.random() * 901215),
            certificateNo: req.body.certificateNo,
          },
        },
      }
    );
    await subscrberDB.deleteOne({ email: alreadyInvestor.username });
    mailer.additionalInvesmentUpdate(
      alreadyInvestor.username,
      "bamidele@wosiwosi.co.uk",
      alreadyInvestor.profile.fname
    );
    mailer.paymentConfirmation(
      alreadyInvestor.username,
      "bamidele@wosiwosi.co.uk",
      alreadyInvestor.profile.fname,
      investor.currency,
      investmentAmount
    );
    res.redirect(req.headers.referer);
  } else {
    const investor = await subscrberDB.findOne({ email: req.body.email });
    const investmentAmount = investor.capital; // amount invested
    const roiOption = investor.roiOption / 100;
    const investmentInterest = investmentAmount * roiOption; //interest
    // console.log(investmentInterest.toFixed(2))
    const investorPass = `${investor.fname.slice(0, 3)}${investor.lname.slice(
      0,
      3
    )}${investor.phone.slice(9, 11)}`; //pasword form
    const investorDetails = new UserDB({
      username: investor.email,
      profile: {
        fname: investor.fname,
        lname: investor.lname,
        dob: "",
        phone: investor.phone,
        address: investor.address,
        city: investor.city,
        state: "",
        postcode: investor.postcode,
        country: investor.country,
      },
      investment: [
        {
          amount: investmentAmount,
          currency: investor.currency,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          interest: investmentInterest.toFixed(2),
          roiOption: investor.roiOption,
          roiTime: investor.roiTime,
          payout: 0,
          payOutDay: req.body.payOutDay,
          status: true,
          id: Math.floor(Math.random() * 901215),
          certificateNo: req.body.certificateNo,
        },
      ],
      bank: {
        sortCode: "",
        accountNo: "",
        accountName: "",
      },
      upline: [],
      downline: [],
      active: true,
      passChange: false,
      role: "investor",
      wosiwosiAs: investor.category,
      kyc: false,
    });
    // save investor
    const savedInvestor = await investorDetails.save();
    // create investor password
    const newInvestor = await UserDB.findOne({ username: req.body.email });
    await newInvestor.setPassword(investorPass); // create password
    await newInvestor.save(); //save password
    if (newInvestor) {
      await subscrberDB.deleteOne({ email: req.body.email });
      //  console.log(newInvestor)
      mailer.mailPortalDetails(
        newInvestor.username,
        "bamidele@wosiwosi.co.uk",
        newInvestor.profile.fname,
        newInvestor.username,
        investorPass
      );
      mailer.paymentConfirmation(
        newInvestor.username,
        "bamidele@wosiwosi.co.uk",
        newInvestor.profile.fname,
        investor.currency,
        investmentAmount
      );
      res.redirect(req.headers.referer);
    }
  }
};

// render individual investor dashboard to admin
const renderInvestorDash = async (req, res) => {
  if (req.isAuthenticated()) {
    const investor = await UserDB.findOne({ username: req.body.email });
    // console.log(investor.investment[1])
    res.render("admin/investordash", {
      investor: investor,
      title: "Investor",
    });
  } else {
    res.redirect("/adminlogin");
  }
};

// individual investor page operation by admin
const investorPageOperation = async (req, res) => {
  if (req.isAuthenticated()) {
    const parameter = req.params.operation;
    switch (parameter) {
      // add document
      case "document":
        const investor = await UserDB.updateOne(
          { username: req.body.username },
          {
            $push: {
              doc: {
                name: req.body.name,
                link: req.body.link,
              },
            },
          }
        );
        if (investor.acknowledged == true) {
          mailer.investorDocumentUpdate(
            req.body.username,
            "bamidele@wosiwosi.co.uk"
          );
          res.redirect("/adashboard/editpartner");
        }
        break;

      default:
        break;
    }
  } else {
    res.redirect("/adminlogin");
  }
};

// send general Email
const generalMail = async (req, res) => {
  if (req.isAuthenticated()) {
    const investor = await UserDB.find({ role: "investor" });
    // console.log(req.body.mailContent)
    for (let i = 0; i < investor.length; i++) {
      console.log(investor[i].username);
      await mailer.investorGeneralMail(
        investor[i].username,
        "bamidele@wosiwosi.co.uk",
        req.body.mailContent
      );
    }
    res.redirect("/adashboard");
  } else {
    res.redirect("/adminlogin");
  }
};

// remind investor of kyc pending
const kycMail = async (req, res) => {
  const investor = await UserDB.findOne({ username: req.query.investor });
  mailer.kycReminder(
    investor.username,
    "bamidele@wosiwosi.co.uk",
    investor.profile.fname
  );
  res.redirect("/adashboard/editpartner");
};

// complete kyc
const kycdone = async (req, res) => {
  const investor = await UserDB.updateOne(
    { username: req.body.investor },
    { kyc: true }
  );
  mailer.kycdone(req.body.investor, "bamidele@wosiwosi.co.uk");
  res.redirect("/adashboard/editpartner");
};

// payment made
const paymentMade = async (req, res) => {
  if (req.isAuthenticated()) {
    let currentPayout = req.query.currentPayOut;
    let id = Number(req.query.id);
    let updatePayout = Number(currentPayout) + 1;
    // console.log(req.query.currentPayOut)
    const updateUser = await UserDB.updateOne(
      { username: req.query.username, "investment.id": id },
      {
        $set: {
          "investment.$.payout": updatePayout,
        },
      }
    );
    mailer.payoutNotification(req.query.username, "bamidele@wosiwosi.co.uk");
    res.redirect("adashboard/editpartner");
  } else {
  }
};

// export csv
const exportCSV = async (req, res) => {
  const investor = await UserDB.find({ role: "investor" });
  let User = [];
  // console.log(investor[0].investment[0].certificateNo)
  for (let i = 0; i < investor.length; i++) {
    let monthlyInterestDue;
    let myPayDay;
    let expectedEndPayment;

    for (const investment of investor[i].investment) {
      // console.log(investment)

      if (investment.roiTime == "Annually") {
        monthlyInterestDue = investment.amount * 0.016666;
        myPayDay = investment.endDate;
        expectedEndPayment =
          Number(investment.amount) + Number(investment.interest);
      } else if (investment.roiTime == "Monthly") {
        monthlyInterestDue = investment.interest;
        myPayDay = investment.payOutDay + "th monthly";
        expectedEndPayment = investment.amount;
      }

      User.push({
        fname: investor[i].profile.fname,
        lname: investor[i].profile.lname,
        phone: investor[i].profile.phone,
        email: investor[i].username,
        relationship:investor[i].wosiwosiAs,
        certificateNo: investment.certificateNo,
        investment: investment.amount,
        startDate: investment.startDate,
        frequency: investment.roiTime,
        monthlyInterest: monthlyInterestDue,
        totalPayable: monthlyInterestDue * 12,
        interestPaid: investment.payout * monthlyInterestDue,
        interestDueDate: myPayDay,
        investmentExpire: investment.endDate,
        totalDueOnExpire: expectedEndPayment,
      });
    }
  }
  // console.log(user)
  // convert to excel
  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet("Investors");

  // Define columns in the worksheet
  worksheet.columns = [
    { header: "First Name", key: "fname", width: 25 },
    { header: "Last Name", key: "lname", width: 25 },
    { header: "Phone", key: "phone", width: 25 },
    { header: "Email", key: "email", width: 25 },
    {header: "Relationship", key:"relationship", with:25},
    { header: "Certificate NO", key: "certificateNo", width: 25 },
    { header: "Investment Amount (£)", key: "investment", width: 25 },
    { header: "Investment Start Date", key: "startDate", width: 25 },
    { header: "Interest Frequency", key: "frequency", width: 25 },
    { header: "Monthly Interest Due", key: "monthlyInterest", width: 25 },
    { header: "Total Interest Payable", key: "totalPayable", width: 25 },
    { header: "Interest Paid", key: "interestPaid", width: 25 },
    { header: "Interest Due", key: "interestDueDate", width: 25 },
    { header: "Investment Expiry Date", key: "investmentExpire", width: 25 },
    { header: "Total Due on Expire", key: "totalDueOnExpire", width: 25 },
  ];

  // Add data to the worksheet
  User.forEach((user) => {
    worksheet.addRow(user);
  });

  // Set up the response headers
  res.setHeader(
    "Content-Type",
    "acpplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=" + "investor.xlsx"
  );

  // Write the workbook to the response object
  workbook.xlsx.write(res).then(() => res.end());
};

// reset investor password
const resetPassword = async (req, res) => {
  const user = await UserDB.findOne({ username: req.query.username });
  let newPass = user.profile.fname.slice(0, 2) + user.profile.phone.slice(7, 11);
  console.log(newPass);
  const updatePassChange = await UserDB.updateOne(
    {username: req.query.username},
    {
      $set: {
        passChange: false,
      },
  });
  // console.log(updatePassChange);
  if (updatePassChange.modifiedCount == 1) {
    console.log("Changed")
    await user.setPassword(newPass); // create password
    await user.save(); //save password
    mailer.passwordReset( user.username, "bamidele@wosiwosi.co.uk", user.profile.fname, newPass);
  } else {
    console.log("not change");
  }
  res.redirect("/adashboard/editpartner");
};


module.exports = {
  adashboard: adashboard,
  adminOperation: adminOperation,
  createInvestor: createInvestor,
  fetchInvestorDetails: fetchInvestorDetails,
  interestOperation: interestOperation,
  interestOperationGet: interestOperationGet,
  // renderInvestorPage: renderInvestorPage,
  renderInvestorDash: renderInvestorDash,
  investorPageOperation: investorPageOperation,
  generalMail: generalMail,
  kycMail: kycMail,
  kycdone: kycdone,
  paymentMade: paymentMade,
  exportCSV: exportCSV,
  resetPassword: resetPassword,
};

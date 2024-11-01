const express = require ('express');
const router = express.Router();
const appRoot = require ('app-root-path')
const path = require ('path');

const rootPath = path.resolve(process.cwd())
appRoot.setPath(rootPath)

const dash = require (appRoot +'/controller/adminDashboard.controller.js')

router
.get ('/adashboard', dash.adashboard)

.get ('/adashboard/:operation', dash.adminOperation) //each routh after the path

.get("/delete-interest", dash.deleteInterest) // delete inerest

.get("/send-subscription-form", dash.sendSubscriptionForm) // delete inerest

.get('/subscriber', dash.renderSubscriberPage) //render subscriber page

.get('/delete-subscriber', dash.deleteSubscriber) //Delete subscriber

.post('/idetails', dash.fetchInvestorDetails) //subscriber details fetch to be converted into investor

.post('/createInvestor', dash.createInvestor) //create user (Investor)

.post ('/investorpage', dash.renderInvestorDash) //render individual investor page

.post('/investorpage/:operation', dash.investorPageOperation) //operation

.post('/generalmail', dash.generalMail) // send general mail

.get('/kyc', dash.kycMail) //kyc mail

.post('/updatekyc', dash.kycdone) //kyc done

.get('/paid', dash.paymentMade) //payment made

.get('/export', dash.exportCSV) //export investor

.get('/resetpass', dash.resetPassword) //investor password reset


module.exports=router


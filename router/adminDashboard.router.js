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

.post('/createInvestor', dash.createInvestor) //create user

.post('/idetails', dash.fetchInvestorDetails) //subscriber details fetch

.post('/interest/:request', dash.interestOperation) //interest operation

.get('/interest/:request', dash.interestSectionOperation) //interest operation

.post('/investorpage', dash.renderInvestorDash)

.post('/investorpage/:operation', dash.investorPageOperation)

module.exports=router


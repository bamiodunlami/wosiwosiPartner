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

.post('/createuser', dash.createUser) //create user

.post('/sdetails', dash.fetchSubscriberDetails) //subscriber details fetch

module.exports=router


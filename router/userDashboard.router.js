const express = require('express');
const router = express.Router();

const appRoot = require ('app-root-path');
const path = require ('path');

const rootPath = path.resolve(process.cwd())
appRoot.setPath(rootPath);


const dashboard = require(appRoot + '/controller/userDashboard.controller.js')

router

.get('/udashboard', dashboard.userDashboard)

// dashboard operation
.get('/udashboard/:operation', dashboard.dashboardRequests)

.get('/changepass', dashboard.renderChangePassword)

.post ("/changepassword", dashboard.changePassword)

.post ('/updateprofile', dashboard.updateProfile)


module.exports=router
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
.post('/udashboard/:operation', dashboard.dashboardRequests)


module.exports=router
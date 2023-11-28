const express = require('express');
const router = express.Router();

const appRoot = require ('app-root-path');
const path = require ('path');

const rootPath = path.resolve(process.cwd())
appRoot.setPath(rootPath);


const dashboard = require(appRoot + '/controller/operation.controller.js')

router

// .get('/interest', dashboard.interestForm)

// .post('/interest', dashboard.interestFormSubmitted)

.get('/subscribe', dashboard.subscriptionForm)

.post ('/subscribe', dashboard.subscriptionFormSumitted)

.get('/access', dashboard.access)

.post('/checkaccess', dashboard.checkAccess)

.post ('/')

module.exports=router
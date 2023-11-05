const express = require ('express');
const router = express.Router();
const appRoot = require ('app-root-path')
const path = require ('path');

const rootPath = path.resolve(process.cwd())
appRoot.setPath(rootPath)

const passport = require (appRoot + '/util/passport.util.js')
const adminAuth = require (appRoot +'/controller/adminAuth.controller.js')

router
.get('/adminlogin', adminAuth.renderAdminLogin)

.post('/adminlogin', passport.authenticate("local", {failureRedirect:"/adminlogin", failureFlash:true}),(req, res)=>{
    res.redirect('/adashboard')
})

.get('/mreg', adminAuth.renderMasterAdminReg)

.post('/mreg', adminAuth.masterAdminReg)


// logout
.get("/logout", adminAuth.logout)

module.exports=router
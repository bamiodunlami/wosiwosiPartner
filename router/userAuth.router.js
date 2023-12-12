const express = require ('express');
const router = express.Router();
const appRoot = require ('app-root-path')
const path = require ('path');

const rootPath = path.resolve(process.cwd())
appRoot.setPath(rootPath)

const passport = require (appRoot + '/util/passport.util.js')
const userDash = require (appRoot +'/controller/userDashboard.controller.js')

router
.get('/login', (req, res)=>{
    res.render('user/login', {
        title:"Login"
    })
})

.post('/login', passport.authenticate("local", {failureRedirect:"/login", failureFlash:true}),(req, res)=>{
    // if it's admin
        res.redirect('/udashboard')    
})

// logout
.get("/logout", userDash.logout)

module.exports=router
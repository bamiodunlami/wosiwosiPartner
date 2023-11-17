require ('dotenv').config();
const express = require ('express');
const app = express();
const appRoot = require ('app-root-path');
const path = require ('path');
const bodyParser = require('body-parser');
const passport = require('passport')
const session = require('express-session');
const flash = require ('express-flash');

const rootPath = path.resolve(process.cwd())
appRoot.setPath(rootPath)

const port = process.env.PORT || 3000;

// Midwares
app.set('view engine', "ejs");
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge:120000
    }
  }));
app.use(passport.session()); //ask passport to use session
app.use(flash());

// user routers
const userLoginRoute =  require (appRoot + '/router/userAuth.router.js')
const userDashboardRoute = require (appRoot + '/router/userDashboard.router.js')

// admin routers
const masterAdminRegRoute =  require (appRoot + '/router/adminAuth.router.js')
const adminDashboard =  require (appRoot + '/router/adminDashboard.router.js')

// other operations
const operation = require (appRoot + '/router/operation.router.js')


// Decalre router use
app.use(userLoginRoute)
app.use(userDashboardRoute)
app.use(masterAdminRegRoute)
app.use(adminDashboard)
app.use(operation)


// 404
app.use((req, res)=>{
    res.redirect('/login')
})

app.listen(port, ()=>{
    // console.log(`server on ${port}`)
})
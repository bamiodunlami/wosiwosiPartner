const express = require ('express');
const app = express()
const passport = require ('passport')

const appRoot = require ('app-root-path')
const path = require ('path');
const rootPath = path.resolve(process.cwd())
appRoot.setPath(rootPath)

const User = require (appRoot + '/model/user.model.js');
const Influencer = require (appRoot + '/model/user.model.js');

app.use(passport.initialize());

// app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(Influencer.createStrategy());
passport.serializeUser(Influencer.serializeUser());
passport.deserializeUser(Influencer.deserializeUser());

module.exports = passport
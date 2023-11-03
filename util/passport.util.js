const express = require ('express');
const app = express()
const passport = require ('passport')

app.use(passport.initialize());

app.use(passport.session());

module.exports = passport
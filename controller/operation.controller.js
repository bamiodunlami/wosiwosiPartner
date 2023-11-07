const express = require('express');
const router = express.Router();

const appRoot = require ('app-root-path');
const path = require ('path');

const rootPath = path.resolve(process.cwd())
appRoot.setPath(rootPath);

const model = require(appRoot + '/model/operation.model.js')
const InterestForm = model.InterestForm
const mailer = require(appRoot + '/util/mailer.util.js')

const interestForm = (req, res)=>{
    res.render('user/interest', {
        title:"Interest Form"
    })
}

const interestFormSubmitted = async (req, res)=>{
    try{
        const saveInterest = new InterestForm({
            fname:req.body.fname,
            lname:req.body.lname,
            email:req.body.email,
            phone:req.body.phone,
            interest:req.body.interest,
            country:req.body.country
        })
        saveInterest.save();
        mailer.interestFormResponse(req.body.email,req.body.fname);
        res.render('user/interestFormSuccess', {
            title:"Success"
        })
    }catch(e){
        console.log(e)
    }
}

module.exports ={
    interestForm:interestForm, 
    interestFormSubmitted:interestFormSubmitted
}
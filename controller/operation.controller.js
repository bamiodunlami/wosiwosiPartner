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
            address:req.body.address,
            postcode:req.body.postcode,
            country:req.body.country
        })
        response = await InterestForm.find({email:req.body.email});
        if(response.length>0){
            mailer.interestFormResponse(req.body.email,req.body.fname);
            res.render('user/interestFormSuccess', {
                data:false,
                title:"Response"
            })
        }else{
            saveInterest.save();
            mailer.interestFormResponse(req.body.email,req.body.fname);
            res.render('user/interestFormSuccess', {
                data:true,
                title:"Success"
            })
        }

    }catch(e){
        console.log(e)
    }
}

module.exports ={
    interestForm:interestForm, 
    interestFormSubmitted:interestFormSubmitted
}
const express = require('express');
const router = express.Router();

const appRoot = require ('app-root-path');
const path = require ('path');

const rootPath = path.resolve(process.cwd())
appRoot.setPath(rootPath);

const model = require(appRoot + '/model/operation.model.js')
const InterestForm = model.InterestForm
const SubscriptionForm = model.SubscriptionForm
const mailer = require(appRoot + '/util/mailer.util.js')

const interestForm = (req, res)=>{
    res.render('user/interest', {
        title:"Partner Subscription Form"
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
            country:req.body.country,
            startDate:req.body.startDate
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
            mailer.adminInterestNotification("partners@mywosiwosi.co.uk")
            res.render('user/interestFormSuccess', {
                data:true,
                title:"Success"
            })
        }

    }catch(e){
        console.log(e)
    }
}

const subscriptionForm = (req, res)=>{
    res.render('user/subscriptionForm', {
        title:"Subscription Form"
    })

}

const subscriptionFormSumitted = async (req, res)=>{
    try{
        const saveSubscription = new SubscriptionForm({
            fname:req.body.fname,
            lname:req.body.lname,
            email:req.body.email,
            phone:req.body.phone,
            address:req.body.address,
            postcode:req.body.postcode,
            country:req.body.country,
            interest:req.body.interest,
            startDate:req.body.startDate,
            nextOfKin:req.body.nextOfKinName,
            nextOfKinEmail:req.body.nextOfKinEmail,
            nextOfKinPhone:req.body.nextOfKinPhone,
        })
        response = await SubscriptionForm.find({email:req.body.email});
        if(response.length>0){
            res.render('user/interestFormSuccess', {
                data:false,
                title:"Response"
            })
        }else{
            saveSubscription.save();
            mailer.subscriptionFormResponse(req.body.email,req.body.fname, req.body.interest, req.body.startDate);
            mailer.adminSubscribeNotification("partners@mywosiwosi.co.uk")
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
    interestFormSubmitted:interestFormSubmitted,
    subscriptionForm:subscriptionForm,
    subscriptionFormSumitted,
}
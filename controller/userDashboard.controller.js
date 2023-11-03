const renderDashboard =(req, res)=>{
    res.render('user/dashboard', {
        user:req.user,
        title:"Dashboard"
    })
}

const interestForm = (req, res)=>{
    res.render('user/interest', {
        title:"Interest Form"
    })
}

const interestFormSubmitted = async (req, res)=>{
    try{
        console.log(req.body)
        res.render('user/interestFormSuccess', {
            title:"Success"
        })
    }catch(e){
        console.log(e)
    }
}

module.exports ={
    dashboardGetmethod : renderDashboard,
    interestForm:interestForm, 
    interestFormSubmitted:interestFormSubmitted
}
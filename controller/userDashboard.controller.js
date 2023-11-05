const renderDashboard =(req, res)=>{
    res.render('user/dashboard', {
        user:req.user,
        title:"Dashboard"
    })
}

module.exports ={
    dashboardGetmethod : renderDashboard,
}
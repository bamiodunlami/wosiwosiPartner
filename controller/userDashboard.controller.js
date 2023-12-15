const appRoot = require("app-root-path");

const path = require("path");
const rootPath = path.resolve(process.cwd());
appRoot.setPath(rootPath);

const passport = require(appRoot + "/util/passport.util.js");

const mailer = require(appRoot + "/util/mailer.util.js");

const User = require(appRoot + "/model/user.model.js").User;

// render user dashboard
const userDashboard = (req, res) => {
  if (req.isAuthenticated()) {
      if(req.user.passChange == false){ //if user hasnt changed password
        res.redirect('/changepass')
      }else{ //user has change password
        res.render("user/dashboard", {
          title: "Investor Dashboard",
          user: req.user,
        });
      }
  } else {
    res.redirect("/login");
  }
};

// dashboard operation
const dashboardRequests = async (req, res) => {
  // console.log(req.params.operation);
  if (req.isAuthenticated()) {
    const operation = req.params.operation;
    switch (operation) {
      // redner edit investor
      case "myinvestment":
        res.render("user/investment", {
          user: req.user,
          title: "Edit Investor",
        });
        break;
        
        // render profile
        case "myprofile":
          res.render("user/profile", {
            user: req.user,
            title: "Investor Profile",
          });
          break;

      // default
      default:
        console.log("nooo");
        break;
    }
  } else {
    res.redirect("/adminlogin");
  }
};

// change password
const renderChangePassword = async (req, res) =>{
  if(req.isAuthenticated()){
    res.render("user/changepass", {
      user:req.user,
      title:"Change Password"
    })
  }else{
    res.redirect('/login')
  }
}

const changePassword = async (req, res)=>{
  if(req.isAuthenticated()){
    const user= await User.findOne({username:req.body.username});
    await user.setPassword(req.body.password);
    const passSaved = await user.save(); //password reset
      if(passSaved){ //if password changed
        mailer.passwordChange(passSaved.username, "bamidele@wosiwosi.co.uk", passSaved.profile.fname) //send mail
        // update pass save from false to true
        const passStatus = await User.updateOne({username:req.body.username},
          {
            $set:{
              passChange:true
            }
          })
        res.render("user/changeconfirmation", {
          title:"Password Changed"
        })
        req.session.destroy();
      }else{ //if password didnt change
        res.redirect('/login')
      }
  }else{
    res.redirect('/login')
  }
}

// update profile
const updateProfile = async (req, res) =>{
  if (req.isAuthenticated()){
    const updatUser = await User.updateOne({username:req.user.username},{
        $set: {
          "profile.dob":req.body.dob
        },
    })
    if(updatUser.acknowledged == true){
      res.redirect(req.headers.referer)
    }
  }else{
    res.redirect("/login")
  }
}

// logout
const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
    }
    res.redirect("/login");
  });
};

module.exports = {
  userDashboard: userDashboard,
  dashboardRequests: dashboardRequests,
  renderChangePassword:renderChangePassword,
  changePassword:changePassword,
  updateProfile:updateProfile,
  logout: logout,
};

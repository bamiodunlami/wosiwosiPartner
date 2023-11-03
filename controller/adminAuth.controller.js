const appRoot = require("app-root-path");
const path = require("path");

const rootPath = path.resolve(process.cwd());
appRoot.setPath(rootPath);

const passport = require(appRoot + "/util/passport.util.js");
const Admin = require(appRoot + "/model/admin.model.js");

const renderMasterAdminReg = (req, res) => {
  res.render("admin/mreg", {
    title: "Master Register",
  });
};

const masterAdminReg = async (req, res) => {
  try {
    const providerDetails = new Admin({
      username: req.body.username,
      active: false,
      level: "1",
      fname: "",
      lname: "",
    });
    Admin.register(providerDetails, req.body.password, (err, user) => {
      if (err) {
        console.log(err);
        res.redirect(req.headers.refer);
      }
      res.redirect("/adminlogin");
    });
  } catch (e) {
    console.log(e);
  }
};

const renderAdminLogin = (req, res) => {
  res.render("admin/alogin", {
    title: "Admin Login",
  });
};

const adashboard = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("admin/adashboard", {
      title: "Admin Dashboard",
      user: req.user,
    });
  } else {
    res.redirect("/adminlogin");
  }
};

const adminOperation = (req, res) => {
  if (req.isAuthenticated()) {
    const operation = req.params.operation;
    switch (operation) {
      case "editpartner":
        res.render('admin/partner', {
            user:req.user,
            title:"Edit Patner"
        });
        break;
      default:
        console.log("nooo");
        break;
    }
  } else {
    res.redirect("/adminLogin");
  }
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
    }
    res.redirect("/adminlogin");
  });
};

module.exports = {
  renderAdminLogin: renderAdminLogin,
  renderMasterAdminReg: renderMasterAdminReg,
  masterAdminReg: masterAdminReg,
  adashboard: adashboard,
  adminOperation: adminOperation,
  logout: logout,
};

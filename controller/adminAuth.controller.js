const appRoot = require("app-root-path");

const path = require("path");
const rootPath = path.resolve(process.cwd());
appRoot.setPath(rootPath);

const passport = require(appRoot + "/util/passport.util.js");

const User = require(appRoot + "/model/user.model.js").User;

const renderMasterAdminReg = (req, res) => {
  res.render("admin/mreg", {
    title: "Master Register",
  });
};

const masterAdminReg = async (req, res) => {
  try {
    const providerDetails = new User({
      username: req.body.username,
      active: true,
      level: "1",
      role:"admin"
    });
    User.register(providerDetails, req.body.password, (err, user) => {
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
  logout: logout,
};

const appRoot = require("app-root-path");

const path = require("path");
const rootPath = path.resolve(process.cwd());
appRoot.setPath(rootPath);

const passport = require(appRoot + "/util/passport.util.js");

const User = require(appRoot + "/model/user.model.js").User;

// render user dashboard
const userDashboard = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("user/dashboard", {
      title: "Investor Dashboard",
      user: req.user,
    });
  } else {
    res.redirect("/login");
  }
};

// dashboard operation
const dashboardRequests = (req, res) => {
  console.log(req.params.operation);
};

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
  logout: logout,
};

const cron = require('node-cron');

const appRoot = require("app-root-path");
const path = require("path");
const rootPath = path.resolve(process.cwd());
appRoot.setPath(rootPath);

const investorDB = require (appRoot + "/model/user.model.js").User

const mailer = require(appRoot + "/util/mailer.util.js");

async function readInvestorDate (){
    const investorDate = await investorDB.find({role:"investor"})
    for(let i=0; i<investorDB.length-1; i++){
        console.log(investorDate[i].investment[0].startDate)
    }
}

// readInvestorDate()

cron.schedule('*/1  * * * *', () => {
    // readInvestorDate()
});

module.exports = cron
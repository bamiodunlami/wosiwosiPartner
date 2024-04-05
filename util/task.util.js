const cron = require('node-cron');

const appRoot = require("app-root-path");
const path = require("path");
const rootPath = path.resolve(process.cwd());
appRoot.setPath(rootPath);

const date = new Date()

let today= date.getDate()

const investorDB = require (appRoot + "/model/user.model.js").User

const mailer = require(appRoot + "/util/mailer.util.js");

async function readInvestorDate (){
    const investorDate = await investorDB.find({role:"investor"})
    for(let i=0; i<investorDate.length; i++){
        for(let j = 0; j<investorDate[i].investment.length; j++){ //check if one investor has more than one investment
            if (today == investorDate[i].investment[j].payOutDay){
                mailer.sendPayOutReminder("odunlamibamidelejohn@gmail.com", "bamidele@wosiwosi.co.uk", today, investorDate[i].profile.fname );
            }
            
        }
    }
}

// Cron runs every day at 00:00
cron.schedule('0 0 * * *', () => {
    readInvestorDate()
},{
    scheduled: true,
    timezone: "Europe/London"
});




module.exports = cron
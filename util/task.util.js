const cron = require('node-cron');

const appRoot = require("app-root-path");
const path = require("path");
const rootPath = path.resolve(process.cwd());
appRoot.setPath(rootPath);



const dateObject = new Date();

let convertToUkTimeZone = new Intl.DateTimeFormat('en-GB', {timeZone: 'Europe/London'}).format(dateObject);

// convert date to YY--MM--DD
let today = convertToUkTimeZone.slice(0, 2)

const investorDB = require (appRoot + "/model/user.model.js")

const mailer = require(appRoot + "/util/mailer.util.js");


// function checks who to pay today
async function readInvestorDate (){
    const investorDate = await investorDB.find({role:"investor"})
    let investorToPay = []
    for(let i=0; i<investorDate.length; i++){
        for(let j = 0; j<investorDate[i].investment.length; j++){ //check if one investor has more than one investment
            if (today == Number(investorDate[i].investment[j].payOutDay)){
                investorToPay.push(investorDate[i].profile.fname)
            }
            
        }
    }
    // when there is anyone to pay
    if (investorToPay.length > 0){
        let investorToPayString = investorToPay.map((name) => (name)).join(", ")
        mailer.sendPayOutReminder("seyiawo@wosiwosi.co.uk", "bamidele@wosiwosi.co.uk", today, investorToPayString );
        console.log("you are paying " + investorToPay + " " )
    }else{
        console.log("NO one")
    }

}
// console.log(date.toJSON())


// Cron runs every day at 00:00
cron.schedule('0 8 * * *', () => {
    readInvestorDate();
},{
    scheduled: true,
    timezone: "Europe/London"
});




module.exports = cron
const nodemailer = require("nodemailer");
const appRoot = require ('app-root-path')
const path = require ('path');

const rootPath = path.resolve(process.cwd())
appRoot.setPath(rootPath)


let transporter = nodemailer.createTransport({
  host: "smtp.zoho.eu",
  port: process.env.MAILER_PORT,
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: process.env.MAILER_USERNAME,
    pass: process.env.MAILER_PASS,
  },
})

const interestFormResponse = (to, fname) => {
  const mailOptions = {
      from: '"Wosiwosi Partnership" <info@wosiwosi.co.uk>',
      to: to,
      subject: "Wosiwosi Partnership",
      attachments: [
        {  
            filename: 'Partnership_Brochure.pdf',
            path: appRoot + "/file/brochure.pdf" // stream this file
        }],
      html: 
          `<!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">
              <title>Thank you for your interest in Wosiwosi Partnership</title>
              <style>
                  body {
                      font-family: Poppins, sans-serif;
                      line-height: 1.6;
                  }
                  .container {
                      max-width: 600px;
                      margin: 0 auto;
                      padding: 20px;
                      text-align: left;
                  }
                  h1 {
                      color: #007519;
                  }
                  p {
                      margin: 15px 0;
                      font-size:18px;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <p>Dear ${fname},</p>     
                  <p>Thank you for your interest in joining Wosiwosi Partnership. We appreciate your enthusiasm for our unique investment opportunity.</p>
                  <p>Kindly download the attached Wosiwosi Partnership Brochure that provides comprehensive information about the partnership. We encourage you to review it carefully to understand the benefits and opportunities that await you.</p>
                  <p>If you're ready to take the next step and become a partner, please feel free to reach out to us. Our dedicated team is here to assist you. Simply click the "Contact Us Now" button below or reply to this email, and we will be in touch shortly.</p>
                  
                  <br>
                  <a href="tel:01268533102">
                    <button style="background-color: #007519; color: white; padding: 10px 20px; border: none; cursor: pointer;">Contact Us Now</button>
                  </a>
                  <br>
                  


                  <p>We look forward to welcoming you to the Wosiwosi Partnership family and embarking on a mutually rewarding journey.</p>
                  <p>Best regards,<br>Seyi Awobadejo<br>CEO, Wosiwosi Foods UK Limited</p>
              </div>
          </body>
          </html>`
  };
                  // <br>
                  // <a href="https://mywosiwosi.co.uk/wp-content/uploads/2023/11/Patnership-brochure_.pdf">
                  //   <button style="background-color: #007519; color: white; padding: 10px 20px; border: none; cursor: pointer;">Download brochure</button>
                  // </a>
                  // <br>
  transporter.sendMail(mailOptions, (e)=>{
console.log(e)
  });
};

module.exports={
  interestFormResponse:interestFormResponse
}

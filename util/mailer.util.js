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
      // attachments: [
      //   {  
      //       filename: 'brochure.pdf',
      //       path: appRoot + "/file/brochure.pdf" // stream this file
      //   }],
      html: 
          `<!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">
              <title>Thank you for your subscribing to Wosiwosi Strategic Business Partnership</title>
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
                  <p>Thank you for subscribing to join Wosiwosi Strategic Business Partnership. We appreciate your enthusiasm for our unique investment opportunity.</p>
                  <p> A member of our manangement team will contact you to provide more information on the next step to take.</p>
                  <p>We look forward to welcoming you to the Wosiwosi family and embarking on a mutually rewarding journey.</p>
                  <p>Best regards,<br>Seyi Awobadejo<br>CEO, Wosiwosi Foods UK Limited</p>
              </div>
          </body>
          </html>`
  };

  transporter.sendMail(mailOptions);
};

const subscriptionFormResponse = (to, fname, interest, startDate) => {
  const mailOptions = {
      from: '"Wosiwosi Partnership" <info@wosiwosi.co.uk>',
      to: to,
      subject: "Subscription successful",
      // attachments: [
      //   {  
      //       filename: 'brochure.pdf',
      //       path: appRoot + "/file/brochure.pdf" // stream this file
      //   }],
      html: 
          `<!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">
              <title>Subscription Form Submitted</title>
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
                  <p>Thank you for subscribing to Wosiwosi Partnership! We have received your subscription form and are thrilled to welcome you on board.</p>
                  <p>The next step is payment and signing of contract, we will email that to you shortly.</p>                  
                  <h3>Subscription form details:</h3>
                  <p>Selected Lot: ${interest}</p>
                  <p>Start Date: ${startDate}</p>
                  <p>Best regards,<br>Wosiwosi Partnership<br>Wosiwosi Foods UK Limited</p>
              </div>
          </body>
          </html>`
  };

  transporter.sendMail(mailOptions);
};


const adminInterestNotification = (to) => {
  const mailOptions = {
      from: '"Wosiwosi Partnership" <info@wosiwosi.co.uk>',
      to: to,
      subject: "NEW INTEREST SUBMITTED",
      // attachments: [
      //   {  
      //       filename: 'brochure.pdf',
      //       path: appRoot + "/file/brochure.pdf" // stream this file
      //   }],
      html: 
          `<!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">
              <title>New interest submitted</title>
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
                  <p>Dear Admin, a new interest has been submmited</p>     
              </div>
          </body>
          </html>`
  };

  transporter.sendMail(mailOptions);
};


const adminSubscribeNotification = (to) => {
  const mailOptions = {
      from: '"Wosiwosi Partnership" <info@wosiwosi.co.uk>',
      to: to,
      subject: "NEW SUBSCRIPTION SUBMITTED",
      // attachments: [
      //   {  
      //       filename: 'brochure.pdf',
      //       path: appRoot + "/file/brochure.pdf" // stream this file
      //   }],
      html: 
          `<!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">
              <title>New subscription submitted</title>
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
                  <p>Dear Admin, a new subscription has been submmited</p>     
              </div>
          </body>
          </html>`
  };

  transporter.sendMail(mailOptions);
};

module.exports={
  interestFormResponse:interestFormResponse,
  subscriptionFormResponse:subscriptionFormResponse,
  adminInterestNotification:adminInterestNotification,
  adminSubscribeNotification:adminSubscribeNotification
}

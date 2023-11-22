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
                  <p>Thank you for your interest in joining Wosiwosi Partnership. We appreciate your enthusiasm for our unique investment opportunity.</p>
                  <p>Kindly click on the download brochure button to download Wosiwosi Partnership brochure that provides comprehensive information about the partnership. We encourage you to review it carefully to understand the benefits and opportunities that await you.</p>
                  <p>If you're ready to take the next step and become a partner, please feel free to reach out to us. Our dedicated team is here to assist you. Simply click the "Contact Us Now" button below or reply to this email, and we will be in touch shortly.</p>
                  
                  <br>
                  <a href="tel:01268533102">
                    <button style="background-color: #007519; color: white; padding: 10px 20px; border: none; cursor: pointer;">Contact Us Now</button>
                  </a>
                  <br>
                  
                  <br>
                  <a href="https://mywosiwosi.co.uk/wp-content/uploads/2023/11/Patnership.Brochure_ecopy.pdf">
                    <button style="background-color: #007519; color: white; padding: 10px 20px; border: none; cursor: pointer;">Download brochure</button>
                  </a>
                  <br>

                  <p>We look forward to welcoming you to the Wosiwosi Partnership family and embarking on a mutually rewarding journey.</p>
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

const sendSubscriptionForm = (to, fname) => {
    const mailOptions = {
        from: '"Wosiwosi Partnership" <info@wosiwosi.co.uk>',
        to: to,
        subject: "SUBSCRIPTION FORM",
        attachments: [
          {  
              filename: 'wosiwosi_partnership_contract.pdf',
              path: appRoot + "/file/wosiwosi_partnership_contract.pdf" // stream this file
          }],
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
                    <p>Thank you for your interest in Wosiwosi Partnership.</p>
                    <p>To move forward and unlock the full potential of this exciting venture, kindly complete the subscription form by clicking the button below.</p>
                    <br>
                    <a href="https://wosiwosipartner-f80fd9f8b1c9.herokuapp.com/subscribe">
                      <button style="background-color: #007519; color: white; padding: 10px 20px; border: none; cursor: pointer;">Subscription Form</button>
                    </a>
                    <br>
                    <p><strong>Final step after filling the subscription form is payment and signing of contract.<strong></p>
                    <p>I have also attached a draft of the contract for your viewing</p>
                    <p>We look forward to welcoming you as a valued partner in our journey of growth and cultural enrichment.</p>
                    <br>
                    <p>Best regards,<br>Atinuke Awobadejo<br>Co-Founder Wosiwosi Foods UK Limited</p>
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
  adminSubscribeNotification:adminSubscribeNotification,
  sendSubscriptionForm:sendSubscriptionForm
}

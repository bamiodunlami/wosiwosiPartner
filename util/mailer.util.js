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

const interestFormResponse = (to, bcc) => {
  const mailOptions = {
      from: '"Wosiwosi Investment" <info@wosiwosi.co.uk>',
      to: to,
      bcc:bcc,
      subject: "Thank you for your interest in Wosiwosi investment",
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
              <title>Thank you for your interest in wosiwosi investment</title>
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
                  .disclaimer{
                    font-size:11px;
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
                  <p>Thank you for your interest in Wosiwosi investment. We appreciate your enthusiasm for our unique investment opportunity.</p>
                  <p>Kindly click on the "download brochure" button to download Wosiwosi investment brochure that provides comprehensive information about the investment.</p>
                  <p>If you're ready to take the next step, kindly fill the subscription form by clicking the "subscribe now" button below</p>
                  
                  <br>
                  <a href="https://wosiwosipartner-f80fd9f8b1c9.herokuapp.com/subscribe">
                    <button style="background-color: #007519; color: white; padding: 10px 20px; border: none; cursor: pointer;">Subscribe now</button>
                  </a>
                  <br>
                  
                  <br>
                  <a href="https://mywosiwosi.co.uk/wp-content/uploads/2023/11/Patnership.Brochure_ecopy.pdf">
                    <button style="background-color: #007519; color: white; padding: 10px 20px; border: none; cursor: pointer;">Download brochure</button>
                  </a>
                  <br>

                  <p>We look forward to welcoming you to the Wosiwosi invstment family and embarking on a mutually rewarding journey.</p>
                  <p>Best regards,<br>Seyi Awobadejo<br>CEO, Wosiwosi Foods UK Limited</p>

                  <br>
                  <br>
                  <br>
                  <p class="disclaimer">Investment involves risk and can lead to either a gain or loss in capital. You are encouraged to take independent financial advice about this opportunity.</p>
                  <p class="disclaimer">Wosiwosi is not a public listed company so it cannot make a public offering. It may however make an ‘arm’s length’ offering. So, it’s imperative that this opportunity is never confused with a “public offering”</p>
              </div>
          </body>
          </html>`
  };

  transporter.sendMail(mailOptions);
};

const subscriptionFormResponse = (to, bcc, fname, interest, startDate) => {
  const mailOptions = {
      from: '"Wosiwosi Investment" <info@wosiwosi.co.uk>',
      to: to,
      bcc:bcc,
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
                  .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    text-align: left;
                }
                .disclaimer{
                    font-size:11px;
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
                  <p>Thank you for subscribing to Wosiwosi investment! We have received your subscription form and are thrilled to welcome you on board.</p>
                  <p><strong>The next step is payment and signing of contract, we will email that to you shortly</strong>.</p>                  
                  <h3>Subscription form details:</h3>
                  <p>Selected Lot: ${interest}</p>
                  <p>Start Date: ${startDate}</p>
                  <p>Best regards,<br>Wosiwosi Investment <br>Wosiwosi Foods UK Limited</p>
                  <br>
                  <br>
                  <br>
                  <p class="disclaimer">Investment involves risk and can lead to either a gain or loss in capital. You are encouraged to take independent financial advice about this opportunity.</p>
                  <p class="disclaimer">Wosiwosi is not a public listed company so it cannot make a public offering. It may however make an ‘arm’s length’ offering. So, it’s imperative that this opportunity is never confused with a “public offering”:</p>
              </div>
          </body>
          </html>`
  };

  transporter.sendMail(mailOptions);
};


const sendSubscriptionForm = (to, bcc) => {
    const mailOptions = {
        from: '"Wosiwosi Investment" <info@wosiwosi.co.uk>',
        to: to,
        bcc:bcc,
        subject: "SUBSCRIPTION FORM",
        // attachments: [
        //   {  
        //       filename: 'wosiwosi_partnership_contract.pdf',
        //       path: appRoot + "/file/wosiwosi_partnership_contract.pdf" // stream this file
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
                    .disclaimer{
                        font-size:11px;
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
                    <p>Thank you for your interest in Wosiwosi investment.</p>
                    <p>To move forward and unlock the full potential of this exciting offer, kindly complete the subscription form by clicking the button below.</p>
                    <br>
                    <a href="https://wosiwosipartner-f80fd9f8b1c9.herokuapp.com/subscribe">
                      <button style="background-color: #007519; color: white; padding: 10px 20px; border: none; cursor: pointer;">Subscription Form</button>
                    </a>
                    <br>
                    <p><strong>Final step after filling the subscription form is payment and signing of contract.<strong></p>
                    <p>We look forward to welcoming you as a valued investor in our journey of growth and cultural enrichment.</p>
                    <br>
                    <p>Best regards,<br>Atinuke Awobadejo<br>Co-Founder Wosiwosi Foods UK Limited</p>
                    <br>
                    <br>
                    <br>
                    <p class="disclaimer">Investment involves risk and can lead to either a gain or loss in capital. You are encouraged to take independent financial advice about this opportunity.</p>
                    <p class="disclaimer">Wosiwosi is not a public listed company so it cannot make a public offering. It may however make an ‘arm’s length’ offering. So, it’s imperative that this opportunity is never confused with a “public offering”:</p>
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
      subject: "NEW INTEREST",
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
  adminSubscribeNotification:adminSubscribeNotification,
  sendSubscriptionForm:sendSubscriptionForm
}

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
                 
                  <p>If you're ready to take the next step, kindly fill the subscription form by clicking the "subscribe now" button below</p>
                  
                  <br>
                  <a href="https://wosiwosipartner-f80fd9f8b1c9.herokuapp.com/esubscribe">
                    <button style="background-color: #007519; color: white; padding: 10px 20px; border: none; cursor: pointer;">Subscribe now</button>
                  </a>
                  <br>

                  <p>We look forward to welcoming you to the Wosiwosi invstment family and embarking on a mutually rewarding journey.</p>
                  <p>Best regards,<br>Atinuke Awobadejo<br>CEO, Wosiwosi Foods UK Limited</p>
              </div>
          </body>
          </html>`
  };

  transporter.sendMail(mailOptions);
};

const subscriptionFormResponse = (to, bcc, fname, currency, interest, roi, time, startDate) => {
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
                  <p>Amount to invest:${currency}${interest} at ${roi}% ${time}</p>
                  <p>We will email Wosiwosi payment details and investment contract to you within 24 hours. You will only have 3 days to make payment and sign the contract else you will have to start the subscription process again.</p>
                  <p>Best regards,<br>Wosiwosi Investment <br>Wosiwosi Foods UK Limited</p>
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
                    <a href="https://wosiwosipartner-f80fd9f8b1c9.herokuapp.com/esubscribe">
                      <button style="background-color: #007519; color: white; padding: 10px 20px; border: none; cursor: pointer;">Subscription Form</button>
                    </a>
                    <br>
                    <p><strong>Final step after filling the subscription form is payment and signing of contract.<strong></p>
                    <p>We look forward to welcoming you as a valued investor in our journey of growth and cultural enrichment.</p>
                    <br>
                    <p>Best regards,<br>Atinuke Awobadejo<br>Co-Founder Wosiwosi Foods UK Limited</p>
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

const paymentConfirmation = (to, bcc, fname, currency, amount) => {
    const mailOptions = {
        from: '"Wosiwosi Investment" <info@wosiwosi.co.uk>',
        to: to,
        bcc:bcc,
        subject: "PAYMENT CONFIRMATION",
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
                <title>Your investment payment confirmation</title>
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
                    <p> Dear ${fname},</p>
                    <p>We're pleased to confirm the successful receipt of your investment payment of ${currency}${amount}</p>
                    <p>Thank you for your prompt and secure transaction, and here is what you should expect in the next few days</p>
                    <p>-Loan note certificate: an e-copy of the loan note certificate will be sent to your email and the physical copy of the certificate will also be forwarded to the address submitted to us.</p>
                    <p>-Investor Online Portal: you can monitor your investment (ROI, maturity date e.t.c) through our online portal. We will send your access details in 5 working days.</p>
                    <p>Welcome to Wosiwosi Investment! we're thrilled to have you on board and look forward to a successful and rewarding investment.</p>
                    <p>If you have any questions, feel free to reach out.</p>
                    <p>Best regards,<br>Wosiwosi Investment Team<br>Wosiwosi Foods UK Limited</p>
                </div>
            </body>
            </html>`
    };
  
    transporter.sendMail(mailOptions);
  };
  
const ceoWelcoming = (to, bcc, fname) => {
const mailOptions = {
    from: '"Wosiwosi Investment" <info@wosiwosi.co.uk>',
    to: to,
    bcc:bcc,
    subject: "WELCOME ONBOARD",
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
                <p> Dear ${fname},</p>
                <p>Warm greetings!</p>
                <p>On behalf of the entire Wosiwosi Investment team, I am thrilled to extend a heartfelt welcome as you officially join our community of forward-thinking individuals. Your recent investment payment is a testament to your belief in the exciting journey we're embarking on together.</p>
                <p>At Wosiwosi Investment, we are committed to fostering a thriving environment for our investors, and your support is instrumental in propelling us towards new heights. Rest assured, your investment is in capable hands, and we are dedicated to maximizing it's potential for both cultural enrichment and financial growth.</p>
                <p>Feel free to reach out if you have any questions or if there's anything specific you'd like to discuss. We look forward to a fruitful and rewarding investment.</p>
                <p>Thank you for choosing Wosiwosi Investment. Let's create a future filled with opportunities together!</p>
                <p>Best regards,<br>Seyi Awobadejo<br>CEO, Wosiwosi Foods UK Limited</p>
            </div>
        </body>
        </html>`
};

transporter.sendMail(mailOptions);
};

const accessRevoke = (to) => {
    const mailOptions = {
        from: '"Wosiwosi Investment" <info@wosiwosi.co.uk>',
        to: to,
        subject: "ACCESS REVOKED",
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
                <title>Your access to Wosiwosi Investment has been revoked</title>
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
                    <p> Hi there,</p>
                    <p>We are sorry to inform you that we have now revoked your access to the Wosiwosi Investment Platform.</p>
                    <p>This happened because we have not received any response from you concerning your interest in the investment.</p>
                    <p>If you would like to learn more or proceed with your investment, you will need to call us:</p>
                    <h3><a href="tel:+447946099030">Call us now</h3>
                    <p>Best regards,<br>Wosiwosi Investment Team<br>Wosiwosi Foods UK Limited</p>
                </div>
            </body>
            </html>`
    };
    
    transporter.sendMail(mailOptions);
};

const mailPortalDetails= (to, bcc, investor, email, pass) => {
    const mailOptions = {
        from: '"Wosiwosi Investment" <info@wosiwosi.co.uk>',
        to: to,
        bcc:bcc,
        subject: "YOUR LOGIN DETAILS",
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
                <title>PAss Email</title>
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
                    <p> Dear ${investor},</p>
                    <p>Welcome onboard once again.</p>
                    <p>You online protal is ready to be viewed and below is the login details:</p>
                    <p>Email: ${email}</p>
                    <p>Password: ${pass}</p>
                    <p>Best regards,<br>Seyi Awobadejo<br>CEO, Wosiwosi Foods UK Limited</p>
                </div>
            </body>
            </html>`
    };
    
    transporter.sendMail(mailOptions);
};

const passwordChange = (to, bcc, fname) => {
    const mailOptions = {
        from: '"Wosiwosi Investment" <info@wosiwosi.co.uk>',
        to: to,
        bcc:bcc,
        subject: "PASSWORD CHANGED",
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
                    <p> Dear ${fname},</p>
                    <p>Your password has been successfully changed.</p>
                    <p>If this is not you, kindly contact us now.</p>
                    <p>Regards,<br>Wosiwosi Investment Team<br>Wosiwosi Foods UK Limited</p>
                </div>
            </body>
            </html>`
    };
    
    transporter.sendMail(mailOptions);
};

const investorDocumentUpdate = (to, bcc) => {
    const mailOptions = {
        from: '"Wosiwosi Investment" <info@wosiwosi.co.uk>',
        to: to,
        bcc:bcc,
        subject: "DOCUMENT UPDATE",
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
                    <p> Dear Investor</p>
                    <p>A document has been added to your Investment Portal.</p>
                    <p>Kindly login to your Investment Portal <a href="https://wosiwosipartner-f80fd9f8b1c9.herokuapp.com/login" target="_blank">here</a> to view the document(s).</p>
                    <p>Regards,<br>Wosiwosi Investment Team<br>Wosiwosi Foods UK Limited</p>
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
  sendSubscriptionForm:sendSubscriptionForm,
  paymentConfirmation:paymentConfirmation,
  ceoWelcoming:ceoWelcoming,
  accessRevoke:accessRevoke,
  mailPortalDetails:mailPortalDetails,
  passwordChange:passwordChange,
  investorDocumentUpdate:investorDocumentUpdate,
}

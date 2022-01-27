const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SG_KEY);


exports.sendEmail = (email, subject, text) => {
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: subject,
        text: text
    }

    sgMail.send(mailOptions, function(err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log("message sent")
            console.log('email sent: ', info.response)
        }
    })
    
}
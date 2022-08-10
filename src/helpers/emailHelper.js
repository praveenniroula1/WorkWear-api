import nodemailer from "nodemailer";

// email configuration and send email

// email template

const emailProcessor = async (emailBody) => {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP,
      port: process.env.EMAIL_PORT,

      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail(emailBody);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};

export const verificationEmail = (emailData) => {
  const emailBody = {
    from: '"Praveen Store👻" <myemail@praveenstore.com>', // sender address
    to: emailData.email, // list of receivers
    subject: "Email Verification", // Subject line
    text: `hi ${emailData.fName}, please verify your email: ${emailData.url}`, // plain text body
    html: `<p>hi ${emailData.fName}</p>
            <br/>
            <a style="color: red"  href="${emailData.URL}">CLICK TO VERIFY</a>
            `, // html body
  };
  emailProcessor(emailBody);
};

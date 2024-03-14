const NodeMailer = require("nodemailer");
const Responses = require("./ResponseService");
const mailerTemplate = (notificationData) => {
  return `<!DOCTYPE html>
<html>
<head>
</head>
<body>
    <div style="width:800px; margin:0 auto; text-align: center; background: #9F3CE8">
        <i>
            <h2 style="color: white; padding: 2%;">
                Study Sphere
            </h2>
        </i>
    </div>
    <hr style="max-width:800px; margin:0 auto;">
    <div style="max-width:800px; margin:0 auto; min-height: 500px; background: #FFFFFF">
        <h1 style="padding-left: 20px; padding-top: 20px;">
            ${notificationData.header}
        </h1>
        <p style="padding-left: 20px;">
            ${notificationData.body}
        </p>
    </div>
    <hr style="max-width:800px; margin:0 auto;">
    <div style="width:800px; margin:0 auto; text-align: center; background: #9F3CE8">
        <i>
            <h2 style="color: white; padding: 2%;">
                &copy; Study Sphere Account Creation Services
            </h2>
        </i>
    </div>
</body>
</html>`;
};

// to: ['abcxyz@gmail.com',......]
// mailingDetails:{
// "subject":"whatever bullshit you are up to",
// "header": "Any text you want",
// "body": "Any text body you want",
// }
const getMailDetails = (mailingData) => {
  try {
    return {
      from: "softwareengineeringbatch@gmail.com",
      to: mailingData.to[0],
      subject: mailingData.subject,
      html: mailerTemplate(mailingData.mailingDetails),
    };
  } catch (err) {
    console.log(err.toString());
  }
};
const sendMail = async (mailDetails) => {
  try {
    let mailTransporter = NodeMailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASSWORD,
      },
    });
    let status = await mailTransporter.sendMail(getMailDetails(mailDetails));
    if (status) {
      return Responses.Success("Otp sent successfully!!");
    } else {
      return Responses.Error("Error sending OTP!!");
    }
  } catch (err) {
    console.log(err.toString());
    return Responses.Error("Some unknown error occurred!");
  }
};

module.exports = {
  sendMail,
};

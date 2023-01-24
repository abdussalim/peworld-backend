const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URI,
  GMAIL_REFRESH_TOKEN,
  EMAIL_USER,
} = require("../env");

// oauth2 config
const oAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });

const sendEmail = async (dataEmail) => {
  try {
    // config nodemailer
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: EMAIL_USER,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GMAIL_REFRESH_TOKEN,
        accessToken,
      },
    });

    // send email
    transporter
      .sendMail(dataEmail)
      .then((info) => {
        console.log("Email sended successfully.");
        console.log(info);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;

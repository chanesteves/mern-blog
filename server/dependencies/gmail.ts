// TODO: Organize configs
import IMessenger from "../interfaces/IMessenger";
import { OAuth2Client } from "google-auth-library";

const nodemailer = require("nodemailer");

const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";
const CLIENT_ID = process.env.MAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.MAIL_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.MAIL_REFRESH_TOKEN;
const SENDER_MAIL = process.env.SENDER_EMAIL_ADDRESS;

export class GMail implements IMessenger {
  constructor() {}

  public async send(to: string, subject: string, content: string) {
    const oAuth2Client = new OAuth2Client(
      CLIENT_ID,
      CLIENT_SECRET,
      OAUTH_PLAYGROUND
    );

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    try {
      const access_token = await oAuth2Client.getAccessToken();
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: SENDER_MAIL,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          access_token,
        },
      });
      const mailOptions = {
        from: SENDER_MAIL,
        to,
        subject,
        html: content,
      };
      const result = await transport.sendMail(mailOptions);

      return result;
    } catch (err) {
      throw err;
    }
  }
}

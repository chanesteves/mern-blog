import IMessenger from "../interfaces/IMessenger";
import { OAuth2Client } from "google-auth-library";
import getConfig from "../config";

const nodemailer = require("nodemailer");

export class GMail implements IMessenger {
  constructor() {}

  public async send(to: string, subject: string, content: string) {
    const config = getConfig();

    const oAuth2Client = new OAuth2Client(
      config.server.services.gmail.client_id,
      config.server.services.gmail.client_secret,
      config.server.services.gmail.oauth_playground
    );

    oAuth2Client.setCredentials({
      refresh_token: config.server.services.gmail.refresh_token,
    });

    try {
      const access_token = await oAuth2Client.getAccessToken();
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: config.server.services.gmail.sender,
          clientId: config.server.services.gmail.client_id,
          clientSecret: config.server.services.gmail.client_secret,
          refreshToken: config.server.services.gmail.refresh_token,
          access_token,
        },
      });
      const mailOptions = {
        from: config.server.services.gmail.sender,
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

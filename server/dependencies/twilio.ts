// TODO: Organize configs
import IMessenger from "../interfaces/IMessenger";
import { Twilio as _Twilio } from "twilio";

const ACCOUNT_SID = `${process.env.TWILIO_ACCOUNT_SID}`;
const AUTH_TOKEN = `${process.env.TWILIO_AUTH_TOKEN}`;
const SENDER = `${process.env.TWILIO_PHONE_NUMBER}`;

const client = new _Twilio(ACCOUNT_SID, AUTH_TOKEN);

export class Twilio implements IMessenger {
  constructor() {}

  public async send(to: string, subject: string, content: string) {
    try {
      const result = await client.messages.create({
        body: content,
        from: SENDER,
        to,
      });
      return result;
    } catch (err) {
      throw err;
    }
  }
}

// TODO: Organize configs
import IMessenger from "../interfaces/IMessenger";
import { Twilio as _Twilio } from "twilio";
import getConfig from "../config";

export class Twilio implements IMessenger {
  constructor() {}

  public async send(to: string, subject: string, content: string) {
    const config = getConfig();

    const client = new _Twilio(
      config.server.services.twilio.account_sid,
      config.server.services.twilio.auth_token
    );

    try {
      const result = await client.messages.create({
        body: content,
        from: config.server.services.twilio.phone_number,
        to,
      });
      return result;
    } catch (err) {
      throw err;
    }
  }
}

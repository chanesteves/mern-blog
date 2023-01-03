import IMessenger from "../interfaces/IMessenger";

export class MessagingService {
  constructor(private messenger: IMessenger) {}

  public async send(to: string, subject: string, content: string) {
    return this.messenger.send(to, subject, content);
  }
}

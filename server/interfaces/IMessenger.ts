export default interface IMessenger {
  send(to: string, subject: string, content: string): any;
}

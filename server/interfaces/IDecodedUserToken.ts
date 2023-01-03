export default interface IDecodedUserToken {
  name: string;
  username: string;
  password: string;
  iat: number;
  exp: number;
}

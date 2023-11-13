export default interface UserInfo {
  phoneNumber?: string;
  name: string;
  email: string;
  userName: string;
  subscribeWith?: {
    title: string;
    _id: string;
  }[];
  isVerify: boolean;
  token?: string;
  isAuthenticated: boolean;
  _id?: string;
  proPicPath?: string;
}

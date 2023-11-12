export default interface UserInfo {
  phoneNumber?: string;
  name: string;
  email: string;
  userName: string;
  subscripeWith?: [];
  isVerify: boolean;
  token?: string;
  isAuthenticated: boolean;
  _id?: string;
}

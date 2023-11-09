export default interface UserInfo {
  name: string;
  email: string;
  userName: string;
  subscripeWith?: [];
  isVerify: boolean;
  token?: string;
  isAuthenticated: boolean;
}

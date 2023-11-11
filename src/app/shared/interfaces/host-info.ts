import UserInfo from './user-info';

export default interface HostDetails {
  admins: UserInfo[];
  createdAt: string;
  description: string;
  name: string;
  _id: string;
  events: [];
  owner: UserInfo;
}

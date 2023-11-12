import EventInfo from './event-info';
import PlaceInfo from './place-info';
import UserInfo from './user-info';

export default interface HostDetails {
  admins: UserInfo[];
  createdAt: string;
  description: string;
  name: string;
  _id: string;
  events: EventInfo[];
  owner: UserInfo;
  place: PlaceInfo;
}

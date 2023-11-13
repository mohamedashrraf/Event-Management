import PlaceInfo from './place-info';
import UserInfo from './user-info';

export default interface EventInfo {
  tegory: string;
  createdAt: string;
  dateTime: string;
  description: string;
  host: string;
  place: PlaceInfo;
  posterPath: string;
  subscribers: UserInfo[];
  ticketCount: number;
  title: string;
  updatedAt: string;
  _id: string;
  proPicPath?: string;
  createdBy: string;
}

import PlaceInfo from './place-info';

export default interface EventInfo {
  tegory: string;
  createdAt: string;
  dateTime: string;
  description: string;
  host: string;
  place: PlaceInfo;
  posterPath: string;
  subscribers: [];
  ticketCount: number;
  title: string;
  updatedAt: string;
  _id: string;
  proPicPath?: string;
  createdBy: string;
}

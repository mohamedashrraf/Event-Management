export interface User {
    email: string;
    isAuthenticated: boolean;
    name: string;
    token: string;
    userName: string;
    subscribeWith: SubscribeWith[];
    _id: string

}
export interface SubscribeWith { title: string, _id: string };
export interface MessageCreated {
    createdAt: string;
    message: string;
    name: string;
    updatedAt: string;
    _id: string;
}
export interface NotificationNewMessage {
    _id: string;
    NotifiNum:number;
}
export interface User {
    email: string;
    isAuthenticated: boolean;
    name: string;
    token: string;
    userName: string;
    subscribeWith: SubscribeWith[];
    _id: string;
    isVIP?: boolean;

}
export interface SubscribeWith { title: string, _id: string };
export interface MessageCreated {
    createdAt?: Date;
    message: string;
    name: string;
    updatedAt?: Date;
    _id: string;
}
export interface NotificationNewMessage {
    _id: string;
    NotifiNum:number
}

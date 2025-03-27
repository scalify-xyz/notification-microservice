export interface NotificationModel {
    id?: string;
    userId: string;
    message: string;
    provider: "email";
    createdAt?: Date;
}

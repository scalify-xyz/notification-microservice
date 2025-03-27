export interface NotificationModel {
    id?: string;
    userId: string;
    message: string;
    type: string;
    createdAt?: Date;
}

import { NotificationModel } from "@infrastructure/models/notification.model";

export class NotificationEntity {
    id: string;
    userId: string;
    message: string;
    type: string;
    createdAt: Date;

    constructor(notification: NotificationModel) {
        this.id = notification.id!;
        this.userId = notification.userId;
        this.message = notification.message;
        this.type = notification.type;
        this.createdAt = notification.createdAt || new Date();
    }
}

import { NotificationModel } from "@scalify/shared-microservice";

export class NotificationEntity {
    id: string;
    userId: string;
    message: string;
    provider: string;
    createdAt: Date;

    constructor(notification: NotificationModel) {
        this.id = notification.id!;
        this.userId = notification.userId;
        this.message = notification.message;
        this.provider = notification.provider;
        this.createdAt = notification.createdAt || new Date();
    }
}

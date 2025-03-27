import { NotificationModel } from "@infrastructure/models/notification.model";

export class NotificationRepository {
  async save(data: NotificationModel) {
    console.log("Saving Data In Database (Mock)", { data });
    return data;
  }
}
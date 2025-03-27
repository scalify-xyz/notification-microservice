import { NotificationModel } from "@infrastructure/models/notification.model";

export class NotificationRepository {
  private constructor() { }

  static create() {
    return new NotificationRepository();
  }

  async execute(data: NotificationModel) {
    console.log("Saving Data In Database (Mock)", { data });
    return data;
  }
}
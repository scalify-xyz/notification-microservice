import { NotificationEntity } from "@domain/entities/notification.entity";

import { EmailNotificationService } from "@application/services/email-notification.service";

import { NotificationModel } from "@infrastructure/models/notification.model";
import { NotificationRepository } from "@infrastructure/repositories/notification.repository";


export class SendNotificationUseCase {
  private notificationRepository = new NotificationRepository();
  private emailNotificationService = new EmailNotificationService();

  async execute(data: NotificationModel): Promise<NotificationEntity> {

    await this.emailNotificationService.send(data.userId, data.message);
    
    const notification = await this.notificationRepository.save(data);
    return new NotificationEntity(notification);
  }
}

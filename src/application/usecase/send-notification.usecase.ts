import { NotificationModel } from "@scalify/shared-microservice";

import { NotificationEntity } from "@domain/entities/notification.entity";

import { EmailNotificationService } from "@application/services/email-notification.service";

import { NotificationRepository } from "@infrastructure/repositories/notification.repository";


export class SendNotificationUseCase {
  private emailNotificationService = new EmailNotificationService();

  private constructor(private readonly notificationRepository: NotificationRepository) {}
  
  static create(notificationRepository: NotificationRepository) {
    return new SendNotificationUseCase(notificationRepository);
  }

  async execute(data: NotificationModel): Promise<NotificationEntity> {
    await this.emailNotificationService.execute(data.userId, data.message);
    
    const notification = await this.notificationRepository.execute(data);
    return new NotificationEntity(notification);
  }
}

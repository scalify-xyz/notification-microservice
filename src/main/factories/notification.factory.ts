import { RabbitMQProvider } from "@scalify/shared-microservice";

import { SendNotificationUseCase } from "@application/usecase/send-notification.usecase";

import { NotificationConsumer } from "@infrastructure/consumers/notification.consumer";
import { NotificationRepository } from "@infrastructure/repositories/notification.repository";

export class NotificationFactory {
    private constructor() { }

    static async create() {
        return NotificationConsumer.create(
            SendNotificationUseCase.create(
                NotificationRepository.create(),
            ),
            await RabbitMQProvider.create(process.env.RABBITMQ_URL),
        );
    }
}
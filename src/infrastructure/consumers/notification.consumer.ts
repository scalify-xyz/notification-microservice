
import { RabbitMQProvider } from "@scalify/shared-microservice";

import { SendNotificationUseCase } from "@application/usecase/send-notification.usecase";

export class NotificationConsumer {
  private queue = "notifications";

  private constructor(
    private readonly sendNotificationUseCase: SendNotificationUseCase,
    private readonly rabbitMqProvider: RabbitMQProvider,
  ) { }

  static create(
    sendNotificationUseCase: SendNotificationUseCase,
    rabbitMqProvider: RabbitMQProvider,
  ) {
    const notificationConsumer = new NotificationConsumer(
      sendNotificationUseCase,
      rabbitMqProvider,
    );
    notificationConsumer.execute();
    return notificationConsumer;
  }

  private async execute() {
    await this.rabbitMqProvider.consume(this.queue, async (message) => {
      try {
        console.log("[DEBUG]", message);
        await this.sendNotificationUseCase.execute(message);
      } catch (error) {
        console.error("Erro ao processar mensagem:", error);
      }
    });
  }
}

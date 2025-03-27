
import { RabbitMQProvider } from "@scalify/shared-microservice";

import { SendNotificationUseCase } from "@application/usecase/send-notification.usecase";



export class NotificationConsumer {
  private sendNotificationUseCase = new SendNotificationUseCase();
  private queue = "notifications";

  private constructor(private rabbitMqProvider: RabbitMQProvider) {}

  static create(rabbitMqProvider: RabbitMQProvider) {
    return new NotificationConsumer(rabbitMqProvider);
  }
 
  async start() {
    await this.rabbitMqProvider.consume(this.queue, async (message) => {
      try {
        const typedMessage = message as { status: string };
        console.log("[DEBUG]", typedMessage);
        // await this.sendNotificationUseCase.execute(typedMessage);
      } catch (error) {
        console.error("Erro ao processar mensagem:", error);
      }
    });
  }
}

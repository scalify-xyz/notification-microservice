
import { SendNotificationUseCase } from "@application/usecase/send-notification.usecase";

import { RabbitMQProvider } from "@infrastructure/providers/rabbitmq.provider";
// import { RabbitMQProvider } from "@scalify/shared-microservice";


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
        // const data = JSON.parse(message.toString());
        // await this.sendNotificationUseCase.execute(data);
      } catch (error) {
        console.error("Erro ao processar mensagem:", error);
      }
    });
  }
}

import { AWSSecretsManager, RabbitMQProvider } from "@scalify/shared-microservice";

import { NotificationConsumer } from "@infrastructure/consumers/notification.consumer";

async function start(): Promise<void> {
  await AWSSecretsManager.create({
    region: "sa-east-1",
    secretsMap: {
      // "SMTP_PROVIDER_HOST": "smtp_provider_host/production/scalableecommerce",
      // "SMTP_PROVIDER_PORT": "smtp_provider_port/production/scalableecommerce",
      // "SMTP_PROVIDER_USER": "smtp_provider_user/production/scalableecommerce",
      // "SMTP_PROVIDER_PASSWORD": "smtp_provider_password/production/scalableecommerce",
      "RABBITMQ_URL": "rabbitmq/production/scalableecommerce",
      "JWT_SECRET": "jwt/production/scalableecommerce",
    },
  });

  try {
    const rabbitMQProvider = await RabbitMQProvider.create(process.env.RABBITMQ_URL);
    const consumer = NotificationConsumer.create(rabbitMQProvider);
    consumer.start();

    console.log("Notification service running!");
  } catch (error) {
    console.error("Fatal error starting service:", error);
    process.exit(1);
  }
}

start();

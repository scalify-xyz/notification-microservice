
import { AmpqProvider } from "@infra/providers/ampq.provider";
import { JsonWebTokenProvider } from "@infra/providers/jsonwebtoken.provider";
import { EmailProvider } from "@infra/providers/node-mailer.provider";

import { EventMap } from "@main/events/map.event";

import { RABBITMQ_USER_CREATED_QUEUE_NAME } from "@shared/constants/rabbit-mq.constants";
import AWSSecretsManager from "@shared/utils/aws-secrets-manager";


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

  const emailProvider = EmailProvider.create();
  const jwtProvider = JsonWebTokenProvider.create();
  
  const eventMap = EventMap.create(emailProvider, jwtProvider);

  const listener = AmpqProvider.create(eventMap, process.env.RABBITMQ_URL); 

  await listener.connect(RABBITMQ_USER_CREATED_QUEUE_NAME);

  console.log("Listening for events...");
}

start();

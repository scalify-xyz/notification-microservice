import "dotenv/config";

import { EventMap } from "@application/events/map.event";

import { AmpqProvider } from "@infra/providers/ampq.provider";
import { EmailProvider } from "@infra/providers/node-mailer.provider";

import { RABBITMQ_USER_CREATED_QUEUE_NAME } from "@shared/constants/rabbit-mq.constants";
import SecretsManager from "@shared/utils/secrets-manager";


async function start(): Promise<void> {
  await SecretsManager.create();

  const emailProvider = EmailProvider.create();
  const eventMap = EventMap.create(emailProvider);

  const listener = AmpqProvider.create(eventMap, process.env.RABBITMQ_URL); 

  await listener.connect(RABBITMQ_USER_CREATED_QUEUE_NAME);

  console.log("Listening for events...");
}

start();

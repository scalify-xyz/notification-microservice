import "dotenv/config";

import { RabbitMQListener } from "@infra/listeners/rabbitmq.listener";
import { EmailProvider } from "@infra/providers/node-mailer.provider";

import { RABBITMQ_USER_CREATED_QUEUE_NAME } from "@shared/constants/rabbit-mq.constants";

import { EventMap } from "./application/events/map.event";

async function start(): Promise<void> {
  const emailProvider = EmailProvider.create();
  const eventMap = EventMap.create(emailProvider);

  const listener = RabbitMQListener.create(eventMap, process.env.RABBITMQ_URL); 


  await listener.connect(RABBITMQ_USER_CREATED_QUEUE_NAME);

  console.log("Listening for events...");
}

start();

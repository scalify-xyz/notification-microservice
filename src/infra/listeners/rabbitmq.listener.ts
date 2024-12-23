import amqp, { Channel, Message, Connection } from "amqplib";

import { EventMap } from "src/application/events/map.event";

import { UserCreatedEvent } from "@domain/events/user-created.event";


export class RabbitMQListener {
  private channel: Channel;
  private connection: Connection;

  constructor(
    private readonly eventMap: EventMap,
    private readonly uri: string,
  ) { }

  public static create(eventMap: EventMap, uri: string) {
    return new RabbitMQListener(eventMap, uri);
  }

  public async connect(queue: string): Promise<void> {
    this.connection = await amqp.connect(this.uri, { heartbeat: 10 });
    this.connection.on("error", (err) => console.error("RabbitMQ connection error:", err));
    this.connection.on("close", () => console.warn("RabbitMQ connection closed!"));
    this.channel = await this.connection.createChannel();

    this.channel.assertQueue(queue, { durable: true });
    this.listen(queue);
    console.log("RabbitMQ Connected!");
  }

  public listen(queue: string): void {
    this.channel.consume(queue, (msg: Message | null) => {
      if (msg) {
        const event = JSON.parse(msg.content.toString()) as UserCreatedEvent;

        const useCase = this.eventMap.getUseCase(msg.fields.routingKey);

        if (useCase) {
          useCase.execute(event).catch((err) => {
            console.error("Error handling event:", err);
          });
        }

        this.channel.ack(msg);
      }
    });
  }
}


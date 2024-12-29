import { Channel, Message, Connection, connect } from "amqplib";

import { UserCreatedEvent } from "@domain/events/user-created.event";

import { EventMap } from "@application/events/map.event";

import { IRabbitMQProvider } from "@infra/interfaces/providers/rabbitmq.interface.provider";

export class AmpqProvider implements IRabbitMQProvider {
  private channel: Channel;
  private connection: Connection;

  constructor(
    private readonly eventMap: EventMap,
    private readonly uri: string,
  ) { }

  public static create(eventMap: EventMap, uri: string) {
    return new AmpqProvider(eventMap, uri);
  }

  public async connect(queue: string): Promise<void> {
    try {
      this.connection = await connect(this.uri, { heartbeat: 10 });
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(queue, { durable: true });
      this.listen(queue);
      console.log("RabbitMQ Connected!");
    } catch (error) {
      console.error("RabbitMQ connection Failed", error);
    }
  }

  public listen(queue: string): void {
    this.channel.consume(queue, (msg: Message | null) => {
      if (msg && msg.content && msg.fields.routingKey) {
        try {
          const event: UserCreatedEvent = JSON.parse(msg.content.toString());
          const useCase = this.eventMap.getUseCase(msg.fields.routingKey);
          useCase?.execute(event).catch((err) => {
            console.error("Error handling event:", err);
          });
          this.channel.ack(msg);
        } catch (error) {
          console.error("Error processing message:", error);
          if (msg) this.channel.nack(msg);
        }
      }
    });
  }
}

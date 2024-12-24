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
    this.connection = await connect(this.uri, { heartbeat: 10 });
    this.connection.on("error", (err) => console.error("RabbitMQ connection error:", err));
    this.connection.on("close", () => console.warn("RabbitMQ connection closed!"));
    this.channel = await this.connection.createChannel();

    this.channel.assertQueue(queue, { durable: true });
    this.listen(queue);
    console.log("RabbitMQ Connected!");
  }

  public listen(queue: string): void {
    this.channel.consume(queue, (msg: Message | null) => {
      if (msg && msg.content && msg.fields.routingKey) {
        const event: UserCreatedEvent = JSON.parse(msg.content.toString());

        const useCase = this.eventMap.getUseCase(msg.fields.routingKey);

        useCase?.execute(event).catch((err) => {
          console.error("Error handling event:", err);
        });
        this.channel.ack(msg);
      }
    });
  }
}


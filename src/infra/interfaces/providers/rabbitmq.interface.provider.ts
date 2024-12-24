export type IRabbitMQProvider = {
    connect(queue: string): Promise<void>;
    listen(queue: string): void;
  }
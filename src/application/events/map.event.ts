import { ISendEmailProvider } from "@infra/interfaces/providers/send-email.interface.provider";

import { RABBITMQ_USER_CREATED_QUEUE_NAME } from "@shared/constants/rabbit-mq.constants";

import { UseCase } from "../interfaces/usecase.interface";
import { SendEmailNotificationUsecase } from "../usecases/send-email-confirmation/send-email-confirmation.usecase";



export class EventMap {
  private handlers: Map<string, UseCase<unknown, unknown>> = new Map();

  constructor(
    private readonly emailProvider: ISendEmailProvider,
  ) {
    this.register(emailProvider);
  }

  public static create(emailProvider: ISendEmailProvider) {
    return new EventMap(emailProvider);
  }


  private register(emailProvider: ISendEmailProvider): void {
    this.handlers.set(RABBITMQ_USER_CREATED_QUEUE_NAME, SendEmailNotificationUsecase.create(emailProvider));
  }

  public getUseCase(eventName: string): UseCase<unknown, unknown> | undefined {
    return this.handlers.get(eventName);
  }
}
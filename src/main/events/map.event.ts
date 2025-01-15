import { UseCase } from "@application/interfaces/usecase.interface";
import { SendEmailNotificationUsecase } from "@application/usecases/send-email-confirmation/send-email-confirmation.usecase";

import { IJsonWebTokenProvider } from "@infra/interfaces/providers/jsonwebtoken.interface.provider";
import { ISendEmailProvider } from "@infra/interfaces/providers/send-email.interface.provider";

import { RABBITMQ_USER_CREATED_QUEUE_NAME } from "@shared/constants/rabbit-mq.constants";


export class EventMap {
  private handlers: Map<string, UseCase<unknown, unknown>> = new Map();

  public static create(emailProvider: ISendEmailProvider, jwtProvider: IJsonWebTokenProvider): EventMap {
    const eventMap = new EventMap();
    eventMap.register(emailProvider, jwtProvider);
    return eventMap;
  }

  private register(emailProvider: ISendEmailProvider, jwtProvider: IJsonWebTokenProvider): void {
    this.handlers.set(RABBITMQ_USER_CREATED_QUEUE_NAME, SendEmailNotificationUsecase.create(emailProvider, jwtProvider));
  }

  public getUseCase(eventName: string): UseCase<unknown, unknown> | undefined {
    return this.handlers.get(eventName);
  }
}
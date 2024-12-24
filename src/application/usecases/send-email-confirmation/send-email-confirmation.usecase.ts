import { UserCreatedEvent } from "@domain/events/user-created.event";

import { UseCase } from "@application/interfaces/usecase.interface";


import { ISendEmailProvider } from "@infra/interfaces/providers/send-email.interface.provider";



export class SendEmailNotificationUsecase implements UseCase<unknown, unknown> {
    private constructor(
        private readonly emailProvider: ISendEmailProvider,
    ) { }

    public static create(emailProvider: ISendEmailProvider) {
        return new SendEmailNotificationUsecase(emailProvider);
    }

    public async execute({ id, name, email }: UserCreatedEvent): Promise<void> {
        const subject = "Confirm your email";
        const body = `Hello ${email}, thanks for signing up!`;
        await this.emailProvider.sendEmail(email, subject, body);
    }
}
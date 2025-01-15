import { UserCreatedEvent } from "@domain/events/user-created.event";

import { UseCase } from "@application/interfaces/usecase.interface";


import { IJsonWebTokenProvider } from "@infra/interfaces/providers/jsonwebtoken.interface.provider";
import { ISendEmailProvider } from "@infra/interfaces/providers/send-email.interface.provider";



export class SendEmailNotificationUsecase implements UseCase<unknown, unknown> {
    private constructor(
        private readonly emailProvider: ISendEmailProvider,
        private readonly jwtProvider: IJsonWebTokenProvider,
    ) { }

    public static create(emailProvider: ISendEmailProvider, jwtProvider: IJsonWebTokenProvider) {
        return new SendEmailNotificationUsecase(emailProvider, jwtProvider);
    }

    public async execute({ id, name, email }: UserCreatedEvent): Promise<void> {
        const subject = "Confirm your email";
        const token = this.jwtProvider.sign({ id, email }, process.env.JWT_SECRET);
        const body = `Hello ${name}, thanks for signing up! <a href="testeurl.com/auth/confirm-signup">confirm your email</a>`;

        await this.emailProvider.sendEmail(email, subject, body);
    }
}
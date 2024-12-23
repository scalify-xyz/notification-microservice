import { ISendEmailProvider } from "@infra/interfaces/providers/send-email.interface.provider";


export class EmailProvider implements ISendEmailProvider {
    public static create() {
        return new EmailProvider();
    }

    async sendEmail(to: string, subject: string, body: string): Promise<void> {
        console.log(`Sending email to: ${to}, Subject: ${subject}`);
    }
}
import nodemailer from "nodemailer";

import { ISendEmailProvider } from "@infra/interfaces/providers/send-email.interface.provider";


export class EmailProvider implements ISendEmailProvider {
    public static create() {
        return new EmailProvider();
    }

    async sendEmail(to: string, subject: string, body: string): Promise<void> {
        const from = process.env.SMTP_PROVIDER_USER;

        const transporter = await nodemailer.createTransport({
            host: process.env.SMTP_PROVIDER_HOST,
            port: process.env.SMTP_PROVIDER_PORT,
            secure: true,
            auth: {
                user: from,
                pass: process.env.SMTP_PROVIDER_PASSWORD,
            },
        });


       await transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            text: body,
            html: body,
        }, (err, info) => {
            if (!err) {
                console.log("[MESSAGE ID]", info.messageId);
                console.log("[ENVELOPE]", info.envelope);
                return;
            }
            throw new Error(err);
        });


    }
}
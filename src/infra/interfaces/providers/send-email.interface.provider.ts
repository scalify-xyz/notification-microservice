export type ISendEmailProvider = {
    sendEmail(to: string, subject: string, body: string): Promise<void>;
}
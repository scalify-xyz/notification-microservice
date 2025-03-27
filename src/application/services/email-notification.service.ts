export class EmailNotificationService {
  async send(userId: string, message: string): Promise<void> {
    console.log(`Enviando e-mail para usuário ${userId}: ${message}`);
  }
}
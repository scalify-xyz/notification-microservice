export class EmailNotificationService {
  async execute(userId: string, message: string): Promise<void> {
    console.log(`Enviando e-mail para usuário ${userId}: ${message}`);
  }
}
export type IMessageListener = {
    startListening(): Promise<void>;
    stopListening(): Promise<void>;
    consumeMessage(): void;
}
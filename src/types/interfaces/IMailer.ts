export interface IMailer {
    send: (target: string, message: string) => Promise<void>
}
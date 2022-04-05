export interface ExchangeOptionsConfigContract {
    durable: boolean,
    autoDelete: boolean,
    internal: boolean,
    alternateExchange?: string,
    args?: string[],
}
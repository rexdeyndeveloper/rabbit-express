import {ExchangeConfig} from "./Configs";
import {ExchangeConfigContract, ExchangeOptionsConfigContract} from "./Contracts/Configs";
import {ExchangeContract, QueueContract} from "./Contracts";
import {ExchangeException} from "./Exceptions/Exchange.exception";
import {Connection} from "amqplib";

export class Exchange implements ExchangeContract {
    constructor(config: ExchangeConfig) {
        this.config = config;
    }

    private _config: ExchangeConfig

    protected get config(): ExchangeConfig {
        return this._config;
    }

    protected set config(value: ExchangeConfig) {
        this._config = value;
    }

    private _queues: QueueContract[] = [];

    protected get queues(): QueueContract[] {
        return this._queues;
    }

    useQueue(queue: QueueContract): void {
        this.queues.push(queue);
    }

    public getParam(key: string): string | ExchangeOptionsConfigContract {
        const config = this.config.getConfig();
        if (typeof key !== 'string') throw new ExchangeException('key must be a string', 'Exchange.getParam');
        if (!(key in config)) {
            throw new ExchangeException('key not found in config', 'Exchange.getParam');
        }
        return this.config.getConfig()[key];
    }

    public getAllConfig(): ExchangeConfigContract {
        return this.config.getConfig();
    }

    /**
     * TODO: вернуться позже к обработке ошибок, много проблем связанно с этим.
     * */
    public async listen(conn: Connection) {
        const channel = await conn.createChannel();
        const config = this.getAllConfig();
        channel.on('error', this.errorHandler);
        try {
            await channel.assertExchange(config.name, config.type, config.options);
            for (const queue of this.queues) {
                queue.bindExchange(this);
                await queue.listen(conn);
            }
        } catch (error) {
            throw new ExchangeException(
                `Cannot create exchange - ${config.name}, maybe he registered with another params`,
                'Exchange.listen',
                error);
        }
    }

    protected errorHandler(error) {
        console.log('hase error!');
    }
}
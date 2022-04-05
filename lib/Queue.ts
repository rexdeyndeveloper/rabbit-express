import {ExchangeContract, QueueContract} from "./Contracts";
import {QueueConfigContract} from "./Contracts/Configs";
import {Channel, Connection, ConsumeMessage} from "amqplib";
import RequestModel from "../../../../Models/DTO/Request.model";
import {Router} from "./Router";

export class Queue implements QueueContract {
    constructor(config: QueueConfigContract) {
        this.config = config;
    }

    private _channel: Channel;

    protected get channel(): Channel {
        return this._channel;
    }

    protected set channel(value: Channel) {
        this._channel = value;
    }

    private _exchange: ExchangeContract;

    protected get exchange(): ExchangeContract {
        return this._exchange;
    }

    protected set exchange(value: ExchangeContract) {
        this._exchange = value;
    }

    private _config: QueueConfigContract

    protected get config(): QueueConfigContract {
        return this._config;
    }

    protected set config(value: QueueConfigContract) {
        this._config = value;
    }

    private _router:Router;

    protected get router():Router {
        return this._router;
    }

    protected set router(value:Router) {
        this._router = value;
    }

    public bindExchange(exchange: ExchangeContract) {
        this.exchange = exchange;
    }

    async listen(conn: Connection) {
        this.channel = await conn.createChannel();
        const channel = this.channel;
        const config = this.config;
        const exchange = this.exchange;
        await channel.assertQueue(config.name, config.assertOptions);
        await channel.prefetch(config.prefetch);
        await channel.bindQueue(config.name, exchange.getParam('name'), config.routerKey);
        await channel.consume(config.name, (msg) => this.handler(msg));
    }

    async handler(message: ConsumeMessage) {
        try {
            const content = message.content.toString();
            const payload: RequestModel = JSON.parse(content);
            const router = this.router;
            console.log(payload);
            if (!payload.event || !payload.message) {
                console.log('payload not implements type RequestModel');
                return;
            }
            const response = await router.handle(payload)
            console.log(response);
        } catch (error) {
            console.log('message is not valid!', error);
        }
        this.channel.ack(message);
    }

    public setRouter(router) {
        this.router = router;
    }

}
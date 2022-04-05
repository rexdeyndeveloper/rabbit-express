import {ApiContract, AppContract, ExchangeContract, MiddlewareContract} from "./Contracts";
import {ConnectConfig, SocketOptionsConfig} from "./Configs";
import {ConnectionException} from "./Exceptions";
import {connect, Connection} from "amqplib";

export class App implements AppContract {
    constructor(connectConfig: ConnectConfig, socketOptions: SocketOptionsConfig) {
        this.connectConfig = connectConfig;
        this.socketOptions = socketOptions;
    }

    private _exchanges: ExchangeContract[] = [];

    protected get exchanges(): ExchangeContract[] {
        return this._exchanges;
    }

    private _connection: Connection;

    protected get connection(): Connection {
        return this._connection;
    };

    protected set connection(value: Connection) {
        this._connection = value;
    };

    private _connectConfig: ConnectConfig;

    protected get connectConfig(): ConnectConfig {
        return this._connectConfig;
    };

    protected set connectConfig(value: ConnectConfig) {
        this._connectConfig = value;
    };

    private _socketOptions: SocketOptionsConfig;

    protected get socketOptions(): SocketOptionsConfig {
        return this._socketOptions;
    };

    protected set socketOptions(value: SocketOptionsConfig) {
        this._socketOptions = value;
    };

    /**
     * @throws ConnectionException*/
    async listen(): Promise<void> {
        await this.establishedConnection();
        try {
            await this.registerExchanges();
        } catch (error) {
            await this.connection.close();
            throw error;
        }
    };

    useApi(api: ApiContract): void {
    };

    useExchange(exchange: ExchangeContract): void {
        this.exchanges.push(exchange);
    };

    useMiddleware(middleware: MiddlewareContract): void {
    };

    /**
     * @throws ConnectionException
     * */
    protected async establishedConnection() {
        try {
            this.connection = await connect(this.connectConfig.getUrl(), this.socketOptions.getConfig());
        } catch (error) {
            throw new ConnectionException('Error connecting to amqp server', 'App.connect', error);
        }
    };

    protected async registerExchanges() {
        for (const exchange of this.exchanges) {
            await exchange.listen(this.connection);
        }
    }
}
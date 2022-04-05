import {ConfigException} from "../Exceptions";
import {ProtocolType} from "../Types";

export class ConnectConfig {
    constructor(username: string,
                password: string,
                host: string,
                port: number | string = 15672,
                virtualHost = '/',
                protocol: ProtocolType = 'amqp') {
        if (typeof username !== 'string') throw new ConfigException('username must be a string');
        if (typeof password !== 'string') throw new ConfigException('password must be a string');
        if (typeof host !== 'string') throw new ConfigException('host must be a string');
        if (typeof port !== 'number' && typeof port !== 'string') throw new ConfigException('port must be a number or string');
        if (typeof virtualHost !== 'string') throw new ConfigException('virtualHost must be a string');
        if (protocol !== "amqp" && protocol !== 'amqps') throw new ConfigException('protocol must be a amqp | amqps');
        this.username = username;
        this.password = password;
        this.host = host;
        this.port = port;
        this.virtualHost = virtualHost;
        this.protocol = protocol;
    }

    private _protocol: ProtocolType;

    protected get protocol(): ProtocolType {
        return this._protocol;
    }

    protected set protocol(value: ProtocolType) {
        this._protocol = value;
    }

    private _username: string;

    protected get username(): string {
        return this._username;
    }

    protected set username(value: string) {
        this._username = value;
    }

    private _password: string;

    protected get password(): string {
        return this._password;
    }

    protected set password(value: string) {
        this._password = value;
    }

    private _host: string;

    protected get host(): string {
        return this._host;
    }

    protected set host(value: string) {
        this._host = value;
    }

    private _port: number | string;

    protected get port(): number | string {
        return this._port;
    }

    protected set port(value: number | string) {
        this._port = value;
    }

    private _virtualHost: string;

    protected get virtualHost(): string {
        return this._virtualHost;
    }

    protected set virtualHost(value: string) {
        this._virtualHost = value;
    }

    public getUrl(): string {
        const user = this.username;
        const pass = this.password;
        const host = this.host;
        const port = this.port;
        const virtualHost = this.virtualHost;
        const protocol = this.protocol;
        return `${protocol}://${user}:${pass}@${host}:${port}${virtualHost}`;
    }
}
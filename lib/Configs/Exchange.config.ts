import {ExchangeType} from "../Types";
import {ConfigException} from "../Exceptions";
import {ExchangeConfigContract} from "../Contracts/Configs";

export class ExchangeConfig {
    constructor(name: string,
                type: ExchangeType,
                durable: boolean = true,
                autoDelete: boolean = false,
                internal: boolean = false,
                alternateExchange?: string,
                args?: string[]) {
        if (typeof name !== 'string') throw new ConfigException('name must be a string');
        if (typeof durable !== 'boolean') throw new ConfigException('durable must be a boolean');
        if (typeof autoDelete !== 'boolean') throw new ConfigException('autoDelete must be a boolean');
        if (typeof internal !== 'boolean') throw new ConfigException('internal must be a boolean');
        if (typeof alternateExchange !== 'string' && !!alternateExchange) throw new ConfigException('alternateExchange must be a string or not identifier');
        if (type !== "topic" && type !== 'fanout' && type !== 'headers' && type !== 'match' && type !== 'direct') throw new ConfigException('type must be a topic | fanout | headers | direct | match');
        this.checkArgs(args);
        this.name = name;
        this.durable = durable;
        this.autoDelete = autoDelete;
        this.internal = internal;
        this.arguments = args;
        this.type = type;
        this.alternateExchange = alternateExchange;
    }

    private _name: string;

    protected get name(): string {
        return this._name;
    };

    protected set name(value: string) {
        this._name = value;
    };

    private _alternateExchange: string;

    protected get alternateExchange(): string {
        return this._alternateExchange;
    };

    protected set alternateExchange(value: string) {
        this._alternateExchange = value;
    };

    private _type: ExchangeType;

    protected get type(): ExchangeType {
        return this._type;
    };

    protected set type(value: ExchangeType) {
        this._type = value;
    };

    private _durable: boolean;

    protected get durable(): boolean {
        return this._durable;
    };

    protected set durable(value: boolean) {
        this._durable = value;
    };

    private _autoDelete: boolean;

    protected get autoDelete(): boolean {
        return this._autoDelete;
    };

    protected set autoDelete(value: boolean) {
        this._autoDelete = value;
    };

    private _internal: boolean;

    protected get internal(): boolean {
        return this._internal;
    };

    protected set internal(value: boolean) {
        this._internal = value;
    };

    private _arguments: string[] | null;

    protected get arguments(): string[] | null {
        return this._arguments;
    };

    protected set arguments(value: string[] | null) {
        this._arguments = value;
    };

    public getConfig(): ExchangeConfigContract {
        return {
            name: this.name,
            type: this.type,
            options: {
                durable: this.durable,
                autoDelete: this.autoDelete,
                internal: this.internal,
                alternateExchange: this.alternateExchange,
                args: this.arguments
            },
        }
    }

    protected checkArgs(args: string[] | null) {
        args = args ?? null;
        if (args !== null && !Array.isArray(args)) {
            throw new ConfigException('Expected args is array with strings or null');
        }
        if (!args) {
            return true;
        }
        if (Array.isArray(args)) {
            args.forEach(arg => {
                if (typeof arg !== 'string') {
                    throw new ConfigException('Expected args items is strings');
                }
                return true;
            });
        }
    };
}

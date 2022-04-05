import {ConfigException} from "../Exceptions";
import {ClientConfigContract} from "../Contracts/Configs";

export class ClientOptionsConfig {
    constructor(name: string = '') {
        if (typeof name !== 'string') throw new ConfigException('name must be a string');
        this.connection_name = name;
    }

    private _connection_name: string;

    protected get connection_name(): string {
        return this._connection_name;
    }

    protected set connection_name(value: string) {
        this._connection_name = value;
    }

    public getConfig(): ClientConfigContract {
        return {
            connection_name: this.connection_name,
        }
    }
}
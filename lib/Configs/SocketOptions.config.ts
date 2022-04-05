import {ClientOptionsConfig} from "./ClientOptions.config";
import {ConfigException} from "../Exceptions";
import {SocketConfigContract} from "../Contracts/Configs";

export class SocketOptionsConfig {
    constructor(clientOptions: ClientOptionsConfig) {
        if (!(clientOptions instanceof ClientOptionsConfig)) throw new ConfigException('clientOptions not an instance of ClientOptionsConfig');
        this.clientOptions = clientOptions;
    }

    private _clientOptions: ClientOptionsConfig;

    protected get clientOptions(): ClientOptionsConfig {
        return this._clientOptions;
    }

    protected set clientOptions(value: ClientOptionsConfig) {
        this._clientOptions = value;
    }

    public getConfig(): SocketConfigContract {
        return {
            clientProperties: this.clientOptions.getConfig(),
        }
    }
}
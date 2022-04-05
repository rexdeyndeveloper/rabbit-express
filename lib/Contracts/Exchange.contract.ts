import {ListenContract, QueueContract} from "./index";
import {ExchangeConfigContract} from "./Configs";

export interface ExchangeContract extends ListenContract {
    /**
     * @method useQueue
     * @description Регистрирует очередь
     * @return void
     * */
    useQueue(queue: QueueContract): void;

    getParam(key: string);

    getAllConfig(): ExchangeConfigContract;
}
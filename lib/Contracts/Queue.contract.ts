import {ExchangeContract, ListenContract} from "./";

export interface QueueContract extends ListenContract {
    bindExchange(exchange:ExchangeContract);
}
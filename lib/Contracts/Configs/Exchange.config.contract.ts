import {ExchangeType} from "../../Types";
import {ExchangeOptionsConfigContract} from "./ExchangeOptions.config.contract";

export interface ExchangeConfigContract {
    name: string;
    type: ExchangeType,
    options: ExchangeOptionsConfigContract
}
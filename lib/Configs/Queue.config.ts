import {QueueConfigContract} from "../Contracts/Configs";
import {Options} from "amqplib";

export class QueueConfig implements QueueConfigContract {
    assertOptions: Options.AssertQueue;
    name: string;
    prefetch: number;
    routerKey: string;
}
import {Options} from "amqplib";

export interface QueueConfigContract {
    name: string;
    prefetch: number;
    assertOptions: Options.AssertQueue;
    routerKey: string;
}
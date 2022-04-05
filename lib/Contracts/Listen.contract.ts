import {Connection} from "amqplib";

export interface ListenContract{
    listen(conn:Connection);
}
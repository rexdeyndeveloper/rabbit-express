/**
 * Интерфейс самого App
 * Сущность App - это приложение с конектами к серверу RabbitMQ и его виртуальному хосту
 * Одно App - Один сервер и виртуальный хост.
 *
 * Работает по принципу агрегации
 * Внутри идёт информация по Exchanges, наименованию конекта и созданию каналов.
 * Работает в рамках одного конекта и только.
 *
 * */
import {ApiContract, ExchangeContract, MiddlewareContract} from "./index";

export interface AppContract {
    /**
     * @method Listen
     * @description Запускает инстанс сервера.
     * @description Выполняет подключение к серверу.
     * @description Запускает механизмы инициализации exchanges.
     * @return void
     * */
    listen(): void;

    /**
     * @method useMiddleware
     * @description Регистритрует middleware
     * @return void
     * */
    useMiddleware(middleware: MiddlewareContract): void;

    /**
     * @method useExchange
     * @description Регистрирует exchange
     * @return void
     * */
    useExchange(exchange: ExchangeContract): void;

    /**
     * @method useApi
     * @description Регистрирует api с обработчиками
     * @return void
     * */
    useApi(api: ApiContract): void;
}
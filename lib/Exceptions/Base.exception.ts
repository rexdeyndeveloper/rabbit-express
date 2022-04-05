import {ExceptionContract} from "../Contracts";

export abstract class BaseException extends Error implements ExceptionContract {
    message: string;
    name: string;
    error: Error;

    constructor(message: string, name?: string, error?: Error) {
        super();
        this.message = message;
        this.name = name;
        this.error = error;
    }
}
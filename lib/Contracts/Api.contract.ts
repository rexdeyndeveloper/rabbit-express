export interface ApiContract {
    /**
     * @method use
     * @description Регистрирует обработчик
     * */
    use(name: string, handler: Function): void;
}
import RequestModel from "../../../../Models/DTO/Request.model";

export class Router {
    private routes = [];

//    Принимает наименование маршрута, а так же обработчик
    public use(path: string, handler: Function, middleware?) {
        this.routes.push({path, handler});
    }

    public async handle(request: RequestModel) {
        const executor = this.routes.find(route => route.path === request.event);
        if (!executor) {
            throw new Error('not find route to this event!');
        }
        return executor.handler(request);
    }
}
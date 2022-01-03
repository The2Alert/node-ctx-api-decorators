import {IService} from "ctx-api";

export type ServiceDecorator = (target: IService) => any;

export function Service(): ServiceDecorator {
    return (target) => (target.serviceId = Service.generateId(), undefined);
}

export namespace Service {
    export let lastId: number = 0;

    export function generateId(): number {
        return ++lastId;
    }
}
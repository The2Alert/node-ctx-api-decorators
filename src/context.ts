import {IContext, IService} from "ctx-api";

export interface ContextOptions {
    children?: IContext[];
    services?: IService[];
}

export type ContextDecorator = (target: IContext) => any;

export function Context(childrenOrOptions?: IContext[] | ContextOptions): ContextDecorator {
    const children: IContext[] | undefined = childrenOrOptions instanceof Array ? childrenOrOptions : childrenOrOptions?.children;
    const services: IService[] | undefined = childrenOrOptions instanceof Array ? undefined : childrenOrOptions?.services;
    return (target) => {
        target.contextId ??= Context.generateId();
        target.contextChildren ??= children ?? [];
        target.contextServices ??= services;
    };
}

export namespace Context {
    export let lastId: number = 0;

    export function generateId(): number {
        return ++lastId;
    }
}
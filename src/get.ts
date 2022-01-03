import "reflect-metadata";
import {IContext, IService} from "ctx-api";

export type Getter<T extends IContext | IService = IContext | IService> = (this: InstanceType<T>) => any;

export type GetDecorator<T extends IContext | IService = IContext | IService> = (target: InstanceType<T>, propertyKey: string) => any;

export function Get<T extends IContext | IService = IContext | IService>(getter: Getter<T>): GetDecorator<T> {
    return (target, propertyKey) => {
        target.__getters__ ??= {};
        target.__getters__[propertyKey] = getter as any;
    };
}
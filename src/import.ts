import {IContext, IService} from "ctx-api";
import {Get, GetDecorator} from "./get";

export function Import(getter?: () => IContext): GetDecorator {
    return (target, propertyKey) => {
        if(getter === undefined) {
            const contextClass: IContext = Reflect.getMetadata("design:type", target, propertyKey);
            getter = () => contextClass;
        }
        return Get(function() {
            if(getter !== undefined)
                return this.getContext(getter());
        })(target, propertyKey);
    };
}

export function ImportParent(): GetDecorator<IContext> {
    return Get(function() {
        return this.getParentContext();
    });
}

export function ImportService(getter?: () => IService): GetDecorator {
    return (target, propertyKey) => {
        if(getter === undefined) {
            const serviceClass: IService = Reflect.getMetadata("design:type", target, propertyKey);
            getter = () => serviceClass;
        }
        return Get(function() {
            if(getter !== undefined)
                return this.getService(getter());
        })(target, propertyKey);
    };
}

export function ImportServiceContext(): GetDecorator<IService> {
    return Get(function() {
        return this.getServiceContext();
    });
}
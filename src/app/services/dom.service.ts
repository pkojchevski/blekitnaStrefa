import { Injectable, ApplicationRef, Injector, EmbeddedViewRef, ComponentFactoryResolver } from '@angular/core';


@Injectable()
export class DomService {

    private childComponentRef: any;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) {

    }


    public appendComponentTo(parentId: string, child: any, childConfig?: ChildConfig) {
        // Create a component reference from the component
        const childComponentRef = this.componentFactoryResolver
            .resolveComponentFactory(child)
            .create(this.injector);

        // Attach the config to the child (inputs and outputs)
        this.attachConfig(childConfig, childComponentRef);

        this.childComponentRef = childComponentRef;

        // attach component to the AppRef so that is inside the ng component tree
        this.appRef.attachView(childComponentRef.hostView);

        // Get DOM element from component
        const childDomElem = (childComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

        // Append DOM element to the body
        document.getElementById(parentId).appendChild(childDomElem);
    }

    public removeComponent() {
        this.appRef.detachView(this.childComponentRef.hostView);
        this.childComponentRef.destroy();
    }


    attachConfig(config, componentRef) {
        const inputs = config.input;
        const outputs = config.output;

        // tslint:disable-next-line:forin
        for (const key in inputs) {
            componentRef.instance[key] = inputs[key]
                ;
        }
        // tslint:disable-next-line:forin
        for (const key in outputs) {
            componentRef.instance[key] = inputs[key]
                ;
        }



    }

}

// tslint:disable-next-line:class-name
interface ChildConfig {
    inputs: object;
    outputs: object;
}

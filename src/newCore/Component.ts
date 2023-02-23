import { updateElement } from "./updateElement";
import { adjustChildComponents } from "./adjustChildComponent";
import { observable } from "./observer";

interface StateType {
    [key: string]: any;
}

interface EventListenerParams {
    eventName: string; 
    func: (this: Element, ev: Event) => any; 
    options?: boolean | AddEventListenerOptions;
}

export default class Component<S extends StateType = StateType, P extends StateType = StateType> {
    private props: P;
    public state: ReturnType<this['data']>;
    public childComponents: {[key: string]: Component};
    private isMounted = false;
    private reqAnimationId = 0;
    private eventListenerList: EventListenerParams[] = [];


    constructor(public target: HTMLElement, private getProps?: P){
        this.updateProps();
        this.initState(this.data());
        
        this.render();
        this.setEvent();
    }

    template(){
        return '';
    }

    data(): StateType { return {} ; }

    updateProps(){
        this.props = this.getProps || {} as P;
    }

    initState(newState: StateType){
        this.state = observable(newState) as any; 
    }

    setState(newPartialState: Partial<ReturnType<this['data']>>) {
        for (const [key, value] of Object.entries(newPartialState)) {
            if (this.state.hasOwnProperty(key)) {
                this.state[key as keyof typeof newPartialState] = value;
            } else {
                console.warn(`Component warning: Setting state which does not exist ('${key}') in '${this.constructor.name}'`);
            }
        }
    }

    render() {
        const { target } = this;
        const newNode = target.cloneNode(true) as Element;
        newNode.innerHTML = this.template();

        let childComponentData: {[key: string]: string} = {};
        const oldChildNodes = [...target.childNodes] as Element[];
        const newChildNodes = [...newNode.childNodes] as Element[];
        const maxLength = Math.max(oldChildNodes.length, newChildNodes.length);
        for (let i = 0; i < maxLength; i++) {
            console.log( newChildNodes[i]);
            childComponentData = { ...childComponentData, ...updateElement(target, newChildNodes[i], oldChildNodes[i]) };
        }

        adjustChildComponents(this, childComponentData);
    }

    generateChildComponent(target: HTMLElement, name: string, key: string): Component | undefined { return undefined };

    setEvent(){

    }

    update(newTarget: HTMLElement): void {
        if (newTarget && newTarget !== this.target) {
          this.target = newTarget;
          this.setEvent();
        }
    
        if (!this.isMounted) {
          this.render();
        } else {
          cancelAnimationFrame(this.reqAnimationId);
          this.reqAnimationId = requestAnimationFrame(this.render.bind(this));
        }
    }

    addEvent(eventName: string, selector: string, func: (this: Element, ev: Event) => any, options?: boolean | AddEventListenerOptions) {
        this.target.querySelector(selector).removeEventListener(eventName, func, options);
        this.eventListenerList.push({eventName, func, options})
    }

    removeAllEventListener(){
        for(let i = 0; i < this.eventListenerList.length; i++){
            const {eventName, func, options} = this.eventListenerList.pop();
            this.target.removeEventListener(eventName, func, options);
        }
    }

    lifeCycle(): void {
        this.isMounted && this.beforeUpdate && this.beforeUpdate();
        this.isMounted && this.updateProps();
        this.render();
        this.isMounted && this.updated && this.updated();
    
        if (!this.isMounted) {
          setTimeout(() => {
            this.setEvent();
            this.isMounted = true;
            this.mounted && this.mounted();
          }, 0);
        }
    }

    destroyComponent(): void {
        const childComponents = Object.values(this.childComponents);
        for (let childComponent of childComponents) {
          childComponent.destroyComponent();
        }
        this.beforeDestroy && this.beforeDestroy();
        this.removeAllEventListener();
      }

    beforeUpdate(){ } // beforeUpdate
    updated(){ } // updated
    mounted(){ } // mounted
    beforeDestroy() { } // beforeDestroy
}  
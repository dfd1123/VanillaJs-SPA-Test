import { updateElement } from "./updateElement";
import { adjustChildComponents } from "./adjustChildComponent";
import { observable } from "./observer";

interface StateType {
    [key: string]: any;
}

type TTT<T extends () => StateType> = ReturnType<T>

export default class Component<S extends StateType = StateType, P extends StateType = StateType> {
    private props: P;
    public state: TTT<this['data']>;
    public childComponents: {[key: string]: Component};
    private isMounted = false;
    private reqAnimationId = 0;


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

    setState(newPartialState: Partial<TTT<this['data']>>) {
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
    
    addEvent(eventName: string, selector: string, func: (this: Element, ev: Event) => any, options?: boolean | AddEventListenerOptions) {
        this.target.querySelector(selector).removeEventListener(eventName, func, options);
        this.target.querySelector(selector).addEventListener(eventName, func, options);
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
}  
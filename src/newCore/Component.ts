import { updateElement } from "./updateElement";
import { adjustChildComponents } from "./adjustChildComponent";
import { observable, observe } from "./observer";

interface StateType {
    [key: string]: any;
}

interface EventListenerParams {
    target: HTMLElement;
    eventName: string; 
    func: (this: Element, ev: Event) => any; 
}

let uid = 1;

export default class Component<S extends StateType = StateType, P extends StateType = StateType> {
    public _uid;
    public props: P;
    public state: ReturnType<this['data']>;
    public childComponents: {[key: string]: Component};
    private isMounted = false;
    private reqAnimationId = 0;
    private eventListenerList: EventListenerParams[] = [];


    constructor(public target: HTMLElement, private getProps?: P){
        this._uid = uid++;
        this.updateProps();
        this.initState(this.data());

        observe(this.update.bind(this));
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

    setState(newPartialState: ReturnType<this['data']>) {
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
        //   this.setEvent();
        }
    
        if (!this.isMounted) {
          this.lifeCycle();
        } else {
          cancelAnimationFrame(this.reqAnimationId);
          this.reqAnimationId = requestAnimationFrame(this.render.bind(this));
        }
    }

    addEvent(eventName: string, selector: string, func: (e: Event) => any) {
        const listener = (e: Event) => {
            if ((e.target as HTMLElement).closest(selector)) func(e);
          };
          this.target.removeEventListener(eventName, listener);
          this.target.addEventListener(eventName, listener);
        this.eventListenerList.push({target: this.target, eventName, func});
    }

    removeAllEventListener(){
        for(let i = 0; i < this.eventListenerList.length; i++){
            const {target, eventName, func} = this.eventListenerList[i];
            target.removeEventListener(eventName, func);
            this.target.removeEventListener(eventName, func);
        }

        this.eventListenerList = [];
    }

    lifeCycle(): void {
        this.isMounted && this.beforeUpdate && this.beforeUpdate();
        this.isMounted && this.updateProps();
        this.render();
        this.isMounted && this.updated && this.updated();

        if (!this.isMounted) {
            console.log(this.isMounted);
          setTimeout(() => {
            this.setEvent();
            this.isMounted = true;
            this.mounted && this.mounted();
          }, 0);
        }
    }

    destroyComponent(): void {
        const childComponents = Object.values(this.childComponents);
        console.log('dd', childComponents);
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
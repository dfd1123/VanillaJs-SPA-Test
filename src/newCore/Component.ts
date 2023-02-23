import { observable } from "./observer";

interface StateType {
    [key: string]: any;
}

type TTT<T extends StateType> = ReturnType<T>

export default class Component<S extends StateType = StateType, P extends StateType = StateType> {
    private props: P;
    public state: ReturnType<this['data']>;


    constructor(public target: HTMLElement, private getProps?: () => P){
        this.updateProps();
        this.initState(this.data());
        

    }

    template(){
        return '';
    }

    data() { return {} ; }

    updateProps(){
        this.props = this.getProps ? this.getProps() : {} as P;
    }

    initState(newState: StateType){
        this.state = observable(newState) as any; 
    }

    setState(newPartialState: Partial<ReturnType<this['data']>>) {
        for (const [key, value] of Object.entries(newPartialState)) {
            if (this.state.hasOwnProperty(key)) {
                this.state[key] = value;
            } else {
                console.warn(`Component warning: Setting state which does not exist ('${key}') in '${this.constructor.name}'`);
            }
        }
    }

}  
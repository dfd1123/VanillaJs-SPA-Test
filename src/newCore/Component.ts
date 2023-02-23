import { observable } from "./observer";

interface StateType {
    [key: string]: any;
}

type TTT<T extends () => StateType> = ReturnType<T>

export default class Component<S extends StateType = StateType, P extends StateType = StateType> {
    private props: P;
    public state: TTT<this['data']>;


    constructor(public target: HTMLElement, private getProps?: () => P){
        this.updateProps();
        this.initState(this.data());
        
        this.render();
    }

    template(){
        return '';
    }

    data(): StateType { return {} ; }

    updateProps(){
        this.props = this.getProps ? this.getProps() : {} as P;
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
        this.target.innerHTML = this.template();
      }
    

}  
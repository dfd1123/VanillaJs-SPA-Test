import Component from "../../newCore/Component";
import TestListItem from "../components/TestListItem";

export default class TestHome extends Component {
    data(){
        return {
            list: [1,2,3,4,5,6,7]
        }
    }

    template(){
        return `
            ${this.state.list.map(item => `<div key="${item}" TestListItem>${item}</div>`).join('')}
        `
    }

    generateChildComponent(target: HTMLElement, name: string) {
        if(name === 'TestListItem'){
            return new TestListItem(target, {
                list: this.state.list,
            })
        }
    }
}
import Component from "../../newCore/Component";

export default class TestHome extends Component {
    data(){
        return {
            list: [1,2,3,4,5,6,7]
        }
    }

    template(){
        return `
            ${this.state.list.map(item => item)}<div></div>
        `
    }
}
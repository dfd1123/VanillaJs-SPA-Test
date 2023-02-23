import Component from "../../newCore/Component";

export default class TestListItem extends Component {
    data(){
        return {
            number: 1,
        }
    }

    template(){
        return `
            <div>
                <span>${this.state.number}</span>
                <span>
                    <button>-</button>
                    <button>+</button>
                </span>
            </div>
        `
    }
}
import "./style.scss";
import {store} from "@/store";
import Component from "@/core/Component";
import Loading from ".";

export default class AllLoading extends Component {
    componentDidMount() {
        this.addComponent(Loading);
    }

    template(){
        return `
            ${store.state.loading ? '<div Loading></div>' : ''}
        `;
    }
}
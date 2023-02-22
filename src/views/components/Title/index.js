import './style.scss';
import Component from "@/core/Component";

export default class Title extends Component{
    templete(){
        return `${this.$props.text}`
    }
}
import './style.scss';
import Component from "@/newCore/Component";

export default class Title extends Component{
    template(){
        console.log(this, 'awdawd');
        return `${this.props.text}`
    }
}
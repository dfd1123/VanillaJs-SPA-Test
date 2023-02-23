import "./style.scss";
import Component from "@/newCore/Component";

export default class LabelItem extends Component {
    template(){
        const {label = 'label', value = ""} = this.props.info;
        
        return `
            <span class="label">${label} :</span>
            <span class="value">${value}</span>
        `;
    }
}
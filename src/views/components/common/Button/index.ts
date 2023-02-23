import "./style.scss";
import Component from "@/newCore/Component";

export default class Button extends Component {
    template(){
        const {type = 'button', text = ''} = this.props;
        return `
            <button type="${type}">${text}</button>
        `;
    }

    setEvent(){
        const {onClick} = this.props;

        this.addEvent('click', 'button', (e) => {
            console.log('TlqkftoRl');
            onClick && onClick(e);
        })
    }
}
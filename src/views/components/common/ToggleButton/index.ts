import './style.scss';
import Component from "@/newCore/Component";

export default class ToggleButton extends Component {
    template(){
        const {label, name, value} = this.props;
        
        return `
            ${Boolean(label) && `<span class="label">${label}</span>`}
            <input type="checkbox" id="toggle-button-${name}" />
            <label for="toggle-button-${name}" class="switch">
                <span class="on-off" />
            </label>
        `;
    }

    setEvent(){
        const {onChange} = this.props;

        this.addEvent('change', 'input', (e) => {
            console.log('Tlqkf4', this.props.label, this);
            onChange && onChange(e);
        })
    }
}
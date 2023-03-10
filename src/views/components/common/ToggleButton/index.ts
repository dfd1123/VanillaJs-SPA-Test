import './style.scss';
import Component from '@/core/Component';

export default class ToggleButton extends Component {
  data() {
    return {
      checked: Boolean(this.$props.value),
    };
  }

  template() {
    const { label } = this.$props;

    return `
            ${Boolean(label) && `<span class="label">${label}</span>`}
            <input type="checkbox" id="toggle-button-${this.uid}" ${
      this.$state.checked && 'checked'
    } />
            <label for="toggle-button-${this.uid}" class="switch">
                <span class="on-off" />
            </label>
        `;
  }

  setEvent() {
    const { onChange } = this.$props;

    this.addEvent('change', 'input', (e) => {
      onChange && onChange(e);
    });
  }
}

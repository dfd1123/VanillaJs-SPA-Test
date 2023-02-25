import './style.scss';
import Component from '@/core/Component';

export default class TextInput extends Component {
  data() {
    return {
      text: this.$props.value,
    };
  }

  template() {
    const { type = 'text', placeholder = '' } = this.$props;
    return `
            <input type="${type}" placeholder="${placeholder}" />
        `;
  }

  setEvent() {
    const { onInput, onChange, onEnter } = this.$props;

    this.addEvent('input', 'input', (e: KeyboardEvent) => {
      onInput && onInput(e);
    });

    this.addEvent('change', 'input', (e: KeyboardEvent) => {
      onChange && onChange(e);
    });

    this.addEvent('keydown', 'input', (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        onEnter && onEnter(e);
      }
    });
  }
}

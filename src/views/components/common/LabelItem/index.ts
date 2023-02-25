import './style.scss';
import Component from '@/core/Component';

export default class LabelItem extends Component {
  template() {
    const { label = 'label', value = '' } = this.$props;

    return `
            <span class="label">${label} :</span>
            <span class="value">${value}</span>
        `;
  }
}

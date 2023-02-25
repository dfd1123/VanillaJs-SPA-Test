import './style.scss';
import Component from '@/core/Component';

export default class Title extends Component {
  template() {
    return `${this.$props.text}`;
  }
}

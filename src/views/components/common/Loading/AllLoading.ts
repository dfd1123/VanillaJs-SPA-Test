import './style.scss';
import { store } from '@/store';
import Component from '@/core/Component';
import Loading from '.';

export default class AllLoading extends Component {
  create() {
    this.useStore(store, 'loading');
  }

  componentDidMount() {
    this.addComponent(Loading);
  }

  template() {
    return `
            ${
              this.$store.state.loading
                ? '<div data-component="Loading"></div>'
                : ''
            }
        `;
  }
}

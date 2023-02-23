import { store } from '@/store';
import Component from './core/Component';
import Loading from '@components/common/Loading';
import { RouterView } from './router';

export default class App extends Component {
  componentDidMount(){
    this.addComponent(Loading);
    this.addComponent(RouterView);
  }

  template() {
    return`
        ${store(this).state.loading ? `<div Loading id="all-loading" dd="${store(this).state.loading}"></div>` : ''}
        <div RouterView></div>
    `
  }
}
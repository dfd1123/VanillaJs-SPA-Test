import { store } from '@/store';
import Component from './core/Component';
import AllLoading from '@components/common/Loading/AllLoading';
import { RouterView } from './router';

export default class App extends Component {
  componentDidMount(){
    this.addComponent(AllLoading);
    this.addComponent(RouterView);
  }

  template() {
    return`
        <div AllLoading></div>
        <div RouterView></div>
    `
  }
}
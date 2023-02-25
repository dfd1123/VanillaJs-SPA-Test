import Component from './core/Component';
import AllLoading from '@components/common/Loading/AllLoading';
import { RouterView } from '@/core/Router';

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
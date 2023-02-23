import Component from './core/Component';
import { RouterView } from './router';

export default class App extends Component {
  componentDidMount(){
    this.addComponent(RouterView);
  }

  template() {
    return`
        <div RouterView></div>
    `
  }
}
import Component from './core/Component';

export default class App extends Component {
  setup() {
    this.$state = {
      data1 : ['awdawdwadawd', 'item2'],
      data2 : []
    }
  }
    template() {
      let {data1, data2} = this.$state;
      return`
        <div>
        
        </div>
	  `
    }
}
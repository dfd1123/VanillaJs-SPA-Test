import '@/style/pages/Home.scss';
import Component from '@/core/Component';
import Title from '@components/Title';
import SearchListWrap from '@components/SearchListWrap';

export default class Home extends Component {
  data() {
    return {
      title: 'Practice',
    };
  }

  template() {
    return `
            <div Home>
                <div Title></div>
                <div SearchListWrap></div>
            </div>
        `;
  }

  componentDidMount() {
    const { title } = this.$state;

    this.addComponent(Title, {
      text: title,
    });

    this.addComponent(SearchListWrap);
  }
}

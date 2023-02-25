import './style.scss';
import Component from '@/core/Component';

export default class Loading extends Component {
  template() {
    return `
            <div class="loader">
                <svg class="circular-loader" viewBox="25 25 50 50">
                    <circle class="loader-path" cx="50" cy="50" r="20"></circle>
                </svg>
            </div>
        `;
  }
}

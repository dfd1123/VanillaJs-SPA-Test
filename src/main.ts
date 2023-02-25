import "./style/style.scss";
import {Route} from './router';
import routes from './router/routes';
import App from "./App";

new Route(routes).init();

new App(document.querySelector('#app')); 
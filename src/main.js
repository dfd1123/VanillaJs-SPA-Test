import "./style/style.scss";
import {Route} from './router';
import routes from './router/routes';
import App from "./App.js";

new Route(routes).init();

new App(document.querySelector('#app')); 
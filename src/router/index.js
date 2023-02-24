import Component from '@/core/Component';
import NotFoundError from '@pages/NotFoundError';

export class Route {
    #routes;

    constructor(routes = []){
        this.#routes = routes;
    }

    init(){
        window.addEventListener("popstate", this.router);

        document.addEventListener("DOMContentLoaded", () => {
            document.body.addEventListener("click", e => {
                if (e.target.matches("[data-link]")) {
                    e.preventDefault();
                    navigateTo(e.target.href);
                }

            });

            this.router();
        });
    }

    router(){
        const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

        const potentialMatches = this.#routes.map(route => {
            return {
                route,
                result: location.pathname.match(pathToRegex(route.path))
            };
        });

        let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

        // console.log(math.route);

        if (!match) {
            match = {
                route: {
                    path: '/404',
                    view: NotFoundError
                },
                result: [location.pathname]
            }

            // return this.navigateTo(match.route.path);
        }else if(match.route.redirect){
            return this.navigateTo(match.route.redirect);
        }

        new match.route.view(document.querySelector('#router-view'));
    }

    getParams(match) {
        const values = match.result.slice(1);
        const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
        
        return Object.fromEntries(keys.map((key, i) => {
            return [key, values[i]];
        }));
    }

    getQuerys() {
        const queryString = window.location.search;
        const queryParameters = queryString.substring(1).split('&');
        const queryParamsObject = {};
        
        for (let i = 0; i < queryParameters.length; i++) {
            const [key, value] = queryParameters[i].split('=');
            queryParamsObject[key] = decodeURIComponent(value);
        }
        
        return queryParamsObject || {};
    }

    navigateTo(url){
        history.pushState(null, null, url);
        this.router();
    }
}

export class RouterView extends Component {
    template(){
        return `
            <div id="router-view"></div>
        `
    }
}

const route = new Route();

export default {
    navigateTo: route.navigateTo,
    getQuerys: route.getQuerys,
    getParams: route.getParams,
}
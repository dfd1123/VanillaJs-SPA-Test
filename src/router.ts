export interface Route {
    path: string;
    meta?: {[key: string]: any};
    view: () => string | void;
}

export class Router {
    private routes: Route[];

    constructor({routes}: {routes: Route[]}){
        this.routes = routes;
    }

    init(){
        const pathToRegex = (path: string) => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

        const matchRoute = this.routes.find(route => location.pathname.match(pathToRegex(route.path)));

        if(!matchRoute){
            document.querySelector('#app').innerHTML = `<h1>404</h1>`;
        }
    }
}
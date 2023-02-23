export class Route {
    #routes;

    constructor({routes = []}){
        this.#routes = routes;
    }

    router(){
        const pathToRegex = (path) => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

        const matchRoute = this.routes.find(route => location.pathname.match(pathToRegex(route.path)));

        if(!matchRoute){
            document.querySelector('#app').innerHTML = `<h1>404</h1>`;
        }else{
            const {component} = matchRoute;

            new component(document.querySelector('#app'), {});
        }
    }

    getParams(match) {
        const values = match.result.slice(1);
        const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
        
        return Object.fromEntries(keys.map((key, i) => {
            return [key, values[i]];
        }));
    };
}
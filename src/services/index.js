import ApiConnection from "@/api/ApiConnection";
import CommonApiHandler from "@/api/handlers/CommonApiHandler";
import CharacterService from "./CharacterService";

class Service {
    #apiHandler = {};

    constructor(){
        this.#apiHandler = {
            common: new CommonApiHandler(),
        };
    }

    get character(){
        const api = new ApiConnection('https://www.anapioficeandfire.com/api', this.#apiHandler.common);
        
        return new CharacterService(api);
    }
}

export default new Service();
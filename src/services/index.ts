import { store } from '@/store';
import ApiConnection from "@/api/ApiConnection";
import CommonApiHandler from "@/api/handlers/CommonApiHandler";
import CharacterService from "./CharacterService";
import { ApiHandlerType } from '@/api/types';

class Service {
    private apiHandler: Record<string, ApiHandlerType> = {};

    constructor(){
        this.apiHandler = {
            common: new CommonApiHandler(),
        };
    }

    get character(){
        const api = new ApiConnection('https://www.anapioficeandfire.com/api', this.apiHandler.common);
        
        return new CharacterService(api);
    }

    get loadingModal(){
        const setStatus = (status = false) => {
            store.commit('SET_LOADING', status);
        }
        return {open: () => setStatus(true), close: () => setStatus(false)}
    }
}

export default new Service();
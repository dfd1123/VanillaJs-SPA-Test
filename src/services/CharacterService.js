export default class CharacterService {
    #api;

    constructor(api){
        this.#api = api;
    }

    getCharacter(params){
        const {name, gender, culture, born, died, isAlive, page, pageSize} = params || {};
        return this.#api.get('/characters', {name, gender, culture, born, died, isAlive, page, pageSize});
    }
}
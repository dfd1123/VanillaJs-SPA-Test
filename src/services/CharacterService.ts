import ApiConnection from '@/api/ApiConnection';

export interface CharacterItem {
  url: string;
  name: string;
  culture: string;
  born: string;
  died: string;
  titles: string[];
  aliases: string[];
  father: string;
  mother: string;
  spouse: string;
  allegiances: string[];
  books: string[];
  povBooks: string[];
  tvSeries: string[];
  playedBy: string[];
}

export type GetCharacterListParams = {
  name?: string;
  gender?: string;
  culture?: string;
  born?: string;
  died?: string;
  isAlive?: boolean;
  page?: number;
  pageSize?: number;
};

export default class CharacterService {
  constructor(private api: ApiConnection) {}

  getCharacter(params: GetCharacterListParams): Promise<CharacterItem[]> {
    const { name, gender, culture, born, died, isAlive, page, pageSize } =
      params || {};
    return this.api.get('/characters', {
      name,
      gender,
      culture,
      born,
      died,
      isAlive,
      page,
      pageSize,
    });
  }
}

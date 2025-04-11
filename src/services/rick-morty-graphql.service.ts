import {filterByStatus} from "../constants/rickandmortyapi-queries";
import {CacheRepository, NodeCacheService} from "./node-cache.service";
import {Character, CharacterResponse, InfoResponse} from "../interfaces/character-response";

const cacheService: CacheRepository<any> = new NodeCacheService();

export class RickMortyGraphqlService {
    url: string = "https://rickandmortyapi.com/graphql";

    private headers() {
        return {
            'Content-Type': 'application/json',
            "Accept": 'application/json',
        }
    }

    async getCharactersFiltered(value: string, page: number = 1): Promise<CharacterResponse> {

        return await fetch(`${this.url}?query=${filterByStatus(value, page)}`, {
            method: "GET",
            headers: this.headers(),
        }).then(value => value.json()).then(value1 => value1["data"]["characters"]);
    }

    async characterByStatus(value: string): Promise<Character[]> {
        try {
            let characters: Character[] = [];
            const charactersResponse: CharacterResponse = await this.getCharactersFiltered(value);
            characters = charactersResponse.results;
            if(!charactersResponse?.info?.pages) {
                cacheService.setValue(value, characters);
                return characters;
            }

            for (let page: number = 2; page <= charactersResponse.info.pages; page++) {
                const characterNext: CharacterResponse = await this.getCharactersFiltered(value, page);
                if (characterNext?.results?.length) characterNext?.results.forEach((value1: Character) => characters.push(value1));
            }
            if(characters?.length) cacheService.setValue(value, characters);
            return characters;
        } catch (error) {
            console.log("error", error)
        }
        return [];
    }
}
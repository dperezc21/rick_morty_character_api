import {
    defaultCharacterQuery,
    queryToFilterCharacters,
    queryToFilterLocations, queryWithPagination
} from "../constants/rickandmortyapi-queries";
import {CacheRepository, NodeCacheService} from "./node-cache.service";
import {CharacterResponse, OriginResponse} from "../interfaces/character-response";
import {Character} from "../interfaces/character.interface";
import {Origin} from "../interfaces/origin.interface";

const cacheService: CacheRepository<any> = new NodeCacheService();

export class RickMortyGraphqlService {
    url: string = "https://rickandmortyapi.com/graphql";

    private headers() {
        return {
            'Content-Type': 'application/json',
            "Accept": 'application/json',
        }
    }

    async getCharacterInitial(): Promise<CharacterResponse> {
        return await fetch(`${this.url}?query=${defaultCharacterQuery()}`, {
                method: "GET",
                headers: this.headers()
            }).then(value => value.json()).then(value1 => value1["data"]["characters"])
    }

    async getCharactersFiltered(value: string, key: string, page: number = 1): Promise<CharacterResponse> {
        return await fetch(`${this.url}?query=${queryToFilterCharacters(value, key, page)}`, {
            method: "GET",
            headers: this.headers(),
        }).then(value => value.json()).then(value1 => value1["data"]["characters"]);
    }

    async getLocationsFiltered(value: string, key: string, page: number = 1): Promise<OriginResponse> {
        return await fetch(`${this.url}?query=${queryToFilterLocations(value, key, page)}`, {
            method: "GET",
            headers: this.headers(),
        }).then(value => value.json()).then(value1 => value1["data"]["locations"]);
    }

    async getCharacters(page: number = 1): Promise<CharacterResponse> {
        return await fetch(`${this.url}?query=${queryWithPagination(page)}`, {
            method: "GET",
            headers: this.headers(),
        }).then(value => value.json()).then(value1 => value1["data"]["characters"]);
    }

    async getAllCharacterByFilter(value: string, key: string): Promise<Character[]> {
        try {
            let characters: Character[] = [];
            const charactersResponse: CharacterResponse = await this.getCharactersFiltered(value, key);
            characters = charactersResponse.results;
            if(!characters?.length) return [];
            if(!charactersResponse?.info?.pages) {
                cacheService.setValue(value, characters);
                return characters;
            }

            for (let page: number = 2; page <= charactersResponse.info.pages; page++) {
                const characterNext: CharacterResponse = await this.getCharactersFiltered(value, key, page);
                if (characterNext?.results?.length) characterNext?.results.forEach((value1: Character) => characters.push(value1));
            }
            if(characters?.length) cacheService.setValue(value, characters);
            return characters;
        } catch (error) {
            console.log("error", error)
        }
        return [];
    }

    async getAllCharacterByOriginName(value: string, key: string): Promise<Character[]> {
        try {
            let characters: Origin[] = [];
            const originResponse: OriginResponse = await this.getLocationsFiltered(value, key);
            characters = originResponse.results;
            if(!characters?.length) return [];
            if(!originResponse?.info?.pages) {
                cacheService.setValue(value, characters);
                return characters.map(value1 => value1["residents"]);
            }

            for (let page: number = 2; page <= originResponse.info.pages; page++) {
                const characterNext: OriginResponse = await this.getLocationsFiltered(value, key, page);
                if (characterNext?.results?.length) characterNext?.results.forEach((value1: Origin) => {
                    value1["residents"].forEach(value2 => characters.push(value2));
                });
            }
            if(characters?.length) cacheService.setValue(value, characters);
            return characters.map((value1: Origin) => value1["residents"]);
        } catch (error) {
            console.log("error", error)
        }
        return [];
    }

    async getAllCharacters(): Promise<Character[]> {
        try {
            let characters: Character[] = [];
            const characterResponse: CharacterResponse = await this.getCharacters();
            characters = characterResponse.results;
            if(!characters?.length) return [];
            if(!characterResponse?.info?.pages) return characters;
            for (let page: number = 2; page <= characterResponse.info.pages; page++) {
                const characterNext: CharacterResponse = await this.getCharacters(page);
                if (characterNext?.results?.length) characterNext?.results.forEach((value1: Character) => characters.push(value1));
            }
            return characters;
        } catch (error) {
            console.log("error", error)
        }
        return [];
    }
}
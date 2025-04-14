import {Character} from "../interfaces/character.interface";
import {CharacterResponse, OriginResponse} from "../interfaces/character-response";
import {Origin} from "../interfaces/origin.interface";
import {RickMortyGraphqlService} from "../services/rick-morty-graphql.service";
import {NodeCacheService} from "../services/node-cache.service";

const rickMortyService = new RickMortyGraphqlService();
const cacheService = new NodeCacheService();

export class RickMortyApiController {

    async getAllCharacterByFilter(value: string, key: string): Promise<Character[]> {
        try {
            let characters: Character[] = [];
            const charactersResponse: CharacterResponse = await rickMortyService.getCharactersFiltered(value, key);
            characters = charactersResponse.results;
            if(!characters?.length) return [];
            if(!charactersResponse?.info?.pages) {
                cacheService.setValue(value, characters);
                return characters;
            }

            for (let page: number = 2; page <= charactersResponse.info.pages; page++) {
                const characterNext: CharacterResponse = await rickMortyService.getCharactersFiltered(value, key, page);
                if (characterNext?.results?.length) characterNext?.results.forEach((value1: Character) => characters.push(value1));
            }
            if(characters?.length) cacheService.setValue(value, characters);
            return characters;
        } catch (error) {
            console.log("error", error)
        }
        return [];
    }

    async getAllCharacterByOriginName(value: string): Promise<Character[]> {
        try {
            const QUERY_KEY_NAME: string = "name";
            let characters: Character[] = [];
            const originResponse: OriginResponse = await rickMortyService.getLocationsFiltered(value, QUERY_KEY_NAME);
            characters = originResponse?.results?.flatMap(value1 => value1["residents"]) ?? [];
            if(!originResponse?.info?.pages || originResponse.info?.pages == 1) {
                cacheService.setValue(value, characters);
                return characters;
            }

            for (let page: number = 2; page <= originResponse.info.pages; page++) {
                const characterNext: OriginResponse = await rickMortyService.getLocationsFiltered(value, QUERY_KEY_NAME, page);
                if (characterNext?.results?.length) {
                    const residentCharacters: Character[] = characterNext.results?.flatMap((origin: Origin) => origin["residents"]);
                    residentCharacters.forEach((value1: Character) => characters.push(value1));
                }
            }
            if(characters?.length) cacheService.setValue(value, characters);
            return characters;
        } catch (error) {
            console.log("error", error)
        }
        return [];
    }

    async getAllCharacters(): Promise<Character[]> {
        try {
            let characters: Character[] = [];
            const characterResponse: CharacterResponse = await rickMortyService.getCharacters();
            characters = characterResponse.results;
            if(!characters?.length) return [];
            if(!characterResponse?.info?.pages) return characters;
            for (let page: number = 2; page <= characterResponse.info.pages; page++) {
                const characterNext: CharacterResponse = await rickMortyService.getCharacters(page);
                if (characterNext?.results?.length) characterNext?.results.forEach((value1: Character) => characters.push(value1));
            }
            return characters;
        } catch (error) {
            console.log("error", error)
        }
        return [];
    }
}
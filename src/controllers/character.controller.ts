import {RickMortyGraphqlService} from "../services/rick-morty-graphql.service";
import {CacheRepository, NodeCacheService} from "../services/node-cache.service";
import {CharacterService} from "../services/character.service";
import {Character} from "../interfaces/character-response";

const cacheService: CacheRepository<any> = new NodeCacheService();
const characterService = new CharacterService();
const rickMortyGraphqlService = new RickMortyGraphqlService();

export class CharacterController {
    async getAllCharactersByStatus(status: string): Promise<any> {
        const charactersByStatus = cacheService.getValue(status);
        if(charactersByStatus) return JSON.parse(charactersByStatus);
        const characters: Character[] = await characterService.charactersByStatus(status);
        if(characters.length) return characters;
        return await rickMortyGraphqlService.getAllCharacterByFilter(status, "status");
    }

    async getAllCharactersBySpecies(specie: string): Promise<Character[]> {
        const charactersBySpecie = cacheService.getValue(specie);
        if(charactersBySpecie) return JSON.parse(charactersBySpecie);
        const characters: Character[] = await characterService.charactersBySpecie(specie);
        if(characters.length) return characters;
        return await rickMortyGraphqlService.getAllCharacterByFilter(specie, "species");
    }
}
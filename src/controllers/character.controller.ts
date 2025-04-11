import {RickMortyGraphqlService} from "../services/rick-morty-graphql.service";
import {CacheRepository, NodeCacheService} from "../services/node-cache.service";
import {CharacterService} from "../services/character.service";

const cacheService: CacheRepository<any> = new NodeCacheService();
const characterService = new CharacterService();
const rickMortyGraphqlService = new RickMortyGraphqlService();

export class CharacterController {
    async getAllCharactersByStatus(status: string): Promise<any> {
        const charactersByStatus = cacheService.getValue(status);
        if(charactersByStatus) return JSON.parse(charactersByStatus);
        const characters = await characterService.charactersByStatus(status);
        if(characters.length) return characters;
        return await rickMortyGraphqlService.characterByStatus(status);
    }
}
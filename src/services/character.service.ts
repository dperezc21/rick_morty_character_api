import {Character} from "../models/character.model";
import {CacheRepository, NodeCacheService} from "./node-cache.service";
import {RickMortyGraphqlService} from "./rick-morty-graphql.service";

const cacheService: CacheRepository<any> = new NodeCacheService();
const rickMortyGraphqlService = new RickMortyGraphqlService();

export class CharacterService {
    async getAllCharactersByStatus(status: string): Promise<any> {
        const charactersByStatus = cacheService.getValue(status);
        if(charactersByStatus) return JSON.parse(charactersByStatus);
        const characters = await Character.findAll({ where: { status } });
        if(characters.length) {
            cacheService.setValue(status, characters.map(value1 => value1.dataValues));
            return cacheService.getValue(status);
        }
        const characterByStatus = await rickMortyGraphqlService.characterByStatus(status);
        if(characterByStatus) cacheService.setValue(status, characterByStatus);
        return characterByStatus;

    }
}
import {CharacterModel} from "../models/character.model";
import {CacheRepository, NodeCacheService} from "./node-cache.service";
import {Character} from "../interfaces/character-response";

const cacheService: CacheRepository<any> = new NodeCacheService();

export class CharacterService {

    async charactersByStatus(status: string): Promise<Character[]> {
        return new Promise(async(resolve, reject) => {
            const charactersFound = await CharacterModel.findAll({ where: { status } });
            if(charactersFound.length) {
                const mapCharacters = charactersFound.map(value1 => value1.dataValues);
                cacheService.setValue(status, mapCharacters);
                resolve(mapCharacters);
            }
            resolve([]);
        })
    }

    async charactersBySpecie(species: string): Promise<Character[]> {
        return new Promise(async(resolve, reject) => {
            const charactersFound = await CharacterModel.findAll({ where: { species } });
            if(charactersFound.length) {
                const mapCharacters = charactersFound.map(value1 => value1.dataValues);
                cacheService.setValue(species, mapCharacters);
                resolve(mapCharacters);
            }
            resolve([]);
        })
    }
}
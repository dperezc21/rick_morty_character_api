import {Character} from "../models/character.model";
import {CacheRepository, NodeCacheService} from "./node-cache.service";

const cacheService: CacheRepository<any> = new NodeCacheService();

export class CharacterService {

    async charactersByStatus(status: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
            const charactersFound = await Character.findAll({ where: { status } });
            if(charactersFound.length) {
                const mapCharacters = charactersFound.map(value1 => value1.dataValues);
                cacheService.setValue(status, mapCharacters);
                resolve(mapCharacters);
            }
            resolve([]);
        })
    }
}
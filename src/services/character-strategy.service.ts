import {CharacterStrategy} from "../interfaces/character-strategy";
import {Character} from "../interfaces/character.interface";
import {CharacterService} from "./character.service";
import {CacheRepository, NodeCacheService} from "./node-cache.service";
import {OriginService} from "./origin.service";
import {Origin} from "../interfaces/origin.interface";

const cacheService: CacheRepository<any> = new NodeCacheService();
const characterService = new CharacterService();
const originService = new OriginService();

export class CharacterSpecie implements CharacterStrategy {
    async getCharacters(type: string): Promise<Character[]> {
        return new Promise(async(resolve) => {
            const charactersFound: Character[] = await characterService.getCharacterBySpecie(type);
            if(charactersFound.length) {
                cacheService.setValue(type, charactersFound);
                resolve(charactersFound);
            } else resolve([]);
        })
    }
}

export class CharacterStatus implements CharacterStrategy {
    async getCharacters(status: string): Promise<Character[]> {
        return new Promise(async(resolve) => {
            const charactersFound = await characterService.getCharacterByStatus(status);
            if(charactersFound.length) {
                cacheService.setValue(status, charactersFound);
                resolve(charactersFound);
            } else resolve([]);
        })
    }
}

export class CharacterGender implements CharacterStrategy {
    async getCharacters(gender: string): Promise<Character[]> {
        return new Promise(async(resolve) => {
            const charactersFound: Character[] = await characterService.getCharacterByGender(gender);
            if(charactersFound.length) {
                cacheService.setValue(gender, charactersFound);
                resolve(charactersFound);
            } else resolve([]);
        })
    }
}

export class CharacterName implements CharacterStrategy {
    async getCharacters(name: string): Promise<Character[]> {
        return new Promise(async(resolve) => {
            const charactersFound: Character[] = await characterService.getCharacterByName(name);
            if(charactersFound.length) {
                cacheService.setValue(name, charactersFound);
                resolve(charactersFound);
            } else resolve([]);
        })
    }
}

export class CharacterOrigin implements CharacterStrategy {
    async getCharacters(name: string): Promise<Character[]> {
        return new Promise(async(resolve) => {
            const originsFound: Origin[] = await originService.getOriginsByName(name);
            const characterFromOriginsFound: any[] = originsFound.flatMap(value => value["Characters"])
            const charactersResult: Character[] = characterFromOriginsFound.map(value => value.dataValues);
            if(charactersResult?.length) {
                cacheService.setValue(name, charactersResult);
                resolve(charactersResult);
            } else resolve([]);
        })
    }
}

export const CHARACTER_STRATEGY_CONTEXT: Map<string, CharacterStrategy> = new Map([
    ["status", new CharacterStatus],
    ["species", new CharacterSpecie],
    ["name", new CharacterName],
    ["gender", new CharacterGender],
    ["origin", new CharacterOrigin]
])
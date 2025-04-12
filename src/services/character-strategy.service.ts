import {CharacterStrategy} from "../interfaces/character-strategy";
import {Character} from "../interfaces/character.interface";
import {CharacterService} from "./character.service";
import {CacheRepository, NodeCacheService} from "./node-cache.service";

const cacheService: CacheRepository<any> = new NodeCacheService();
const characterService = new CharacterService();

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

export const CHOICE_BY_FILTER = {
    "status": new CharacterStatus,
    "species": new CharacterSpecie,
    "name": new CharacterName,
    "gender": new CharacterGender
}
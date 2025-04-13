import {CacheRepository, NodeCacheService} from "../services/node-cache.service";
import {CharacterService,} from "../services/character.service";
import {Character} from "../interfaces/character.interface";
import {OriginService} from "../services/origin.service";
import {CHOICE_BY_FILTER} from "../services/character-strategy.service";
import {RickMortyApiController} from "./rick-morty-api.controller";
import {CHARACTER_NUMBER_MIN} from "../constants/constants";

const cacheService: CacheRepository<any> = new NodeCacheService();
const characterService = new CharacterService();
const rickMortyApiController = new RickMortyApiController();
const originService = new OriginService();

export class CharacterController {
    async getAllCharacters(filter: string, type: string): Promise<any> {
        const charactersByStatus = cacheService.getValue(filter);
        if(charactersByStatus) return JSON.parse(charactersByStatus);
        const characters: Character[] = await CHOICE_BY_FILTER[type].getCharacters(filter);
        if(characters.length && characters?.length > CHARACTER_NUMBER_MIN) return characters;
        const charactersFiltered: Character[] = await rickMortyApiController.getAllCharacterByFilter(filter, type);
        if(charactersFiltered?.length) await this.saveCharacterData(charactersFiltered);
        return charactersFiltered;
    }

    async getAllCharactersByOrigin(filter: string, type: string): Promise<any> {
        const charactersByStatus = cacheService.getValue(filter);
        if(charactersByStatus) return JSON.parse(charactersByStatus);
        const characters: Character[] = await CHOICE_BY_FILTER[type].getCharacters(filter);
        if(characters.length && characters?.length > CHARACTER_NUMBER_MIN) return characters;
        const charactersFiltered: Character[] = await rickMortyApiController.getAllCharacterByOriginName(filter);
        if(charactersFiltered?.length) await this.saveCharacterData(charactersFiltered);
        return charactersFiltered;
    }

    async saveCharacterData(characters: Character[]): Promise<boolean> {
        for (const charactersToSaveElement of characters) {
            const characterSaved = await characterService.saveCharacter(charactersToSaveElement);
            if(charactersToSaveElement?.origin?.id && characterSaved?.id)
                await originService.saveCharacterOrigin(characterSaved.id, charactersToSaveElement.origin)
        }
        return Promise.resolve(true);
    }
}
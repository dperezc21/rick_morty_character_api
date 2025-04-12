import {RickMortyGraphqlService} from "../services/rick-morty-graphql.service";
import {CacheRepository, NodeCacheService} from "../services/node-cache.service";
import {
    CharacterService,
} from "../services/character.service";
import {Character} from "../interfaces/character.interface";
import {OriginService} from "../services/origin.service";
import {CHOICE_BY_FILTER} from "../services/character-strategy.service";

const cacheService: CacheRepository<any> = new NodeCacheService();
const characterService = new CharacterService();
const rickMortyGraphqlService = new RickMortyGraphqlService();
const originService = new OriginService();

export class CharacterController {
    async getAllCharacters(filter: string, type: string): Promise<any> {
        const charactersByStatus = cacheService.getValue(filter);
        if(charactersByStatus) return JSON.parse(charactersByStatus);
        const characters: Character[] = await CHOICE_BY_FILTER[type].getCharacters(filter);
        if(characters.length) return characters;
        const charactersFiltered: Character[] = await rickMortyGraphqlService.getAllCharacterByFilter(filter, type);
        if(charactersFiltered?.length) await this.saveCharacterData(charactersFiltered);
        return charactersFiltered;
    }

    async saveCharacterData(characters: Character[]): Promise<boolean> {
        for (const charactersToSaveElement of characters.slice(0, 15)) {
            const characterSaved = await characterService.saveCharacter(charactersToSaveElement);
            if(charactersToSaveElement?.origin?.id && characterSaved?.id)
                await originService.saveCharacterOrigin(characterSaved.id, charactersToSaveElement.origin)
        }
        return Promise.resolve(true);
    }
}
import {RickMortyGraphqlService} from "../services/rick-morty-graphql.service";
import {CacheRepository, NodeCacheService} from "../services/node-cache.service";
import {CharacterService} from "../services/character.service";
import {Character} from "../interfaces/character.interface";
import {OriginService} from "../services/origin.service";

const cacheService: CacheRepository<any> = new NodeCacheService();
const characterService = new CharacterService();
const rickMortyGraphqlService = new RickMortyGraphqlService();
const originService = new OriginService();

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

    async getAllCharactersByGender(gender: string): Promise<Character[]> {
        const charactersBySpecie = cacheService.getValue(gender);
        if(charactersBySpecie) return JSON.parse(charactersBySpecie);
        const characters: Character[] = await characterService.charactersByGender(gender);
        if(characters.length) return characters;
        return await rickMortyGraphqlService.getAllCharacterByFilter(gender, "gender");
    }

    async getAllCharactersByName(name: string): Promise<Character[]> {
        const charactersBySpecie = cacheService.getValue(name);
        if(charactersBySpecie) return JSON.parse(charactersBySpecie);
        const characters: Character[] = await characterService.charactersByName(name);
        if(characters.length) return characters;
        return await rickMortyGraphqlService.getAllCharacterByFilter(name, "name");
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
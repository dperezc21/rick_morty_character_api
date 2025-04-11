import {Character} from "../models/character.model";
import {CacheRepository, NodeCacheService} from "./node-cache.service";

const cacheService: CacheRepository<any> = new NodeCacheService();

export class CharacterService {
    async getAllCharactersByStatus(status: string): Promise<any> {
        const charactersByStatus = cacheService.getValue(status);
        if(charactersByStatus) return JSON.parse(charactersByStatus);
        const characters = await Character.findAll({ where: { status } });
        if(characters.length) {
            cacheService.setValue(status, characters.map(value1 => value1.dataValues));
            return cacheService.getValue(status);
        }
        const charac = await this.characterFromApi(status);
        if(characters) cacheService.setValue(status, charac);
        return charac;

    }

    async characterFromApi(value: string): Promise<any> {
        try {
            return await fetch("https://rickandmortyapi.com/graphql?query={\n" +
                `  characters(filter: { status: \"${value}\"}) {\n` +
                "    results {\n" +
                "      id\n" +
                "      name\n" +
                "      status\n" +
                "      species\n" +
                "      type\n" +
                "      gender\n" +
                "      image\n" +
                "      created\n" +
                "    }\n" +
                "  }\n" +
                "}\n", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": 'application/json',
                },
            }).then(value => value.json())
                .then(value => value["data"]["characters"]["results"])
        } catch (error) {

        }
    }
}
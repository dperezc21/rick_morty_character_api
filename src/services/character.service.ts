import {Character} from "../models/character.model";
import {CacheRepository, NodeCacheService} from "./node-cache.service";

const cacheService: CacheRepository<any> = new NodeCacheService();

export class CharacterService {
    getAllCharactersByStatus(status: string): any {
        const charactersByStatus = cacheService.getValue(status);
        if(charactersByStatus) return charactersByStatus;
        Character.findAll({
               where: { status }
        }).then(async(value) => {
           if(value.length) {
               return value.map(value1 => value1.dataValues);
           }
           return await this.characterFromApi();
        }).then(value => {
            cacheService.setValue(status, value);
            console.log(value)
        });
        console.log("log cache", cacheService.getValue(status))
        return cacheService.getValue(status);
    }

    async characterFromApi(): Promise<any> {
        try {
            return await fetch("https://rickandmortyapi.com/graphql?query={\n" +
                "  characters(filter: { status: \"Alive\"}) {\n" +
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
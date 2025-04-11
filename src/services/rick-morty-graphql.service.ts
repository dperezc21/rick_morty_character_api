import {filterByStatus} from "../constants/rickandmortyapi-queries";
import {CacheRepository, NodeCacheService} from "./node-cache.service";

const cacheService: CacheRepository<any> = new NodeCacheService();

export class RickMortyGraphqlService {
    url: string = "https://rickandmortyapi.com/graphql";
    async characterByStatus(value: string): Promise<any> {
        try {
            return await fetch(`${this.url}?query=${filterByStatus(value)}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": 'application/json',
                },
            }).then(value => value.json())
                .then(value => value["data"]["characters"]["results"]).then(value1 => {
                    if(value1?.length) cacheService.setValue(value, value1);
                    return value1;
                })
        } catch (error) {
            console.log("error", error)
        }
    }
}
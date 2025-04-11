import {filterByStatus} from "../constants/rickandmortyapi-queries";

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
                .then(value => value["data"]["characters"]["results"])
        } catch (error) {
            console.log("error", error)
        }
    }
}
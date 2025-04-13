import {
    defaultCharacterQuery,
    queryToFilterCharacters,
    queryToFilterLocations,
    queryWithPagination
} from "../constants/rickandmortyapi-queries";
import {CharacterResponse, OriginResponse} from "../interfaces/character-response";

export class RickMortyGraphqlService {
    url: string = "https://rickandmortyapi.com/graphql";

    private headers() {
        return {
            'Content-Type': 'application/json',
            "Accept": 'application/json',
        }
    }

    async getCharacterInitial(): Promise<CharacterResponse> {
        return await fetch(`${this.url}?query=${defaultCharacterQuery()}`, {
                method: "GET",
                headers: this.headers()
            }).then(value => value.json()).then(value1 => value1["data"]["characters"])
    }

    async getCharactersFiltered(value: string, key: string, page: number = 1): Promise<CharacterResponse> {
        return await fetch(`${this.url}?query=${queryToFilterCharacters(value, key, page)}`, {
            method: "GET",
            headers: this.headers(),
        }).then(value => value.json()).then(value1 => value1["data"]["characters"]);
    }

    async getLocationsFiltered(value: string, key: string, page: number = 1): Promise<OriginResponse> {
        return await fetch(`${this.url}?query=${queryToFilterLocations(value, key, page)}`, {
            method: "GET",
            headers: this.headers(),
        }).then(value => value.json()).then(value1 => value1["data"]["locations"]);
    }

    async getCharacters(page: number = 1): Promise<CharacterResponse> {
        return await fetch(`${this.url}?query=${queryWithPagination(page)}`, {
            method: "GET",
            headers: this.headers(),
        }).then(value => value.json()).then(value1 => value1["data"]["characters"]);
    }
}
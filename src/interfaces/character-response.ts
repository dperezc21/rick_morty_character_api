import {Character} from "./character.interface";

export interface CharacterResponse {
    info: InfoResponse,
    results: Character[]
}

export interface InfoResponse {
    pages: number,
    count: number,
    next: string,
    prev: string
}
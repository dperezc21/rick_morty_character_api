import {Character} from "./character.interface";
import {Origin} from "./origin.interface";

export interface GenericResponseApi<T> {
    info: InfoResponse,
    results: T[]
}

export interface CharacterResponse extends GenericResponseApi<Character>{}

export interface OriginResponse extends GenericResponseApi<Origin>{}

export interface InfoResponse {
    pages: number,
    count: number,
    next: string,
    prev: string
}
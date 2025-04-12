import {Episode} from "./episode.interface";

export interface Character {
    id: number,
    name: string
    status: string
    species: string
    type: string
    gender: string
    image: string
    created: string
    episode: Episode[]
}
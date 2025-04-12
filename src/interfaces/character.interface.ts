import {Episode} from "./episode.interface";
import {Origin} from "./origin.interface";

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
    origin: Origin
}
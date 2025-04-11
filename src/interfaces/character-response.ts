
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

export interface Episode {
    id: number,
    name: string,
    air_date: string,
    episode: string,
}

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
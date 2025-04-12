import {Character} from "./character.interface";

export abstract class CharacterStrategy {
    getCharacters = async(type: string): Promise<Character[]> => Promise.resolve([]);
}
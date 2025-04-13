import cron from 'node-cron';
import {RickMortyGraphqlService} from "../services/rick-morty-graphql.service";
import {CharacterService} from "../services/character.service";
import {Character} from "../interfaces/character.interface";

const rickMortyGraph = new RickMortyGraphqlService();
const characterService = new CharacterService();

function validSameCharacters(character: Character, characterToUpdate: Character): boolean {
    for (let key in characterToUpdate) {
        if(!(key in character) || key == "created") continue;
        if(character[key] != characterToUpdate[key]) return false;
    }
    return true;
}

function getCharacter(characterList: Character[], character: Character): Character {
    return characterList.find(value => value.id == character.id) as Character;
}

async function updateCharactersModified(): Promise<void> {
    return new Promise(async(resolve) => {
        const characters: Character[] = await characterService.getAllCharacters();
        const charactersApi: Character[] = await rickMortyGraph.getAllCharacters();
        for (const character of characters) {
            const found: Character = getCharacter(charactersApi, character);
            if(validSameCharacters(character, found)) continue;
            await characterService.updateCharacter(found);
        }
        resolve()
    })
}

const expJob: string = "0 1,13 * * 1-7";
export const job = cron.schedule(expJob, () => {
    updateCharactersModified().then();
});

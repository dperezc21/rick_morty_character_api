import cron from 'node-cron';
import {CharacterService} from "../services/character.service";
import {Character} from "../interfaces/character.interface";
import {RickMortyApiController} from "./rick-morty-api.controller";
import {REGEX_CRON_EACH_12_HOURS} from "../constants/constants";

const rickMortyGraph = new RickMortyApiController();
const characterService = new CharacterService();

function isSameCharacter(character: Character, characterToUpdate: Character): boolean {
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
            if(isSameCharacter(character, found)) continue;
            await characterService.updateCharacter(found);
        }
        resolve()
    })
}

export const job = cron.schedule(REGEX_CRON_EACH_12_HOURS, () => {
    console.log("cron job running");
    updateCharactersModified().then();
});

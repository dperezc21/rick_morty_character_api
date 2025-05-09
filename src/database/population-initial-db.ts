import {CharacterService} from "../services/character.service";
import {RickMortyGraphqlService} from "../services/rick-morty-graphql.service";
import {CharacterResponse} from "../interfaces/character-response";
import {CharacterController} from "../controllers/character.controller";
import {CHARACTER_NUMBER_MIN} from "../constants/constants";

const characterService = new CharacterService();
const rickMortyGraphqlService = new RickMortyGraphqlService();
const characterController = new CharacterController();

export class PopulationInitialDb {

    async populationInitial(): Promise<string> {
        return new Promise(async(resolve, reject) => {
            const existsRecords: number = await characterService.existRecords();
            if(existsRecords > 0) {
                reject("there records in the db");
                return;
            }
            const charactersToSave: CharacterResponse = await rickMortyGraphqlService.getCharacterInitial();
            if(!charactersToSave?.results?.length) return;
            await characterController.saveCharacterData(charactersToSave.results.slice(0, CHARACTER_NUMBER_MIN));
            return resolve("records saved");
        });
    }

}
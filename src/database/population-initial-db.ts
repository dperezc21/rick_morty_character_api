import {CharacterService} from "../services/character.service";
import {RickMortyGraphqlService} from "../services/rick-morty-graphql.service";
import {CharacterResponse} from "../interfaces/character-response";

const characterService = new CharacterService();
const rickMortyGraphqlService = new RickMortyGraphqlService();

export class PopulationInitialDb {

    async populationInitial(): Promise<string> {
        return new Promise(async(resolve) => {
            const existsRecords: number = await characterService.existRecords();
            if(existsRecords > 0) resolve("there records in the db");
            const charactersToSave: CharacterResponse = await rickMortyGraphqlService.getCharacterInitial();
            if(!charactersToSave?.results?.length) resolve("api without data");
            for (const charactersToSaveElement of charactersToSave.results) {
                await characterService.saveCharacter(charactersToSaveElement);
            }
            return resolve("records saved");
        });
    }

}
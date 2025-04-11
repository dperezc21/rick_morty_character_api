import {CharacterModel} from "../models/character.model";
import {PlaceModel} from "../models/place.model";
import {EpisodeModel} from "../models/episode.model";
import {PlaceCharacterModel} from "../models/place-character.model";
import {EpisodeCharacterModel} from "../models/episode-character.model";

export async function createTables() {
    try {
        await CharacterModel.sync({alter: true})//.then(value => console.log("table character created"))
        await PlaceModel.sync({alter: true})//.then(value => console.log("table place created"))
        await EpisodeModel.sync({alter: true})//.then(value => console.log("table episode created"))
        await PlaceCharacterModel.sync({alter: true})//.then(value => console.log("table character place created"))
        await EpisodeCharacterModel.sync({alter: true})//.then(value => console.log("table character episode created"))
        console.log("tables created")
    } catch (err) {
        console.error(err);
    }
}
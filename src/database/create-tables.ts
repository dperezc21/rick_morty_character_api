import {Character} from "../models/character.model";
import {Place} from "../models/place.model";
import {Episode} from "../models/episode.model";
import {PlaceCharacter} from "../models/place-character.model";
import {EpisodeCharacter} from "../models/episode-character.model";

export async function createTables() {
    try {
        await Character.sync({alter: true})//.then(value => console.log("table character created"))
        await Place.sync({alter: true})//.then(value => console.log("table place created"))
        await Episode.sync({alter: true})//.then(value => console.log("table episode created"))
        await PlaceCharacter.sync({alter: true})//.then(value => console.log("table character place created"))
        await EpisodeCharacter.sync({alter: true})//.then(value => console.log("table character episode created"))
        console.log("tables created")
    } catch (err) {
        console.error(err);
    }
}
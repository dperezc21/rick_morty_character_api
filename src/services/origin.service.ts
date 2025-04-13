import {Origin} from "../interfaces/origin.interface";
import {PlaceModel} from "../models/place.model";
import {PlaceCharacterModel} from "../models/place-character.model";
import {CharacterModel} from "../models/character.model";

export class OriginService {

    async saveCharacterOrigin(characterId: number, origin: Origin): Promise<boolean> {
        if(!origin?.id) return Promise.resolve(false);
        return new Promise(async(resolve) => {
            const { id, name, type, dimension, created } = origin;
            const placeCreated = await PlaceModel.findOrCreate({
                where: { id },
                defaults: {id, name, type, dimension, created, origen: true}
            });
            if(placeCreated[0].dataValues?.id) await PlaceCharacterModel.findOrCreate({
                where: { place_id: placeCreated[0].dataValues?.id, character_id: characterId },
                defaults: { place_id: placeCreated[0].dataValues?.id, character_id: characterId }
            })
            resolve(!!placeCreated[0]?.dataValues?.id)
        })
    }

    async getOriginsByName(name: string): Promise<Origin[]> {
        return new Promise(async(resolve) => {
           const locations: Origin[] = await PlaceModel.findAll({
               where: { name },
               include: CharacterModel
           }).then(value => value.map(value1 => value1.dataValues));
           resolve(locations)
        });
    }
}
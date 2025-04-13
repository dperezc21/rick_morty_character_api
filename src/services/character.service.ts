import {CharacterModel} from "../models/character.model";
import {Character} from "../interfaces/character.interface";

export class CharacterService {

    async getCharacterByName(name: string): Promise<Character[]> {
        return await CharacterModel.findAll(
            { where: { name } })
            .then(modelValue => modelValue.map(model => model.dataValues));
    }

    async getCharacterByStatus(status: string): Promise<Character[]> {
        return await CharacterModel.findAll(
            { where: { status } })
            .then(modelValue => modelValue.map(model => model.dataValues));
    }

    async getCharacterBySpecie(species: string): Promise<Character[]> {
        return await CharacterModel.findAll(
            { where: { species } })
            .then(modelValue => modelValue.map(model => model.dataValues));
    }

    async getCharacterByGender(gender: string): Promise<Character[]> {
        return await CharacterModel.findAll({ where: { gender } })
            .then(modelValue => modelValue.map(model => model.dataValues));
    }

    async saveCharacter({ id, episode, origin, ...value }: Character): Promise<Character> {
        return await CharacterModel.findOrCreate({
            where: {id},
            defaults: {...value, id}
        }).then(value1 => value1[0].dataValues)
    }

    async existRecords(): Promise<number> {
        return await CharacterModel.count()
    }
}
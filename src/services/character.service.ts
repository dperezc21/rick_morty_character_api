import {CharacterModel} from "../models/character.model";
import {Character} from "../interfaces/character.interface";
import {Op} from "sequelize";

export class CharacterService {

    async getCharacterByName(name: string): Promise<Character[]> {
        return await CharacterModel.findAll(
            { where: { name: {[Op.like]: `%${name}%` }} })
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

    async getAllCharacters(): Promise<Character[]> {
        return new Promise(async(resolve) => {
           const hola = await CharacterModel.findAll()//.then(value => value.map(value1 => value1.dataValues));
            resolve(hola.map(value => value.dataValues))
        });
    }

    async updateCharacter({id, episode, origin, ...value}: Character) {
        return new Promise(async(resolve) => {
            const characterUpdated = await CharacterModel.update(
                { ...value, id },
                {where: { id }})
            resolve(characterUpdated[0] > 0)
        });
    }
}
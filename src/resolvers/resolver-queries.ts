import {CharacterController} from "../controllers/character.controller";

const characterController = new CharacterController();

export const resolvers = {
    Query: {
        status: async(root, {status}) => {
            return characterController.getAllCharactersByStatus(status)
        },
        species: async(root, {specie}) => {
            return characterController.getAllCharactersBySpecies(specie)
        },
        gender: async(root, {gender}) => {
            return characterController.getAllCharactersByGender(gender)
        },
        name: async(root, {name}) => {
            return characterController.getAllCharactersByName(name)
        }
    },
};
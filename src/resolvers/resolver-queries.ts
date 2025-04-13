import {CharacterController} from "../controllers/character.controller";

const characterController = new CharacterController();

export const resolvers = {
    Query: {
        status: async(root, {status}) => {
            return characterController.getAllCharacters(status, "status")
        },
        species: async(root, {specie}) => {
            return characterController.getAllCharacters(specie, "species")
        },
        gender: async(root, {gender}) => {
            return characterController.getAllCharacters(gender, "gender")
        },
        name: async(root, {name}) => {
            return characterController.getAllCharacters(name, "name")
        },
        origin: async(root, {originName}) => {
            return characterController.getAllCharactersByOrigin(originName, "origin")
        }
    },
};
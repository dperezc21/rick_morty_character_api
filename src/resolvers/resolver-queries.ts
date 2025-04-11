import {CharacterController} from "../controllers/character.controller";

const characterController = new CharacterController();

export const resolvers = {
    Query: {
        status: async(root, {status}) => {
            return characterController.getAllCharactersByStatus(status)
        }
    },
};
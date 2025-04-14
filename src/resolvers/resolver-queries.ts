import {CharacterController} from "../controllers/character.controller";
import {timeDecorator} from "../services/time-decorator-function";
import {GENDER_QUERY, NAME_QUERY, ORIGIN_QUERY, SPECIES_QUERY, STATUS_QUERY} from "../constants/constants";

const characterController = new CharacterController();

export const resolvers = {
    Query: {
        status: async(root, {status}) => {
            return timeDecorator(STATUS_QUERY, characterController.getAllCharacters(status, STATUS_QUERY));
        },
        species: async(root, {specie}) => {
            return timeDecorator(SPECIES_QUERY,characterController.getAllCharacters(specie, SPECIES_QUERY))
        },
        gender: async(root, {gender}) => {
            return timeDecorator(GENDER_QUERY, characterController.getAllCharacters(gender, GENDER_QUERY))
        },
        name: async(root, {name}) => {
            return timeDecorator(NAME_QUERY,characterController.getAllCharacters(name, NAME_QUERY))
        },
        origin: async(root, {originName}) => {
            return timeDecorator(ORIGIN_QUERY, characterController.getAllCharactersByOrigin(originName, ORIGIN_QUERY))
        }
    },
};
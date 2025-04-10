import {sequelize} from "../database/connection";
import {DataTypes} from "sequelize";
import {Place} from "./place.model";
import {Character} from "./character.model";

export const PlaceCharacter = sequelize.define("PlaceCharacter", {
    place_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Place,
            key: "id"
        }
    },
    character_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Character,
            key: "id"
        }
    }
}, { tableName: "place_character"});
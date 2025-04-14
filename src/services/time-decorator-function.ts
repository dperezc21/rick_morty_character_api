import {Character} from "../interfaces/character.interface";

export async function timeDecorator(query_value: string, callback): Promise<Character[]> {
    console.time(`query ${query_value} time`);
    const response = await callback;
    console.timeEnd(`query ${query_value} time`);
    return response;
}
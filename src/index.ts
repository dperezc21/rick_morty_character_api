import {validConnection} from "./database/connection";
import {createTables} from "./database/create-tables";
import {CharacterService} from "./services/character.service";
import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";

const characterService = new CharacterService();

validConnection().then();

createTables().then();

const EpisodeType: string = `
    type Episode {
        id: Int!
        name: String!
        air_date: String!
        episode: String!
    }
`;
const CharacterType: string = `
    type Character {
        id: Int!
        name: String!
        status: String!
        species: String
        type: String
        gender: String
        image: String
        created: String
        episode: [Episode]
    }
`;

const Queries: string = `
    type Query {
        status(status: String!): [Character]
    }
`;

const typeDefs: string = `#graphql
    ${CharacterType}
    ${EpisodeType}
    ${Queries}
`;

const resolvers = {
    Query: {
        status: async(root, {status}) => {
            return characterService.getAllCharactersByStatus(status)
        }
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});
startStandaloneServer(server, {
    listen: { port: 4000 },
}).then();

console.log('Running a GraphQL API server at http://localhost:4000')

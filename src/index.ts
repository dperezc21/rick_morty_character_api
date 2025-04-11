import {buildSchema} from 'graphql';
import {createHandler} from 'graphql-http/lib/use/express';
import express from 'express';
import {validConnection} from "./database/connection";
import {createTables} from "./database/create-tables";
import {CharacterService} from "./services/character.service";

const { ruruHTML } = require('ruru/server');
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
        byStatus(status: String!): [Character]
    }
`;

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`${EpisodeType} ${CharacterType} ${Queries}`);

interface Chara {
    id: number,
    name: string
}

interface RootProviders {
    byStatus(args: {status: string}): Chara[]
}

// The root provides a resolver function for each API endpoint
const root: RootProviders = {
    byStatus({status}) {
        return characterService.getAllCharactersByStatus(status);
    }
};

const app = express();

// Create and use the GraphQL handler.
app.all(
    '/graphql',
    createHandler({
        schema: schema,
        rootValue: root,
    }),
);

// Serve the GraphiQL IDE.
app.get('/', (_req, res) => {
    res.type('html');
    res.end(ruruHTML({ endpoint: '/graphql' }));
});

// Start the server at port
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000')

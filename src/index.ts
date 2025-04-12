
import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import db from "./database/db-connection";
import {createTables} from "./database/create-tables";
import {typeDefs} from "./constants/types-graphql";
import {resolvers} from "./resolvers/resolver-queries";

db.validConnection().then();
createTables().then();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});
startStandaloneServer(server, {
    listen: { port: 4000 },
}).then();

console.log('Running a GraphQL API server at http://localhost:4000')

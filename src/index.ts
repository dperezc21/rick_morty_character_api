import {validConnection} from "./database/connection";
import {createTables} from "./database/create-tables";
import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import {typeDefs} from "./constants/types-graphql";
import {resolvers} from "./resolvers/resolver-queries";

validConnection().then();
createTables().then();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});
startStandaloneServer(server, {
    listen: { port: 4000 },
}).then();

console.log('Running a GraphQL API server at http://localhost:4000')

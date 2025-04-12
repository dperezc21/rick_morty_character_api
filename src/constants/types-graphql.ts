
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

const Place: string = `
    type Origin {
        id: String!
        name: String!
        dimension: String
        created: String
        type: String
    }
`

const Queries: string = `
    type Query {
        status(status: String!): [Character]
        species(specie: String!): [Character]
        gender(gender: String!): [Character]
        name(name: String!): [Character]
    }
`;

export const typeDefs: string = `#graphql
    ${CharacterType}
    ${EpisodeType}
    ${Queries}
    ${Place}
`;
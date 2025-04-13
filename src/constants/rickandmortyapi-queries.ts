

export const queryToFilterCharacters = (status: string, key: string, page: number = 1): string =>
    defaultCharacterQuery(`(page: ${page}, filter: { ${CHOICE_FILTER.get(key)}: \"${status}\"})`)

export const defaultCharacterQuery = (filter: string = ""): string => "{\n" +
    `  characters${filter} {\n` +
    "    results {\n" +
    "      id\n" +
    "      name\n" +
    "      status\n" +
    "      species\n" +
    "      type\n" +
    "      gender\n" +
    "      image\n" +
    "      created\n" +
    `      ${PLACE_RESPONSE_QUERY}\n`+
    "    }\n" +
    "  }\n" +
    "}\n"

export const queryToFilterLocations = (value: string, key: string, page: number = 1): string =>
    defaultLocationQuery(`(page: ${page} , filter: { ${key}: \"${value}\"})`)

export const defaultLocationQuery = (filter: string = ""): string => "query {\n" +
    `  locations${filter} {\n` +
    "    info {\n" +
    "      pages\n" +
    "    }\n" +
    "    results {\n" +
    "      id\n" +
    "      name\n" +
    "      type\n" +
    "      dimension\n" +
    "      created\n" +
    "    }\n" +
    "  }\n" +
    "\n" +
    "  \n" +
    "}"

const CHOICE_FILTER: Map<string, string> = new Map([
    ["status", "status"],
    ["species", "species"],
    ["gender", "gender"],
    ["name", "name"],
]);

const RESIDENTS = "residents {\n" +
    "      id\n" +
    "      name\n" +
    "      status\n" +
    "      species\n" +
    "      type\n" +
    "      gender\n" +
    "      image\n" +
    "      created\n" +
    "    }\n" +
    "  }\n" +
    "}\n"

const PLACE_RESPONSE_QUERY: string = `
    origin {
        id
        name
        dimension
        created
        type
        ${RESIDENTS}
    }
`;
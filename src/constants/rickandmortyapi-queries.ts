

export const filterByStatus = (status: string, key: string, page: number = 1): string => "{\n" +
    `  characters(page: ${page}, filter: { ${CHOICE_FILTER.get(key)}: \"${status}\"}) {\n` +
    "    info { pages }"+
    "    results {\n" +
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

export const defaultQuery: string = "{\n" +
    "  characters {\n" +
    "    results {\n" +
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

const CHOICE_FILTER: Map<string, string> = new Map([
    ["status", "status"],
    ["species", "species"],
    ["gender", "gender"],
    ["name", "name"],
])
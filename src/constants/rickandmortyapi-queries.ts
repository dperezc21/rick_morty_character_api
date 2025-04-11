

export const filterByStatus = (status: string, page: number = 1): string => "{\n" +
    `  characters(page: ${page}, filter: { status: \"${status}\"}) {\n` +
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
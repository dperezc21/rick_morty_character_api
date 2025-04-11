

export const filterByStatus = (status: string): string => "{\n" +
    `  characters(page: 2, filter: { status: \"${status}\"}) {\n` +
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
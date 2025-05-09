import {Sequelize} from "sequelize";

class DbConnection {
    private static sequelize: Sequelize;
    public constructor() {
        if(DbConnection.sequelize == null) {
            DbConnection.sequelize = new Sequelize(
                'rick_morty',
                'root',
                '',
                {
                    host: 'localhost',
                    dialect: "mysql"
                });
        }
        return this;
    }

    async validConnection(): Promise<void> {
        try {
            await DbConnection.sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch(error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    getConnection(): Sequelize {
        return DbConnection.sequelize;
    }
}

export default new DbConnection();

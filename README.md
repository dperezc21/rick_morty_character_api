# Rick and Morty Character API

This project is a Rick and Morty character API developed with Node.js.  
It allows queries using GraphQL with filters based on different criteria  
such as name, origin, status, species, and gender. Additionally,  
it implements a caching layer in Node.js to improve performance  
and uses a MySQL database for efficient storage, with Sequelize as the ORM.

## 🚀 Features

- 🔍 Character search using GraphQL.
- 🧠 In-memory caching to speed up responses.
- 🧬 Available filters: name, origin, status, species, gender
- 💾 MySQL database connected through Sequelize.
- 🌐 Connection to the public Rick and Morty API to fetch real-time information.
- ⏰ Cron job to update characters if there is any change in their information.


## 📦 Technologies Used

- **Node.js** - Server-side JavaScript runtime environment.
- **GraphQL** - Query language for APIs.
- **Sequelize** - ORM for Node.js compatible with MySQL.
- **MySQL** - Relational database management system.
- **Node Cache** - Tool for in-memory cache management.


## ⚙️ setting

1. Clone repository:
   ```
   git clone https://github.com/dperezc21/rick_morty_character_api.git
   cd rick_morty_character_api
   ```

2. Install dependencies 
   ```
    npm install
   ```

3. run project
   ```
   npm run start
   ```



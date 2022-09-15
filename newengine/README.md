# Strapi application
# How to create the project from scratch
## With MYSQL
### MYSQL
- Create user:`rinspector`, password:`rinspectorpw`
- Create database:`rinspector`
- port: 3306, locahost:'127.0.0.1'
### Prject Strapi
- Open GitBash
- Open project file `cd rIspector/apps`
- Run the command `npx create-strapi-app nwengine`
- Select `custom`
- Select `mysql`
- Enter user, password, database, localhost, and port
- Without SSL connection
- Last, open file `cd nwengine`
- Run the command `npm run develop`
- Database will be created in 'http://localhost:1337/admin/'
- Create the necessary tables for the project
## With SQLite3
- Open GitBash
- Open project file `cd rIspector/apps`
- Run the command `npx create-strapi-app nwengine --quickstart`
- Database will be created in 'http://localhost:1337/admin/'
- Create the necessary tables for the project
### How to run mysql strapi project with sqlite3
- Open project file `cd rIspector/apps/nwengine`
- Run the command `npm install`
- Run the command `npm install sqlite3 --save` and `npm fund`
- Path — ./config/database.js.
- Edit `database.js`: 
`module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'sqlite',
        filename: env('DATABASE_FILENAME', '.tmp/data.db'),
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});`
- Run the command `npm run develop`
### How to run sqlite3 strapi project with mysql
- Open project file `cd rIspector/apps/nwengine`
- Run the command `npm install`
- Run the command `npm install sqlite3 --save` and `npm fund`
- Path — ./config/database.js.
- Edit `database.js`: 
'module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'mysql',
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'rinspector'),
        username: env('DATABASE_USERNAME', 'rinspector'),
        password: env('DATABASE_PASSWORD', 'rinspectorpw'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {}
    },
  },
});'

## How run app
- Open project file `cd rIspector/apps/nwengine`
- Run the command `npm install sqlite3 --save` and `npm fund`
- Run The command `npm run develop`

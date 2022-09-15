# Run tests
## With SQlite3
- Run command `npm install jest supertest sqlite3 --save-dev`
- Once this is done add this to `package.json` file add `test` command to "scripts" section:
`"test": "jest --forceExit --detectOpenHandles"`
- And add those line at the bottom of file:
  '"jest": {
    "testPathIgnorePatterns": [
      "/node_modules/",
      ".tmp",
      ".cache"
    ],
    "testEnvironment": "node"
  }'
  - Then create `database.json` file on path `./config/env/test/database.json`. The whole file will look like this:
  {
  "defaultConnection": "default",
  "connections": {
    "default": {
      "connector": "bookshelf",
      "settings": {
        "client": "sqlite",
        "filename": ".tmp/test.db"
      },
      "options": {
        "useNullAsDefault": true,
        "pool": {
          "min": 0,
          "max": 1
        }
      }
    }
  }
}
## With MYSQL
- Run command `npm install jest supertest --save-dev`
- Once this is done add this to `package.json` file add `test` command to "scripts" section:
`"test": "jest --forceExit --detectOpenHandles"`
- And add those line at the bottom of file:
  '"jest": {
    "testPathIgnorePatterns": [
      "/node_modules/",
      ".tmp",
      ".cache"
    ],
    "testEnvironment": "node"
  }'
  - Then create `database.json` file on path `./config/env/test/database.json`. The whole file will look like this:
  {
  "defaultConnection": "default",
  "connections": {
    "default": {
      "connector": "bookshelf",
      "settings": {
        "client": "mysql",
        "filename": ".tmp/test.db",
        "host": "${process.env.DATABASE_HOST || '127.0.0.1'}",
        "port": "${process.env.DATABASE_PORT || 3306}",
        "database": "${process.env.DATABASE_NAME || 'rinspector1'}",
        "username": "${process.env.DATABASE_USERNAME || 'rinspector'}",
        "password": "${process.env.DATABASE_PASSWORD || 'rinspectorpw'}"
      },
      "options": {
        "useNullAsDefault": true,
        "pool": {
          "min": 0,
          "max": 1
        }
      }
    }
  }
}
## Execute test
- run command `npm run test`
### Exceute one test of a table
- ptah `./tests/app.test.js`, at the bottom of file uncomment one or more lines according to the test you want to perform:
//require('./user');
//require('./agent');
//require('./contractor');
//require('./customer');
//require('./inspector'); 
//require('./workOrder');
//require('./inspection'); 
//require('./reportConfigAmbient'); 
//require('./reportConfigSystem');
//require('./reportConfigSubsystem');
//require('./reportConfigItem');

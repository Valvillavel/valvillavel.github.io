## Create de proyect with ionic+angular
    1. install angular with the command:`npm install -g @angular/cli`
    2. install ionic cli:  `npm install -g @ionic/cli`
    3. for start a new proyect with ionic: run `ionic start newproject`
    3. open git bash 
    4. run `git clone git@github.com:RococoLabs/rInspector.git`
    5. run `cd rInspector/apps/newwebui`

## Add a dependecy
    into the folder newwebui:
        - run `npm install -D <packagename@^version>`

## Build
    - run `ionic build`

## Run Aplication
    - run `ionic serve`

## Change configs
    -
## Test
### Run all tests
    - Run the command `npm run test`
### Run specific test
    To run an individual or specific test:
    - Run the command `npm test -t <nameModule>`

# Deploy webpage with Firebase
    - Create an account on firebase
    - Create a proyect on firebase
    - Run the command `npm install -g firebase-tools` this command install firebase tools
    - Run the command `firebase login` 
    - Run the command `ng add @angular/pwa` this tool is useful for our app to be downloadable
    - Run the command `ionic build --prod --release` || `ionic build --aot --releas` this command will generate a file named 'www' necessary to deploy the app in a hosting and android/ios
    - Run the command `firebase init` select:
        -hosting
		- file 'www'
		- single-page (yes)
		- overwrite index (no) 
    - Run the command `firebase deploy`
    - then it wil return a link, this link is where our app is deployed
## How update deploy when we update the code
    -  Run the command `ionic build --prod --release || ionic build --aot --release`
    - Run the command `firebase deploy`




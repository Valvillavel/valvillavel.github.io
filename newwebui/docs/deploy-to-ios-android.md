# Ionic Capacitor
    - Run the command `npm install @capacitor/core`
    - Run the command `npm install @capacitor/cli --save-dev`
    - Run the command `npx cap init` then fill:
        -name app
        -name package
        (this will create the file capacitor.config.js)
    -  Run the command `ionic build --prod --release || ionic build --aot --release`
## Ionic build Android
    - Run the command `npm install @capacitor/android`
    - Run the command `npx cap add android`(this will create the folder for android)
    - Run the command `npx cap open android`(this will open the folder for android on Android Studio)
## Ionic build iOS
    - Run the command `npm install @capacitor/ios`
    - Run the command `npx cap add ios`(this will create the folder for iOS)
    - Run the command `npx cap open ios`(this will open the folder for iOS on Xcode)
## Update Android and IOS folders when code is update
    -  Run the command `ionic build --prod --release || ionic build --aot --release`
    - Run the command `npx cap sync`

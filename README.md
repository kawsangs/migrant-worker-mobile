# migrant-worker-mobile
And Android application for migrants who intent to work outside Cambodia. The content is in Khmer.

## Getting Start

### Prerequisites
- Make sure your environment is set up to run React Native applications. Follow the [React Native](https://facebook.github.io/react-native/docs/getting-started.html) instructions for getting started.
- Apps using Realm.
- React Native 0.62.0.
- Node version 8.3 or later.
- [Firebase console](https://console.firebase.google.com) account and add firebase to app(Android)

#### Clone repo
```
git clone https://github.com/hengsokly/migrant-worker-mobile.git
```
#### Firebase Analytic google-services.json
- Create [Firebase Console Account](https://firebase.google.com/)
- Create a project
- Add Android app to the project
- Download google-services.json
- Place the file to ```migrant-worker-mobile/android/app/google-servies.json```
- **Important**: You can read more on [react-native-firebase](https://rnfirebase.io/) and [Analytic](https://rnfirebase.io/analytics/usage)

#### Run the application
- Go to the repository
```
$cd migrant-worker-mobile
```
- Install dependencies
```
$npm install
```
- To start the application run
```
$react-native run-android
```
#### Build for Release
- If no existed keystore, you can create a new one, or use the exsited keystore and follow
[Build for release](https://reactnative.dev/docs/signed-apk-android)

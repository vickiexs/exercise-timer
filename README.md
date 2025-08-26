# Exercise Timer App ⏱️

A simple **exercise timer** built with **React Native**, **Expo**, and **TypeScript**.
This project demonstrates a basic exercise timer app with user configurable sets, reps, inter set rest
time, inter rep rest time and rep work time.

## Requirements

- Node.js (LTS recommended)
- npm (or yarn)
- Expo CLI (optional, installed globally for convenience)

## Setup

1. Clone the repository

   git clone https://github.com/vickiexs/exercise-timer
   cd exercise-timer

2. Install dependencies

Using npm:

npm install --legacy-peer-deps

## Running the app

Start Expo:

npm run start

Open on a device or simulator:

- Android: npm run android
- iOS: npm run ios
- Web: npm run web

Expo DevTools will open in the browser — you can scan the QR code with the Expo Go app or launch a simulator.

## Common troubleshooting

- Clear Metro cache and restart:

  npx expo start -c

- If you see React version mismatch warnings ("react" vs "react-native-renderer"), pin the `react` package to the renderer version and reinstall:

  npm install --save-exact react@19.0.0
  rm -rf node_modules package-lock.json
  npm install

- If native build errors occur after dependency changes, rebuild or reinstall the native app or clean derived data (iOS) / gradle caches (Android).

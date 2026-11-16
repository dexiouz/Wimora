# Wimora

A small mobile app for booking a hair braider. You browse and search braiders, open a braider's profile, pick a service and a time, enter your details, and get a confirmation screen.

Built with Expo (SDK 58), React Native and TypeScript.

## Running the app

You need Node.js 20 or newer. To run the app on a phone, also install the **Expo Go** app on it. To run it on your computer, you need the iOS Simulator (Xcode, macOS only) or an Android emulator (Android Studio).

```bash
npm install
npx expo start
```

When the dev server starts:

- **Phone:** scan the QR code with the Camera app (iOS) or with Expo Go (Android).
- **iOS Simulator:** press `i`.
- **Android emulator:** press `a`.

If the app shows an old screen or can't find the entry file, restart with a cleared cache:

```bash
npx expo start -c
```

To typecheck:

```bash
npx tsc --noEmit
```

## How the app works

There are four screens in one stack:

1. **Braider list:** all braiders, with search by name or specialty.
2. **Braider details:** profile, services with prices and durations, and available times.
3. **Booking:** choose a service and a time slot, then enter your name and phone number.
4. **Confirmation:** a summary of the booking.

The braiders are sample data in `src/data/braiders.ts`. There is no backend, and nothing is sent or charged.

## Project structure

```
index.ts                 Entry point: registers the root component
src/
  navigation/
    RootNavigator.tsx    The stack navigator and app-wide providers
    types.ts             Route names and the params each route takes
  screens/               One file per screen
  components/            Shared UI (cards, buttons, section titles)
  context/booking.tsx    Holds the current booking between screens
  data/braiders.ts       Sample braiders and a lookup helper
  constants/             Colors and spacing
  utils/format.ts        Price and duration formatting
```

## Main decisions

**React Navigation instead of Expo Router.** The Expo template uses Expo Router, which builds routes from files. I removed it and used React Navigation's native stack instead. The flow is a single linear stack, and declaring it in one place (`RootNavigator.tsx`) makes the whole flow easy to read at a glance. I'm on React Navigation v7, the version Expo SDK 58 supports.

**Typed routes.** `src/navigation/types.ts` lists every route and its params. Screens use `ScreenProps<"RouteName">`, so TypeScript catches a wrong route name, or a param that's passed under one name and read under another.

**Pass an ID between screens, not a whole object.** The detail and booking screens receive only a `braiderId` and look up the braider themselves. Params stay small, and the screens still work if the data later comes from an API. If no braider has that ID, the screen shows a "Braider unavailable" message with a way back to the list instead of crashing.

**React Context for the booking.** The booking screen saves the finished booking to a small context (`BookingProvider`), and the confirmation screen reads it from there. It's only one value shared by two screens, so a state library like Redux or Zustand would be more than it needs. The booking lives in memory only and is cleared when you go back to the list.

**Navigation that matches a real booking flow.** After you confirm, the booking screen is _replaced_ by the confirmation screen, and the back gesture and back button are turned off there. You can't swipe back into a form you've already submitted. "Back to braiders" resets the stack to the list.

**Validation on submit, with one clear message.** The form checks that you picked a service and a time, entered a name, and entered a phone number with 10 to 15 digits. The error appears above the button and clears as soon as you change something, so it isn't noisy while you type.

**Mobile details.** The booking form uses `KeyboardAvoidingView` so the keyboard doesn't cover the inputs. Inputs set the right keyboard type and autofill hints (name, phone). Lists use `FlatList`, and controls have accessibility labels. Colors and spacing live in one theme file, so the screens stay consistent.

## What I'd do next

- Load braiders and real availability from an API, with loading and error states.
- Save bookings to a backend.
- Mark taken slots as unavailable.

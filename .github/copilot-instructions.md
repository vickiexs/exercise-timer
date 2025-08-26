# Copilot instructions for exercise-timer (condensed)

Purpose: get an AI agent productive quickly in this Expo + React Native + TypeScript app.

1. Big picture

- Entry: `App.tsx` — loads Poppins fonts, wraps app with `ThemeProvider` (see `theme.ts`).
- Feature areas: `src/components/` (UI primitives) and `src/screens/` (flows). Two active flows:
  - `simple-timer/` — `configuration/` and `timer/` (primary app flow).
  - `workout/` — parallel/planned domain; contains earlier modal/config patterns.
- Keep UI primitives consistent: components under `src/components/*` are small, themed, and composable.

2. Theming & styled patterns (must follow)

- Theme lives in `theme.ts`. When adding theme keys, also update `src/types/styled.d.ts`.
- Use theme helpers instead of literals:
  - colors: `theme.palette.primary.main`, `secondary.main`, `tertiary.main`, `background`, `white`, `black`, `grey`
  - spacing: `theme.spacing(n)` returns a px string
  - font sizes: `theme.fontSize(n)` returns a number
  - radii: `theme.borderRadius.small|medium|large`
- styled-components: use object-style callbacks only — e.g. `styled(View)(({ theme }) => ({ ... }))`. Do not add template literal CSS.

3. Component conventions

- Buttons: `src/components/button/` exports a base `Button` and variants like `PrimaryButton`/`SecondaryButton`. Follow the pattern for disabled styling and props.
- Inputs: `src/components/input/` composes Label + styled TextInput. Numeric inputs use `centreText` and `keyboardType="numeric"`.
- Layout: prefer `src/components/layout/Container` for screen padding & background.
- Modal: `src/components/modal/index.tsx` manages Android nav bar (expo-navigation-bar). Follow that pattern for full-screen overlays.

4. Timer & configuration patterns

- Timer state & logic live in `src/screens/simple-timer/timer/index.tsx`. When reading it, note:
  - Destructures config: `{ sets, reps, interSetRest, interRepRest, repWorkTime }` at top.
  - Uses setInterval controlled by ref + `isRunning` boolean.
  - Transitions (work → rest → rep → set) are colocated in the timer screen.
  - Ticking/vibration example: `Vibration.vibrate(120)` for last 3 seconds (see `playTick()`).
- Configuration screens collect local transient state — e.g. `src/screens/simple-timer/configuration/index.tsx`. Do not add global state unless asked.
- Keyboard handling: configuration screens use `KeyboardAvoidingView` + `ScrollView` with `keyboardShouldPersistTaps="handled"` (see `configuration/index.tsx`).

5. Navigation & Android back handling

- Uses `@react-navigation/native`. Screens navigate via `navigation.navigate("RouteName")`.
- Success flow: timer navigates to `Success` when complete (see `src/screens/success/index.tsx`).
- Android hardware back: handle inside screen with `useFocusEffect` + `BackHandler` to control behavior while focused (example pattern used/expected in screens). Return `true` to block default.

6. TypeScript & typings

- Project uses strict TS. Add explicit `type.ts` for new screens/components where appropriate.
- Theme augmentation: `src/types/styled.d.ts` — update together with `theme.ts` changes.
- Avoid `any`. If temporarily used, add a TODO comment explaining why.

7. Developer workflows & commands

- Expo-managed project. Use package.json scripts:
  - npm: `npm run start`, `npm run ios`, `npm run android`
  - yarn equivalents: `yarn start`, `yarn ios`, `yarn android`
- Do not modify native Android/iOS files unless absolutely necessary.

8. Where to look first when editing

- UI primitives: `src/components/*`
- Theme & types: `theme.ts`, `src/types/styled.d.ts`
- Timer logic: `src/screens/simple-timer/timer/index.tsx`
- Configuration form: `src/screens/simple-timer/configuration/index.tsx`

9. Non-obvious gotchas & rules

- Never use RN's built-in `Button` for new work — use the project's `TouchableOpacity` button variants.
- Keep theming consistent: never hardcode theme colors or font families if theme provides them.
- When adding theme keys, update font-loader in `App.tsx` if adding font weights.
- Prefer immutable updates for timer state transitions and keep transition logic colocated inside timer screen until a domain model exists.

10. Examples (copy when appropriate)

- Destructure config in timer: `const { sets, reps, interSetRest, interRepRest, repWorkTime } = workoutConfig;`
- PrimaryButton disabled styling example lives in `src/components/button/styled.ts`.
- Keyboard-aware config screen: wrap in `KeyboardAvoidingView` (behavior='padding' on iOS) + `ScrollView`.

If anything is unclear or you want more detail about the timer model, navigation stacks, or theming keys, say which area to expand and I will iterate.

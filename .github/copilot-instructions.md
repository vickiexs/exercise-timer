# Copilot Instructions for exercise-timer

Purpose: Help AI agents make fast, correct contributions to this Expo + React Native + TypeScript app. Focus on project-specific patterns, theming, and where to add logic so changes fit the existing architecture.

1. Big picture

- Entry: `App.tsx` loads Poppins fonts and wraps the app in `ThemeProvider` using `theme.ts`.
- UI primitives live under `src/components/` (button, input, layout, modal, typography). Each component typically contains `index.tsx`, `styled.ts`, and `type.ts` when types are needed.
- Screens are under `src/screens/`. Two active feature flows:
  - `simple-timer/` — contains `configuration/` and `timer/` flows used by the app today.
  - `workout/` — planned/parallel domain (configuration modal patterns live here in earlier drafts).
- Domain types for simple timer are in `src/screens/simple-timer/type.ts` (use these types when wiring screens together).

2. Theming & styling (important)

- Theme: `theme.ts`. Keep `src/types/styled.d.ts` in sync whenever adding theme keys.
- Use theme helpers rather than literals:
  - Colors: `theme.palette.*` (primary.main, secondary.main, tertiary.main, background, white, black, grey)
  - Spacing: `theme.spacing(n)` returns px string; prefer this for padding/margins
  - Font sizes: `theme.fontSize(n)` returns a number used for fontSize
  - Radii: `theme.borderRadius.small|medium|large`
- Files that demonstrate usage: `src/components/layout/styled.ts`, `src/components/input/styled.ts`, `src/components/typography/styled.ts`.

3. Styled-components conventions

- Prefer object-style callbacks: styled(View)(({ theme }) => ({ ... })) — do not introduce template literal CSS for new work.
- Never hardcode theme colors or font families when an equivalent theme value exists.
- When adding new theme keys, update both `theme.ts` and `src/types/styled.d.ts` in the same change.

4. Component & file patterns

- Buttons: `src/components/button/` uses a styled `TouchableOpacity` as `Button` base and separate variants (`PrimaryButton`, `SecondaryButton`). Example: `PrimaryButton = styled(Button)<{ disabled?: boolean }>(( { theme, disabled }) => ({ backgroundColor: theme.palette.primary.main, opacity: disabled ? 0.5 : 1 }))`.
- Inputs: `src/components/input/` contains `Input` which composes a Label and a styled TextInput. Numeric inputs use `centreText` prop and `keyboardType="numeric"`.
- Layout: use `src/components/layout/Container` to preserve padding and background color.
- Modal: `src/components/modal/index.tsx` manages Android nav bar via `expo-navigation-bar`. Follow that pattern for full-screen overlays.

5. Screens and state

- Configuration screens collect transient state locally (e.g., `src/screens/simple-timer/configuration/index.tsx`). They should not introduce global state unless requested.
- Timer implementation lives in `src/screens/simple-timer/timer/index.tsx`. It currently:
  - Destructures config: `{ sets, reps, interSetRest, interRepRest, repWorkTime }` and initializes local state
  - Uses setInterval managed via a ref and `isRunning` boolean
  - Vibrates on the last 3 seconds (see `playTick()` using `Vibration.vibrate(120)`).
- When adding new timed logic, prefer immutable updates and keep transitions (work→rest→rep→set) colocated inside the timer screen until a domain model exists.

6. Patterns for keyboard handling

- Use `KeyboardAvoidingView` + `ScrollView` in configuration screens to avoid the native keyboard covering inputs. See `src/screens/simple-timer/configuration/index.tsx` for the current pattern.

7. Navigation & success flow

- Uses `@react-navigation/native`. Timer navigates to `Success` when complete (`navigation.navigate("Success")`). If adding new routes, update navigation stacks in `App.tsx`/navigation entry.

8. Tooling & runtime commands

- Start the app with the existing scripts in `package.json`:
  - npm: `npm run start` (or `npm run ios` / `npm run android`)
  - yarn: `yarn start` (or `yarn ios` / `yarn android`)
- Project is Expo-managed (see `expo` dependency); avoid modifying native Android/iOS files unless necessary.

9. TypeScript & typings

- Strict TS is enabled. Add explicit prop `type.ts` files for new components/screens.
- Theme augmentation is in `src/types/styled.d.ts` — update whenever `theme.ts` changes.
- Avoid `any`; if temporary, add a TODO explaining why.

10. Quick examples (copy when appropriate)

- Destructure config at top of timer:
  - const { sets, reps, interSetRest, interRepRest, repWorkTime } = workoutConfig;
- Primary button disabled styling:
  - export const PrimaryButton = styled(Button)<{ disabled?: boolean }>(({ theme, disabled }) => ({ backgroundColor: theme.palette.primary.main, opacity: disabled ? 0.5 : 1 }));
- Keyboard-aware configuration screen:
  - Wrap in KeyboardAvoidingView (behavior = 'padding' on iOS) and a ScrollView with keyboardShouldPersistTaps="handled".

11. Where to look first when editing

- UI primitives: `src/components/*` for consistent styling patterns
- Theme & types: `theme.ts` and `src/types/styled.d.ts`
- Timer logic: `src/screens/simple-timer/timer/index.tsx`
- Configuration form: `src/screens/simple-timer/configuration/index.tsx`

12. Non-obvious gotchas

- Do not style RN's built-in `Button` — use the project's `TouchableOpacity` variants.
- When adding theme values, missing font weights in `App.tsx` font-loader will cause runtime fallback.
- Avoid template-style styled-components when modifying files that currently use the object callback pattern.

If anything here is unclear or you want more detail about the planned timer mechanics or data model (e.g., Exercise domain model), tell me which area to expand and I will iterate.

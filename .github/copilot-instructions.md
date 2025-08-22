# Copilot Instructions for exercise-timer

Purpose: Enable AI agents to make fast, consistent contributions to this Expo + React Native + TypeScript app. Follow these project-specific patterns (avoid generic boilerplate advice).

## 1. Architecture & Flow

- Entry: `App.tsx` loads fonts (Poppins) and wraps the app in `ThemeProvider` with `theme.ts`.
- Primary feature domain: `src/screens/workout/`.
  - `configuration/` screen collects workout parameters and opens an exercise/rest modal.
  - Future flow (timer execution) will live under `src/screens/workout/timer/` (currently empty).
- Reusable UI primitives in `src/components/` (e.g., `button`, `input`, `modal`). Each component: `index.tsx`, optional `styled.ts(x)`, `type.ts`.
- The workout configuration screen manages transient modal form state locally (not yet persisted to a store).

## 2. Theming & Styling

- Theme definition: `theme.ts`; types: `src/types/styled.d.ts` (keep in sync when adding keys).
- Palette keys (current): `primary.main`, `secondary.main`, `tertiary.main`, `background`, `white`, `black`, `grey`.
- Fonts: `theme.fonts.family = 'Poppins'`; weights: `regular`, `medium`; sizes: `large|medium|small`.
- Spacing helper: `theme.spacing(n)` returns rem-like string; use for padding/margins instead of literals where possible.
- Always reference theme inside styled callbacks: `({ theme }) => ({ ... })`.
- Avoid mutating `Text.defaultProps`; rely on styled components pulling `theme.fonts.family`.

## 3. Styled Component Conventions

- Use object style syntax (`styled(View)(({ theme }) => ({ ... }))`) not template strings (legacy code exists—prefer object when touching files).
- Never hardcode colors or font families if a theme value exists.
- Use theme radii: `borderRadius.small` / `borderRadius.large`.
- Keep layout primitives minimal; compose instead of prop-heavy components.

## 4. Components & Patterns

- Buttons: `src/components/button/` wraps a styled `TouchableOpacity` (do NOT style RN `Button`—it ignores most styles). Variants handled via separate styled components (`PrimaryButton`, `SecondaryButton`).
- Inputs: `src/components/input/` centralizes input styling (centered numeric fields, consistent borders, font, and sizing).
- Modal: `src/components/modal/` uses `Modal` + blur/dim + card (`ContentCard`) and manages Android nav bar transparency (see `expo-navigation-bar` usage). When adding new modal content, just pass children.

## 5. Workout Configuration Screen Structure

- File: `src/screens/workout/configuration/index.tsx`.
- Uses: `InputRow`, `InputLabel`, `InputContainer`, `WorkoutPlanSection`, modal-driven form for exercises/rest.
- Modal form local state: `exerciseName`, `repMode` ("duration" | "count"), `repValue`, `restDuration`.
- Future enhancement: persist added exercises to a list inside `WorkoutPlanContainer` (currently placeholder text).

## 6. Adding Data Logic (When Implemented)

- Prefer introducing a lightweight domain model (e.g., `Exercise { id, name, type: 'duration'|'count', value, restAfter? }`) in a new `src/domain/` folder before wiring timers.
- Maintain immutable arrays when updating plan state (avoid in-place mutation for easier future state management / potential context integration).

## 7. Navigation & System UI

- Android navigation bar styling handled in `modal/index.tsx` via `expo-navigation-bar`. Preserve or extend this pattern if adding other full-screen overlays.
- For new full-screen screens, ensure background color is `theme.palette.background` so transparent system bars blend correctly.

## 8. Code Style & TypeScript

- Strict TS mode is enabled; favor explicit prop interfaces (`type.ts`).
- When extending theme, update both `theme.ts` and `styled.d.ts` in the same PR/commit.
- Avoid `any`; if temporary, document with a TODO comment.

## 9. Common Pitfalls (Project-Specific)

- Styling RN `Button` won’t work—always use custom `TouchableOpacity` variants.
- Forgetting to load new font weights in `App.tsx` while adding them to theme causes runtime fallback (ensure both sides updated).
- Hardcoded dimensions without spacing utility create inconsistency—prefer `theme.spacing()` for padding/margins.
- Android nav bar may override transparency if not updated through `expo-navigation-bar` when presenting overlays.

## 10. Example Snippets

Button variant pattern:

```ts
export const PrimaryButton = styled(ButtonBase)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.borderRadius.large,
}));
```

Typography example:

```ts
export const SectionTitle = styled(Text)(({ theme }) => ({
  fontFamily: theme.fonts.family,
  fontWeight: theme.fonts.weights.medium as any,
  fontSize: theme.fonts.sizes.medium,
  color: theme.palette.white,
}));
```

Modal usage:

```tsx
<AppModal visible={show} onClose={() => setShow(false)}>
  <CustomForm />
</AppModal>
```

## 11. When In Doubt

- Search existing styled files for pattern reuse.
- Keep new logic colocated; refactor only once feature boundaries emerge.
- Ask to clarify intended data flow before introducing global state.

Please review and indicate any missing domain details (e.g., planned timer mechanics) you want documented.

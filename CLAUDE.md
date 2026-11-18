# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

FitVerse is a fitness social app: one Express + MongoDB API (`backend/`) serving a React web app (`frontend/`) and an Expo / React Native app (`mobile/`). These are three independent npm projects with no root `package.json` or workspaces, so install and run everything inside each folder.

- Live: web at <https://fitverse.codewithxjohn.com>, API at <https://api.fitverse.codewithxjohn.com>, iOS through TestFlight (EAS).
- The code was generated in 2025 with an older AI tool and predates the owner's current conventions (see [Legacy patterns](#legacy-patterns)).
- Some sections of `README.md` are still out of date: the root-level "Full Stack Development" commands, parts of the project tree, and some security notes. Trust the code and this file.

## Commands

|           | backend/                                                                             | frontend/                                | mobile/                                  |
| --------- | ------------------------------------------------------------------------------------ | ---------------------------------------- | ---------------------------------------- |
| Dev       | `docker compose up -d --build` (repo root: MongoDB + API with hot reload, port 5000) | `npm run dev` (Vite, port 5173)          | `npx expo start` (`-c` clears the cache) |
| Typecheck | `npm run build` (tsc → `dist/`)                                                      | `npm run build` (`tsc -b && vite build`) | `npx tsc --noEmit`                       |
| Lint      | broken: ESLint isn't installed and has no config                                     | `npm run lint`                           | `npm run lint` (expo lint)               |
| Tests     | `npm test` (Jest + ts-jest + supertest)                                              | none (`npm test` is a stub)              | none                                     |

- Run a single backend test with `npx jest __tests__/health.test.ts` or `npx jest -t "<test name>"`. The only test file is `backend/__tests__/health.test.ts`. It mounts routes on a bare Express app and needs no database.
- Lint is not a clean baseline: the web app has about 150 problems (mostly `no-explicit-any`) and mobile about 85. CI runs neither lint nor tests. Its only check is the TypeScript compile inside the Docker builds.
- Mobile runs in Expo Go, because `expo-dev-client` isn't installed. Press `i` for the iOS Simulator, where Expo installs the matching Expo Go. The App Store's Expo Go only supports the newest SDK, so a physical iPhone needs a TestFlight build: `npm run testflight` (EAS build and submit; build numbers are remote and auto-incremented).
- `npm run seed:users` (backend) inserts 1,000 fake users who share the password `Password123!` into whatever database `MONGO_URI` points at.
- There's no Prettier config. Match the surrounding file (mostly 4-space indent and single quotes).

## Local environment

- The backend loads `.env.production` when `NODE_ENV=production` and `.env.development` otherwise (the keys are listed in `backend/.env.example`). The web app reads `frontend/.env` (`VITE_MODE`, `VITE_BACKEND_URL`). Mobile has no env file.
- **Local dev stack:** `docker-compose.yml` at the repo root runs MongoDB 8 and the API. `docker compose up -d --build` starts both, and `docker compose stop` stops them. There's no restart policy, so they stay stopped after Docker restarts.
  - `mongodb` is bound to `127.0.0.1:27017` and keeps its data in the `fit-verse_mongodb-data` volume. The exercise library (46 documents) was copied from production on 2026-11-18. Everything else starts empty, and `npm run seed:users` is safe to run against it.
  - `backend` is built from `backend/Dockerfile.dev` and runs `npm run dev` (nodemon + ts-node) with `./backend` mounted at `/app`, so saving a file restarts it. An anonymous volume keeps the container's own `node_modules`, so after changing dependencies, run `docker compose up -d --build --renew-anon-volumes`.
  - The container reads `backend/.env.development` through `env_file`, and Compose overrides `MONGO_URI` to `mongodb://mongodb:27017/fit-verse`. `dotenv` never overwrites variables that are already set, so the app keeps Compose's values.
  - To run the API on the host instead, start only the database (`docker compose up -d mongodb`), then run `npm run dev` in `backend/`. That uses `.env.development`'s `mongodb://127.0.0.1:27017/fit-verse`. Use `127.0.0.1`, not `localhost`: Node can resolve `localhost` to IPv6 `::1`, where Docker isn't listening. Don't run both at once, since they share port 5000.
- **Production database:** `backend/.env.production` holds a working Atlas login for the live database, so anything that reads it (for example, running with `NODE_ENV=production`) changes real data. The deployed API gets its own login from the GitHub secret `MONGO_URI`.
- **Dev ports:** the API listens on 5000 and the web app on 5173. Vite has `strictPort` set, so it exits instead of moving to another port; that matters because the backend's Socket.IO origin list expects exactly 5173.
  - The web `.env` points at `localhost:5000`.
  - Mobile development runs use port 5000 too: `localhost` on the iOS Simulator, `10.0.2.2` on the Android emulator.
  - If the backend fails with `EADDRINUSE`, find what's holding the port with `lsof -nP -iTCP:5000 -sTCP:LISTEN`. On macOS, AirPlay Receiver can also take 5000.
- **Mobile API target:** `mobile/lib/apiConfig.ts` chooses it, so nothing needs switching before a release. `npx expo start` (`__DEV__` is true) uses the local backend. Release builds (EAS / TestFlight) use the live API, which the `production` profile in `mobile/eas.json` also pins with `EXPO_PUBLIC_API_URL`. To point a development run elsewhere (the live API, or a LAN IP for a physical phone), set `EXPO_PUBLIC_API_URL` in `mobile/.env.local`, which git ignores, and restart Expo.

## Backend architecture

- **Layout:** `routes/` → `controllers/` → `models/` (Mongoose). There's no service layer, so business logic lives in the controllers. Every route is under `/api/*` (mounted in `index.ts`), and `/api/users` is mounted twice (`userRoutes` and `blockRoutes`). The REST style is mixed: workouts, templates and folders use HTTP verbs on resources, while nutrition, posts and auth use action paths like `/add`, `/delete/:id` and `/create`.
- **Boot order matters:** `index.ts` calls `dotenv.config()` before importing `config/socket.io.ts`. That module reads env at import time and creates the Express `app`, the HTTP `server` and Socket.IO's `io`. This only works because the build is CommonJS (`module: Node16`, no `"type": "module"`), so keep the order.
- **Auth:** login and register set a 30-day JWT in the httpOnly cookie `fit-verse-token` (`utils/generateToken.ts`). It uses `sameSite: 'none'` in production because the web app and API are on different subdomains. `protect` loads `req.user` (without the password), `optionalAuth` attaches it when present, and `admin` checks `req.user.admin`. There are no refresh tokens. The mobile app uses the same cookie through the native cookie store. Take the acting user's identity from `req.user`, never from request params or the body.
- **Errors and response shapes are inconsistent:**
  - Controllers wrapped in `express-async-handler` set `res.status()` and then `throw`. `middlewares/errorMiddleware.ts` turns that into `{ success: false, error, message, path, method, timestamp, stack? }`.
  - The workout, template, folder, nutrition, custom-category, report and block controllers catch their own errors and respond with `{ success, data, message }` or a bare `{ message }`.
  - Others return raw documents.

  Check the specific controller before writing client code against it.
- **Images:** clients send base64 data URIs inside JSON, which is why the body limit is 50 MB. Controllers upload them to Cloudinary (`fit-verse/users`, `fit-verse/posts` and `fit-verse/exercises`; message images go to the account root) and store the `secure_url`.
- **Realtime:** after connecting, clients emit `user-online` with their user ID. `config/socket.io.ts` keeps a userId → socketId map in memory and broadcasts `online-users`. Controllers emit `new-message` with `io.to(getReceiverSocketId(id))`. They send an Expo push notification (`utils/pushNotifications.ts`, one `expoPushToken` per user) only when the receiver has no connected socket.
- **External APIs:** FatSecret is proxied server-side with OAuth 1.0 signing (`controllers/fatSecretController.ts`). Its credentials are read from env at request time.
- **Health:** `/api/health` returns an HTML page with status 200 even when MongoDB is disconnected. The Kubernetes probes use it.

### Data model gotchas

- Each model names its owner field differently: `userId` (Workout, WorkoutTemplate, WorkoutTemplateFolder), `user` (NutritionEntry, CustomCategory, SupportTicket), `author` (Post), `senderId`/`receiverId` (Message), `from`/`to` (Notification), `reporter`/`reportedUser` (Report). Check the schema before writing a query.
- `Workout.templateId` references `'Template'`, which isn't a registered model (the model is `WorkoutTemplate`), so populating it fails.
- Workout set weights are stored in **lbs**. `workoutController` converts them on create (user's unit → lbs) and on read (lbs → `user.weightUnit`) with `utils/weightConversion.ts`. `updateWorkout` doesn't convert. A template's `targetWeight` is stored as typed and never converted.
- Clients send a nutrition `date` as `YYYY-MM-DD`, and the server turns it into a day range in its own timezone (UTC in Kubernetes). Without a `date`, the server uses its own "today".
- Users can have at most 3 custom meal categories (the controller enforces this).
- Registering automatically follows the `xjohnfit` account (`authController.registerUser`).
- Blocking is enforced by hand in every query that returns other users' content (feeds, user posts, messages, suggestions), in both directions (`blockedUsers` on either user). Any new query of that kind needs the same filter.
- Account deletion is a manual cascade in `authController.deleteUser`. Add any new user-owned collection there.
- The User `pre('save')` hook hashes passwords, but `insertMany` skips it (the seed script pre-hashes for that reason).

## Web architecture (frontend/)

- A React 19 single-page app built with Vite 7 and served by nginx in production (rendered in the browser, with an SPA fallback in `nginx.conf`).
- **Routing:** React Router 7 in data mode. Every route is declared in `src/main.tsx` with `createBrowserRouter`. `App.tsx` is the layout (Header, Footer, Toaster) and starts the socket. Protected routes are children of `components/common/PrivateRoute.tsx`, which only checks Redux `isAuthenticated`.
- **State:** Redux Toolkit.
  - The `auth` slice mirrors the logged-in user into localStorage `userInfo`. Dispatch `setCredentials` after any profile change to keep it in sync.
  - The `socket` slice holds the online users.
  - Server data goes through RTK Query. `src/slices/apiSlice.ts` defines the base query and cache tags, and each feature file adds endpoints with `apiSlice.injectEndpoints`.
- **API base URL:** `VITE_MODE=development` uses `${VITE_BACKEND_URL}/api`, and anything else uses the hard-coded production API. So production builds need no env vars, and CI builds without any.
- **UI:**
  - Styling: Tailwind CSS v4, configured in CSS (`src/index.css`, `@theme inline`).
  - Components: shadcn/ui (new-york style) in `components/ui/`, plus a few Aceternity registry components.
  - Also: class-based dark mode via next-themes (default dark), sonner toasts and lucide icons.
  - The path alias `@/` points at `src/`.
- Screens are grouped by feature in `src/screens/protected/<feature>/`, each with a `components/` folder and a `<feature>.types.ts`.
- The in-progress workout timer lives in sessionStorage (`workout_*` keys).

## Mobile architecture (mobile/)

- Expo SDK 54 and React Native 0.81 (New Architecture), with Expo Router 6, typed routes and the React Compiler (both switched on in `app.json` under `experiments`). The native `ios/` and `android/` folders are gitignored, and EAS generates them at build time.
- `app/_layout.tsx` is the root Stack. It restores `userInfo` from AsyncStorage, refreshes the profile from the API, registers the Expo push token, and sets the app's only notification handler. The tabs live in `app/(tabs)/` (dashboard, profile, chat, nutrition, workout), and `settings` is hidden from the tab bar with `href: null`.
- The Redux setup matches the web app. Use `hooks/useRedux.ts` (`useAppSelector`, `useAppDispatch`). `authSlice` writes to AsyncStorage inside its reducers, and `slices/apiSlice.ts` logs the user out on any 401.
- **Backend URL:** `lib/apiConfig.ts` is the only place that chooses it. `slices/apiSlice.ts` (REST, re-exported as `baseUrl` for a few slices) and `hooks/useSocket.ts` (Socket.IO) both import from it.
- **Styling:** each component has a StyleSheet module at `styles/<area>/<Name>Styles.ts` that default-exports `createStyles(isDark)`. Components call it with `useColorScheme()` inside `useMemo`. Colors are hard-coded hex values with no theme tokens. NativeWind isn't set up, although `tsconfig.json` still lists `nativewind-env.d.ts`.
- **AsyncStorage keys:** `userInfo`, the in-progress workout (`workout_start_time`, `workout_exercises`, `workout_active_rest_timer`, …), and 24-hour chat caches named `messages_cache_<idA>_<idB>` (`lib/messageCache.ts`).
- **Notifications:** call `Notifications.setNotificationHandler` only in `app/_layout.tsx`. The handler is global, and a second call replaces it. On iOS, a notification without `content.sound` plays no sound.

## Code duplicated between web and mobile

The RTK Query slices exist twice (`frontend/src/slices/` and `mobile/slices/`), and the copies have drifted apart. Mobile has no `supportApiSlice`. Types are duplicated too: web keeps them in `screens/**/<feature>.types.ts` and mobile in `types/`. Mirror any API change in both clients.

## Deployment

- Every push to `main` runs `.github/workflows/deploy.yml`:
  1. Trivy security scan (doesn't fail the build).
  2. Build and push `xjohnfit/fitverse-backend` and `xjohnfit/fitverse-frontend` to Docker Hub.
  3. Recreate the Kubernetes secret `fitverse-secrets` from the GitHub secrets.
  4. `kubectl apply` the `kubernetes/` manifests.
  5. Point the deployments at the `main-<short sha>` images and wait for the rollout.

  Only changes limited to `kubernetes/**`, `README.md` or `.gitignore` skip the workflow, so mobile-only commits still redeploy the web app and API.
- **Cluster:** a Traefik ingress with cert-manager (Let's Encrypt).
  - Backend: 2 replicas on port 5000. Its env comes from the deployment manifest and the secret, never from `.env` files.
  - Frontend: nginx on port 8080 behind a port-80 service.
- Socket.IO state is kept in memory in each pod, with no adapter and no sticky sessions. So with 2 replicas, a socket connected to one pod doesn't see events emitted from the other. Check this first when debugging live messages or online status.
- Mobile ships separately through EAS (`npm run testflight`), not through CI.

## Legacy patterns

The code predates the owner's current defaults. Point these out when you touch them, but don't refactor wholesale unless asked:

- **Config and validation:** `process.env` is read all over the code (often with `!`), and there's no zod-validated env module. Request bodies are checked with ad hoc `if` statements instead of zod.
- **Missing infrastructure:** no helmet, no rate limiting, no error monitoring, and `console.log` instead of structured logging.
- **Outdated tooling:** `express-async-handler` (unnecessary on Express 5), and ts-node + nodemon instead of tsx.
- **Typing:** `any` is widespread, and most RTK Query endpoints are untyped `builder.query({...})` calls.
- **Old versions:** the Docker images use Node 20 (end of life April 2026), and mobile is on Expo SDK 54 (the latest is 58).
- **Missing tests:** the web and mobile apps have none.

import { Platform } from 'react-native';

// The live API, used by every EAS build (TestFlight / App Store).
const PRODUCTION_SERVER_URL = 'https://api.fitverse.codewithxjohn.com';

/**
 * Decides which backend the app talks to, so a release build can never ship
 * pointing at a local server:
 * - EXPO_PUBLIC_API_URL wins when set. Put it in mobile/.env.local (git ignores
 *   that file): for example the live API to test with real data, or your Mac's
 *   LAN IP when running on a physical phone. Restart `npx expo start` after
 *   changing it.
 * - Release builds (__DEV__ is false): the live API.
 * - Development (`npx expo start`, __DEV__ is true): your local backend on port 5000.
 */
const getServerUrl = (): string => {
    const override = process.env.EXPO_PUBLIC_API_URL;
    if (override) {
        return override.replace(/\/+$/, ''); // drop any trailing slash
    }

    if (!__DEV__) {
        return PRODUCTION_SERVER_URL;
    }

    // The Android emulator reaches your computer at 10.0.2.2, the iOS Simulator at localhost.
    return Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000';
};

// Base URL for Socket.IO
export const SERVER_URL = getServerUrl();

// Base URL for REST requests
export const API_URL = `${SERVER_URL}/api`;

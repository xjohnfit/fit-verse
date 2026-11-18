import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@/lib/apiConfig';

// Chosen in lib/apiConfig.ts: your local backend in development, the live API in EAS builds
const baseUrl = API_URL;

// Export baseUrl for other slices that need direct fetch
export { baseUrl };

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, _api) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: [
        'User',
        'Posts',
        'Workout',
        'Exercise',
        'Nutrition',
        'CustomCategory',
        'WorkoutTemplate',
        'WorkoutTemplateFolder',
        'Notification',
        'Message',
        'Food',
        'FoodSuggestions',
        'Report',
        'Block',
    ],
    endpoints: (_builder) => ({}),
});

export default apiSlice;

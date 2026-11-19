import {
    createApi,
    fetchBaseQuery,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { clearCredentials } from './authSlice';
import { API_URL } from '@/lib/apiConfig';

// Chosen in lib/apiConfig.ts: your local backend in development, the live API in EAS builds
const baseUrl = API_URL;

// Export baseUrl for other slices that need direct fetch
export { baseUrl };

const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, _api) => {
        headers.set('Content-Type', 'application/json');
        return headers;
    },
});

// Any request that comes back unauthorized means the session/token is no
// longer valid on the server, so log the user out instead of leaving
// screens stuck waiting on data that will never arrive.
const baseQueryWithAuthHandling: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        api.dispatch(clearCredentials());
        api.dispatch(apiSlice.util.resetApiState());
    }

    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithAuthHandling,
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

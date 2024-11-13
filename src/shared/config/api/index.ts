import { AuthPath, AuthRefreshTokenResponse, Profile } from '@/entities';
import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
    async (config) => {
        let token = Cookies.get('access_token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (config.data && config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
        } else {
            config.headers['Content-Type'] = 'application/json';
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error?.config;
        if (error?.response?.status === 401 && !originalRequest?._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = Cookies.get('refresh_token');
                const profile: Profile = JSON.parse(Cookies.get('profile') || "{}");
                const { data } = await axios.post<AuthRefreshTokenResponse>(AuthPath.refreshToken,
                    {
                        token: refreshToken,
                        login: profile.login
                    });
                Cookies.set('refresh_token', data.refreshToken);
                Cookies.set('access_token', data.authenticationToken);
                Cookies.set('profile', JSON.stringify(data));
                api.defaults.headers.common['Authorization'] = `Bearer ${data.refreshToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token expired. Logging out.');
                Cookies.remove('access_token');
                Cookies.remove('refresh_token');
            }
        }
        return Promise.reject(error);
    }
);

import axios from 'axios';
import {
  getAccessTokenFromCookie,
  getRefreshTokenFromCookie,
  saveAccessTokenToCookie,
  saveRefreshTokenToCookie,
} from '@/utils/authUtil';
import { SignupParam, SignupResp } from './auth/signupParam';
import { LoginParam, LoginResp } from './auth/loginParam';
import { CreateNewTierListParam } from './tierList/createTierList';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/',
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(config => {
  const token = getAccessTokenFromCookie();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


let isRefreshing = false;
interface FailedQueuePromise {
  resolve: (value: unknown) => void;
  reject: (error: any) => void;
}

let failedQueue: FailedQueuePromise[] = [];

const processQueue = (error: unknown, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return axios(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshTokenFromCookie();
      if (!refreshToken) {
        window.location.href = '/LoginPage';
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/regenerateTokens`,
          {},
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data;
        saveAccessTokenToCookie(newAccessToken);
        saveRefreshTokenToCookie(newRefreshToken);

        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        return apiClient(originalRequest);

      } catch (refreshError) {
        processQueue(refreshError, null);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);



export const api = {

  //Auth Api
  signup: async (params: SignupParam): Promise<SignupResp> => {
    const response = await apiClient.post<SignupResp>('/auth/signup', params);
    return response.data;
  },

  login: async (params: LoginParam): Promise<LoginResp> => {
    const response = await apiClient.post<LoginResp>('/auth/login', params);
    return response.data;
  },

  logout: async (): Promise<any> => {
    const response = await apiClient.post<any>('/auth/logout');
    return response.data;
  },

  //Tier List Api
  createNewTierList: async (params: CreateNewTierListParam): Promise<any> => {
    const response = await apiClient.post<any>('/tierlists/create-tier-list', params);
    return response.data;
  },

};


import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

/**
 * The shape of the data decoded from the JWT access token.
 */
export interface DecodedToken {
  sub: number; // Subject (usually the user ID)
  username: string;
  tokenVersion: number;
}

const cookieOptions = {
  expires: 30, // Expire in 30 days
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
};

// --- Access Token ---
export function saveAccessTokenToCookie(token: string): void {
  // Access token can have a shorter expiry if you wish, e.g., expires: 1/24 (1 hour)
  Cookies.set(ACCESS_TOKEN_KEY, token, cookieOptions);
}

export function getAccessTokenFromCookie(): string | undefined {
  return Cookies.get(ACCESS_TOKEN_KEY);
}

export function removeAccessTokenFromCookie(): void {
  Cookies.remove(ACCESS_TOKEN_KEY);
}

// --- Refresh Token ---
export function saveRefreshTokenToCookie(token: string): void {
  Cookies.set(REFRESH_TOKEN_KEY, token, cookieOptions);
}

export function getRefreshTokenFromCookie(): string | undefined {
  return Cookies.get(REFRESH_TOKEN_KEY);
}

export function removeRefreshTokenFromCookie(): void {
  Cookies.remove(REFRESH_TOKEN_KEY);
}

export function decodeToken(token: string): DecodedToken | null {
  try {
    // The jwt-decode library will throw an error if the token is malformed
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}
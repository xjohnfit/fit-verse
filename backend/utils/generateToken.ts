import jwt, { type SignOptions } from 'jsonwebtoken';
import type { CookieOptions, Response } from 'express';

const AUTH_COOKIE = 'fit-verse-token';

// One set of options for setting AND clearing the cookie. A browser only
// deletes a cookie when the clear uses the same name and path, so sharing
// this object keeps logout working if an option ever changes.
//
// sameSite 'lax': the browser sends the cookie only on requests from the same
// site. fitverse.codewithxjohn.com and api.fitverse.codewithxjohn.com are the
// same site (codewithxjohn.com), so the web app keeps working, while other
// websites can no longer send requests that carry the user's login.
const authCookieOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
};

// Generate a JWT and set it as an HTTP-only cookie
const generateToken = (res: Response, userId: string): void => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET environment variable is not defined');
    }

    const signOptions: SignOptions = { expiresIn: '30d' };
    const token = jwt.sign({ userId }, secret, signOptions);

    res.cookie(AUTH_COOKIE, token, {
        ...authCookieOptions,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
    });
};

// Remove the auth cookie (logout, account deletion)
export const clearAuthCookie = (res: Response): void => {
    res.clearCookie(AUTH_COOKIE, authCookieOptions);
};

export default generateToken;

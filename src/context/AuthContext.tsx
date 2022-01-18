import { createContext, useEffect, useState } from "react";
import { recoveryUserInformation, signInRequest } from "../services/auth";
import { setCookie, parseCookies } from "nookies"
import Router from "next/router";
import { api } from "../services/api";

type User = {
    name: string;
    email: string;
    avatar_url: string;
}

type SignInData = {
    email: string;
    password: string;
}

type AuthContextData = {
    isAuthenticated: boolean;
    user: User | null;
    signIn(data: SignInData): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<User | null>(null);

    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'nextauth.token': token } = parseCookies();

        if (token) {
            recoveryUserInformation().then(response => {
                setUser(response.user)
            });
        }
    }, [])

    async function signIn({ email, password }: SignInData) {
        const { token, user } = await signInRequest({
            email,
            password
        })

        setCookie(null, 'nextauth.token', token, {
            maxAge: 60 * 60 * 1, // 1 hour
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        })

        api.defaults.headers['Authorization'] = `Bearer ${token}`;

        setUser(user)

        Router.push('/dashboard')
    }

    return <AuthContext.Provider value={{
        user,
        isAuthenticated,
        signIn,
    }}>
        {children}
    </AuthContext.Provider>;
}
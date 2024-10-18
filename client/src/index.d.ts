declare module './components/LandingPage';
declare module './components/LoginPage';
declare module './components/RegisterPage';
declare module './components/ForgetPasswordPage';
declare module './components/HomePage';

export interface User {
    name: string;
    email: string;
}

export interface Chat {
    isGroupChat: boolean;
    users: User[];
    _id?: string;
    chatName: string;
    groupAdmin?: User;
}


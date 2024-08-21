export interface IUserLoginSuccess {
    _id: string;
    name: string;
    email: string;
    password: string;
    pic?: string;
    isAdmin?: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface IUserLoginError {
    error: string;
}

export type UserLoginResponse = IUserLoginSuccess | IUserLoginError;

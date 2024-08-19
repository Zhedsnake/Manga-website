
export enum Tokens {
    guestToken = 'guestToken',
    userToken = 'userToken',
}

export const setToken = (name: string, token: string): boolean => {
    localStorage.setItem(name, token);

    return !!localStorage.getItem(name);
};


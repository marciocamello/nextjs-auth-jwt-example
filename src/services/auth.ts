import { v4 as uuid } from 'uuid'

type SignInRequestData = {
    email: string;
    password: string;
}

const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount));

export async function signInRequest(data: SignInRequestData) {
    await delay();

    return {
        token: uuid(),
        user: {
            name: 'Marcio Vale',
            email: 'marciovale@teste.com',
            avatar_url: 'https://github.com/marciocamello.png',
        }
    }
}

export async function recoveryUserInformation() {
    await delay();

    return {
        user: {
            name: 'Marcio Vale',
            email: 'marciovale@teste.com',
            avatar_url: 'https://github.com/marciocamello.png',
        }
    }
}
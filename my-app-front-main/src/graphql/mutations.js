export const REGISTER_USER = `
    mutation registerUser($user: UserInput!) {
        registerUser(user: $user) {
            token
        }
    }
`

export const GET_ME = `
    mutation GetMe {
        getMe {
            id,
            firstName,
            lastName,
            mail,
        }
    }
`

export const LOGIN_USER = `
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`

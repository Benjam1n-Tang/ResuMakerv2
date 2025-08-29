export const BASE_URL = "http://localhost:8000"

export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/v1/auth/sign-up",
        LOGIN: "/api/v1/auth/sign-in",
        EXIT: "/api/v1/auth/sign-out"
    },
    USER: {
        GET_ALL: "/api/v1/users",
        GET_PROFILE: "/api/v1/users/me"
    },
    RESUME: {
        CREATE_RESUME: "/api/v1/resumes",
        GET_ALL: "/api/v1/resumes",
        GET_USER_ALL: "/api/v1/resumes/user",
        GET_RESUME: (id: string) => `/api/v1/resumes/${id}`,
        GET_USER_RESUME: (id: string) => `/api/v1/resumes/user/${id}`,
        DELETE_RESUME: (id: string) => `/api/v1/resumes/${id}`
    },
    LETTER: {
        CREATE_LETTER: "/api/v1/letters",
        GET_ALL: "/api/v1/letters",
        GET_USER_ALL: "/api/v1/letters/user",
        GET_LETTER: (id: string) => `/api/v1/letters/${id}`,
        GET_USER_LETTER: (id: string) => `/api/v1/letters/user/${id}`,
        DELETE_LETTER: (id: string) => `/api/v1/letters/${id}`
    }

}
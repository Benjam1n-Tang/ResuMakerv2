// export const BASE_URL = "http://localhost:8000";
export const BASE_URL = "https://resumakerv2.onrender.com"

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/v1/auth/sign-up",
    LOGIN: "/api/v1/auth/sign-in",
    EXIT: "/api/v1/auth/sign-out",
  },
  USER: {
    GET_ALL: "/api/v1/users",
    GET_PROFILE: "/api/v1/users/me",
    UPDATE_PROFILE: "/api/v1/users/me",
  },
  RESUME: {
    CREATE_RESUME: "/api/v1/resumes",
    GET_ALL: "/api/v1/resumes",
    GET_USER_ALL: "/api/v1/resumes/user",
    GET_RESUME: (id: string) => `/api/v1/resumes/${id}`,
    GET_USER_RESUME: (id: string) => `/api/v1/resumes/user/${id}`,
    DELETE_RESUME: (id: string) => `/api/v1/resumes/${id}`,
  },
  LETTER: {
    CREATE_LETTER: "/api/v1/letters",
    GET_ALL: "/api/v1/letters",
    GET_USER_ALL: "/api/v1/letters/user",
    GET_LETTER: (id: string) => `/api/v1/letters/${id}`,
    GET_USER_LETTER: (id: string) => `/api/v1/letters/user/${id}`,
    DELETE_LETTER: (id: string) => `/api/v1/letters/${id}`,
  },
  SOCIAL: {
    CREATE_SOCIAL: "/api/v1/socials",
    GET_USER_ALL: "/api/v1/socials/user",
    GET_SOCIAL: (id: string) => `/api/v1/socials/${id}`,
    UPDATE_SOCIAL: (id: string) => `/api/v1/socials/${id}`,
    DELETE_SOCIAL: (id: string) => `/api/v1/socials/${id}`,
  },
  EXPERIENCE: {
    CREATE_EXPERIENCE: "/api/v1/experiences",
    GET_USER_ALL: "/api/v1/experiences/user",
    GET_EXPERIENCE: (id: string) => `/api/v1/experiences/${id}`,
    UPDATE_EXPERIENCE: (id: string) => `/api/v1/experiences/${id}`,
    DELETE_EXPERIENCE: (id: string) => `/api/v1/experiences/${id}`,
  },
  EDUCATION: {
    CREATE_EDUCATION: "/api/v1/education",
    GET_USER_ALL: "/api/v1/education/user",
    GET_EDUCATION: (id: string) => `/api/v1/education/${id}`,
    UPDATE_EDUCATION: (id: string) => `/api/v1/education/${id}`,
    DELETE_EDUCATION: (id: string) => `/api/v1/education/${id}`,
  },
  CERTIFICATE: {
    CREATE_CERTIFICATE: "/api/v1/certificates",
    GET_USER_ALL: "/api/v1/certificates/user",
    GET_CERTIFICATE: (id: string) => `/api/v1/certificates/${id}`,
    UPDATE_CERTIFICATE: (id: string) => `/api/v1/certificates/${id}`,
    DELETE_CERTIFICATE: (id: string) => `/api/v1/certificates/${id}`,
  },
  PROJECT: {
    CREATE_PROJECT: "/api/v1/projects",
    GET_USER_ALL: "/api/v1/projects/user",
    GET_PROJECT: (id: string) => `/api/v1/projects/${id}`,
    UPDATE_PROJECT: (id: string) => `/api/v1/projects/${id}`,
    DELETE_PROJECT: (id: string) => `/api/v1/projects/${id}`,
  },
  SKILL: {
    CREATE_SKILL: "/api/v1/skills",
    GET_SKILL: "/api/v1/skills",
    UPDATE_SKILL: (id: string) => `/api/v1/skills/${id}`,
  }
};

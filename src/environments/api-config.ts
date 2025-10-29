import { enviroments } from "./environments";

export const apiConfig = {
    headers: {
        'x-api-key': enviroments.apiKey,
    },
}
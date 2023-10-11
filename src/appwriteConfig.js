import { Client, Databases} from "appwrite";

const client = new Client();
export const API_ENDPOINT = String(import.meta.env.VITE_API_ENDPOINT)
export const PROJECT_ID = String(import.meta.env.VITE_PROJECT_ID);
export const DATABASE_ID = String(import.meta.env.VITE_DATABASE_ID);
export const COLLECTION_ID_MESSAGES = String(import.meta.env.VITE_COLLECTION_ID);


client
    .setEndpoint(API_ENDPOINT)
    .setProject(PROJECT_ID);


export const databases = new Databases(client);



export default client;
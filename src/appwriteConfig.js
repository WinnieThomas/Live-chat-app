import { Client, Databases, Query } from "appwrite";

const client = new Client();


client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_PROJECT_ID);

const databases = new Databases(client);

export default client;
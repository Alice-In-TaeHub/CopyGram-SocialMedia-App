import {Client, Account, Databases, Storage, Avatars} from 'appwrite'

// object
export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    
    // url cames from https://appwrite.io/docs/products/databases/quick-start!!!
    url: import.meta.env.VITE_APPWRITE_URL,

}

// Instances :
// expect client other have to be known that to what they are refering so we have to pass client
export const client = new Client();

// configuring client:
client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export const avatar = new Avatars(client);
import {Client, Account, Databases, Storage, Avatars} from 'appwrite'

// object
export const appwriteConfig = {
    // projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    
    // // url cames from https://appwrite.io/docs/products/databases/quick-start!!!
    // // url: import.meta.env.VITE_APPWRITE_URL,
    // url: "https://cloud.appwrite.io/v1",
    // databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    // storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    // userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
    // postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
    // savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID
    
    projectId: '657475aedc7989e44860',
    url: "https://cloud.appwrite.io/v1",
    databaseId:'6575b38fed76cb4c1244' ,
    storageId: '6575b2f0c02cd96aaaeb', 
    userCollectionId:'6575b4b37da77bff0df4',
    postCollectionId:'6575b46a576b366d1297',
    savesCollectionId: '6575b4cc32634acbd551',

}

// Instances :
// expect client other have to be known that to what they are refering so we have to pass client
// export const client = new Client();

// // configuring client:
// client.setProject(appwriteConfig.projectId);
// client.setEndpoint(appwriteConfig.url);

// // configuring client:
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('657475aedc7989e44860');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

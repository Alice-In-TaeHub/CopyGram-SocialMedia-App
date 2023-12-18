import { INewUser } from "@/types";
import { ID } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./config";


// user Authentication part:----------------------------------------------------------------

// it will accept thr user as the parameter
// type script rules must be followed -- defining interface for user
export async function createUserAccount(user: INewUser){
    try {
        //accoun here is allowing us to deal with auth functionality of appwrite cloud
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
            // user.username,
        )
        
        // if it return nothing or find user account then throw error otherwise return use
        if(!newAccount) throw new Error
        
        //avatar: we initialize it by user's name
        const avatarUrl = avatars.getInitials(user.name)

        // saving users in database
        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username, // this is coming from form
            imageUrl: avatarUrl
        })

        return newAccount;
    } catch (error) {
        console.log(error);
        return error;
    }

}

//  saving users in database----------------------------------------------------------------
// destructuring the values
export async function saveUserToDB(user:{
    accountId : string,
    email : string,
    name: string,
    imageUrl: URL,
    username?: string,
}){
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId, // so we know which database we are modifying
            appwriteConfig.userCollectionId,
            ID.unique(),
            user, // actual user obj.
        )
        return newUser;

    } catch (error) {
        console.log(error);
        
    }
}
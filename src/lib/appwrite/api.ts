import { INewUser } from "@/types";
import { ID } from "appwrite";
import { account } from "./config";

// it will accept thr user as the parameter
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
        return newAccount;
    } catch (error) {
        console.log(error);
        return error;
    }

}
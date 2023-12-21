import { INewPost, INewUser } from '@/types'
import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery

} from '@tanstack/react-query'
import { createPost, createUserAccount, getRecentPosts, signInAccount, signOutAccount } from '../appwrite/api'
import { QUERY_KEYS } from './queryKeys'

// all use{AnyFunction} functions are exporting appwrite fucntion to get called


// creating a new user account
export const useCreateUserAccount = () => {
    return useMutation({
        // function came from Appwrite Api.tsx file
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}

// Signin: sign in a user account
export const useSignInAccount = () => {
    return useMutation({
        // function came from Appwrite Api.tsx file
        mutationFn: (user: {
            email: string;
            password: string;
        }) => signInAccount(user)
    })
}

// signOut: sign out a user account
export const useSignOutAccount = () => {
    return useMutation({
        // function came from Appwrite Api.tsx file
        mutationFn: signOutAccount
    })
}



// POst Queries:--------------------------------

export const useCreatePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        // function came from Appwrite Api.tsx file
        mutationFn: (post: INewPost) => createPost(post),
       
        // invalidate post after create a new post
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            })
        }
    })
}

// fetch posts: --------------------------------

export const useGetRecentPosts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        // function came from Appwrite Api.tsx file
        queryFn : getRecentPosts,
    })
}


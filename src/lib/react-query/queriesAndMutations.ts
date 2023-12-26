import { INewPost, INewUser, IUpdatePost } from '@/types'
import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery

} from '@tanstack/react-query'
import { createPost, createUserAccount, deletePost, deleteSavedPost, getCurrentUser, getPostById, getRecentPosts, likePost, savePost, signInAccount, signOutAccount, updatePost } from '../appwrite/api'
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

// post like: --------------------------------

export const useLikePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({postId, likesArray}:{postId: string; likesArray:string[]}) => likePost(postId, likesArray),
            onSuccess: (data) =>{
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
                });
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
                });
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_POSTS]
                });
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_CURRENT_USER]
                });
            
        }
    })
}

// SAVE POST-----------------------------

export const useSavePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({postId, userId}:{postId: string; userId:string}) => savePost(postId, userId),
            onSuccess: () =>{
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
                });
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_POSTS]
                });
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_CURRENT_USER]
                });
            
        }
    })
}

// Delete SAVED POST----------------------
export const useDeleteSavedPost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
            onSuccess: () =>{
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
                });
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_POSTS]
                });
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_CURRENT_USER]
                });
            
        }
    })
}


export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        queryFn: getCurrentUser
    })
}

// edit 
export const useGetPostById = (postId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
        queryFn: () => getPostById(postId),
        enabled: !!postId
    })
}

export const useUpdatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (post: IUpdatePost) => updatePost(post),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
            })
        }
    })
}

export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({postId, imageId} : {postId: string, imageId: string}) => deletePost(postId, imageId),
        
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}
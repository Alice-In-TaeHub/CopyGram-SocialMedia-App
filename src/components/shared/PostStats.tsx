import { useUserContext } from "@/context/AuthContext";
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { LoadingOutlined } from "@ant-design/icons";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";

type PostStatsProps = {
    post?: Models.Document;
    userId: string;
}

const PostStats = ({post, userId}: PostStatsProps) => {

    const likesList = post?.likes.map((user: Models.Document)=> user.$id)

    const[likes, setLikes] = useState(likesList);
    const[isSaved, setIsSaved] = useState(false);

    const {mutate: likePost } = useLikePost()
    const {mutate: savePost , isPending: isSavingPost} = useSavePost()
    const {mutate: deleteSavedPost, isPending: isDeletingSaved} = useDeleteSavedPost()

    const {data: currentUser} = useGetCurrentUser()
    
    const savedPostRecord = currentUser?.save.find((record: Models.Document)=> record.post.$id === post?.$id)

    useEffect(() => {
        // setIsSaved(savedPostRecord? true : false)
        
        // or : - {saved: true} => !savedPostRecord => !false = true

        setIsSaved(!!savedPostRecord)
    },[currentUser])


    // functions: 
    const handleLikePost = (e : React.MouseEvent) =>{
        // it will stop other actions like navigate to post page and all
        e.stopPropagation();
        
        let newLikes = [...likes];

        // checks if user already has liked the post 
        const hasLiked = newLikes.includes(userId)

        if(hasLiked){
            newLikes = newLikes.filter((id)=> id !== userId)
        }else{
            newLikes.push(userId);
        }

        setLikes(newLikes)
        // passing values in likepost function
        likePost({postId: post?.$id || '', likesArray : newLikes})
    }
    
    const handleSavePost = (e: React.MouseEvent) => {
        e.stopPropagation()

        // check if user already has saved the post
        
        if(savedPostRecord){
            setIsSaved(false);
            deleteSavedPost(savedPostRecord.$id);
        }else{
            savePost({postId: post?.$id || '', userId})
            setIsSaved(true)
        }
        
    }

    return (
    <div className="flex justify-between items-center z-20">
        
        {/* likes */}
        <div className="flex gap-2 mr-5">
            <img 
                src={checkIsLiked(likes, userId) 
                ? "/assets/icons/liked.svg"
                : "/assets/icons/like.svg"}
                alt="like"
                width={20} 
                height={20} 
                onClick={handleLikePost}
                className="cursor-pointer"
            />
            <p className="small-medium lg:base-medium">{likes.length}</p>
        </div>
        {/* saves */}
        <div className="flex gap-2 mr-5">
            {isSavingPost  || isDeletingSaved 
            ? <LoadingOutlined/>
            : <img 
                src={isSaved 
                    ? "/assets/icons/saved.svg" 
                    : "/assets/icons/save.svg" 
                    }
                alt="like"
                width={20} 
                height={20} 
                onClick={handleSavePost}
                className="cursor-pointer"
              />
            }
            
        </div>
    </div>
  )
}

export default PostStats
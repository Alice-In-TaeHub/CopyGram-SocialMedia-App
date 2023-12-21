import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { LoadingOutlined } from "@ant-design/icons";
import { Models } from "appwrite";


const Home = () => {
  // const isPostLoading = true;
  // const posts = null;
  const {data: posts, isPending: isPostLoading, isError: isErrorPosts} = useGetRecentPosts()

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">
            Home Feed
          </h2>
          {isPostLoading && !posts ? (
            <LoadingOutlined style={{ fontSize: '30px' }}/>
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document)=>(
                // <li>{post.caption}</li>
                <PostCard post={post} key={post.caption}/>
              ))}
            </ul>
          )}
        </div>
      </div> 
    </div>
  )
}

export default Home

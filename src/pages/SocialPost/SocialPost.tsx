import PostCard from '~/components/PostCard/PostCard'
import { useQuery } from '@tanstack/react-query'
import postDataApi from '~/apis/post.api'

export default function SocialPost() {
  // Fetch all post data
  const { data: postData, isLoading, error } = useQuery(['postData'], () => postDataApi.getAllPosts())
  if (isLoading) {
    return <div>Loading posts...</div>
  }

  if (error) {
    return <div>Failed to load posts!</div>
  }

  if (!postData || postData.length === 0) {
    return <div>No posts available.</div>
  }
  const posts = Array.isArray(postData) ? [...postData].reverse() : []
  return (
    <div className='mt-10 w-1/2 mx-auto space-y-11'>
      {/* Render PostCard components */}
      {posts.map((post) => (
        <PostCard
          key={post._id}
          id={post._id}
          userId={post.userId}
          content={post.content}
          likes={post.likes}
          comments={post.comments}
          imageUrl={post.imageUrl}
          shares={post.shares}
          createdAt={post.createdAt}
        />
      ))}
    </div>
  )
}

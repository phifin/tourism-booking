import PostCard from '~/components/PostCard/PostCard'
import { useQuery } from '@tanstack/react-query'
import postDataApi from '~/apis/post.api'
import { Post } from '~/types/post.type'

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

  return (
    <div className='mt-10 w-1/2 mx-auto space-y-11'>
      {/* Render PostCard components */}
      {postData.map((post: Post) => (
        <PostCard
          key={post.id}
          id={post.id}
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

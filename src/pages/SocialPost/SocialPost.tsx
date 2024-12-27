import PostCard from '~/components/PostCard/PostCard'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/store'
import { useEffect } from 'react'
import { fetchAllPosts } from '~/store/post.slice'
import { PostModel } from '~/models/post.model'

export default function SocialPost() {
  // Fetch all post data
  // const { data: postData, isLoading, error } = useQuery(['postData'], () => postApi.getAllPosts())
  const postRedux = useSelector((state: RootState) => state.posts)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllPosts())
  }, [dispatch])

  if (postRedux.isLoading) {
    return <div>Loading posts...</div>
  }

  if (postRedux.error) {
    return <div>Failed to load posts!</div>
  }

  if (!postRedux.data || postRedux.data.length === 0) {
    return <div>No posts available.</div>
  }

  const posts = Array.isArray(postRedux.data) ? [...postRedux.data].reverse() : []

  return (
    <div className='mt-10 w-1/2 mx-auto space-y-11'>
      {/* Render PostCard components */}
      {posts.map((post: PostModel) => (
        <PostCard key={post.id} postData={post} />
      ))}
    </div>
  )
}

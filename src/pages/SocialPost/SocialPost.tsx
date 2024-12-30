import PostCard from '~/components/PostCard/PostCard'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/store'
import { useEffect, useState } from 'react'
import { fetchAllPosts } from '~/store/post.slice'
import CommentPopUp from '~/components/CommentPopUp'
// import { PostModel } from '~/models/post.model'
// import { PostModel } from '~/models/post.model'

// interface SocialPostProps {
//   onCommentClick: () => void
// }

export default function SocialPost() {
  const postRedux = useSelector((state: RootState) => state.posts)
  const dispatch: AppDispatch = useDispatch()
  const [commentPostState, setCommentPostState] = useState<boolean>(false)
  const [selectedPostId, setSelectedPostId] = useState<string>('')
  // const [currentCommentsList, setCurrentCommentList] = useState<PostModel[]>([])
  const [likesNum, setLikesNum] = useState(0)
  const [liked, setLiked] = useState(false)
  const onCommentClick = (postId: string, likesNum: number, liked: boolean) => {
    setSelectedPostId(postId)
    setLikesNum(likesNum)
    setLiked(liked)
    // setCurrentCommentList(currentCommentsList)
    setCommentPostState(true)
  }
  const closeComment = () => {
    setCommentPostState(false)
    setSelectedPostId('')
  }
  useEffect(() => {
    dispatch(fetchAllPosts())
  }, [dispatch])

  if (postRedux.isLoading) {
    return <div>Loading posts...</div>
  }

  if (postRedux.error) {
    console.log(postRedux.error)
    return <div>Failed to load posts!</div>
  }

  if (!postRedux.data || postRedux.data.length === 0) {
    return <div>No posts available.</div>
  }

  const posts = Array.isArray(postRedux.data) ? [...postRedux.data].reverse() : []

  return (
    <div className='mt-10 w-1/2 mx-auto space-y-11'>
      {posts.map((post) => {
        // if (!post || !post.id) {
        //   console.warn('Invalid post detected:', post) // Debug nếu có bài viết lỗi
        //   return null
        // }
        return <PostCard key={post.id} postData={post} onCommentClick={onCommentClick} />
      })}
      {commentPostState && selectedPostId ? (
        <CommentPopUp onCloseComment={closeComment} postId={selectedPostId} likesNum={likesNum} liked={liked} />
      ) : (
        false
      )}
    </div>
  )
}

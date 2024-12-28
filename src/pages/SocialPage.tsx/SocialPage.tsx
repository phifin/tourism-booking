import SocialPost from '../SocialPost'
import SocialSideNav from '~/components/SocialSideNav'
import CreatePost from '~/components/CreatePost'
import { useState } from 'react'
import PostPopUp from '~/components/PostPopUp/PostPopUp'
import CommentPopUp from '~/components/CommentPopUp'
import ChattingList from '~/components/ChattingList'
export default function SocialPage() {
  const [createdPost, setCreatedPost] = useState(false)
  const [commentPostState, setCommentPostState] = useState(false)

  const onClick = () => {
    setCreatedPost((prevState) => !prevState)
  }
  const onCommentClick = () => {
    setCommentPostState((prevState) => !prevState)
  }

  return (
    <div className='relative'>
      <SocialSideNav opacity={createdPost ? 'opacity-20' : 'opacity-100'}>
        <CreatePost onClick={onClick} />
        <ChattingList />
        <SocialPost />
      </SocialSideNav>
      {createdPost ? <PostPopUp onClick={onClick} /> : false}
      {commentPostState ? <CommentPopUp onClick={onCommentClick} /> : false}
    </div>
  )
}

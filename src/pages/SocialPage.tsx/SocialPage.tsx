import SocialPost from '../SocialPost'
import SocialSideNav from '~/components/SocialSideNav'
import CreatePost from '~/components/CreatePost'
import { useState } from 'react'
import PostPopUp from '~/components/PostPopUp/PostPopUp'
export default function SocialPage() {
  const [createdPost, setCreatedPost] = useState(false)
  const onClick = () => {
    setCreatedPost((prevState) => !prevState)
  }

  return (
    <div className='relative'>
      <SocialSideNav opacity={createdPost ? 'opacity-20' : 'opacity-100'}>
        <CreatePost onClick={onClick} />
        <SocialPost />
      </SocialSideNav>
      {createdPost ? <PostPopUp onClick={onClick} /> : false}
    </div>
  )
}

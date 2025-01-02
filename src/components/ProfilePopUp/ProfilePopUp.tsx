import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import messageApi from '~/apis/chat.api'
import { userApi } from '~/apis/user.api'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { format } from 'date-fns'

interface ProfilePopUp {
  imageUrl: string | undefined
  userId: string
  onHover: () => void
  onLeave: () => void
}

type RelationshipState = 'pending' | 'friend' | 'notFriend'

export default function ProfilePopUp({ imageUrl, userId, onHover, onLeave }: ProfilePopUp) {
  const { data: userData } = useQuery(['userData', userId], () => userApi.fetchUserById(userId))
  const userRedux = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  const [joinSince, setJoinSince] = useState('')
  const [hoverSelf, setHoverSelf] = useState(userRedux.data?.id === userData?.id)
  const [relationshipState, setRelationshipState] = useState<RelationshipState>('notFriend')

  const { data: notifications } = useQuery(
    ['notifications'], // Key của query
    messageApi.getNotification
  )
  console.log(notifications)
  useEffect(() => {
    if (userData?.createdAt) {
      setJoinSince(format(new Date(userData.createdAt), 'MM-yyyy'))
    }
  }, [userData?.createdAt])

  useEffect(() => {
    if (notifications) {
      const isFriend = notifications.some(
        (notification: any) =>
          notification.sender === userRedux.data?.id &&
          notification.receiver === userData?.id &&
          notification.sender === userData?.id &&
          notification.receiver === userRedux.data?.id
      )
      const isPending = notifications.some((notification: any) => notification.sender === userRedux.data?.id)

      if (isFriend) {
        setRelationshipState('friend')
      } else if (isPending) {
        setRelationshipState('pending')
      } else {
        setRelationshipState('notFriend')
      }
    }
  }, [notifications, userRedux.data?.id, userData?.id])

  const handleEditUserProfile = () => {
    navigate('/user/account')
  }
  const handleAddFriend = async () => {
    // navigate('/user/account')
    await messageApi.postNotification(
      'addFr',
      userRedux.data?.id ? userRedux.data?.id : '',
      userData?.id ? userData?.id : ''
    )
    if (relationshipState === 'friend' || relationshipState === 'pending') {
      setRelationshipState('notFriend') // Cập nhật thành "notFriend"
    } else {
      setRelationshipState('pending') // Nếu không phải friend/pending, chuyển sang "pending"
    }
  }

  return (
    <div
      className='flex flex-col absolute top-0 left-12 w-80 h-40 border bg-slate-100 z-50 rounded-lg overflow-hidden shadow-2xl'
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className='flex mt-4 items-center'>
        <img
          src={imageUrl ? imageUrl : '/src/assets/default_profile_img.jpg'}
          alt=''
          className='ml-4 w-1/4 h-auto object-cover rounded-full overflow-hidden'
        />
        <div className='mt-2 ml-4'>
          <div className='text-xl font-semibold'>{userData?.firstName + ' ' + userData?.lastName}</div>
          <div>{userData?.userFriends ? userData?.userFriends.length : 0} friends</div>
          <div className='text-sm opacity-60 text-gray-700'>Joined since {joinSince}</div>
        </div>
      </div>
      {hoverSelf ? (
        <div className='self-center mt-3'>
          <button
            className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl overflow-hidden'
            onClick={handleEditUserProfile}
          >
            Edit profile
          </button>
        </div>
      ) : relationshipState === 'friend' ? (
        <div className='self-center mt-3'>
          <button
            className='px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-xl overflow-hidden'
            onClick={handleAddFriend}
          >
            Friend
          </button>
        </div>
      ) : relationshipState === 'pending' ? (
        <div className='self-center mt-3'>
          <button
            className='px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl overflow-hidden'
            onClick={handleAddFriend}
          >
            Pending
          </button>
        </div>
      ) : (
        <div className='self-center mt-3'>
          <button
            className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl overflow-hidden'
            onClick={handleAddFriend}
          >
            Add Friend
          </button>
        </div>
      )}
    </div>
  )
}

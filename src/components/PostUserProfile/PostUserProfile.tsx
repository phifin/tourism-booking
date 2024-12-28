import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { userApi } from '~/apis/user.api'
import { format, formatDistanceToNow, isToday, isYesterday, differenceInDays } from 'date-fns'
type PostUserProfileProps = {
  userId: string
  createdAt: string | undefined
  onClick: () => void
}

export default function PostUserProfile({ userId, createdAt, onClick }: PostUserProfileProps) {
  const { data: userData } = useQuery(['userData', userId], () => userApi.fetchUserById(userId), {
    enabled: !!userId // Chỉ fetch khi userId tồn tại
  })
  const formattedTime = () => {
    if (!createdAt) {
      return undefined
    }
    const createdDate = new Date(createdAt)
    const daysDifference = differenceInDays(new Date(), createdDate)

    if (daysDifference > 2) {
      return format(createdDate, 'yyyy-MM-dd') // Show year, month, day format
    }

    if (isYesterday(createdDate)) {
      return `Yesterday at ${format(createdDate, 'HH:mm')}` // Show "Yesterday at HH:mm"
    }

    if (isToday(createdDate)) {
      const relativeTime = formatDistanceToNow(createdDate, { addSuffix: true }) // Relative time
      return relativeTime
    }

    return format(createdDate, 'yyyy-MM-dd') // Fallback for any unexpected case
  }
  return (
    <div className='flex mt-2 ml-2 cursor-pointer' onClick={onClick}>
      <div className='flex items-center'>
        <div className='h-12 w-12 object-cover overflow-hidden border rounded-full'>
          <img
            src={userData?.profileImageUrl ? userData?.profileImageUrl : '/src/assets/default_profile_img.jpg'}
            alt='userProfile'
            className='h-full w-full object-cover'
          />
        </div>
      </div>
      <div className='flex items-center px-2 py-1 mt-1'>
        <header className='font-semibold'>{userData?.lastName + ' ' + userData?.firstName}</header>
        {createdAt ? <div className='text-gray-500 mt-1'>{formattedTime()}</div> : ''}
      </div>
    </div>
  )
}

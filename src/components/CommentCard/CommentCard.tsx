import { useQuery } from '@tanstack/react-query'
import { userApi } from '~/apis/user.api'

type CommentCardProps = {
  userId: string
  imageUrl: string
  content: string
}

export default function CommentCard({ userId, imageUrl, content }: CommentCardProps) {
  const { data: userData } = useQuery(['userData', userId], () => userApi.fetchUserById(userId), {
    enabled: !!userId // Chỉ fetch khi userId tồn tại
  })

  return (
    <div>
      <div className='flex mt-2 ml-2 cursor-pointer'>
        <div className='flex items-start mt-2'>
          <div className='h-12 w-12 object-cover overflow-hidden border rounded-full'>
            <img
              src={userData?.profileImageUrl ? userData?.profileImageUrl : '/src/assets/default_profile_img.jpg'}
              alt='userProfile'
              className='h-full w-full object-cover'
            />
          </div>
        </div>
        <div className='flex flex-col  justify-center '>
          <div className={`${content ? 'bg-slate-200' : ''} rounded-2xl px-3 py-2 mt-1 ml-1 mr-4`}>
            <header className='text-sm font-semibold'>{userData?.lastName + ' ' + userData?.firstName}</header>
            <div className='mt-1'>{content}</div>
          </div>
        </div>
      </div>
      {imageUrl ? (
        <div className='mt-2 ml-14  overflow-auto object-contain'>
          <img src={imageUrl} alt='cmt-img' className='max-h-64 max-w-64 rounded-2xl' />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

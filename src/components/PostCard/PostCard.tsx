import { Post } from '~/types/post.type'
import { format, formatDistanceToNow, isToday, isYesterday, differenceInDays } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { userApi } from '~/apis/user.api'

export default function PostCard({ userId, content, imageUrl, likes, comments, shares, createdAt }: Post) {
  const { data: userData } = useQuery(['userData', userId], () => userApi.fetchUserByEmail(userId), {
    enabled: !!userId // Chỉ fetch khi userId tồn tại
  })

  const formattedTime = () => {
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
  const renderMedia = () => {
    if (!imageUrl) return null

    const isVideo = /\.(mp4|webm|ogg)$/i.test(imageUrl) // Check for video extensions

    if (isVideo) {
      return (
        <video controls className='h-96 w-full'>
          <source src={imageUrl} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      )
    }

    return <img src={imageUrl} alt='post-media' className='h-96 w-full object-cover' />
  }
  return (
    <div className='border shadow-xl rounded-lg'>
      <div className='mt-2 ml-4'>
        <div className='flex items-center'>
          <div className='h-12 w-12 object-cover overflow-hidden border rounded-full'>
            <img
              src={userData?.profileImageUrl ?? '/src/assets/default_profile_img.jpg'}
              alt='userProfile'
              className='p-1'
            />
          </div>
          <div className='px-2 py-1 '>
            <header className='font-bold'>{userData?.lastName + ' ' + userData?.firstName}</header>
            <div className='text-gray-500'>{formattedTime()}</div>
          </div>
        </div>
      </div>
      <div className='mt-3 ml-5'>
        <p>{content}</p>
      </div>
      <div className='mt-4'>{renderMedia()}</div>
      <div className='mt-4 flex items-center justify-between'>
        <div>
          {likes === null || likes.length <= 0 ? (
            ''
          ) : (
            <div className='flex ml-4'>
              <img
                height='18'
                role='presentation'
                width='18'
                src="data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint2_radial_15251_63610)' fill-opacity='.5'/%3E%3Cpath d='M7.3014 3.8662a.6974.6974 0 0 1 .6974-.6977c.6742 0 1.2207.5465 1.2207 1.2206v1.7464a.101.101 0 0 0 .101.101h1.7953c.992 0 1.7232.9273 1.4917 1.892l-.4572 1.9047a2.301 2.301 0 0 1-2.2374 1.764H6.9185a.5752.5752 0 0 1-.5752-.5752V7.7384c0-.4168.097-.8278.2834-1.2005l.2856-.5712a3.6878 3.6878 0 0 0 .3893-1.6509l-.0002-.4496ZM4.367 7a.767.767 0 0 0-.7669.767v3.2598a.767.767 0 0 0 .767.767h.767a.3835.3835 0 0 0 .3835-.3835V7.3835A.3835.3835 0 0 0 5.134 7h-.767Z' fill='%23fff'/%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(90 .0005 8) scale(7.99958)'%3E%3Cstop offset='.5618' stop-color='%230866FF' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230866FF' stop-opacity='.1'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(45 -4.5257 10.9237) scale(10.1818)'%3E%3Cstop offset='.3143' stop-color='%2302ADFC'/%3E%3Cstop offset='1' stop-color='%2302ADFC' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3989' y1='2.3999' x2='13.5983' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2302ADFC'/%3E%3Cstop offset='.5' stop-color='%230866FF'/%3E%3Cstop offset='1' stop-color='%232B7EFF'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E"
              ></img>
              <span className='ml-1'>{likes.length}</span>
            </div>
          )}
        </div>
        <div className='flex text-gray-500'>
          <div className='mr-4'>
            {comments === null || comments.length <= 0 ? '' : <div>{comments.length} comments</div>}
          </div>
          <div className='mr-4'>{shares === null || shares.length <= 0 ? '' : <div>{shares.length} shares</div>}</div>
        </div>
      </div>
      <div className='flex w-95/100 mx-auto h-10 mt-2 mb-2 border-y items-center justify-around cursor-pointer'>
        <div className='flex w-1/3 py-1 items-center justify-center text-gray-500 font-semibold'>
          <span>
            <svg aria-label='Like' fill='currentColor' height='24' role='img' width='24'>
              <title>Like</title>
              <path d='M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z'></path>
            </svg>
          </span>
          <header className='ml-2'>Like</header>
        </div>
        <div className='flex w-1/3 py-1 items-center justify-center text-gray-500 font-semibold'>
          <span>
            <svg aria-label='Comment' fill='currentColor' height='24' role='img' viewBox='0 0 24 24' width='24'>
              <title>Comment</title>
              <path
                d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
                fill='none'
                stroke='currentColor'
                stroke-linejoin='round'
                stroke-width='2'
              ></path>
            </svg>
          </span>
          <header className='ml-2'>Comment</header>
        </div>
        <div className='flex w-1/3 py-1 items-center justify-center text-gray-500 font-semibold'>
          <span>
            <svg aria-label='Share' fill='currentColor' height='24' role='img' viewBox='0 0 24 24' width='24'>
              <title>Share</title>
              <line
                fill='none'
                stroke='currentColor'
                stroke-linejoin='round'
                stroke-width='2'
                x1='22'
                x2='9.218'
                y1='3'
                y2='10.083'
              ></line>
              <polygon
                fill='none'
                points='11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334'
                stroke='currentColor'
                stroke-linejoin='round'
                stroke-width='2'
              ></polygon>
            </svg>
          </span>
          <header className='ml-2'>Share</header>
        </div>
      </div>
    </div>
  )
}

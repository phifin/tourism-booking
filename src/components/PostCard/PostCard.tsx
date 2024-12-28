import { format, formatDistanceToNow, isToday, isYesterday, differenceInDays } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '~/store'
import { PostModel } from '~/models/post.model'
import { likePost } from '~/store/post.slice' // Import action likePost
import { AppDispatch } from '~/store'

export default function PostCard({ postData }: { postData: PostModel }) {
  const dispatch = useDispatch<AppDispatch>()
  const userRedux = useSelector((state: RootState) => state.user)

  const formattedTime = () => {
    const createdDate = new Date(postData.createdAt)
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
  // const [createdPost, setCreatedPost] = useState(false)  // const { data: userData } = useQuery(['userData', userId], () => userDataApi.getUserDataById(userId), {
  //   enabled: !!userId // Chỉ fetch khi userId tồn tại
  // })
  const handleLike = () => {
    if (userRedux?.data?.id) {
      dispatch(likePost({ userId: userRedux.data.id, postId: postData.id }))
    } else {
      alert('You need to log in to like posts!')
    }
  }
  const renderMedia = () => {
    if (!postData.imageUrl) return null

    const isVideo = /\.(mp4|webm|ogg)$/i.test(postData.imageUrl) // Check for video extensions

    if (isVideo) {
      return (
        <video controls className='h-96 w-full'>
          <source src={postData.imageUrl} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      )
    }

    return <img src={postData.imageUrl} alt='post-media' className='h-96 w-full object-cover' />
  }
  console.log(postData)
  return (
    <div className='border shadow-xl rounded-lg'>
      <div className='mt-2 mx-auto'>
        <div className='mt-3 ml-4 flex items-center'>
          <div className='h-12 w-12 overflow-hidden border rounded-full'>
            <img
              src={userRedux.data?.profileImageUrl ?? '/src/assets/default_profile_img.jpg'}
              alt='userProfile'
              className='h-full w-full object-cover'
            />
          </div>
          <div className='px-2 py-1 '>
            <header className='font-bold'>{userRedux.data?.lastName + ' ' + userRedux.data?.firstName}</header>
            <div className='text-gray-500'>{formattedTime()}</div>
          </div>
        </div>
        <div className='mt-3 ml-6'>
          <p>{postData.content}</p>
        </div>
        {postData.imageUrl ? <div className='mt-4'>{renderMedia()}</div> : ''}
        <div className={`${postData.likes ? 'mt-3' : 'mt-1'} ml-1 flex items-center justify-between`}>
          <div>
            {postData.likes === null || postData.likes.length <= 0 ? (
              ''
            ) : (
              <div className='flex ml-4'>
                <img
                  height='18'
                  role='presentation'
                  width='18'
                  src="data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint2_radial_15251_63610)' fill-opacity='.5'/%3E%3Cpath d='M7.3014 3.8662a.6974.6974 0 0 1 .6974-.6977c.6742 0 1.2207.5465 1.2207 1.2206v1.7464a.101.101 0 0 0 .101.101h1.7953c.992 0 1.7232.9273 1.4917 1.892l-.4572 1.9047a2.301 2.301 0 0 1-2.2374 1.764H6.9185a.5752.5752 0 0 1-.5752-.5752V7.7384c0-.4168.097-.8278.2834-1.2005l.2856-.5712a3.6878 3.6878 0 0 0 .3893-1.6509l-.0002-.4496ZM4.367 7a.767.767 0 0 0-.7669.767v3.2598a.767.767 0 0 0 .767.767h.767a.3835.3835 0 0 0 .3835-.3835V7.3835A.3835.3835 0 0 0 5.134 7h-.767Z' fill='%23fff'/%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(90 .0005 8) scale(7.99958)'%3E%3Cstop offset='.5618' stop-color='%230866FF' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230866FF' stop-opacity='.1'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(45 -4.5257 10.9237) scale(10.1818)'%3E%3Cstop offset='.3143' stop-color='%2302ADFC'/%3E%3Cstop offset='1' stop-color='%2302ADFC' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3989' y1='2.3999' x2='13.5983' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2302ADFC'/%3E%3Cstop offset='.5' stop-color='%230866FF'/%3E%3Cstop offset='1' stop-color='%232B7EFF'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E"
                ></img>
                <span className='ml-1'>{postData.likes.length}</span>
              </div>
            )}
          </div>
          <div className='flex text-gray-500'>
            <div className='mr-4'>
              {postData.comments === null || postData.comments.length <= 0 ? (
                ''
              ) : (
                <div>{postData.comments.length} comments</div>
              )}
            </div>
            <div className='mr-4'>
              {postData.shares === null || postData.shares.length <= 0 ? (
                ''
              ) : (
                <div>{postData.shares.length} shares</div>
              )}
            </div>
          </div>
        </div>
        <div className='flex w-95/100 mx-auto h-10 mt-2 mb-2 border-y items-center justify-around'>
          <div
            className={`${
              Array.isArray(postData.likes) && postData.likes.includes(userRedux?.data?.id ?? '') ? 'text-blue-600' : ''
            } flex py-1 items-center justify-center font-semibold cursor-pointer`}
            onClick={handleLike}
          >
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24px'
                width='24px'
                version='1.1'
                id='Capa_1'
                viewBox='0 0 49.625 49.625'
                fill='currentColor'
              >
                <g>
                  <path d='M12.94,26.221c-3.98,0-7.96,0-11.94,0c-0.545,0-1,0.455-1,1c0,6.218,0,12.436,0,18.654   c0,0.746,0,1.491,0,2.237c0,0.545,0.455,1,1,1c3.98,0,7.96,0,11.94,0c0.273,0,0.476-0.102,0.633-0.244   c0.024-0.018,0.049-0.033,0.071-0.053c0.018-0.02,0.032-0.043,0.048-0.064c0.144-0.158,0.247-0.362,0.247-0.638   c0-6.218,0-12.436,0-18.654c0-0.746,0-1.491,0-2.237C13.94,26.676,13.485,26.221,12.94,26.221z M2,28.221c3.313,0,6.627,0,9.94,0   c0,5.885,0,11.769,0,17.654c0,0.413,0,0.825,0,1.237c-3.313,0-6.627,0-9.94,0c0-5.885,0-11.769,0-17.654   C2,29.046,2,28.633,2,28.221z M48.711,34.767c0-0.342,0-0.683,0-1.025c0.928-0.664,0.907-2.425,0.911-3.459   c0.004-0.943,0.045-1.912-0.572-2.679c-0.164-0.203-0.383-0.321-0.619-0.402c0-0.063,0-0.126,0-0.189   c0.03-0.003,0.059-0.005,0.089-0.008c0.402-0.035,0.901-0.275,0.964-0.734c0.161-1.167,0.074-2.353,0.087-3.527   c0.016-1.515-0.476-2.767-1.748-3.647c-1.318-0.912-3.153-0.71-4.684-0.735c-3.415-0.057-6.831-0.121-10.246-0.185   c0.703-0.893,1.405-1.787,2.106-2.682c1.358-1.736,2.742-3.374,3.678-5.384c0.93-1.997,1.654-4.491,0.797-6.643   c-0.603-1.514-1.916-2.644-3.545-2.895c-1.56-0.24-3.17,0.208-4.291,1.348c-0.485,0.494-0.763,1.097-1.089,1.694   c-0.341,0.624-0.71,1.234-1.083,1.839c-2.25,3.654-4.71,7.183-7.159,10.706c-2.318,3.335-4.662,6.653-7.038,9.948   c-0.006,0.008-0.005,0.018-0.01,0.026c-0.028,0.05-0.045,0.108-0.064,0.166c-0.033,0.092-0.057,0.181-0.057,0.279   c0,0.012-0.007,0.021-0.007,0.033c0,6.221,0,12.442,0,18.663c0,0.946,0,1.893,0,2.839c0,0.545,0.455,1,1,1   c6.102,0,12.205,0,18.307,0c2.924,0,5.848,0,8.772,0c1.756,0,3.407-0.741,4.349-2.296c0.521-0.86,0.432-2.152,0.519-3.125   c0.021-0.238,0.043-0.476,0.064-0.714c0.02-0.226,0.04-0.451,0.061-0.677c0.007-0.075,0.014-0.151,0.021-0.226   c0.004-0.008,0.007-0.011,0.013-0.027c0.002-0.006,0.004-0.011,0.006-0.017c1.312-0.586,1.354-2.589,1.368-3.807   c0.01-0.905,0.094-1.986-0.315-2.811C49.156,35.131,48.956,34.924,48.711,34.767z M47.908,36.508c-0.006,0-0.012-0.002-0.018-0.003   c0.065-0.005,0.129-0.001,0.203-0.019C48.036,36.5,47.948,36.505,47.908,36.508z M47.694,29.056c-0.001,0-0.002-0.001-0.003-0.002   c0.028,0,0.056,0.001,0.083,0.003C47.737,29.055,47.712,29.055,47.694,29.056z M47.243,40.268c0.057-0.03,0.086-0.045,0.103-0.054   c-0.003,0.004-0.007,0.009-0.009,0.012C47.325,40.228,47.298,40.239,47.243,40.268z M47.462,40.043   c-0.026,0.054-0.035,0.078-0.038,0.091c-0.008,0.004-0.024,0.017-0.059,0.055c-0.013,0.014-0.011,0.015-0.018,0.023   c-0.03,0.013-0.094,0.041-0.139,0.047c-0.352,0.048-0.589,0.398-0.698,0.698c-0.52,1.428-0.47,3.148-0.605,4.654   c0,0.005,0,0.006-0.001,0.011c-0.005,0.019-0.011,0.039-0.019,0.072c-0.001,0.003-0.111,0.21-0.126,0.235   c-0.145,0.239-0.378,0.428-0.588,0.606c-0.372,0.316-0.928,0.579-1.421,0.579c-0.221,0-0.443,0-0.664,0c-3.003,0-6.007,0-9.01,0   c-5.648,0-11.296,0-16.944,0c0-5.888,0-11.775,0-17.663c0-0.842,0-1.685,0-2.527c3.987-5.532,7.925-11.108,11.696-16.792   c1.009-1.521,2.01-3.052,2.94-4.623c0.307-0.518,0.597-1.044,0.868-1.581c0.075-0.149,0.166-0.288,0.261-0.424   c-0.124,0.177,0.153-0.17,0.21-0.228c0.056-0.057,0.116-0.11,0.175-0.163c0.025-0.022,0.022-0.021,0.031-0.03   c0.008-0.006,0.003-0.002,0.015-0.01c0.148-0.109,0.308-0.202,0.47-0.287c0.042-0.022,0.085-0.041,0.127-0.06   c0.011-0.002,0.114-0.044,0.14-0.054c0.148-0.052,0.301-0.091,0.454-0.125c0.043-0.009,0.086-0.016,0.13-0.023   c0.012,0,0.119-0.015,0.149-0.018c0.183-0.015,0.367-0.013,0.55-0.003c0.044,0.002,0.087,0.008,0.131,0.012   c0.01,0.003,0.119,0.019,0.149,0.025c0.155,0.03,0.306,0.074,0.456,0.123c0.019,0.006,0.09,0.034,0.128,0.048   c0.047,0.022,0.095,0.043,0.141,0.067c0.166,0.084,0.322,0.185,0.473,0.294c-0.181-0.13,0.168,0.159,0.225,0.216   c0.058,0.059,0.113,0.121,0.167,0.184c0.013,0.015,0.009,0.009,0.017,0.019c0.007,0.011,0.006,0.012,0.031,0.047   c0.279,0.394,0.325,0.545,0.431,0.906c0.137,0.463,0.139,0.621,0.146,1.091c0.008,0.531-0.068,1.005-0.186,1.517   c-0.489,2.127-1.655,3.913-2.966,5.604c-0.789,1.017-1.583,2.03-2.378,3.042c-0.352,0.448-0.704,0.895-1.056,1.343   c-0.409,0.519-1.009,1.099-0.787,1.83c0.453,1.495,2.06,1.298,3.27,1.32c1.965,0.037,3.929,0.073,5.894,0.108   c1.823,0.033,3.646,0.072,5.469,0.091c1.076,0.011,2.118,0.361,2.422,1.497c0.164,0.611,0.042,1.38,0.046,2.011   c0.002,0.397,0.001,0.793-0.007,1.189c-0.045,0.004-0.091,0.008-0.136,0.012c-0.543,0.047-1,0.419-1,1c0,0.653,0,1.306,0,1.959   c0,0.545,0.455,1,1,1c0.052,0,0.103-0.002,0.155-0.003c0.007,0.09,0.007,0.182,0.011,0.263c0.016,0.321,0.024,0.643,0.025,0.964   c0.002,0.552,0.042,1.171-0.055,1.714c-0.002,0.012-0.003,0.013-0.005,0.023c-0.661,0.049-0.935,0.595-0.852,1.11   c0,0.798,0,1.595,0,2.393c0,0.491,0.376,0.891,0.848,0.969c0.002,0.009,0.006,0.017,0.007,0.025   c0.067,0.581,0.052,1.198,0.045,1.784C47.601,38.837,47.697,39.555,47.462,40.043z' />
                </g>
              </svg>
            </span>
            <header className='ml-2'>Like</header>
          </div>
          <div className='flex py-1 items-center justify-center text-gray-500 font-semibold  cursor-pointer'>
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
          <div className='flex py-1 items-center justify-center text-gray-500 font-semibold  cursor-pointer'>
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
    </div>
  )
}

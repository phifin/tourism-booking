import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '~/store'
import { postApi } from '~/apis/post.api'
import { RootState } from '~/store'
import { likePost } from '~/store/post.slice' // Replace with your actual import
import PostUserProfile from '~/components/PostUserProfile' // Replace with your actual import
import { useForm } from 'react-hook-form'
import { userApi } from '~/apis/user.api'
import { UserModel } from '~/models/user.model'
import CommentCard from '../CommentCard'
import { PostModel } from '~/models/post.model'
import { useQuery } from '@tanstack/react-query'

interface CommentPopUpProps {
  postId: string
  likesNum: number
  liked: boolean
  // currentCommentsList: PostModel[]
  onCloseComment: () => void
}

interface FormData {
  content: string
  image: File | null
}

interface CommentData {
  userId: string
  content: string
  imageUrl: string
  postId: string
}
export default function CommentPopUp({
  onCloseComment,
  postId,
  likesNum,
  liked
  // currentCommentsList
}: CommentPopUpProps) {
  const { register, handleSubmit, setValue, reset } = useForm<FormData>()
  const dispatch = useDispatch<AppDispatch>()
  const [currentPostData, setCurrentPostData] = useState<PostModel>()
  const [currentCommentsList, setCurrentCommentsList] = useState<CommentData[]>([])
  const [postOwner, setPostOwner] = useState<UserModel>()
  const userRedux = useSelector((state: RootState) => state.user)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postApi.fetchPostById(postId)
        setCurrentPostData(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [postId, likesNum])
  // Fetch user data
  const { data: userData } = useQuery(['userData', currentPostData?.userId], () =>
    userApi.fetchUserById(currentPostData?.userId ? currentPostData?.userId : '')
  )

  // Fetch currrent user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentPostData) {
          const response = await userApi.fetchUserById(currentPostData.userId)
          setPostOwner(response) // Lưu dữ liệu vào state
        } // Gọi API
      } catch (err) {
        if (err instanceof Error) {
          console.log(err)
        }
      }
    }
    fetchData()
  }, [currentPostData])

  // State for image preview
  const [previewImage, setPreviewImage] = useState<string>('')
  const [likedState, setLikedState] = useState(liked)
  const [likedLength, setLikedLength] = useState(likesNum)
  useEffect(() => {
    if (currentPostData?.likes) {
      setLikedLength(currentPostData.likes.length) // Cập nhật lại likedLength khi có dữ liệu
    }
    setLikedState(liked)
  }, [currentPostData])

  // get comments list
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentPostData) {
          const response = await postApi.fetchCommentsByPostId(postId)
          setCurrentCommentsList(response.data) // Lưu dữ liệu vào state
        } // Gọi API
      } catch (err) {
        if (err instanceof Error) {
          console.log(err)
        }
      }
    }
    fetchData()
  }, [currentPostData, postId])

  // File input reference
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onSubmit = handleSubmit(async (data) => {
    let imageUrl = null
    if (data.image) {
      const uploadResponse = await postApi.uploadImage(data.image)
      imageUrl = uploadResponse.url
    }

    // Tạo post mới
    await postApi.createPost({
      userId: userRedux.data?.id || '',
      content: data.content,
      imageUrl: imageUrl,
      postId: postId,
      sharedPostId: null,
      travelId: null,
      rating: null
    })

    // Thêm comment mới vào danh sách sau khi gửi thành công
    if (data) {
      const newComment = {
        content: data.content,
        userId: userRedux.data?.id || '',
        postId: postId,
        imageUrl: imageUrl
      }

      // Cập nhật lại list comments bằng cách thêm comment mới
      setCurrentCommentsList((prevComments) => [...prevComments, newComment]) //
    }

    // Reset form
    reset()
    setPreviewImage('')
  })

  const handleLike = () => {
    setLikedState((prevState) => !prevState)
    setLikedLength((prevState) => {
      console.log('prevStatecheck', prevState)
      if (prevState != null && typeof prevState === 'number') {
        return likedState ? prevState - 1 : prevState + 1 // Giảm khi bỏ like, tăng khi like
      }
      return prevState
    })
    if (userRedux?.data?.id) {
      dispatch(likePost({ userId: userRedux.data.id, postId: currentPostData?.id ? currentPostData?.id : '' }))
    } else {
      alert('You need to log in to like posts!')
    }
  }

  const onUserProfileClick = () => {
    console.log('User profile clicked')
  }

  // Handle file selection
  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files[0]) {
      const previewUrl = URL.createObjectURL(files[0])
      setPreviewImage(previewUrl)
      setValue('image', files[0]) // Update form value
    }
  }

  return (
    <div
      className={`fixed ${previewImage ? 'top-6' : 'top-28'} left-95 z-40 w-1/2 border-gray-700 shadow-2xl bg-slate-50 rounded-xl `}
    >
      <div className='py-4 h-16 w-95/100 mx-auto flex justify-center items-center border-b font-bold text-xl border-gray-300'>
        <header>
          {postOwner?.firstName} {postOwner?.lastName}'s Post
        </header>
        <div
          className='absolute right-4 ml-32 p-4 h-5 w-5 flex justify-center items-center text-gray-500 hover:bg-gray-300 font-light text-sm bg-gray-200 rounded-full cursor-pointer'
          onClick={onCloseComment}
        >
          X
        </div>
      </div>

      <div className='max-h-96 overflow-auto'>
        <div>
          <PostUserProfile
            createdAt={currentPostData?.createdAt}
            userId={userData?.id || ''}
            onClick={onUserProfileClick}
          />
        </div>

        <div className='mt-4 flex-grow overflow-y-auto'>
          <div className='ml-4'>{currentPostData?.content}</div>
          <div className='mt-4'>
            {currentPostData?.imageUrl ? (
              <img src={currentPostData?.imageUrl} alt='post-image' className='h-52 w-full object-fill' />
            ) : (
              ''
            )}
          </div>
        </div>

        <div className={`${currentPostData?.likes ? 'mt-3' : 'mt-1'} ml-1 flex items-center justify-between`}>
          <div>
            {likedLength > 0 ? (
              <div className='flex ml-4'>
                <img
                  height='18'
                  role='presentation'
                  width='18'
                  src="data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint2_radial_15251_63610)' fill-opacity='.5'/%3E%3Cpath d='M7.3014 3.8662a.6974.6974 0 0 1 .6974-.6977c.6742 0 1.2207.5465 1.2207 1.2206v1.7464a.101.101 0 0 0 .101.101h1.7953c.992 0 1.7232.9273 1.4917 1.892l-.4572 1.9047a2.301 2.301 0 0 1-2.2374 1.764H6.9185a.5752.5752 0 0 1-.5752-.5752V7.7384c0-.4168.097-.8278.2834-1.2005l.2856-.5712a3.6878 3.6878 0 0 0 .3893-1.6509l-.0002-.4496ZM4.367 7a.767.767 0 0 0-.7669.767v3.2598a.767.767 0 0 0 .767.767h.767a.3835.3835 0 0 0 .3835-.3835V7.3835A.3835.3835 0 0 0 5.134 7h-.767Z' fill='%23fff'/%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(90 .0005 8) scale(7.99958)'%3E%3Cstop offset='.5618' stop-color='%230866FF' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230866FF' stop-opacity='.1'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(45 -4.5257 10.9237) scale(10.1818)'%3E%3Cstop offset='.3143' stop-color='%2302ADFC'/%3E%3Cstop offset='1' stop-color='%2302ADFC' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3989' y1='2.3999' x2='13.5983' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2302ADFC'/%3E%3Cstop offset='.5' stop-color='%230866FF'/%3E%3Cstop offset='1' stop-color='%232B7EFF'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E"
                ></img>
                <span className='ml-1'>{likedLength}</span>
              </div>
            ) : (
              ''
            )}
          </div>

          {/* <div className='flex text-gray-500'>
          <div className='mr-4'>
            {currentPostData?.comments === null || currentPostData?.comments.length <= 0 ? (
              ''
            ) : (
              <div>{currentPostData?.comments.length} comments</div>
            )}
          </div>
          <div className='mr-4'>
            {currentPostData?.shares === null || currentPostData?.shares.length <= 0 ? (
              ''
            ) : (
              <div>{currentPostData?.shares.length} shares</div>
            )}
          </div>
        </div> */}
        </div>

        <div className='flex w-95/100 mx-auto h-10 mt-2 mb-2 border-y items-center justify-around'>
          <div
            className={`${
              likedState ? 'text-blue-600' : ''
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
        {currentCommentsList
          ? currentCommentsList.map((comment, index) => {
              return (
                <div key={index}>
                  <CommentCard userId={comment.userId} content={comment.content} imageUrl={comment.imageUrl} />
                </div>
              )
            })
          : ''}
      </div>

      <div className=''>
        <form className='h-20 border-t border-gray-300 self-end flex items-center px-2 pt-2 mt-2' onSubmit={onSubmit}>
          <img
            src={
              userRedux.data?.profileImageUrl ? userRedux.data?.profileImageUrl : '/src/assets/default_profile_img.jpg'
            }
            alt='user-img'
            className='mr-2 h-10 w-10 rounded-full border border-slate-200'
          />
          <div className='relative p-1 flex items-center w-full border border-gray-300 focus-within:border-blue-500 rounded-2xl'>
            {/* Input text */}
            <input
              type='text'
              placeholder='Type your comments...'
              className='flex-grow px-3 py-3 focus:outline-none'
              {...register('content')}
            />

            {/* Nút chọn file */}
            <input type='file' style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
            <button
              onClick={handleFileUpload}
              type='button'
              className='absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center justify-center px-2 py-2 bg-gray-100 rounded-md hover:bg-gray-200'
            >
              <svg viewBox='0 0 16 16' fill='black' xmlns='http://www.w3.org/2000/svg' className='w-5 h-5'>
                <path
                  d='M7.05025 1.53553C8.03344 0.552348 9.36692 0 10.7574 0C13.6528 0 16 2.34721 16 5.24264C16 6.63308 15.4477 7.96656 14.4645 8.94975L12.4142 11L11 9.58579L13.0503 7.53553C13.6584 6.92742 14 6.10264 14 5.24264C14 3.45178 12.5482 2 10.7574 2C9.89736 2 9.07258 2.34163 8.46447 2.94975L6.41421 5L5 3.58579L7.05025 1.53553Z'
                  fill='#000000'
                />
                <path
                  d='M7.53553 13.0503L9.58579 11L11 12.4142L8.94975 14.4645C7.96656 15.4477 6.63308 16 5.24264 16C2.34721 16 0 13.6528 0 10.7574C0 9.36693 0.552347 8.03344 1.53553 7.05025L3.58579 5L5 6.41421L2.94975 8.46447C2.34163 9.07258 2 9.89736 2 10.7574C2 12.5482 3.45178 14 5.24264 14C6.10264 14 6.92742 13.6584 7.53553 13.0503Z'
                  fill='#000000'
                />
                <path
                  d='M5.70711 11.7071L11.7071 5.70711L10.2929 4.29289L4.29289 10.2929L5.70711 11.7071Z'
                  fill='#000000'
                />
              </svg>
            </button>
          </div>

          <button className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600' type='submit'>
            Send
          </button>
        </form>
        {previewImage && <img src={previewImage} className='mt-1 h-28 w-28 mb-5 ml-16' alt='Preview' />}
      </div>
    </div>
  )
}

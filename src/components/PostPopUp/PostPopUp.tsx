import React, { useRef, useState } from 'react'
import PostUserProfile from '../PostUserProfile'
import { RootState } from '~/store'
import { useForm } from 'react-hook-form'
import { postApi } from '~/apis/post.api'
import { AppDispatch } from '~/store'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '~/store/post.slice'

interface FormData {
  content: string
  image: File | null
}

interface PostPopUpProps {
  onClick: () => void
}

export default function PostPopUp({ onClick }: PostPopUpProps) {
  const { register, handleSubmit, setValue } = useForm<FormData>()
  const dispatch: AppDispatch = useDispatch()

  // Fetch user data
  const userData = useSelector((state: RootState) => state.user)

  // State for image preview
  const [previewImage, setPreviewImage] = useState<string>('')

  // File input reference
  const fileInputRef = useRef<HTMLInputElement>(null)
  const onSubmit = handleSubmit(async (data) => {
    let imageUrl = null
    if (data.image) {
      const uploadResponse = await postApi.uploadImage(data.image)
      imageUrl = uploadResponse.url
    }

    const resultAction = await dispatch(
      createPost({
        userId: userData.data?.id ? userData.data?.id : '',
        content: data.content,
        imageUrl: imageUrl,
        postId: null,
        sharedPostId: null,
        travelId: null
      })
    )
    if (createPost.fulfilled.match(resultAction)) {
      console.log('Post created successfully:', resultAction.payload)
    } else if (createPost.rejected.match(resultAction)) {
      // Hiển thị lỗi cho người dùng
      console.log(`Post creation failed: ${resultAction.payload}`)
      console.error('Post creation failed:', resultAction.payload)
    }
    onClick()
  })

  const onUserProfileClick = () => {
    console.log('clicked up')
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
    <form
      className={`fixed justify-center top-40 left-95 z-50 
         w-1/2 border-gray-700 shadow-2xl bg-slate-50 rounded-xl ${previewImage ? 'h-120 overflow-y-scroll' : 'h-95'}`}
      onSubmit={onSubmit}
    >
      <div className='py-4 h-1/6 w-95/100 mx-auto flex justify-center items-center border-b font-bold text-xl border-gray-300 relative'>
        <header>Create post</header>
        <div
          className='absolute right-4 ml-32 p-4 h-5 w-5 flex justify-center items-center text-gray-500 hover:bg-gray-300 font-light text-sm bg-gray-200 rounded-full cursor-pointer'
          onClick={onClick}
        >
          X
        </div>
      </div>
      <div>
        <PostUserProfile
          createdAt={undefined}
          userId={userData.data?.id ? userData.data?.id : ''}
          onClick={onUserProfileClick}
        />
      </div>
      <input
        className='mt-4 ml-4 w-95/100 text-2xl border-none focus:ring-0 focus:outline-none bg-slate-50'
        type='text'
        placeholder='What is on your mind ?'
        {...register('content')} // Register form field
      />
      {previewImage && <img src={previewImage} className='mt-4 mx-auto h-64 w-95/100' alt='Preview' />}
      <div
        className={`flex items-center justify-between ${previewImage ? 'mt-5' : 'mt-16'} h-14 mx-auto border w-95/100 border-gray-400 rounded-xl font-semibold`}
      >
        <header className='ml-4'>Add to your post</header>
        <input type='file' style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
        <button
          onClick={handleFileUpload}
          type='button'
          className='bg-blue-500 text-white mr-3 px-4 py-2 rounded-lg hover:bg-blue-600'
        >
          Choose File
        </button>
      </div>
      <button
        type='submit'
        className='flex items-center justify-center mt-3 h-12 mx-auto bg-blue-600 hover:bg-blue-700 text-white border w-95/100 border-gray-400 rounded-xl font-semibold cursor-pointer'
      >
        Post
      </button>
    </form>
  )
}

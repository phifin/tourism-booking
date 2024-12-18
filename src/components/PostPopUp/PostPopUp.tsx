import React from 'react'
import PostUserProfile from '../PostUserProfile'
import { useQuery } from '@tanstack/react-query'
import { AppContext } from '~/context/app.context'
import { useContext } from 'react'
import userDataApi from '~/apis/userData.api'
import { useRef } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import postDataApi from '~/apis/post.api'

interface PostPopUpProps {
  onClick: () => void
}

interface FormData {
  userId: string | undefined
  content: string
  image: File
  postId: string
}

export default function PostPopUp({ onClick }: PostPopUpProps) {
  const { register, handleSubmit, setValue } = useForm<FormData>()
  const createPostMutation = useMutation({
    mutationFn: ({ userId, content, image, postId }: FormData) => postDataApi.createPost(userId, content, image, postId)
  })

  const onSubmit = handleSubmit(async (data) => {
    const body = {
      userId: userData?.data._id,
      content: data.content,
      image: data.image,
      postId: data.postId
    }
    createPostMutation.mutate(body, {
      onSuccess: async (response) => {
        console.log(response)
      },
      onError: async (error) => {
        console.log('image:', data.image)
        console.log(error)
      }
    })
  })

  const { userEmail } = useContext(AppContext)
  const { data: userData } = useQuery(['userData', userEmail], () => userDataApi.getUserData(userEmail), {})

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewImage, setPreviewImage] = useState<string>('') // URL preview của ảnh

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click() // Mở hộp thoại chọn file
    }
  }

  // Cập nhật file và preview hình ảnh
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files // Lấy danh sách file
    if (files && files[0]) {
      const previewUrl = URL.createObjectURL(files[0])
      setPreviewImage(previewUrl)
      setValue('image', files[0])
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
        <PostUserProfile createdAt='' userId={userData?.data._id ? userData?.data._id : ''} />
      </div>
      <input
        className='mt-4 ml-4 w-95/100 text-2xl border-none focus:ring-0 focus:outline-none bg-slate-50'
        type='text'
        placeholder='What is on your mind ?'
        {...register('content')} // React Hook Form sẽ tự động gán ref ở đây
      />
      <div>{previewImage && <img src={previewImage} className='mt-4 mx-auto h-64 w-95/100'></img>}</div>
      <div
        className={`flex items-center justify-between ${previewImage ? 'mt-5' : 'mt-16'} h-14 mx-auto border w-95/100 border-gray-400 rounded-xl font-semibold`}
      >
        <header className='ml-4'>Add to your post</header>
        {/* Chỉ dùng useRef để thao tác DOM, không dùng với register */}
        <input
          type='file'
          style={{ display: 'none' }}
          ref={fileInputRef} // Sử dụng ref của useRef chỉ để thao tác với DOM
          onChange={handleFileChange} // Hàm xử lý thay đổi file
        />
        <div>
          <button
            onClick={handleFileUpload} // Sử dụng hàm này để mở hộp thoại chọn file
            className='bg-blue-500 text-white mr-3 px-4 py-2 rounded-lg hover:bg-blue-600'
          >
            Choose File
          </button>
        </div>
      </div>
      <button
        type='submit'
        className='flex items-center justify-center mt-3 h-12 mx-auto bg-blue-600 hover:bg-blue-700 text-white border w-95/100 border-gray-400 rounded-xl font-semibold cursor-pointer'
      >
        <header className='ml-4'>Post</header>
      </button>
    </form>
  )
}

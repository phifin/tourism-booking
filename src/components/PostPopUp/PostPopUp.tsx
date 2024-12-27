import React, { useRef, useState, useContext } from 'react'
import PostUserProfile from '../PostUserProfile'
import { useQuery, useMutation } from '@tanstack/react-query'
import { AppContext } from '~/context/app.context'
import { useForm } from 'react-hook-form'
import { userApi } from '~/apis/user.api'
import { postApi } from '~/apis/post.api'

interface FormData {
  content: string
  image: File | null
}

interface PostPopUpProps {
  onClick: () => void
}

export default function PostPopUp({ onClick }: PostPopUpProps) {
  const { register, handleSubmit, setValue, reset, watch } = useForm<FormData>()
  const { userEmail } = useContext(AppContext)

  // Fetch user data
  const { data: userData } = useQuery(['userData', userEmail], () => userApi.fetchUserByEmail(userEmail))

  // State for image preview
  const [previewImage, setPreviewImage] = useState<string>('')

  // File input reference
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Mutation for creating post
  const createPostMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      let imageUrl = null

      if (formData.image) {
        const uploadResponse = await postApi.uploadImage(formData.image)
        imageUrl = uploadResponse.url
      }

      return postApi.createPost({
        userId: userData?.id,
        content: formData.content,
        postId: null,
        imageUrl
      })
    },
    onSuccess: () => {
      console.log('Post created successfully')
      reset() // Reset form
      setPreviewImage('') // Clear preview image
      onClick() // Close popup
    },
    onError: (error) => {
      console.error('Error creating post:', error)
    }
  })

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

  const onSubmit = handleSubmit((data) => {
    createPostMutation.mutate(data)
  })

  const content = watch('content')
  const image = watch('image')

  // Enable button only if content or image is provided, and not during mutation loading
  const isPostEnabled = !!content || (!!image && !createPostMutation.isLoading)

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
        <PostUserProfile createdAt='' userId={userData?.id ? userData?.id : ''} />
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
        disabled={!isPostEnabled} // Disable button while loading
        className='flex items-center justify-center mt-3 h-12 mx-auto bg-blue-600 hover:bg-blue-700 text-white border w-95/100 border-gray-400 rounded-xl font-semibold cursor-pointer'
      >
        {createPostMutation.isLoading ? 'Posting...' : 'Post'}
      </button>
    </form>
  )
}

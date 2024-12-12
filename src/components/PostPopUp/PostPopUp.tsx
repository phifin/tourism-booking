import React from 'react'
import PostUserProfile from '../PostUserProfile'
import { useQuery } from '@tanstack/react-query'
import { AppContext } from '~/context/app.context'
import { useContext } from 'react'
import userDataApi from '~/apis/userData.api'
import { useRef } from 'react'
interface PostPopUpProps {
  onClick: () => void
}

export default function PostPopUp({ onClick }: PostPopUpProps) {
  const { userEmail } = useContext(AppContext)
  const { data: userData } = useQuery(['userData', userEmail], () => userDataApi.getUserData(userEmail), {})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    } // Mở hộp thoại chọn file
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files // Lấy danh sách file
    if (files && files[0]) {
      console.log('Selected file:', files[0].name) // Xử lý file nếu có
    }
  }
  return (
    <div
      className={`fixed justify-center top-40 left-95 z-50 
        h-95 w-1/2 border-gray-700 shadow-2xl bg-slate-50 rounded-xl `}
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
      />
      <div className='flex items-center justify-between mt-16 h-14 mx-auto border w-95/100 border-gray-400 rounded-xl font-semibold'>
        <header className='ml-4'>Add to your post</header>
        <input type='file' ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
        <button
          onClick={handleFileUpload}
          className='bg-blue-500 text-white mr-4 px-4 py-2 rounded-lg hover:bg-blue-600'
        >
          Choose File
        </button>
      </div>
      <div className='flex items-center justify-center mt-3 h-12 mx-auto bg-blue-600 hover:bg-blue-700 text-white border w-95/100 border-gray-400 rounded-xl font-semibold cursor-pointer'>
        <header className='ml-4'>Post</header>
      </div>
    </div>
  )
}

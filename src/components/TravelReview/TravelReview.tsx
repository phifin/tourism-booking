import React, { useState, useEffect } from 'react'
import { RootState } from '~/store'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { postApi } from '~/apis/post.api'
import CommentCard from '../CommentCard'

interface FormData {
  content: string
}

interface CommentData {
  userId: string
  content: string
  travelId: string
  rating?: number
}

interface TravelReviewProps {
  travelId: string
}

export default function TravelReview({ travelId }: TravelReviewProps) {
  const userData = useSelector((state: RootState) => state.user)
  const { register, handleSubmit, reset } = useForm<FormData>()
  const [currentCommentsList, setCurrentCommentsList] = useState<CommentData[]>([])
  const [rating, setRating] = useState<number>(0) // Lưu trạng thái đánh giá sao
  const [hoverRating, setHoverRating] = useState<number>(0) // Lưu trạng thái hover

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postApi.getReviewsOfPost(travelId)
        setCurrentCommentsList(response.data)
      } catch (err) {
        if (err instanceof Error) {
          console.log(err)
        }
      }
    }
    fetchData()
  }, [travelId])

  const onSubmit = handleSubmit(async (data) => {
    await postApi.createPost({
      userId: userData.data?.id || '',
      content: data.content,
      imageUrl: null,
      postId: null,
      sharedPostId: null,
      travelId: travelId,
      rating: rating
    })

    if (data) {
      const newComment = {
        content: data.content,
        userId: userData.data?.id || '',
        travelId: travelId,
        rating: rating
      }
      setCurrentCommentsList((prevComments) => [...prevComments, newComment])
    }

    reset()
    setRating(0)
  })

  const handleStarClick = (starValue: number) => {
    setRating(starValue)
  }

  const handleMouseEnter = (starValue: number) => {
    setHoverRating(starValue)
  }

  const handleMouseLeave = () => {
    setHoverRating(0)
  }

  return (
    <div className='mt-5 pb-20'>
      {/* Star Rating */}
      <div className='flex justify-start items-center mt-2 px-2 pt-4 border-t border-gray-300 ml-12'>
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1
          return (
            <svg
              key={starValue}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill={starValue <= (hoverRating || rating) ? '#ffc107' : '#ccc'}
              className='w-8 h-8 cursor-pointer'
              onClick={() => handleStarClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
            >
              <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
            </svg>
          )
        })}
      </div>
      <form className='h-32  self-end flex items-start  px-2  mt-4' onSubmit={onSubmit}>
        <img
          src={userData.data?.profileImageUrl ? userData.data?.profileImageUrl : '/src/assets/default_profile_img.jpg'}
          alt='user-img'
          className='mr-2 h-10 w-10 rounded-full border border-slate-200'
        />
        <div className='relative h-3/4 p-1 flex items-center w-full border border-gray-300 focus-within:border-blue-500 rounded-xl'>
          <input
            type='text'
            placeholder='Type your reviews...'
            className=' px-3 w-full py-3 focus:outline-none'
            {...register('content')}
          />
        </div>
        <button className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600' type='submit'>
          Send
        </button>
      </form>

      <div className=''>
        <header className='ml-10 mt-2 text-2xl font-semibold'>Other Reviews</header>
        <div className='mt-4'>
          {currentCommentsList
            ? currentCommentsList.map((comment, index) => {
                return (
                  <div key={index} className='mt-4 flex items-center break-words w-full'>
                    <div className=''>
                      <CommentCard userId={comment.userId} content={comment.content} imageUrl={undefined} />
                    </div>
                    {comment.rating ? (
                      <div className='flex'>
                        {Array.from({ length: comment.rating }).map((_, starIndex) => (
                          <svg
                            key={starIndex}
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='#ffc107' // Màu vàng cho sao
                            className='w-5 h-5'
                          >
                            <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                          </svg>
                        ))}
                      </div>
                    ) : null}
                  </div>
                )
              })
            : ''}
        </div>
      </div>
    </div>
  )
}

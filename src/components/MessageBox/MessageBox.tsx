import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { format, isToday, differenceInDays } from 'date-fns'

interface MessageBoxProps {
  userId: string
  message: string
  createdAt: string
}

export default function MessageBox({ userId, message, createdAt }: MessageBoxProps) {
  const userRedux = useSelector((state: RootState) => state.user)

  const formattedTime = () => {
    if (!createdAt) {
      return undefined
    }

    const createdDate = new Date(createdAt)
    const daysDifference = differenceInDays(new Date(), createdDate)

    // Nếu là ngày hôm nay
    if (isToday(createdDate)) {
      return format(createdDate, 'HH:mm') // Hiển thị giờ và phút
    }

    // Nếu là ngày hôm qua (ngày cách hiện tại 1 ngày)
    if (daysDifference === 1) {
      return 'Yesterday' // Hoặc bạn có thể sử dụng một định dạng khác như 'Ngày hôm qua'
    }

    // Nếu là cùng năm
    const currentYear = new Date().getFullYear()
    if (createdDate.getFullYear() === currentYear) {
      return format(createdDate, 'MM-dd') // Chỉ hiển thị tháng và ngày
    }

    // Nếu là năm khác
    return format(createdDate, 'yyyy-MM-dd') // Hiển thị năm, tháng, ngày
  }

  return (
    <div className='mt-2 cursor-pointer'>
      {createdAt ? <div className='text-gray-500 text-sm opacity-70 text-center mt-1'>{formattedTime()}</div> : ''}
      {userId !== userRedux.data?.id ? (
        <div className='flex items-center'>
          <div className='h-12 w-12 object-cover overflow-hidden border rounded-full'>
            <img
              src={
                userRedux.data?.profileImageUrl
                  ? userRedux.data?.profileImageUrl
                  : '/src/assets/default_profile_img.jpg'
              }
              alt='userProfile'
              className='h-full w-full object-cover'
            />
          </div>
          <div className='flex max-w-52 px-2 py-2 ml-2 mt-1 bg-slate-100 rounded-xl'>
            <div className='max-w-48 break-words'>{message}</div>
          </div>
        </div>
      ) : (
        ''
      )}
      {/* message from current user */}
      {userId === userRedux.data?.id ? (
        <div className='flex items-center mt-1 justify-end'>
          <div className='flex max-w-52 py-2 px-2 mr-2 mt-1 bg-blue-500 text-white rounded-xl '>
            <div className='max-w-48 break-words'>{message}</div>
          </div>

          <div className='h-12 w-12 object-cover overflow-hidden border rounded-full'>
            <img
              src={
                userRedux.data?.profileImageUrl
                  ? userRedux.data?.profileImageUrl
                  : '/src/assets/default_profile_img.jpg'
              }
              alt='userProfile'
              className='h-full w-full object-cover'
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

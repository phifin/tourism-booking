import { useEffect, useState, useRef } from 'react'
import { userApi } from '~/apis/user.api'
import { UserModel } from '~/models/user.model'
import messageApi from '~/apis/chat.api'
import { MessageModel } from '~/models/message.model'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import MessageBox from '../MessageBox'

interface ChattingFormProps {
  userId: string // ID của user cần fetch
  onClose: () => void
}

export default function ChattingForm({ userId, onClose }: ChattingFormProps) {
  const userRedux = useSelector((state: RootState) => state.user)
  const [user, setUser] = useState<UserModel | null>(null) // State để lưu thông tin user
  const [loading, setLoading] = useState(true) // State quản lý trạng thái loading
  const [error, setError] = useState<string | null>(null) // State lưu lỗi, nếu có
  const [message, setMessage] = useState('') // State để lưu tin nhắn hiện tại
  const [messages, setMessages] = useState<MessageModel[]>([]) // State tin nhắn
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const socketRef = useRef<WebSocket | null>(null) // Reference lưu trữ WebSocket

  // Hàm cuộn xuống cuối danh sách tin nhắn khi mới tải
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]) // Chạy mỗi khi messages thay đổi

  // Di chuyển hàm fetchMessages vào trong useEffect với dependency là userId và user
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const allMessages = await messageApi.getMessages()
        const currentUserId = userRedux.data?.id ? userRedux.data?.id : ''
        const targetUserId = user?.id // ID người mà người dùng muốn nhắn tin tới

        if (!targetUserId) return

        const getConversationId = (userId1: string, userId2: string) => {
          return userId1 < userId2 ? `${userId1}-${userId2}` : `${userId2}-${userId1}`
        }

        const messagesArray = allMessages
          .filter((message: MessageModel) => {
            const sortedConversationId = getConversationId(currentUserId, targetUserId)
            return message.conversationId === sortedConversationId
          })
          .map((message: MessageModel) => ({
            id: message.id,
            conversationId: message.conversationId,
            message: message.message,
            sender: message.sender,
            receiver: message.receiver,
            createdAt: message.createdAt
          }))

        setMessages(messagesArray)
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }

    if (user?.id) {
      fetchMessages() // Gọi fetchMessages chỉ khi có user
    }
  }, [userId, user, userRedux.data?.id]) // Chỉ gọi khi `userId` hoặc `user` thay đổi

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true) // Bắt đầu loading
      try {
        const response = await userApi.fetchUserById(userId) // Gọi API
        setUser(response) // Lưu dữ liệu vào state
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message) // Lưu lỗi
        } else {
          setError('An unknown error occurred')
        }
      } finally {
        setLoading(false) // Kết thúc loading
      }
    }

    fetchData()
  }, [userId])

  // Hàm mở kết nối WebSocket
  const openWebSocket = () => {
    if (user && userRedux.data) {
      // const connectionId = user.id < userRedux.data.id ? user.id : userRedux.data?.id

      const socket = new WebSocket(`ws://localhost:8080/VelocityBackend_war_exploded/websocket/${userRedux.data.id}`)
      socketRef.current = socket

      // Lắng nghe các tin nhắn mới từ server
      socket.onmessage = (event) => {
        try {
          const messageData = event.data.trim() // Xóa khoảng trắng thừa ở đầu/cuối
          const jsonData = messageData.replace(/^(Success): /, '')
          const parsedMessage = JSON.parse(jsonData) // Parse JSON từ server

          console.log(parsedMessage)

          // Kiểm tra nếu message là thông điệp chào mừng
          if (parsedMessage.message === 'Welcome to WebSocket server!') {
            return // Bỏ qua thông điệp chào mừng
          }

          // Kiểm tra nếu message có tiền tố "Error: " và xử lý riêng
          if (messageData.startsWith('Error: ')) {
            console.error('Server error:', messageData)
            return
          }

          // Loại bỏ phần "Success: " hoặc "Error: " nếu có
          // const jsonData = messageData.replace(/^(Success): /, '')

          // Kiểm tra xem có phải là JSON hợp lệ không
          let newMessage = null
          try {
            newMessage = JSON.parse(jsonData) // Thử parse JSON
          } catch (parseError) {
            console.error('Error parsing WebSocket message:', parseError)
            return
          }

          // Nếu là JSON hợp lệ, cập nhật tin nhắn
          if (newMessage) {
            setMessages((prevMessages) => [...prevMessages, newMessage])
          }
        } catch (error) {
          console.error('Error in WebSocket message handler:', error)
        }
      }

      // Xử lý đóng kết nối
      socket.onclose = () => {
        console.log('WebSocket closed')
      }

      // Xử lý lỗi WebSocket
      socket.onerror = (error) => {
        console.log('WebSocket error:', error)
      }
    }
  }

  // Hàm đóng kết nối WebSocket
  const closeWebSocket = () => {
    // if (!user) {
    //   if (socketRef.current) {
    //     socketRef.current.close()
    //   }
    // }
  }

  // Gọi hàm mở kết nối khi component mount và đóng kết nối khi không có user hợp lệ
  useEffect(() => {
    if (user) {
      openWebSocket() // Mở WebSocket nếu có user hợp lệ
    } else {
      closeWebSocket() // Đóng WebSocket nếu không có user hợp lệ
    }

    return () => {
      closeWebSocket() // Đảm bảo đóng WebSocket khi không có user hợp lệ
    }
  }, [user]) // Chạy khi `user` thay đổi

  // Xử lý gửi tin nhắn
  const handleSendMessage = () => {
    if (message.trim() === '') return // Không gửi tin nhắn rỗng
    console.log('Message sent:', message)

    // Gửi tin nhắn qua WebSocket
    if (socketRef.current) {
      socketRef.current.send(JSON.stringify({ message, sender: userRedux.data?.id, receiver: user?.id }))
    }

    setMessage('') // Xóa nội dung input sau khi gửi
  }

  // Hiển thị trạng thái loading, lỗi, hoặc thông tin user
  if (loading) {
    return (
      <div className='h-104 w-90 fixed right-52 bottom-0 border border-gray-200 bg-white z-50 rounded-xl overflow-y-auto flex flex-col'>
        {/* Shimmer header */}
        <div className='pl-3 h-12 flex items-center bg-gray-300 animate-pulse rounded-t-xl'></div>

        {/* Shimmer content */}
        <div className='p-3 flex-1 overflow-y-auto'>
          {[...Array(5)].map((_, index) => (
            <div key={index} className='flex space-x-4 mb-4'>
              <div className='w-10 h-10 bg-gray-300 rounded-full animate-pulse'></div>
              <div className='flex-1 space-y-2'>
                <div className='h-4 bg-gray-300 rounded animate-pulse w-3/4'></div>
                <div className='h-4 bg-gray-300 rounded animate-pulse w-1/2'></div>
              </div>
            </div>
          ))}
        </div>

        {/* Shimmer input */}
        <div className='h-12 border-t border-gray-300 flex items-center p-2 bg-gray-200 animate-pulse rounded-b-xl'></div>
      </div>
    )
  }
  if (error)
    return <div className='h-96 w-80 fixed right-52 bottom-0 border border-gray-600 bg-white z-50'>Error: {error}</div>

  return (
    <div className='h-104 w-90 fixed right-52 bottom-0 border border-gray-200 bg-white z-50 rounded-xl overflow-y-auto flex flex-col'>
      {/* Header */}
      <div className='pl-3 h-12 flex justify-between items-center text-white bg-blue-500'>
        <div className='flex items-center mt-1 font-bold'>
          <img
            src={user?.profileImageUrl ? user?.profileImageUrl : '/src/assets/default_profile_img.jpg'}
            alt='userimg'
            className='h-7 w-7 rounded-full object-cover'
          />
          <header className='ml-2'>
            {user?.firstName} {user?.lastName}
          </header>
        </div>
        <div
          onClick={onClose}
          className='flex justify-center items-center h-8 w-8 cursor-pointer mt-1 mr-2 mb-2 font-extralight text-sm hover:bg-blue-600 rounded-2xl'
        >
          X
        </div>
      </div>

      {/* Content */}
      <div className='flex-grow p-3 overflow-y-auto'>
        <div className='flex-grow '>
          {messages.map((message, index) => (
            <MessageBox key={index} userId={message.sender} message={message.message} createdAt={message.createdAt} />
          ))}
        </div>
        {/* Thêm một phần tử trống để cuộn đến cuối */}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      <div className='h-12 border-t border-gray-300 flex items-center p-2'>
        <input
          type='text'
          placeholder='Type your message...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} // Gửi tin nhắn khi nhấn Enter
          className='flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
        />
        <button
          onClick={handleSendMessage}
          className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
        >
          Send
        </button>
      </div>
    </div>
  )
}

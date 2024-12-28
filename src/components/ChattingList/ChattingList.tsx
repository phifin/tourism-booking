import React, { useEffect, useState } from 'react'
import { userApi } from '~/apis/user.api'
import { UserModel } from '~/models/user.model'
import PostUserProfile from '../PostUserProfile'
import ChattingForm from '~/components/ChattingForm'

export default function ChattingList() {
  // State để lưu danh sách user, trạng thái loading, và lỗi
  const [users, setUsers] = useState<UserModel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // State để lưu ID của user đang được chọn và trạng thái mở/đóng khung chat
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)

  // Lấy danh sách user từ API khi component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userApi.fetchAllUsers()
        setUsers(response) // Lưu dữ liệu vào state
      } catch (err) {
        setError((err as Error).message || 'Failed to fetch users')
      } finally {
        setLoading(false) // Đánh dấu kết thúc việc lấy dữ liệu
      }
    }

    fetchUsers()
  }, []) // Chạy chỉ một lần khi component mount

  // Khi nhấn vào một user, cập nhật selectedUserId và mở khung chat
  const onUserClick = (userId: string) => {
    setSelectedUserId(userId)
    setIsChatOpen(true) // Mở khung chat
  }

  // Hàm đóng khung chat
  const closeChat = () => {
    setIsChatOpen(false)
    setSelectedUserId(null) // Xóa userId đã chọn khi đóng
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className='fixed right-4 bottom-5 w-80 shadow-lg bg-white p-4 rounded-lg'>
      <h2 className='text-lg font-bold mb-4'>Chatting List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className='mb-2'>
            {/* Gọi PostUserProfile và truyền onClick */}
            <PostUserProfile
              userId={user.id}
              createdAt={undefined}
              onClick={() => onUserClick(user.id)} // Gửi userId khi click
            />
          </li>
        ))}
      </ul>

      {/* Hiển thị ChattingForm nếu isChatOpen là true */}
      {isChatOpen && selectedUserId && <ChattingForm userId={selectedUserId} onClose={closeChat} />}
    </div>
  )
}

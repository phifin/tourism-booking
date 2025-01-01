import React, { useEffect, useState } from 'react'
import { userApi } from '~/apis/user.api'
import { UserModel } from '~/models/user.model'
import PostUserProfile from '../PostUserProfile'
import ChattingForm from '~/components/ChattingForm'
// import { useSelector } from 'react-redux'
// import { RootState } from '~/store'

export default function ChattingList() {
  const [users, setUsers] = useState<UserModel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // const userRedux = useSelector((state: RootState) => state.user)

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userApi.fetchAllUsers()
        setUsers(response)
      } catch (err) {
        setError((err as Error).message || 'Failed to fetch users')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const onUserClick = (userId: string) => {
    setSelectedUserId(userId)
    setIsChatOpen(true)
  }

  const closeChat = () => {
    setIsChatOpen(false)
    setSelectedUserId(null)
  }

  if (loading) {
    return (
      <div className='fixed right-4 max-h-96 bottom-5 w-80 shadow-lg bg-white p-4 rounded-lg overflow-y-auto'>
        <h2 className='text-lg font-bold mb-4'>Chatting List</h2>
        <ul className='space-y-4'>
          {[...Array(5)].map((_, index) => (
            <li key={index} className='flex items-center space-x-4'>
              <div className='w-10 h-10 bg-gray-300 rounded-full animate-pulse'></div>
              <div className='flex-1'>
                <div className='h-4 bg-gray-300 rounded w-3/4 animate-pulse mb-2'></div>
                <div className='h-4 bg-gray-300 rounded w-1/2 animate-pulse'></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  if (error) return <div>Error: {error}</div>

  return (
    <div className='fixed right-4 max-h-96 bottom-5 w-80 shadow-lg bg-white p-4 rounded-lg overflow-y-auto'>
      <h2 className='text-lg font-bold mb-4'>Chatting List</h2>
      <ul>
        {users
          // .filter((user) => user.id !== userRedux?.data?.id)
          .map((user) => (
            <li key={user.id} className='mb-2'>
              <PostUserProfile userId={user.id} createdAt={undefined} onClick={() => onUserClick(user.id)} />
            </li>
          ))}
      </ul>

      {isChatOpen && selectedUserId && <ChattingForm userId={selectedUserId} onClose={closeChat} />}
    </div>
  )
}

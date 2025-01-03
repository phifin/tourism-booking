import React from 'react'
import { useQuery } from '@tanstack/react-query'
import messageApi from '~/apis/chat.api'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { userApi } from '~/apis/user.api'

export default function NotificationPopUp() {
  const { data: notifications } = useQuery(['notifications'], messageApi.getNotification)
  const userRedux = useSelector((state: RootState) => state.user)

  // Filter notifications where the receiver is the current user
  const userNotifications = notifications?.filter((notification: any) => notification.receiver === userRedux.data?.id)

  // Get the 5 most recent notifications
  const recentNotifications = userNotifications?.slice(0, 5)

  const handleAccept = async (notificationSender: string) => {
    try {
      await userApi.addFriend(userRedux.data?.id ? userRedux.data?.id : '', notificationSender) // Assuming this API exists
    } catch (error) {
      console.error('Error accepting friend request:', error)
    }
  }

  return (
    <div className='notification-popup border rounded-lg p-4 shadow-lg text-black bg-white w-80'>
      <h3 className='text-lg font-bold mb-4'>Notifications</h3>
      {userNotifications && userNotifications.length > 0 ? (
        <div className='max-h-96 overflow-y-auto'>
          <ul className='space-y-2'>
            {recentNotifications.map((notification: any) => (
              <li
                key={notification.id}
                className='notification-item p-2 border rounded-md bg-gray-100 hover:bg-gray-200 transition'
              >
                <div className='text-sm font-medium'>
                  {notification.senderName || 'Brown'} sent you a friend request.
                </div>
                <button
                  className='mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600'
                  onClick={() => handleAccept(notification.sender)}
                >
                  Accept
                </button>
              </li>
            ))}
          </ul>
          {userNotifications.length > 5 && (
            <div className='text-xs text-gray-500 mt-2'>
              Showing 5 of {userNotifications.length} notifications. Scroll for more.
            </div>
          )}
        </div>
      ) : (
        <p className='text-sm text-gray-500'>No notifications found.</p>
      )}
    </div>
  )
}

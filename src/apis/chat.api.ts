import { MessageModel } from '~/models/message.model'
import http from '~/utils/http'

const URLGetAllMessages = 'message'
const URLGetAllNotification = '/notification'

const messageApi = {
  getMessages: async () => {
    try {
      // Gửi yêu cầu GET tới API để lấy danh sách tin nhắn theo conversationId
      const response = await http.get<MessageModel[]>(URLGetAllMessages)
      return response.data // Trả về danh sách tin nhắn
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Failed to fetch messages:', error)
      throw error
    }
  },
  getNotification: async () => {
    try {
      const response = await http.get(URLGetAllNotification)
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
  postNotification: async (type: string, sender: string, receiver: string) => {
    try {
      const body = { type, sender, receiver }
      const response = await http.post(URLGetAllNotification, body)
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
  deleteNotification: async (notiId: string) => {
    try {
      const response = http.delete(`${URLGetAllNotification}/${notiId}`)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  // Hàm gửi tin nhắn mới
}

export default messageApi

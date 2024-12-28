import { MessageModel } from '~/models/message.model'
import http from '~/utils/http'

const URLGetAllMessages = 'message'

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
  }

  // Hàm gửi tin nhắn mới
}

export default messageApi

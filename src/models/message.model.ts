export interface MessageModel {
  id: string // ID của tin nhắn
  conversationId: string // ID của cuộc trò chuyện
  message: string // Nội dung tin nhắn
  sender: string // ID của người gửi
  receiver: string // ID của người nhận
  createdAt: string // Thời gian tạo tin nhắn (ISO 8601 format)
}

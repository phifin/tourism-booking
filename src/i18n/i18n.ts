import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
}

// the translations
const resources = {
  en: {
    translation: {
      where_to_next: 'Where to next?',
      home: 'Home',
      my_bookings: 'My Bookings',
      social_media: 'Social Media',
      admin: 'Admin',
      booking_cart: 'Booking Cart',
      list_your_property: 'List Your Property',
      create_post: 'Create Post',
      chatting_list: 'Chatting List',
      most_attractive_place: 'Most Attractive Place',
      big_sale_for_christmas: 'Big Sale For Christmas',
      big_sale_12_12: '12.12 Big Sale Coming',
      suitable_flights: 'Your Best Suitable Flights',
      comfortable_houses: 'Most Comfortable And Convenient Houses',
      reasonable_car_rental: 'Most Reasonable Pricing Car Rental',
      your_bookings: 'Your Bookings',
      like: 'Like',
      comment: 'Comment',
      share: 'Share',
      where_are_you_going: 'Where are you going?',
      price_range: 'Price Range',
      time_budget: 'Time Budget',
      search: 'Search',
      hotels: 'Hotels',
      car_rentals: 'Car Rentals',
      tours: 'Tours',
      flights: 'Flights',
      filter_by: 'Filter By',
      your_orders: 'Your Orders',
      subtotal: 'Subtotal',
      tax: 'Tax',
      total: 'Total',
      proceed_to_payment: 'Proceed to Payment',
      continue_to_order: 'Continue to order',
      admin_space: 'Admin Space',
      enter_property_info: 'Enter the information of property',
      choose_property_type: 'Choose the type of property',
      title: 'Title',
      description: 'Description',
      image: 'Image',
      body: 'Body',
      price: 'Price',
      address: 'Address',
      contact: 'Contact',
      enter_tour_title: 'Enter the title of your tour',
      enter_tour_description: 'Enter the description of your tour',
      enter_tour_info: 'Enter the information of your tour',
      choose_file: 'Choose File',
      enter_tour_price: 'Enter the price of your tour',
      enter_tour_address: 'Enter the address of your tour',
      enter_tour_contact: 'Enter the contact of your tour',
      finished: 'Finished',
      manage_posted_travels: 'Manage all Posted Travels',
      manage_account: 'Manage Account',
      bookings_and_trips: 'Bookings & trips',
      reviews: 'Reviews',
      saved: 'Saved',
      log_out: 'Log out',
      choose_home: 'Choose your favourable home',
      choose_car: 'Car hire for any kind of trip',
      choose_tour: 'Attractions, activities, and experiences',
      choose_flight: 'Find the Perfect Flight for Every Journey',
      chat_list: 'Chatting List'
    }
  },
  vi: {
    translation: {
      where_to_next: 'Bạn muốn đi đâu?',
      home: 'Trang chủ',
      my_bookings: 'Đơn đã đặt',
      social_media: 'Mạng xã hội',
      admin: 'Quản trị viên',
      booking_cart: 'Đơn đang đặt',
      list_your_property: 'Đăng tài sản của bạn',
      create_post: 'Tạo bài đăng',
      chatting_list: 'Danh sách trò chuyện',
      most_attractive_place: 'Địa điểm hấp dẫn nhất',
      big_sale_for_christmas: 'Giảm giá lớn cho Giáng Sinh',
      big_sale_12_12: 'Giảm giá lớn 12.12 đang đến',
      suitable_flights: 'Chuyến bay phù hợp nhất',
      comfortable_houses: 'Những ngôi nhà thoải mái và tiện nghi nhất',
      reasonable_car_rental: 'Thuê xe giá hợp lý nhất',
      your_bookings: 'Các đặt chỗ của bạn',
      like: 'Thích',
      comment: 'Bình luận',
      share: 'Chia sẻ',
      where_are_you_going: 'Bạn muốn đi đâu?',
      price_range: 'Khoảng giá',
      time_budget: 'Ngân sách thời gian',
      search: 'Tìm kiếm',
      hotels: 'Khách sạn',
      car_rentals: 'Thuê xe',
      tours: 'Du lịch',
      flights: 'Chuyến bay',
      filter_by: 'Lọc theo',
      your_orders: 'Đơn hàng của bạn',
      subtotal: 'Tạm tính',
      tax: 'Thuế',
      total: 'Tổng cộng',
      proceed_to_payment: 'Tiến hành thanh toán',
      continue_to_order: 'Tiếp tục đặt hàng',
      admin_space: 'Khu vực quản trị viên',
      enter_property_info: 'Nhập thông tin tài sản',
      choose_property_type: 'Chọn loại tài sản',
      title: 'Tiêu đề',
      description: 'Mô tả',
      image: 'Hình ảnh',
      body: 'Nội dung',
      price: 'Giá',
      address: 'Địa chỉ',
      contact: 'Liên hệ',
      enter_tour_title: 'Nhập tiêu đề chuyến tham quan',
      enter_tour_description: 'Nhập mô tả chuyến tham quan',
      enter_tour_info: 'Nhập thông tin chuyến tham quan',
      choose_file: 'Chọn tệp',
      enter_tour_price: 'Nhập giá chuyến tham quan',
      enter_tour_address: 'Nhập địa chỉ chuyến tham quan',
      enter_tour_contact: 'Nhập thông tin liên hệ chuyến tham quan',
      finished: 'Hoàn tất',
      manage_posted_travels: 'Quản lý các chuyến đi đã đăng',
      manage_account: 'Quản lý tài khoản',
      bookings_and_trips: 'Đặt chỗ và chuyến đi',
      reviews: 'Đánh giá',
      saved: 'Đã lưu',
      log_out: 'Đăng xuất',
      choose_home: 'Chọn nơi bạn muốn ở',
      choose_car: 'Thuê xe cho mọi chuyến đi',
      choose_tour: 'Các địa điểm du lịch hấp dẫn',
      choose_flight: 'Chọn chuyến bay tuyệt nhất cho chuyến đi',
      chat_list: 'Trò chuyện'
    }
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n

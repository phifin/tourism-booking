import React, { useRef } from 'react'
import { Swiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { NavigationOptions } from 'swiper/types'
import { Navigation } from 'swiper/modules'
type HomeCardSlideProps = {
  renderData: () => React.ReactNode // Hàm không nhận tham số, trả về React Node
}
export default function HomeCardSlide({ renderData }: HomeCardSlideProps) {
  const prevRef = useRef<HTMLButtonElement | null>(null) // Ref cho nút Prev
  const nextRef = useRef<HTMLButtonElement | null>(null) // Ref cho nút Next
  return (
    <div className='relative z-0'>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={4}
        onBeforeInit={(swiper) => {
          // Kiểm tra nếu navigation là kiểu NavigationOptions
          if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
            const navigationParams = swiper.params.navigation as NavigationOptions
            navigationParams.prevEl = prevRef.current
            navigationParams.nextEl = nextRef.current
          }
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current
        }}
      >
        {renderData()}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        ref={prevRef}
        className='absolute top-1/2 left-1 z-10 transform -translate-y-1/2 bg-white text-blue-800 p-3 rounded-full'
      >
        ←
      </button>
      <button
        ref={nextRef}
        className='absolute top-1/2 right-1 z-10 transform -translate-y-1/2 bg-white text-blue-800 p-3 rounded-full'
      >
        →
      </button>
    </div>
  )
}

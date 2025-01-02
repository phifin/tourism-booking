import React from 'react'
import { useTranslation } from 'react-i18next'

interface CreatePostProps {
  onClick: () => void
}

export default function CreatePost({ onClick }: CreatePostProps) {
  const { t } = useTranslation()
  return (
    <div>
      <div
        className=' flex w-1/6 h-16 justify-center items-center border
       border-gray-600 rounded-full bg-blue-500 text-white font-semibold
        fixed left-14 bottom-4 cursor-pointer hover:bg-blue-800'
        onClick={onClick}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='white'
          height='18px'
          width='18px'
          version='1.1'
          id='Capa_1'
          viewBox='0 0 306.637 306.637'
        >
          <g>
            <g>
              <path d='M12.809,238.52L0,306.637l68.118-12.809l184.277-184.277l-55.309-55.309L12.809,238.52z M60.79,279.943l-41.992,7.896    l7.896-41.992L197.086,75.455l34.096,34.096L60.79,279.943z' />
              <path d='M251.329,0l-41.507,41.507l55.308,55.308l41.507-41.507L251.329,0z M231.035,41.507l20.294-20.294l34.095,34.095    L265.13,75.602L231.035,41.507z' />
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </g>
        </svg>
        <header className='ml-1'>{t('create_post')}</header>
      </div>
    </div>
  )
}

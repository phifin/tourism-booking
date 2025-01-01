import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'

const MyProgression: React.FC = () => {
  const userRedux = useSelector((state: RootState) => state.user)

  if (userRedux.loading || userRedux.data == null) return <div>Loading...</div>
  if (userRedux.error) return <div>Error: {userRedux.error}</div>

  const levels = [
    {
      level: 'Bronze',
      imgUrl:
        'https://tiermaker.com/images/template_images/2022/16251734/overwatch-2-ranks-by-deaftaku-16251734-2/bronze.png',
      min: 0,
      max: 1000
    },
    {
      level: 'Silver',
      imgUrl: 'https://boosterbay.com/wp-content/uploads/2024/08/IMG_2902.webp',
      min: 1000,
      max: 2000
    },
    {
      level: 'Gold',
      imgUrl: 'https://boosterbay.com/wp-content/uploads/2024/08/IMG_2903.webp',
      min: 2000,
      max: 3000
    },
    {
      level: 'Platinum',
      imgUrl: 'https://boosterbay.com/wp-content/uploads/2024/08/IMG_2904.webp',
      min: 3000,
      max: 4000
    },
    {
      level: 'Diamond',
      imgUrl: 'https://boosterbay.com/wp-content/uploads/2024/08/IMG_2905.webp',
      min: 4000,
      max: Infinity
    }
  ]

  const currentLevel = levels.find(
    (level) => userRedux.data!.progression >= level.min && userRedux.data!.progression < level.max
  )

  const nextLevel = currentLevel?.max === Infinity ? null : levels[levels.indexOf(currentLevel!) + 1]
  const progressInLevel = userRedux.data?.progression - currentLevel!.min
  const totalLevelRange =
    currentLevel!.max === Infinity
      ? 1 // Full bar for Diamond level
      : currentLevel!.max - currentLevel!.min

  const progressPercentage = currentLevel!.max === Infinity ? 100 : (progressInLevel / totalLevelRange) * 100

  const pointsToNextLevel = nextLevel ? nextLevel.min - userRedux.data?.progression : 0

  return (
    <div className='p-4 bg-white rounded-lg shadow-md w-full max-w-md'>
      {/* Placeholder Image */}
      <div className='flex justify-center mb-4'>
        <img src={currentLevel?.imgUrl} alt='Placeholder' className='w-20 h-20 object-cover rounded-full' />
      </div>

      {/* Progression Bar */}
      <div>
        <div className='flex justify-between mb-2'>
          <span className='text-gray-500'>{currentLevel?.level}</span>
          <span className='text-gray-500'>{nextLevel?.level || 'Max'}</span>
        </div>
        <div className='relative h-4 bg-gray-200 rounded-full'>
          <div className='absolute h-4 bg-blue-500 rounded-full' style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      {/* Points to Progress */}
      <div className='mt-2 text-center text-sm text-gray-700'>
        {currentLevel?.max === Infinity
          ? 'You have reached Diamond level!'
          : `${pointsToNextLevel} points to progress to ${nextLevel?.level}`}
      </div>
    </div>
  )
}

export default MyProgression

// NotFound.tsx
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-50 text-center'>
      <h1 className='text-9xl font-bold text-gray-900'>404</h1>
      <p className='text-2xl font-semibold text-gray-700 mt-4'>Oops, This Page Not Found!</p>
      <p className='text-gray-500 mt-2'>The link might be corrupted, or the page may have been removed.</p>
      <Link to='/' className='mt-6 px-6 py-2 text-white bg-black rounded hover:bg-gray-800'>
        Go Back Home
      </Link>
    </div>
  )
}

interface Props {
  image: string
  title: string
  location: string
  type: string
  ratings: number
  price: string
}

export default function InformationLongCard({ image, title, ratings, price, location, type }: Props) {
  return (
    <div className='flex h-40 w-full shadow-lg my-10 mx-auto rounded-xl overflow-hidden'>
      <div className='w-1/4'>
        <img src={image} className='w-full h-full object-cover'></img>
      </div>
      <div>
        <div className='ml-3 mt-3 text-2xl font-bold'>{title}</div>
        <div className='ml-3 mt-4'>{type}</div>
        <div className='ml-3 mt-3'>{location}</div>
        <div className='mt-3 ml-3'>
          <span className='px-2 py-1 mr-2 rounded-lg border-1 bg-green-600 text-white'>{ratings}</span>
          {ratings > 8.5 ? 'Excellent' : 'Very Good'}
        </div>
      </div>
      <div className='relative h-full'>
        <span className='absolute left-80 w-36 text-xl bottom-2'>{price}</span>
      </div>
    </div>
  )
}

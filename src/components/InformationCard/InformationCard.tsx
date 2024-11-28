interface InformationProps {
  header: string
  place: string
  imgUrl: string
  reviewPoint: number
  reviewNums: number
}

export default function InformationCard({ header, place, imgUrl, reviewPoint, reviewNums }: InformationProps) {
  return (
    <div className='h-96 w-full shadow-2xl my-10 mx-auto rounded-xl overflow-hidden'>
      <img src={imgUrl} className='h-3/5 w-full' />
      <header className='mt-3 ml-2'>{header}</header>
      <div className='mt-1 ml-2'>{place}</div>
      <div className='mt-1 ml-2'>{reviewPoint}</div>
      <div className='mt-1 ml-2'>{reviewNums}</div>
    </div>
  )
}

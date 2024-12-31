interface InformationProps {
  id: string
  title: string
  place: string
  imgUrl: string
  price: number
  ratings: number
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export default function InformationCardForAdmin({
  id,
  title,
  place,
  imgUrl,
  ratings,
  price,
  onEdit,
  onDelete
}: InformationProps) {
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Ngăn chặn sự kiện click vào thẻ cha
    if (onEdit) onEdit(id)
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Ngăn chặn sự kiện click vào thẻ cha
    if (onDelete) onDelete(id)
  }

  return (
    <div className='h-96 w-full col-span-3 shadow-2xl my-10 mx-auto rounded-xl overflow-hidden cursor-pointer relative'>
      <img src={imgUrl} alt={title} className='h-3/5 w-full object-cover' />
      <div className='absolute top-2 right-2 flex space-x-2'>
        <button
          onClick={handleEditClick}
          className='bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600'
        >
          Edit
        </button>
        <button
          onClick={handleDeleteClick}
          className='bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600'
        >
          Delete
        </button>
      </div>
      <header className='mt-3 ml-2 font-bold'>{title}</header>
      <div className='mt-1 ml-2'>{place}</div>
      <div
        className={`mt-1 ml-2 ${ratings >= 4 ? 'text-green-500' : ratings >= 3 ? 'text-yellow-500' : 'text-red-500'}`}
      >
        {ratings} star
      </div>
      <div className='mt-1 ml-2 font-semibold text-blue-700'>${price}.00</div>
    </div>
  )
}

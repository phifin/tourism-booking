import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import travelApi from '~/apis/travels.api'
import InformationCardForAdmin from '~/components/InformationCardForAdmin/InformationCardForAdmin'
import { Link } from 'react-router-dom'

export default function AdminDataDashboard() {
  const queryClient = useQueryClient()

  const [editModalData, setEditModalData] = useState<null | {
    id: string
    title: string
    description: string
    price: number
    imageUrl: string[]
  }>(null)

  // Fetch data using useQuery
  const { data, isLoading, isError } = useQuery(['fetchAllTravels'], travelApi.fetchAllTravels)

  // Mutation for deleting travel
  const deleteTravelMutation = useMutation(travelApi.deleteTravel, {
    onSuccess: () => {
      queryClient.invalidateQueries(['fetchAllTravels'])
    }
  })

  // Mutation for editing travel
  const editTravelMutation = useMutation(
    (data: { id: string; title?: string; description?: string; price?: number; imageUrl?: string[] }) =>
      travelApi.editTravel(data.id, data.title, data.description, data.price, data.imageUrl),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['fetchAllTravels'])
        setEditModalData(null) // Close modal after successful edit
      }
    }
  )

  const onDelete = (id: string) => {
    deleteTravelMutation.mutate(id)
  }

  const onEdit = (travel: { id: string; title: string; description: string; price: number; imageUrl: string[] }) => {
    setEditModalData(travel)
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editModalData) {
      const formData = new FormData(e.currentTarget)
      // Kiểm tra nếu 'imageUrl' là một chuỗi hợp lệ và gán vào mảng
      const imgUrl = formData.get('imageUrl')?.toString() || '' // Tránh trường hợp undefined

      // Nếu imgUrl có giá trị, thêm vào mảng, nếu không thì để mảng trống
      const imageUrls = imgUrl ? [imgUrl] : []

      editTravelMutation.mutate({
        id: editModalData.id,
        title: formData.get('title')?.toString(),
        description: formData.get('description')?.toString(),
        price: parseFloat(formData.get('price') as string),
        imageUrl: imageUrls
      })
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching data!</div>
  }

  const tourData = data?.filter((travel) => travel.travelType === 'Tour')
  const hotelData = data?.filter((travel) => travel.travelType === 'Hotel')
  const flightData = data?.filter((travel) => travel.travelType === 'Flight')
  const carRentalData = data?.filter((travel) => travel.travelType === 'CarRental')

  return (
    <div className='w-4/5 mx-auto'>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-bold my-5'>Admin Data Dashboard</h1>
        <Link to='/admin' className='mt-7 mr-4 text-lg text-blue-800 underline'>
          Go back to create New Travels
        </Link>
      </div>

      {['Tour', 'Hotel', 'Flight', 'Car Rental'].map((type) => {
        const data =
          type === 'Tour' ? tourData : type === 'Hotel' ? hotelData : type === 'Flight' ? flightData : carRentalData

        return (
          <div key={type}>
            <h2 className='text-xl font-semibold mt-4'>{type}</h2>
            <div className='grid grid-cols-4 gap-5'>
              {data?.map((travel) => (
                <div key={travel.id} className='col-span-1'>
                  <InformationCardForAdmin
                    id={travel.id}
                    title={travel.title}
                    place={travel.description}
                    imgUrl={travel.imageUrl[0]}
                    ratings={travel.rating}
                    price={travel.price}
                    onDelete={onDelete}
                    onEdit={() =>
                      onEdit({
                        id: travel.id,
                        title: travel.title,
                        description: travel.description,
                        price: travel.price,
                        imageUrl: travel.imageUrl
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {/* Edit Modal */}
      {editModalData && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
          <form className='bg-white p-6 rounded shadow-md w-96' onSubmit={handleEditSubmit}>
            <h2 className='text-xl font-bold mb-4'>Edit Travel</h2>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>Title</label>
              <input
                type='text'
                name='title'
                defaultValue={editModalData.title}
                className='mt-1 block w-full border rounded-md p-2'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>Description</label>
              <textarea
                name='description'
                defaultValue={editModalData.description}
                className='mt-1 block w-full border rounded-md p-2'
              ></textarea>
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>Price</label>
              <input
                type='number'
                name='price'
                defaultValue={editModalData.price}
                className='mt-1 block w-full border rounded-md p-2'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>Image URL</label>
              <input
                type='text'
                name='imageUrl'
                defaultValue={editModalData.imageUrl}
                className='mt-1 block w-full border rounded-md p-2'
              />
            </div>
            <div className='flex justify-end'>
              <button
                type='button'
                className='bg-gray-500 text-white px-4 py-2 rounded mr-2'
                onClick={() => setEditModalData(null)}
              >
                Cancel
              </button>
              <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded'
                disabled={editTravelMutation.isLoading}
              >
                {editTravelMutation.isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

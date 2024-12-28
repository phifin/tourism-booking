import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { postApi } from '~/apis/post.api'
import travelApi from '~/apis/travels.api'

export default function CarForm() {
  const [titleValue, setTitleValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')
  const [bodyValue, setBodyValue] = useState('')
  const [imageValue, setImageValue] = useState<File | null>(null)
  const [priceValue, setPriceValue] = useState('')
  const [locationValue, setLocationValue] = useState('')
  const [carTypeValue, setCarTypeValue] = useState('')
  const [contactValue, setContactValue] = useState('')
  const [previewImage, setPreviewImage] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files[0]) {
      const previewUrl = URL.createObjectURL(files[0])
      setPreviewImage(previewUrl)
      setImageValue(files[0]) // Update form value

      return () => {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }
  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value)
  }
  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionValue(event.target.value)
  }
  const onBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBodyValue(event.target.value)
  }
  const onPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceValue(event.target.value)
  }
  const onCarTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCarTypeValue(event.target.value)
  }
  const onLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationValue(event.target.value)
  }
  const onContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactValue(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault() // Prevent default form submission behavior

    const price = parseFloat(priceValue) // Convert priceValue to a number
    if (isNaN(price)) {
      alert('Please enter a valid price.')
      return
    }

    const imageUrl: string[] = [] // Khởi tạo mảng ở phạm vi bên ngoài

    if (imageValue) {
      const uploadResponse = await postApi.uploadImage(imageValue)
      imageUrl.push(uploadResponse.url) // Thêm URL vào mảng
    }

    try {
      // Call the API with state values
      await travelApi.postTravelData(
        titleValue,
        descriptionValue,
        bodyValue,
        imageUrl, // Assuming you're going to add images here.
        'CarRental', // Specify the travelType
        price,
        undefined,
        contactValue,
        new Date().toISOString(),
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        locationValue,
        carTypeValue // CreatedAt timestamp
      )
      alert('Tour data has been successfully submitted!')

      setTitleValue('')
      setDescriptionValue('')
      setBodyValue('')
      setPriceValue('')
      setLocationValue('')
      setCarTypeValue('')
      setContactValue('')
    } catch (error) {
      console.error('Error submitting tour data:', error)
      alert('There was an error submitting your data. Please try again.')
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='flex ml-3 mt-2'>
          <header className='text-lg mr-3 min-w-56'>Title</header>
          <input
            type='text'
            value={titleValue}
            onChange={onTitleChange}
            placeholder='Enter the title of your tour'
            className='w-1/2'
          />
        </div>
        <div className='flex ml-3 mt-3'>
          <header className='text-lg mr-3 min-w-56'>Description</header>
          <input
            type='text'
            value={descriptionValue}
            onChange={onDescriptionChange}
            placeholder='Enter the description of your tour'
            className='w-1/2'
          />
        </div>
        <div className='flex ml-3 mt-3'>
          <header className='text-lg mr-3 min-w-56'>Body</header>
          <input
            type='text'
            value={bodyValue}
            onChange={onBodyChange}
            placeholder='Enter the information of your tour'
            className='w-1/2'
          />
        </div>
        <div className='flex ml-3 mt-3'>
          <header className='text-lg mr-3 min-w-56'>Image</header>
          <input type='file' style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
          <div>
            <button
              onClick={handleFileUpload}
              type='button'
              className='bg-blue-500 text-white mr-3 px-4 py-2 rounded-lg hover:bg-blue-600'
            >
              Choose File
            </button>
            {previewImage && <img src={previewImage} className='mt-4 mx-auto h-64 w-95/100' alt='Preview' />}
          </div>
        </div>
        <div className='flex ml-3 mt-3'>
          <header className='text-lg mr-3 min-w-56'>Price</header>
          <input
            type='text'
            value={priceValue}
            onChange={onPriceChange}
            placeholder='Enter the price of your tour'
            className='w-1/2'
          />
        </div>
        <div className='flex ml-3 mt-3'>
          <header className='text-lg mr-3 min-w-56'>Location</header>
          <input
            type='text'
            value={locationValue}
            onChange={onLocationChange}
            placeholder='Enter the address of your tour'
            className='w-1/2'
          />
        </div>
        <div className='flex ml-3 mt-3'>
          <header className='text-lg mr-3 min-w-56'>Car type</header>
          <input
            type='text'
            value={carTypeValue}
            onChange={onCarTypeChange}
            placeholder='Enter the address of your tour'
            className='w-1/2'
          />
        </div>
        <div className='flex ml-3 mt-3'>
          <header className='text-lg mr-3 min-w-56'>Contact</header>
          <input
            type='text'
            value={contactValue}
            onChange={onContactChange}
            placeholder='Enter the contact of your tour'
            className='w-1/2'
          />
        </div>
        <div className='flex justify-end'>
          <button
            type='submit'
            className='mt-3 mb-3 h-10 w-44 rounded-xl text-white font-semibold bg-blue-500 hover:bg-blue-600 mr-10'
          >
            Finished
          </button>
        </div>
      </form>
    </div>
  )
}
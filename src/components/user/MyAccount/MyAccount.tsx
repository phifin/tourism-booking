import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserModel } from '~/models/user.model'
import { AppDispatch, RootState } from '~/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { editUser } from '~/store/user.slice'
import { cloudinaryApi } from '~/apis/cloudinary.api'

const MyAccount: React.FC = () => {
  const userRedux = useSelector((state: RootState) => state.user)
  const dispatch: AppDispatch = useDispatch()

  if (userRedux.loading || userRedux.data == null) return <div>Loading...</div>
  if (userRedux.error) return <div>Error: {userRedux.error}</div>

  const initialFormData: Partial<UserModel> = {
    firstName: userRedux.data.firstName,
    lastName: userRedux.data.lastName,
    email: userRedux.data.email,
    phoneNumber: userRedux.data.phoneNumber,
    profileImageUrl: userRedux.data.profileImageUrl
  }

  const [formData, setFormData] = useState<Partial<UserModel>>(initialFormData)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  useEffect(() => {
    // Compare current formData with initialFormData
    const isSameAsInitial = Object.keys(initialFormData).every(
      (key) => formData[key as keyof UserModel] === initialFormData[key as keyof UserModel]
    )
    setIsButtonDisabled(isSameAsInitial) // Disable button if form data matches initial state
  }, [formData, initialFormData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.result) {
          setFormData((prev) => ({
            ...prev,
            profileImageUrl: reader.result as string
          }))
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.profileImageUrl !== initialFormData.profileImageUrl) {
      // Convert the base64 image back to a File object
      const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]')

      if (fileInput && fileInput.files) {
        const file = fileInput.files[0]
        cloudinaryApi.uploadImage(file).then((response) => {
          const imageUrl = response.data.secure_url
          dispatch(
            editUser({
              id: userRedux.data!.id,
              data: {
                ...formData,
                profileImageUrl: imageUrl
              }
            })
          )
        })
      }
    } else {
      dispatch(
        editUser({
          id: userRedux.data!.id,
          data: formData
        })
      )
    }
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>My Account</h1>
      <div className='max-w-4xl mx-auto p-6 bg-white shadow-lg border rounded-md'>
        <h1 className='text-xl font-bold mb-4'>Edit Profile</h1>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Profile Picture */}
          <div className='flex justify-center items-center'>
            <div className='relative w-20 h-20'>
              {formData.profileImageUrl ? (
                <img
                  src={formData.profileImageUrl || '/src/assets/default-avatar.jpg'}
                  alt='Profile'
                  className='w-20 h-20 rounded-full object-cover shadow-md border border-white'
                />
              ) : (
                <div className='w-20 h-20 bg-gray-300 flex items-center justify-center rounded-full text-2xl font-bold shadow-md border border-white'>
                  {userRedux.data.firstName ? userRedux.data.firstName[0].toUpperCase() : ''}
                  {userRedux.data.lastName ? userRedux.data.lastName[0].toUpperCase() : ''}
                </div>
              )}

              {/* Upload Icon Button */}
              <label
                htmlFor='profileImage'
                className='absolute bottom-0 -right-2.5 bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full cursor-pointer shadow-md border border-white'
              >
                <FontAwesomeIcon icon={faPen} />
              </label>
              <input type='file' id='profileImage' accept='image/*' onChange={handleImageChange} className='hidden' />
            </div>
          </div>

          {/* First Name */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>First Name</label>
            <input
              type='text'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              className='w-full mt-1 px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          {/* Last Name */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Last Name</label>
            <input
              type='text'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              className='w-full mt-1 px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          {/* Email */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full mt-1 px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Phone Number</label>
            <input
              type='tel'
              name='phoneNumber'
              value={formData.phoneNumber || ''}
              onChange={handleChange}
              className='w-full mt-1 px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type='submit'
              disabled={isButtonDisabled}
              className={`w-full py-2 px-4 rounded-md ${
                isButtonDisabled
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400'
              }`}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MyAccount

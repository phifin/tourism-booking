import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '~/apis/auth.api'
import loginImage from '~/assets/login_page.avif'
import { AppContext } from '~/context/app.context'
import getRules from '~/utils/rules'
import { isAxiosUnauthorizedError } from '~/utils/utils'
import { useContext } from 'react'
// import { userApi } from '~/apis/user.api'
// import { useQuery } from '@tanstack/react-query'
interface FormData {
  email: string
  password: string
  confirm_password: string
}

export default function Login() {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const { setIsAuthenticated, setUserEmail } = useContext(AppContext)
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => login(body)
  })

  const onSubmit = handleSubmit(async (data) => {
    const body = omit(data, ['confirm_password'])

    loginMutation.mutate(body, {
      onSuccess: async (response) => {
        const email = JSON.parse(response.config.data).email
        setUserEmail(email) // Cập nhật userEmail

        // Chờ một chút để React kịp cập nhật trạng thái
        await new Promise((resolve) => setTimeout(resolve, 0))

        // Sau khi đã cập nhật email, điều hướng đến trang chủ
        setIsAuthenticated(true)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnauthorizedError<string>(error)) {
          const formError = error.response?.data
          if (formError?.split(' ')[0] === 'Email') {
            setError('email', {
              message: formError,
              type: 'server'
            })
          } else if (formError?.split(' ')[0] === 'Password') {
            setError('password', {
              message: formError,
              type: 'server'
            })
          }
        }
      }
    })
  })

  // const { data: userData } = useQuery({
  //   queryKey: ['userData', userEmail],
  //   queryFn: async () => {
  //     console.log('Fetching userData with email:', userEmail)
  //     const response = await userApi.fetchUserByEmail(userEmail!)
  //     console.log('Response from API:', response)
  //     return response
  //   },
  //   enabled: !!userEmail // Chỉ fetch khi `userEmail` có giá trị
  // })

  const rules = getRules()

  return (
    <div className='flex w-3/4 justify-center mx-auto'>
      <div className='w-1/2'>
        <img src={loginImage} alt='login-image' className='bg-yellow-300 w-full rounded-t-3xl' />
        <div className='bg-gray-100 pb-20 pl-3 rounded-b-3xl'>
          <p className='font-bold text-xl ml-7 pt-10'>Get ready to:</p>
          <div className='flex ml-10 mt-4'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' height='20px' width='20px'>
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-width='2'
                d='m17 9-7 7M10 16l-3-3M17 9l-7 7M10 16l-3-3'
              ></path>
            </svg>
            <p>Save even more with reward rates from our partner sites</p>
          </div>
          <div className='flex ml-10 mt-3'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' height='20px' width='20px'>
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-width='2'
                d='m17 9-7 7M10 16l-3-3M17 9l-7 7M10 16l-3-3'
              ></path>
            </svg>
            <p>Easily pick up your search again from any device</p>
          </div>
        </div>
      </div>

      <div className='w-1/2'>
        <h1 className='font-bold w-fit ml-16 pt-8 text-2xl'>Sign in</h1>
        <form className='px-8 pt-2 pb-8 rounded w-5/6 bg-white shadow-sm' noValidate onSubmit={onSubmit}>
          <div className='mt-2 ml-8'>
            <div className='text-md ml-2'>Email</div>
            <input
              type='email'
              className='p-3 my-2 w-11/12 outline-none border border-gray-300 focus:border-blue-500 rounded-lg'
              placeholder='email@email.com'
              {...register('email', rules.email)}
            />
            <div className='text-red-600 text-sm ml-1'>{errors.email?.message}</div>
          </div>

          <div className='mt-3 ml-8'>
            <div className='text-md ml-2'>Password</div>
            <input
              type='password'
              autoComplete='on'
              className='p-3 my-2 w-11/12 outline-none border border-gray-300 focus:border-blue-500 rounded-lg'
              {...register('password', rules.password)}
            />
            <div className='text-red-600 text-sm ml-1'>{errors.password?.message}</div>
          </div>

          <div className='mt-5 ml-7'>
            <button className='w-11/12 text-center p-2 uppercase bg-blue-500 text-white text-sm hover:bg-blue-600 rounded-lg'>
              Log in
            </button>
          </div>

          <div className='mt-3 text-center'>
            <div className='flex items-center justify-center'>
              <span className='text-slate-400'>Don't have an account?</span>
              <Link to='/register' className='text-blue-500 ml-1'>
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

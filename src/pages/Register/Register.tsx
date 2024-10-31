import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { registerAccount } from '~/apis/auth.api'
import loginImage from '~/assets/login_page.avif'
import { ErrorResponse } from '~/types/utils.type'
import getRules from '~/utils/rules'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'

interface FormData {
  email: string
  password: string
  confirm_password: string
}

export default function Register() {
  const {
    register,
    getValues,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const rules = getRules(getValues)

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError?.email) {
            setError('email', {
              message: formError.email,
              type: 'Server'
            })
          }
          if (formError?.password) {
            setError('password', {
              message: formError.password,
              type: 'server'
            })
          }
        }
      }
    })
  })
  return (
    <div className='flex w-3/4 justify-center gap-5 mx-auto'>
      <div className='w-1/2'>
        <img src={loginImage} alt='login-image' className='bg-yellow-300 w-full' />
        <p className='py-5 font-semibold w-fit text-wrap mx-auto'>
          Đăng nhập để nhận thêm thật nhiều tiện ích và ưu đãi !!!
        </p>
      </div>

      <div className='w-1/2'>
        <h1 className='font-bold w-fit ml-16 pt-8 text-2xl'>Đăng ký</h1>
        <form className='px-8 pt-2 pb-8 rounded w-5/6 bg-white shadow-sm' onSubmit={onSubmit} noValidate>
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
            <div className='text-md ml-2'>Mật khẩu</div>
            <input
              type='password'
              className='p-3 my-2 w-11/12 outline-none border border-gray-300 focus:border-blue-500 rounded-lg'
              {...register('password', rules.password)}
              autoComplete='on'
            />
            <div className='text-red-600 text-sm ml-1'>{errors.password?.message}</div>
          </div>

          <div className='mt-3 ml-8'>
            <div className='text-md ml-2'>Nhập lại mật khẩu</div>
            <input
              type='password'
              className='p-3 my-2 w-11/12 outline-none border border-gray-300 focus:border-blue-500 rounded-lg'
              {...register('confirm_password', rules.confirm_password)}
              autoComplete='on'
            />
            <div className='text-red-600 text-sm ml-1'>{errors.confirm_password?.message}</div>
          </div>

          <div className='mt-3 ml-7'>
            <button className='w-11/12 text-center p-2 uppercase bg-blue-500 text-white text-sm hover:bg-blue-600 rounded-lg'>
              Đăng ký
            </button>
          </div>

          <div className='mt-3 text-center'>
            <div className='flex items-center justify-center'>
              <span className='text-slate-400'>Bạn đã có tài khoản?</span>
              <Link to='/login' className='text-blue-500 ml-1'>
                Đăng nhập ngay
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

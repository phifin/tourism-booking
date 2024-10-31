import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'

interface FormData {
  email: string
  password: string
  confirm_password: string
}

type Rules = { [key in keyof FormData]?: RegisterOptions<FormData, key> }
// type Rules = {
//   [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions
// }
const getRules = (getValues?: UseFormGetValues<FormData>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Bạn chưa nhập email'
    },
    pattern: {
      value: /^[\w.-]+@[\w.-]+\.\w{2,}$/,
      message: 'Email chưa đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài tối đa là 160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài tối thiểu là 5 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Bạn chưa nhập mật khẩu'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài tối đa là 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài tối thiểu là 6 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Bạn chưa nhập lại mật khẩu'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Nhập lại mật khẩu chưa đúng'
        : undefined
  }
})

export default getRules

export const saveAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken)
}

export const clearAccessTokenFromLS = () => {
  localStorage.removeItem('accessToken')
}

export const getAccessTokenFromLS = () => localStorage.getItem('accessToken') || ''

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
export default function PersonalBar() {
  const userRedux = useSelector((state: RootState) => state.user)
  const { t } = useTranslation()
  return (
    <div className='flex gap-12 ml-3 font-bold'>
      <Link to='/' className='hover:bg-slate-400 py-3 px-7 rounded-2xl hover:bg-opacity-20'>
        {t('home')}
      </Link>
      <Link to='/bookinghistory' className='hover:bg-slate-400  py-3 px-7 rounded-2xl hover:bg-opacity-20'>
        {t('my_bookings')}
      </Link>
      <Link to='/socialposts' className='hover:bg-slate-400  py-3 px-7 rounded-2xl hover:bg-opacity-20'>
        {t('social_media')}
      </Link>
      <Link to='/bookingcart' className='hover:bg-slate-400  py-3 px-7 rounded-2xl hover:bg-opacity-20'>
        {t('booking_cart')}
      </Link>
      {userRedux?.data?.userType === 'admin' ? (
        <Link to='/admin' className='hover:bg-slate-400  py-3 px-7 rounded-2xl hover:bg-opacity-20'>
          {t('admin')}
        </Link>
      ) : (
        ''
      )}
    </div>
  )
}

import React, { Component } from 'react'
import InformationLongCard from '../InformationLongCard/InformationLongCard'

export default class SearchDetails extends Component {
  render() {
    return (
      <div className='w-2/3 mx-auto'>
        <div className=' mx-auto'>
          <InformationLongCard
            title='Catedral Almería'
            ratings={8.1}
            image='https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/hotelier-images/6d/7c/30e92f40fc213542d5d07a26f58706e391203a507e2e1f5f313512c18b22.jpeg'
            price='2.000.000 VND'
            location='Ho Chi Minh City'
            type='Hotel'
          />
        </div>
        <div className=' mx-auto'>
          <InformationLongCard
            title='Catedral Almería'
            ratings={9.2}
            image='https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/hotelier-images/6d/7c/30e92f40fc213542d5d07a26f58706e391203a507e2e1f5f313512c18b22.jpeg'
            price='2.000.000 VND'
            location='Ho Chi Minh City'
            type='Homestay'
          />
        </div>
        <div className=' mx-auto'>
          <InformationLongCard
            title='Catedral Almería'
            ratings={8.3}
            image='image'
            price='200.000 VND'
            location='Ho Chi Minh City'
            type='Hotel'
          />
        </div>
        <div className=' mx-auto'>
          <InformationLongCard
            title='Hello'
            ratings={9.4}
            image='image'
            price='200.000'
            location='Ho Chi Minh City'
            type='Hotel'
          />
        </div>
        <div className=' mx-auto'>
          <InformationLongCard
            title='Hello'
            ratings={8.5}
            image='image'
            price='2000'
            location='Ho Chi Minh City'
            type='Homestay'
          />
        </div>
        <div className=' mx-auto'>
          <InformationLongCard
            title='Hello'
            ratings={9.6}
            image='image'
            price='2000'
            location='Ho Chi Minh City'
            type='Hotel'
          />
        </div>
        <div className=' mx-auto'>
          <InformationLongCard
            title='Hello'
            ratings={8.2}
            image='image'
            price='2000'
            location='Ho Chi Minh City'
            type='Homestay'
          />
        </div>
        <div className='mx-auto'>
          <InformationLongCard
            title='Hello'
            ratings={9.1}
            image='image'
            price='2000'
            location='Ho Chi Minh City'
            type='Hotel'
          />
        </div>
      </div>
    )
  }
}

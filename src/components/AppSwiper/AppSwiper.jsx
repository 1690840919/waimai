import React from 'react'
import Style from './AppSwiper.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
SwiperCore.use([Pagination, Autoplay]);


function AppSwiper(props) {
  const { width, height } = props
  const swiperData = [
    "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=815941486,872317555&fm=26&gp=0.jpg",
    "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=358389559,3817221045&fm=26&gp=0.jpg",
    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2034870996,3303762327&fm=26&gp=0.jpg',
  ]
  return (
    <div className={Style.appSwiper}>
      <Swiper
        autoplay
        slidesPerView={1}
        pagination={{ clickable: true }}// 小圆点
      >
        {swiperData.map(item => {
          return <SwiperSlide key={item}>
            <div>
              <img style={{
                width,
                height
              }} src={item} alt="" />
            </div>
          </SwiperSlide>
        })}
      </Swiper>
    </div>
  )
}

export default AppSwiper

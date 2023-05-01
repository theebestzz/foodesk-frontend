import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { useSelector } from "react-redux";

import "swiper/css";

import banerimg1 from "./../../../assets/images/banner-img/pic-1.jpg";
import banerimg2 from "./../../../assets/images/banner-img/pic-3.jpg";
import banerimg3 from "./../../../assets/images/banner-img/pic-4.jpg";

const sliderBlog = [
  { image: banerimg1 },
  { image: banerimg2 },
  { image: banerimg3 },
];

const BannerSlider = () => {
  const sliders = useSelector((state) => state.sliders);
  return (
    <div className="position-relative ">
      <div className="swiper-pagination-banner"></div>
      <Swiper
        className="mySwiper-1"
        // speed= {1200}
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          el: ".swiper-pagination-banner",
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
        }}
        modules={[Autoplay, Pagination]}
      >
        {sliderBlog.map((data, ind) => (
          <SwiperSlide key={ind}>
            <div className="banner-bx">
              <img src={data.image} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default BannerSlider;

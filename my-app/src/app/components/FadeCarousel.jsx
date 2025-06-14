'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
// import Login from './Login';
// import UserInfo from './UserInfo';

export default function App() {
  return (
    <div className="w-full px-10 mt-10">
      <Swiper
        spaceBetween={30}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="w-full mx-20 h-[600px]"
        aria-label="Promotional Slides"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-[600px] rounded-3xl overflow-hidden">
            {/* Image removed */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-center px-4">
              <div>
                <h2 className="text-4xl font-bold mb-2">Empowering the Digital Era</h2>
                <p className="text-lg">Binary: The foundation of modern computing power.</p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full h-[600px] rounded-3xl overflow-hidden">
            {/* Image removed */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 font-bold text-center px-4">
              <div>
                <h2 className="text-4xl text-[#F2F9FF] font-bold mb-2">AI Shaping Tomorrow</h2>
                <p className="text-lg text-[#F2F9FF]">Artificial intelligence transforming every industry.</p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative w-full h-[600px] rounded-3xl overflow-hidden">
            {/* Image removed */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-center px-4">
              <div>
                <h2 className="text-4xl font-bold mb-2">Global Connectivity</h2>
                <p className="text-lg">Networks linking data, devices, and people worldwide.</p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4 */}
        <SwiperSlide>
          <div className="relative w-full h-[600px] rounded-3xl overflow-hidden">
            {/* Image removed */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-center px-4">
              <div>
                <h2 className="text-4xl font-bold mb-2">Lifelong Learning</h2>
                <p className="text-lg">In tech, staying curious means staying ahead.</p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 5 */}
        <SwiperSlide>
          <div className="relative w-full h-[600px] rounded-3xl overflow-hidden">
            {/* Image removed */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-center px-4">
              <div>
                <h2 className="text-4xl font-bold mb-2">Women in Tech</h2>
                <p className="text-lg">Championing innovation, diversity, and inclusion in IT.</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* <UserInfo /> */}
    </div>
  );
}

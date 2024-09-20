import React from "react";
import Slider from "react-slick";

import rides1 from "../../../images/rides1.jpg";
import rides2 from "../../../images/rides2.jpg";
import rides3 from "../../../images/rides3.jpg";
import rides4 from "../../../images/rides4.jpg";

const HomeCarousel = () => {
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    autoplay: true,
    arrows: true,
    dots: false,
    speed: 500,
    fade: true,
    responsive: [
      {
        breakpoint: 790,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="carousel-header-inicio">
      <article>
        <Slider {...settings}>
          <div className="relative">
            <img className="w-full h-[30rem] object-cover" src={rides1} />

            <div className="absolute top-0 flex items-center bg-black/50 h-full w-full z-[999]">
              <div className="container-page text-white">
                <div className="flex flex-col items-center justify-center text-center">
                  {/* <h2 className="text-4xl">Lorem Ipsum Dolor</h2> */}
                  {/* <p className="max-w-2xl my-3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aut itaque qui aliquid in possimus placeat voluptatibus
                    eaque illo quibusdam quasi voluptatum quo omnis, odit
                    numquam animi ratione inventore ex pariatur.
                  </p>
                  <button className="border px-2 py-1 hover:text-black hover:bg-white animation-fade">
                    Learn More
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img className="w-full h-[30rem] object-cover" src={rides2} />

            <div className="absolute top-0 flex items-center bg-black/50 h-full w-full z-[999]">
              <div className="container-page text-white">
                <div className="flex flex-col items-center justify-center text-center">
                  {/* <h2 className="text-4xl">Lorem Ipsum Dolor</h2> */}
                  {/* <p className="max-w-2xl my-3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aut itaque qui aliquid in possimus placeat voluptatibus
                    eaque illo quibusdam quasi voluptatum quo omnis, odit
                    numquam animi ratione inventore ex pariatur.
                  </p>
                  <button className="border px-2 py-1 hover:text-black hover:bg-white animation-fade">
                    Learn More
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img className="w-full h-[30rem] object-cover" src={rides3} />

            <div className="absolute top-0 flex items-center bg-black/50 h-full w-full z-[999]">
              <div className="container-page text-white">
                <div className="flex flex-col items-center justify-center text-center">
                  {/* <h2 className="text-4xl">Lorem Ipsum Dolor</h2> */}
                  {/* <p className="max-w-2xl my-3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aut itaque qui aliquid in possimus placeat voluptatibus
                    eaque illo quibusdam quasi voluptatum quo omnis, odit
                    numquam animi ratione inventore ex pariatur.
                  </p>
                  <button className="border px-2 py-1 hover:text-black hover:bg-white animation-fade">
                    Learn More
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img className="w-full h-[30rem] object-cover" src={rides4} />

            <div className="absolute top-0 flex items-center bg-black/50 h-full w-full z-[999]">
              <div className="container-page text-white">
                <div className="flex flex-col items-center justify-center text-center">
                  {/* <h2 className="text-4xl">Lorem Ipsum Dolor</h2> */}
                  {/* <p className="max-w-2xl my-3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aut itaque qui aliquid in possimus placeat voluptatibus
                    eaque illo quibusdam quasi voluptatum quo omnis, odit
                    numquam animi ratione inventore ex pariatur.
                  </p>
                  <button className="border px-2 py-1 hover:text-black hover:bg-white animation-fade">
                    Learn More
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </article>
    </div>
  );
};

export default HomeCarousel;

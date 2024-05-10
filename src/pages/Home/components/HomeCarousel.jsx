import React from "react";
import Slider from "react-slick";

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
  };

  return (
    <div className="carousel-header-inicio">
      <article>
        <Slider {...settings}>
          <div className="relative">
            <img
              className="w-full h-[30rem] object-cover"
              src={`https://plus.unsplash.com/premium_photo-1664474439254-cc67144267ce?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
            />

            <div className="absolute top-0 flex items-center bg-black/50 h-full w-full z-[999]">
              <div className="container-page text-white">
                <div className="flex flex-col items-center justify-center text-center">
                  <h2 className="text-4xl">Lorem Ipsum Dolor</h2>
                  <p className="max-w-2xl my-3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aut itaque qui aliquid in possimus placeat voluptatibus
                    eaque illo quibusdam quasi voluptatum quo omnis, odit
                    numquam animi ratione inventore ex pariatur.
                  </p>
                  <button className="border px-2 py-1 hover:text-black hover:bg-white animation-fade">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              className="w-full h-[30rem] object-cover"
              src={`https://plus.unsplash.com/premium_photo-1661920568667-c0c53b9acf08?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
            />

            <div className="absolute top-0 flex items-center bg-black/50 h-full w-full z-[999]">
              <div className="container-page text-white">
                <div className="flex flex-col items-center justify-center text-center">
                  <h2 className="text-4xl">Lorem Ipsum Dolor</h2>
                  <p className="max-w-2xl my-3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aut itaque qui aliquid in possimus placeat voluptatibus
                    eaque illo quibusdam quasi voluptatum quo omnis, odit
                    numquam animi ratione inventore ex pariatur.
                  </p>
                  <button className="border px-2 py-1 hover:text-black hover:bg-white animation-fade">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              className="w-full h-[30rem] object-cover"
              src={`https://images.unsplash.com/photo-1542766788-a2f588f447ee?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
            />

            <div className="absolute top-0 flex items-center bg-black/50 h-full w-full z-[999]">
              <div className="container-page text-white">
                <div className="flex flex-col items-center justify-center text-center">
                  <h2 className="text-4xl">Lorem Ipsum Dolor</h2>
                  <p className="max-w-2xl my-3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aut itaque qui aliquid in possimus placeat voluptatibus
                    eaque illo quibusdam quasi voluptatum quo omnis, odit
                    numquam animi ratione inventore ex pariatur.
                  </p>
                  <button className="border px-2 py-1 hover:text-black hover:bg-white animation-fade">
                    Learn More
                  </button>
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

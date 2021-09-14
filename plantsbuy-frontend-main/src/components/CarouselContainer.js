import React from "react";
import { Carousel } from "react-bootstrap";

const CarouselContainer = () => {
  return (
    <Carousel className="carousel" fade={true} pause={false}>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100"
          src="/images/img-3.jpg"
          alt="First slide"
        />
      </Carousel.Item>

      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100"
          src="/images/img-4.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselContainer;

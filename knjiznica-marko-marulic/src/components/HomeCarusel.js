import React from "react";
import { Carousel } from "react-bootstrap";
import carusel1 from "../images/carusel1.jpg";
import carusel2 from "../images/carusel2.jpg";
import carusel3 from "../images/carusel3.jpg";

const HomeScreen = () => {
  return (
    <div>
      <h1 className='text-center'>Knjižnica Marko Marulić</h1>
      <Carousel>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src={carusel1}
            alt='Prva slika knjige'
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src={carusel2}
            alt='Druga slika knjige'
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src={carusel3}
            alt='Treća slika knjige'
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HomeScreen;

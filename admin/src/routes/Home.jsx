import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "flowbite-react"
import img from '../assets/images/pexels-stein-egil-liland-3408744.jpg'


function Home() {
    return (
      <div>
        <h2>Home</h2>
        <div>
        <Carousel>
  <img
    src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
    alt="..."
  />
  <img
    src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
    alt="..."
  />
  <img
    src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
    alt="..."
  />
  <img
    src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
    alt="..."
  />
  <img
    src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
    alt="..."
  />
</Carousel>
</div>
      </div>
    );
  }

export default Home
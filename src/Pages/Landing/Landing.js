import React from "react";
import LayOut from "../../Component/LayOut/LayOut";
import CarouselEffect from "../../Component/Carousel/CarouselEffect";
import Category from "../../Component/Category/Category";
import Product from "../../Component/Product/Product";
const Landing = () => {
  return (
    <LayOut>
      <CarouselEffect />
      <Category />
      <Product />
    </LayOut>
  );
};

export default Landing;

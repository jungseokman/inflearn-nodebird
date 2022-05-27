import React, { useState } from "react";
import Slick from "react-slick";
import {
  CloseBtn,
  Global,
  Header,
  ImageWrapper,
  Indicator,
  OverLay,
  SlickWrapper,
} from "./styles";

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <OverLay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </Header>
      <SlickWrapper>
        <Slick
          initialSlide={0}
          afterChange={(currentSlide) => setCurrentSlide(currentSlide)}
          infinite
          arrows={false}
          slidesToShow={1}
          slidesToScroll={1}
        >
          {images.map((v) => (
            <ImageWrapper key={v.src}>
              <img src={v.src} alt={v.src} />
            </ImageWrapper>
          ))}
        </Slick>
        <Indicator>
          <div>
            {currentSlide + 1} / {images.length}
          </div>
        </Indicator>
      </SlickWrapper>
    </OverLay>
  );
};

export default ImagesZoom;
